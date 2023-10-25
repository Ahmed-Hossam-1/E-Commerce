import { useEffect, useState } from "react";
import { CAT_ADD, PRODUCT, PRODUCTS } from "../../API/Api";
import { Axios } from "../../API/Axios";
import TableShow from "../../Components/Dashboard/TableShow";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get All CATEGORIES
  useEffect(() => {
    Axios.get(`/${PRODUCTS}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const headers = [
    { name: "Title", type: "title" },
    { name: "Price", type: "price" },
    { name: "Description", type: "description" },
    { name: "Rating", type: "rating" },
  ];
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
      {products.length > 0 && (
        <TableShow header={headers} data={products} delete={handelDelete} />
      )}
    </div>
  );
};

export default Products;
