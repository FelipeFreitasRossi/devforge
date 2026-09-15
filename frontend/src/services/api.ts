const API_URL = 'http://localhost:8000/api';

// ============================================================================
// HELPERS
// ============================================================================
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

  // Sessão expirada
  if (response.status === 401) {
    localStorage.removeItem('token');
    if (!window.location.pathname.startsWith('/login')) {
      window.location.href = '/login';
    }
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  // Lê como texto para não quebrar em respostas não-JSON
  const rawText = await response.text();

  let data: any = null;
  try {
    data = rawText ? JSON.parse(rawText) : null;
  } catch {
    console.error('Resposta não-JSON:', rawText.slice(0, 500));
    throw new Error(`Erro ${response.status}: resposta inesperada do servidor.`);
  }

  if (!response.ok) {
    throw new Error(data?.detail || 'Erro na requisição');
  }

  return data as T;
}

// ============================================================================
// AUTH + PAYMENTS
// ============================================================================
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

// ============================================================================
// DASHBOARD — Types
// ============================================================================
export interface DashboardOverview {
  user: { name: string; email: string };
  stats: {
    active_modules: number;
    completed_modules: number;
    study_hours: number;
    weekly_goal_progress: string;
    overall_progress_percent?: number;
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
    reading_time_minutes: number;
    has_exercise: boolean;
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
  progress_percent?: number;
}

export interface WeeklyActivity {
  date: string;
  weekday: string;
  minutes: number;
}

export interface ModuleTimeDistribution {
  module_id: string;
  module_title: string;
  minutes: number;
}

export interface TimelineEntry {
  id: string;
  lesson_title: string;
  module_title: string;
  date: string;
}

// ============================================================================
// DASHBOARD — API
// ============================================================================
export const dashboardApi = {
  getOverview: () => request<DashboardOverview>('/dashboard/overview'),

  getModules: () =>
    request<{ modules: DashboardModule[] }>('/dashboard/modules'),

  getAchievements: () =>
    request<{ achievements: DashboardAchievement[] }>(
      '/dashboard/achievements'
    ),

  getWeeklyActivity: () =>
    request<{ activity: WeeklyActivity[] }>('/dashboard/weekly-activity'),

  getTimeDistribution: () =>
    request<{ distribution: ModuleTimeDistribution[] }>(
      '/dashboard/time-distribution'
    ),

  getTimeline: () =>
    request<{ entries: TimelineEntry[] }>('/dashboard/timeline'),

  postProgress: (data: {
    module_id: string;
    lesson_id: string;
    time_spent_minutes: number;
    completed: boolean;
  }) =>
    request<{ success: boolean; new_achievements: string[] }>(
      '/dashboard/progress',
      { method: 'POST', body: JSON.stringify(data) }
    ),
};

// ============================================================================
// LESSONS — Types
// ============================================================================
export type LessonBlockType = 'text' | 'code' | 'diagram';

export interface LessonBlock {
  type: LessonBlockType;
  value: string;
  caption?: string;
}

export interface LessonExercise {
  id: string;
  title: string;
  statement: string;
  starter_code: string;
  hint: string;
}

export interface LessonTopic {
  id: string;
  title: string;
  content: LessonBlock[];
  exercise: LessonExercise | null;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  objectives: string[];
  reading_time_minutes: number;
  topics: LessonTopic[];
  summary: string[];
}

export type LessonSidebarStatus =
  | 'completed'
  | 'current'
  | 'pending'
  | 'locked';

export interface LessonSidebarLesson {
  id: string;
  title: string;
  reading_time_minutes: number;
  has_exercise: boolean;
  status: LessonSidebarStatus;
}

export interface LessonSidebarModule {
  id: string;
  title: string;
  unlocked: boolean;
  lessons: LessonSidebarLesson[];
}

export interface LessonDetailResponse {
  lesson: Lesson;
  already_completed: boolean;
  attempts: number;
  prev_lesson_id: string | null;
  next_lesson_id: string | null;
  sidebar: LessonSidebarModule[];
}

export type SubmitCodeResponse =
  | {
      success: true;
      output: string;
      message: string;
      next_lesson_id: string | null;
      new_achievements: string[];
    }
  | {
      success: false;
      error_type: 'SyntaxError' | 'WrongOutput' | 'Timeout' | string;
      error_message?: string;
      expected?: string;
      got?: string;
      hint: string;
    };

// ============================================================================
// LESSONS — API
// ============================================================================
export const lessonApi = {
  getLesson: (lessonId: string) =>
    request<LessonDetailResponse>(`/lessons/${lessonId}`),

  submitCode: (
    lessonId: string,
    code: string,
    exerciseId: string,
    timeSpentSeconds: number
  ) =>
    request<SubmitCodeResponse>(`/lessons/${lessonId}/submit`, {
      method: 'POST',
      body: JSON.stringify({
        code,
        exercise_id: exerciseId,
        time_spent_seconds: timeSpentSeconds,
      }),
    }),
};

// ============================================================================
// SEARCH — Types + API
// ============================================================================
export interface SearchLesson {
  id: string;
  title: string;
  module_id: string;
  module_title: string;
  reading_time_minutes: number;
}

export interface SearchIndexResponse {
  lessons: SearchLesson[];
}

export const searchApi = {
  getIndex: () => request<SearchIndexResponse>('/lessons/search-index'),
};

// ============================================================================
// PROFILE — Types + API
// ============================================================================
export interface ProfileUser {
  id: string;
  name: string;
  email: string;
  created_at: string | null;
  paid: boolean;
}

export interface ProfileStats {
  active_modules: number;
  completed_modules: number;
  study_hours: number;
  streak_current: number;
  streak_longest: number;
  achievements_unlocked: number;
  achievements_total: number;
}

export interface ProfileResponse {
  user: ProfileUser;
  stats: ProfileStats;
}

export const profileApi = {
  getProfile: () => request<ProfileResponse>('/profile'),

  updateName: (name: string) =>
    request<{ success: boolean; user: ProfileUser }>('/profile', {
      method: 'PUT',
      body: JSON.stringify({ name }),
    }),

  changePassword: (currentPassword: string, newPassword: string) =>
    request<{ success: boolean; message: string }>('/profile/password', {
      method: 'PUT',
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    }),
};