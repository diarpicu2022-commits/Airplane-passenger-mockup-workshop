import type { Asiento, Vuelo } from "@/lib/tipos";
import { dolares } from "@/lib/cabina";
import { IconoChevron, IconoAvion, IconoCabina } from "@/components/iconos";

/** El mockup parte "Business Class" en dos líneas dentro de la card estrecha.
 *  Se reproduce partiendo por el último espacio, así vale igual para
 *  "First Class" y "Economy Class". */
function tituloEnDosLineas(nombre: string) {
  const corte = nombre.lastIndexOf(" ");
  if (corte === -1) return [nombre, ""];
  return [nombre.slice(0, corte), nombre.slice(corte + 1)];
}

function RanuraAsiento({ asiento }: { asiento?: Asiento }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[13px] text-muted">Seat</span>
      {asiento ? (
        <span className="text-[15px] font-bold text-ink tabular-nums">{asiento.codigo}</span>
      ) : (
        /* Placeholder del mockup: un guion grueso, no un texto vacío. */
        <span className="h-1 w-6 rounded-[2px] bg-ink" aria-hidden="true" />
      )}
    </div>
  );
}

function ArcoRuta({ duracion }: { duracion: string }) {
  return (
    <div className="relative h-14 w-full" role="img" aria-label={`Duración del vuelo: ${duracion}`}>
      <svg viewBox="0 0 240 56" fill="none" className="h-full w-full" aria-hidden="true">
        {/* Trayecto punteado. Los guiones son largos y con punta redonda,
            como en el mockup. */}
        <path
          d="M 7 48 Q 107.5 -34.5 234 49"
          stroke="var(--color-coral-line)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="9 8"
        />
        <circle cx="7" cy="48" r="4.5" fill="var(--color-coral)" />
        <circle cx="234" cy="49" r="4.5" fill="var(--color-coral)" />
      </svg>

      {/* El avión flota por encima del extremo derecho, separado del trazo. */}
      <IconoAvion className="absolute top-0 right-1 size-[18px] text-coral" />

      {/* La etiqueta se alinea a la derecha, a la altura de los puntos. */}
      <span className="absolute right-0 bottom-0 text-[13px] text-muted tabular-nums">
        {duracion}
      </span>
    </div>
  );
}

function Chip({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex flex-1 flex-col gap-1.5 rounded-chip bg-white px-4 py-3">
      <span className="text-[11px] font-medium tracking-[0.08em] text-muted uppercase">
        {etiqueta}
      </span>
      <span className="text-[16px] font-bold text-ink">{valor}</span>
    </div>
  );
}

interface Props {
  vuelo: Vuelo;
  elegidos: Asiento[];
  /** Nombre de cabina que encabeza la card de tarifa. */
  cabinaMostrada: string;
  precioSeleccion: number;
}

/**
 * Riel izquierdo, sólo escritorio.
 * Columna flex: cabecera arriba, card y ruta en el medio, chips abajo del todo.
 */
export function RielVuelo({ vuelo, elegidos, cabinaMostrada, precioSeleccion }: Props) {
  const [linea1, linea2] = tituloEnDosLineas(cabinaMostrada);

  return (
    <aside className="hidden h-full flex-col bg-linear-to-b from-rail-cold-top to-rail-cold-bottom px-[30px] py-[30px] lg:flex">
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Volver a los detalles del vuelo"
          className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full bg-white text-ink transition-transform duration-150 ease-soft active:scale-95"
        >
          <IconoChevron className="size-4" />
        </button>
        <h1 className="text-[16px] font-semibold text-muted">Flight details</h1>
      </div>

      {/* Card de tarifa */}
      <div className="mt-8 rounded-card bg-white p-5 shadow-[0_10px_30px_rgba(37,43,57,0.05)]">
        <div className="flex items-center gap-2">
          <span className="grid size-10 shrink-0 place-items-center rounded-[13px] bg-peach-50">
            <IconoCabina className="size-[13px] text-coral" />
          </span>
          <p className="text-[15px] leading-[1.3] font-bold text-ink">
            {linea1}
            <br />
            {linea2}
          </p>
        </div>

        <div className="mt-5 flex gap-7">
          <RanuraAsiento asiento={elegidos[0]} />
          <RanuraAsiento asiento={elegidos[1]} />
        </div>

        <p className="mt-6 text-[15px] text-muted">
          Price:{" "}
          <span className="font-bold text-coral-ink tabular-nums">{dolares(precioSeleccion)}</span>
        </p>
      </div>

      {/* Ruta. mt-auto/mb-auto centra el bloque en el espacio sobrante. */}
      <div className="my-auto py-6">
        <p className="text-[56px] leading-[1] font-extrabold tracking-[-0.02em] text-ink">
          {vuelo.origen.codigo}
        </p>
        <p className="mt-1 text-[15px] text-muted">{vuelo.origen.ciudad}</p>

        <div className="my-6">
          <ArcoRuta duracion={vuelo.duracion} />
        </div>

        <p className="text-[56px] leading-[1] font-extrabold tracking-[-0.02em] text-ink">
          {vuelo.destino.codigo}
        </p>
        <p className="mt-1 text-[15px] text-muted">{vuelo.destino.ciudad}</p>
      </div>

      <div className="flex gap-2.5">
        <Chip etiqueta="Date" valor={vuelo.fecha} />
        <Chip etiqueta="Flight" valor={vuelo.numero} />
      </div>
    </aside>
  );
}
