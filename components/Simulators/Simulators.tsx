import React from "react";
import Slider from "../CommonComponents/Slider";
import Tag from "../CommonComponents/Tag";
import Link from "next/link";

const Simulators = () => {
  return (
    <div className="reveal flex flex-col items-center justify-center w-full gap-4 lg:mt-10 lg:px-10">
      <h3 className="text-2xl font-bold font-agrandir text-secondary text-center">
        USA NUESTROS <span className="text-primary"> SIMULADORES</span> PARA
        PROYECTAR TU FUTURO
      </h3>

      <div>
        <Link href={"/calculadoras"}>
          <Tag title="CALCULADORAS" />
        </Link>
      </div>

      <div className="w-full">
        <Slider />
      </div>
    </div>
  );
};

export default Simulators;
