import React from "react";

const ArticleHome = () => {
  return (
    <div className="flex flex-col gap-4 w-full lg:w-2/3">
      <h2 className="font-agrandir font-bold text-2xl lg:text-3xl text-secondary text-left line-clamp-3 lg:line-clamp-2 ">
        ¿POR CUANTOS AÑOS DEBO AHORRAR PARA TENER
        <span className="text-primary"> VIVIENDA PROPIA</span>?
      </h2>
      <div className="flex flex-row w-full justify-start gap-2">
        <h3 className="text-sm lg:text-md bg-primary text-background px-2 py-1 rounded-full font-agrandir font-bold">
          Noticias
        </h3>
        <p className="text-sm text-tertiary my-auto font-canva-sans font-bold">
          01/08/2025
        </p>
      </div>
      <div className="relative max-w-4/5 mx-auto p-6">
        <img
          src="/assets/ArticleHome/imagenCasa.png"
          alt="Casa protegida con dinero"
          className="rounded-md"
        />

        <div className="absolute -top-0.5 -right-0.5 size-12 lg:size-24">
          <img
            src="/assets/ArticleHome/icontest.png"
            alt="Ícono de banco"
            className="size-12 lg:size-24"
          />
        </div>
      </div>
      <p className="font-canva-sans text-tertiary text-md text-justify">
        Ahorrar para una vivienda propia es uno de los grandes retos financieros
        de la vida adulta. La respuesta a cuántos años necesitas dependerá de tu
        ingreso, tus hábitos de ahorro y el precio del inmueble que deseas. Si
        logras destinar entre el 20% y 30% de tu salario mensual a una cuenta de
        ahorro, podrías reunir la cuota inicial en unos 5 a 10 años. Sin
        embargo, si accedes a un crédito hipotecario, podrías alcanzar tu meta
        más rápido, solo necesitando el 20% del valor total como entrada. Lo
        importante es tener un plan claro, evitar gastos innecesarios y buscar
        opciones de inversión que hagan crecer tu dinero.
      </p>
    </div>
  );
};

export default ArticleHome;
