import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../services/articleService";
import {
  CalendarDaysIcon,
  NewspaperIcon,
  UserCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import { isValidArticleLink } from "../lib/articleUrlHelpers";
import axios from "axios";

export default function ArticlePage() {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const { category, subcategory, id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    if (!isValidArticleLink({ category, subcategory })) {
      setError(
        "You may have visited an outdated bookmark or mistyped the URL for this page."
      );
      setIsLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        const res = await getArticleById({ id, category, subcategory });
        if (res.ok) {
          setArticle(res.data);
          return;
        }
        // if response is not ok that means that the article doesnt exist or something is wrong with server or DB.  So a user can enter a invalid url like /news/crime/thisdoesnotexist.  We can redirect them back to 404 page.  Also the user can also enter invalid categories and subcategories, so we have to be cautious of that.  In that case, redirect them to 404 page as well;
        setError(res.error);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [category, subcategory, id]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(
          `http://localhost:4500/api/comments/article/${id}`
        );
        setComments(response.data);
        console.log("comments", response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("Error fetching comments");
        setIsLoading(false);
      }
    }

    fetchComments();
  }, [id]);

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const deleteComment = (deletedCommentId) => {
    setComments(comments.filter((comment) => comment.id !== deletedCommentId));
  };

  if (isLoading) {
    return <p>Loading ....</p>;
  }

  if (error) {
    return (
      <div className="text-center text-gray-700 mt-8 space-y-2">
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <p className="text-base">{error}</p>
      </div>
    );
  }

  const {
    headline,
    subheading,
    image_url,
    image_alt_description,
    date_published,
    publisher,
    author,
    paragraphs,
    source,
  } = article;

  return (
    <div className="bg-brown-100 min-h-screen">
      <div className="max-w-3xl py-20 mx-auto text-stone-700 space-y-12">
        <article>
          <div className="space-y-1 mb-2">
            <h1 className="text-2xl font-bold text-pretty">{headline}</h1>
            {subheading && <p className="text-base">{subheading}</p>}
          </div>
          <div className="flex gap-1 items-center text-sm  mb-6">
            <p className="font-semibold">{category}</p>
            <ChevronRightIcon className="size-4 text-gray-500" />
            <p className="font-semibold">{subcategory}</p>
          </div>
          <img
            src={image_url}
            className="w-full h-[400px] object-cover rounded-md mb-3"
            alt={image_alt_description}
          />
          <div className="flex items-center gap-4 mb-6 text-sm text-stone-500">
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="size-4" />
              <p className="font-semibold">{date_published}</p>
            </div>

            <span className="block h-4 bg-brown-200 w-[2px]"></span>
            <div className="flex items-center gap-2">
              <NewspaperIcon className="size-4" />
              <p className="font-semibold">{publisher}</p>
            </div>
            <span className="block h-4 bg-brown-200 w-[2px]"></span>
            <div className="flex items-center gap-2">
              <UserCircleIcon className="size-4" />
              <p className="font-semibold">{author}</p>
            </div>
          </div>
          <div className="space-y-4 mb-6">
            {paragraphs.map((paragraph, idx) => (
              <p key={idx} className="text-base">
                {paragraph}
              </p>
            ))}
          </div>
          <a
            className="inline-flex rounded items-center px-4 h-10  bg-brown-400 text-white"
            href={source}
          >
            Original Article
          </a>
        </article>
        <div className="space-y-8">
          <CommentForm articleId={id} addComment={addComment} />
          <CommentList comments={comments} deleteComment={deleteComment} />
        </div>
      </div>
    </div>
  );
}
