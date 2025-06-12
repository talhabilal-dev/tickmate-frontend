const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(
  path: string,
  options: RequestInit = {},
  credentials?: RequestCredentials
) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(credentials && { credentials }),
      ...(options.headers || {}),
    },
  });

  return res.json();
}
