// api/generate.js — Secret NexGenAI Neural Engine Handler
export default async function handler(req, res) {
  // CORS Headers allow karte hain taake frontend se bina issue call ho
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt, ratio, style } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Command enhancement - Puri detailed prompt follow kare bina kate
    let enhancedPrompt = prompt.trim();
    if (style && style !== 'none') {
      enhancedPrompt += `, rendered in exquisite ${style} aesthetic`;
    }
    enhancedPrompt += `, 8k resolution, cinematic lighting, ultra-fine photorealistic textures, master composition, sharp focus, 4k uhd`;

    // Dimensions resolution mapping
    let width = 1440;
    let height = 2560;
    if (ratio === '1:1') { width = 2048; height = 2048; }
    else if (ratio === '16:9') { width = 2560; height = 1440; }
    else if (ratio === '4:3') { width = 2048; height = 1536; }

    // Backend High-Speed High-Fidelity Neural Diffusion Gateway
    // Is endpoint se Full Prompt parse hoti hai aur 4K quality aati hai
    const seed = Math.floor(Math.random() * 9999999);
    const encoded = encodeURIComponent(enhancedPrompt);
    
    // Secret backend proxy URL (FLUX.1 Schnell / SDXL Turbo engine under NexGenAI branding)
    const engineUrl = `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=flux`;

    // Response user ko return karein jisme sirf NexGenAI ka signature ho
    return res.status(200).json({
      success: true,
      imageUrl: engineUrl,
      engine: "NexGenAI Multimodal Diffusion Core 1.5",
      resolution: `${width}x${height}`,
      seed: seed
    });

  } catch (error) {
    console.error("Inference Error:", error);
    return res.status(500).json({ error: 'NexGenAI cluster failed to synthesize frame' });
  }
}
