import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { fetchAllCats } from "@/catsHelpers";
import { cacheSearch } from "@/catsHelpers";
import { deleteCat } from "@/catsHelpers";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import { Mail, MapPin, VenetianMask, Calendar } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";

function SearchPage() {
  interface Cat {
    name: string;
    gender: string;
    city: string;
    state: string;
    description: string;
    imageURL: string;
    age: string,
    source: string,
    pfURL: string,
    _id?: string
  }
  const { isAuthenticated, getAuthHeader } = useAuth();
  const [cats, setCats] = useState<Cat[]>([]);
  const [showFooter, setShowFooter] = useState(true);

  const [data, setData] = useState({
    city: "",
    state: "",
    zip: "",
    gender: "",
    age: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowFooter(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function getCats(e: any): Promise<void> {
    e.preventDefault();
    await cacheSearch(
      data.zip
        ? { zip: data.zip, gender: data.gender, age: data.age, limit: 40 }
        : {
            city: data.city,
            state: data.state,
            gender: data.gender,
            age: data.age,
            limit: 40,
          }
    );
    const catsReq = await fetchAllCats();
    setCats(catsReq);
    console.log(catsReq);
  }

  return (
    <div className="p-25 mb-40 justify-center min-h-screen ">
      <h1 className="font-bold mb-2 text-6xl">Adopt a new best friend</h1>
      <p className="text-2xl mb-5">
        Explore lovable cats looking for a forever home near you.
      </p>
      <div className="flex gap-5 mb-5">
        <Input
          type="text"
          id="City"
          className="mt-1 h-12 w-full rounded-md border-gray-400 text-sm px-2"
          placeholder="City"
          value={data.city}
          onChange={(e) => setData({ ...data, city: e.target.value })}
        />
        <Input
          type="text"
          id="State"
          className="mt-1 h-12 w-full rounded-md border-gray-400 text-sm px-2"
          placeholder="State"
          value={data.state}
          onChange={(e) => setData({ ...data, state: e.target.value })}
        />
        <Input
          type="text"
          id="ZipCode"
          className="mt-1 h-12 w-full rounded-md border-gray-400 text-sm px-2"
          placeholder="Zip Code"
          value={data.zip}
          onChange={(e) => setData({ ...data, zip: e.target.value })}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="mt-1 w-30 h-12" variant="outline">
              Gender
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select the Gender</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={data.gender}
              onValueChange={(v) => setData({ ...data, gender: v })}
            >
              <DropdownMenuRadioItem value="male">Male</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="female">
                Female
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="mt-1 w-30 h-12" variant="outline">
              Age
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select the Age</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={data.age}
              onValueChange={(v) => setData({ ...data, age: v })}
            >
              <DropdownMenuRadioItem value="baby">Baby</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="young">Young</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="adult">Adult</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="senior">
                Senior
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="mt-1 w-30 h-12" onClick={getCats}>
          Search
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-10">
        {cats.map((cat) => (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-xl font-bold">{cat.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <img 
              className="rounded-md w-full h-48 object-cover" 
              src={cat.imageURL} 
              alt={`Photo of ${cat.name}`}
            />
            
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                {cat.city}, {cat.state}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <VenetianMask className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700 capitalize">
                  {cat.gender}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700 capitalize">
                  {cat.age}
                </span>
              </div>
            </div>
            {cat.pfURL && (
                <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <div 
                    className="text-xs text-gray-700 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                    onClick={() => {
                        navigator.clipboard.writeText(cat.pfURL);
                        toast.success('Contact info copied to clipboard');
                    }}
                    title="Click to copy"
                    >
                    {cat.pfURL.length > 25 
                        ? `${cat.pfURL.substring(0, 22)}...` 
                        : cat.pfURL}
                    </div>
                </div>
                )}
            
            <div className="border-t pt-3">
              <p className="text-sm text-gray-600">
                {cat.description}
              </p>
            </div>
          </CardContent>
        <CardFooter className="flex justify-end">
            {cat.source=="manual" && isAuthenticated && (
            <Button 
                variant="destructive" 
                size="sm"
                onClick={async () => {
                try {
                    await deleteCat(cat._id!, getAuthHeader);
                    setCats(cats.filter(c => c._id !== cat._id));
                    toast.success(`${cat.name} has been removed`);
                } catch (error) {
                    toast.error("Failed to delete cat");
                }
                }}
            >
                Delete
            </Button>
            )}
        </CardFooter>
        </Card>
        ))}
      </div>
      {showFooter && <Footer />}
    </div>
  );
}

export default SearchPage;
