interface Props {
  elegidos: number;
  className?: string;
}

/**
 * CTA de la pantalla.
 *
 * El mockup sólo enseña el estado apagado (beige cálido, texto gris, "Select a
 * seat"). El estado activo no existía, así que se resuelve con el mismo coral
 * del acento, oscurecido lo justo para que el texto blanco pase AA (4.50:1);
 * el coral del mockup con blanco encima se queda en 3.02:1.
 *
 * El rótulo también cambia: "Select a seat" es una instrucción, y deja de ser
 * cierta en cuanto hay un asiento elegido.
 */
export function BotonReservar({ elegidos, className = "" }: Props) {
  const activo = elegidos > 0;

  const rotulo = !activo
    ? "Select a seat"
    : `Continue with ${elegidos} ${elegidos === 1 ? "seat" : "seats"}`;

  return (
    <button
      type="button"
      disabled={!activo}
      className={`h-14 w-full cursor-pointer rounded-full text-[17px] font-semibold transition-transform duration-150 ease-soft active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100 ${
        activo ? "bg-coral-deep text-white" : "bg-peach-100 text-cta-off-ink"
      } ${className}`}
    >
      {rotulo}
    </button>
  );
}
