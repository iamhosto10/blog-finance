import Tag from "@/components/CommonComponents/Tag";
import TableNu from "@/components/nu/Table";
import { Card, CardContent } from "@/components/ui/card";

interface DailyGrowth {
  day: number;
  amount: number;
  interest: number;
  retencion: number;
}

const calculateDailyGrowth = (
  initialAmount: number,
  days: number,
  annualRate: number
): DailyGrowth[] => {
  const results: DailyGrowth[] = [];
  const dailyRate = Math.pow(1 + annualRate, 1 / 365) - 1;
  let amount = initialAmount;

  for (let i = 1; i <= days; i++) {
    const inte = amount * (1 + dailyRate) - amount;
    const retem = inte > 2588.58 ? parseFloat((inte * 0.07).toFixed(2)) : 0;
    amount = amount + inte - retem;
    results.push({
      day: i,
      amount: parseFloat(amount.toFixed(2)), // redondeo a 2 decimales
      interest: parseFloat(inte.toFixed(2)),
      retencion: retem,
    });
  }

  return results;
};

export default function Page() {
  const calculateFinalAmount = (
    initialAmount: number,
    days: number,
    annualRate: number // ejemplo: 0.0925 para 9.25%
  ): number => {
    return parseFloat(
      (initialAmount * Math.pow(1 + annualRate, days / 365)).toFixed(2)
    );
  };
  return (
    <div className="p-6">
      <div className="container md:-mt-6">
        <div className="min-h-screen p-6 md:p-6 max-w-4xl mx-auto space-y-5">
          <section className="text-center space-y-4 w-5/6 mx-auto">
            <h1 className="font-agrandir font-bold text-secondary text-3xl  md:text-4xl">
              CALCULADORA DE <span className="text-primary">RENTABILIDAD</span>{" "}
              DE NU
            </h1>
            <p className="text-lg text-tertiary font-canva-sans">
              Tasa de 9.25%
            </p>
          </section>
          <div className="flex flex-col md:flex-row max-md:gap-5 w-full justify-start">
            <div className="h-auto flex md:block">
              <Tag title="HERRAMIENTAS" />
            </div>
            <img
              src="/assets/convertdolar/dolartopesos.webp"
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
              <TableNu />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
