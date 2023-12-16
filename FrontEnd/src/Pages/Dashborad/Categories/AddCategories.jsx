import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loading from "../../../Components/Shared/Loading/Loading";
import { CAT_ADD } from "../../../utils/API/Permisions";
import { Axios } from "../../../utils/API/Axios";

function AddCategories() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  //Loading
  const [loading, setLoading] = useState(false);

  async function handelSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${CAT_ADD}/add`, form);
      setLoading(false);
      window.location.pathname = "/dashboard/categories";
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  return (
    <Form className="bg-white w-100 p-3" onSubmit={handelSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter Title"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicImage">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setImage(e.target.files.item(0))}
        />
      </Form.Group>

      <Button
        disabled={title.length < 1 ? true : false}
        variant="primary"
        type="submit"
      >
        {loading ? <Loading /> : "Save"}
      </Button>
    </Form>
  );
}

export default AddCategories;
