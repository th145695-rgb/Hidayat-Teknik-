const OPENAI_IMAGE_ENDPOINT = 'https://api.openai.com/v1/images/edits';

const stylePrompts = {
    minimalis: 'modern black minimalist security grille with slim vertical bars, matte finish, clean proportions',
    industrial: 'industrial black steel grille with precise geometric grid and subtle diagonal bracing, matte textured finish',
    mewah: 'luxury black wrought iron grille with subtle elegant gold accents, premium finish, refined details',
    klasik: 'classic black wrought iron grille with soft ornamental curves, elegant but not crowded',
    islami: 'black Islamic geometric grille with balanced star pattern, symmetrical, premium laser-cut feel'
};

const areaLabels = {
    jendela: 'window',
    pintu: 'door',
    balkon: 'balcony'
};

const readJsonBody = async (req) => {
    if (req.body && typeof req.body === 'object') return req.body;
    if (typeof req.body === 'string') return JSON.parse(req.body || '{}');

    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8');
    return raw ? JSON.parse(raw) : {};
};

const parseImageDataUrl = (imageDataUrl) => {
    const match = String(imageDataUrl || '').match(/^data:(image\/(?:png|jpe?g|webp));base64,([A-Za-z0-9+/=]+)$/);
    if (!match) {
        const err = new Error('Format foto tidak valid.');
        err.statusCode = 400;
        throw err;
    }

    const mimeType = match[1] === 'image/jpg' ? 'image/jpeg' : match[1];
    const buffer = Buffer.from(match[2], 'base64');
    if (buffer.length > 12 * 1024 * 1024) {
        const err = new Error('Foto terlalu besar untuk AI backend.');
        err.statusCode = 413;
        throw err;
    }

    const extension = mimeType.split('/')[1].replace('jpeg', 'jpg');
    return { buffer, mimeType, extension };
};

const buildPrompt = ({ areaType, style, notes, prompt }) => {
    const area = areaLabels[areaType] || 'window';
    const styleInstruction = stylePrompts[style] || stylePrompts.minimalis;
    const userNote = notes ? `Customer notes: ${notes}.` : '';
    const basePrompt = prompt ? `Reference prompt: ${prompt}.` : '';

    return [
        `Edit this house photo into a realistic before-after mockup by adding a ${styleInstruction} for the ${area}.`,
        'Preserve the original architecture, window/door frame, wall texture, perspective, camera angle, lighting, shadows, plants, curtains, and background.',
        'Place the grille only inside the visible opening or directly on the existing frame. Do not extend bars onto the wall. Do not crop, zoom, add labels, add text, or change the room.',
        'The result should look like a real installed custom metal grille photographed on the same house.',
        basePrompt,
        userNote
    ].filter(Boolean).join(' ');
};

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ success: false, error: 'Method tidak didukung.' });
        return;
    }

    if (!process.env.OPENAI_API_KEY) {
        res.status(503).json({
            success: false,
            code: 'OPENAI_API_KEY_MISSING',
            error: 'OPENAI_API_KEY belum dipasang di environment server.'
        });
        return;
    }

    try {
        const body = await readJsonBody(req);
        const { buffer, mimeType, extension } = parseImageDataUrl(body.imageDataUrl);
        const prompt = buildPrompt(body);

        const form = new FormData();
        // Endpoint edits hanya mensupport dall-e-2
        form.append('model', 'dall-e-2');
        form.append('image', new Blob([buffer], { type: mimeType }), `terali-reference.${extension}`);
        form.append('prompt', prompt);
        form.append('n', '1');
        // OpenAI DALL-E 2 edits hanya menerima 256x256, 512x512, atau 1024x1024
        form.append('size', '1024x1024');
        form.append('response_format', 'b64_json');

        const response = await fetch(OPENAI_IMAGE_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: form
        });

        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
            const requestId = response.headers.get('x-request-id');
            res.status(response.status).json({
                success: false,
                code: payload.error?.code || 'OPENAI_IMAGE_ERROR',
                error: payload.error?.message || 'Gagal generate gambar dari OpenAI.',
                requestId
            });
            return;
        }

        const b64 = payload.data?.[0]?.b64_json;
        if (!b64) {
            res.status(502).json({ success: false, error: 'OpenAI tidak mengembalikan gambar.' });
            return;
        }

        res.status(200).json({
            success: true,
            provider: 'openai',
            model: process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1.5',
            imageDataUrl: `data:image/png;base64,${b64}`,
            prompt,
            usage: payload.usage || null
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            error: err.message || 'Gagal memproses AI image.'
        });
    }
};
