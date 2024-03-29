import BlogsFeed from "@/components/(blogs)/blogs-feed";
import CategoryFeed from "@/components/(category)/category-feed";
import Heading from "@/components/heading";
import ModalButton from "@/components/modalButton";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="flex md:items-center md:justify-between md:flex-row flex-col gap-3">
        <Heading title="Blogs" description="Manage your blogs" />
        <ModalButton
          className=""
          title="Create Category"
          modalInputs={{ type: "category" }}
        />
      </div>

      {/*categories feed */}
      <div className="mt-12">
        <CategoryFeed />
      </div>

      {/* blogs feed */}
      <div className="mt-24">
        <h3 className="capitalize font-medium">blogs list</h3>
        <div className="mt-4">
          <BlogsFeed />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default page;
