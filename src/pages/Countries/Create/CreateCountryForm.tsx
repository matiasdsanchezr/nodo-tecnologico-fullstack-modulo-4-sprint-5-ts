import axios from "axios";
import { useReducer } from "react";
import { useNavigate } from "react-router";

interface CreateCountryFormState {
  name: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  image: string;
  isSubmitting: boolean;
}

type CreateCountryFormAction =
  | { type: "UPDATE_FIELD"; field: string; value: string }
  | { type: "SUBMIT_FORM" }
  | { type: "SUBMIT_ERROR" }
  | { type: "RESET_FORM" };

const initialState: CreateCountryFormState = {
  name: "",
  countryCode: "",
  latitude: 0,
  longitude: 0,
  image: "",
  isSubmitting: false,
};

const reducer = (
  state: CreateCountryFormState,
  action: CreateCountryFormAction
) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "SUBMIT_FORM":
      return { ...state, isSubmitting: true };
    case "SUBMIT_ERROR":
      return { ...state, isSubmitting: false };
    case "RESET_FORM":
      return initialState;
    default:
      throw new Error("Unknown action type");
  }
};

export const CreateCountryForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch({ type: "SUBMIT_FORM" });
      await axios.post(
        "https://67fce7181f8b41c8168804f6.mockapi.io/countries",
        state
      );
      return navigate("/countries");
    } catch (e) {
      dispatch({ type: "SUBMIT_ERROR" });
      console.error(e);
    }
  };

  return (
    <form
      className="grid gap-3 py-6 px-3 rounded-md shadow-sm sm:mx-auto bg-white"
      onSubmit={handleSubmit}
    >
      <h2 className="font-bold">Crear pais</h2>
      <fieldset className="grid grid-cols-1 sm:flex gap-3 items-center justify-between">
        <label htmlFor="name">Nombre del país</label>
        <input
          type="text"
          name="name"
          id="name"
          className="input"
          value={state.name}
          onChange={handleChange}
          required
        />
      </fieldset>
      <fieldset className="grid grid-cols-1 sm:flex gap-3 items-center justify-between">
        <label htmlFor="countryCode">Codigo del país</label>
        <input
          type="text"
          name="countryCode"
          id="countryCode"
          className="input"
          value={state.countryCode}
          onChange={handleChange}
          required
        />
      </fieldset>
      <fieldset className="grid grid-cols-1 sm:flex gap-3 items-center justify-between">
        <label htmlFor="latitude">Latitud</label>
        <input
          type="text"
          name="latitude"
          id="latitude"
          className="input"
          value={state.latitude}
          onChange={handleChange}
          required
        />
      </fieldset>
      <fieldset className="grid grid-cols-1 sm:flex gap-3 items-center justify-between">
        <label htmlFor="longitude">Longitud</label>
        <input
          type="text"
          name="longitude"
          id="longitude"
          className="input"
          value={state.longitude}
          onChange={handleChange}
          required
        />
      </fieldset>
      <fieldset className="grid grid-cols-1 sm:flex gap-3 items-center justify-between">
        <label htmlFor="image">Imagen (URL)</label>
        <input
          type="text"
          name="image"
          id="image"
          className="input"
          value={state.image}
          onChange={handleChange}
          required
        />
      </fieldset>
      <div className="flex gap-3 items-center ml-auto">
        <button type="submit" className="button" disabled={state.isSubmitting}>
          Agregar
        </button>
        <button
          type="reset"
          className="button bg-gray-300"
          disabled={state.isSubmitting}
        >
          Limpiar
        </button>
      </div>
    </form>
  );
};
