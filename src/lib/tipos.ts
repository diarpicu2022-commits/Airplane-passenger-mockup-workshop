/** Modelo de dominio de la pantalla de selección de asiento. */

export type IdCabina = "business" | "first" | "economy";

/** Estado que puede tener una plaza en el mapa. `selected` es derivado del
 *  estado de UI, no del dato, por eso no vive en el modelo. */
export type EstadoAsiento = "available" | "taken";

export interface Asiento {
  /** Único en todo el avión. El número de fila se repite entre cabinas
   *  (Business fila 1 y First fila 1 coexisten), así que el id lleva cabina. */
  id: string;
  /** Lo que se pinta dentro del cuadro y en los slots del riel: "1A". */
  codigo: string;
  cabina: IdCabina;
  fila: number;
  columna: string;
  estado: EstadoAsiento;
  precio: number;
}

export interface Cabina {
  id: IdCabina;
  /** Rótulo tal cual aparece en el mockup. */
  nombre: string;
  precio: number;
  /** Columnas antes del pasillo. Business: ["A","B"]; First: ["A","B","C"]. */
  columnasIzquierda: string[];
  /** Columnas después del pasillo. */
  columnasDerecha: string[];
  filas: number[];
  /** Códigos ocupados, p. ej. ["1C", "1D", "2A"]. */
  ocupados: string[];
}

export interface Vuelo {
  origen: { codigo: string; ciudad: string };
  destino: { codigo: string; ciudad: string };
  fecha: string;
  numero: string;
  duracion: string;
  /** Tope de plazas por reserva. El contador del mockup dice 0/2. */
  maxAsientos: number;
  /** Impuestos y cargos por asiento, en dólares. */
  tasasPorAsiento: number;
  cabinas: Cabina[];
}
