import { Route, Routes } from "react-router-dom";
import { UserDetails } from "../pages";

const RoutesProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDetails />} />
    </Routes>
  );
};

export default RoutesProvider;
