"use client";

import { useBlog } from "@/hooks/blog.hook";
import { Blog, Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import UploadComponent from "../upload-component";
import ModalButton from "../modalButton";
import { deleteBlog } from "@/actions/blog-actions";
import { Loader } from "lucide-react";

const Editor = dynamic(() => import("../../components/editor-blocknote"), {
  ssr: false,
});

type Props = {
  blog: Blog | null;
  categories: Category[];
};

const BlogsForm = ({ blog, categories }: Props) => {
  const { form, onSubmit } = useBlog(blog);
  const isLoading = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="Select Cateogry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem
                      className="capitalize"
                      key={cat.id}
                      value={cat.id}
                    >
                      {cat.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Short description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="blog slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="blog author" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Editor
                  onChange={field.onChange}
                  initialContent={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <UploadComponent
                  image={field.value}
                  onChange={(val) => field.onChange(val)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-1">
          <Button disabled={isLoading} className="w-full" type="submit">
            {blog ? "Update" : "Create"}
            {isLoading && <Loader className="ml-2 h-3 w-3 animate-spin" />}
          </Button>
          {blog && (
            <ModalButton
              className=" w-full"
              title="Delete"
              modalInputs={{
                type: "delete",
                id: blog.id,
                deleteFunction: deleteBlog,
                backUrl:'/dashboard/blogs'
              }}
              variant={"destructive"}
            />
          )}
        </div>
      </form>
    </Form>
  );
};

export default BlogsForm;
