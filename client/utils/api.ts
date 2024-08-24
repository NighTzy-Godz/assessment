type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: HeadersInit;
};

export async function fetcher<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {} } = options;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(
      errorResponse.message || "An error occurred while fetching data"
    );
  }

  return response.json();
}
