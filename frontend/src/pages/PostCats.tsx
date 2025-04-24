import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { createCat } from "@/catsHelpers";

function PostCat() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const [data, setData] = useState({
    city: "",
    state: "",
    age: "",
    zip: "",
    name: "",
    description: "",
    gender: "",
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!image) {
        throw new Error("Please upload an image");
      }

      // Convert image to base64
      const imageBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
      console.log(imageBase64);
      // Submit with token
      await createCat(
        {
          ...data,
          imageURL: imageBase64
        }, 
        token);
      
      // Reset form after successful submission
      setData({
        city: "",
        state: "",
        age: "",
        zip: "",
        name: "",
        description: "",
        gender: "",
      });
      setImage(null);
      setPreview(null);

      alert("Cat posted successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post cat");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6 border rounded-lg shadow-lg w-[900px] mx-auto mt-30 flex gap-4">
        <div
          onClick={() => document.getElementById("file-upload")?.click()}
          className="h-[500px] w-[75%] bg-gray-100 shadow-2xl rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover rounded-lg"
            />
          ) : (
            <span className="text-lg font-medium">Click to upload image</span>
          )}
        </div>
        <Input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <div className="w-[55%]">
          <div className="mb-4">
            <Input
              id="name"
              placeholder="Name"
              className="text-base px-3 py-2 w-full"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <Input
              id="city"
              placeholder="City"
              className="text-base px-3 py-2 w-full"
              value={data.city}
              onChange={(e) => setData({ ...data, city: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <Input
              id="zip"
              placeholder="Zip"
              className="text-base px-3 py-2 w-full"
              value={data.zip}
              onChange={(e) => setData({ ...data, zip: e.target.value })}
            />
          </div>
          <div className="flex gap-6 mb-4">
            <Input
              id="state"
              placeholder="State"
              className="text-base px-3 py-2 w-full border rounded-lg"
              value={data.state}
              onChange={(e) => setData({ ...data, state: e.target.value })}
            />
            <select
              id="age"
              className="text-base px-3 py-2 w-full border rounded-lg"
              value={data.age}
              onChange={(e) => setData({ ...data, age: e.target.value })}
            >
              <option value="" disabled>
                Age
              </option>
              <option value="baby">Baby</option>
              <option value="young">Young</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </select>
          </div>
          <div className="flex gap-6 mb-4">
            <select
              id="gender"
              className="text-base px-3 py-2 w-full border rounded-lg"
              value={data.gender}
              onChange={(e) => setData({ ...data, gender: e.target.value })}
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className=" relative">
            <label
              htmlFor="description"
              className="text-base font-medium text-gray-700 mb-1 text-left block"
            >
              Your description
            </label>
            <textarea
              id="description"
              placeholder="Type your description here"
              className="text-base px-2 py-2 w-full border rounded-lg resize-none"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              rows={5}
            />
            <p className="text-sm text-gray-500 text-left mt-1">
              ✍️ Give your cat a cuddly bio.
            </p>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="flex justify-center mt-4 gap-4">
            <Button
              type="button"
              className="text-base px-4 py-2 bg-black hover:bg-gray-700 w-36"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="text-base px-4 py-2 bg-black hover:bg-gray-700 w-36"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PostCat;
