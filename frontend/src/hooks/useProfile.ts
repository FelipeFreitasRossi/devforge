import { useCallback, useEffect, useState } from 'react';
import { profileApi, type ProfileResponse } from '../services/api';

export function useProfile() {
  const [data, setData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await profileApi.getProfile();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar perfil');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateName = useCallback(async (name: string) => {
    const response = await profileApi.updateName(name);
    setData((prev) =>
      prev ? { ...prev, user: { ...prev.user, name: response.user.name } } : prev
    );
    return response;
  }, []);

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      return profileApi.changePassword(currentPassword, newPassword);
    },
    []
  );

  return { data, loading, error, updateName, changePassword, reload: load };
}