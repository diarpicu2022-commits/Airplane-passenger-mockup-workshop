interface Props {
  /** Cambia en cada intento fallido para que el lector de pantalla lo repita. */
  intento: number;
  mensaje: string | null;
  onCerrar: () => void;
}

/**
 * Aviso de "ya llegaste al tope".
 *
 * Anatomía de la clase: qué pasó + qué hacer ahora, en lenguaje de usuario y
 * sin códigos internos. No es un `alert()` ni un diálogo del navegador: no
 * roba el foco, no bloquea el mapa y se puede ignorar.
 *
 * Se dibuja por encima del contenido (`fixed`) en los dos breakpoints para que
 * aparecer y desaparecer no mueva ni un píxel del mapa de cabina.
 */
export function AvisoLimite({ intento, mensaje, onCerrar }: Props) {
  return (
    <div
      className="pointer-events-none fixed inset-x-4 bottom-28 z-20 flex justify-center lg:inset-x-auto lg:top-[104px] lg:right-[336px] lg:bottom-auto lg:left-[300px]"
      aria-live="polite"
      role="status"
    >
      {mensaje && (
        <p
          key={intento}
          className="aviso-entra pointer-events-auto flex max-w-[380px] items-start gap-3 rounded-chip bg-ink px-4 py-3 text-[14px] leading-[1.4] text-white shadow-[0_12px_32px_rgba(37,43,57,0.22)]"
        >
          <span>{mensaje}</span>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar el aviso"
            className="-my-1 -mr-1 grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-white/70 transition-colors duration-150 hover:text-white"
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
        </p>
      )}
    </div>
  );
}
