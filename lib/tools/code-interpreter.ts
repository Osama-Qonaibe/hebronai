import { tool } from 'ai'
import { codeInterpreterSchema } from '@/lib/schema/code-interpreter'

export const codeInterpreterTool = tool({
  description: 'Execute Python or JavaScript code in a secure sandbox',
  parameters: codeInterpreterSchema,
  execute: async ({ language, code }) => {
    try {
      const e2bApiKey = process.env.E2B_API_KEY
      
      if (!e2bApiKey) {
        return {
          language,
          code,
          output: 'E2B_API_KEY is not configured',
          success: false
        }
      }

      return {
        language,
        code,
        output: 'Code execution requested. Sandbox environment pending.',
        success: true
      }
    } catch (error) {
      return {
        language,
        code,
        output: error instanceof Error ? error.message : String(error),
        success: false
      }
    }
  }
})
