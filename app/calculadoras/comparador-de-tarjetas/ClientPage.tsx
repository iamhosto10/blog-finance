"use client";

import { urlFor } from "@/lib/sanity";
import { RootState } from "@/store/store";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Listbox } from "@headlessui/react";
import { CheckCircle, ChevronDown, PlusIcon, X } from "lucide-react";
import { Bank, Card, Franchise } from "@/lib/interface";
import Link from "next/link";
import Tag from "@/components/CommonComponents/Tag";
import { formatCOP } from "@/lib/utils";

const firstBank: Bank = {
  _id: "",
  _type: "banks",
  slug: { _type: "slug", current: "" },
  title: "Seleccione Banco",
};
const fistFranchiese: Franchise = {
  _id: "",
  _type: "franchises",
  name: "Seleccione Franquisia",
  slug: {
    _type: "slug",
    current: "",
  },
};
const ClientPage = () => {
  const { banks, franchieses, cards } = useSelector(
    (state: RootState) => state.sanity
  );
  const [selectedBank, setSelectedBank] = useState<Bank>(firstBank);
  const [selectedFranchiese, setSelectedFranchiese] =
    useState<Franchise>(fistFranchiese);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  const AddCards = () => {
    if (selectedCard === undefined || selectedCard === null) return null;
    if (selectedCards.includes(selectedCard)) return null;
    const newCards: Card[] = [...selectedCards, selectedCard];
    setSelectedCards(newCards);
  };

  const DeleteCards = (id: string) => {
    const newCards: Card[] = selectedCards.filter((card) => card._id !== id);
    setSelectedCards(newCards);
  };

  if (!banks || !franchieses || !cards) return null;

  return (
    <div className="container mx-auto flex flex-col gap-16">
      <h1 className="text-center font-agrandir text-secondary font-bold text-2xl lg:text-4xl 2xl:text-6xl">
        COMPARADOR DE TARJETAS
      </h1>
      <div className="flex ">
        <Link href="/calculadoras">
          <Tag title="CALCULADORAS" />
        </Link>
      </div>
      <p className="text-center font-canva-sans text-tertiary text-lg lg:text-lg 2xl:text-3xl">
        Explora nuestro comparador de tarjetas bancarias y encuentra la opción
        que mejor se adapta a tus necesidades. Compara características, fichas
        técnicas, comisiones y valoraciones de distintas entidades. Toma
        decisiones más seguras y eficientes con información clara y detallada.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-2.5 lg:gap-1.5 ">
        <div className="lg:col-span-3">
          <p className="font-agrandir font-bold text-secondary text-lg md:text-xl xl:text-xl text-left">
            Bancos
          </p>
          <Listbox
            value={selectedBank}
            onChange={(value: Bank) => {
              setSelectedBank(value);
              setSelectedCard(null);
            }}
          >
            <Listbox.Button className="flex items-center gap-2 border px-3 py-2 rounded cursor-pointer">
              {selectedBank.asset && (
                <img
                  src={urlFor(selectedBank.asset).url()}
                  alt={selectedBank.title}
                  className="w-6 h-6 rounded"
                />
              )}
              {selectedBank.title}
              <ChevronDown />
            </Listbox.Button>
            <Listbox.Options className="border mt-1 rounded shadow bg-white">
              {banks.map((bank) => (
                <Listbox.Option
                  key={bank._id}
                  value={bank}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={urlFor(bank.asset).url()}
                    alt={bank.title}
                    className="w-6 h-6 rounded"
                  />
                  {bank.title}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        <div className="lg:col-span-3">
          <p className="font-agrandir font-bold text-secondary text-lg md:text-xl xl:text-xl text-left">
            Franquisia
          </p>
          <Listbox
            value={selectedFranchiese}
            onChange={(value: Franchise) => {
              setSelectedFranchiese(value);
              setSelectedCard(null);
            }}
          >
            <Listbox.Button className="flex items-center gap-2 border px-3 py-2 rounded cursor-pointer">
              {selectedFranchiese.image && (
                <img
                  src={urlFor(selectedFranchiese.image).url()}
                  alt={selectedFranchiese.name}
                  className="w-6 h-6 rounded"
                />
              )}
              {selectedFranchiese.name}
              <ChevronDown />
            </Listbox.Button>
            <Listbox.Options className="border mt-1 rounded shadow bg-white">
              {franchieses.map((franchiese) => (
                <Listbox.Option
                  key={franchiese._id}
                  value={franchiese}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={urlFor(franchiese.image).url()}
                    alt={franchiese.name}
                    className="w-6 h-6 rounded"
                  />
                  {franchiese.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        <div className="lg:col-span-4">
          <p className="font-agrandir font-bold text-secondary text-lg md:text-xl xl:text-xl text-left">
            Tarjeta
          </p>
          <Listbox value={selectedCard} onChange={setSelectedCard}>
            <Listbox.Button className="flex items-center gap-2 border px-3 py-2 rounded cursor-pointer">
              {selectedCard && (
                <>
                  <img
                    src={urlFor(selectedCard.image).url()}
                    alt={selectedCard.name}
                    className="w-6 h-6 rounded"
                  />
                  {selectedCard.name}
                </>
              )}
              <ChevronDown />
            </Listbox.Button>
            <Listbox.Options className="border mt-1 rounded shadow bg-white">
              {cards
                .filter(
                  (ele) =>
                    ele.franchise?.name === selectedFranchiese.name &&
                    ele.bank?.title &&
                    selectedBank.title
                )
                .map((card) => (
                  <Listbox.Option
                    key={card._id}
                    value={card}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={urlFor(card.image).url()}
                      alt={card.name}
                      className="w-6 h-6 rounded"
                    />
                    {card.name}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>
      <div className="flex flex-row bg-primary-foreground rounded-md p-2 gap-2">
        {selectedCards?.map((card) => (
          <div
            className="flex flex-row gap-1 bg-secondary-background rounded-md w-auto px-3 py-1 cursor-pointer"
            key={card._id}
            onClick={() => DeleteCards(card._id)}
          >
            <img
              src={urlFor(card?.image).url()}
              alt={card?.name}
              className="w-6 h-6 rounded my-auto"
            />
            <p>{card?.name}</p>
            <X className="size-6 my-auto" />
          </div>
        ))}
        {selectedCards?.length < 2 && (
          <div
            className="flex flex-row gap-1 bg-secondary-background rounded-md w-auto px-3 py-1 cursor-pointer"
            onClick={AddCards}
          >
            <PlusIcon className="size-6 my-auto" />
          </div>
        )}
      </div>
      <div className=" w-full ">
        <h2 className="text-xl font-bold font-agrandir text-secondary mb-6">
          FICHA TÉCNICA
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
          <p className="hidden md:block font-bold font-agrandir self-end pb-10">
            VALORACIÓN:
          </p>
          <div className="flex flex-col items-center gap-3">
            {selectedCards[0] && (
              <img
                src={urlFor(selectedCards[0]?.image)?.url()}
                alt={selectedCards[0]?.name}
                className="w-[160px] h-[90px] rounded-md"
              />
            )}
            <div className="flex flex-col items-center md:items-start md:flex-row gap-1">
              <p className="font-bold text-center md:text-start">
                {selectedCards[0]?.name}
              </p>
              <span className="text-green-600 font-semibold text-lg">
                {selectedCards[0]?.score}%
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            {selectedCards[1] && (
              <img
                src={urlFor(selectedCards[1]?.image)?.url()}
                alt={selectedCards[1]?.name}
                className="w-[160px] h-[90px] rounded-md"
              />
            )}
            <div className="flex  flex-col items-center md:items-start md:flex-row gap-1">
              <p className="font-bold text-center md:text-start">
                {selectedCards[1]?.name}
              </p>
              <span className="text-green-600 font-semibold text-lg">
                {selectedCards[1]?.score} %
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-primary-foreground rounded-md p-2 ">
          <p className="font-bold font-agrandir self-end hidden md:block ">
            BANCO:
          </p>
          <p className="font-canva-sans self-end text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              BANCO:
            </span>
            <br className="md:hidden" />
            {selectedCards[0]?.bank?.title}
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              BANCO:
            </span>
            <br className="md:hidden" />
            {selectedCards[1]?.bank?.title}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
          <p className="font-bold font-agrandir self-end hidden md:block ">
            FRANQUISIA:
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              FRANQUISIA:
            </span>
            <br className="md:hidden" />
            {selectedCards[0]?.franchise?.name}
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              FRANQUISIA:
            </span>
            <br className="md:hidden" />
            {selectedCards[1]?.franchise?.name}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-primary-foreground rounded-md p-2">
          <p className="font-bold font-agrandir self-end hidden md:block">
            TIPO DE TARJETA:
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              TIPO DE TARJETA:
            </span>
            <br className="md:hidden" />
            {selectedCards[0]?.cardType?.toUpperCase()}
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              TIPO DE TARJETA:
            </span>
            <br className="md:hidden" />
            {selectedCards[1]?.cardType?.toUpperCase()}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
          <p className="font-bold font-agrandir self-end  hidden md:block">
            CUOTA DE MANEJO:
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              CUOTA DE MANEJO:
            </span>
            <br className="md:hidden" />
            {formatCOP(Number(selectedCards[0]?.cuotaManejo))}
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              CUOTA DE MANEJO:
            </span>
            <br className="md:hidden" />
            {formatCOP(Number(selectedCards[1]?.cuotaManejo))}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-primary-foreground rounded-md p-2">
          <p className="font-bold font-agrandir self-end hidden md:block">
            CUOTA DE EXOHONERABLE:
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              CUOTA DE EXOHONERABLE:
            </span>
            <br className="md:hidden" />
            {selectedCards[0]?.cuotaManejoExohonerable}
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              CUOTA DE EXOHONERABLE:
            </span>
            <br className="md:hidden" />
            {selectedCards[1]?.cuotaManejoExohonerable}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
          <p className="font-bold font-agrandir self-end hidden md:block">
            TASA DE INTERES E.A.:
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              TASA DE INTERES E.A.:
            </span>
            <br className="md:hidden" />
            {selectedCards[0]?.tasaInteresEfectivaAnual}
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              TASA DE INTERES E.A.:
            </span>
            <br className="md:hidden" />
            {selectedCards[1]?.tasaInteresEfectivaAnual}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-primary-foreground rounded-md p-2">
          <p className="font-bold font-agrandir self-end hidden md:block">
            SEGURO FRAUDE:
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              SEGURO FRAUDE:
            </span>
            <br className="md:hidden" />
            {selectedCards[0]?.seguroFraude}
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              SEGURO FRAUDE:
            </span>
            <br className="md:hidden" />
            {selectedCards[1]?.seguroFraude}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
          <p className="font-bold font-agrandir self-end hidden md:block">
            COSTO AVANCE:
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              COSTO AVANCE:
            </span>
            <br className="md:hidden" />
            {formatCOP(Number(selectedCards[0]?.costoAvance))}
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              COSTO AVANCE:
            </span>
            <br className="md:hidden" />
            {formatCOP(Number(selectedCards[1]?.costoAvance))}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-primary-foreground rounded-md p-2">
          <p className="font-bold font-agrandir self-end hidden md:block">
            COSTO TRANSACCIONES INTERNACIONALES (%):
          </p>
          <p className="font-canva-sans self-end  text-center my-auto">
            <span className="font-bold font-agrandir self-end md:hidden">
              COSTO TRANSACCIONES INTERNACIONALES (%):
            </span>
            <br className="md:hidden" />
            {selectedCards[0]?.costoTransaccionesInternacionales}{" "}
            {selectedCards[0] && "%"}
          </p>
          <p className="font-canva-sans self-end  text-center my-auto">
            <span className="font-bold font-agrandir self-end md:hidden">
              COSTO TRANSACCIONES INTERNACIONALES (%):
            </span>
            <br className="md:hidden" />
            {selectedCards[1]?.costoTransaccionesInternacionales}{" "}
            {selectedCards[1] && "%"}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 h-full">
          <p className="font-bold font-agrandir self-end hidden md:flex h-full items-center">
            BENEFICIOS:
          </p>
          <p className="font-canva-sans self-end  text-center h-full">
            <span className="font-bold font-agrandir self-end md:hidden">
              BENEFICIOS:
            </span>
            <br className="md:hidden" />
            <ul className="list-disc pl-5">
              {selectedCards[0]?.benefits?.map((benefit, index) => (
                <li key={index} className="text-left">
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </p>
          <p className="font-canva-sans self-end  text-center h-full">
            <span className="font-bold font-agrandir self-end md:hidden">
              BENEFICIOS:
            </span>
            <br className="md:hidden" />
            <ul className="list-disc pl-5">
              {selectedCards[1]?.benefits?.map((benefit, index) => (
                <li key={index} className="text-left">
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-primary-foreground rounded-md p-2">
          <p className="font-bold font-agrandir self-end hidden md:block">
            PROGRAMAS DE RECOMPENSAS:
          </p>
          <p className="font-canva-sans self-end  text-center my-auto">
            <span className="font-bold font-agrandir self-end md:hidden">
              PROGRAMAS DE RECOMPENSAS:
            </span>
            <br className="md:hidden" />
            {selectedCards[0]?.programaRecompensas}
          </p>
          <p className="font-canva-sans self-end  text-center my-auto">
            <span className="font-bold font-agrandir self-end md:hidden">
              PROGRAMAS DE RECOMPENSAS:
            </span>
            <br className="md:hidden" />
            {selectedCards[1]?.programaRecompensas}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 h-full">
          <p className="font-bold font-agrandir self-end hidden md:flex h-full items-center">
            ALIANZAS:
          </p>
          <p className="font-canva-sans self-end  text-center h-full">
            <span className="font-bold font-agrandir self-end md:hidden">
              ALIANZAS:
            </span>
            <br className="md:hidden" />
            <ul className="list-disc pl-5">
              {selectedCards[0]?.alianzas?.map((benefit, index) => (
                <li key={index} className="text-left">
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </p>
          <p className="font-canva-sans self-end  text-center h-full">
            <span className="font-bold font-agrandir self-end md:hidden">
              ALIANZAS:
            </span>
            <br className="md:hidden" />
            <ul className="list-disc pl-5">
              {selectedCards[1]?.alianzas?.map((benefit, index) => (
                <li key={index} className="text-left">
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-primary-foreground rounded-md p-2">
          <p className="font-bold font-agrandir self-end hidden md:block">
            INGRESO MINIMO:
          </p>
          <p className="font-canva-sans self-end  text-center my-auto">
            <span className="font-bold font-agrandir self-end md:hidden">
              INGRESO MINIMO:
            </span>
            <br className="md:hidden" />
            {formatCOP(Number(selectedCards[0]?.ingresoMinimo))}
          </p>
          <p className="font-canva-sans self-end  text-center my-auto">
            <span className="font-bold font-agrandir self-end md:hidden">
              INGRESO MINIMO:
            </span>
            <br className="md:hidden" />
            {formatCOP(Number(selectedCards[1]?.ingresoMinimo))}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
          <p className="font-bold font-agrandir self-end hidden md:block">
            EDAD MINIMA:
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              EDAD MINIMA:
            </span>
            <br className="md:hidden" />
            {selectedCards[0]?.edadMinima}
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              EDAD MINIMA:
            </span>
            <br className="md:hidden" />
            {selectedCards[1]?.edadMinima}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-primary-foreground rounded-md p-2">
          <p className="font-bold font-agrandir self-end hidden md:block">
            CUPO MAXIMO:
          </p>
          <p className="font-canva-sans self-end  text-center my-auto">
            <span className="font-bold font-agrandir self-end md:hidden">
              CUPO MAXIMO:
            </span>
            <br className="md:hidden" />
            {formatCOP(Number(selectedCards[0]?.cupoMaximo))}
          </p>
          <p className="font-canva-sans self-end  text-center my-auto">
            <span className="font-bold font-agrandir self-end md:hidden">
              CUPO MAXIMO:
            </span>
            <br className="md:hidden" />
            {formatCOP(Number(selectedCards[1]?.cupoMaximo))}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
          <p className="font-bold font-agrandir self-end hidden md:block">
            COMPRAS INTERNACIONALES:
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              COMPRAS INTERNACIONALES:
            </span>
            <br className="md:hidden" />
            {selectedCards[0]
              ? selectedCards[0]?.comprasInternacionales
                ? "SI"
                : "NO"
              : ""}
          </p>
          <p className="font-canva-sans self-end  text-center ">
            <span className="font-bold font-agrandir self-end md:hidden">
              COMPRAS INTERNACIONALES:
            </span>
            <br className="md:hidden" />
            {selectedCards[1]
              ? selectedCards[1]?.comprasInternacionales
                ? "SI"
                : "NO"
              : ""}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-primary-foreground rounded-md p-2">
          <p className="font-bold font-agrandir self-end hidden md:block">
            BANCA DIGITAL:
          </p>
          <p className="font-canva-sans self-end  text-center my-auto">
            <span className="font-bold font-agrandir self-end md:hidden">
              BANCA DIGITAL:
            </span>
            <br className="md:hidden" />
            {selectedCards[0]
              ? selectedCards[0]?.bancaDigital
                ? "SI"
                : "NO"
              : ""}
          </p>
          <p className="font-canva-sans self-end  text-center my-auto">
            <span className="font-bold font-agrandir self-end md:hidden">
              BANCA DIGITAL:
            </span>
            <br className="md:hidden" />
            {selectedCards[1]
              ? selectedCards[1]?.bancaDigital
                ? "SI"
                : "NO"
              : ""}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2 h-full">
          <p className="font-bold font-agrandir self-end hidden md:flex h-full items-center">
            SEGURIDAD:
          </p>
          <p className="font-canva-sans self-end  text-center h-full">
            <span className="font-bold font-agrandir self-end md:hidden">
              SEGURIDAD:
            </span>
            <br className="md:hidden" />
            <ul className="list-disc pl-5">
              {selectedCards[0]?.seguridad?.map((benefit, index) => (
                <li key={index} className="text-left">
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </p>
          <p className="font-canva-sans self-end  text-center h-full">
            <span className="font-bold font-agrandir self-end md:hidden">
              SEGURIDAD:
            </span>
            <br className="md:hidden" />
            <ul className="list-disc pl-5">
              {selectedCards[1]?.seguridad?.map((benefit, index) => (
                <li key={index} className="text-left">
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
