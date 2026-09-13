import { useEffect, useState } from 'react';
import { dashboardApi } from '../services/api';
import type {
  DashboardOverview,
  DashboardModule,
  DashboardAchievement,
} from '../services/api';

export function useDashboard() {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [modules, setModules] = useState<DashboardModule[]>([]);
  const [achievements, setAchievements] = useState<DashboardAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      dashboardApi.getOverview(),
      dashboardApi.getModules(),
      dashboardApi.getAchievements(),
    ])
      .then(([ov, mods, achs]) => {
        setOverview(ov);
        setModules(mods.modules);
        setAchievements(achs.achievements);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Erro ao carregar');
      })
      .finally(() => setLoading(false));
  }, []);

  return { overview, modules, achievements, loading, error };
}