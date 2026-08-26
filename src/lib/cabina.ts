import type { Asiento, Cabina, Vuelo } from "@/lib/tipos";

/** Construye las plazas de una fila, en orden de lectura: columnas de la
 *  izquierda, luego las de la derecha. El pasillo no es un asiento, lo pinta
 *  la rejilla. */
export function asientosDeFila(cabina: Cabina, fila: number): Asiento[] {
  const columnas = [...cabina.columnasIzquierda, ...cabina.columnasDerecha];

  return columnas.map((columna) => {
    const codigo = `${fila}${columna}`;
    return {
      id: `${cabina.id}-${codigo}`,
      codigo,
      cabina: cabina.id,
      fila,
      columna,
      estado: cabina.ocupados.includes(codigo) ? "taken" : "available",
      precio: cabina.precio,
    };
  });
}

/** Clave de la plantilla de rejilla: "2|2", "3|2", "3|3". */
export function formaCabina(cabina: Cabina): string {
  return `${cabina.columnasIzquierda.length}|${cabina.columnasDerecha.length}`;
}

/** Índice id -> asiento, para resolver la selección sin recorrer el avión. */
export function indexarAsientos(vuelo: Vuelo): Map<string, Asiento> {
  const indice = new Map<string, Asiento>();

  for (const cabina of vuelo.cabinas) {
    for (const fila of cabina.filas) {
      for (const asiento of asientosDeFila(cabina, fila)) {
        indice.set(asiento.id, asiento);
      }
    }
  }

  return indice;
}

/** Nombre legible de la cabina, para etiquetas y aria-label. */
export function nombreCabina(vuelo: Vuelo, id: Asiento["cabina"]): string {
  return vuelo.cabinas.find((c) => c.id === id)?.nombre ?? "";
}

/** El mockup escribe los importes como "$0" y "$420": sin decimales. */
export function dolares(monto: number): string {
  return `$${monto.toLocaleString("en-US")}`;
}
