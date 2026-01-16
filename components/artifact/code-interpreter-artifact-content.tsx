'use client'

import type { ToolInvocation } from 'ai'

import { ToolArgsSection } from '@/components/section'

export function CodeInterpreterArtifactContent({
  tool
}: {
  tool: ToolInvocation
}) {
  const result = tool.state === 'result' ? tool.result : undefined
  const args = tool.args as { language: string; code: string }

  return (
    <div className="flex flex-col h-full">
      <ToolArgsSection tool="code_interpreter">
        {`Running ${args.language} code`}
      </ToolArgsSection>
      <div className="flex-1 p-4 overflow-auto font-mono text-sm bg-muted/50 rounded-md mt-2">
        <pre className="whitespace-pre-wrap">{args.code}</pre>
      </div>
      {result && (
        <div className="p-4 border-t bg-background">
          <div className="text-xs font-bold uppercase text-muted-foreground mb-2">
            Output
          </div>
          <pre className="font-mono text-sm whitespace-pre-wrap">
            {result.output}
          </pre>
        </div>
      )}
    </div>
  )
}
