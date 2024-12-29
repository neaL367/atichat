import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { getContentList } from "@/lib/content";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const BlogPostComponent = dynamic(
    () => import(`@/content/blog/${params.slug}.mdx`),
    { loading: () => <p>Loading...</p> }
  );

  if (!BlogPostComponent) {
    notFound();
  }

  return <BlogPostComponent />;
}

export async function generateStaticParams() {
  const posts = getContentList("blog");
  return (await posts).map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = false;
