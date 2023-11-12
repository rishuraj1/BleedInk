import React from "react";
import { Outlet } from "react-router-dom";
import { Button, Container, Footer, Header, Loader } from "./components";

const App = () => {
  return (
    <div className="w-full bg-gray-200 flex flex-col flex-wrap justify-between">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
