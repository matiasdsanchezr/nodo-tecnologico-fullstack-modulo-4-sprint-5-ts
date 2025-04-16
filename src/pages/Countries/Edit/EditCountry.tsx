import { useParams } from "react-router";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { EditCountryForm } from "./EditCountryForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { Country } from "../../../hooks/useCountriesApi";

const EditCountry = () => {
  const params = useParams();
  const [country, setCountry] = useState<Country>();
  const [loading, setLoading] = useState(true);

  const fetchCountry = async () => {
    try {
      const response = await axios.get(
        `https://67fce7181f8b41c8168804f6.mockapi.io/countries/${params.id}`
      );
      setCountry(() => response.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditSuccess = (country: Country) => {
    setCountry(country);
  };

  useEffect(() => {
    setLoading(true);
    fetchCountry();
    return;
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-1 flex flex-col gap-3">
          <h2>Cargando...</h2>
        </main>
        <Footer />
      </>
    );
  }

  if (!country) {
    return;
  }

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col gap-3 bg-white">
        <div className="mx-auto p-3 rounded shadow flex flex-col gap-2 mt-3">
          <h3 className="text-xl font-bold">Información actual:</h3>
          <div className="max-w-36 aspect-square overflow-hidden m-auto flex flex-col justify-center">
            <img src={country?.image} alt={`Imagen de ${country?.name}`} />
          </div>
          <p className="font-bold">
            Nombre: <span className="font-normal">{country?.name ?? ""}</span>
          </p>
          <p className="font-bold">
            Codigo de País:{" "}
            <span className="font-normal">{country?.countryCode ?? ""}</span>
          </p>
          <p className="font-bold">
            Latitud:{" "}
            <span className="font-normal">{country?.latitude ?? ""}</span>
          </p>
          <p className="font-bold">
            Longitud:{" "}
            <span className="font-normal">{country?.longitude ?? ""}</span>
          </p>
        </div>
        <EditCountryForm country={country} onEditSuccess={handleEditSuccess} />/
      </main>
      <Footer />
    </>
  );
};

export default EditCountry;
