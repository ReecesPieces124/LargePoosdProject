import { Button } from "@/components/ui/button"
import pawLogo from '../../assets/paw_logo.png';
import { Link } from 'react-router-dom'
const navItems = [
  { name: "Home", path: "/" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

export default function MainNav() {
    return (
      <div className = "w-full">
        <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <img 
            className="rounded-full w-20 h-20" 
            src={pawLogo} 
            alt="paw logo" 
          />
          <h1 className="text-xl font-bold">MeowMatch</h1>
        </div>

        {/* Nav items on the right */}
        <div className="flex gap-2 ">
          {navItems.map((item) => (
            <Button asChild variant = "secondary" key = {item.path}>
              <Link to = {item.path}>
                {item.name}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <div className="w-screen relative left-1/2 -ml-[50vw] -mr-[50vw]">
        <hr className="border-b border-gray-200 mt-5"/>
      </div>
    </div>
    );
  }