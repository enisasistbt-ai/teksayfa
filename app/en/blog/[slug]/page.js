import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "../../../../lib/blogPosts";
import { BlogNav, BlogFooter, renderBlocks } from "../../../../components/BlogChrome";

export function generateStaticParams() {
  return posts.en.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost("en", params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — MineBio Blog`,
    description: post.description,
    alternates: {
      canonical: `https://www.minebio.net/en/blog/${post.slug}`,
      languages: {
        tr: `https://www.minebio.net/blog/${post.slug}`,
        en: `https://www.minebio.net/en/blog/${post.slug}`,
      },
    },
  };
}

export default function BlogPostEn({ params }) {
  const post = getPost("en", params.slug);
  if (!post) notFound();

  return (
    <div className="corp-landing">
      <BlogNav lang="en" />

      <article className="corp-section" style={{ paddingTop: 80, maxWidth: 680 }}>
        <Link href="/en/blog" style={{ fontSize: 13.5, color: "var(--c-accent-dim)" }}>
          ← All posts
        </Link>

        <div style={{ fontSize: 12, color: "var(--c-accent-dim)", fontWeight: 600, marginTop: 20 }}>
          {new Date(post.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
          {" · "}
          {post.readTime}
        </div>

        <h1 className="corp-display" style={{ fontSize: 32, marginTop: 10, lineHeight: 1.2 }}>
          {post.title}
        </h1>

        <div>{renderBlocks(post.content)}</div>

        <div style={{ marginTop: 48, textAlign: "center" }}>
          <Link href="/login" className="corp-btn">
            Start free
          </Link>
        </div>
      </article>

      <BlogFooter lang="en" />
    </div>
  );
}
