import type { Vuelo } from "@/lib/tipos";
import { dolares } from "@/lib/cabina";
import { IconoChevron, IconoAjustes, IconoAvion } from "@/components/iconos";
import { Contador } from "@/components/Contador";
import { BotonReservar } from "@/components/BotonReservar";

/**
 * Barra de estado de iOS del mockup (hora, Dynamic Island, indicadores).
 *
 * No es interfaz de la aplicación: es el marco del dispositivo que venía
 * dibujado en mobile.png. Se reproduce para que la pantalla coincida con la
 * imagen, se marca `aria-hidden` y no lleva ningún dato real.
 */
export function BarraDeEstadoSimulada() {
  return (
    <div
      className="flex h-14 shrink-0 items-center justify-between px-6 lg:hidden"
      aria-hidden="true"
    >
      <span className="text-[17px] font-medium text-ink tabular-nums">9:41</span>

      <span className="h-9 w-[125px] rounded-full bg-island" />

      <span className="flex items-center gap-[3px]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-3.5 w-[5px] rounded-[1px] bg-ink" />
        ))}
      </span>
    </div>
  );
}

interface PropsCabecera {
  elegidos: number;
  maximo: number;
}

export function CabeceraMovil({ elegidos, maximo }: PropsCabecera) {
  return (
    <header className="flex shrink-0 items-center justify-between px-5 py-2 lg:hidden">
      <button
        type="button"
        aria-label="Volver a los detalles del vuelo"
        className="grid size-11 cursor-pointer place-items-center rounded-full bg-rail-cold-bottom text-ink transition-transform duration-150 ease-soft active:scale-95"
      >
        <IconoChevron className="size-[18px]" />
      </button>

      <Contador elegidos={elegidos} maximo={maximo} />

      <button
        type="button"
        aria-label="Preferencias de asiento"
        className="grid size-11 cursor-pointer place-items-center rounded-full bg-rail-cold-bottom text-ink transition-transform duration-150 ease-soft active:scale-95"
      >
        <IconoAjustes className="size-[18px]" />
      </button>
    </header>
  );
}

/**
 * Card de ruta horizontal, exclusiva de móvil: el riel izquierdo entero
 * (MUC / arco / LXR / fecha / vuelo) no cabe, así que el mockup lo comprime a
 * origen, destino y una línea punteada. La fecha y el número de vuelo se
 * pierden a propósito: en esta pantalla ya no se decide con ellos.
 */
export function CardRutaMovil({ vuelo }: { vuelo: Vuelo }) {
  return (
    <section
      aria-label={`Vuelo de ${vuelo.origen.ciudad} a ${vuelo.destino.ciudad}`}
      className="mx-4 flex shrink-0 items-center gap-3 rounded-card bg-linear-to-r from-steel-from to-steel-to px-5 py-4 text-white lg:hidden"
    >
      <div>
        <p className="text-[26px] leading-[1.1] font-extrabold tracking-[-0.01em]">
          {vuelo.origen.codigo}
        </p>
        <p className="text-[13px] text-white/75">{vuelo.origen.ciudad}</p>
      </div>

      <div className="flex flex-1 items-center gap-2" aria-hidden="true">
        <span className="h-px flex-1 border-t-2 border-dashed border-white/70" />
        <IconoAvion className="size-[18px] shrink-0" />
        <span className="h-px flex-1 border-t-2 border-dashed border-white/70" />
      </div>

      <div className="text-right">
        <p className="text-[26px] leading-[1.1] font-extrabold tracking-[-0.01em]">
          {vuelo.destino.codigo}
        </p>
        <p className="text-[13px] text-white/75">{vuelo.destino.ciudad}</p>
      </div>
    </section>
  );
}

interface PropsBarraTotal {
  total: number;
  elegidos: number;
}

/**
 * Barra inferior fija de móvil. `sticky bottom-0` dentro de la columna flex de
 * la página: el mapa scrollea por debajo y la barra nunca abandona la pantalla.
 */
export function BarraTotalMovil({ total, elegidos }: PropsBarraTotal) {
  return (
    <div className="sticky bottom-0 z-10 flex items-center gap-4 border-t border-ink/5 bg-canvas/95 px-4 pt-3 pb-5 backdrop-blur-sm lg:hidden">
      <div className="shrink-0">
        <p className="text-[13px] text-muted">Total</p>
        <p className="text-[30px] leading-none font-extrabold tracking-[-0.02em] text-ink tabular-nums">
          {dolares(total)}
        </p>
      </div>

      <BotonReservar elegidos={elegidos} className="flex-1" />
    </div>
  );
}
