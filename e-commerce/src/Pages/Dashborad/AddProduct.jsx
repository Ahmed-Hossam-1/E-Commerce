import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loading from "../../Components/Loading/Loading";
import { Axios } from "../../API/Axios";
import { CATEGORIES, PRODUCT } from "../../API/Api";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [images, setImages] = useState([]);
  const [cat, setCat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const nav = useNavigate();

  const openImage = useRef(null);

  // Get All CATEGORIES
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((res) => setCat(res.data))
      .catch((err) => console.log(err));
  }, []);

  async function handelSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData();
    formData.append("category", form.category);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("discount", form.discount);
    formData.append("About", form.About);
    for (let i = 0; i < images.length; ++i) {
      formData.append("images[]", images[i]);
    }
    try {
      const res = await Axios.post(`${PRODUCT}/add`, formData);
      setLoading(false);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  const handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Mapping
  const imagesShow = images.map((img, i) => (
    <div
      key={i}
      className="d-flex align-items-center justify-content-start gap-2 border p-2 w-100"
    >
      <img width="80px" src={URL.createObjectURL(img)} />
      <div>
        <p className="mb-1">{img.name}</p>
        <p className="mb-1">
          {(img.size / 1024 < 900
            ? img.size / 1024
            : img.size / (1024 * 1024)
          ).toFixed(2)}
          {img.size / 1024 < 900 ? "KB" : "MB"}
        </p>
      </div>
    </div>
  ));
  return (
    <Form className="bg-white w-100 p-3" onSubmit={handelSubmit}>
      <Form.Group className="mb-3" controlId="formBasicCategory">
        <Form.Label>Category</Form.Label>
        <Form.Select
          value={form.category}
          name="category"
          onChange={handelChange}
        >
          <option disabled>Select Category</option>
          {cat.map((item, i) => (
            <option key={i} value={item.id}>
              {item.title}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={form.title}
          required
          name="title"
          onChange={handelChange}
          type="text"
          placeholder="Enter Title"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={form.description}
          name="description"
          required
          onChange={handelChange}
          type="text"
          placeholder="Enter Description"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          value={form.price}
          name="price"
          required
          onChange={handelChange}
          type="text"
          placeholder="Enter Price"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDiscount">
        <Form.Label>Discount</Form.Label>
        <Form.Control
          value={form.discount}
          name="discount"
          required
          onChange={handelChange}
          type="text"
          placeholder="Enter Discount"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicAbout">
        <Form.Label>About</Form.Label>
        <Form.Control
          value={form.About}
          name="About"
          required
          onChange={handelChange}
          type="text"
          placeholder="Enter About"
        />
      </Form.Group>

      <Form.Group className="mb-1" controlId="formBasicImages">
        <Form.Label>Images</Form.Label>
        <Form.Control
          ref={openImage}
          hidden
          multiple
          onChange={(e) => setImages([...e.target.files])}
          type="file"
        />
      </Form.Group>

      <div
        onClick={() => openImage.current.click()}
        style={{
          border: "2px dashed #0086fe",
          marginBottom: "15px",
          cursor: "pointer",
        }}
        className="d-flex align-items-center justify-content gap-2 py-2 w-100 flex-column"
      >
        <img width="100px" src="../../../public/image/upload.png" alt="NON" />
        <p style={{ color: "#0086fe", fontWeight: "bold", margin: "0" }}>
          Upload Images
        </p>
      </div>

      <div className="d-flex align-items-start flex-column gap-2">
        {imagesShow}
      </div>

      <Button
        disabled={form.title.length < 1 ? true : false}
        variant="primary"
        type="submit"
      >
        {loading ? <Loading /> : "UpLoad"}
      </Button>
    </Form>
  );
}

export default AddProduct;
