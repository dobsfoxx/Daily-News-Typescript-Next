import { Article } from "@/types/news";
import Link from "next/link";
import { createUniqueSlug } from "@/utils/slug";

type Props = {
  article: Article;
};

export default function Card({ article }: Props) {
  const slug = createUniqueSlug(article.title, article.url);
  
  return (
    <div className="border-4 border-gray-700 rounded-3xl overflow-hidden hover:translate-y-1 duration-75">
      <Link href={`/news/${slug}`}>
        {article.urlToImage && (
          <picture>
            <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full object-cover h-48
"
          />
          </picture>

        )}
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">{article.title}</h2>
          <p className="text-gray-700 text-sm  mb-4">
            {article.description}
          </p>
          <div className="space-y-1">
            <p className="text-gray-500 text-xs">
              Font: {article.source.name}
            </p>
            <p className="text-gray-500 text-xs">
              Published at: {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
