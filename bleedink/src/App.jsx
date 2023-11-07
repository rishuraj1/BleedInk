import React from "react";
import { Outlet } from "react-router-dom";
import { Button, Container, Footer, Header, Loader } from "./components";

const App = () => {
  return (
    <div className="flex flex-col justify-between h-[100vh]">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
