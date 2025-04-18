import { Button } from "@/components/ui/button";
import pawLogo from "@/assets/paw_logo.png";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
] as const;

export default function MainNav() {
  return (
    <div className="fixed top-4 left-0 w-screen bg-white z-50">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 pl-20">
          <img
            className="rounded-full w-16 h-16"
            src={pawLogo}
            alt="paw logo"
          />
          <h1 className="text-3xl font-bold">MeowMatch</h1>
        </div>
        <div className="flex gap-4 pr-4">
          {navItems.map((item) => (
            <Button
              asChild
              variant="ghost"
              key={item.path}
              className="text-2xl font-bold text-black hover:bg-gray-600 px-4 py-2 rounded-md"
            >
              <Link to={item.path}>{item.name}</Link>
            </Button>
          ))}
        </div>
      </div>
      <hr className="border-t border-gray-300 mt-4" />
    </div>
  );
}
