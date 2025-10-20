"use client";

// import { ChevronDown } from "lucide-react";
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
  convertNumbertoString,
  convertStringtoNumber,
  formatCOP,
  simularCreditoVivienda,
  validarNumero,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Cuota, TotalesVivienda } from "@/lib/interface";
import Link from "next/link";
import Tag from "@/components/CommonComponents/Tag";

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
  const [totales, setTotales] = useState<TotalesVivienda>();
  const [dataValues, setDataValues] = useState<Cuota[]>([
    {
      abonoCapital: 0,
      cuota: 0,
      interes: 0,
      mes: 0,
      saldo: 0,
      seguro: 0,
      gastos: 0,
    },
  ]);

  const [chartData, setChartData] = useState({
    labels: dataValues.map((d) => d.cuota),
    datasets: [
      {
        label: "Cuota",
        data: dataValues.map((d) => d.cuota),
        borderColor: "green",
        tension: 0.2,
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
      labels: dataValues.filter((_, i) => i % 4 === 0).map((d) => d.mes),
      datasets: [
        {
          label: "Saldo Restante",
          data: dataValues.filter((_, i) => i % 4 === 0).map((d) => d.saldo),
          borderColor: "green",
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: "green",
          pointStyle: "triangle",
          fill: false,
        },
        {
          label: "intereses Pagados",
          data: dataValues.filter((_, i) => i % 4 === 0).map((d) => d.interes),
          borderColor: "yellow",
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: "yellow",
          pointStyle: "triangle",
          fill: false,
        },
        {
          label: "Abono a Capital",
          data: dataValues
            .filter((_, i) => i % 4 === 0)
            .map((d) => d.abonoCapital),
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
    housingValue: "",
    downPaymentPercentage: "",
    interest: "",
    yearsTearms: "",
    monthlyInsurance: "",
    fixedCosts: "",
  });

  function handleChangeInput(value: string, key: string) {
    if (!validarNumero(value)) return;

    const newValue = convertStringtoNumber(value);
    console.log(newValue);
    setInputs({ ...inputs, [key]: convertNumbertoString(newValue) });
  }

  const calculate = () => {
    setShow(true);
    const result = simularCreditoVivienda({
      cuotaInicialPorcentaje: Number(
        convertStringtoNumber(inputs.downPaymentPercentage)
      ),
      plazoAnios: Number(convertStringtoNumber(inputs.yearsTearms)),
      tasaInteresAnual: Number(convertStringtoNumber(inputs.interest)),
      valorVivienda: Number(convertStringtoNumber(inputs.housingValue)),
      gastosFijos: Number(convertStringtoNumber(inputs.fixedCosts)),
      seguroMensual: Number(convertStringtoNumber(inputs.monthlyInsurance)),
    });
    console.log("Resultado : ", result);
    setDataValues(result.tabla);
    setTotales({
      cuotaMensual: result.cuotaMensual,
      montoPrestamo: result.montoPrestamo,
      totalGastos: result.totalGastos,
      totalIntereses: result.totalIntereses,
      totalPagado: result.totalPagado,
      totalSeguros: result.totalSeguros,
    });
  };

  return (
    <div className="container mx-auto flex flex-col gap-16">
      <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
        Simulador de Leasing y Vivienda
      </h1>
      <div className="flex ">
        <Link href="/calculadoras">
          <Tag title="CALCULADORAS" />
        </Link>
      </div>
      <p className="text-left font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
        ¿Estás pensando en adquirir tu vivienda o conocer cuánto pagarías en un
        crédito habitacional? Con nuestro Simulador de Leasing y Vivienda puedes
        estimar de forma sencilla el valor de tus cuotas mensuales, los
        intereses a pagar y la evolución de tu crédito mes a mes.
      </p>
      <p className="text-left font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl -mt-8">
        Solo necesitas ingresar algunos datos básicos como el valor del
        inmueble, la cuota inicial, la tasa de interés y el plazo del crédito, y
        el simulador te mostrará:
        <br />
        <br />
        <ul className="list-disc list-inside">
          <li className="ml-6">
            📋 Una tabla detallada con la amortización mes a mes, mostrando
            cuánto pagas en intereses, cuánto abonas a capital y cómo disminuye
            tu saldo a lo largo del tiempo.
          </li>
          <li className="ml-6">
            📈 Una gráfica interactiva que te permitirá visualizar la evolución
            del crédito, comparando el pago de capital frente al pago de
            intereses.
          </li>
          <li className="ml-6">
            💬 Una explicación clara y personalizada de los resultados,
            incluyendo el total de intereses pagados, el monto final
            desembolsado y la cuota mensual estimada.
          </li>
        </ul>
        <br />
        Este simulador está diseñado para ayudarte a comprender cómo funcionan
        los créditos hipotecarios y de leasing habitacional, facilitando la
        planeación de tu compra de vivienda y permitiéndote tomar decisiones
        financieras más informadas y seguras.
      </p>

      <div className="w-full rounded-2xl bg-primary-background/50">
        <div className="w-full flex flex-row items-center justify-center bg-primary-foreground rounded-t-2xl lg:max-h-8 gap-2">
          <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary py-1">
            ¿VALOR DE LA VIVIENDA?
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
              value={inputs.housingValue}
              onChange={(e) =>
                handleChangeInput(e.target.value, "housingValue")
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
            src="/assets/graphicsTable/percentage.png"
            className="hidden lg:block lg:size-10 -mt-1"
          />
          <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center py-1">
            ¿CUOTA INICIAL EN PORCENTAJE?
          </h3>
        </div>
        <div className="flex flex-col items-center py-4">
          <div className=" w-56">
            <input
              type="string"
              value={inputs.downPaymentPercentage}
              onChange={(e) =>
                handleChangeInput(e.target.value, "downPaymentPercentage")
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
            src="/assets/graphicsTable/calendar.png"
            className="hidden lg:block lg:size-14 -mt-1"
          />
          <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center">
            PLAZO EN AÑOS
          </h3>
        </div>
        <div className="flex flex-col items-center py-4">
          <div className=" w-56">
            <input
              value={inputs.yearsTearms}
              onChange={(e) => handleChangeInput(e.target.value, "yearsTearms")}
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
            SEGURO MENSUAL (OPCIONAL)
          </h3>
        </div>
        <div className="flex flex-col items-center py-4">
          <div className=" w-56">
            <input
              value={inputs.monthlyInsurance}
              onChange={(e) =>
                handleChangeInput(e.target.value, "monthlyInsurance")
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
          <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center">
            COSTOS FIJOS (OPCIONAL)
          </h3>
          <img
            src="/assets/graphicsTable/cuota.png"
            className="hidden lg:block lg:size-14 -mt-1"
          />
        </div>
        <div className="flex flex-col items-center py-4">
          <div className=" w-56">
            <input
              value={inputs.fixedCosts}
              onChange={(e) => handleChangeInput(e.target.value, "fixedCosts")}
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
                housingValue: "",
                downPaymentPercentage: "",
                interest: "",
                yearsTearms: "",
                monthlyInsurance: "",
                fixedCosts: "",
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
                En {inputs.yearsTearms} años pagaras $
                {convertNumbertoString(
                  convertStringtoNumber(totales?.totalPagado + "")
                )}{" "}
                , de los cuales ${" "}
                {convertNumbertoString(
                  convertStringtoNumber(totales?.montoPrestamo + "")
                )}{" "}
                son de capital y $
                {convertNumbertoString(
                  convertStringtoNumber(totales?.totalIntereses + "")
                )}{" "}
                de intereses.
              </p>
              <p className="text-center">
                Este gráfico muestra cómo evoluciona tu crédito de vivienda a lo
                largo del tiempo 🏠 La línea verde representa el saldo restante
                de tu préstamo, que va disminuyendo mes a mes a medida que pagas
                tus cuotas. La línea amarilla muestra los intereses pagados en
                cada cuota, los cuales son más altos al inicio y se reducen
                gradualmente conforme el capital pendiente disminuye. Por
                último, la línea roja representa el abono a capital, que empieza
                siendo menor y va aumentando progresivamente con el paso de los
                meses.
              </p>
              <p className="text-center">
                Como puedes ver, en las primeras cuotas gran parte del pago se
                destina a intereses, pero con el tiempo el abono a capital se
                vuelve más significativo, acelerando la reducción del saldo del
                crédito. Este comportamiento refleja cómo funciona la
                amortización de un crédito hipotecario o leasing habitacional,
                ayudándote a visualizar de manera clara cómo tus pagos van
                construyendo patrimonio mes a mes.
              </p>
              <p className="text-center">
                La tabla muestra el detalle mes a mes de cómo se comporta tu
                crédito de vivienda o leasing habitacional. En Abono a Capital
                se refleja la parte de tu pago que realmente reduce la deuda
                total, mientras que en Interés puedes ver cuánto pagas al banco
                por el dinero prestado. Las columnas de Gastos y Seguro incluyen
                los valores adicionales asociados al crédito, como los costos
                administrativos y el seguro de vida o deudor. Finalmente, la
                columna de Saldo muestra cuánto te queda por pagar después de
                cada cuota mensual. Como puedes observar, al inicio del crédito
                la mayor parte de tu pago se destina a intereses, pero con el
                paso de los meses el abono a capital aumenta y el saldo
                pendiente disminuye más rápido. Esta tabla te permite entender
                con claridad cómo se distribuye cada cuota y cómo evoluciona tu
                deuda a lo largo del tiempo, ayudándote a planificar mejor tu
                presupuesto y tus decisiones financieras. 💰🏠
              </p>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="border border-secondary-foreground w-[100px]">
                      Mes
                    </TableHead>
                    <TableHead className="border border-secondary-foreground">
                      Abono a Capital
                    </TableHead>
                    <TableHead className="border border-secondary-foreground">
                      Interes
                    </TableHead>
                    <TableHead className="border border-secondary-foreground">
                      Gastos
                    </TableHead>
                    <TableHead className="border border-secondary-foreground">
                      Seguro
                    </TableHead>
                    <TableHead className="border border-secondary-foreground">
                      Cuota
                    </TableHead>
                    <TableHead className="border border-secondary-foreground text-left">
                      Saldo
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataValues.map((item) => (
                    <TableRow key={item.mes}>
                      <TableCell className="font-medium border border-secondary-foreground">
                        {item.mes}
                      </TableCell>
                      <TableCell className="border border-secondary-foreground text-right">
                        {formatCOP(item.abonoCapital)}
                      </TableCell>
                      <TableCell className="border border-secondary-foreground text-right">
                        {formatCOP(item.interes)}
                      </TableCell>
                      <TableCell className="border border-secondary-foreground text-right">
                        {formatCOP(item.gastos ?? 0)}
                      </TableCell>
                      <TableCell className="border border-secondary-foreground text-right">
                        {formatCOP(item.seguro ?? 0)}
                      </TableCell>
                      <TableCell className="border border-secondary-foreground text-right">
                        {formatCOP(item.cuota ?? 0)}
                      </TableCell>
                      <TableCell className=" border border-secondary-foreground text-right">
                        {formatCOP(item.saldo)}
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
                    <TableCell className="border border-secondary-foreground text-right">
                      {formatCOP(Number(totales?.montoPrestamo ?? 0))}
                    </TableCell>
                    <TableCell className="border border-secondary-foreground text-right">
                      {formatCOP(Number(totales?.totalIntereses ?? 0))}
                    </TableCell>
                    <TableCell className="border border-secondary-foreground text-right">
                      {formatCOP(Number(totales?.totalGastos ?? 0))}
                    </TableCell>
                    <TableCell className="border border-secondary-foreground text-right">
                      {formatCOP(Number(totales?.totalSeguros ?? 0))}
                    </TableCell>
                    <TableCell className="border border-secondary-foreground text-right">
                      {formatCOP(Number(totales?.totalPagado ?? 0))}
                    </TableCell>
                    <TableCell className="border border-secondary-foreground text-right">
                      {formatCOP(0)}
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
