function getHeaders(headers?: HeadersInit) {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json",
    ...(headers || {}),
  };
}

export default getHeaders;
