import TextReader from "@/components/TextReader";

export default function Home() {
  const contenido = `
   Diversificar es una palabra que escuchamos con frecuencia en el mundo financiero, pero ¿qué significa realmente? En pocas palabras, se trata de no poner todos los huevos en la misma canasta. Cuando diversificas tu portafolio de inversión, estás distribuyendo tu dinero en diferentes activos —como acciones, bonos, bienes raíces o incluso criptomonedas— para reducir el riesgo.

Imagina que inviertes todo tu capital en una sola empresa y esa empresa tiene un mal año. El impacto sería directo y fuerte en tus finanzas. En cambio, si tienes tu dinero repartido entre distintas industrias y tipos de activos, es más probable que unas inversiones compensen las pérdidas de otras.

La clave de la diversificación no es ganar siempre, sino perder menos cuando los mercados bajan. Y en el largo plazo, esa estrategia puede marcar la diferencia entre el éxito y el fracaso financiero.
  `;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Lector de Texto</h1>
      <p className="mb-4">{contenido}</p>
      <TextReader text={contenido} />
    </main>
  );
}
