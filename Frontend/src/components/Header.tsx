import { Menu, Search } from "lucide-react";
import { useState, useEffect } from "react";
import SearchDialog from "./Search";
import { useNavigate } from "react-router";
import { ModeToggle } from "./ModeToggle";
import { twMerge } from "tailwind-merge";
import { useTheme } from "./ThemeProvider";

function Header({
  setOpenMenu,
  title = "Interview Prep",
  showSearch = true,
  link = "/",
  isDesktopOpen = true,
}: any) {
  const navigate = useNavigate();
  const [openSearch, setOpenSearch] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd + E for Search
      if ((e.metaKey || e.ctrlKey) && e.code === "KeyE") {
        e.preventDefault();
        setOpenSearch((prev) => !prev);
      }

      // Option + D for Dark Mode Toggle
      if (e.altKey && e.code === "KeyD") {
        e.preventDefault();
        setTheme(theme === "dark" ? "light" : "dark");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [theme, setTheme]);

  return (
    <>
      <header className="bg-white dark:bg-zinc-900 sticky top-0 shadow-lg dark:shadow-zinc-800 p-3 flex items-center gap-10">
        <button
          className={twMerge(
            "cursor-pointer dark:text-white",
            isDesktopOpen ? "lg:hidden" : "block"
          )}
          onClick={() => setOpenMenu && setOpenMenu(true)}
        >
          <Menu />
        </button>
        <div className="flex-1 text-center">
          <button
            className="font-bold text-2xl text-center cursor-pointer dark:text-white"
            onClick={() => navigate(link)}
          >
            {title}
          </button>
        </div>
        <div className="flex items-center gap-2">
          {showSearch && (
            <button
              className="cursor-pointer pr-4"
              onClick={() => setOpenSearch(true)}
            >
              <Search className="text-primary-solid" />
            </button>
          )}
          <ModeToggle />
        </div>
      </header>
      {openSearch && (
        <SearchDialog isOpen={openSearch} setIsOpen={setOpenSearch} />
      )}
    </>
  );
}

export default Header;
