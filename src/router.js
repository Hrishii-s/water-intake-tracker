import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import View from "./components/crud/View";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path:'/signup',element:<SignUp/>},
    { path:'/login', element:<LogIn/>},
    { path:'/view', element:<View/>}
  
]);

export default router;