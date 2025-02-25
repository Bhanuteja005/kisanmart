import React from 'react';
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from '../components/ProtectedRoute';
import {
    AddCategory,
    AddProduct,
    Categories,
    Customers,
    DashBoard,
    EditProduct,
    LogIn,
    Orders,
    ProductDetails,
    Products,
    SignUp
} from "../pages";
import DealerPage from "../pages/DealerPage";
import OnBoarding from '../pages/onBoarding';
import StaffManagement from "../pages/StaffManagement";

const EcommerceStatic = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<OnBoarding />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashBoard />
        </ProtectedRoute>
      }>
        <Route index element={<EcommerceStatic />} />
        <Route path="products/*" element={<Products />} />
        <Route path="categories/*" element={<Categories />} />
        <Route path="dealers/*" element={<DealerPage />} />
        <Route path="orders/*" element={<Orders />} />
        <Route path="customers/*" element={<Customers />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="add-category" element={<AddCategory />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
        <Route path="product-details/:id" element={<ProductDetails />} />
        <Route path="staff" element={<StaffManagement />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
