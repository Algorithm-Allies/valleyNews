export async function getAllArticles() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/articles`
      //`https://valleynews.onrender.com/api/articles`
    );
    if (res.ok) {
      const articles = await res.json();
      return { ok: true, data: articles };
    }
    // check status code to handle error states for authorization errors and server errors
  } catch (e) {}
}

export async function getArticlesByCategory({ category, page, perPage }) {
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/articles/${category}?page=${page}&perPage=${perPage}`
      //`http://localhost:4500/api/articles/${category}?page=${page}&perPage=${perPage}`
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
  page,
  perPage,
}) {
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/articles/${category}/${subcategory}?page=${page}&perPage=${perPage}`
      //`http://localhost:4500/api/articles/${category}/${subcategory}?page=${page}&perPage=${perPage}`
    );
    if (res.ok) {
      const articles = await res.json();
      return { ok: true, data: articles };
    }
  } catch (e) {}
}

export async function getArticleById({ id }) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/articles/${id}`
      //`https://valleynews.onrender.com/api/articles/${id}`
    );
    if (res.ok) {
      const articles = await res.json();
      return { ok: true, data: articles };
    }
  } catch (e) {}
}
