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
  const [sentForm, setSentForm] = useState(false);
  // Product ID
  const [id, setId] = useState();
  // sent real data
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  // sent init data
  const dummyData = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: 55,
    discount: 0,
    About: "dummy",
  };
  const nav = useNavigate();
  // select images
  const openImage = useRef(null);
  const progress = useRef([]);
  const j = useRef(-1);

  // Get All CATEGORIES
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((res) => setCat(res.data))
      .catch((err) => console.log(err));
  }, []);

  // sent real data
  async function handelEdit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await Axios.post(`${PRODUCT}/edit/${id}`, form);
      setLoading(false);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  // sent init data
  async function handelSubmitForm() {
    try {
      const res = await Axios.post(`${PRODUCT}/add`, dummyData);
      setId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  }

  const handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSentForm(true);
    if (sentForm !== true) {
      handelSubmitForm();
    }
  };

  async function handelImageChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imageFiles = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < imageFiles.length; i++) {
      j.current++;
      formData.append("image", imageFiles[i]);
      formData.append("product_id", id);
      try {
        const res = await Axios.post("/product-img/add", formData, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);
            progress.current[j.current].style.width = `${percent}%`;
            progress.current[j.current].setAttribute("percent", `${percent}%`);
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  // Mapping
  const imagesShow = images.map((img, key) => (
    <div key={key} className="border p-2 w-100 mb-2">
      <div className="d-flex align-items-center justify-content-start gap-2">
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
      <div className="custom-progress mt-3">
        <span
          ref={(e) => (progress.current[key] = e)}
          className="inner-progress"
        ></span>
      </div>
    </div>
  ));
  return (
    <Form className="bg-white w-100 p-3" onSubmit={handelEdit}>
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
          disabled={!sentForm}
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
          disabled={!sentForm}
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
          disabled={!sentForm}
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
          disabled={!sentForm}
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
          disabled={!sentForm}
        />
      </Form.Group>

      <Form.Group className="mb-1" controlId="formBasicImages">
        <Form.Label>Images</Form.Label>
        <Form.Control
          ref={openImage}
          hidden
          multiple
          onChange={handelImageChange}
          type="file"
          disabled={!sentForm}
        />
      </Form.Group>

      <div
        onClick={() => openImage.current.click()}
        style={{
          border: !sentForm ? "2px dashed gray" : "2px dashed #0086fe",
          marginBottom: "15px",
          cursor: "pointer",
        }}
        className="d-flex align-items-center justify-content gap-2 py-2 w-100 flex-column"
      >
        <img
          width="100px"
          style={{ filter: !sentForm && "grayscale(1)" }}
          src="/image/upload.png"
          alt="NON"
        />
        <p
          style={{
            color: !sentForm ? "gray" : "#0086fe",
            fontWeight: "bold",
            margin: "0",
          }}
        >
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
        {loading ? <Loading /> : "Save"}
      </Button>
    </Form>
  );
}

export default AddProduct;
