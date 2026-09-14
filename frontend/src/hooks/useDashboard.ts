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

export function useDashboard() {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [modules, setModules] = useState<DashboardModule[]>([]);
  const [achievements, setAchievements] = useState<DashboardAchievement[]>([]);
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivity[]>([]);
  const [timeDistribution, setTimeDistribution] = useState<
    ModuleTimeDistribution[]
  >([]);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // `allSettled` aceita falhas parciais — se um endpoint falhar, os
    // outros ainda carregam normalmente.
    Promise.allSettled([
      dashboardApi.getOverview(),
      dashboardApi.getModules(),
      dashboardApi.getAchievements(),
      dashboardApi.getWeeklyActivity(),
      dashboardApi.getTimeDistribution(),
      dashboardApi.getTimeline(),
    ])
      .then(([ov, mods, achs, week, dist, tl]) => {
        if (ov.status === 'fulfilled') setOverview(ov.value);
        if (mods.status === 'fulfilled') setModules(mods.value.modules);
        if (achs.status === 'fulfilled')
          setAchievements(achs.value.achievements);
        if (week.status === 'fulfilled')
          setWeeklyActivity(week.value.activity);
        if (dist.status === 'fulfilled')
          setTimeDistribution(dist.value.distribution);
        if (tl.status === 'fulfilled') setTimeline(tl.value.entries);

        // Se o overview falhou, aí sim mostramos erro geral
        if (ov.status === 'rejected') {
          setError(
            ov.reason instanceof Error
              ? ov.reason.message
              : 'Erro ao carregar dados'
          );
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    overview,
    modules,
    achievements,
    weeklyActivity,
    timeDistribution,
    timeline,
    loading,
    error,
  };
}