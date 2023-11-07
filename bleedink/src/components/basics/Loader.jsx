import React from "react";
import { loaderAnimation } from "../../assets";
import Lottie from "lottie-react";

const Loader = () => {
  return (
    <Lottie
      animationData={loaderAnimation}
      loop={true}
      alt="Loading"
      style={{ height: "100vh", width: "100vw" }}
    />
  );
};

export default Loader;
