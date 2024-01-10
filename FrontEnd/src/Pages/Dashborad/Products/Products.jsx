import { useEffect, useState } from "react";
import TableShow from "../../../Components/Shared/Tables/TableShow";
import { PRODUCT, PRODUCTS } from "../../../utils/API/Permisions";
import { Axios } from "../../../utils/API/Axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  const headers = [
    { name: "Title", type: "title" },
    { name: "Price", type: "price" },
    { name: "Description", type: "description" },
    { name: "Rating", type: "rating" },
  ];

  // Get All CATEGORIES
  useEffect(() => {
    Axios.get(`/${PRODUCTS}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Delete CATEGORIES
  async function handelDelete(ID) {
    try {
      const res = await Axios.delete(`${PRODUCT}/${ID}`);
      setProducts((prev) => prev.filter((item) => item.id !== ID));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="mb-4 mt-2">Products Page</h1>
      </div>
      <TableShow header={headers} data={products} delete={handelDelete} />
    </div>
  );
};

export default Products;
