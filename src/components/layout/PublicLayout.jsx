import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import "./PublicLayout.css";

export function PublicLayout() {
  return (
    <div className="public-layout">
      <Navbar />
      <main className="public-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
