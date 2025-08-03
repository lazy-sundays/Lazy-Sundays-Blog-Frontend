import TheArchivesClient from "./client";

export const metadata = {
  title: "The Archives",
  description: `Explore all previous posts to the blog with robust searching features`,
};

export default function TheArchives({ params }) {
  return <TheArchivesClient params={params} />;
}
