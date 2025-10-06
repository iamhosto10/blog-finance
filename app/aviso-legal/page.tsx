"use client";

export default function AvisoLegal() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-6">
        Aviso Legal y Exención de Responsabilidad
      </h1>

      <div className="space-y-6 text-sm md:text-base text-tertiary text-justify font-canva-sans">
        <p>
          El blog <strong>Monopolombiano</strong> tiene como objetivo ofrecer
          contenido informativo y educativo sobre temas financieros en Colombia.
          Sin embargo, no garantiza que la información sea completa, exacta o
          actualizada en todo momento.
        </p>

        <h2 className="text-2xl font-bold text-secondary mt-6 mb-2">
          1. Naturaleza informativa
        </h2>
        <p>
          Ninguno de los artículos, publicaciones o contenidos disponibles en
          este sitio constituye asesoría financiera, legal o profesional. Los
          usuarios deben tomar sus propias decisiones informadas y, si es
          necesario, buscar asesoría personalizada con profesionales
          certificados.
        </p>

        <h2 className="text-2xl font-bold text-secondary mt-6 mb-2">
          2. Limitación de responsabilidad
        </h2>
        <p>
          No nos hacemos responsables por decisiones financieras, inversiones o
          acciones tomadas por los usuarios basadas en la información aquí
          publicada.
        </p>

        <h2 className="text-2xl font-bold text-secondary mt-6 mb-2">
          3. Enlaces y terceros
        </h2>
        <p>
          El sitio puede contener enlaces a sitios externos. No nos hacemos
          responsables por el contenido, políticas o exactitud de la información
          en dichos sitios.
        </p>

        <h2 className="text-2xl font-bold text-secondary mt-6 mb-2">
          4. Contacto
        </h2>
        <p>
          Para cualquier consulta sobre este Aviso Legal, puedes escribirnos a:{" "}
          <a href="mailto:gerav0400@gmail.com" className="text-primary">
            gerav0400@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
