import React from "react";
import { useStatusContext } from "../context/ContextProvider";
import Switch from "@mui/material/Switch";
const EditCategory = () => {
  const { activeMenu } = useStatusContext();
  return (
    <div
      className={`${
        activeMenu ? "ml-72" : "w-full"
      }  mt-4 flex justify-center  gap-1`}
    >
      <div className="w-full flex justify-center m-4">
        <form className="p-8 w-full rounded-xl border-gray-dark shadow-2xl">
          <h2 className="text-2xl border-b-2 border-b-gray-medium  pb-4 font-extrabold text-black">
            Edit Category
          </h2>
          <div className="flex w-full justify-between mt-2">
            <div className="flex flex-col w-full">
              <div className="w-full mb-4">
                <label
                  htmlFor="categoryName"
                  className="text-xl font-extrabold text-gray-medium"
                >
                  Category Name
                </label>
                <input
                  className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
                  type="text"
                  id="categoryName"
                  value={"snow"}
                  onChange={() => {}}
                />
              </div>
              <div className="w-full mb-4">
                <label
                  htmlFor="type"
                  className="text-xl font-extrabold text-gray-medium"
                >
                  Type
                </label>
                <input
                  className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
                  type="text"
                  id="type"
                  value={"snow"}
                  onChange={() => {}}
                />
              </div>

              <div className="w-full mb-4">
                <label
                  className="text-xl font-extrabold text-gray-medium"
                  htmlFor="published"
                >
                  Published
                </label>
                <Switch defaultChecked />
              </div>

              <div>
                <button className="rounded-lg py-4 px-8 bg-sky-400 bg-blue-light text-white hover:bg-blue text-xl">
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
