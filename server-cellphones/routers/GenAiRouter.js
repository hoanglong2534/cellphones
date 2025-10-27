import express from 'express'
import { generateText } from '../controllers/GenAiController.js'

const router = express.Router()

// POST /genai/chat
// body: { prompt: string, temperature?: number, maxOutputTokens?: number }
router.post('/chat', generateText)

export default router
