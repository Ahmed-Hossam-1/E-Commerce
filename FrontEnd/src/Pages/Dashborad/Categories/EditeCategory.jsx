import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loading from "../../../Components/Shared/Loading/Loading";
import { useParams } from "react-router-dom";
import { Axios } from "../../../utils/API/Axios";
import { CAT_ADD } from "../../../utils/API/Permisions";

function EditeCategory() {
  const { categoriyID } = useParams();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  //Loading
  const [loading, setLoading] = useState(false);

  // Get Category
  useEffect(() => {
    Axios.get(`/${CAT_ADD}/${categoriyID}`)
      .then((res) => setTitle(res.data.title))
      .catch((err) => console.log(err));
  }, []);

  async function handelSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${CAT_ADD}/edit/${categoriyID}`, form);
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

export default EditeCategory;
