import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2, BookOpen, X } from 'lucide-react';
import { searchApi } from '../../services/api';
import type { SearchLesson, SearchIndexResponse } from '../../services/api';
import { getDisplayNumberPadded } from '../../utils/lessonNumbers';

interface SearchBarProps {
  onNavigate?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const normalized = normalize(text);
  const normalizedQuery = normalize(query);
  const index = normalized.indexOf(normalizedQuery);

  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <>
      {before}
      <mark className="bg-brand-500/30 text-brand-300 rounded px-0.5">
        {match}
      </mark>
      {after}
    </>
  );
}

export function SearchBar({
  onNavigate,
  placeholder = 'Buscar aulas, módulos...',
  autoFocus = false,
}: SearchBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<SearchLesson[]>([]);
  const [loadingIndex, setLoadingIndex] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Carrega o índice uma vez
  useEffect(() => {
    searchApi
      .getIndex()
      .then((res: SearchIndexResponse) => setIndex(res.lessons))
      .catch(() => setIndex([]))
      .finally(() => setLoadingIndex(false));
  }, []);

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtro
  const results = (() => {
    const q = normalize(query.trim());
    if (q.length < 1) return [];

    return index
      .filter(
        (lesson) =>
          normalize(lesson.title).includes(q) ||
          normalize(lesson.module_title).includes(q) ||
          lesson.id.includes(q)
      )
      .slice(0, 8);
  })();

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleSelect = (lesson: SearchLesson) => {
    const url = `/minha-area/curso/${lesson.module_id}/licao/${lesson.id}`;
    setIsOpen(false);
    setQuery('');
    inputRef.current?.blur();
    onNavigate?.();
    navigate(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) {
      if (e.key === 'Escape') {
        inputRef.current?.blur();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[activeIndex]) {
        handleSelect(results[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const showResults = isOpen && query.trim().length > 0;
  const isEmpty = showResults && results.length === 0 && !loadingIndex;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
        />
        <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="w-full pl-8 md:pl-9 pr-8 md:pr-9 py-1.5 md:py-2 rounded-lg bg-[#0c0c0e] border border-border text-xs md:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/30 transition-all"
            />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded text-text-muted hover:text-text-primary hover:bg-surface-overlay transition-colors"
            aria-label="Limpar busca"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-border bg-[#0c0c0e] shadow-2xl shadow-black/50 overflow-hidden z-50 animate-fade-in">
          {loadingIndex ? (
            <div className="flex items-center justify-center gap-2 py-6 text-text-muted text-sm">
              <Loader2 size={14} className="animate-spin" />
              Carregando...
            </div>
          ) : isEmpty ? (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-text-secondary mb-1">
                Nenhum resultado para "{query}"
              </p>
              <p className="text-xs text-text-muted">
                Tente buscar por título da aula ou do módulo
              </p>
            </div>
          ) : (
            <ul className="py-1.5 max-h-80 overflow-y-auto">
              {results.map((lesson, i) => (
                <li key={lesson.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(lesson)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`w-full text-left px-3 py-2.5 flex items-start gap-3 transition-colors ${
                      i === activeIndex
                        ? 'bg-brand-500/10 border-l-2 border-brand-500'
                        : 'border-l-2 border-transparent hover:bg-white/[0.03]'
                    }`}
                  >
                    <div
                      className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 ${
                        i === activeIndex
                          ? 'bg-brand-500/20 border border-brand-500/40'
                          : 'bg-white/[0.03] border border-border'
                      }`}
                    >
                      <BookOpen
                        size={14}
                        className={
                          i === activeIndex
                            ? 'text-brand-500'
                            : 'text-text-muted'
                        }
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-mono text-text-muted">
                          {lesson.module_id}-
                          {getDisplayNumberPadded(lesson.id)}
                        </span>
                        <span className="text-[10px] text-text-muted truncate">
                          {lesson.module_title}
                        </span>
                      </div>
                      <p className="text-sm text-text-primary font-medium truncate">
                        {highlight(lesson.title, query)}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {!isEmpty && !loadingIndex && (
            <div className="px-3 py-2 border-t border-border bg-white/[0.02] flex items-center justify-between text-[10px] text-text-muted">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-border font-mono">
                  ↑↓
                </kbd>
                navegar
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-border font-mono">
                  Enter
                </kbd>
                abrir
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-border font-mono">
                  Esc
                </kbd>
                fechar
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}