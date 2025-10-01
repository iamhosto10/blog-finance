"use client";

import { ChevronDown } from "lucide-react";
import React from "react";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphicsTable = () => {
  const dataValues = [
    { mes: "Enero", ingresos: 1500000, gastos: 1200000 },
    { mes: "Febrero", ingresos: 2300000, gastos: 1800000 },
    { mes: "Marzo", ingresos: 1750000, gastos: 1600000 },
    { mes: "Abril", ingresos: 2800000, gastos: 2000000 },
    { mes: "Mayo", ingresos: 3200000, gastos: 2500000 },
  ];

  const chartData = {
    labels: dataValues.map((d) => d.mes),
    datasets: [
      {
        label: "Ingresos",
        data: dataValues.map((d) => d.ingresos),
        borderColor: "green",
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "green",
        pointStyle: "triangle",
        fill: false,
      },
      {
        label: "Gastos",
        data: dataValues.map((d) => d.gastos),
        borderColor: "yellow",
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "yellow",
        pointStyle: "rect",
        fill: false,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Ingresos vs Gastos en COP",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw as number;
            return new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              maximumFractionDigits: 0,
            }).format(value);
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              maximumFractionDigits: 0,
            }).format(Number(value));
          },
        },
      },
    },
  };

  const formatCOP = (valor: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(valor);

  return (
    <div className="w-full rounded-2xl bg-primary-background/50">
      <div className="w-full flex flex-row items-center justify-center bg-primary-foreground rounded-t-2xl lg:max-h-8 gap-2">
        <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary py-1">
          ¿CUANTO QUIERES AHORRAR?
        </h3>
        <img
          src="/assets/graphicsTable/savings.png"
          className="hidden lg:block lg:size-14 -mt-1"
        />
      </div>
      <div className="flex flex-col items-center py-4">
        <div className="relative w-56">
          <select
            className="
          appearance-none w-full px-4 py-3 
          bg-primary-foreground text-tertiary 
          rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:bg-primary
          cursor-pointer
        "
          >
            <option value="">Selecciona una opción</option>
            <option value="op1">Opción 1</option>
            <option value="op2">Opción 2</option>
            <option value="op3">Opción 3</option>
          </select>

          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-tertiary size-7" />
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-center bg-primary-foreground lg:max-h-8 gap-2">
        <img
          src="/assets/graphicsTable/calendar.png"
          className="hidden lg:block lg:size-14 -mt-1"
        />

        <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center py-1">
          ¿CADA CUANTO VAS A APORTAR? ¿DIAS, SEMANAS, MESES, AÑOS?
        </h3>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center py-4 gap-5">
        <div className="relative w-56">
          <select
            className="
          appearance-none w-full px-4 py-3 
          bg-primary-foreground text-tertiary 
          rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:bg-primary
          cursor-pointer
        "
          >
            <option value="">Selecciona una opción</option>
            <option value="op1">Opción 1</option>
            <option value="op2">Opción 2</option>
            <option value="op3">Opción 3</option>
          </select>

          {/* Icono flecha */}
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-tertiary size-7" />
        </div>
        <div className="relative w-56">
          <select
            //   value={selected}
            //   onChange={(e) => setSelected(e.target.value)}
            className="
          appearance-none w-full px-4 py-3 
          bg-primary-foreground text-tertiary 
          rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:bg-primary
          cursor-pointer
        "
          >
            <option value="">Selecciona una opción</option>
            <option value="op1">Opción 1</option>
            <option value="op2">Opción 2</option>
            <option value="op3">Opción 3</option>
          </select>

          {/* Icono flecha */}
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-tertiary size-7" />
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-center bg-primary-foreground lg:max-h-8 gap-2 ">
        <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center py-1">
          ¿CUANTO VAS A APORTAR ? (PERIODICAMENTE)
        </h3>
        <img
          src="/assets/graphicsTable/savings.png"
          className="hidden lg:block lg:size-14 -mt-1"
        />
      </div>
      <div className="flex flex-col items-center py-4">
        <div className=" w-56">
          <input
            //   value={selected}
            //   onChange={(e) => setSelected(e.target.value)}
            className="
          appearance-none w-full px-4 py-3 
          bg-primary-foreground text-tertiary 
          rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:bg-primary

        "
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-center bg-primary-foreground py-1">
        <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center">
          ¿CUANTO DINERO PUEDES DAR INICIALMENTE?
        </h3>
      </div>
      <div className="flex flex-col items-center py-4">
        <div className=" w-56">
          <input
            //   value={selected}
            //   onChange={(e) => setSelected(e.target.value)}
            className="
          appearance-none w-full px-4 py-3 
          bg-primary-foreground text-tertiary 
          rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:bg-primary
        "
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-center bg-primary-foreground py-1">
        <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center">
          RESULTADOS
        </h3>
      </div>
      <div className="flex flex-col items-center py-6 px-5 lg:px-14 gap-10">
        <p> En 5 años, tendrá $41,629,064.56</p>
        <p className="text-center">
          {
            " La tabla a continuación ofrece una proyección del crecimiento de su ahorro inicial a lo largo del tiempo, basada en la tasa de interés y el tipo de capitalización que eligió. \n Tenga en cuenta que incluso cambios mínimos en estas variables pueden modificar el resultado. Puede reiniciar la calculadora e ingresar nuevos valores para explorar distintos escenarios."
          }
        </p>
        <div className="bg-white w-full min-h-[300px] md:min-h-[600px] h-full">
          {/* <Line data={data} options={options} /> */}
          <Line data={chartData} options={options} />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border border-secondary-foreground w-[100px]">
                Mes
              </TableHead>
              <TableHead className="border border-secondary-foreground">
                Ingresos
              </TableHead>
              <TableHead className="border border-secondary-foreground text-left">
                Gastos
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataValues.map((item) => (
              <TableRow key={item.mes}>
                <TableCell className="font-medium border border-secondary-foreground">
                  {item.mes}
                </TableCell>
                <TableCell className="border border-secondary-foreground">
                  {formatCOP(item.ingresos)}
                </TableCell>
                <TableCell className=" border border-secondary-foreground text-left">
                  {formatCOP(item.gastos)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={2}
                className="border border-secondary-foreground"
              >
                Total
              </TableCell>
              <TableCell className="border border-secondary-foreground text-left"></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default GraphicsTable;
