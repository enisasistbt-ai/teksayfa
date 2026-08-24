import Link from "next/link";
import { posts } from "../../lib/blogPosts";
import { BlogNav, BlogFooter, BlogCover } from "../../components/BlogChrome";

export const metadata = {
  title: "Blog — MineBio",
  description:
    "Bağlantı sayfası, e-ticaret, WhatsApp müşteri takibi ve dijital görünürlük üzerine pratik yazılar.",
  alternates: {
    canonical: "https://www.minebio.net/blog",
    languages: {
      tr: "https://www.minebio.net/blog",
      en: "https://www.minebio.net/en/blog",
    },
  },
};

export default function BlogIndex() {
  const list = posts.tr;
  return (
    <div className="corp-landing">
      <BlogNav lang="tr" />

      <section className="corp-section" style={{ paddingTop: 80, maxWidth: 720 }}>
        <div className="corp-eyebrow">blog</div>
        <h1 className="corp-display" style={{ fontSize: 36, marginTop: 12, lineHeight: 1.15 }}>
          Yazılar
        </h1>
        <p style={{ color: "var(--c-body)", marginTop: 14, fontSize: 15.5 }}>
          Bağlantı sayfası, e-ticaret ve müşteri takibi üzerine öğrendiklerimiz.
        </p>

        <div style={{ marginTop: 40, display: "grid", gap: 4 }}>
          {list.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="corp-card"
              style={{ padding: "20px 22px", textDecoration: "none", color: "inherit", marginBottom: 14, display: "block" }}
            >
              <BlogCover src={post.cover} alt={post.title} />
              <div style={{ fontSize: 12, color: "var(--c-accent-dim)", fontWeight: 600, marginTop: post.cover ? 14 : 0 }}>
                {new Date(post.date).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
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

      <BlogFooter lang="tr" />
    </div>
  );
}
