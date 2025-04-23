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
  } from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEffect } from "react";
import { fetchAllCats } from "@/catsHelpers";
import { cacheSearch } from "@/catsHelpers";
import { Button } from "@/components/ui/button"

function SearchPage() {

    interface Cat {
        name : string,
        gender : string,
        city: string,
        state: string,
        description: string,
        imageurl: string,
        token: string
    };

    const [cats, setCats] = useState<Cat[]>([]);

    const [data, setData] = useState({

    })

    const getCats = async() => {
        try {

        }
        catch(error) {

        }
    }

    useEffect(() => {
        getCats();
    }, [])

    return (
        <div className="p-25 mb-40 justify-center min-h-screen ">
            <h1 className="font-bold mb-2 text-6xl">
                Adopt a new best friend
            </h1>
            <p className="text-2xl mb-5">
                Explore lovable cats looking for a forever home near you.
            </p>
            <div className = "flex gap-5 w-1/2 mb-5">
                <Input type="text"
                   id= "City"
                   className= "mt-1 h-12 w-full rounded-md border-gray-400 text-sm px-2"
                   placeholder= "City"
                />
                <Input type="text"
                   id= "State"
                   className= "mt-1 h-12 w-full rounded-md border-gray-400 text-sm px-2"
                   placeholder= "State"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="mt-1 w-30 h-12" variant = "outline">
                            Gender
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>
                            Select the Gender
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuRadioGroup>
                            <DropdownMenuRadioItem value="male">Male</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="female">Female</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                
            </div>

            <div className = "grid grid-cols-3 gap-10">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Name
                    </CardTitle>
                </CardHeader>
            </Card>
            </div>
        </div>
    );
}

export default SearchPage;
