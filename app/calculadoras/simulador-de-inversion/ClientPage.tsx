"use client";

import React, { useEffect, useState } from "react";

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
import { Button } from "@/components/ui/button";

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
  convertNumbertoString,
  convertStringtoNumber,
  formatCOP,
  simulateInvestment,
  validarNumero,
} from "@/lib/utils";
import { CalcResultTotales, InvestmentRow } from "@/lib/interface";
import Link from "next/link";
import Tag from "@/components/CommonComponents/Tag";
import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";
import CalculatorResultCta from "@/components/CommonComponents/CalculatorResultCta";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ClientPage = () => {
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState({
    initialAmount: "",
    years: 0,
    interest: "",
    contributions: "",
  });
  const [totales, setTotales] = useState<CalcResultTotales>();
  const [variance, setVariance] = useState<string>("");
  const [dataValues, setDataValues] = useState<InvestmentRow[]>([]);
  const [dataValues1, setDataValues1] = useState<InvestmentRow[]>([]);
  const [dataValues2, setDataValues2] = useState<InvestmentRow[]>([]);

  const [chartData, setChartData] = useState({
    labels: dataValues.map((d) => d.year),
    datasets: [
      {
        label: "Interes",
        data: dataValues.map((d) => d.interest),
        borderColor: "green",
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "green",
        pointStyle: "triangle",
        fill: false,
      },
    ],
  });

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Balance Final VS Meses",
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
      x: {
        title: {
          display: true,
          text: "Meses",
          color: "#000",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Balance Final",
          color: "#000",
          font: {
            size: 14,
            weight: "bold",
          },
        },
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

  useEffect(() => {
    setChartData({
      labels: dataValues.map((d) => d.month),
      datasets: [
        {
          label: "Balance Final Variacion Negativa",
          data: dataValues1.map((d) => d.finalBalance),
          borderColor: "green",
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: "green",
          pointStyle: "triangle",
          fill: false,
        },
        {
          label: "Balance Final Origininal",
          data: dataValues.map((d) => d.finalBalance),
          borderColor: "yellow",
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: "yellow",
          pointStyle: "triangle",
          fill: false,
        },
        {
          label: "Balance Final Variacion Positiva",
          data: dataValues2.map((d) => d.finalBalance),
          borderColor: "red",
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: "red",
          pointStyle: "triangle",
          fill: false,
        },
      ],
    });
  }, [dataValues]);

  function handleChangeInput(value: string, key: string) {
    if (!validarNumero(value)) return;

    const newValue = convertStringtoNumber(value);
    console.log(newValue);
    setInputs({ ...inputs, [key]: convertNumbertoString(newValue) });
  }

  const calculate = () => {
    setShow(true);
    const variance1 = Number(inputs.interest) - Number(variance);
    const variance2 = Number(inputs.interest) + Number(variance);

    const results = simulateInvestment(
      Number(convertStringtoNumber(inputs.initialAmount)),
      Number(convertStringtoNumber(inputs.contributions)),
      variance1,
      inputs.years
    );
    const results1 = simulateInvestment(
      Number(convertStringtoNumber(inputs.initialAmount)),
      Number(convertStringtoNumber(inputs.contributions)),
      Number(convertStringtoNumber(inputs.interest)),
      inputs.years
    );
    const results2 = simulateInvestment(
      Number(convertStringtoNumber(inputs.initialAmount)),
      Number(convertStringtoNumber(inputs.contributions)),
      variance2,
      inputs.years
    );
    const totales: CalcResultTotales = {
      totalContributed: results.totalContributed,
      totalInterest: results.totalInterest,
      finalBalance: results.finalBalance,
    };
    setDataValues(results.table);
    setDataValues1(results1.table);
    setDataValues2(results2.table);
    setTotales(totales);
  };

  const translator = (ele: string) => {
    if (ele === "weekly") return "semana";
    if (ele === "biweekly") return "2 semanas";
    if (ele === "monthly") return "mes";
    if (ele === "quarterly") return "3 meses";
    if (ele === "annually") return "año";
  };

  return (
    <div className="container mx-auto flex flex-col gap-16">
      <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
        Simulador de Inversion
      </h1>
      <div className="flex ">
        <Link href="/calculadoras">
          <Tag title="CALCULADORAS" />
        </Link>
      </div>
      <p className="text-left font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
        ¿Quieres saber cuánto podría crecer tu dinero con el tiempo? Con nuestro
        Simulador de Inversión puedes estimar de forma sencilla el rendimiento
        de tu ahorro o inversión a futuro.
      </p>
      <p className="text-left font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl -mt-8">
        Solo necesitas ingresar algunos datos básicos como el monto inicial, tus
        aportes mensuales, la tasa de rentabilidad esperada y el plazo de tiempo
        y el simulador te mostrará:
        <br />
        <br />
        <ul className="list-disc list-inside">
          <li className="ml-6">
            📊 Una tabla detallada mes a mes con la evolución de tu capital.
          </li>
          <li className="ml-6">
            📈 Una gráfica de crecimiento que te permitirá visualizar cómo tu
            dinero se multiplica a lo largo del tiempo.
          </li>
          <li className="ml-6">
            💬 Una explicación personalizada del resultado final, mostrando
            cuánto corresponde a tus aportes y cuánto a las ganancias generadas
            por los intereses.
          </li>
        </ul>
        <br />
        Este simulador está diseñado para ayudarte a comprender el poder del
        interés compuesto y tomar decisiones más informadas sobre tus finanzas
        personales o tus inversiones a largo plazo.
      </p>
      <AdBanner
        dataAdFormat="auto"
        dataFullWidthResponsive={true}
        dataAdSlot="7506188604"
      />
      <div className="w-full rounded-2xl bg-primary-background/50">
        <div className="w-full flex flex-row items-center justify-center bg-primary-foreground rounded-t-2xl lg:max-h-8 gap-2">
          <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary py-1">
            ¿CANTIDAD INICIAL?
          </h3>
          <img
            src="/assets/graphicsTable/lending.png"
            className="hidden lg:block lg:size-14 -mt-1"
          />
        </div>
        <div className="flex flex-col items-center py-4">
          <div className=" w-56">
            <input
              type="string"
              value={inputs.initialAmount}
              onChange={(e) =>
                handleChangeInput(e.target.value, "initialAmount")
              }
              className="
            appearance-none w-full px-4 py-3 
            bg-primary-foreground text-tertiary 
            rounded-lg shadow-sm
            focus:outline-none focus:ring-2 focus:bg-primary
            font-agrandir font-bold
          "
            />
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-center bg-primary-foreground lg:max-h-8 gap-2">
          <img
            src="/assets/graphicsTable/calendar.png"
            className="hidden lg:block lg:size-14 -mt-1"
          />
          <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center py-1">
            ¿AÑOS?
          </h3>
        </div>
        <div className="flex flex-col items-center py-4">
          <div className=" w-56">
            <input
              type="string"
              value={inputs.years}
              onChange={(e) => handleChangeInput(e.target.value, "years")}
              className="
            appearance-none w-full px-4 py-3 
            bg-primary-foreground text-tertiary 
            rounded-lg shadow-sm
            focus:outline-none focus:ring-2 focus:bg-primary
            font-agrandir font-bold
          "
            />
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-center bg-primary-foreground lg:max-h-8 gap-2 ">
          <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center py-1">
            TASA DE INTERES
          </h3>
          <img
            src="/assets/graphicsTable/percentage.png"
            className="hidden lg:block lg:size-10 -mt-1"
          />
        </div>
        <div className="flex flex-col items-center py-4">
          <div className=" w-56">
            <input
              value={inputs.interest}
              onChange={(e) => handleChangeInput(e.target.value, "interest")}
              className="
            appearance-none w-full px-4 py-3 
            bg-primary-foreground text-tertiary 
            rounded-lg shadow-sm
            focus:outline-none focus:ring-2 focus:bg-primary
            font-agrandir font-bold
          "
            />
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-center bg-primary-foreground lg:max-h-8 gap-2 ">
          <img
            src="/assets/graphicsTable/percentage.png"
            className="hidden lg:block lg:size-10 -mt-1"
          />
          <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center py-1">
            VARIACION DE INTERES
          </h3>
        </div>
        <div className="flex flex-col items-center py-4">
          <div className=" w-56">
            <input
              value={variance + ""}
              onChange={(e) => setVariance(e.target.value)}
              className="
            appearance-none w-full px-4 py-3 
            bg-primary-foreground text-tertiary 
            rounded-lg shadow-sm
            focus:outline-none focus:ring-2 focus:bg-primary
            font-agrandir font-bold
          "
            />
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-center bg-primary-foreground lg:max-h-8 gap-2">
          <img
            src="/assets/graphicsTable/cuota.png"
            className="hidden lg:block lg:size-14 -mt-1"
          />
          <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center">
            ¿CONTRIBUCIONES MENSUALES?
          </h3>
        </div>
        <div className="flex flex-col items-center py-4">
          <div className=" w-56">
            <input
              value={inputs.contributions}
              onChange={(e) =>
                handleChangeInput(e.target.value, "contributions")
              }
              className="
              appearance-none w-full px-4 py-3 
            bg-primary-foreground text-tertiary 
            rounded-lg shadow-sm
            focus:outline-none focus:ring-2 focus:bg-primary
            font-agrandir font-bold
          "
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 w-full justify-center items-center py-8">
          <Button
            className="relative w-48 bg-[#8f0000] hover:bg-[#8f0000]/50 cursor-pointer py-2"
            onClick={() => {
              setInputs({
                initialAmount: "",
                contributions: "",
                interest: "",
                years: 0,
              });
            }}
          >
            <img
              src="/assets/graphicsTable/cancela2.png"
              className="absolute -left-1.5 top-1/2 -translate-y-1/2 size-10"
              alt="Cancelar"
            />
            <span className="block mx-auto text-white">Restablecer</span>
          </Button>
          <Button
            className="relative w-48 bg-[#3e893e] hover:bg-[#3e893e]/50 cursor-pointer"
            onClick={calculate}
          >
            <span className="block mx-auto text-white"> Calcular</span>
            <img
              src="/assets/graphicsTable/calculator.png"
              className="absolute -right-3.5 top-1/2 -translate-y-1/2 size-10"
              alt="Cancelar"
            />
          </Button>
        </div>

        {show ? (
          <>
            <div className="w-full flex flex-col items-center bg-primary-foreground py-1">
              <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center">
                RESULTADOS
              </h3>
            </div>
            <div className="flex flex-col items-center py-6 px-5 lg:px-14 gap-10">
              <p className="text-center">
                En {inputs.years} años tendra $
                {convertNumbertoString(
                  convertStringtoNumber(totales?.finalBalance + "")
                )}{" "}
                , de los cuales invertiste ${" "}
                {convertNumbertoString(
                  convertStringtoNumber(totales?.totalContributed + "")
                )}{" "}
                en total y generara en rendimientos un total de $
                {convertNumbertoString(
                  convertStringtoNumber(totales?.totalInterest + "")
                )}{" "}
              </p>
              <p className="text-center">
                Este gráfico muestra cómo crece tu ahorro con el tiempo 📈 La
                línea verde representa el balance final a lo largo de los meses
                con la tasa orginial, la línea roja representa el balance final
                a lo largo de los meses con la tasa con una varianza hacia
                arriba y la línea amarilla representa el balance final a lo
                largo de los meses con la tasa con una varianza hacia abajo.
                <br /> Como puedes ver, a medida que pasan los años, los
                intereses empiezan a crecer más rápido, haciendo que tu ganancia
                final de ${" "}
                {convertNumbertoString(
                  convertStringtoNumber(totales?.finalBalance + "")
                )}{" "}
                sea mucho mayor que la suma de tus aportes (${" "}
                {convertNumbertoString(
                  convertStringtoNumber(totales?.totalContributed + "")
                )}
                ). Esa es la magia del interés compuesto ✨
              </p>
              <p className="text-center">
                La tabla muestra cómo crece tu inversion con el tiempo. En
                Adiciones aparecen los aportes que haces cada mes, en Interés se
                ve lo que ganas gracias a la rentabilidad, y en Balance el total
                acumulado al final de cada período. Como ves, empezar con $
                {inputs.initialAmount} y aportar cada mes $
                {inputs.contributions}, durante {inputs.years} años, puede
                llevarte a alcanzar un total de ${" "}
                {convertNumbertoString(
                  convertStringtoNumber(totales?.finalBalance + "")
                )}
                , de los cuales ${" "}
                {convertNumbertoString(
                  convertStringtoNumber(totales?.totalInterest + "")
                )}{" "}
                provienen solo de los intereses. ✨
              </p>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="border border-secondary-foreground w-[100px]">
                      Año
                    </TableHead>
                    <TableHead className="border border-secondary-foreground">
                      Adiciones
                    </TableHead>
                    <TableHead className="border border-secondary-foreground">
                      Interes
                    </TableHead>
                    <TableHead className="border border-secondary-foreground text-left">
                      Balance
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataValues.map((item) => (
                    <TableRow key={item.year}>
                      <TableCell className="font-medium border border-secondary-foreground">
                        {item.month}
                      </TableCell>
                      <TableCell className="border border-secondary-foreground">
                        {formatCOP(item.contribution)}
                      </TableCell>
                      <TableCell className="border border-secondary-foreground">
                        {formatCOP(item.interest)}
                      </TableCell>
                      <TableCell className=" border border-secondary-foreground text-left">
                        {formatCOP(item.finalBalance)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell
                      colSpan={1}
                      className="border border-secondary-foreground"
                    >
                      Total
                    </TableCell>
                    <TableCell className="border border-secondary-foreground text-left">
                      {formatCOP(Number(totales?.totalContributed))}
                    </TableCell>
                    <TableCell className="border border-secondary-foreground text-left">
                      {formatCOP(Number(totales?.totalInterest))}
                    </TableCell>
                    <TableCell className="border border-secondary-foreground text-left">
                      {formatCOP(Number(totales?.finalBalance))}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
              <div className="bg-white w-full min-h-[300px] md:min-h-[600px] h-full">
                <Line data={chartData} options={options} />
              </div>
              <CalculatorResultCta calculatorId="inversion" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center py-6 px-5 lg:px-14 gap-10"></div>
        )}
      </div>
    </div>
  );
};

export default ClientPage;
