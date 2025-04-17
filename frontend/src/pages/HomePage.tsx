import catPng from '@/assets/cat1.png'
import { Button } from "@/components/ui/button"

function HomePage() {
    return(
        <>
        <div className = "flex flex-row my-52">
        <div className = "flex flex-col gap-10 text-center">
            <h1 className="text-left mb-4 text-4xl">Find your purrfect match</h1>
            <p className = "text-left mb-4">
            Every cat deserves a cozy home and a loving companion. 
            Whether you're looking for a playful kitten or a calm cuddle buddy, 
            we're here to help you find your purrfect match. 
            Start your adoption journey today and give a cat the forever home they’ve been waiting for. 🐾
            </p>
            <div className = "flex flex-row gap-15">
                <Button className = "w-58 h-15 gap-2">
                    Browse Cats
                </Button>
                <Button className = "w-58 h-15 gap-2">
                    Post Cats
                </Button>
            </div>
        </div>
        <img className = "w-80 h-80" src={catPng}/>
        </div>
        </>
    )
}

export default HomePage