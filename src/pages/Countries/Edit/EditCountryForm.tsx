import axios from "axios";
import { useReducer } from "react";
import { toast } from "react-toastify";
import { Country } from "../../../hooks/useCountriesApi";

interface EditCountryFormState {
  name: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  image: string;
  isSubmitting: boolean;
}

type EditCountryFormAction =
  | { type: "UPDATE_FIELD"; field: string; value: string | number }
  | { type: "INITIALIZE_FORM"; country: Country }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR" }
  | { type: "RESET_FORM" };

const initialState: EditCountryFormState = {
  name: "",
  countryCode: "",
  latitude: 0,
  longitude: 0,
  image: "",
  isSubmitting: false,
};

const reducer = (
  state: EditCountryFormState,
  action: EditCountryFormAction
): EditCountryFormState => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "SUBMIT_START":
      return { ...state, isSubmitting: true };
    case "SUBMIT_SUCCESS":
      return { ...state, isSubmitting: false };
    case "SUBMIT_ERROR":
      return { ...state, isSubmitting: false };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

const API_URL = "https://67fce7181f8b41c8168804f6.mockapi.io/countries";

export const EditCountryForm = ({
  country,
  onEditSuccess,
}: {
  country: Country;
  onEditSuccess: (country: Country) => void;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const processedValue = ["latitude", "longitude"].includes(name)
      ? parseFloat(value) || 0
      : value;

    dispatch({
      type: "UPDATE_FIELD",
      field: name,
      value: processedValue,
    });
  };

  const handleReset = () => {
    dispatch({ type: "INITIALIZE_FORM", country });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCountryInfo = {
      ...(state.name && { name: state.name }),
      ...(state.countryCode && { countryCode: state.countryCode }),
      ...(state.image && { image: state.image }),
      ...(state.longitude && { longitude: state.longitude }),
      ...(state.latitude && { latitude: state.latitude }),
    };

    const hasChanges = Object.entries(newCountryInfo).some(([key, value]) => {
      if (key in country) {
        const typedKey = key as keyof Country;
        return country[typedKey] !== value;
      }
      return false;
    });

    if (Object.keys(newCountryInfo).length === 0 || !hasChanges) {
      toast.info("No se detectaron cambios que actualizar.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      dispatch({ type: "SUBMIT_START" });
      const response = await axios.put(
        `${API_URL}/${country.id}`,
        newCountryInfo
      );

      dispatch({ type: "SUBMIT_SUCCESS" });
      onEditSuccess(response.data);

      toast.success("País actualizado correctamente", {
        autoClose: 3000,
      });
    } catch (error) {
      dispatch({ type: "SUBMIT_ERROR" });

      toast.error("Error al actualizar el país", {
        position: "top-right",
        autoClose: 5000,
      });

      console.error("Error updating country:", error);
    }
  };

  return (
    <form
      className="grid gap-3 py-6 px-3 rounded-md shadow-sm sm:mx-auto bg-black/5"
      onSubmit={handleSubmit}
      onReset={() => handleReset()}
    >
      <h2 className="font-bold">Editar país</h2>

      {[
        { id: "name", label: "Nombre del país", type: "text" },
        { id: "countryCode", label: "Código del país", type: "text" },
        { id: "latitude", label: "Latitud", type: "number" },
        { id: "longitude", label: "Longitud", type: "number" },
        { id: "image", label: "Imagen (URL)", type: "url" },
      ].map((field) => (
        <fieldset
          key={field.id}
          className="grid grid-cols-1 sm:flex gap-3 items-center justify-between"
        >
          <label htmlFor={field.id}>{field.label}</label>
          <input
            type={field.type}
            name={field.id}
            id={field.id}
            className="input"
            onChange={handleChange}
            step={
              ["latitude", "longitude"].includes(field.id) ? "any" : undefined
            }
          />
        </fieldset>
      ))}

      <div className="flex gap-3 items-center ml-auto">
        <button type="submit" className="button" disabled={state.isSubmitting}>
          {state.isSubmitting ? "Actualizando..." : "Actualizar"}
        </button>
        <button
          type="reset"
          className="button bg-gray-400"
          disabled={state.isSubmitting}
        >
          Restablecer
        </button>
      </div>
    </form>
  );
};
