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
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-gemini-api-key');

    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ success: false, error: 'Method tidak didukung.' });
        return;
    }

    let apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey && req.headers['x-gemini-api-key']) {
        apiKey = req.headers['x-gemini-api-key'];
    }
    
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
        
        // Build prompt for Gemini 2.0 Flash Image Generation
        let prompt = `Create a highly realistic architectural photo showing a house ${area} with a ${styleInstruction} installed. The grille should look like a real custom metal installation with beautiful lighting and realistic shadows. Professional architectural photography style.`;
        if (body.notes) prompt += ` Additional requirements: ${body.notes}.`;

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`;
        
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    responseModalities: ['IMAGE', 'TEXT']
                }
            })
        });

        const payload = await response.json().catch(() => ({}));
        
        if (!response.ok) {
            console.error('Gemini API error:', JSON.stringify(payload));
            res.status(response.status).json({
                success: false,
                code: payload.error?.code || 'GEMINI_IMAGE_ERROR',
                error: payload.error?.message || 'Gagal generate gambar dari Gemini API.',
            });
            return;
        }

        // Extract image from response parts
        const parts = payload.candidates?.[0]?.content?.parts || [];
        const imagePart = parts.find(p => p.inlineData?.data);
        const b64 = imagePart?.inlineData?.data;
        const mimeType = imagePart?.inlineData?.mimeType || 'image/jpeg';
        if (!b64) {
            res.status(502).json({ success: false, error: 'Gemini tidak mengembalikan gambar.' });
            return;
        }

        res.status(200).json({
            success: true,
            provider: 'gemini',
            model: 'gemini-2.0-flash-preview-image-generation',
            imageDataUrl: `data:${mimeType};base64,${b64}`,
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
