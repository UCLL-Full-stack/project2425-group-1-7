const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getRecepten = async () => {
  const response = await fetch(`${API_URL}/recepten`, { method: 'GET' });
  if (!response.ok) throw new Error('Failed to fetch recepten');
  return response.json();
};

export const getReceptById = async (id: number) => {
  const response = await fetch(`${API_URL}/recepten/${id}`, { method: 'GET' });
  if (!response.ok) throw new Error('Failed to fetch recept by id');
  return response.json();
};

export const createRecept = async (data: { naam: string; beschrijving: string ; categorieId: Number }) => {
  const response = await fetch(`${API_URL}/recepten`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create recept');
  return response.json();
};