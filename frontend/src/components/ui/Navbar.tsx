import { Button } from './button'

const navItems = ['Login'];

export default function MainNav() {
    return (
      <div className="mr-4 hidden gap-2 md:flex justify-end">
        {navItems.map((item, index) => (
          <Button key={index} variant="link">
            {item}
          </Button>
        ))}
      </div>
    );
  }