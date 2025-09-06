"use client";

import { DollarSignIcon } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  calculateDailyGrowth,
  calculateFinalAmount,
  calculatefinalAmountLulo,
  convertNumbertoString,
  convertStringtoNumber,
  validarNumero,
} from "@/lib/utils";
import { Button } from "../../ui/button";
import { DailyGrowth } from "@/lib/interface";

interface IProfitability {
  profitability: number[] | undefined;
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}
interface FinalAmount {
  eaPercent: number;
  i_mes: number;
  gananciaDiariaAprox: number;
  montoBruto: number;
  retencion: number;
  montoFinal: number;
}

const Profitability = ({
  profitability,
  selected,
  setSelected,
}: IProfitability) => {
  const [data, setData] = useState<DailyGrowth[]>([]);
  const [finalAmount, setFinalAmount] = useState<FinalAmount | null>({
    eaPercent: 0,
    i_mes: 0,
    gananciaDiariaAprox: 0,
    montoBruto: 0,
    retencion: 0,
    montoFinal: 0,
  });
  const [initialAmount, setInitialAmount] = useState("");
  const [days, setDays] = useState("");

  const handleSimulate = () => {
    const annualRate = profitability ? Number(profitability[selected]) : 0;
    const finalEarning = calculatefinalAmountLulo(
      annualRate * 100,
      Number(convertStringtoNumber(days)),
      Number(convertStringtoNumber(initialAmount))
    );

    setFinalAmount(finalEarning);
  };

  function handleChangeInitialAmount(value: string) {
    if (!validarNumero(value)) return;
    const newValue = convertStringtoNumber(value);
    setInitialAmount(convertNumbertoString(newValue));
  }

  function handleChangeDays(value: string) {
    if (!validarNumero(value)) return;
    const newValue = convertStringtoNumber(value);
    setDays(convertNumbertoString(newValue));
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(Number(e.target.value));
  };

  const format = (v: number) =>
    Number.isFinite(v) ? `$ ${v.toLocaleString("es-CO")}` : "-";

  return (
    <div className="space-y-8">
      <div className="flex flex-col  gap-0.5 ">
        <h3 className="text-sm text-secondary font-canva-sans font-bold">
          Valor a invertir
        </h3>
        <div className="group flex items-center gap-2 border-2 border-green-200 rounded-lg px-3 py-2 bg-background md:w-2/5  hover:border-green-500 focus-within:border-green-500">
          <DollarSignIcon />
          {/* Campo de entrada */}
          <input
            type="string"
            value={initialAmount}
            onChange={(e) => handleChangeInitialAmount(e.target.value)}
            className="text-black font-bold w-5/6 outline-none"
          />
        </div>
      </div>
      {profitability && profitability?.length > 1 && (
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm text-secondary font-canva-sans font-bold">
            Rentabilidad
          </h3>
          <div className="group flex items-center gap-2 border-2 border-green-200 rounded-lg px-3 py-2 bg-background md:w-2/5  hover:border-green-500 focus-within:border-green-500">
            {/* Campo de entrada */}
            <select
              className="text-black font-bold outline-none w-full"
              onChange={handleChange}
            >
              {profitability?.map((item, index) => (
                <option key={item} value={index}>
                  {item * 100} %
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm text-secondary font-canva-sans font-bold">
          Periodo (meses)
        </h3>
        <div className="group flex items-center gap-2 border-2 border-green-200 rounded-lg px-3 py-2 bg-background md:w-2/5  hover:border-green-500 focus-within:border-green-500">
          <input
            type="string"
            value={days}
            onChange={(e) => handleChangeDays(e.target.value)}
            className="text-black font-bold w-5/6 outline-none"
          />
        </div>
      </div>
      <Button
        onClick={handleSimulate}
        disabled={days === "" || initialAmount === ""}
        className="bg-primary/80 text-tertiary hover:bg-primary transition-colors cursor-pointer font-canva-sans font-bold"
      >
        Simular
      </Button>

      {finalAmount && finalAmount.montoFinal !== 0 && (
        <div className="mt-6 p-4 ">
          <h2 className="text-lg text-secondary font-agrandir font-bold">
            Resultados
          </h2>
          <p className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <p className="text-sm text-secondary font-canva-sans font-bold">
              EA ingresada
            </p>
            <div className="text-right">{finalAmount.eaPercent}%</div>

            <p className="text-sm text-secondary font-canva-sans font-bold">
              Tasa mensual efectiva
            </p>
            <div className="text-right">
              {(finalAmount.i_mes * 100).toFixed(6)} %
            </div>

            <p className="text-sm text-secondary font-canva-sans font-bold">
              Ganancia diaria (aprox. primer mes)
            </p>
            <div className="text-right">
              {format(Math.round(finalAmount.gananciaDiariaAprox))}
            </div>

            <p className="text-sm text-secondary font-canva-sans font-bold">
              Monto bruto (compuesto)
            </p>
            <div className="text-right">
              {format(Math.round(finalAmount.montoBruto))}
            </div>

            <p className="text-sm text-secondary font-canva-sans font-bold">
              Retención en la fuente
            </p>
            <div className="text-right">{format(finalAmount.retencion)}</div>

            <p className="text-sm text-secondary font-canva-sans font-bold">
              Valor total (neto)
            </p>
            <div className="text-right font-semibold">
              {format(finalAmount.montoFinal)}
            </div>
          </p>

          <p className="mt-3 text-xs text-gray-500">
            Notas: se asumen 30 días por mes. La retención se calcula por día y
            se acumula, pero el interés se compone mensualmente y la retención
            se resta del monto bruto al final. Importante: todos los valores son
            aproximados y te ayudan a aproximar tu inversion, para un valor
            exacto se debe consultar con su banco
          </p>
        </div>
      )}
    </div>
  );
};

export default Profitability;
