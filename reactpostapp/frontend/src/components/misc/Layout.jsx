import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import FooterSimple from "./Footer";
import classes from './Layout.module.css'

const Layout = () => {
  return (
    <>
    <div className={classes.main}>
      <Navbar />
      <main >
        <Outlet />
      </main>
      
    </div>
    <FooterSimple /></>
  );
};

export default Layout;
