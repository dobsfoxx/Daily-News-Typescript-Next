import { Article } from "@/types/news";
import newsAPI from "./axios";
import { createUniqueSlug } from "@/utils/slug";
import { mockArticles, mockArticlesByCategory } from "@/data/mockNews";

type Data = {
  articles: Article[];
};

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const response = await newsAPI.get<Data>("/top-headlines", {
      params: {
        country: "us",
        apiKey: process.env.NEWS_API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching articles, using mock data as fallback:", error);
    return mockArticles;
  }
};
export const fetchArticleById = async (id: string): Promise<Article | null> => {
  try {
    const response = await newsAPI.get<Data>("/top-headlines", {
      params: {
        country: "us",
        apiKey: process.env.NEWS_API_KEY,
      },
    });
    const article = response.data.articles.find(
      (article) => article.source.id === id
    );
    return article || null;
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    return null;
  }
};
export const fetchArticlesByCategory = async (
  category: string
): Promise<Article[]> => {
  try {
    const response = await newsAPI.get<Data>("/top-headlines", {
      params: {
        country: "us",
        category: category,
        apiKey: process.env.NEWS_API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error(`Error fetching articles for category ${category}, using mock data as fallback:`, error);
    return mockArticlesByCategory[category as keyof typeof mockArticlesByCategory] || mockArticles.slice(0, 3);
  }
};
export const fetchArticlesByCountry = async (
  country: string
): Promise<Article[]> => {
  try {
    const response = await newsAPI.get<Data>("/top-headlines", {
      params: {
        country: country,
        apiKey: process.env.NEWS_API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error(`Error fetching articles for country ${country}, using mock data as fallback:`, error);
    return mockArticles;
  }
}

export const fetchArticleBySlug = async (
  slug: string
): Promise<Article | null> => {
  try {
    const response = await newsAPI.get<Data>("/top-headlines", {
      params: {
        country: "us",
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    let article = response.data.articles?.find((article) => {
      const expectedSlug = createUniqueSlug(article.title, article.url);
      return expectedSlug === slug;
    });

    if (!article) {
      const categories = getAvailableCategories();
      for (const category of categories) {
        try {
          const categoryResponse = await newsAPI.get<Data>("/top-headlines", {
            params: {
              country: "us",
              category: category,
              apiKey: process.env.NEWS_API_KEY,
            },
          });

          article = categoryResponse.data.articles?.find((article) => {
            const expectedSlug = createUniqueSlug(article.title, article.url);
            return expectedSlug === slug;
          });

          if (article) break;
        } catch (categoryError) {
          console.error(`Error fetching category ${category}:`, categoryError);
        }
      }
    }

    return article || null;
  } catch (error) {
    console.error("Error fetching article by slug, searching in mock data:", error);
    
    
    const allMockArticles = [
      ...mockArticles,
      ...Object.values(mockArticlesByCategory).flat()
    ];
    
    const mockArticle = allMockArticles.find((article) => {
      const expectedSlug = createUniqueSlug(article.title, article.url);
      return expectedSlug === slug;
    });
    
    return mockArticle || null;
  }
};

export const getAvailableCategories = (): string[] => {
  return [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
};
