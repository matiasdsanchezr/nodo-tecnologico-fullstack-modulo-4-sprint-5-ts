import { Link } from "react-router";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { CreateCountryForm } from "./CreateCountryForm";

export const CreateCountry = () => {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        <div className="bg-white w-full h-48 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-bold">Agregar nuevo país</h2>
          </div>
        </div>
        <div className="bg-gray-100 flex-1 flex flex-col justify-center gap-3">
          <div className="flex flex-col gap-3 p-3">
            <CreateCountryForm />
            <Link to="/countries" className="button mx-auto">
              Regresar al dashboard
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
