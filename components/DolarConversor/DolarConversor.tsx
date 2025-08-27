import { Dolar } from "@/lib/interface";
import {
  convertCurrency,
  convertNumbertoString,
  convertStringtoNumber,
  validarNumero,
} from "@/lib/utils";
import { ArrowRightLeft, ArrowUpDown, DollarSignIcon } from "lucide-react";
import React, { useState } from "react";

const DolarConversor = ({ dolar }: { dolar: Dolar }) => {
  const [usd, setUsd] = useState("");
  const [cop, setCop] = useState("");

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, "primera parte");
    if (!validarNumero(e.target.value)) return;
    const value = convertStringtoNumber(e.target.value) || 0;
    console.log(value, "value");
    console.log(convertNumbertoString(value));
    setUsd(convertNumbertoString(value));
    setCop(
      convertNumbertoString(
        convertCurrency(Number(value), Number(dolar.valor), "COP")
      )
    );
  };

  const handleCopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (!validarNumero(e.target.value)) return;
    const value = convertStringtoNumber(e.target.value) || 0;
    console.log(value);
    console.log(convertNumbertoString(value));
    setCop(convertNumbertoString(value));
    setUsd(
      convertNumbertoString(
        convertCurrency(Number(value), Number(dolar.valor), "USD")
      )
    );
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8 justify-between">
        <div className="flex flex-col gap-0.5">
          <h4 className="text-sm text-secondary font-canva-sans font-bold">
            Cantidad
          </h4>
          <div className="group flex items-center border-2 border-green-200 rounded-lg px-3 py-2 bg-background w-full  hover:border-green-500 focus-within:border-green-500 pr-9 md:pr-8 xl:pr-5">
            <DollarSignIcon strokeWidth={3} />
            {/* Campo de entrada */}
            <input
              type="text"
              value={usd}
              onChange={(e) => handleUsdChange(e)}
              className="text-black font-bold w-full outline-none"
            />

            {/* Moneda */}
            <div className="flex items-center gap-1">
              <img
                src="/assets/convertdolar/IconUsa.png"
                alt="Usa Icon"
                className="size-6"
              />
              <p className="text-tertiary font-canva-sans">USD</p>
            </div>
          </div>
        </div>
        <ArrowRightLeft className="hidden md:block mt-6 size-6 " />
        <ArrowUpDown className="md:hidden " />
        <div className="flex flex-col gap-0.5">
          <h4 className="text-sm text-secondary font-canva-sans font-bold">
            Cantidad
          </h4>
          <div className="group flex items-center gap-2 border-2 border-green-200 rounded-lg px-3 py-2 bg-background w-full  hover:border-green-500 focus-within:border-green-500 pr-9 md:pr-8 xl:pr-5">
            <DollarSignIcon strokeWidth={3} />
            {/* Campo de entrada */}
            <input
              type="text"
              value={cop}
              onChange={(e) => handleCopChange(e)}
              className="text-black font-bold w-full outline-none"
            />

            {/* Moneda */}
            <div className="flex items-center gap-1">
              <img
                src="/assets/convertdolar/IconColombia.png"
                alt="Usa Icon"
                className="size-6"
              />
              <p className="text-tertiary font-canva-sans">COP</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto md:mx-0 w-full">
        <p className="font-canva-sans text-black text-sm mt-4 ml-2">
          1 USD = <span className="text-secondary">{Number(dolar?.valor)}</span>{" "}
          COP
        </p>
        <p className="font-canva-sans text-black text-sm mt-4 ml-2">
          Tipo de cambio actualizado al Banco de la República de Colombia a las
          8:00 a.m. del día de hoy.
        </p>
      </div>
    </div>
  );
};

export default DolarConversor;
