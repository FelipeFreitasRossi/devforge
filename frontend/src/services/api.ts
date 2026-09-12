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

  // Tratamento de 401: token inválido/expirado
  if (response.status === 401) {
    localStorage.removeItem('token');
    // Redireciona apenas se não estiver já em /login
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

  createPayment: (method: 'pix' | 'boleto' | 'credit_card') =>
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