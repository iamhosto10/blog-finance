import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator } from "@/components/4x1000/Calculator";
import { InfoSection } from "@/components/CommonComponents/InfoSection/InfoSection";
import { FAQ } from "@/components/CommonComponents/FAQ/FAQ";
import Tag from "@/components/CommonComponents/Tag";
import Link from "next/link";
import AdBanner from "@/components/CommonComponents/Adsense/AdBanner";

export const metadata: Metadata = {
  title: "Calculadora 4x1000 en Colombia | Monopolombiano",
  description:
    "Calcula fácilmente cuánto pagarás por el impuesto 4x1000 en Colombia. Descubre qué es, cómo funciona, quiénes están exentos y cómo afecta tus transacciones bancarias. Usa nuestra herramienta gratuita para planificar mejor tus finanzas personales.",
  keywords: [
    "calculadora 4x1000",
    "impuesto 4x1000",
    "gravamen financiero",
    "cuánto se paga por el 4x1000",
    "4x1000 Colombia",
    "calculadora GMF",
    "cuentas exentas 4x1000",
    "impuesto a las transacciones financieras",
    "finanzas personales",
    "bancos en Colombia",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Calculadora 4x1000 en Colombia",
    description:
      "Descubre cuánto pagas por el impuesto 4x1000 (GMF) en tus transacciones bancarias. Calcula el valor exacto y conoce quiénes están exentos.",
    url: "https://monopolombiano.com/calculadoras/4x1000",
    siteName: "Monopolombiano",
    images: [
      {
        url: "https://monopolombiano.com/og-image.jpg",
        width: 600,
        height: 600,
        alt: "Calculadora del 4x1000 en Colombia",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora 4x1000 en Colombia",
    description:
      "Calcula cuánto pagas por el impuesto 4x1000 y aprende cómo funciona este gravamen financiero en Colombia.",
    images: ["https://monopolombiano.com/og-image.jpg"],
  },
};

const info = [
  {
    title: "¿Qué es el 4x1000?",
    description:
      "Es un impuesto que se cobra en Colombia sobre las transacciones financieras. Por cada $1.000 que retires o transfieras desde una cuenta bancaria, el Estado cobra $4 como gravamen.",
  },
  {
    title: "¿Cómo funciona?",
    description:
      "El impuesto se descuenta automáticamente cuando haces un retiro, transferencia, emisión de cheque o cualquier movimiento que implique salida de dinero de tus cuentas.",
  },
  {
    title: "¿Quiénes están exentos?",
    description:
      "Puedes tener una cuenta exenta del 4x1000 si lo solicitas a tu banco. Solo una cuenta por persona puede estar exenta, y debe cumplir con condiciones como ser cuenta de ahorros o corriente y estar registrada ante la DIAN como cuenta exenta.",
  },
  {
    title: "Ejemplo práctico ",
    description:
      "Si retiras $1.000.000 COP, pagarás $4.000 COP como impuesto. El banco te entregará $996.000 COP y $4.000 se irán al Estado como parte del gravamen.",
  },
  { title: "", description: "" },
];

const Faq = [
  {
    title: "¿Qué tipo de transacciones generan el 4x1000?",
    description:
      "Retiros, transferencias, pagos, cheques y cualquier salida de dinero desde cuentas bancarias.",
  },
  {
    title: "¿Puedo tener más de una cuenta exenta?",
    description:
      "No. Solo puedes registrar una cuenta exenta por persona ante el banco y la DIAN.",
  },
  {
    title: "¿Cómo evitar el 4x1000 legalmente?",
    description:
      "Registrando una cuenta como exenta y manteniendo transferencias internas entre cuentas propias.",
  },
  {
    title: "¿Desde cuándo existe el 4x1000?",
    description:
      "Fue creado en 1998 como medida temporal, pero ha sido prorrogado hasta hoy.",
  },
];
export default function Page() {
  return (
    <div className="container md:-mt-6">
      <div className="min-h-screen p-6 md:p-6 max-w-4xl mx-auto space-y-5">
        <section className="text-center space-y-4 w-5/6 mx-auto">
          <h1 className="font-agrandir font-bold text-secondary text-3xl  md:text-4xl">
            ¿CUANTO PAGAS POR EL <span className="text-primary">4x1000</span> ?
          </h1>
          <p className="text-lg text-tertiary font-canva-sans">
            La calculadora del 4x1000 te permite conocer cuánto dinero se
            descuenta por el Impuesto a las Transacciones Financieras (GMF) en
            Colombia. Este impuesto aplica cada vez que realizas retiros,
            transferencias o movimientos desde tus cuentas bancarias.
            <br />
            <br />
            Solo debes ingresar el valor de la transacción, y la herramienta
            calculará automáticamente cuánto pagarías por concepto del 4x1000,
            es decir, cuatro pesos por cada mil que retires o transfieras.
            <br />
            <br />
            💡Con esta calculadora podrás entender cómo impacta el 4x1000 en tus
            finanzas personales, planificar mejor tus movimientos bancarios y
            aprovechar beneficios como las cuentas exentas de este impuesto
            según la normativa vigente.
          </p>
        </section>
        <div className="flex flex-col md:flex-row  w-full justify-start">
          <div className="h-auto flex md:block">
            <Link href="/calculadoras">
              <Tag title="CALCULADORAS" />
            </Link>
          </div>
          <img
            src="/assets/4x1000/4x1000.png"
            alt="4x1000"
            className="mx-auto max-w-5/6 md:max-w-3/6 lg:max-w-2/6"
          />
          <div className="h-auto hidden md:block ">
            <p className="text-sm lg:text-lg bg-background text-background px-2 py-1 rounded-full font-agrandir font-bold cursor-default">
              HERRAMIENTAS
            </p>
          </div>
        </div>

        <Card className="shadow-xl bg-tertiary-foreground">
          <CardContent className="p-3 md:p-5 lg:p-8">
            <Calculator />
          </CardContent>
        </Card>
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="7506188604"
        />

        <InfoSection data={info} />

        <FAQ data={Faq} />
      </div>
    </div>
  );
}
