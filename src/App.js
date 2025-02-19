import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  AddProduct,
  DashBoard,
  EditProduct,
  LogIn,
  ProductDetails,
  Products,
  SignUp
} from "./pages";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/*" element={<DashBoard />}>
            <Route index element={<Products />} />
            <Route path="products" element={<Products />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="product-details/:id" element={<ProductDetails />} />
          </Route>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
