import Header from "@/components/Header";
import Sidebar from "@/components/SideNav";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { twJoin } from "tailwind-merge";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

function MainTopic() {
  const [openMenu, setOpenMenu] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        if (e.code === "Comma") {
          e.preventDefault();
          setIsDesktopSidebarOpen(false);
        } else if (e.code === "Period") {
          e.preventDefault();
          setIsDesktopSidebarOpen(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenMenu = (isOpen: boolean) => {
    if (isDesktop) {
      setIsDesktopSidebarOpen(isOpen);
    } else {
      setOpenMenu(isOpen);
    }
  };

  const isSidebarVisible = isDesktop ? isDesktopSidebarOpen : openMenu;

  return (
    <section className="sidebar">
      <Sidebar
        isOpen={isSidebarVisible}
        setOpen={handleOpenMenu}
        isDesktop={isDesktop}
      />
      <aside
        className={twJoin(
          isSidebarVisible ? "ml-0 lg:ml-72" : "ml-0"
        )}
      >
        <Header setOpenMenu={handleOpenMenu} isDesktopOpen={isDesktopSidebarOpen} />
        <main className="px-4 lg:px-8 py-4">
          <Outlet />
        </main>
      </aside>
    </section>
  );
}

export default MainTopic;
