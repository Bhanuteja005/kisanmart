import React, { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { BsPlusLg } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import DealerDataTable from "../components/tables/DealerDataTable";
import { dealersAPI } from '../services/api';

const DealerPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dealers, setDealers] = useState([
    { 
      id: 1, 
      name: "Amit Kumar", 
      email: "amit@example.com", 
      phone: "9876543210", 
      address: "123 Farm Road, Punjab", 
      status: "Active",
      lastOrder: "2024-02-15",
      totalOrders: 25,
      revenue: "₹1,25,000"
    }
  ]);
  const [newDealer, setNewDealer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "Active"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    try {
      setLoading(true);
      const response = await dealersAPI.getAll();
      setDealers(response.data);
    } catch (error) {
      toast.error('Failed to fetch dealers');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await dealersAPI.create(newDealer);
      setDealers([...dealers, response.data]);
      setIsModalOpen(false);
      setNewDealer({ name: "", email: "", phone: "", address: "", status: "Active" });
      toast.success('Dealer added successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add dealer');
    } finally {
      setLoading(false);
    }
  };

  const handleDealerAction = async (action, dealerId) => {
    try {
      switch (action) {
        case 'delete':
          await dealersAPI.delete(dealerId);
          setDealers(dealers.filter(dealer => dealer.id !== dealerId));
          toast.success('Dealer deleted successfully');
          break;
        // Handle edit and view actions
        case 'edit':
          // Handle edit action
          break;
        case 'view':
          // Handle view action
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error('Action failed');
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-gray-800">Dealer Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg flex items-center gap-2 px-4 py-2 bg-[#00922F] hover:bg-[#007D28] transition-colors font-semibold text-white"
        >
          <BsPlusLg className="text-lg" />
          <span>Add Dealer</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <DealerDataTable 
          dealers={dealers} 
          onDealerAction={handleDealerAction}
          loading={loading} // Now being used in DealerDataTable
        />
      </div>

      {/* Add Dealer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Add New Dealer</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoMdClose size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name*</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  value={newDealer.name}
                  onChange={(e) => setNewDealer({...newDealer, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email*</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  value={newDealer.email}
                  onChange={(e) => setNewDealer({...newDealer, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone*</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  value={newDealer.phone}
                  onChange={(e) => setNewDealer({...newDealer, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  value={newDealer.address}
                  onChange={(e) => setNewDealer({...newDealer, address: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                  value={newDealer.status}
                  onChange={(e) => setNewDealer({...newDealer, status: e.target.value})}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#00922F] text-white rounded-md hover:bg-[#007D28]"
                >
                  Add Dealer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealerPage;