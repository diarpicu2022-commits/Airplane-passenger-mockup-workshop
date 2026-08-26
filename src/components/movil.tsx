import type { Asiento, Vuelo } from "@/lib/tipos";
import { dolares } from "@/lib/cabina";
import { IconoChevron, IconoAjustes, IconoAvion } from "@/components/iconos";
import { Contador } from "@/components/Contador";
import { BotonReservar } from "@/components/BotonReservar";
import { ChipAsiento } from "@/components/ChipAsiento";

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
      className="flex h-12 shrink-0 items-center justify-between px-6 lg:hidden"
      aria-hidden="true"
    >
      <span className="text-[16px] font-medium text-ink tabular-nums">
        9:41
      </span>

      <span className="h-8 w-[118px] rounded-full bg-island" />

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
    <header className="flex shrink-0 items-center justify-between px-5 py-0.5 lg:hidden">
      <button
        type="button"
        aria-label="Volver a los detalles del vuelo"
        className="toque-44 grid size-[34px] cursor-pointer place-items-center rounded-full bg-rail-cold-bottom text-ink transition-transform duration-150 ease-soft active:scale-95"
      >
        <IconoChevron className="size-4" />
      </button>

      <Contador elegidos={elegidos} maximo={maximo} />

      <button
        type="button"
        aria-label="Preferencias de asiento"
        className="toque-44 grid size-[34px] cursor-pointer place-items-center rounded-full bg-rail-cold-bottom text-ink transition-transform duration-150 ease-soft active:scale-95"
      >
        <IconoAjustes className="size-4" />
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
      className="mx-4 flex shrink-0 items-center gap-3 rounded-card bg-linear-to-r from-steel-from to-steel-to px-5 py-3 text-white lg:hidden"
    >
      <div>
        <p className="text-[34px] leading-[1.05] font-extrabold tracking-[-0.01em]">
          {vuelo.origen.codigo}
        </p>
        <p className="text-[14px] text-white/80">{vuelo.origen.ciudad}</p>
      </div>

      {/* Pista de vuelo: la línea punteada de fondo y, encima, el avión que la
          recorre de MUC a LXR. El envoltorio ocupa el ancho completo de la
          pista, así que su translateX al 100% equivale a cruzarla entera. */}
      <div className="relative h-[18px] flex-1" aria-hidden="true">
        <span className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-white/70" />
        <span className="avion-pista absolute inset-y-0 left-0 block w-full">
          <IconoAvion className="size-[18px]" />
        </span>
      </div>

      <div className="text-right">
        <p className="text-[34px] leading-[1.05] font-extrabold tracking-[-0.01em]">
          {vuelo.destino.codigo}
        </p>
        <p className="text-[14px] text-white/80">{vuelo.destino.ciudad}</p>
      </div>
    </section>
  );
}

interface PropsBarraTotal {
  total: number;
  elegidos: Asiento[];
  nombreDeCabina: (asiento: Asiento) => string;
  onQuitar: (asiento: Asiento) => void;
}

/**
 * Barra inferior fija de móvil. `sticky bottom-0` dentro de la columna flex de
 * la página: el mapa scrollea por debajo y la barra nunca abandona la pantalla.
 *
 * Encima del precio van los asientos elegidos, cada uno en un óvalo coral con
 * su X integrada. Aparecen subiendo desde abajo, que es de donde vienen: del
 * mapa que queda justo detrás de la barra.
 */
export function BarraTotalMovil({
  total,
  elegidos,
  nombreDeCabina,
  onQuitar,
}: PropsBarraTotal) {
  return (
    <div className="sticky bottom-0 z-10 border-t border-ink/5 bg-canvas/95 backdrop-blur-sm lg:hidden">
      <div className="mx-auto w-full max-w-[430px] px-4 pt-3 pb-5">
        {elegidos.length > 0 && (
          <ul className="mb-3 flex flex-wrap items-center gap-2">
            {elegidos.map((asiento) => (
              <ChipAsiento
                key={asiento.id}
                asiento={asiento}
                nombreCabina={nombreDeCabina(asiento)}
                variante="ovalo"
                onQuitar={onQuitar}
              />
            ))}
          </ul>
        )}

        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <p className="text-[12px] text-muted">Total</p>
            <p className="text-[28px] leading-none font-extrabold tracking-[-0.02em] text-ink tabular-nums">
              {dolares(total)}
            </p>
          </div>

          <BotonReservar elegidos={elegidos.length} className="flex-1" />
        </div>
      </div>
    </div>
  );
}
