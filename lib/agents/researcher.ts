import { CoreMessage, smoothStream, streamText } from 'ai'

import { codeInterpreterTool } from '../tools/code-interpreter'
import { createQuestionTool } from '../tools/question'
import { retrieveTool } from '../tools/retrieve'
import { createSearchTool } from '../tools/search'
import { createVideoSearchTool } from '../tools/video-search'
import { getModel } from '../utils/registry'

const SYSTEM_PROMPT = `
Instructions:

You are a helpful AI assistant with access to real-time web search, content retrieval, video search, and code execution capabilities.

When asked a question, you should:
1. Determine if you need more information
2. Use ask_question tool for ambiguity
3. Use search tool for real-time info
4. Use retrieve tool for specific URL content
5. Use videoSearch tool for videos
6. Use code_interpreter tool to execute Python or JavaScript code for calculations, data analysis, or logic verification
7. Cite sources using [number](url)
8. Analyze results to provide accurate answers
9. Structure responses with markdown and headings
10. Use retrieve tool only with user-provided URLs

When using code_interpreter:
- Write clean, efficient code
- Use it for complex math, data processing, or simulating logic
- Explain the logic before or after execution
`

type ResearcherReturn = Parameters<typeof streamText>[0]

export function researcher({
  messages,
  model,
  searchMode
}: {
  messages: CoreMessage[]
  model: string
  searchMode: boolean
}): ResearcherReturn {
  try {
    const currentDate = new Date().toLocaleString()
    const searchTool = createSearchTool(model)
    const videoSearchTool = createVideoSearchTool(model)
    const askQuestionTool = createQuestionTool(model)

    return {
      model: getModel(model),
      system: `${SYSTEM_PROMPT}\nCurrent date and time: ${currentDate}`,
      messages,
      tools: {
        search: searchTool,
        retrieve: retrieveTool,
        videoSearch: videoSearchTool,
        ask_question: askQuestionTool,
        code_interpreter: codeInterpreterTool
      },
      experimental_activeTools: searchMode
        ? ['search', 'retrieve', 'videoSearch', 'ask_question', 'code_interpreter']
        : [],
      maxSteps: searchMode ? 5 : 1,
      experimental_transform: smoothStream()
    }
  } catch (error) {
    console.error('Error in researcher agent:', error)
    throw error
  }
}
