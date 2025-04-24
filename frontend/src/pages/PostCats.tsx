import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { createCat } from '@/catsHelpers';

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
    gender: ''
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
        reader.onerror = error => reject(error);
      });
      console.log(imageBase64);
      // Submit with token
      await createCat(
        {
          ...data,
          imageURL: "https://get.pxhere.com/photo/animal-pet-kitten-cat-small-mammal-fauna-heal-blue-eye-close-up-nose-whiskers-vertebrate-domestic-lying-tabby-cat-norwegian-forest-cat-ginger-fur-small-to-medium-sized-cats-cat-like-mammal-carnivoran-domestic-short-haired-cat-domestic-long-haired-cat-609263.jpg"
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
        gender: ''
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
      <div className="p-4 border rounded-md shadow-sm w-180 mx-auto mt-20">
        <div
          onClick={() => document.getElementById("file-upload")?.click()}
          className="mb-1 h-80 w-full bg-gray-100 shadow-1xl rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-300"
        >
          {preview ? (
            <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-md" />
          ) : (
            <span>Click to upload image</span>
          )}
        </div>
        <Input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <Button type="button" className="text-sm px-2 py-1 mt-2">
          {image ? "Change Image" : "Add Image"}
        </Button>
      </div>

      <div className="w-180 mx-auto mt-5">
      <div className="mb-2">
          <Input
            id="name"
            placeholder="Name"
            className="text-sm px-2 py-1 w-full mx-auto"
            value={data.name}
            onChange={(e) => setData({...data, name: e.target.value})}
          />
        </div>
        <div className="mb-2">
          <Input
            id="city"
            placeholder="City"
            className="text-sm px-2 py-1 w-full mx-auto"
            value={data.city}
            onChange={(e) => setData({...data, city: e.target.value})}
          />
        </div>
        <div className="mb-2">
          <Input
            id="zip"
            placeholder="Zip"
            className="text-sm px-2 py-1 w-full mx-auto"
            value={data.zip}
            onChange={(e) => setData({...data, zip: e.target.value})}
          />
        </div>
        <div className="flex gap-4 mb-3">
          <Input
            id="state"
            placeholder="State"
            className="text-sm px-2 py-1 w-full border rounded-md"
            value={data.state}
            onChange={(e) => setData({...data, state: e.target.value})}
          />
          <select
            id="age"
            className="text-sm px-2 py-1 w-full border rounded-md"
            value={data.age}
            onChange={(e) => setData({...data, age: e.target.value})}
          >
            <option value="" disabled>Age</option>
            <option value="baby">Baby</option>
            <option value="young">Young</option>
            <option value="adult">Adult</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div className="flex gap-4 mb-3">
          <select
            id="gender"
            className="text-sm px-2 py-1 w-full border rounded-md"
            value={data.gender}
            onChange={(e) => setData({...data, gender: e.target.value})}
          >
            <option value="" disabled>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-1.5 relative">
          <p className="text-sm font-medium text-gray-700 mb-0.5 text-left">Your description</p>
          <div className="relative">
            <Input
              id="description"
              placeholder="Type your description here"
              className="text-sm px-1 py-10 w-full mx-auto peer"
              value={data.description}
              onChange={(e) => setData({...data, description: e.target.value})}
            />
          </div>
          <p className="text-sm text-gray-500 text-left">✍️ Give your cat a cuddly bio.</p>
        </div>

        {error && <div className="text-red-500 mb-3">{error}</div>}

        <div className="flex justify-between">
          <Button 
            type="button" 
            className="text-sm px-2 bg-black hover:bg-gray-700 w-30 ml-55"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="text-sm px-2 bg-black hover:bg-gray-700 w-30 mr-55"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default PostCat;