import { useState } from "react";
import { Link } from "react-router";
import { Menu, X, Search, User, LogOut } from "lucide-react";
import { MdEditLocationAlt } from "react-icons/md";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-slate-300 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y título */}
          <div className="flex items-center">
            <MdEditLocationAlt className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold">Países Manager</span>
          </div>

          {/* Buscador - visible en pantallas medianas y grandes */}
          {/* <div className="hidden md:flex items-center bg-indigo-800 rounded-lg px-3 py-2 flex-1 max-w-md mx-6">
            <Search className="h-5 w-5 text-indigo-300" />
            <input
              type="text"
              placeholder="Buscar superhéroes..."
              className="bg-transparent border-none focus:outline-none text-white placeholder-indigo-300 ml-2 w-full"
            />
          </div> */}

          {/* Navegación - visible en pantallas medianas y grandes */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="hover:text-black/40 transition-colors px-3 py-2 rounded-md"
            >
              Inicio
            </Link>
            <Link
              to="/countries"
              className="hover:text-black/40 transition-colors px-3 py-2 rounded-md"
            >
              Dashboard
            </Link>
            <a
              href="#teams"
              className="hover:text-black/40 transition-colors px-3 py-2 rounded-md"
            >
              Acerca de
            </a>
            <div className="flex items-center border-l border-indigo-700 pl-4 ml-2">
              <User className="h-6 w-6" />
              <span className="ml-2">Admin</span>
            </div>
          </nav>

          {/* Botón de menú para móviles */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-indigo-800">
            {/* Buscador móvil */}
            <div className="flex items-center bg-indigo-700 rounded-lg px-3 py-2 mb-3">
              <Search className="h-5 w-5 text-indigo-300" />
              <input
                type="text"
                placeholder="Buscar superhéroes..."
                className="bg-transparent border-none focus:outline-none text-white placeholder-indigo-300 ml-2 w-full"
              />
            </div>

            <a
              href="#dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700"
            >
              Dashboard
            </a>
            <a
              href="#heroes"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700"
            >
              Héroes
            </a>
            <a
              href="#teams"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700"
            >
              Equipos
            </a>

            <div className="pt-4 pb-3 border-t border-indigo-700">
              <div className="flex items-center px-3">
                <div className="flex-shrink-0">
                  <User className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium">Admin</div>
                  <div className="text-sm text-indigo-300">
                    admin@superheroes.com
                  </div>
                </div>
                <button className="ml-auto flex-shrink-0 p-1 rounded-full hover:bg-indigo-700">
                  <LogOut className="h-6 w-6 text-indigo-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
