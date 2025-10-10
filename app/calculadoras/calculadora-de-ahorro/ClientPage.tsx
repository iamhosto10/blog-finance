"use client";

import { ChevronDown } from "lucide-react";
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
  calcSavingsSchedule,
  calcularAmortizacionFrancesa,
  convertNumbertoString,
  convertStringtoNumber,
  formatCOP,
  generarPlanPagos,
  validarNumero,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CalcResultTotales,
  Compounding,
  Frequency,
  Payment,
  Totales,
  YearRow,
} from "@/lib/interface";

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
  const [totales, setTotales] = useState<CalcResultTotales>();
  const [dataValues, setDataValues] = useState<YearRow[]>([
    {
      additions: 0,
      balanceEnd: 0,
      interest: 0,
      year: 0,
    },
  ]);

  const [chartData, setChartData] = useState({
    labels: dataValues.map((d) => d.year),
    datasets: [
      {
        label: "Interes",
        data: dataValues.map((d) => d.balanceEnd),
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
        text: "",
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

  useEffect(() => {
    setChartData({
      labels: dataValues.map((d) => d.year),
      datasets: [
        {
          label: "Adiciones Periodicas",
          data: dataValues.map((d) => d.additions),
          borderColor: "green",
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: "green",
          pointStyle: "triangle",
          fill: false,
        },
        {
          label: "Balance Final",
          data: dataValues.map((d) => d.balanceEnd),
          borderColor: "yellow",
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: "yellow",
          pointStyle: "triangle",
          fill: false,
        },
        {
          label: "Rendimientos Generados",
          data: dataValues.map((d) => d.interest),
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

  const [inputs, setInputs] = useState({
    initialAmount: "",
    years: 0,
    interest: "",
    contributions: "",
    frecuency: "weekly",
    compounding: "monthly",
  });

  function handleChangeInput(value: string, key: string) {
    if (!validarNumero(value)) return;

    const newValue = convertStringtoNumber(value);
    console.log(newValue);
    setInputs({ ...inputs, [key]: convertNumbertoString(newValue) });
  }

  const handleChangeFrecuency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputs({ ...inputs, frecuency: e.target.value });
  };

  const handleChangeCompounding = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputs({ ...inputs, frecuency: e.target.value });
  };
  const calculate = () => {
    setShow(true);
    const result = calcSavingsSchedule({
      initialAmount: Number(convertStringtoNumber(inputs.initialAmount)),
      years: inputs.years,
      annualRatePct: Number(convertStringtoNumber(inputs.interest)),
      additionalContribution: Number(
        convertStringtoNumber(inputs.contributions)
      ),
      contributionFrequency: inputs.frecuency as Frequency,
      compounding: inputs.compounding as Compounding,
      timing: "end",
    });
    const totales: CalcResultTotales = {
      totalContributed: result.totalContributed,
      totalInterest: result.totalInterest,
      finalBalance: result.finalBalance,
    };
    setDataValues(result.rows);
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
        Calculadora de Ahorros
      </h1>
      <p className="text-left font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
        La Calculadora de Ahorro es una herramienta que te permite proyectar
        cuánto podrías acumular en el futuro al combinar un monto inicial,
        aportes periódicos y una tasa de rendimiento. Utiliza el poder del
        interés compuesto, es decir, los intereses que generan nuevos intereses
        con el paso del tiempo.
      </p>
      <p className="text-left font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl -mt-8">
        👉 Para realizar el cálculo, se tienen en cuenta:
        <br />
        <br />
        <ul className="list-disc list-inside">
          <li className="ml-6">
            💰 Cantidad inicial: el ahorro con el que comienzas.
          </li>
          <li className="ml-6">
            📅 Plazo en años: el tiempo durante el cual mantendrás el ahorro.
          </li>
          <li className="ml-6">
            📈 Tasa de rendimiento anual: el porcentaje de crecimiento que
            obtendrías cada año, con capitalización periódica (mensual, diaria,
            etc.).
          </li>
          <li className="ml-6">
            ➕ Aportes adicionales: el dinero que agregarás con cierta
            frecuencia (por ejemplo, semanal o mensual).
          </li>
          <li className="ml-6">
            ⏱️ Frecuencia de los aportes y el tipo de interés compuesto.
          </li>
        </ul>
        <br />
        El sistema distribuye tus aportes según la frecuencia seleccionada y
        aplica la tasa de rendimiento en cada periodo, mostrando una tabla año a
        año con el total aportado, los intereses generados y el balance
        acumulado.
      </p>

      <p className="text-left font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl -mt-8">
        Usar esta calculadora te ayuda a visualizar cómo crece tu dinero,
        planificar metas financieras a largo plazo y ajustar tus aportes para
        alcanzar objetivos concretos. Es una forma sencilla de entender el
        impacto real del ahorro constante y el interés compuesto en tus finanzas
        personales.
      </p>
      <div className="w-full rounded-2xl bg-primary-background/50">
        <div className="w-full flex flex-row items-center justify-center bg-primary-foreground rounded-t-2xl lg:max-h-8 gap-2">
          <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary py-1">
            ¿CANTIDAD INCIAL?
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
        <div className="w-full flex flex-row items-center justify-center bg-primary-foreground lg:max-h-8 gap-2">
          <img
            src="/assets/graphicsTable/cuota.png"
            className="hidden lg:block lg:size-14 -mt-1"
          />
          <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center">
            ¿CONTRIBUCIONES SEGUN FRECUENCIA?
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
        <div className="w-full flex flex-row items-center justify-center bg-primary-foreground lg:max-h-8 gap-2">
          <img
            src="/assets/graphicsTable/calendar.png"
            className="hidden lg:block lg:size-14 -mt-1"
          />
          <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center py-1">
            FRECUENCIA
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
          cursor-pointer font-agrandir font-bold
        "
              onChange={handleChangeFrecuency}
              value={inputs.frecuency}
            >
              <option value="weekly">Semanal</option>
              <option value="biweekly">Bisemanal</option>
              <option value="monthly">Mensual</option>
              <option value="quarterly">Trimestral</option>
              <option value="annually">Anual</option>
            </select>

            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-tertiary size-7" />
          </div>
        </div>

        <div className="w-full flex flex-row items-center justify-center bg-primary-foreground lg:max-h-8 gap-2">
          <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center">
            INTERÉS COMPUESTO
          </h3>
          <img
            src="/assets/graphicsTable/stonks.png"
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
          cursor-pointer font-agrandir font-bold
        "
              onChange={handleChangeCompounding}
              value={inputs.compounding}
            >
              <option value="weekly">Compuesto Diariamente</option>
              <option value="biweekly">Compuesto Quincenal</option>
              <option value="monthly">Compuesto Mensual</option>
              <option value="quarterly">Compuesto Trimestral</option>
              <option value="annually">Compuesto Anual</option>
            </select>

            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-tertiary size-7" />
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
                frecuency: "weekly",
                compounding: "monthly",
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
                En {inputs.years} años ahorrara $
                {convertNumbertoString(
                  convertStringtoNumber(totales?.finalBalance + "")
                )}{" "}
                , de los cuales invertira ${" "}
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
                línea verde representa tus aportes periódicos, la línea roja los
                rendimientos generados y la línea amarilla el balance total
                acumulado.
                <br /> Como puedes ver, a medida que pasan los años, los
                intereses empiezan a crecer más rápido, haciendo que tu ahorro
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
                La tabla muestra cómo crece tu ahorro con el tiempo. En
                Adiciones aparecen los aportes que haces cada año, en Interés se
                ve lo que ganas gracias a la rentabilidad, y en Balance el total
                acumulado al final de cada período. Como ves, empezar con $
                {inputs.initialAmount} y aportar cada{" "}
                {translator(inputs.frecuency)} ${inputs.contributions}, durante{" "}
                {inputs.years} años, puede llevarte a alcanzar un total de ${" "}
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
                        {item.year}
                      </TableCell>
                      <TableCell className="border border-secondary-foreground">
                        {formatCOP(item.additions)}
                      </TableCell>
                      <TableCell className="border border-secondary-foreground">
                        {formatCOP(item.interest)}
                      </TableCell>
                      <TableCell className=" border border-secondary-foreground text-left">
                        {formatCOP(item.balanceEnd)}
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
