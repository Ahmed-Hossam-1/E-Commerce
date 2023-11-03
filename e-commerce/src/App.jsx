import HomePage from "./Pages/Website/HomePage";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Users from "./Pages/Dashborad/Users/Users";
import GoogleCallback from "./Pages/Auth/GoogleCallback";
import Dashboard from "./Pages/Dashborad/Dashboard";
import RequireAuth from "./Pages/Auth/RequireAuth";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import UserDetials from "./Pages/Dashborad/Users/UserDetials";
import AddUser from "./Pages/Dashborad/Users/AddUser";
import Writer from "./Pages/Dashborad/Writer/Writer";
import NotFound from "./Pages/Auth/404";
import RequierBack from "./Pages/Auth/RequierBack";
import Categories from "./Pages/Dashborad/Categories/Categories";
import AddCategories from "./Pages/Dashborad/Categories/AddCategories";
import EditeCategory from "./Pages/Dashborad/Categories/EditeCategory";
import Products from "./Pages/Dashborad/Products/Products";
import AddProduct from "./Pages/Dashborad/Products/AddProduct";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Route */}
        <Route path="/" element={<HomePage />} />
        <Route element={<RequierBack />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/auth/google/callback" element={<GoogleCallback />} />

        {/* Page 404 */}
        <Route path="/*" element={<NotFound />} />

        {/* Producted Route */}
        <Route element={<RequireAuth allowedRole={["1996", "1995", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Outlet />}>
                <Route index element={<Users />} />
                <Route path=":usersID" element={<UserDetials />} />
              </Route>
              <Route path="user/add" element={<AddUser />} />
            </Route>
            {/* Writer */}
            <Route element={<RequireAuth allowedRole={["1996", "1995"]} />}>
              <Route path="writer" element={<Writer />} />
            </Route>
            {/* PM */}
            <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
              {/* Categories */}
              <Route path="categories" element={<Outlet />}>
                <Route index element={<Categories />} />
                <Route path=":categoriyID" element={<EditeCategory />} />
              </Route>
              <Route path="category/add" element={<AddCategories />} />
              {/* Products */}
              <Route path="products" element={<Outlet />}>
                <Route index element={<Products />} />
                {/* <Route path=":productID" element={<EditeCategory />} /> */}
              </Route>
              <Route path="product/add" element={<AddProduct />} />
            </Route>
          </Route>
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
