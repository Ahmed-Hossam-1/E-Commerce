import {
  faPen,
  faUserPlus,
  faUsersRectangle,
  faCartPlus,
  faCartShopping,
  faPlus,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";

export const links = [
  {
    name: "Users",
    path: "users",
    icon: faUsersRectangle,
    role: ["1995"],
  },
  {
    name: "Add User",
    path: "user/add",
    icon: faUserPlus,
    role: ["1995"],
  },
  {
    name: "Categories",
    path: "categories",
    icon: faCartShopping,
    role: ["1995", "1999"],
  },
  {
    name: "Add Category",
    path: "category/add",
    icon: faCartPlus,
    role: ["1995", "1999"],
  },
  {
    name: "Products",
    path: "products",
    icon: faTruckFast,
    role: ["1995", "1999"],
  },
  {
    name: "Add Product",
    path: "product/add",
    icon: faPlus,
    role: ["1995", "1999"],
  },
  {
    name: "Writer",
    path: "writer",
    icon: faPen,
    role: ["1995", "1996"],
  },
];
