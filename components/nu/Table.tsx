"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  calculateDailyGrowth,
  convertNumbertoString,
  convertStringtoNumber,
  validarNumero,
} from "@/lib/utils";
import { DollarSignIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DailyGrowth } from "@/lib/interface";

interface ICalculateNu {
  profitabilityNu: number[] | undefined;
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}

const CalculatorNu = ({
  profitabilityNu,
  selected,
  setSelected,
}: ICalculateNu) => {
  const [data, setData] = useState<DailyGrowth[]>([]);
  const [initialAmount, setInitialAmount] = useState("");
  const [days, setDays] = useState("");

  const handleSimulate = () => {
    // const initialAmount = 10670000; // 1 millón COP
    // const initialAmount = 1000000; // 1 millón COP

    // const days = 30; // Simulación 30 días
    //   const annualRate = 0.0925; // 9.25% EA
    const annualRate = profitabilityNu ? Number(profitabilityNu[selected]) : 0;
    const growth = calculateDailyGrowth(
      Number(convertStringtoNumber(initialAmount)),
      Number(convertStringtoNumber(days)),
      annualRate
    );
    setData(growth);
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
  return (
    <div className="space-y-8">
      <div className="flex flex-col  gap-0.5 ">
        <h3 className="text-sm text-secondary font-canva-sans font-bold">
          Valor a invertir
        </h3>
        <div className="group flex items-center gap-2 border-2 border-purple-200 rounded-lg px-3 py-2 bg-background md:w-2/5  hover:border-purple-500 focus-within:border-purple-500">
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
      {profitabilityNu && profitabilityNu?.length > 1 && (
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm text-secondary font-canva-sans font-bold">
            Rentabilidad
          </h3>
          <div className="group flex items-center gap-2 border-2 border-purple-200 rounded-lg px-3 py-2 bg-background md:w-2/5  hover:border-purple-500 focus-within:border-purple-500">
            {/* Campo de entrada */}
            <select
              className="text-black font-bold outline-none w-full"
              onChange={handleChange}
            >
              {profitabilityNu?.map((item, index) => (
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
          Periodo (dias)
        </h3>
        <div className="group flex items-center gap-2 border-2 border-purple-200 rounded-lg px-3 py-2 bg-background md:w-2/5  hover:border-purple-500 focus-within:border-purple-500">
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="border border-secondary-foreground w-[100px]">
              Dia
            </TableHead>
            <TableHead className="border border-secondary-foreground">
              Interes Ganado
            </TableHead>
            <TableHead className="border border-secondary-foreground">
              Retencion
            </TableHead>
            <TableHead className="border border-secondary-foreground text-left">
              Monto
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium border border-secondary-foreground">
                {item.day}
              </TableCell>
              <TableCell className="border border-secondary-foreground">
                ${convertNumbertoString(item.interest)}
              </TableCell>
              <TableCell className="border border-secondary-foreground">
                ${convertNumbertoString(item.retencion)}
              </TableCell>
              <TableCell className=" border border-secondary-foreground text-left">
                ${convertNumbertoString(item.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={3}
              className="border border-secondary-foreground"
            >
              Total
            </TableCell>
            <TableCell className="border border-secondary-foreground text-left">
              ${" "}
              {convertNumbertoString(data[data.length - 1]?.amount) ===
              "und,efi,ned"
                ? 0
                : convertNumbertoString(data[data.length - 1]?.amount)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default CalculatorNu;
