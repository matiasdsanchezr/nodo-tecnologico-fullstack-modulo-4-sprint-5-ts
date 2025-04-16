import { BsGeoAltFill } from "react-icons/bs";
import { useCountriesApi } from "../../../hooks/useCountriesApi";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { CountriesList } from "./CountriesList";

export const CountriesDashboard = () => {
  const {
    countries,
    paginationInfo,
    loading,
    deleteCountry,
    filterCountries,
    goToNextPage,
    goToPrevPage,
  } = useCountriesApi();

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-white flex flex-col justify-center">
          <h2 className="text-center">Cargando paises...</h2>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="bg-gray-100 min-h-screen">
          {/* Estadísticas principales */}
          <div className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <h1 className="text-2xl font-bold">Dashboard de Paises</h1>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {/* Países totales */}
                <div className="bg-slate-300 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <BsGeoAltFill className="h-6 w-6" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium truncate">
                            Países registrados
                          </dt>
                          <dd>
                            <div className="text-lg font-medium">
                              {paginationInfo.count}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Países favoritos */}
                {/* <div className="bg-slate-300 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <BsSearch className="h-6 w-6" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium truncate">
                            Países Favoritos
                          </dt>
                          <dd>
                            <div className="text-lg font-medium">{0}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* Lista de Países */}
          <CountriesList
            countries={countries}
            paginationInfo={paginationInfo}
            deleteCountry={deleteCountry}
            filterCountries={filterCountries}
            goToNextPage={goToNextPage}
            goToPrevPage={goToPrevPage}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};
