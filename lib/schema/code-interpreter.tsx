import { z } from 'zod'

export const codeInterpreterSchema = z.object({
  language: z.enum(['python', 'javascript']).describe('The programming language to execute'),
  code: z.string().describe('The code to execute')
})
