import { useEffect, useState } from 'react';
import { dashboardApi } from '../services/api';
import type {
  DashboardOverview,
  DashboardModule,
  DashboardAchievement,
  WeeklyActivity,
  ModuleTimeDistribution,
  TimelineEntry,
} from '../services/api';

interface DashboardState {
  overview: DashboardOverview | null;
  modules: DashboardModule[];
  achievements: DashboardAchievement[];
  weeklyActivity: WeeklyActivity[];
  timeDistribution: ModuleTimeDistribution[];
  timeline: TimelineEntry[];
  loading: boolean;
  error: string | null;
}

/**
 * Busca todos os dados da área do aluno de uma vez só.
 * Se algum endpoint novo (time-distribution / timeline) ainda não existir
 * no backend, ele simplesmente entra como lista vazia em vez de quebrar a tela.
 */
export function useDashboard() {
  const [state, setState] = useState<DashboardState>({
    overview: null,
    modules: [],
    achievements: [],
    weeklyActivity: [],
    timeDistribution: [],
    timeline: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      try {
        const [overview, modulesRes, achievementsRes, activityRes] =
          await Promise.all([
            dashboardApi.getOverview(),
            dashboardApi.getModules(),
            dashboardApi.getAchievements(),
            dashboardApi.getWeeklyActivity(),
          ]);

        // Endpoints novos: buscamos separado e toleramos falha,
        // já que podem ainda não existir no backend.
        const [timeDistribution, timeline] = await Promise.allSettled([
          dashboardApi.getTimeDistribution(),
          dashboardApi.getTimeline(),
        ]);

        if (cancelado) return;

        setState({
          overview,
          modules: modulesRes.modules,
          achievements: achievementsRes.achievements,
          weeklyActivity: activityRes.activity,
          timeDistribution:
            timeDistribution.status === 'fulfilled'
              ? timeDistribution.value.distribution
              : [],
          timeline:
            timeline.status === 'fulfilled' ? timeline.value.entries : [],
          loading: false,
          error: null,
        });
      } catch (err) {
        if (cancelado) return;
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            err instanceof Error
              ? err.message
              : 'Não foi possível carregar seus dados',
        }));
      }
    }

    carregar();
    return () => {
      cancelado = true;
    };
  }, []);

  return state;
}
