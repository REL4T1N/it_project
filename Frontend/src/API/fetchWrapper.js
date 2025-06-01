const SERVER_URL = "";

export async function fetchWrapper(
  endpoint,
  { method = "GET", body = null, headers = {} } = {},
) {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include",
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  const response = await fetch(`${SERVER_URL}${endpoint}`, config);
  if (!response.ok) {
    let message = `Ошибка: ${response.status}`;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      message = errorData.detail || JSON.stringify(errorData);
    } else {
      const text = await response.text();
      message = text || message;
    }
    const error = new Error()
    error.status = response.status;
    error.message = message;
    throw error;
  }
  return await response.json();
}
