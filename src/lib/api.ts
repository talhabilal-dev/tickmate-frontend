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

  const contentType = res.headers.get("Content-Type");

  // Try to parse JSON only if the response looks like JSON
  const data = contentType?.includes("application/json")
    ? await res.json()
    : null;

  if (!res.ok) {
    // Throw error with response data
    throw new Error(data?.error || "Something went wrong");
  }

  return data;
}
