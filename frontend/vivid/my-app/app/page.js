"use client"

import * as React from 'react'
import Blogs from './components/Blogs'
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter()

  const handleBlogClick = (blog) => {
    router.push(`/${blog.slug}`)

  }

  return (
    <main >
      <Blogs onBlogClick={handleBlogClick} />
      {/* {isSingleBlog ? (
        <SingleBlog blogData={singleBlogData}/>
      ) : (
        <Blogs onBlogClick={handleBlogClick} />
      )} */}
    </main>
  )
}
