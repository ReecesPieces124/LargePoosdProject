import catPng from "@/assets/cat1.png";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

function HomePage() {
  return (
    <>
      <div className="flex flex-row my-52">
        <div className="flex flex-col gap-10 text-center">
          <h1 className="text-left font-bold mb-4 text-6xl">
            Find your purrfect match
          </h1>
          <p className="text-left text-2xl mb-4">
            Every cat deserves a cozy home and a loving companion. Whether
            you're looking for a playful kitten or a calm cuddle buddy, we're
            here to help you find your purrfect match. Start your adoption
            journey today and give a cat the forever home they’ve been waiting
            for. 🐾
          </p>
          <div className="flex flex-row gap-4">
            <Button className="w-60 h-15 gap-2 bg-black text-white rounded-md hover:bg-gray-600">
              Browse Cats
            </Button>
            <Button className="w-60 h-15 gap-2 bg-black text-white rounded-md hover:bg-gray-600">
              Post Cats
            </Button>
          </div>
        </div>
        <img className="w-98 h-98 ml-10" src={catPng} />
      </div>
    <Footer />
    </>
  );
}

export default HomePage;
