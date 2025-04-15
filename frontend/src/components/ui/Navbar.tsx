import { Button } from './button'
import pawLogo from '../../assets/paw_logo.png';
const navItems = ['Login'];

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
        <div className="flex gap-2">
          {navItems.map((item, index) => (
            <Button key={index} variant="link">
              {item}
            </Button>
          ))}
        </div>
      </div>
      <hr className="border-b mt-2 border-gray-200 -mx-8 sm:-mx-6 lg:-mx-8"/>
    </div>
    );
  }