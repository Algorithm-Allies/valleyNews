import axios from "axios";

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

export async function getArticlesByBusiness(id) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/articles/business/${id}`
    );
    return res.json();
  } catch (e) {
    console.error("Error fetching articles by business:", e);
    throw e;
  }
}

export async function deleteArticle(id) {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/articles/delete/${id}`
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
}
