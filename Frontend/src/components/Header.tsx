import { Menu, Search } from "lucide-react";
import { useState } from "react";
import SearchDialog from "./Search";
import { useNavigate } from "react-router";

function Header({ setOpenMenu }: any) {
  const navigate = useNavigate();
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <>
      <header className="bg-white sticky top-0 shadow-lg p-3 flex items-center gap-10">
        <button
          className="cursor-pointer lg:hidden"
          onClick={() => setOpenMenu(true)}
        >
          <Menu />
        </button>
        <div className="flex-1 text-center">
          <button
            className="font-bold text-2xl text-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            Interview Prep
          </button>
        </div>
        <button
          className="cursor-pointer pr-4"
          onClick={() => setOpenSearch(true)}
        >
          <Search className="text-primary-solid" />
        </button>
      </header>
      {openSearch && (
        <SearchDialog isOpen={openSearch} setIsOpen={setOpenSearch} />
      )}
    </>
  );
}

export default Header;
