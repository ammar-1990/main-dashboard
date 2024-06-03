import { Blog } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

type Props = {
    blog:Blog
}

const BlogCard = ({blog}: Props) => {
  return (
    <div className="border rounded-lg p-1 h-full">
    <div className="relative aspect-video overflow-hidden rounded-lg">
      <Image src={blog.image} fill alt="blog-image" className="object-contain" />
      </div>
      <h3>{blog.title}</h3>
      <p className='text-xs truncate text-muted-foreground'>{blog.description}</p>
   </div>
  )
}

export default BlogCard