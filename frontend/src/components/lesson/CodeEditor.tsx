import { useRef } from 'react';
import { Code2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function CodeEditor({
  value,
  onChange,
  disabled = false,
  placeholder = '# Escreva seu código aqui...',
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab insere 4 espaços em vez de mudar o foco
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue =
        value.substring(0, start) + '    ' + value.substring(end);

      onChange(newValue);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = value.split('\n').length;

  return (
    <div className="relative rounded-xl border border-border bg-[#0d0d0f] overflow-hidden">
      {/* Header do editor */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-elevated">
        <div className="flex items-center gap-2">
          <Code2 size={14} className="text-brand-500" />
          <span className="text-xs font-mono text-text-muted">
            main.py
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-text-muted hover:text-brand-500 transition-colors"
          aria-label="Copiar código"
        >
          {copied ? (
            <>
              <Check size={12} className="text-brand-500" />
              <span className="text-brand-500">Copiado</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              Copiar
            </>
          )}
        </button>
      </div>

      {/* Editor */}
      <div className="relative flex">
        {/* Números de linha */}
        <div
          aria-hidden
          className="select-none py-4 px-3 text-right text-xs font-mono text-text-muted/40 bg-[#0a0a0b] min-w-[40px]"
        >
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          spellCheck={false}
          className="flex-1 py-4 px-3 bg-transparent text-sm font-mono text-text-primary placeholder:text-text-muted/50 focus:outline-none resize-none leading-6 min-h-[200px]"
          rows={Math.max(8, lines)}
        />
      </div>
    </div>
  );
}