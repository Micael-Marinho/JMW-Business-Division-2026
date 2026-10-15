export async function api(path, method = "GET", body) {
  const response = await fetch(`/api/${path}`, {
    method,
    credentials: "same-origin",
    headers: body === undefined ? {} : { "Content-Type": "application/json" },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const data = await response
    .json()
    .catch(() => ({ error: "O servidor não respondeu como esperado." }));
  if (!response.ok)
    throw Object.assign(
      new Error(data.error || "Não foi possível concluir a ação."),
      { fields: data.fields || {}, status: response.status },
    );
  return data;
}
