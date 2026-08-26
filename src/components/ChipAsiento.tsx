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
 * Las dos variantes comparten color: relleno coral `--color-coral`, el mismo
 * de la muestra "Selected" y del propio asiento en el mapa, y texto en
 * `--color-ink` (4,69:1, AA). Sólo cambia la forma: óvalo en móvil, rectángulo
 * de esquinas suaves en escritorio.
 *
 * Ambas entran con `entra-desde-abajo`: suben a su sitio como si emergieran de
 * la fila del mapa de la que salen.
 */
export function ChipAsiento({ asiento, nombreCabina, variante, onQuitar }: Props) {
  const esOvalo = variante === "ovalo";

  return (
    <li
      className={`entra-desde-abajo flex shrink-0 items-center bg-coral text-ink ${
        esOvalo ? "gap-1.5 rounded-full py-1.5 pr-1.5 pl-3.5" : "gap-3 rounded-chip py-2.5 pr-2.5 pl-4"
      }`}
    >
      {esOvalo ? (
        <span className="text-[14px] font-bold tabular-nums">{asiento.codigo}</span>
      ) : (
        <span className="min-w-0 flex-1">
          <span className="block text-[14px] font-bold tabular-nums">{asiento.codigo}</span>
          <span className="block truncate text-[12px] text-ink/70">{nombreCabina}</span>
        </span>
      )}

      {!esOvalo && (
        <span className="text-[14px] font-bold tabular-nums">{dolares(asiento.precio)}</span>
      )}

      {/* La X va integrada en la propia forma, no fuera. */}
      <button
        type="button"
        onClick={() => onQuitar(asiento)}
        aria-label={`Quitar el asiento ${asiento.codigo} de tu selección`}
        className={`toque-44 grid shrink-0 place-items-center rounded-full text-ink/75 transition-colors duration-150 hover:bg-ink/10 hover:text-ink ${
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
