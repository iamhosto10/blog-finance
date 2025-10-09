"use client";

import React, { useState } from "react";

const page = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    mensaje: "",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    // Aquí puedes integrar tu API (SendGrid, Netlify Forms, Vercel Functions, etc.)
    console.log("Enviar formulario:", form);
    alert("Formulario enviado (simulado). Revisa la consola.");
  }
  return (
    <div className="container mx-auto flex flex-col gap-16">
      <h1 className="text-center font-agrandir text-secondary font-bold text-3xl lg:text-5xl 2xl:text-6xl">
        Sobre Nosotros
      </h1>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center content-center">
        <div className="flex flex-col gap-10 text-center lg:text-left">
          <h3 className="font-agrandir text-tertiary font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Gerardo Ramirez
          </h3>
          <p className="font-canva-sans text-tertiary text-lg md:text-xl text-justify ">
            Ingeniero de sistemas con especialización en desarrollo front-end
            para aplicaciones móviles y web. Experto en programación orientada a
            objetos, principios SOLID y Clean Code. Amplios conocimientos en
            HTML, CSS, JavaScript,TypeScript, React Native y React.js.
            Experiencia en desarrollo de backend con Node.js y MongoDB.
            Especializado en el sector del comercio electrónico minorista, con
            énfasis en SEO y diseño de interfaces. También tengo conocimientos
            en el sector de criptomonedas creando una aplicación móvil de
            intercambio de monedas con React Native.
          </p>
        </div>
        <img
          src="/assets/aboutUs/gerardo.jpg"
          alt="Gerardo Ramirez"
          className="h-[375px] w-[305px] md:h-[461px] md:w-[375px] rounded-2xl mx-auto "
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center content-center">
        <div className="flex flex-col gap-10 text-center lg:text-left">
          <h3 className="font-agrandir text-tertiary font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Luisa Vargas
          </h3>
          <p className="font-canva-sans text-tertiary text-lg md:text-xl text-justify ">
            Soy profesional en Administración de Empresas con experiencia en
            diversas áreas como nómina, logística y creacion de contenido.
            Experiencia como la de nomina, me ha ayudado a entender el tema
            financiero laboral. En logistica me ayuda a entender temas como
            estrategias en cada ambito para lograr sinergia y eficiencia. En
            creacion de contenido me permite estar al tanto de las tendencias
            mas recientes y revisarlas con mi conocimiento financiero para
            aplicarlo de manera segura y eficiente en las finanzas personales.
          </p>
        </div>
        <img
          src="/assets/aboutUs/luisa.jpg"
          alt="Gerardo Ramirez"
          className="h-[375px] w-[305px] md:h-[461px] md:w-[375px] rounded-2xl mx-auto "
        />
      </div>

      <div className="min-h-screen flex items-start justify-center py-12 px-4 bg-white">
        <div className="w-full max-w-3xl">
          <h3
            className="text-3xl sm:text-4xl font-bold font-agrandir text-tertiary
           text-center mb-8"
          >
            Contactanos
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col text-sm">
                <span className="mb-2 font-bold font-agrandir text-tertiary">
                  Nombre
                </span>
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Jane"
                  className="rounded-lg border border-gray-200 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  type="text"
                  required
                />
              </label>

              <label className="flex flex-col text-sm">
                <span className="mb-2 font-bold font-agrandir text-tertiary">
                  Apellido
                </span>
                <input
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  placeholder="Smitherton"
                  className="rounded-lg border border-gray-200 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  type="text"
                  required
                />
              </label>
            </div>

            <label className="flex flex-col text-sm">
              <span className="mb-2 font-bold font-agrandir text-tertiary">
                Correo
              </span>
              <input
                name="correo"
                value={form.correo}
                onChange={handleChange}
                placeholder="email@ejemplo.com"
                className="rounded-lg border border-gray-200 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 w-full"
                type="email"
                required
              />
            </label>

            <label className="flex flex-col text-sm">
              <span className="mb-2 font-bold font-agrandir text-tertiary">
                Tu mensaje
              </span>
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                placeholder="Dejanos tu mensaje"
                rows={6}
                className="rounded-lg border border-gray-200 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 w-full resize-vertical"
                required
              />
            </label>

            <div>
              <button
                type="submit"
                className="w-full bg-tertiary text-white text-lg font-bold font-agrandir py-4 rounded-lg shadow-md hover:opacity-90 transition"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
