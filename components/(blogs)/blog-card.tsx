import { Blog } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

type Props = {
    blog:Blog
}

const BlogCard = ({blog}: Props) => {
  return (
    <div className="border rounded-lg p-1 h-full">
    <div className="w-full aspect-video relative overflow-hidden rounded-lg">
      <div className="inset-0 absolute bg-black/60 z-10"/>
      <Image src={blog.image} alt="image" fill className="object-contain z-10"/>
      <Image src={blog.image} alt="image" fill className="object-cover blur-md"/>
    </div>
      <h3>{blog.title}</h3>
      <p className='text-xs truncate text-muted-foreground'>{blog.description}</p>
   </div>
  )
}

export default BlogCard