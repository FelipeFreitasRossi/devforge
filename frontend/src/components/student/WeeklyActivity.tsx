import { useState } from 'react';
import { Calendar, TrendingUp, Award } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { WeeklyActivity as WeeklyActivityType } from '../../services/api';

interface WeeklyActivityProps {
  activity: WeeklyActivityType[];
}

/** Formata minutos em "2h 15min" ou "45min" */
function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}min`;
}

export function WeeklyActivity({ activity }: WeeklyActivityProps) {
  const containerRef = useScrollAnimation<HTMLElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.08,
  });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Dados
  const totalMinutes = activity.reduce((acc, a) => acc + a.minutes, 0);
  const activeDays = activity.filter((a) => a.minutes > 0).length;
  const maxMinutes = Math.max(...activity.map((a) => a.minutes), 1);
  const avgMinutes =
    activeDays > 0 ? Math.round(totalMinutes / activeDays) : 0;
  const peakDay = activity.reduce(
    (max, day) => (day.minutes > max.minutes ? day : max),
    activity[0]
  );
  const today = new Date().toISOString().split('T')[0];

  // Escala do eixo Y — arredonda para cima até o próximo múltiplo bonito
  const getYTicks = () => {
    if (maxMinutes === 0) return [0, 15, 30, 45, 60];

    // Define o teto da escala (arredondado para múltiplo de 15/30/60)
    let ceiling: number;
    if (maxMinutes <= 30) ceiling = 30;
    else if (maxMinutes <= 60) ceiling = 60;
    else if (maxMinutes <= 90) ceiling = 90;
    else if (maxMinutes <= 120) ceiling = 120;
    else ceiling = Math.ceil(maxMinutes / 60) * 60;

    // 4 intervalos entre 0 e o teto
    const step = ceiling / 4;
    return [0, step, step * 2, step * 3, ceiling];
  };

  const yTicks = getYTicks();
  const yMax = yTicks[yTicks.length - 1];

  return (
    <section ref={containerRef} className="h-full">
      <div
        data-animate
        className="relative h-full rounded-2xl border border-border bg-[#0c0c0e] overflow-hidden p-6"
      >
        {/* Glow azul sutil no canto superior direito */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 100% at 100% 0%, rgba(59, 130, 246, 0.10) 0%, transparent 65%)',
          }}
        />

        <div className="relative">
          {/* ===== HEADER ===== */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={12} className="text-text-muted" />
                <span className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">
                  Sua semana
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-text-primary leading-none tracking-tight">
                  {(totalMinutes / 60).toFixed(1)}
                </span>
                <span className="text-sm text-text-muted">horas</span>
              </div>
            </div>

            {activeDays > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-500/10 border border-accent-500/25">
                <TrendingUp size={11} className="text-accent-500" />
                <span className="text-[11px] font-bold text-accent-400 font-mono">
                  {activeDays}/7
                </span>
              </div>
            )}
          </div>

          {/* ===== GRÁFICO ===== */}
          <div className="relative h-40 mb-5">
            {/* Eixo Y (labels) + linhas horizontais */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[...yTicks].reverse().map((tick, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-text-muted/60 w-10 text-right shrink-0">
                    {tick === 0 ? '0' : formatDuration(tick)}
                  </span>
                  <div className="flex-1 h-px bg-white/[0.04]" />
                </div>
              ))}
            </div>

            {/* Linha de média */}
            {avgMinutes > 0 && (
              <div
                className="absolute left-12 right-0 flex items-center gap-2 pointer-events-none z-10"
                style={{
                  bottom: `${(avgMinutes / yMax) * 100}%`,
                }}
              >
                <div className="flex-1 border-t border-dashed border-violet-500/40" />
                <span className="text-[9px] font-mono text-violet-400 bg-[#0c0c0e] px-1.5 py-0.5 rounded">
                  média {formatDuration(avgMinutes)}
                </span>
              </div>
            )}

            {/* Barras */}
            <div className="absolute left-12 right-0 inset-y-0 flex items-end justify-between gap-1.5">
              {activity.map((day, i) => {
                const heightPercent = (day.minutes / yMax) * 100;
                const isToday = day.date === today;
                const hasActivity = day.minutes > 0;
                const isPeak = day.date === peakDay.date && peakDay.minutes > 0;
                const isHovered = hoveredIndex === i;

                return (
                  <div
                    key={day.date}
                    className="relative flex-1 h-full flex flex-col justify-end"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Tooltip */}
                    {isHovered && hasActivity && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 z-20 whitespace-nowrap pointer-events-none animate-fade-in"
                        style={{
                          bottom: `calc(${Math.max(heightPercent, 4)}% + 8px)`,
                        }}
                      >
                        <div className="px-2 py-1 rounded-md bg-black border border-accent-500/40 shadow-lg">
                          <span className="text-[10px] font-mono text-accent-400">
                            {formatDuration(day.minutes)}
                          </span>
                        </div>
                        <div className="w-px h-2 bg-accent-500/40 mx-auto" />
                      </div>
                    )}

                    {/* Indicador de pico */}
                    {isPeak && !isHovered && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 z-10"
                        style={{
                          bottom: `calc(${heightPercent}% + 4px)`,
                        }}
                      >
                        <Award
                          size={12}
                          className="text-brand-500 fill-brand-500/20"
                        />
                      </div>
                    )}

                    {/* Barra */}
                    <div
                      className={`w-full max-w-[32px] mx-auto rounded-t-md transition-all duration-500 relative overflow-hidden ${
                        isToday
                          ? 'bg-gradient-to-t from-accent-600 via-accent-500 to-accent-400'
                          : hasActivity
                          ? isHovered
                            ? 'bg-gradient-to-t from-accent-600/70 to-accent-500/70'
                            : 'bg-gradient-to-t from-accent-600/50 to-accent-500/50'
                          : 'bg-white/[0.04]'
                      }`}
                      style={{
                        height: `${Math.max(heightPercent, hasActivity ? 4 : 2)}%`,
                        minHeight: hasActivity ? '6px' : '3px',
                        boxShadow: isToday
                          ? '0 0 20px -4px rgba(59, 130, 246, 0.6)'
                          : 'none',
                      }}
                    >
                      {/* Highlight no topo da barra */}
                      {hasActivity && (
                        <div className="absolute inset-x-0 top-0 h-px bg-white/40" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===== LEGENDA DOS DIAS ===== */}
          <div className="flex items-end justify-between gap-1.5 pl-12 mb-5">
            {activity.map((day) => {
              const isToday = day.date === today;
              return (
                <div key={day.date} className="flex-1 text-center">
                  <span
                    className={`text-[10px] font-medium transition-colors ${
                      isToday
                        ? 'text-accent-500 font-bold'
                        : 'text-text-muted'
                    }`}
                  >
                    {day.weekday}
                  </span>
                </div>
              );
            })}
          </div>

          {/* ===== RODAPÉ COM ESTATÍSTICAS ===== */}
          {totalMinutes > 0 ? (
            <div className="pt-4 border-t border-border grid grid-cols-3 gap-3">
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Total
                </p>
                <p className="text-sm font-semibold text-text-primary font-mono">
                  {formatDuration(totalMinutes)}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Média/dia
                </p>
                <p className="text-sm font-semibold text-violet-400 font-mono">
                  {formatDuration(avgMinutes)}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  Pico
                </p>
                <p className="text-sm font-semibold text-brand-500 font-mono">
                  {formatDuration(peakDay.minutes)}
                </p>
              </div>
            </div>
          ) : (
            <div className="pt-4 border-t border-border text-center">
              <p className="text-xs text-text-muted">
                Comece a estudar hoje para ver sua evolução.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}