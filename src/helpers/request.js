export async function RequestFN(url) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
