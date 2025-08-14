"use client";

import Tag from "@/components/CommonComponents/Tag";
import { RootState } from "@/store/store";
import { DollarSignIcon, FlagIcon, MoveDown, MoveRight } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const { dolar } = useSelector((state: RootState) => state.sanity);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 lg:-mt-10  lg:px-10">
      <h1 className="text-2xl font-bold font-agrandir text-secondary text-center">
        DOLARES AMERICANOS A
        <span className="text-primary"> PESOS COLOMBIANOS</span>
      </h1>
      <h2 className="text-xl text-tertiary font-canva-sans w-full lg:w-1/2 text-center">
        Convierte dólares estadounidenses (USD) a pesos colombianos (COP)
      </h2>
      <div className="self-start">
        <Tag title="Herramienta" />
      </div>
      <div className="bg-tertiary-foreground w-full md:w-4/5 lg:w-3/4 h-auto rounded-2xl py-10 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm text-secondary font-canva-sans font-bold">
              Cantidad
            </h4>
            <div className="group flex items-center gap-2 border-2 border-purple-200 rounded-lg px-3 py-2 bg-background w-full  hover:border-purple-500 focus-within:border-purple-500">
              <DollarSignIcon />
              {/* Campo de entrada */}
              <input
                type="number"
                // value={amount}
                // onChange={(e) => setAmount(Number(e.target.value))}
                className="text-black font-bold w-24 outline-none"
              />

              {/* Moneda */}
              <div className="flex items-center gap-1">
                <FlagIcon className="text-xl" />
                <select className="bg-transparent outline-none text-gray-700 font-medium">
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="COP">COP</option>
                </select>
              </div>
            </div>
          </div>
          <MoveRight className=" hidden md:block self-center mt-8 size-6 " />
          <MoveDown className="md:hidden " />
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm text-secondary font-canva-sans font-bold">
              Convertido a
            </h4>
            <div className="flex items-center gap-2 border-2 border-purple-200 rounded-lg px-3 py-2 bg-background w-full hover:border-purple-500 focus-within:border-purple-500">
              <DollarSignIcon />
              {/* Campo de entrada */}
              <input
                type="number"
                // value={amount}
                // onChange={(e) => setAmount(Number(e.target.value))}
                className="text-black font-bold w-24 outline-none"
              />

              {/* Moneda */}
              <div className="flex items-center gap-1">
                <FlagIcon className="text-xl" />
                <select className="bg-transparent outline-none text-gray-700 font-medium">
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="COP">COP</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto md:mx-0 w-full">
          <p className="font-canva-sans text-black text-sm mt-4 ml-2">
            1 USD ={" "}
            <span className="text-secondary">{Number(dolar?.valor)}</span> COP
          </p>
          <p className="font-canva-sans text-black text-sm mt-4 ml-2">
            Tipo de cambio actualizado al Banco de la República de Colombia a
            las 8:00 a.m. del día de hoy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
