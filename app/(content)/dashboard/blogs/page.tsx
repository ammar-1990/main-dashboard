import BlogsFeed from "@/components/(blogs)/blogs-feed";
import CategoryFeed from "@/components/(category)/category-feed";
import Heading from "@/components/heading";
import ModalButton from "@/components/modalButton";
import React from "react";

type Props = {};

export const revalidate = 0

const page = (props: Props) => {
  return (
    <div className="full">
      <div className="flex flex-col md:!flex-row  md:justify-between md:items-center gap-1">
        <Heading title="Blogs" description="Manage your blogs" />
        <ModalButton
          className=""
          title="Create Category"
          modalInputs={{ type: "category" }}
        />
      </div>

      {/*categories feed */}

      <div className="mt-12">
        <h3 className="font-semibold mb-1">Category&apos;s Table</h3>
        <div className=" border bg-white rounded-lg overflow-hidden">
          <CategoryFeed />
        </div>
      </div>

      {/* blogs feed */}
      <div className="mt-40">
        <h3 className="capitalize font-semibold">blogs list</h3>
        <div className="mt-1">
          <BlogsFeed />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default page;
