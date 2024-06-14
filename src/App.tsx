import { SyntheticEvent, useState } from "react";
import Card from "./components/Card";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const submitData = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.post(`${apiUrl}`, {
        title,
        description,
      });
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error create data:", error);
    }
  };

  return (
    <>
      <div className="w-[50%] min-h-screen m-auto ">
        <h1 className="pt-5 text-7xl font-bold text-center ">
          <span className=" bg-gradient-to-r from-lime-500  to-sky-500 bg-clip-text text-transparent">
            Todo App
          </span>
        </h1>
        <div className="border border-sky-300 rounded-lg mt-5 p-5 shadow-sm shadow-lime-500 ">
          <h1 className="text-lime-500 text-2xl mb-1 font-bold">Create todo</h1>
          <form onSubmit={submitData}>
            <label htmlFor="Title">
              <span className="block font-semibold mb-1 text-slate-700">
                Title
              </span>
              <input
                className="px-3 py-2 border shadow rounded w-full block text-sm placeholder:text-slate-400
              focus:outline-none 
              focus:ring-1 focus:ring-lime-500
              focus:border-sky-500
              "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="Title"
                placeholder="Title"
              />
            </label>
            <label htmlFor="Description">
              <span className="block font-semibold mb-1 text-slate-700">
                Description
              </span>
              <textarea
                className="px-3 py-2 border shadow rounded w-full block text-sm placeholder:text-slate-400
              focus:outline-none 
              focus:ring-1 focus:ring-lime-500
              focus:border-sky-500
              "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="Description"
                placeholder="Description"
              />
            </label>
            <button
              className="bg-lime-500 p-2 text-sm rounded-lg font-medium hover:bg-lime-600 text-white shadow-lg mt-3 "
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
        <Card />
        <div className=""></div>
      </div>
    </>
  );
}

export default App;
