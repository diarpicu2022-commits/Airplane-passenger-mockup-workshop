"use client"; // Los límites de error tienen que ser Client Components.

/**
 * Estado de error.
 *
 * Mismo criterio que el aviso de tope: qué pasó, qué hacer ahora, en lenguaje
 * de usuario. El `digest` que genera Next se enseña aparte y en pequeño,
 * porque sirve para soporte, no para el pasajero.
 */
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <main className="grid min-h-dvh place-items-center bg-canvas px-6">
      <div className="w-full max-w-[420px] text-center">
        <h1 className="text-[24px] leading-[1.25] font-bold text-ink">
          No pudimos cargar el mapa de cabina
        </h1>

        <p className="mt-3 text-[16px] leading-[1.5] text-muted">
          Tus asientos siguen libres. Vuelve a intentarlo; si sigue fallando, revisa tu conexión y
          entra de nuevo en unos minutos.
        </p>

        <button
          type="button"
          onClick={() => retry()}
          className="mt-8 h-14 w-full cursor-pointer rounded-full bg-coral-deep text-[17px] font-semibold text-white transition-transform duration-150 ease-soft active:scale-[0.98]"
        >
          Reintentar
        </button>

        {error.digest && (
          <p className="mt-6 text-[13px] text-muted">
            Referencia para soporte: <span className="tabular-nums">{error.digest}</span>
          </p>
        )}
      </div>
    </main>
  );
}
