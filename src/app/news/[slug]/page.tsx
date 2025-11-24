import { Article } from "@/types/news";
import { fetchArticleBySlug } from "@/api/articles";
import Link from "next/link";


type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const details = await fetchArticleBySlug(slug);

  if (!details) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: details.title,
    description: details.description || "News Article",
  };
}

export default async function News({ params }: Props) {
  const { slug } = await params;
  const article: Article | null = await fetchArticleBySlug(slug);

  if (!article) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Article not founded.
        </h1>
        <p className="mb-4">
          This article doesnt exists or have been removed.
        </p>
        <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Link
        href="/"
        className="text-blue-300 hover:text-blue-900 mb-4 inline-block"
      >
        ← Back to News
      </Link>

      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{article.title}</h1>

        {article.urlToImage && (
          <picture  className="mb-6">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-auto rounded-lg"
             
            />
          </picture>
        )}

        <div className=" mb-6">
          <p className="text-lg leading-relaxed">
            {article.content || article.description}
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <p>
              <strong>Author:</strong> {article.author || "Desconhecido"}
            </p>
            <p>
              <strong>Font:</strong> {article.source.name}
            </p>
            <p>
              <strong>Published at:</strong>{" "}
              {new Date(article.publishedAt).toLocaleDateString("pt-BR")}
            </p>
          </div>

          {article.url && (
            <div className="mt-4">
              <a href={article.url} className="text-blue-600 underline">
                See the original article →
              </a>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
