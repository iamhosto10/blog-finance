"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DollarSignIcon, PiggyBank } from "lucide-react";

export function Calculator() {
  const [monto, setMonto] = useState(0);
  const [resultado, setResultado] = useState<null | {
    impuesto: number;
    total: number;
    resultado: number;
  }>(null);

  function calcular() {
    const impuesto = monto * 0.004;
    const total = monto - impuesto;
    const resultado = monto / (1 - 0.004);
    setResultado({ impuesto, total, resultado });
  }

  return (
    <div className="space-y-8">
      {/* Imagen decorativa o logo provisional */}

      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm text-secondary font-canva-sans font-bold">
          Valor a convertir
        </h3>
        <div className="group flex items-center gap-2 border-2 border-purple-200 rounded-lg px-3 py-2 bg-background md:w-2/5  hover:border-purple-500 focus-within:border-purple-500">
          <DollarSignIcon />
          {/* Campo de entrada */}
          <input
            type="number"
            // value={amount}
            // onChange={(e) => setAmount(Number(e.target.value))}
            className="text-black font-bold w-24 outline-none"
          />
        </div>
      </div>

      <Button
        onClick={calcular}
        className="bg-primary/80 text-tertiary hover:bg-primary transition-colors cursor-pointer font-canva-sans font-bold"
      >
        Calcular 4x1000
      </Button>

      {resultado && (
        <Card className="bg-primary-foreground shadow-lg">
          <CardContent className="p-4 space-y-2 font-canva-sans text-tertiary">
            <p>
              Impuesto 4x1000: <strong>${resultado.impuesto.toFixed(2)}</strong>
            </p>
            <p>
              Total restante: <strong>${resultado.total.toFixed(2)}</strong>
            </p>
            <p>
              si deseas que el destinatario reciba <strong>${monto}</strong>{" "}
              pesos exactamente debes enviar:{" "}
              <strong>${resultado.resultado.toFixed(2)}</strong>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
