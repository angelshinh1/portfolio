import Head from 'next/head';
import Link from 'next/link';
import { getAllPostSlugs, getPostData } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  // Simple reading time estimate based on 200 words per minute
  const wordCount = postData.content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const formattedDate = postData.date ? new Date(postData.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  return (
    <>
      <Head>
        <title>{postData.title} | Angel Shinh</title>
        {postData.description && <meta name="description" content={postData.description} />}
      </Head>

      <div className="pt-32 pb-24 min-h-screen">
        <article className="max-w-[750px] mx-auto px-6">
          <header className="mb-12">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-sm font-sans text-gray-500 hover:text-[#1E1E1E] transition-colors duration-200 mb-8"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to blog
            </Link>

            <h1 className="font-heading text-3xl md:text-5xl font-bold text-[#1E1E1E] mb-6 leading-tight">
              {postData.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 font-sans text-sm text-gray-500">
              {formattedDate && <time dateTime={postData.date}>{formattedDate}</time>}
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span>{readingTime} min read</span>
            </div>
            
            {postData.tags && postData.tags.length > 0 && (
              <div className="mt-6 flex gap-2 flex-wrap">
                {postData.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-black/5 rounded-full text-xs font-sans font-medium text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-lg prose-slate max-w-none font-sans mt-8
            prose-headings:font-heading prose-headings:text-[#1E1E1E]
            prose-h2:mt-12 prose-h2:mb-6
            prose-h3:mt-8 prose-h3:mb-4
            prose-p:leading-relaxed prose-p:text-gray-800
            prose-a:text-[#1E1E1E] prose-a:underline prose-a:decoration-black/20 hover:prose-a:decoration-[#14A390] prose-a:underline-offset-4 prose-a:transition-colors
            prose-pre:bg-[#1E1E1E] prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:shadow-sm
            prose-code:text-[#1E1E1E] prose-code:bg-black/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
            prose-blockquote:border-l-[#1E1E1E] prose-blockquote:bg-black/5 prose-blockquote:py-1 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
            prose-li:text-gray-800"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {postData.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </>
  );
}