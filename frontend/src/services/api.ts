const API_URL = 'http://localhost:8000/api';

function getToken(): string | null {
  return localStorage.getItem('token');
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    if (!window.location.pathname.startsWith('/login')) {
      window.location.href = '/login';
    }
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Erro na requisição');
  }

  return data;
}

// ============ AUTH + PAYMENTS ============
export const api = {
  register: (name: string, email: string, password: string) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email: string, password: string) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  me: () => request('/auth/me'),

  createPayment: (method: 'pix' | 'credit_card') =>
    request('/payments/create', {
      method: 'POST',
      body: JSON.stringify({ method }),
    }),

  createCardPayment: (data: {
    token: string;
    payment_method_id: string;
    installments: number;
  }) =>
    request('/payments/create-card', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  checkPaymentStatus: (orderId: string) =>
    request(`/payments/status/${orderId}`),
};

// ============ DASHBOARD TYPES ============
export interface DashboardOverview {
  user: { name: string; email: string };
  stats: {
    active_modules: number;
    completed_modules: number;
    study_hours: number;
    weekly_goal_progress: string;
  };
  streak: {
    current_days: number;
    longest_days: number;
    last_study_date: string | null;
  };
  next_lesson: {
    module_id: string;
    module_title: string;
    lesson_id: string;
    lesson_title: string;
    duration_minutes: number;
    progress_percent: number;
  } | null;
}

export interface DashboardModule {
  id: string;
  title: string;
  description: string;
  lessons_count: number;
  completed_lessons: number;
  status: 'completed' | 'in_progress' | 'locked';
  duration_hours: number;
  progress_percent: number;
}

export interface DashboardAchievement {
  id: string;
  title: string;
  description: string;
  accent: 'brand' | 'accent';
  unlocked: boolean;
}

// ============ DASHBOARD API ============
export const dashboardApi = {
  getOverview: () => request<DashboardOverview>('/dashboard/overview'),
  getModules: () =>
    request<{ modules: DashboardModule[] }>('/dashboard/modules'),
  getAchievements: () =>
    request<{ achievements: DashboardAchievement[] }>(
      '/dashboard/achievements'
    ),
  postProgress: (data: {
    module_id: string;
    lesson_id: string;
    time_spent_minutes: number;
    completed: boolean;
  }) =>
    request<{ success: boolean; new_achievements: string[] }>(
      '/dashboard/progress',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    ),
};