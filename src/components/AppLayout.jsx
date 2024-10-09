import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-x-hidden">
      <Header />
      <main>
        <Outlet />
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
