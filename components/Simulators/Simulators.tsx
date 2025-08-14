import React from "react";
import Slider from "../CommonComponents/Slider";
import Tag from "../CommonComponents/Tag";

const Simulators = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 lg:mt-10  lg:px-10">
      <h3 className="text-2xl font-bold font-agrandir text-secondary text-center">
        USA NUESTROS <span className="text-primary"> SIMULADORES</span> PARA
        PROYECTAR TU FUTURO
      </h3>
      <Tag title="HERRAMIENTAS" />
      <Slider />
    </div>
  );
};

export default Simulators;
