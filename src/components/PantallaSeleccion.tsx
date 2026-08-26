"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { Asiento, Vuelo } from "@/lib/tipos";
import { indexarAsientos, nombreCabina } from "@/lib/cabina";
import { MapaCabina } from "@/components/MapaCabina";
import { Leyenda } from "@/components/Leyenda";
import { Contador } from "@/components/Contador";
import { RielVuelo } from "@/components/RielVuelo";
import { RielSeleccion } from "@/components/RielSeleccion";
import { AvisoLimite } from "@/components/AvisoLimite";
import {
  BarraDeEstadoSimulada,
  BarraTotalMovil,
  CabeceraMovil,
  CardRutaMovil,
} from "@/components/movil";

/** Cuánto se queda el aviso del tope antes de irse solo. */
const MS_AVISO = 5000;

export function PantallaSeleccion({ vuelo }: { vuelo: Vuelo }) {
  const [seleccion, setSeleccion] = useState<string[]>([]);
  const [intento, setIntento] = useState(0);
  const [aviso, setAviso] = useState<string | null>(null);

  const indice = useMemo(() => indexarAsientos(vuelo), [vuelo]);

  const elegidos = useMemo(
    () => seleccion.map((id) => indice.get(id)).filter((a): a is Asiento => Boolean(a)),
    [seleccion, indice],
  );

  const subtotal = elegidos.reduce((suma, a) => suma + a.precio, 0);
  const tasas = elegidos.length * vuelo.tasasPorAsiento;
  const total = subtotal + tasas;

  const alternar = useCallback(
    (asiento: Asiento) => {
      setSeleccion((actual) => {
        if (actual.includes(asiento.id)) {
          return actual.filter((id) => id !== asiento.id);
        }

        if (actual.length >= vuelo.maxAsientos) {
          // Qué pasó + qué hacer ahora. Sin códigos, sin "error".
          setAviso(
            `Ya elegiste ${vuelo.maxAsientos} asientos. Quita uno para cambiar tu selección.`,
          );
          setIntento((n) => n + 1);
          return actual;
        }

        setAviso(null);
        return [...actual, asiento.id];
      });
    },
    [vuelo.maxAsientos],
  );

  // El aviso se retira solo. Si se dispara otra vez, el temporizador anterior
  // se limpia y vuelve a contar desde cero.
  useEffect(() => {
    if (!aviso) return;
    const t = window.setTimeout(() => setAviso(null), MS_AVISO);
    return () => window.clearTimeout(t);
  }, [aviso, intento]);

  const cabinaDeAsiento = useCallback(
    (asiento: Asiento) => nombreCabina(vuelo, asiento.cabina),
    [vuelo],
  );

  // La card del riel izquierdo lleva un solo rótulo de cabina. Con la selección
  // repartida entre dos cabinas ese rótulo mentiría, así que lo decimos.
  const cabinaMostrada = (() => {
    if (elegidos.length === 0) return vuelo.cabinas[0].nombre;
    const cabinas = new Set(elegidos.map((a) => a.cabina));
    if (cabinas.size > 1) return "Mixed cabins";
    return cabinaDeAsiento(elegidos[0]);
  })();

  return (
    /* ESQUELETO DE PÁGINA — CSS Grid.
       Escritorio: tres rieles a pantalla completa, los laterales fijos y el
       centro fluido, cada uno con su propio fondo de borde a borde.
       Móvil: el grid no se activa y todo cae a una columna en flujo normal. */
    <div className="lg:grid lg:h-dvh lg:grid-cols-[300px_1fr_336px] lg:overflow-hidden">
      <RielVuelo
        vuelo={vuelo}
        elegidos={elegidos}
        cabinaMostrada={cabinaMostrada}
        precioSeleccion={subtotal}
      />

      {/* COLUMNA CENTRAL — Flex vertical.
          En escritorio sólo scrollea el mapa; en móvil scrollea la página. */}
      <main className="flex min-h-dvh flex-col bg-canvas lg:h-full lg:min-h-0 lg:overflow-hidden">
        {/* Los mockups sólo definen 390 y 1440. Entre medias (tablet), estirar
            la maqueta de móvil a 768px deformaría el arco del fuselaje, que es
            un semicírculo de radio = ancho/2. Se limita la columna al ancho de
            teléfono y se centra: a 768 se ve una columna de móvil centrada,
            no una pantalla de móvil deformada. */}
        <div className="mx-auto w-full max-w-[430px] lg:hidden">
          <BarraDeEstadoSimulada />
          <CabeceraMovil elegidos={elegidos.length} maximo={vuelo.maxAsientos} />
          <CardRutaMovil vuelo={vuelo} />

          <div className="px-5 pt-3 pb-1">
            <Leyenda variante="movil" />
          </div>
        </div>

        <div className="hidden shrink-0 flex-col items-center gap-4 pt-6 lg:flex">
          <Contador elegidos={elegidos.length} maximo={vuelo.maxAsientos} conBarra />
          <Leyenda variante="escritorio" />
        </div>

        <div className="scroll-cabina flex justify-center lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pt-4">
          <MapaCabina vuelo={vuelo} seleccion={seleccion} onToggle={alternar} />
        </div>

        <BarraTotalMovil
          total={total}
          elegidos={elegidos}
          nombreDeCabina={cabinaDeAsiento}
          onQuitar={alternar}
        />
      </main>

      <RielSeleccion
        elegidos={elegidos}
        maximo={vuelo.maxAsientos}
        nombreDeCabina={cabinaDeAsiento}
        subtotal={subtotal}
        tasas={tasas}
        total={total}
        onQuitar={alternar}
      />

      <AvisoLimite intento={intento} mensaje={aviso} onCerrar={() => setAviso(null)} />
    </div>
  );
}
