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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        res.status(503).json({
            success: false,
            code: 'GEMINI_API_KEY_MISSING',
            error: 'GEMINI_API_KEY belum dipasang di environment server.'
        });
        return;
    }

    try {
        const body = await readJsonBody(req);
        
        const area = areaLabels[body.areaType] || 'window';
        const styleInstruction = stylePrompts[body.style] || stylePrompts.minimalis;
        
        // Build prompt for Imagen 3 via Gemini API
        let prompt = `A highly realistic, professional architectural photo of a house ${area} featuring a ${styleInstruction}. The image should look like a real custom metal installation. Focus on the grille design, beautiful lighting, and realistic background.`;
        if (body.notes) prompt += ` Additional requirements: ${body.notes}.`;

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`;
        
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                instances: [
                    { prompt: prompt }
                ],
                parameters: {
                    sampleCount: 1,
                    outputOptions: { mimeType: 'image/jpeg' }
                }
            })
        });

        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
            res.status(response.status).json({
                success: false,
                code: payload.error?.code || 'GEMINI_IMAGE_ERROR',
                error: payload.error?.message || 'Gagal generate gambar dari Gemini API.',
            });
            return;
        }

        const b64 = payload.predictions?.[0]?.bytesBase64Encoded;
        if (!b64) {
            res.status(502).json({ success: false, error: 'Gemini tidak mengembalikan gambar.' });
            return;
        }

        res.status(200).json({
            success: true,
            provider: 'gemini',
            model: 'imagen-3.0-generate-001',
            imageDataUrl: `data:image/jpeg;base64,${b64}`,
            prompt: prompt,
            usage: null
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            error: err.message || 'Gagal memproses AI image.'
        });
    }
};
