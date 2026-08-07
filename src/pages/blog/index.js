import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import Seo from '@/components/Seo';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Blog({ allPostsData }) {
  // Temporarily disable the blog page by rendering a simple message
  return (
    <>
      <Seo
        title="Blog | Angel Shinh"
        description="Thoughts, notes, and digital garden of Angel Shinh"
        path="/blog"
      />

      <div className="pt-24 md:pt-28 pb-20 min-h-screen">
        <main className="max-w-[680px] mx-auto px-6">
          <header className="mb-12">
            <span className="eyebrow text-[var(--ink-3)]">Digital garden</span>
            <h1 className="font-heading text-5xl lg:text-6xl mt-4 text-[var(--ink)]">Blog</h1>
            <p className="font-sans text-[var(--ink-2)] text-lg mt-4 leading-relaxed">A digital garden of notes, essays, and learnings. They&apos;re currently on the way - stay tuned!</p>
          </header>
          <Link href="/" className="font-mono text-sm text-[var(--ink)] underline underline-offset-4 decoration-[var(--line-strong)] hover:text-[var(--accent)] hover:decoration-[var(--accent)] transition-colors">
            ← Return home
          </Link>
        </main>
      </div>
    </>
  );
}