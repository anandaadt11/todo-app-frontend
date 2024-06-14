import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const Card = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getData();
  }, [users]);

  const getData: () => void = async () => {
    try {
      const response = await axios.get(`${apiUrl}`);
      const sortedData = response.data.data.sort(
        (a: User, b: User) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setUsers(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const delateData = async (id: number) => {
    try {
      axios.delete(`${apiUrl}/${id}`);
      getData();
    } catch (error) {
      console.error("Error delete data:", error);
    }
  };
  return (
    <>
      {users.map((user) => (
        <div
          className="m-5 p-3 border-2 border-lime-500 rounded-xl hover:shadow-sm hover:shadow-sky-500"
          key={user.id}
        >
          <h1 className="text-2xl font-bold text-slate-700">{user.title}</h1>
          <p className="text-slate-500">{user.description}</p>
          <div className="flex justify-end gap-1">
            <button
              onClick={() => delateData(user.id)}
              className="bg-sky-500 p-2 text-sm rounded-lg font-medium hover:bg-sky-600 text-white shadow-lg"
            >
              Done
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
