import axios from 'axios'
import { ProductModel } from '../models/ProductModel.js'

// Controller that prefers using the official @google/genai SDK when available,
// with a lightweight axios fallback to the Generative Language REST endpoint.
// Read API key from process.env.GENAI_API_KEY. Do NOT commit your real key.
const DEFAULT_MODEL = process.env.GENAI_MODEL || 'gemini-2.0-flash-001'

// Helper function to search products and format for AI context
const searchProducts = async (query) => {
  try {
    // Search by name using regex
    const products = await ProductModel.find({
      name: { $regex: query, $options: 'i' }
    }).select('name price salePrice type os ram battery rom camera special screen')
    
    if (!products || products.length === 0) return null

    // Format product info for AI
    return products.map(p => ({
      name: p.name,
      price: p.price,
      salePrice: p.salePrice,
      specs: {
        os: p.os,
        ram: p.ram,
        battery: p.battery,
        storage: p.rom,
        camera: p.camera,
        screen: p.screen,
        special: p.special
      }
    }))
  } catch (err) {
    console.error('Product search error:', err)
    return null
  }
}

export const generateText = async (req, res) => {
  try {
    const { prompt, temperature = 0.2, maxOutputTokens = 512, model } = req.body

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid `prompt` in request body' })
    }

    const apiKey = process.env.GENAI_API_KEY || process.env.GOOGLE_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'Server not configured with GENAI_API_KEY or GOOGLE_API_KEY' })
    }

    // Extract product-related keywords from prompt
    const keywords = prompt.toLowerCase().match(/iphone|samsung|xiaomi|oppo|vivo|realme|\d+\s*(triệu|tr|k|đồng|vnd)|camera|pin|ram|màn\s*hình|điện\s*thoại/g) || []
    
    // Search for relevant products
    let productContext = ''
    if (keywords.length > 0) {
      const products = await searchProducts(keywords.join(' '))
      if (products && products.length > 0) {
        productContext = `\n\nThông tin sản phẩm từ database:\n${products.map(p => 
          `${p.name}:\n` +
          `- Giá: ${p.salePrice.toLocaleString('vi-VN')}đ (Giá gốc: ${p.price.toLocaleString('vi-VN')}đ)\n` +
          `- Cấu hình: ${Object.entries(p.specs)
            .filter(([_, v]) => v) // Only include non-empty specs
            .map(([k, v]) => `${k}: ${v}`).join(', ')}`
        ).join('\n\n')}`
      }
    }

    // Enhance prompt with product context
    const enhancedPrompt = `${prompt}\n\n${productContext}`
    console.log('Enhanced prompt with product data:', enhancedPrompt)

    const chosenModel = model || DEFAULT_MODEL

    // Try to use official SDK if installed
    try {
      const { GoogleGenAI } = await import('@google/genai')
      const ai = new GoogleGenAI({ apiKey })

      const response = await ai.models.generateContent({
        model: chosenModel,
        contents: enhancedPrompt,
        config: {
          temperature,
          maxOutputTokens,
        },
      })

      // SDK returns response.text (based on docs) and may include other metadata
      const text = response?.text ?? (response?.results && response.results.map(r => r?.content ?? '').join('\n'))

      return res.json({ ok: true, data: { raw: response, text } })
    } catch (sdkErr) {
      // If SDK not available or fails, fall back to REST approach (Text Bison / Generative Language REST)
      console.warn('@google/genai SDK not used or failed, falling back to REST:', sdkErr?.message || sdkErr)

      // Use the older Generative Language REST if model name looks like text-bison or if chosenModel contains 'bison'
      if (chosenModel.toLowerCase().includes('bison')) {
        const GENAI_BASE = 'https://generativelanguage.googleapis.com/v1beta2'
        const url = `${GENAI_BASE}/models/${chosenModel}:generateText?key=${apiKey}`

      const body = {
        prompt: { text: enhancedPrompt },
        temperature,
        maxOutputTokens,
      };
             const response = await axios.post(url, body, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 20000,
        })

        const data = response.data || {}
        let text = null
        if (data.candidates && data.candidates.length > 0) {
          text = data.candidates.map(c => c.output || c).join('\n\n')
        } else if (data.output) {
          text = data.output
        } else if (typeof data === 'string') {
          text = data
        }

        return res.json({ ok: true, data: { raw: data, text } })
      }

      // As a general fallback, try calling the Gemini Developer REST via the SDK shape (simple POST to Gemini endpoint)
      // For now return the SDK error to help debugging
      return res.status(500).json({ error: 'GenAI SDK error', details: sdkErr?.message || sdkErr })
    }
  } catch (err) {
    console.error('GenAi error:', err?.response?.data || err.message || err)
    const errBody = err?.response?.data || { message: err.message }
    return res.status(500).json({ error: 'GenAI request failed', details: errBody })
  }
}

export default {
  generateText,
}
