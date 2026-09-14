import { CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { TimelineEntry } from '../../services/api';

interface ActivityTimelineProps {
  entries: TimelineEntry[];
}

/**
 * Transforma uma data ISO em algo como "Hoje", "Ontem" ou "12 de março".
 */
function formatarData(dataISO: string): string {
  const data = new Date(dataISO);
  const hoje = new Date();
  const ontem = new Date();
  ontem.setDate(hoje.getDate() - 1);

  const mesmodia = (a: Date, b: Date) =>
    a.toDateString() === b.toDateString();

  if (mesmodia(data, hoje)) return 'Hoje';
  if (mesmodia(data, ontem)) return 'Ontem';

  return data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
}

export function ActivityTimeline({ entries }: ActivityTimelineProps) {
  const sectionRef = useScrollAnimation<HTMLDivElement>();

  return (
    <div ref={sectionRef} data-animate className="card-base p-6">
      <h3 className="text-fluid-lg font-semibold text-text-primary">
        Atividades recentes
      </h3>

      {entries.length === 0 ? (
        <div className="mt-6 py-6 text-center">
          <p className="text-fluid-sm text-text-secondary">
            Nenhuma atividade ainda
          </p>
          <p className="mt-1 text-xs text-text-muted">
            Suas aulas concluídas vão aparecer aqui
          </p>
        </div>
      ) : (
        <ol className="mt-6 flex flex-col">
          {entries.map((item, i) => (
            <li key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
              {i !== entries.length - 1 && (
                <span
                  aria-hidden="true"
                  className="timeline-line absolute left-[11px] top-6 h-full w-px"
                />
              )}
              <span
                aria-hidden="true"
                className="timeline-dot relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
              >
                <CheckCircle2 size={14} className="text-brand-500" />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-fluid-sm text-text-primary">
                  {item.lesson_title}
                </p>
                <p className="mt-0.5 text-xs text-text-muted">
                  {item.module_title} · {formatarData(item.date)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
