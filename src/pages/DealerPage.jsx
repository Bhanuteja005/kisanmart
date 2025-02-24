// ...copy content from dealer.jsx and rename the file...
import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";

const DealerPage = () => {
  const [dealers, setDealers] = useState([]);
  const [newDealer, setNewDealer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "Active",
  });

  const handleInputChange = (e) => {
    setNewDealer({ ...newDealer, [e.target.name]: e.target.value });
  };

  const handleAddDealer = () => {
    setDealers([...dealers, newDealer]);
    setNewDealer({ name: "", email: "", phone: "", address: "", status: "Active" });
  };

  return (
    <div className="dealer-page p-6">
      <h1 className="text-2xl font-bold mb-4">Dealer Management</h1>

      {/* Dealer Management Table */}
      <div className="border rounded-lg p-4 shadow-md bg-white">
        <h2 className="text-lg font-semibold mb-3">Add Dealer</h2>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="p-2">Name:</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={newDealer.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="p-2 border rounded w-full"
                />
              </td>
            </tr><br></br>
            <tr>
              <td className="p-2">Email:</td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={newDealer.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="p-1 border rounded w-full"
                />
              </td>
            </tr><br></br>
            <tr>
              <td className="p-2">Phone:</td>
              <td>
                <input
                  type="text"
                  name="phone"
                  value={newDealer.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="p-2 border rounded w-full"
                />
              </td>
            </tr><br></br>
            <tr>
              <td className="p-2">Address:</td>
              <td>
                <input
                  type="text"
                  name="address"
                  value={newDealer.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="p-2 border rounded w-full"
                />
              </td>
            </tr><br></br>
            <tr>
              <td className="p-2">Status:</td>
              <td>
                <select
                  name="status"
                  value={newDealer.status}
                  onChange={handleInputChange}
                  className="p-2 border rounded w-full"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAddDealer}
            className="rounded-lg flex items-center gap-2 px-4 py-2 bg-[#00922F] hover:bg-[#007D28] transition-colors font-semibold text-white"
          >
            <BsPlusLg className="text-lg" />
            <span>Add Dealer</span>
          </button>
        </div>
      </div>

      {/* Dealer List Table */}
      <div className="border rounded-lg p-4 shadow-md bg-white mt-6">
        <h2 className="text-lg font-semibold mb-3">Dealer List</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {dealers.length > 0 ? (
              dealers.map((dealer, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{dealer.name}</td>
                  <td className="border p-2">{dealer.email}</td>
                  <td className="border p-2">{dealer.phone}</td>
                  <td className="border p-2">{dealer.address}</td>
                  <td className="border p-2">{dealer.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border p-2 text-center">
                  No dealers added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DealerPage;