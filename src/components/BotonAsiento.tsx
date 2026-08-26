import type { Asiento } from "@/lib/tipos";
import { dolares } from "@/lib/cabina";

interface Props {
  asiento: Asiento;
  nombreCabina: string;
  seleccionado: boolean;
  onToggle: (asiento: Asiento) => void;
}

/**
 * Una plaza del mapa.
 *
 * Los tres estados no se distinguen sólo por color:
 *  - disponible: contorno coral, relleno blanco
 *  - elegido:    relleno coral macizo, sin contorno
 *  - ocupado:    relleno gris plano, sin contorno y `disabled`
 * El par contorno/relleno es la señal redundante (la misma que usan los mapas
 * de asiento reales); el color sólo la refuerza.
 */
export function BotonAsiento({ asiento, nombreCabina, seleccionado, onToggle }: Props) {
  const ocupado = asiento.estado === "taken";

  const estilo = ocupado
    ? "bg-taken text-taken-ink"
    : seleccionado
      ? "bg-coral text-ink shadow-seat-on"
      : // El contorno va como box-shadow interior y no como border: el border
        // encoge la caja de relleno y dejaba al asiento libre con MENOS área
        // activa que al ocupado. `--shadow-seat` reúne ese trazo y el halo
        // coral en una sola declaración; la geometría queda uniforme.
        "bg-white text-coral-ink shadow-seat";

  const situacion = ocupado ? "ocupado" : seleccionado ? "elegido" : "disponible";

  return (
    <button
      type="button"
      disabled={ocupado}
      aria-pressed={ocupado ? undefined : seleccionado}
      aria-label={`Asiento ${asiento.codigo}, ${nombreCabina}, ${situacion}, ${dolares(asiento.precio)}`}
      onClick={() => onToggle(asiento)}
      className={`asiento relative grid size-[var(--seat-size)] place-items-center rounded-seat text-[11px] font-medium transition-transform duration-150 ease-soft lg:text-[13px] ${estilo} ${
        ocupado ? "cursor-not-allowed" : "cursor-pointer active:scale-95"
      }`}
    >
      {/* La letra es adorno visual: el lector de pantalla ya recibe el
          código completo por aria-label. */}
      <span aria-hidden="true">{asiento.columna}</span>
    </button>
  );
}
