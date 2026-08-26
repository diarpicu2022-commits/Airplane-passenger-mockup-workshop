interface Props {
  elegidos: number;
  maximo: number;
  /** Escritorio muestra contador + barra; móvil sólo el contador. */
  conBarra?: boolean;
}

/**
 * "0/2" y su barra de progreso.
 *
 * El texto es la fuente de verdad para el lector de pantalla; la barra queda
 * como refuerzo visual (aria-hidden) para no anunciar el mismo dato dos veces.
 */
export function Contador({ elegidos, maximo, conBarra = false }: Props) {
  const avance = (elegidos / maximo) * 100;

  return (
    <div className="flex items-center gap-5">
      <p className="text-[14px] tabular-nums text-muted">
        <span className="sr-only">Asientos elegidos: </span>
        {elegidos}/{maximo}
      </p>

      {conBarra && (
        <div className="h-1.5 w-[182px] overflow-hidden rounded-full bg-peach-100" aria-hidden="true">
          {/* Sólo se anima transform: la barra mide siempre el 100% y se
              escala en X desde el borde izquierdo (Kowalski). */}
          <div
            className="h-full origin-left rounded-full bg-coral transition-transform duration-200 ease-soft"
            style={{ transform: `scaleX(${avance / 100})` }}
          />
        </div>
      )}
    </div>
  );
}
