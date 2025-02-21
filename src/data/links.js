import { BsFillInboxesFill } from "react-icons/bs";
import { FaClipboardList, FaUsers, FaUserTie } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { MdCategory } from "react-icons/md";
export const links = [
  {
    title: "Dashboard",
    pageLink: [
      {
        name: "Dashboard",
        icon: <FiShoppingBag />,
        slugName: "",
      },
    ],
  },
  {
    title: "Inventory",
    pageLink: [
      {
        name: "Products",
        icon: <BsFillInboxesFill />,
        slugName: "products",
      },
    ],
  },
  {
    title: "Staff",
    pageLink: [
      {
        name: "Staff Management",
        icon: <FaUserTie />,
        slugName: "staff",
      },
    ],
  },
  {
    title: "Customer",
    pageLink: [
      {
        name: "Customers",
        icon: <FaUsers />,
        slugName: "customers",
      },
    ],
  },
  {
    title: "Order",
    pageLink: [
      {
        name: "Orders",
        icon: <FaClipboardList />,
        slugName: "orders",
      },
    ],
  },
  {
    title: "Category",
    pageLink: [
      {
        name: "Categories",
        icon: <MdCategory />,
        slugName: "categories",
      },
    ],
  },
];
