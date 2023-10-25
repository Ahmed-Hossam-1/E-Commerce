import { useEffect, useState } from "react";
import { CATEGORIES, CAT_ADD } from "../../API/Api";
import { Axios } from "../../API/Axios";
import TableShow from "../../Components/Dashboard/TableShow";

const Categories = () => {
  const [cat, setCat] = useState([]);

  // Get All CATEGORIES
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((res) => setCat(res.data))
      .catch((err) => console.log(err));
  }, []);

  const headers = [
    { name: "Title", type: "title" },
    { name: "Image", type: "image" },
  ];

  // Delete CATEGORIES
  async function handelDelete(ID) {
    try {
      const res = await Axios.delete(`${CAT_ADD}/${ID}`);
      setCat((prev) => prev.filter((item) => item.id !== ID));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="mb-4 mt-2">Categories Page</h1>
      </div>
      {cat.length > 0 && (
        <TableShow header={headers} data={cat} delete={handelDelete} />
      )}
    </div>
  );
};

export default Categories;
