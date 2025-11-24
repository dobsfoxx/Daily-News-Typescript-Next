import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white ">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-4xl font-bold font-serif sm:text-3xl md:text-4xl sm:p-3">
            Daily News
          </Link>
          <div className="space-x-6 font-bold">
            <Link href="/">Home</Link>
            <Link href="/news/categories">Categories</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
