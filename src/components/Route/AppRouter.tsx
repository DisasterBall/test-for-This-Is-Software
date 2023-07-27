import {Routes, Route, Navigate } from 'react-router-dom';
import {publicRoutes} from "../Route/routes";
import { MAIN_ROUTE } from "../../utils/constRoutes";

function AppRouter() {
  return (
    <Routes>

      {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={<Component />} />
      )}

      <Route path="*" element={<Navigate to={MAIN_ROUTE} replace />}
    />
    </Routes>
  );
}

export default AppRouter