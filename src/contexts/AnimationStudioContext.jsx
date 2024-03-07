import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const BASE_URL = "http://localhost:9000";

const AnimationStudioContext = createContext();

const initialState = {
  animationStudios: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "animationStudios/loaded":
      return { ...state, isLoading: false, animationStudios: action.payload };
    case "animationStudio/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "animationStudio/created":
      return {
        ...state,
        isLoading: false,
        animationStudios: [...state.animationStudios, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        animationStudios: state.animationStudios.filter(
          (city) => city.id !== action.payload
        ),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknow action type");
  }
}

function AnimationProvider({ children }) {
  const [{ animationStudios, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    async function fetchAnimationStudio() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/animationStudios`);
        const data = await res.json();
        dispatch({ type: "animationStudios/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "there was an error loading  animation studio...",
        });
      }
    }
    fetchAnimationStudio();
  }, []);

  /*In real world application 
  a single component can have more data info 
  than the first or more fetch we do previously this is the reason why we do an other fetch */

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/animationStudios/${id}`);
        const data = await res.json();
        dispatch({ type: "animationStudio/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "there was an error loading  the city...",
        });
      }
    },
    [currentCity.id]
  );
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/animationStudios`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
        // Attention à ne pas faire d'erreur de syntax pour le headers
      });
      const data = await res.json();
      dispatch({ type: "animationStudio/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating data...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading", payload: id });
    try {
      await fetch(`${BASE_URL}/animationStudios/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id, currentCity: {} });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error deleting  the city...",
      });
    }
  }
  return (
    <AnimationStudioContext.Provider
      value={{
        animationStudios,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </AnimationStudioContext.Provider>
  );
}
function useAnimationStudio() {
  const context = useContext(AnimationStudioContext);
  if (context === undefined) {
    throw new Error("AnimationContext was used outside the CitiesProvider");
  }
  return context;
}
export { AnimationProvider, useAnimationStudio };
