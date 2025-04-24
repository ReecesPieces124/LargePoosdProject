import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
function Post() {
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages([...images, ...Array.from(event.target.files)]);
    }
  };

  return (
    <>
      <div className="p-4 border rounded-md shadow-sm w-180 mx-auto mt-20">
        <div
          onClick={() => document.getElementById("file-upload")?.click()}
          className="mb-1 h-80 w-full bg-gray-100 shadow-1xl rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-300"
        ></div>
        <Input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
        <Button className="text-sm px-2 py-1 mt-2">Add Image</Button>
      </div>

      <div className="w-180 mx-auto mt-5">
        <div className="mb-2">
          <Input
            id="city"
            placeholder="City"
            className="text-sm px-2 py-1 w-full mx-auto"
          />
        </div>

        <div className="flex gap-4 mb-3">
          <Input
            id="state"
            placeholder="State"
            className="text-sm px-2 py-1 w-full border rounded-md"
          />
          <select
            id="adult"
            className="text-sm px-2 py-1 w-full border rounded-md"
          >
            <option value="" disabled selected>
              Adult
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="mb-1.5 relative">
          <p className="text-sm font-medium text-gray-700 mb-0.5 text-left">Your description</p>
          <div className="relative">
            <Input
              id="description"
              placeholder=" "
              className="text-sm px-1 py-10 w-full mx-auto peer"
            />
            <label
              htmlFor="description"
              className="absolute text-sm text-gray-800 left-2 top-2 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-600 peer-focus:opacity-0 peer-focus:top-0"
            >
              Type your description here
            </label>
          </div>
          <p className="text-sm text-gray-500 text-left">✍️ Give your cat a cuddly bio.</p>
        </div>

        <div className="flex justify-between">
          <Button className="text-sm px-2 bg-black hover:bg-gray-700 w-30 ml-55">
            Cancel
          </Button>
          <Button className="text-sm px-2 bg-black hover:bg-gray-700 w-30 mr-55">
            Post
          </Button>
        </div>
      </div>
    </>
  );
}

export default Post;
