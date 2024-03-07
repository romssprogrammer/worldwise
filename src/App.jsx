import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";

// import Homepage from "./pages/Homepage";
// import Applayout from "./pages/Applayout";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";

import AnimationStudioList from "./components/AnimationStudioList";
import CountryList from "./components/CountryList";
import CityList from "./components/CityList";
import City from "./components/City";
import AnimationStudio from "./components/AnimationStudio";
import Form from "./components/Form";
import { AnimationProvider } from "./contexts/AnimationStudioContext";
import { AuthProvider } from "./contexts/FakeAuthentification";
import { Suspense, lazy } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";

const Homepage = lazy(() => import("./pages/Homepage"));
const Applayout = lazy(() => import("./pages/Applayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  const routeList = [
    "cities",
    "countries",
    "animationstudios",
    "Form",
    "videogamestudios",
  ];

  {
    /* Where do we need  providers information in the component tree */
  }
  {
    /* we need informations from the providers */
  }
  return (
    <AuthProvider>
      <AnimationProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <Applayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AnimationStudioList />} />
                <Route path={routeList[2]} element={<AnimationStudioList />} />
                <Route path="cities/:id" element={<City />} />
                {/* afficher l'ensemble des studios d'animation en cliquant sur une ville */}
                <Route
                  path="animationstudios/:id"
                  element={<AnimationStudio />}
                />
                <Route path={routeList[0]} element={<CityList />} />
                <Route path={routeList[1]} element={<CountryList />} />
                <Route path={routeList[4]} element={<p>Videogame Studio</p>} />
                <Route path={routeList[3]} element={<Form />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AnimationProvider>
    </AuthProvider>
  );
}

export default App;
