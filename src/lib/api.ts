const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(
  path: string,
  options: RequestInit = {},
  credentials: RequestCredentials = "include" // include by default
) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
    },
  });

  const contentType = res.headers.get("Content-Type") ?? "";

  const data = contentType.includes("application/json")
    ? await res.json()
    : null;

  if (!res.ok) {
    throw new Error(data?.error || res.statusText || "Something went wrong");
  }

  return data;
}
