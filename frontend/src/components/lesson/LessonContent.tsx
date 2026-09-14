import type { LessonBlock } from '../../services/api';

interface LessonContentProps {
  blocks: LessonBlock[];
}

export function LessonContent({ blocks }: LessonContentProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.type === 'text') {
          return (
            <p
              key={index}
              className="text-text-secondary leading-relaxed text-base md:text-lg"
              dangerouslySetInnerHTML={{
                __html: block.value
                  .replace(
                    /`([^`]+)`/g,
                    '<code class="px-1.5 py-0.5 rounded bg-surface-elevated text-brand-400 font-mono text-sm">$1</code>'
                  ),
              }}
            />
          );
        }

        if (block.type === 'code') {
          return (
            <div
              key={index}
              className="rounded-xl border border-border bg-[#0d0d0f] overflow-hidden"
            >
              {block.caption && (
                <div className="px-4 py-2 border-b border-border bg-surface-elevated">
                  <span className="text-xs font-medium text-text-muted">
                    {block.caption}
                  </span>
                </div>
              )}
              <pre className="p-4 text-sm font-mono text-text-primary overflow-x-auto">
                <code>{block.value}</code>
              </pre>
            </div>
          );
        }

        if (block.type === 'diagram') {
          return (
            <div
              key={index}
              className="p-4 rounded-xl border border-dashed border-border bg-surface-elevated/50 text-center"
            >
              <p className="text-sm text-text-muted italic">{block.value}</p>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}