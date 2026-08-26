/**
 * Estado de carga.
 *
 * El mockup no lo cubría. Se resuelve con un esqueleto que repite la forma
 * final (tres rieles, arco del fuselaje, bloques de asientos) en lugar de un
 * spinner: así el salto al contenido real no mueve el layout.
 */
export default function Loading() {
  return (
    <div
      className="lg:grid lg:h-dvh lg:grid-cols-[300px_1fr_336px] lg:overflow-hidden"
      role="status"
      aria-label="Cargando el mapa de cabina"
    >
      <div className="hidden h-full flex-col gap-6 bg-linear-to-b from-rail-cold-top to-rail-cold-bottom p-[30px] lg:flex">
        <div className="esqueleto h-9 w-40 rounded-full bg-white/80" />
        <div className="esqueleto h-[179px] w-full rounded-card bg-white/80" />
        <div className="esqueleto my-auto h-52 w-full rounded-card bg-white/60" />
        <div className="esqueleto h-[62px] w-full rounded-chip bg-white/80" />
      </div>

      <div className="flex min-h-dvh flex-col items-center bg-canvas pt-10 lg:h-full lg:min-h-0">
        <div className="esqueleto h-4 w-56 rounded-full bg-peach-100" />
        <div className="esqueleto mt-7 h-5 w-72 rounded-full bg-peach-100" />

        <div className="mapa-cabina mt-8 w-full rounded-t-[9999px] bg-linear-to-b from-arch to-canvas pt-14 lg:w-[430px] lg:pt-[76px]">
          {[0, 1, 2].map((bloque) => (
            <div key={bloque} className="mt-10 flex flex-col items-center gap-[var(--seat-gap-y)]">
              <div className="esqueleto mb-3 h-4 w-32 rounded-full bg-taken" />
              {[0, 1, 2, 3].map((fila) => (
                <div key={fila} className="flex gap-[var(--seat-gap-x)]">
                  {[0, 1, 2, 3].map((asiento) => (
                    <div
                      key={asiento}
                      className="esqueleto size-[var(--seat-size)] rounded-seat bg-taken"
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="hidden h-full flex-col gap-4 bg-linear-to-b from-rail-warm-top to-rail-warm-bottom px-8 pt-9 pb-8 lg:flex">
        <div className="esqueleto h-6 w-40 rounded-full bg-peach-100" />
        <div className="esqueleto h-[90px] w-full rounded-[20px] bg-peach-100" />
        <div className="esqueleto mt-auto h-14 w-full rounded-full bg-peach-100" />
      </div>
    </div>
  );
}
