export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export const ENDPOINTS = {
  news: process.env.NEXT_PUBLIC_ENDPOINT_NEWS || '/news',
  categories: process.env.NEXT_PUBLIC_ENDPOINT_CATEGORIES || '/categories',
  auth: process.env.NEXT_PUBLIC_ENDPOINT_AUTH || '/auth',
  users: process.env.NEXT_PUBLIC_ENDPOINT_USERS || '/users',
};

async function handleResponse(res: Response) {
  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      document.cookie = 'token=; Max-Age=0; path=/;';
      window.location.href = '/login?expired=true';
    }
    throw new Error('Unauthorized');
  }
  if (!res.ok) return null;
  return await res.json();
}

export async function getNews(token?: string) {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}${ENDPOINTS.news}`, { 
      cache: 'no-store',
      headers
    });
    return (await handleResponse(res)) || [];
  } catch (error) {
    return [];
  }
}

export async function getNewsById(id: string, token?: string) {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}${ENDPOINTS.news}/${id}`, { 
      cache: 'no-store',
      headers
    });
    return await handleResponse(res);
  } catch (error) {
    return null;
  }
}

export async function getCategories(token?: string) {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}${ENDPOINTS.categories}`, { 
      cache: 'no-store',
      headers
    });
    return (await handleResponse(res)) || [];
  } catch (error) {
    return [];
  }
}

export async function loginUser(data: any) {
  return await fetch(`${API_BASE_URL}${ENDPOINTS.auth}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function registerUser(data: any) {
  return await fetch(`${API_BASE_URL}${ENDPOINTS.auth}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function updateUser(token: string, id: string, data: any) {
  return await fetch(`${API_BASE_URL}${ENDPOINTS.users}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function deleteUser(token: string, id: string) {
  return await fetch(`${API_BASE_URL}${ENDPOINTS.users}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
}

export async function createNews(token: string, data: any) {
  return await fetch(`${API_BASE_URL}${ENDPOINTS.news}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function deleteNews(token: string, id: string) {
  return await fetch(`${API_BASE_URL}${ENDPOINTS.news}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
}

export async function updateNews(token: string, id: string, data: any) {
  return await fetch(`${API_BASE_URL}${ENDPOINTS.news}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function createCategory(token: string, data: any) {
  return await fetch(`${API_BASE_URL}${ENDPOINTS.categories}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

export async function deleteCategory(token: string, id: string) {
  return await fetch(`${API_BASE_URL}${ENDPOINTS.categories}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
}

export async function getAllUsers(token?: string) {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}${ENDPOINTS.users}`, { 
      cache: 'no-store',
      headers
    });
    return (await handleResponse(res)) || [];
  } catch (error) {
    return [];
  }
}
