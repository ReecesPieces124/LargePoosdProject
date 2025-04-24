import { Button } from "@/components/ui/button";
import pawLogo from "@/assets/paw_logo.png";
import { Link, useNavigate} from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const homeNavItems = [
  { name: "Home", path: "/" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
] as const;

const authNavItems = [
  { name: "Browse Cats", path: "/search" },
  { name: "Post a Cat", path: "/post-cats" },
  { name: "Logout", path: "/logout" },
] as const;

export default function MainNav() {
  const { isAuthenticated, logout } = useAuth();
  const navItems = isAuthenticated ? authNavItems : homeNavItems;
  const navigate = useNavigate()
  const handleLogoutClick = (path: string) => {
    if (path === "/logout") {
      logout();
      navigate("/")
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50">
      <div className = "max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
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
              className="text-2xl font-bold text-black"
              onClick={() => handleLogoutClick(item.path)}
            >
              <Link className = "relative inline-block p-2 group" to={item.path}>
                {item.name}
                <span className = "absolute top-9 left-0 bg-black h-[2px] w-0 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
      </div>
      <hr className="border-t border-gray-300 mt-1" />
    </div>
  );
}
