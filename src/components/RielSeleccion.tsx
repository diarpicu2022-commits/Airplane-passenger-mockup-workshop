import type { Asiento } from "@/lib/tipos";
import { dolares } from "@/lib/cabina";
import { BotonReservar } from "@/components/BotonReservar";

interface FilaProps {
  etiqueta: string;
  valor: string;
  tono?: "suave" | "fuerte";
}

function FilaResumen({ etiqueta, valor, tono = "suave" }: FilaProps) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-[16px] text-muted">{etiqueta}</dt>
      <dd
        className={`text-[16px] font-bold tabular-nums ${
          tono === "fuerte" ? "text-ink" : "text-ink-soft"
        }`}
      >
        {valor}
      </dd>
    </div>
  );
}

interface Props {
  elegidos: Asiento[];
  maximo: number;
  nombreDeCabina: (asiento: Asiento) => string;
  subtotal: number;
  tasas: number;
  total: number;
  onQuitar: (asiento: Asiento) => void;
}

/**
 * Riel derecho, sólo escritorio.
 *
 * El mockup sólo dibuja el estado vacío. La lista con selección conserva su
 * misma retícula: una tarjeta blanca por asiento con el código a la izquierda
 * y el precio a la derecha, sin introducir color nuevo.
 */
export function RielSeleccion({
  elegidos,
  maximo,
  nombreDeCabina,
  subtotal,
  tasas,
  total,
  onQuitar,
}: Props) {
  const vacio = elegidos.length === 0;

  return (
    <aside className="hidden h-full flex-col bg-linear-to-b from-rail-warm-top to-rail-warm-bottom px-8 pt-9 pb-8 lg:flex">
      <h2 className="text-[19px] font-bold text-ink">Your selection</h2>

      {vacio ? (
        <p className="mt-6 grid h-[90px] place-items-center rounded-[20px] border-2 border-dashed border-coral-dash px-4 text-center text-[16px] leading-[1.45] text-muted-warm">
          Pick up to {maximo} seats
          <br />
          from the cabin map
        </p>
      ) : (
        <ul className="mt-6 flex flex-col gap-2">
          {elegidos.map((asiento) => (
            <li
              key={asiento.id}
              className="flex items-center justify-between gap-3 rounded-chip bg-white px-4 py-3"
            >
              <span className="min-w-0">
                <span className="block text-[16px] font-bold text-ink tabular-nums">
                  {asiento.codigo}
                </span>
                <span className="block truncate text-[13px] text-muted">
                  {nombreDeCabina(asiento)}
                </span>
              </span>

              <span className="flex items-center gap-3">
                <span className="text-[15px] font-bold text-ink tabular-nums">
                  {dolares(asiento.precio)}
                </span>
                <button
                  type="button"
                  onClick={() => onQuitar(asiento)}
                  aria-label={`Quitar el asiento ${asiento.codigo} de tu selección`}
                  className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-muted transition-colors duration-150 hover:bg-peach-50 hover:text-coral-ink"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    className="size-4"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* El hueco del mockup entre el estado vacío y el resumen. */}
      <div className="flex-1" />

      <dl className="flex flex-col gap-5">
        <FilaResumen
          etiqueta="Seats"
          valor={elegidos.length === 0 ? "None" : elegidos.map((a) => a.codigo).join(", ")}
        />
        <FilaResumen etiqueta="Taxes & fees" valor={dolares(tasas)} tono="fuerte" />
      </dl>

      {subtotal > 0 && (
        <p className="mt-5 flex items-baseline justify-between text-[14px] text-muted">
          <span>Seats subtotal</span>
          <span className="font-bold tabular-nums text-ink-soft">{dolares(subtotal)}</span>
        </p>
      )}

      <hr className="my-7 border-0 border-t border-ink/10" />

      <div className="flex items-center justify-between gap-4">
        <span className="text-[16px] text-muted">Total</span>
        {/* Cifra de decisión: se lee para pagar, va en el tono más alto
            disponible (13.7:1 sobre el fondo durazno, AAA). */}
        <span className="text-[40px] leading-none font-extrabold tracking-[-0.02em] text-ink tabular-nums">
          {dolares(total)}
        </span>
      </div>

      <BotonReservar elegidos={elegidos.length} className="mt-6" />
    </aside>
  );
}
