import { Toaster } from 'react-hot-toast';
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
// ...other imports...

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        } />
        {/* ...other routes... */}
      </Routes>
    </>
  );
};

export default App;
