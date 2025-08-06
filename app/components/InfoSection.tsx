import { Separator } from "@/components/ui/separator";

export function InfoSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">¿Qué es el 4x1000?</h2>
        <p>
          Es un impuesto que se cobra en Colombia sobre las transacciones
          financieras. Por cada $1.000 que retires o transfieras desde una
          cuenta bancaria, el Estado cobra $4 como gravamen.
        </p>
      </div>

      <Separator />

      <div>
        <h2 className="text-2xl font-bold">¿Cómo funciona?</h2>
        <p>
          El impuesto se descuenta automáticamente cuando haces un retiro,
          transferencia, emisión de cheque o cualquier movimiento que implique
          salida de dinero de tus cuentas.
        </p>
      </div>

      <Separator />

      <div>
        <h2 className="text-2xl font-bold">¿Quiénes están exentos?</h2>
        <p>
          Puedes tener una cuenta exenta del 4x1000 si lo solicitas a tu banco.
          Solo una cuenta por persona puede estar exenta, y debe cumplir con
          condiciones como ser cuenta de ahorros o corriente y estar registrada
          ante la DIAN como cuenta exenta.
        </p>
      </div>

      <Separator />

      <div>
        <h2 className="text-2xl font-bold">Ejemplo práctico</h2>
        <p>
          Si retiras $1.000.000 COP, pagarás $4.000 COP como impuesto. El banco
          te entregará $996.000 COP y $4.000 se irán al Estado como parte del
          gravamen.
        </p>
      </div>
    </section>
  );
}
