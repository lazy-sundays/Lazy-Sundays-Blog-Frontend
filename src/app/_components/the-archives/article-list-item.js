import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";

export default function ArticleListItem({ article }) {
  return (
    <li
      className={`relative flex flex-col sm:flex-row group ${"py-6"} mx-2 sm:px-8 hover:bg-bgsecondary`}
      key={article.id}
    >
      {article.hero != null && (
        <div className="relative aspect-16/9 h-28">
          <Image
            src={article.hero}
            alt={article.heroAltText || "Hero Image"}
            fill
            className="object-center object-cover"
          />
        </div>
      )}
      <div className="flex flex-col sm:ml-2">
        <span className="text-xs text-accentsecondary">
          {new Date(article.publishedAt).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
          })}
        </span>
        <h3 className="text-xl font-semibold group-hover:underline group-hover:decoration-accentprimary group-hover:decoration-2">
          {article.title}
        </h3>
        <span className="text-sm italic text-texttertiary ">
          {article.tagline}
        </span>
        <span className="text-sm italic">
          {article.authors.map((author, i, all) => {
            return (
              <Fragment key={author.id}>
                <span className="">By: {author.name}</span>
                {all.length > 1 && i < all.length - 1 ? ", " : ""}
              </Fragment>
            );
          })}
        </span>
        <span className="text-sm italic group-hover:decoration-accentprimary group-hover:decoration-2">
          ~ {Math.round(article.readTime)} min. read
        </span>
      </div>
      <Link href={`/articles/${article.slug}`} aria-label={"read article"}>
        <span className="absolute inset-0" aria-hidden />
      </Link>
    </li>
  );
}
