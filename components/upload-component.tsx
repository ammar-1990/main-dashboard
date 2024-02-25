"use client";

import { UploadDropzone } from "@/lib/uploadthings";
import { Loader, XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import "@uploadthing/react/styles.css";

type UploadProps = {
  image?: string;
  onChange: (image: string) => void;
};

export const UploadComponent = ({ image, onChange }: UploadProps) => {
  const [loading, setLoading] = useState(false);

  if (image || loading)
    return (
      <div className="relative h-20 w-20 rounded-lg flex items-center justify-center border">
        {image && (
          <Image src={image} alt="Image" fill className="object-cover" />
        )}
        {loading && <Loader className="animate-spin" />}
        <button
          title="delete image"
          type="button"
          className="absolute top-0 right-0 text-white bg-rose-500 p-1 rounded-full"
        >
          {" "}
          <XIcon className="w-3 h-3" onClick={() => onChange("")} />
        </button>
      </div>
    );
  return (
    <UploadDropzone
    
    className="aspect-square max-w-[350px] cursor-pointer text-muted-foreground"
      endpoint="imageUploader"
      onUploadBegin={()=>  console.log('hi')}
      onUploadProgress={() => {setLoading(true);  console.log('hi')}}
      onClientUploadComplete={(res) => {
        console.log('hi')
        setLoading(false);
        onChange(res[0].url);
        console.log("Files: ", res);
      }}
      onUploadError={(error: Error) => {}}
    />
  );
};

export default UploadComponent;
