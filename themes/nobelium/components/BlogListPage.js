
import BLOG from '@/blog.config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import Link from 'next/link'
import BlogPost from './BlogPost'

export const BlogListPage = props => {
  const { page = 1, posts, postCount } = props
  const { locale } = useGlobal()
  const router = useRouter()
  const totalPage = Math.ceil(postCount / BLOG.POSTS_PER_PAGE)
  const currentPage = +page

  const showPrev = currentPage > 1
  const showNext = page < totalPage
  const pagePrefix = router.asPath.replace(/\/page\/[1-9]\d*/, '').replace(/\/$/, '')

  return <div className="w-full md:pr-12 mb-12">

        <div id="container">
            {posts?.map(post => (
               <BlogPost key={post.id} post={post}/>
            ))}
        </div>

        <div className="flex justify-between text-xs">
            <Link href={{ pathname: currentPage - 1 === 1 ? `${pagePrefix}/` : `${pagePrefix}/page/${currentPage - 1}`, query: router.query.s ? { s: router.query.s } : {} }}>
                <a className={`${showPrev ? '  ' : ' invisible block pointer-events-none '}no-underline py-2 px-3 rounded`}>
                    <button rel="prev" className="block cursor-pointer">
                    ← {locale.PAGINATION.PREV}
                     </button>
                </a>
            </Link>
            <Link href={{ pathname: `${pagePrefix}/page/${currentPage + 1}`, query: router.query.s ? { s: router.query.s } : {} }}>
                <a className={`${showNext ? '  ' : 'invisible pointer-events-none '}  no-underline py-2 px-3 rounded`}>
                    <button rel="next" className="block cursor-pointer">
                    {locale.PAGINATION.NEXT} →
                    </button>
                </a>
            </Link>
        </div>
    </div>
}
