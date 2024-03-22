export async function getAllArticles() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/articles`);
    if (res.ok) {
      const articles = await res.json();
      return { ok: true, data: articles };
    }
    // check status code to handle error states for authorization errors and server errors
  } catch (e) {}
}

export async function getArticlesByCategory({ category }) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/articles/${category}`
    );
    if (res.ok) {
      const articles = await res.json();
      return { ok: true, data: articles };
    }
    // check status code to handle error states for authorization errors and server errors
  } catch (e) {}
}

export async function getArticlesByCategoryAndSubcategory({
  category,
  subcategory,
}) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/articles/${category}/${subcategory}`
    );
    if (res.ok) {
      const articles = await res.json();
      return { ok: true, data: articles };
    }
  } catch (e) {}
}

export async function getArticleById({ id }) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/articles/${id}`);
    if (res.ok) {
      const articles = await res.json();
      return { ok: true, data: articles };
    }
  } catch (e) {}
}
