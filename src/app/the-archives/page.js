import ArticleFiltersWidget from "../_components/the-archives/article-filters-widget";
import ArticleList from "../_components/the-archives/article-list";

export const metadata = {
    title: 'The Archives',
    description: `Explore all previous posts to the blog with robust searching features`
};

export default function TheArchives({ params }) { // eslint-disable-line
    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold uppercase mb-5">
                The Archives
            </h1>
            <ArticleFiltersWidget />
            <ArticleList />
        </>
    )
}