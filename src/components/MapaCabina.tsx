import type { Asiento, Cabina, Vuelo } from "@/lib/tipos";
import { asientosDeFila, formaCabina } from "@/lib/cabina";
import { BotonAsiento } from "@/components/BotonAsiento";

/* ============================================================================
   REJILLA
   El pasillo cambia de sitio entre cabinas: Business es 2|2, First 3|2 y
   Economy 3|3. Se resuelve con una columna extra en el grid-template, no con
   márgenes ni con un hueco falso, porque así el número de fila cae siempre
   centrado en el pasillo (que es donde lo ponen los mapas de asiento reales).

   Los valores salen de var(--seat-size) y var(--aisle-w), definidos una única
   vez en globals.css y redefinidos en el breakpoint lg. Por eso la misma clase
   sirve para móvil y escritorio.

   Las claves están escritas enteras a propósito: Tailwind lee el código
   fuente como texto y no generaría la clase si se compusiera concatenando.
   ========================================================================= */
const REJILLA_POR_FORMA: Record<string, string> = {
  "2|2":
    "grid-cols-[repeat(2,var(--seat-size))_var(--aisle-w)_repeat(2,var(--seat-size))]",
  "3|2":
    "grid-cols-[repeat(3,var(--seat-size))_var(--aisle-w)_repeat(2,var(--seat-size))]",
  "3|3":
    "grid-cols-[repeat(3,var(--seat-size))_var(--aisle-w)_repeat(3,var(--seat-size))]",
};

interface PropsFila {
  cabina: Cabina;
  fila: number;
  seleccion: string[];
  onToggle: (asiento: Asiento) => void;
}

function FilaAsientos({ cabina, fila, seleccion, onToggle }: PropsFila) {
  const asientos = asientosDeFila(cabina, fila);
  const corte = cabina.columnasIzquierda.length;

  return (
    <div
      className={`grid justify-center gap-x-[var(--seat-gap-x)] ${REJILLA_POR_FORMA[formaCabina(cabina)]}`}
    >
      {asientos.slice(0, corte).map((asiento) => (
        <BotonAsiento
          key={asiento.id}
          asiento={asiento}
          nombreCabina={cabina.nombre}
          seleccionado={seleccion.includes(asiento.id)}
          onToggle={onToggle}
        />
      ))}

      {/* Pasillo: el número de fila vive aquí, no en una columna aparte. */}
      <div className="grid place-items-center text-[13px] text-muted lg:text-[15px]">
        {fila}
      </div>

      {asientos.slice(corte).map((asiento) => (
        <BotonAsiento
          key={asiento.id}
          asiento={asiento}
          nombreCabina={cabina.nombre}
          seleccionado={seleccion.includes(asiento.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

interface Props {
  vuelo: Vuelo;
  seleccion: string[];
  onToggle: (asiento: Asiento) => void;
}

export function MapaCabina({ vuelo, seleccion, onToggle }: Props) {
  return (
    /* El borde superior redondeado simula el morro del fuselaje: en el mockup
       es un semicírculo de radio = mitad del ancho del contenedor: 215px en
       escritorio (contenedor de 430px) y la mitad del viewport en móvil.
       rounded-t-[9999px] lo resuelve solo: el algoritmo de radios solapados
       de CSS reescala ambas esquinas hasta que suman el ancho, y deja
       exactamente un semicírculo sea cual sea el ancho. */
    <div className="mapa-cabina w-full rounded-t-[9999px] bg-linear-to-b from-arch to-canvas pt-14 pb-10 lg:w-[430px] lg:pt-[76px]">
      {vuelo.cabinas.map((cabina) => (
        <section key={cabina.id} aria-labelledby={`cabina-${cabina.id}`}>
          <h2
            id={`cabina-${cabina.id}`}
            className="mt-10 mb-5 text-center text-[15px] font-bold text-ink-soft first:mt-0 lg:mt-12 lg:mb-6 lg:text-[17px]"
          >
            {cabina.nombre}
          </h2>

          <div className="flex flex-col gap-y-[var(--seat-gap-y)]">
            {cabina.filas.map((fila) => (
              <FilaAsientos
                key={fila}
                cabina={cabina}
                fila={fila}
                seleccion={seleccion}
                onToggle={onToggle}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
