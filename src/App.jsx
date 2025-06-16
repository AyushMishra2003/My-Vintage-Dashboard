import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import ScanTest from "./pages/scan/ScanTest";
import SignIn from "./pages/admin/Login";
import ProtectedAuth from "./pages/admin/ProtectedAuth";


const PrivateRoute = ({ element }) => {
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem("auth"));
  const isAuthenticated = auth && new Date().getTime() < auth.expirationTime;
  return isAuthenticated ? element : <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
};

// function App() {
//   return (
//     <Routes>
//       {/* Private Routes (Requires Login) */}
//       <Route element={<ProtectedAuth isPrivate={true} />}>
//         <Route path="/dashboard/*" element={<Dashboard />} />
//         <Route path="/dashboard/scan/test/:slug" element={<ScanTest />} />
//         <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
//       </Route>

//       {/* Public Routes (Only when NOT logged in) */}
//       <Route element={<ProtectedAuth isPrivate={false} />}>
//         <Route path="/login" element={<Login />} />
//         <Route path="/auth/*" element={<Auth />} />
//       </Route>
//     </Routes>
//   );
// }



function App() {
  return (
    <Routes>
      <Route path="/auth/sign-in" element={<SignIn/>} />
      <Route path="/dashboard/*" element={<PrivateRoute element={<Dashboard />} />} />
      {/* <Route path="/dashboard/academic/add" element={<PrivateRoute element={<AcademicForm />} />} /> */}
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}

export default App;
