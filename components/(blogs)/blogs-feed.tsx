import prisma from "@/lib/prisma";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "./blog-card";

type Props = {};

const BlogsFeed = async (props: Props) => {
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-stretch ">
      <Link
        href={"/dashboard/blogs/new"}
        className="flex flex-col relative items-center justify-center border rounded-md cursor-pointer overflow-hidden w-full group min-h-[300px] bg-white shadow-md"
      >
        <div className="inset-0 gap-2 absolute w-full h-full bg-black opacity-0 group-hover:opacity-50 transition" />
        <h3 className="font-medium">Create new blog</h3>
        <PlusCircle />
      </Link>

      {blogs.map((blog) => (
        <Link key={blog.id} href={`/dashboard/blogs/${blog.slug}`}>
          {" "}
          <BlogCard blog={blog} />
        </Link>
      ))}
    </div>
  );
};

export default BlogsFeed;
