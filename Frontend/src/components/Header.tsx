import { Menu, Search } from "lucide-react";
import { useState } from "react";
import SearchDialog from "./Search";

function Header({ setOpenMenu }: any) {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <>
      <header className="bg-white shadow-lg p-3 flex items-center gap-10">
        <button
          className="cursor-pointer lg:hidden"
          onClick={() => setOpenMenu(true)}
        >
          <Menu />
        </button>
        <h3 className="font-bold text-2xl flex-1 text-center">
          Interview Prep
        </h3>
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
