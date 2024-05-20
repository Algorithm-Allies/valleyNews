import fetchWithAuth from "../lib/fetchWithAuth";

export const createBusinessArticle = async (body) => {
  const response = await fetchWithAuth(`/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return data;
};
