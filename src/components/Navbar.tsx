import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsOpen(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const navItems = [
    { path: "/work", label: "Work" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/ideas", label: "Ideas" },
    { path: "/careers", label: "Careers" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`py-5 w-full h-20 fixed top-0 z-50 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled ? "bg-primary/90 backdrop-blur-md shadow-lg" : "bg-primary"
        }`}
      >
        <div className="container h-full">
          <div className="flex h-full justify-between items-center">
            <Link to={"/"} className="h-full flex">
              <img src="/logo.png" alt="logo" className="h-full" />
            </Link>

            {/* Desktop Navbar */}
            <nav className="hidden lg:flex gap-4 text-slate-50">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-slate-50 ${
                    location.pathname === item.path
                      ? "after:scale-x-100"
                      : "after:scale-x-0"
                  } after:transition-transform hover:after:scale-x-100`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Burger Menu*/}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-slate-50 transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-slate-50 transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-slate-50 transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </button>

            {/* Mobile Menu */}
            <div
              className={`lg:hidden fixed top-20 left-0 w-full transition-all duration-300 ${
                isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden z-50 ${
                isScrolled ? "bg-primary/90 backdrop-blur-md" : "bg-primary"
              }`}
            >
              <nav className="flex flex-col p-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-slate-50 py-2 px-4 rounded transition-colors hover:bg-slate-50 hover:bg-opacity-10 ${
                      location.pathname === item.path
                        ? "bg-slate-50 bg-opacity-20"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
