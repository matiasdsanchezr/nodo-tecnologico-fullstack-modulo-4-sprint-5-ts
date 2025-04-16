import { BsTwitterX, BsEnvelope, BsGithub } from "react-icons/bs";
import { MdEditLocationAlt } from "react-icons/md";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <MdEditLocationAlt className="h-8 w-8 #text-yellow-400" />
              <span className="ml-2 text-xl font-bold">Países Manager</span>
            </div>
            <p className="mt-2 text-black/50 text-sm">
              La plataforma definitiva para gestionar y organizar todos tus
              superhéroes favoritos.
            </p>
          </div>

          {/* Contacto */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4 #text-yellow-300">
              Contacto
            </h3>
            <div className="space-y-4">
              <a
                href="#"
                className="flex items-center text-black/50 hover:text-white transition-colors"
              >
                <BsEnvelope className="text-lg mr-2" />
                <span>contacto@paises.com</span>
              </a>
              <a
                href="#"
                className="flex items-center text-black/50 hover:text-white transition-colors"
              >
                <BsTwitterX className="text-lg mr-2" />
                <span>@paisesapp</span>
              </a>
              <a
                href="#"
                className="flex items-center text-black/50 hover:text-white transition-colors"
              >
                <BsGithub className="text-lg mr-2" />
                <span>github.com/matiasdsanchezr</span>
              </a>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-indigo-800 my-8"></div>

        {/* Créditos y derechos */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-black/50 text-sm">
            &copy; {year} Países Manager. Todos los derechos reservados.
          </p>
          <div className="flex items-center mt-4 md:mt-0 text-sm text-black/50">
            <span>Desarrollado por Matias D. Sanchez R.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
