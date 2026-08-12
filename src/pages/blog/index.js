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
            <h1 className="type-title mt-4 text-[var(--ink)]">Blog</h1>
            <p className="font-sans type-lead text-[var(--ink-2)] mt-5">A digital garden of notes, essays, and learnings. They&apos;re currently on the way - stay tuned!</p>
          </header>
          <Link href="/" className="press font-mono text-sm text-[var(--ink)] underline underline-offset-4 decoration-[var(--line-strong)] hover:text-[var(--accent)] hover:decoration-[var(--accent)] transition-colors">
            ← Return home
          </Link>
        </main>
      </div>
    </>
  );
}