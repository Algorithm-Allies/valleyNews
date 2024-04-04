import React, { useState, useEffect } from "react";
import { getAllArticles } from "../services/articleService";

function Homepage({ data }) {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await getAllArticles();
        if (res.ok) {
          setArticles(res.data);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Homepage</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h2>{article.headline}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Homepage;
