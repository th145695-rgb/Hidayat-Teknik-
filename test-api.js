const handler = require('./api/generate-ai-design.js');
const fs = require('fs');

const req = {
    method: 'POST',
    body: {
        imageDataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
        areaType: 'jendela',
        style: 'minimalis',
        prompt: 'test prompt'
    }
};

const res = {
    setHeader: () => {},
    status: function(s) { this.statusCode = s; return this; },
    json: function(data) { console.log('Status:', this.statusCode, 'Data:', data); },
    end: function() { console.log('Ended with status:', this.statusCode); }
};

process.env.OPENAI_API_KEY = 'test_key';
handler(req, res).catch(console.error);
