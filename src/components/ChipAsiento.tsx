import type { Asiento } from "@/lib/tipos";
import { dolares } from "@/lib/cabina";

interface Props {
  asiento: Asiento;
  nombreCabina: string;
  /** `ovalo` en la barra inferior de móvil, `tarjeta` en el riel derecho. */
  variante: "ovalo" | "tarjeta";
  onQuitar: (asiento: Asiento) => void;
}

/**
 * El asiento elegido, ya fuera del mapa.
 *
 * Segunda iteración pedida por el usuario: fondo blanco con trazo coral y
 * sombra coral (`--shadow-coral`), textos en negrita, y el código del asiento
 * dentro de un recuadro naranja con texto blanco. El recuadro usa
 * `--color-coral-deep` y no el coral puro: es el único tono de la paleta que
 * da AA con blanco (4,50:1), el mismo del CTA activo.
 *
 * Las dos variantes sólo cambian de forma: óvalo en móvil, rectángulo de
 * esquinas suaves en escritorio. Ambas entran con `entra-desde-abajo`: suben a
 * su sitio como si emergieran de la fila del mapa de la que salen.
 */
export function ChipAsiento({ asiento, nombreCabina, variante, onQuitar }: Props) {
  const esOvalo = variante === "ovalo";

  return (
    <li
      className={`entra-desde-abajo flex shrink-0 items-center border-2 border-coral bg-white text-ink shadow-coral ${
        esOvalo ? "gap-1.5 rounded-full py-1 pr-1.5 pl-1" : "gap-3 rounded-chip py-2 pr-2.5 pl-2"
      }`}
    >
      {/* El código, en su recuadro naranja con texto blanco. */}
      <span
        className={`grid shrink-0 place-items-center bg-coral-deep font-bold text-white tabular-nums ${
          esOvalo ? "rounded-full px-2.5 py-1 text-[13px]" : "rounded-[10px] px-2.5 py-1.5 text-[14px]"
        }`}
      >
        {asiento.codigo}
      </span>

      {!esOvalo && (
        <>
          <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-muted-warm">
            {nombreCabina}
          </span>
          <span className="text-[14px] font-bold tabular-nums">{dolares(asiento.precio)}</span>
        </>
      )}

      {/* La X va integrada en la propia forma, no fuera. */}
      <button
        type="button"
        onClick={() => onQuitar(asiento)}
        aria-label={`Quitar el asiento ${asiento.codigo} de tu selección`}
        className={`toque-44 grid shrink-0 place-items-center rounded-full text-ink/75 transition-colors duration-150 hover:bg-coral/15 hover:text-ink ${
          esOvalo ? "size-6" : "size-7"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          className={esOvalo ? "size-3" : "size-3.5"}
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </li>
  );
}
