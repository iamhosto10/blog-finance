"use client";

export default function TerminosYCondiciones() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-6">
        Términos y Condiciones de Uso de{" "}
        <span className="text-primary">Monopolombiano</span>
      </h1>

      <div className="space-y-6 text-sm md:text-base text-tertiary text-justify font-canva-sans">
        <p>
          Bienvenido a <strong>Monopolombiano</strong> (
          <a href="https://www.monopolombiano.com" className="text-primary">
            www.monopolombiano.com
          </a>
          ). Al acceder y utilizar este sitio web, aceptas los siguientes
          términos y condiciones. Si no estás de acuerdo con alguna parte de
          estos términos, te recomendamos no utilizar el sitio.
        </p>

        <h2 className="text-2xl font-bold text-secondary mt-6 mb-2">
          1. Propiedad del sitio
        </h2>
        <p>
          Este blog es administrado por Monopolombiano. Todo el contenido,
          incluyendo textos, imágenes, gráficos, logotipos y otros materiales,
          es propiedad del blog o de sus respectivos autores, salvo que se
          indique lo contrario.
        </p>

        <h2 className="text-2xl font-bold text-secondary mt-6 mb-2">
          2. Uso del contenido
        </h2>
        <p>
          El contenido publicado tiene fines exclusivamente informativos y
          educativos. No está permitido reproducir, distribuir o modificar el
          contenido sin autorización previa por escrito.
        </p>

        <h2 className="text-2xl font-bold text-secondary mt-6 mb-2">
          3. Limitación de responsabilidad
        </h2>
        <p>
          No nos hacemos responsables por pérdidas o daños derivados del uso de
          la información contenida en este sitio. La información financiera
          publicada no sustituye asesoría profesional personalizada.
        </p>

        <h2 className="text-2xl font-bold text-secondary mt-6 mb-2">
          4. Enlaces externos
        </h2>
        <p>
          En algunos casos, se incluyen enlaces a sitios web de terceros. No
          somos responsables por el contenido o prácticas de privacidad de
          dichos sitios.
        </p>

        <h2 className="text-2xl font-bold text-secondary mt-6 mb-2">
          5. Cambios a los Términos
        </h2>
        <p>
          Monopolombiano se reserva el derecho de modificar estos Términos y
          Condiciones en cualquier momento. Las modificaciones entrarán en
          vigencia desde su publicación en esta página.
        </p>

        <p>
          Si tienes dudas, puedes escribirnos a:{" "}
          <a href="mailto:gerav0400@gmail.com" className="text-primary">
            gerav0400@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
