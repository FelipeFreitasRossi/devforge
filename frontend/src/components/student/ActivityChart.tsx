import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { ModuleTimeDistribution } from '../../services/api';

interface ActivityChartProps {
  distribution: ModuleTimeDistribution[];
}

// Cores usadas nas fatias do gráfico, na ordem dos módulos.
// Ficam dentro da paleta do design system (âmbar, azul e tons neutros).
const CORES_FATIA = [
  'var(--color-brand-500)',
  'var(--color-accent-500)',
  'var(--color-brand-300)',
  'var(--color-accent-300)',
  'var(--color-border-strong)',
];

export function ActivityChart({ distribution }: ActivityChartProps) {
  const sectionRef = useScrollAnimation<HTMLDivElement>();

  const totalMinutos = distribution.reduce((soma, m) => soma + m.minutes, 0);

  if (totalMinutos === 0) {
    return (
      <div ref={sectionRef} data-animate className="card-base p-6">
        <h3 className="text-fluid-lg font-semibold text-text-primary">
          Tempo por módulo
        </h3>
        <EmptyChart />
      </div>
    );
  }

  const size = 180;
  const stroke = 22;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  let acumulado = 0;

  return (
    <div ref={sectionRef} data-animate className="card-base p-6">
      <h3 className="text-fluid-lg font-semibold text-text-primary">
        Tempo por módulo
      </h3>
      <p className="mt-1 text-fluid-sm text-text-muted">
        Como suas horas de estudo se distribuem
      </p>

      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-surface-overlay)"
            strokeWidth={stroke}
          />
          {distribution.map((modulo, i) => {
            const fração = modulo.minutes / totalMinutos;
            const comprimento = fração * circumference;
            const offset = circumference - comprimento;
            const rotacao = (acumulado / totalMinutos) * 360;
            acumulado += modulo.minutes;

            return (
              <circle
                key={modulo.module_id}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={CORES_FATIA[i % CORES_FATIA.length]}
                strokeWidth={stroke}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform={`rotate(${rotacao - 90} ${size / 2} ${size / 2})`}
                style={{ transition: 'stroke-dashoffset 0.8s ease' }}
              />
            );
          })}
        </svg>

        {/* Legenda */}
        <ul className="flex w-full flex-col gap-2.5">
          {distribution.map((modulo, i) => {
            const percentual = Math.round(
              (modulo.minutes / totalMinutos) * 100
            );
            return (
              <li
                key={modulo.module_id}
                className="flex items-center justify-between gap-3 text-fluid-sm"
              >
                <span className="flex items-center gap-2 text-text-secondary">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: CORES_FATIA[i % CORES_FATIA.length],
                    }}
                    aria-hidden="true"
                  />
                  {modulo.module_title}
                </span>
                <span className="tabular-nums text-text-muted">
                  {percentual}%
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function EmptyChart() {
  return (
    <div className="mt-6 flex flex-col items-center gap-2 py-8 text-center">
      <p className="text-fluid-sm text-text-secondary">
        Ainda não há tempo de estudo registrado
      </p>
      <p className="text-xs text-text-muted">
        Assista sua primeira aula para ver o gráfico aparecer aqui
      </p>
    </div>
  );
}
