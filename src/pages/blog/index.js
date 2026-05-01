import Head from 'next/head';
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Blog({ allPostsData }) {
  // Group posts by category
  const groupedPosts = allPostsData.reduce((acc, post) => {
    const category = post.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(post);
    return acc;
  }, {});

  // Sort categories alphabetically
  const categories = Object.keys(groupedPosts).sort();

  return (
    <>
      <Head>
        <title>Blog | Angel Shinh</title>
        <meta name="description" content="Thoughts, notes, and digital garden of Angel Shinh" />
      </Head>
      
      <div className="pt-32 pb-20 min-h-screen">
        <main className="max-w-[750px] mx-auto px-6">
          <header className="mb-16">
            <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-4 text-[#1E1E1E]">Blog</h1>
            <p className="font-sans text-gray-600 text-lg">A digital garden of notes, essays, and learnings.</p>
          </header>

          <div className="space-y-20">
            {categories.map((category) => (
              <section key={category}>
                <div className="mb-8">
                  <h2 className="font-heading text-2xl font-bold text-gray-400 tracking-wider uppercase">{category}</h2>
                </div>
                <div className="space-y-12">
                  {groupedPosts[category].map(({ slug, title, date, description }) => (
                    <article key={slug} className="group relative border-b border-black/5 pb-12 last:border-0 last:pb-0">
                      <Link href={`/blog/${slug}`} className="block">
                        <span className="absolute -inset-y-4 -inset-x-4 z-0 scale-95 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:bg-black/5 group-hover:opacity-100 rounded-xl" />
                        <div className="relative z-10 flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                          <h3 className="font-heading text-2xl font-semibold text-[#1E1E1E] group-hover:text-black transition-colors duration-200">
                            {title}
                          </h3>
                          {date && (
                            <time className="font-sans text-sm text-gray-500 mt-1 md:mt-0 md:ml-4 whitespace-nowrap">
                              {new Date(date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </time>
                          )}
                        </div>
                        {description && (
                          <p className="relative z-10 font-sans text-gray-600 mt-2 leading-relaxed">
                            {description}
                          </p>
                        )}
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            ))}
            
            {allPostsData.length === 0 && (
              <p className="font-sans text-gray-500 italic">No posts yet. Check back soon!</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}