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

export async function getArticlesByCategory({ category }) {
  try {
    const res = await fetch(
      `https://valleynews.onrender.com/api/articles/${category}`
      //`https://valleynews.onrender.com/api/articles/${category}`
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
      //`$https://valleynews.onrender.com/api/articles/${category}/${subcategory}`
    );
    if (res.ok) {
      const articles = await res.json();
      return { ok: true, data: articles };
    }
  } catch (e) {}
}

export async function getArticleById({ id, category, subcategory }) {
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/articles/${category}/${subcategory}/${id}`
    );
    if (res.ok) {
      const articles = await res.json();
      return { ok: true, data: articles };
    }
    return {
      ok: false,
      error:
        "You may have visited an outdated bookmark or mistyped the URL for this page.",
    };
  } catch (e) {
    return {
      ok: false,
      error:
        "You may have visited an outdated bookmark or mistyped the URL for this page.",
    };
  }
}
