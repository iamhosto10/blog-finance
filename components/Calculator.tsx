"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PiggyBank } from "lucide-react";

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
      <div className="flex justify-center">
        <img
          src="/assets/Ahorros.svg"
          alt="Logo 4x1000"
          className="h-16 text-accent"
        />
        {/* <Ahorros className="h-16" /> */}
      </div>

      {/* Ícono decorativo */}
      <div className="flex items-center justify-center gap-2 text-yellow-500">
        <PiggyBank className="w-6 h-6" />
        <h2 className="text-xl font-semibold">
          Calculadora de Impuesto 4x1000
        </h2>
      </div>

      <div className="space-y-2">
        <Label htmlFor="monto">Monto en pesos colombianos</Label>
        <Input
          id="monto"
          type="number"
          placeholder="Ej: 1000000"
          className={cn(
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          )}
          value={monto || ""}
          onChange={(e) => setMonto(parseFloat(e.target.value) || 0)}
        />
      </div>

      <Button
        onClick={calcular}
        className="bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
      >
        Calcular 4x1000
      </Button>

      {resultado && (
        <Card className="bg-yellow-100 text-black shadow-lg">
          <CardContent className="p-4 space-y-2">
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
