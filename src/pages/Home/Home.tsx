import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export const Home = () => {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        <div className="bg-white w-full h-48 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-bold">Inicio</h2>
          </div>
        </div>
        <div className="bg-gray-100 flex-1 flex flex-col justify-center text-center gap-3">
          <h3 className="text-4xl">Bienvenido</h3>
          <p>
            En este gestor de países podrás guardar, modificar y eliminar
            cualquier país que quieras.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};
