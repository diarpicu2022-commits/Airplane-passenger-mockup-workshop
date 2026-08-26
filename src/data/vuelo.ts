import type { Cabina, Vuelo } from "@/lib/tipos";

/* ============================================================================
   MUC -> LXR, vuelo No 25.
   El patrón de ocupados de Business (filas 1-4) y First (filas 1-6) está
   transcrito asiento por asiento desde web.png y mobile.png. Economy no es
   visible en ninguno de los dos mockups: su rejilla 3|3 y su ocupación son
   invención documentada (ver anexo).
   ========================================================================= */

const business: Cabina = {
  id: "business",
  nombre: "Business Class",
  precio: 420,
  columnasIzquierda: ["A", "B"],
  columnasDerecha: ["C", "D"],
  filas: [1, 2, 3, 4],
  // fila 1: C D | fila 2: A D | fila 3: libre | fila 4: A B C
  ocupados: ["1C", "1D", "2A", "2D", "4A", "4B", "4C"],
};

const first: Cabina = {
  id: "first",
  nombre: "First Class",
  precio: 310,
  columnasIzquierda: ["A", "B", "C"],
  columnasDerecha: ["D", "E"],
  filas: [1, 2, 3, 4, 5, 6],
  // fila 1: A | fila 3: B C | fila 4: C D | fila 5: B D E | filas 2 y 6 libres
  ocupados: ["1A", "3B", "3C", "4C", "4D", "5B", "5D", "5E"],
};

const economy: Cabina = {
  id: "economy",
  nombre: "Economy Class",
  precio: 150,
  columnasIzquierda: ["A", "B", "C"],
  columnasDerecha: ["D", "E", "F"],
  filas: [1, 2, 3, 4, 5, 6, 7, 8],
  ocupados: [
    "1B",
    "1E",
    "1F",
    "2A",
    "2C",
    "3D",
    "4B",
    "4C",
    "4F",
    "5A",
    "5E",
    "6C",
    "6D",
    "7B",
    "7E",
    "7F",
    "8A",
    "8D",
  ],
};

export const vuelo: Vuelo = {
  origen: { codigo: "MUC", ciudad: "Munich" },
  destino: { codigo: "LXR", ciudad: "London" },
  fecha: "Dec 1, 2026",
  numero: "No 25",
  duracion: "2h 10m",
  maxAsientos: 2,
  tasasPorAsiento: 18,
  cabinas: [business, first, economy],
};
