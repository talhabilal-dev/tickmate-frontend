const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(
  path: string,
  options: RequestInit = {},
  credentials: RequestCredentials = "include"
) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  return res.json();
}
