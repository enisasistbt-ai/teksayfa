import Link from "next/link";
import { posts } from "../../../lib/blogPosts";
import { BlogNav, BlogFooter } from "../../../components/BlogChrome";

export const metadata = {
  title: "Blog — MineBio",
  description: "Practical writing on link pages, e-commerce, WhatsApp customer tracking, and staying visible online.",
  alternates: {
    canonical: "https://www.minebio.net/en/blog",
    languages: {
      tr: "https://www.minebio.net/blog",
      en: "https://www.minebio.net/en/blog",
    },
  },
};

export default function BlogIndexEn() {
  const list = posts.en;
  return (
    <div className="corp-landing">
      <BlogNav lang="en" />

      <section className="corp-section" style={{ paddingTop: 80, maxWidth: 720 }}>
        <div className="corp-eyebrow">blog</div>
        <h1 className="corp-display" style={{ fontSize: 36, marginTop: 12, lineHeight: 1.15 }}>
          Posts
        </h1>
        <p style={{ color: "var(--c-body)", marginTop: 14, fontSize: 15.5 }}>
          What we've learned about link pages, e-commerce, and staying on top of customers.
        </p>

        <div style={{ marginTop: 40, display: "grid", gap: 4 }}>
          {list.map((post) => (
            <Link
              href={`/en/blog/${post.slug}`}
              key={post.slug}
              className="corp-card"
              style={{ padding: "20px 22px", textDecoration: "none", color: "inherit", marginBottom: 14, display: "block" }}
            >
              <div style={{ fontSize: 12, color: "var(--c-accent-dim)", fontWeight: 600 }}>
                {new Date(post.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
                {" · "}
                {post.readTime}
              </div>
              <div className="corp-display" style={{ fontSize: 19, marginTop: 8 }}>
                {post.title}
              </div>
              <p style={{ fontSize: 14, color: "var(--c-body)", marginTop: 8, lineHeight: 1.6 }}>{post.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <BlogFooter lang="en" />
    </div>
  );
}
