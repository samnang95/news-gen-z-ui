export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export async function getNews() {
  try {
    const res = await fetch(`${API_BASE_URL}/news`, { cache: 'no-store' });
    if (!res.ok) {
        console.error('Failed to fetch news', res.status);
        return [];
    }
    return await res.json();
  } catch (error) {
    console.error('API Connection Error:', error);
    return [];
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('API Connection Error:', error);
    return [];
  }
}
