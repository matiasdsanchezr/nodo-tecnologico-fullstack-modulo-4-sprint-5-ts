import { Route, Routes } from "react-router";
import Home from "../pages/Home";
// import About from '../components/About'
import { Dashboard } from "../pages/Countries/Dashboard";
import { CreateCountry } from "../pages/Countries/Create";
import EditCountry from "../pages/Countries/Edit/EditCountry";
// import NotFound from '../components/NotFound'
// import ProfileSelector from '../components/ProfileSelector'
// import ProfileDetail from '../components/ProfileDetail'
// import ProfileCreate from '../components/ProfileCreate'
// import ProfileEdit from '../components/ProfileEdit'

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries" element={<Dashboard />} />
        <Route path="/countries/create" element={<CreateCountry />} />
        <Route path="/countries/:id/edit" element={<EditCountry />} />
      </Routes>
    </>
  );
};

export default AppRouter;
