import { useEffect, useState } from "react";

function Footer() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShow(false); 
      } else {
        setShow(true); 
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <footer
      className={`fixed bottom-0 left-0 w-screen bg-black text-white border-t border-gray-700 transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col items-center text-center">
        <p className="text-sm">
          © 2025 <span className="font-semibold">MeowMatch</span>. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with <span className="text-red-500">💖</span> for cat lovers everywhere.  
          <br />
          <span className="italic">MeowMatch is a student project and not affiliated with Petfinder or any animal shelter.</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
