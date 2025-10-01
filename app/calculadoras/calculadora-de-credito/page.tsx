import React from "react";
import Clientpage from "./ClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Crédito — Simulador de cuotas, intereses y seguro",
  description:
    "Simula tu crédito fácil y rápido. Calcula cuotas, intereses, seguros y saldo pendiente de préstamos o compras con tarjeta de crédito.",
  applicationName: "MiCalculadoraDeCredito",
  authors: [{ name: "TuNombre o El Nombre del Sitio" }],
  openGraph: {
    title: "Calculadora de Crédito — Simulador de cuotas, intereses y seguro",
    description:
      "Calculadora de crédito online para simular préstamos y compras con tarjeta. Ingresa monto, plazo, tasa y seguro para ver cuotas e intereses.",
    url: "https://tusitio.com/calculadoras/calculadora-de-credito",
    siteName: "TuSitio",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Crédito — Simulador de cuotas",
    description:
      "Simula cuotas, intereses y saldo pendiente para préstamos o compras con tarjeta.",
    images: ["https://tusitio.com/og-images/calculadora-credito.png"],
    creator: "@tu_handle",
  },
};

const page = () => {
  return <Clientpage />;
};

export default page;

// import { ChevronDown } from "lucide-react";
// import React, { useEffect, useState } from "react";

// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartOptions,
// } from "chart.js";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   calcularAmortizacionFrancesa,
//   convertNumbertoString,
//   convertStringtoNumber,
//   formatCOP,
//   generarPlanPagos,
//   validarNumero,
// } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Payment, Totales } from "@/lib/interface";
// import { Metadata } from "next";

// // export const metadata: Metadata = {
// //   title: "Calculadora de Crédito — Simulador de cuotas, intereses y seguro",
// //   description:
// //     "Simula tu crédito fácil y rápido. Calcula cuotas, intereses, seguros y saldo pendiente de préstamos o compras con tarjeta de crédito.",
// //   applicationName: "MiCalculadoraDeCredito",
// //   authors: [{ name: "TuNombre o El Nombre del Sitio" }],
// //   openGraph: {
// //     title: "Calculadora de Crédito — Simulador de cuotas, intereses y seguro",
// //     description:
// //       "Calculadora de crédito online para simular préstamos y compras con tarjeta. Ingresa monto, plazo, tasa y seguro para ver cuotas e intereses.",
// //     url: "https://tusitio.com/calculadoras/calculadora-de-credito",
// //     siteName: "TuSitio",
// //     locale: "es_CO",
// //     type: "website",
// //   },
// //   twitter: {
// //     card: "summary_large_image",
// //     title: "Calculadora de Crédito — Simulador de cuotas",
// //     description:
// //       "Simula cuotas, intereses y saldo pendiente para préstamos o compras con tarjeta.",
// //     images: ["https://tusitio.com/og-images/calculadora-credito.png"],
// //     creator: "@tu_handle",
// //   },
// // };

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const page = () => {
//   const [boolean, setboolean] = useState(false);
//   const [show, setShow] = useState(false);
//   const [totales, setTotales] = useState<Totales>();
//   const [dataValues, setDataValues] = useState<Payment[]>([
//     {
//       cuota: 1,
//       cuotaCapital: 100,
//       interesMensual: 1200000,
//       saldoPendiente: 1200000,
//       seguro: 100000,
//       cuotaTotal: 1200000,
//     },
//   ]);

//   const [chartData, setChartData] = useState({
//     labels: dataValues.map((d) => d.cuota),
//     datasets: [
//       {
//         label: "Interes",
//         data: dataValues.map((d) => d.cuotaCapital),
//         borderColor: "green",
//         tension: 0.4,
//         pointRadius: 6,
//         pointBackgroundColor: "green",
//         pointStyle: "triangle",
//         fill: false,
//       },
//     ],
//   });

//   const options: ChartOptions<"line"> = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//       title: {
//         display: true,
//         text: "Interes por cuota",
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             const value = context.raw as number;
//             return new Intl.NumberFormat("es-CO", {
//               style: "currency",
//               currency: "COP",
//               maximumFractionDigits: 0,
//             }).format(value);
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         ticks: {
//           callback: function (value) {
//             return new Intl.NumberFormat("es-CO", {
//               style: "currency",
//               currency: "COP",
//               maximumFractionDigits: 0,
//             }).format(Number(value));
//           },
//         },
//       },
//     },
//   };

//   useEffect(() => {
//     setChartData({
//       labels: dataValues.map((d) => d.cuota),
//       datasets: [
//         {
//           label: "Interes",
//           data: dataValues.map((d) => d.interesMensual),
//           borderColor: "green",
//           tension: 0.4,
//           pointRadius: 6,
//           pointBackgroundColor: "green",
//           pointStyle: "triangle",
//           fill: false,
//         },
//       ],
//     });
//   }, [dataValues]);

//   const [inputs, setInputs] = useState({
//     amountRequested: "",
//     months: 0,
//     interest: "",
//     insurance: "",
//   });

//   function handleChangeInput(value: string, key: string) {
//     if (!validarNumero(value)) return;
//     const newValue = convertStringtoNumber(value);
//     setInputs({ ...inputs, [key]: convertNumbertoString(newValue) });
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setInputs({ ...inputs, months: Number(e.target.value) });
//   };

//   const calculate = () => {
//     setShow(true);
//     if (boolean) {
//       const plan = calcularAmortizacionFrancesa(
//         Number(convertStringtoNumber(inputs.amountRequested)),
//         Number(convertStringtoNumber(inputs.interest)) / 100,
//         Number(inputs.months),
//         Number(convertStringtoNumber(inputs.insurance))
//       );
//       console.log("plan", plan);
//       setDataValues(plan.tabla);
//       setTotales(plan.total);
//     } else {
//       const plan = generarPlanPagos(
//         Number(convertStringtoNumber(inputs.amountRequested)),
//         Number(convertStringtoNumber(inputs.interest)) / 100,
//         Number(inputs.months),
//         Number(convertStringtoNumber(inputs.insurance))
//       );
//       console.log("plan", plan);
//       setDataValues(plan.tabla);
//       setTotales(plan.total);
//     }
//   };

//   return (
//     <div className="container mx-auto flex flex-col gap-16">
//       <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
//         Calculadora de Credito
//       </h1>
//       <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
//         Nuestra calculadora de crédito online te ayuda a simular fácilmente cómo
//         quedarán tus cuotas al solicitar un préstamo o diferir una compra con tu
//         tarjeta de crédito. Solo debes ingresar el monto solicitado, el plazo en
//         meses, la tasa de interés efectiva anual (TEA), el valor del seguro y
//         elegir si deseas una cuota fija. Con esta información, la calculadora
//         genera una tabla detallada de pagos mensuales, que incluye abono a
//         capital, intereses, seguro, cuota total y saldo pendiente.
//       </p>
//       <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl -mt-8">
//         Además, podrás ver un gráfico interactivo que muestra cómo disminuyen
//         los intereses a lo largo del tiempo, para que tomes decisiones
//         financieras con mayor claridad. Ya sea que estés evaluando un crédito de
//         libre inversión, un préstamo personal o una compra con tarjeta de
//         crédito, esta herramienta te permitirá comparar escenarios y planificar
//         tus finanzas con precisión.
//       </p>
//       {/* <GraphicsTable /> */}
//       <div className="w-full rounded-2xl bg-primary-background/50">
//         <div className="w-full flex flex-row items-center justify-center bg-primary-foreground rounded-t-2xl lg:max-h-8 gap-2">
//           <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary py-1">
//             ¿CUANTO QUIERES SOLICITAR?
//           </h3>
//           <img
//             src="/assets/graphicsTable/lending.png"
//             className="hidden lg:block lg:size-14 -mt-1"
//           />
//         </div>
//         <div className="flex flex-col items-center py-4">
//           <div className=" w-56">
//             <input
//               type="string"
//               value={inputs.amountRequested}
//               onChange={(e) =>
//                 handleChangeInput(e.target.value, "amountRequested")
//               }
//               className="
//           appearance-none w-full px-4 py-3
//           bg-primary-foreground text-tertiary
//           rounded-lg shadow-sm
//           focus:outline-none focus:ring-2 focus:bg-primary
//           font-agrandir font-bold
//         "
//             />
//           </div>
//         </div>
//         <div className="w-full flex flex-row items-center justify-center bg-primary-foreground lg:max-h-8 gap-2">
//           <img
//             src="/assets/graphicsTable/calendar.png"
//             className="hidden lg:block lg:size-14 -mt-1"
//           />

//           <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center py-1">
//             ¿A QUE PLAZO? (MESES)
//           </h3>
//         </div>
//         <div className="flex flex-col md:flex-row justify-center items-center py-4 gap-5">
//           <div className="relative w-56">
//             <select
//               className="
//           appearance-none w-full px-4 py-3
//           bg-primary-foreground text-tertiary
//           rounded-lg shadow-sm
//           focus:outline-none focus:ring-2 focus:bg-primary
//           cursor-pointer font-agrandir font-bold
//         "
//               onChange={handleChange}
//               value={inputs.months}
//             >
//               <option value="">Selecciona una opción</option>
//               {Array.from({ length: 71 }, (_, i) => i + 2).map((ele, i) => (
//                 <option value={ele} key={ele}>
//                   {ele} meses
//                 </option>
//               ))}
//             </select>

//             {/* Icono flecha */}
//             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-tertiary size-7" />
//           </div>
//         </div>
//         <div className="w-full flex flex-row items-center justify-center bg-primary-foreground lg:max-h-8 gap-2 ">
//           <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center py-1">
//             TASA DE INTERES EFECTIVA ANUAL
//           </h3>
//           <img
//             src="/assets/graphicsTable/percentage.png"
//             className="hidden lg:block lg:size-14 -mt-1"
//           />
//         </div>
//         <div className="flex flex-col items-center py-4">
//           <div className=" w-56">
//             <input
//               value={inputs.interest}
//               onChange={(e) => handleChangeInput(e.target.value, "interest")}
//               className="
//           appearance-none w-full px-4 py-3
//           bg-primary-foreground text-tertiary
//           rounded-lg shadow-sm
//           focus:outline-none focus:ring-2 focus:bg-primary
//           font-agrandir font-bold
//         "
//             />
//           </div>
//         </div>
//         <div className="w-full flex flex-col items-center bg-primary-foreground py-1">
//           <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center">
//             ¿INCLUYE SEGURO?
//           </h3>
//         </div>
//         <div className="flex flex-col items-center py-4">
//           <div className=" w-56">
//             <input
//               value={inputs.insurance}
//               onChange={(e) => handleChangeInput(e.target.value, "insurance")}
//               className="
//             appearance-none w-full px-4 py-3
//           bg-primary-foreground text-tertiary
//           rounded-lg shadow-sm
//           focus:outline-none focus:ring-2 focus:bg-primary
//           font-agrandir font-bold
//         "
//             />
//           </div>
//         </div>
//         <div className="w-full flex flex-col items-center bg-primary-foreground py-1">
//           <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center">
//             ¿CUOTA FIJA?
//           </h3>
//         </div>
//         <div className="flex flex-col items-center py-4">
//           <div className="w-56 flex justify-center">
//             <button
//               type="button"
//               onClick={() => setboolean(!boolean)}
//               className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors cursor-pointer ${
//                 boolean ? "bg-primary-foreground" : "bg-gray-300"
//               }`}
//             >
//               <span
//                 className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
//                   boolean ? "translate-x-7" : "translate-x-1"
//                 }`}
//               />
//             </button>
//           </div>
//           <span className="mt-2 font-agrandir font-bold text-tertiary">
//             {boolean ? "Sí" : "No"}
//           </span>

//           <div className="flex flex-row gap-10 w-full justify-center items-center py-8">
//             <Button
//               className="relative w-48 bg-[#8f0000] hover:bg-[#8f0000]/50 cursor-pointer py-2"
//               onClick={() => {
//                 setInputs({
//                   amountRequested: "",
//                   insurance: "",
//                   interest: "",
//                   months: 0,
//                 });
//                 setboolean(false);
//               }}
//             >
//               <img
//                 src="/assets/graphicsTable/cancela2.png"
//                 className="absolute -left-1.5 top-1/2 -translate-y-1/2 size-10"
//                 alt="Cancelar"
//               />
//               <span className="block mx-auto text-white">Restablecer</span>
//             </Button>
//             <Button
//               className="relative w-48 bg-[#3e893e] hover:bg-[#3e893e]/50 cursor-pointer"
//               onClick={calculate}
//             >
//               <span className="block mx-auto text-white"> Calcular</span>
//               <img
//                 src="/assets/graphicsTable/calculator.png"
//                 className="absolute -right-3.5 top-1/2 -translate-y-1/2 size-10"
//                 alt="Cancelar"
//               />
//             </Button>
//           </div>
//         </div>

//         {show ? (
//           <>
//             <div className="w-full flex flex-col items-center bg-primary-foreground py-1">
//               <h3 className="text-sm lg:text-lg font-agrandir font-bold text-tertiary text-center">
//                 RESULTADOS
//               </h3>
//             </div>
//             <div className="flex flex-col items-center py-6 px-5 lg:px-14 gap-10">
//               <p>
//                 {" "}
//                 En {inputs.months} meses, pagara $
//                 {convertNumbertoString(
//                   convertStringtoNumber(totales?.totalinteresMensual + "")
//                 )}{" "}
//                 en intereses
//               </p>
//               <p className="text-center">
//                 {
//                   " La tabla a continuación ofrece una proyección de los pagos que hara mensuales segun su tasa de interes de su credito a lo largo del tiempo, basada en la tasa de interés y el tipo de pago que eligió. \n Tenga en cuenta que incluso cambios mínimos en estas variables pueden modificar el resultado. Puede reiniciar la calculadora e ingresar nuevos valores para explorar distintos escenarios."
//                 }
//               </p>

//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="border border-secondary-foreground w-[100px]">
//                       Cuota
//                     </TableHead>
//                     <TableHead className="border border-secondary-foreground">
//                       Abono a Capital
//                     </TableHead>
//                     <TableHead className="border border-secondary-foreground">
//                       Interes M.
//                     </TableHead>
//                     <TableHead className="border border-secondary-foreground">
//                       Seguro
//                     </TableHead>
//                     <TableHead className="border border-secondary-foreground">
//                       Cuota total
//                     </TableHead>
//                     <TableHead className="border border-secondary-foreground text-left">
//                       Pendiente
//                     </TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {dataValues.map((item) => (
//                     <TableRow key={item.cuota}>
//                       <TableCell className="font-medium border border-secondary-foreground">
//                         {item.cuota}
//                       </TableCell>
//                       <TableCell className="border border-secondary-foreground">
//                         {formatCOP(item.cuotaCapital)}
//                       </TableCell>
//                       <TableCell className="border border-secondary-foreground">
//                         {formatCOP(item.interesMensual)}
//                       </TableCell>
//                       <TableCell className="border border-secondary-foreground">
//                         {formatCOP(item.seguro)}
//                       </TableCell>
//                       <TableCell className="border border-secondary-foreground">
//                         {formatCOP(item.cuotaTotal)}
//                       </TableCell>
//                       <TableCell className=" border border-secondary-foreground text-left">
//                         {formatCOP(item.saldoPendiente)}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//                 <TableFooter>
//                   <TableRow>
//                     <TableCell
//                       colSpan={1}
//                       className="border border-secondary-foreground"
//                     >
//                       Total
//                     </TableCell>
//                     <TableCell className="border border-secondary-foreground text-left"></TableCell>
//                     <TableCell className="border border-secondary-foreground text-left"></TableCell>
//                     <TableCell className="border border-secondary-foreground text-left"></TableCell>
//                     <TableCell className="border border-secondary-foreground text-left"></TableCell>
//                   </TableRow>
//                 </TableFooter>
//               </Table>
//               <div className="bg-white w-full min-h-[300px] md:min-h-[600px] h-full">
//                 <Line data={chartData} options={options} />
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="flex flex-col items-center py-6 px-5 lg:px-14 gap-10"></div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default page;
