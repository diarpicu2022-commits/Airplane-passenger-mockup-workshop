import type { Asiento } from "@/lib/tipos";
import { dolares } from "@/lib/cabina";
import { BotonReservar } from "@/components/BotonReservar";
import { ChipAsiento } from "@/components/ChipAsiento";

interface FilaProps {
  etiqueta: string;
  valor: string;
  tono?: "suave" | "fuerte";
}

function FilaResumen({ etiqueta, valor, tono = "suave" }: FilaProps) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-[14px] text-muted">{etiqueta}</dt>
      <dd
        className={`text-[14px] font-bold tabular-nums ${
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
    <aside className="hidden h-full flex-col bg-linear-to-b from-rail-warm-top to-rail-warm-bottom px-8 pt-8 pb-8 lg:flex">
      <h2 className="text-[17px] font-bold text-ink">Your selection</h2>

      {vacio ? (
        <p className="mt-5 grid h-[90px] place-items-center rounded-[20px] border-2 border-dashed border-coral-dash px-4 text-center text-[14px] leading-[1.45] text-muted-warm">
          Pick up to {maximo} seats
          <br />
          from the cabin map
        </p>
      ) : (
        <ul className="mt-5 flex flex-col gap-2">
          {elegidos.map((asiento) => (
            <ChipAsiento
              key={asiento.id}
              asiento={asiento}
              nombreCabina={nombreDeCabina(asiento)}
              variante="tarjeta"
              onQuitar={onQuitar}
            />
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
        <span className="text-[14px] text-muted">Total</span>
        {/* Cifra de decisión: se lee para pagar, va en el tono más alto
            disponible (13.7:1 sobre el fondo durazno, AAA). */}
        <span className="text-[38px] leading-none font-extrabold tracking-[-0.02em] text-ink tabular-nums">
          {dolares(total)}
        </span>
      </div>

      <BotonReservar elegidos={elegidos.length} className="mt-6" />
    </aside>
  );
}
