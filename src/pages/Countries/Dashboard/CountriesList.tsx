import {
  BsBookmarkStarFill,
  BsSearch,
  BsFillPencilFill,
  BsFillTrash3Fill,
  BsPlusLg,
} from "react-icons/bs";
import { Link } from "react-router";
import { Country, PaginationInfo } from "../../../hooks/useCountriesApi";
import { useState } from "react";
import Swal from "sweetalert2";

type CountriesListProps = {
  countries: Country[];
  paginationInfo: PaginationInfo;
  filterCountries: (name: string) => void;
  deleteCountry: (id: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
};

export const CountriesList = ({
  countries,
  paginationInfo,
  filterCountries,
  deleteCountry,
  goToNextPage,
  goToPrevPage,
}: CountriesListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    country: Country
  ) => {
    e.preventDefault();

    Swal.fire({
      title: `¿Deseas eliminar el país: ${country.name}?`,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dd6b55",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "", "success");
        deleteCountry(parseInt(country.id));
      } else if (result.isDenied) {
        Swal.fire("Operación cancelada", "", "info");
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Cabecera y controles */}
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex flex-wrap items-center justify-between">
            <h2 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <BsBookmarkStarFill className="h-5 w-5 text-slate-500 mr-2" />
              Lista de Países
            </h2>
            <div className="flex mt-3 sm:mt-0">
              <Link to={"/countries/create"} className="button">
                <BsPlusLg className="h-4 w-4 mr-2" />
                Nuevo País
              </Link>
            </div>
          </div>
          {/* Filtros y búsqueda */}
          <div className="mt-4 flex flex-col sm:flex-row justify-between">
            <form
              className="flex gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                filterCountries(searchTerm);
              }}
            >
              <div className="relative rounded-md shadow-sm max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BsSearch className="text-sm text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar país..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  className="focus:ring-black-500 focus:border-black-500 block w-full h-10 pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <button type="submit" className="button">
                Buscar
              </button>
            </form>

            {/* <div className="flex space-x-2 mt-3 sm:mt-0">
              <div className="relative inline-block text-left">
                <select
                  onChange={(e) => {}}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
                >
                  <option>Todos</option>
                  <option>Favoritos</option>
                </select>
              </div>
            </div> */}
          </div>
        </div>
        {/* Tabla de héroes */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  País
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Codigo de País
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Latitud
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Longitud
                </th>
                <th scope="col" className="relative px-6 py-3 text-gray-500">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {countries.map((country) => (
                <tr key={country.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={country.image}
                          alt={country.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {country.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {country.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {country.countryCode}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                    >
                      {country.latitude}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm`}>{country.longitude}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2 justify-end">
                      <Link
                        to={`/countries/${country.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <BsFillPencilFill className="h-5 w-5" />
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={(e) => {
                          handleDeleteClick(e, country);
                        }}
                      >
                        <BsFillTrash3Fill className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Anterior
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Siguiente
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando{" "}
                <span className="font-medium">
                  {Math.max(paginationInfo.currentPage * 10 - 9, 0)}
                </span>{" "}
                a{" "}
                <span className="font-medium">
                  {Math.max(
                    (paginationInfo.currentPage - 1) * 10 + countries.length,
                    0
                  )}
                </span>{" "}
                de <span className="font-medium">{paginationInfo.count}</span>{" "}
                resultados
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => {
                    goToPrevPage();
                  }}
                >
                  <span className="sr-only">Anterior</span>
                  <span aria-hidden="true">&laquo;</span>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-gray-50">
                  {paginationInfo.currentPage}
                </button>
                <button
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => {
                    goToNextPage();
                  }}
                >
                  <span className="sr-only">Siguiente</span>
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
