"use client";
import React, { useState, useEffect } from "react";
import Card from "../cards/Card"; // <-- import your existing Card component

const HelloAgain = () => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  type Article = {
    title: string;
    description?: string;
    urlToImage?: string;
    url: string;
    // add other properties if needed
  };

  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pageSize = 6;

  const fetchData = async (pageNumber: number) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=keyword&page=${pageNumber}&pageSize=${pageSize}&apiKey=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setArticles(data.articles || []);
      setTotalResults(data.totalResults || 0);
    } catch (error) {
      setError("Failed to fetch articles. Please try again later.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">News</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && articles.length === 0 && <p>No articles found.</p>}

      {/* Card Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {!loading &&
          !error &&
          articles.map((article, index) => (
            <Card
              key={index}
              title={article.title}
              description={article.description ?? ""}
              imageUrl={article.urlToImage}
              url={article.url}
            />
          ))}
      </div>

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HelloAgain;
