import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext"; // Your auth context
import { createCat } from '@/catsHelpers'; // Your API function

function PostCat() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { token } = useAuth(); // Get token from auth
  
  const [data, setData] = useState({
    city: "",
    state: "",
    age: "",
    zip: "",
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
    
    if (!image) {
      alert("Please upload an image");
      return;
    }

    // Convert image to base64
    const imageBase64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result as string);
    });

    // Submit with token
    await createCat({ 
      catData: {
        ...data,
        image: imageBase64
      } 
    }, token);
    
    alert("Cat posted successfully!");
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
      </div>

      <div className="w-180 mx-auto mt-5">
        <div className="mb-2">
          <Input
            placeholder="City"
            value={data.city}
            onChange={(e) => setData({...data, city: e.target.value})}
          />
        </div>
        <div className="mb-2">
          <Input
            placeholder="Zip"
            value={data.zip}
            onChange={(e) => setData({...data, zip: e.target.value})}
          />
        </div>
        <div className="flex gap-4 mb-3">
          <Input
            placeholder="State"
            value={data.state}
            onChange={(e) => setData({...data, state: e.target.value})}
          />
          <select
            value={data.age}
            onChange={(e) => setData({...data, age: e.target.value})}
          >
            <option value="">Age</option>
            <option value="baby">Baby</option>
            <option value="young">Young</option>
            <option value="adult">Adult</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div className="flex gap-4 mb-3">
          <select
            value={data.gender}
            onChange={(e) => setData({...data, gender: e.target.value})}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-1.5">
          <Input
            placeholder="Description"
            value={data.description}
            onChange={(e) => setData({...data, description: e.target.value})}
            className="py-10"
          />
        </div>

        <div className="flex justify-between">
          <Button type="button">Cancel</Button>
          <Button type="submit">Post</Button>
        </div>
      </div>
    </form>
  );
}

export default PostCat;