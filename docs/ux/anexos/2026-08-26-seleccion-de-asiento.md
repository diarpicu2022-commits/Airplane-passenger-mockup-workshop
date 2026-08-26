# Anexo UX — Selección de asiento (MUC → LXR) · 2026-08-26

Reproducción de alta fidelidad de dos mockups existentes (`web.png`, `mobile.png`).
La dirección visual **no** se diseña aquí: se mide, se transcribe y se justifica
cada desviación. Este documento se centra por tanto en medición, estructura,
estados que el mockup no cubría y accesibilidad.

---

## 1. Encuadre

**Quién.** Un pasajero que ya compró el vuelo No 25 (Munich → Londres, 1 dic
2026) y está en el último paso antes de pagar: elegir hasta dos asientos.

**Qué decide.** Dos cosas a la vez, y por eso la pantalla es densa: *dónde me
siento* (ventanilla/pasillo, delante/detrás, juntos o separados) y *cuánto
cuesta* (Business $420, First $310, Economy $150, más $18 de tasas por plaza).
La cifra del total y el mapa tienen que verse en el mismo golpe de vista.

**Condiciones reales.** Dos situaciones opuestas:

- Escritorio, sentado, sin prisa, comparando plazas. Cabe todo: ficha del vuelo,
  mapa y resumen de compra en tres rieles simultáneos.
- Móvil, de pie, una mano, a menudo en el aeropuerto o en datos móviles. El
  objetivo mide 26 px porque el mapa tiene que caber, y el pulgar no. Ahí está
  la tensión de esta pantalla.

**Restricción dominante.** Fidelidad al mockup, por encima de mi criterio
estético: el usuario pidió literalmente "tal cual está en las imágenes". Toda
decisión propia queda confinada a (a) lo que el mockup no muestra y (b) mínimos
de accesibilidad, y en ambos casos se registra abajo.

---

## 2. Método de medición

Los mockups se midieron con Pillow, no a ojo:

- Perfiles de tinta por columnas y filas para sacar cajas de asiento, pasillos,
  anchos de riel y bandas de línea de texto.
- Histograma de color y muestreo puntual para los hex.
- Barrido del borde superior del asiento para deducir el radio (`inset(dy)`
  contra la ecuación del rectángulo redondeado): sale **r = 22 px de mockup = 11
  css**, se usa **10 px**.

**Escala.** `web.png` es 2615 × 1393 px y `mobile.png` 751 × 1567 px. La caja de
asiento mide 68 px en el primero y 52 px en el segundo; ambas son pares y dan
números redondos al dividir entre 2 (34 y 26). Se concluye que los dos mockups
son exportaciones **@2x**: el de escritorio equivale a ~1308 css de ancho y el de
móvil a ~375 css. Los valores absolutos (asiento, gaps, radios, tipos) se toman
tal cual de esa escala; los rieles laterales se fijan en px y el centro es
fluido, que es lo que haría una implementación responsive real. A 1440 px el
resultado es el mockup con la columna central ~130 px más ancha.

**Columnas medidas** (frontera de color a `y = 665` css): riel izquierdo 0–298,
centro 299–989, riel derecho 990–~1321. Implementado como
`lg:grid-cols-[300px_1fr_336px]`.

---

## 3. Referentes consultados

| Fuente | Estado | Fecha |
|---|---|---|
| Pinterest | Accesible (sesión del usuario) | 2026-08-26 |
| Emil Kowalski, *Animations on the Web* | Accesible | 2026-08-26 |
| Taste Skill (`design-taste-frontend` v2) | Cargada | 2026-08-26 |
| ui.aceternity.com | Accesible | 2026-08-26 |
| motionsites.ai | Accesible, poco útil | 2026-08-26 |
| styles.refero.design | Accesible pero sin categorías de patrón | 2026-08-26 |
| mobbin.com | **No accesible** | 2026-08-26 |
| Playwright | Usado en verificación (§8) | 2026-08-26 |

### Pinterest — `co.pinterest.com/search/pins/?q=airline seat map ui design`
Cuatro observaciones accionables, todas confirmatorias del mockup:

1. En los mapas de asiento de producción (easyJet, Lufthansa, Delta, mapas
   técnicos tipo AeroLOPA) **el número de fila vive en el pasillo**, entre los
   dos bloques de plazas. Confirma resolver el pasillo como una columna real de
   la rejilla en vez de como un margen: el número cae centrado solo.
2. La leyenda usa **la misma forma que el asiento** (cuadro redondeado), nunca un
   punto ni una línea. Adoptado: el `MUESTRA` de `Leyenda.tsx` repite radio y
   grosor de contorno del asiento.
3. Señal de estado: los ocupados van **rellenos y sin contorno**; los
   seleccionables van **contorneados y sin relleno**. La inversión
   relleno/contorno es la señal primaria y el color sólo la refuerza. Adoptado
   como la redundancia no cromática exigida (§7).
4. El arco de morro de fuselaje es **convención real**, no adorno: orienta al
   pasajero hacia el frente de cabina. Se mantiene y se hace semicírculo exacto.

### Emil Kowalski — `emilkowal.ski/ui/great-animations`
- Duración por debajo de 300 ms. Aquí: 150 ms en pulsaciones, 200 ms en la barra
  de progreso y en la entrada del aviso.
- Animar sólo `transform` y `opacity` (única etapa de composición). Aplicado: la
  barra de progreso no anima `width`, anima `scaleX` con `origin-left`.
- Preferir transiciones CSS por ser interrumpibles a mitad de camino. Aplicado:
  no hay JS de animación en toda la pantalla.
- **"Nunca animes acciones iniciadas por teclado"**. Por eso el `active:scale-95`
  del asiento va en `:active` (puntero) y no en un estado que dispare también al
  pulsar Enter.
- `prefers-reduced-motion` obligatorio → bloque global en `globals.css`.

### Taste Skill (`design-taste-frontend` v2)
Su §13 declara fuera de alcance el "product UI denso", que es exactamente esta
pantalla, así que se aplican sólo las partes transversales:
- §4.5 ciclo completo de estados → resueltos carga, vacío, error, límite y activo (§6).
- "Button contrast check" → auditado en §7, es lo que destapó el fallo del CTA activo.
- "Shape consistency lock" → escala de radios cerrada a tres valores (§5).
- Cero em-dash en texto visible. Cumplido.
- Se **ignora** deliberadamente su prohibición de iconos SVG propios: el usuario
  pidió explícitamente SVG inline y ninguna dependencia nueva. La instrucción del
  usuario manda sobre la skill.

### ui.aceternity.com/components
`Stateful Button` (estados carga/éxito en el propio botón) confirma resolver el
CTA como **un solo botón que cambia de estado y de rótulo**, en lugar de
intercambiar dos botones distintos. Se descarta su capa de animación: depende de
`motion/react` y aquí no se añaden dependencias.

### motionsites.ai
Catálogo de prompts de plantillas con "fondos animados". No documenta duraciones
ni curvas y su repertorio (agencia, portfolio, ecommerce) no aplica a un mapa de
cabina. **Descartado como referente para esta pantalla**; se registra la consulta.

### styles.refero.design
Responde como catálogo de "DESIGN.md para agentes", no con las categorías de
patrón (estados vacíos, tablas, settings) que se buscaban. No aportó nada
accionable para esta pantalla.

### mobbin.com — no accesible
`mobbin.com/search/ios/screens?...seat selection` redirige a la portada con
"Log in / Join for free": **la sesión del usuario no está iniciada**. Crear
cuenta o introducir credenciales está fuera de lo que puedo hacer. Se registra
como no accesible; su hueco lo cubre Pinterest, que devolvió mapas de asiento de
producción reales.

---

## 4. Estructura: Grid y Flex

Clase previa de la asignatura: Grid y Flex en TailwindCSS. El reparto es
deliberado y cada uso se eligió por lo que hace bien, no por costumbre.

### Grid para el esqueleto de página
```
lg:grid lg:h-dvh lg:grid-cols-[300px_1fr_336px] lg:overflow-hidden
```
Rieles fijos, centro fluido, y cada columna con su propio fondo de borde a borde
en vertical — que es justo lo que Grid da gratis y Flex obligaría a apuntalar con
`h-full` por todas partes. Por debajo de `lg` el grid sencillamente no se
activa y todo cae a una columna en flujo normal: **no hay un segundo layout que
mantener**.

### Grid para las filas de asientos
El pasillo cambia de sitio entre cabinas: Business es 2|2, First 3|2 y Economy
3|3. Resuelto con una columna extra en el `grid-template`:

```
"2|2" -> grid-cols-[repeat(2,var(--seat-size))_var(--aisle-w)_repeat(2,var(--seat-size))]
"3|2" -> grid-cols-[repeat(3,var(--seat-size))_var(--aisle-w)_repeat(2,var(--seat-size))]
"3|3" -> grid-cols-[repeat(3,var(--seat-size))_var(--aisle-w)_repeat(3,var(--seat-size))]
```

Con `var()` en la plantilla, **la misma clase sirve en los dos breakpoints**: sólo
cambian las variables, definidas una vez en `.mapa-cabina` de `globals.css`
(26/30/6/8 px en móvil, 34/38/8/9 px en escritorio). Las tres cadenas están
escritas enteras en un mapa `Record<string, string>` porque Tailwind escanea el
código como texto y no generaría la clase si se compusiera concatenando.

Comprobación contra el mockup: A(34) gap8 B(34) **pasillo 54** C(34) gap8 D(34) =
206 px; con `gap-x-2` la columna del pasillo debe valer 38. Cuadra al píxel.

### Flex para todo lo demás
Columnas de los rieles, contenido de la card, filas etiqueta/valor del resumen,
leyenda y barra inferior. Son secuencias de una sola dirección donde lo que
importa es la distribución del sobrante (`mt-auto` manda los chips al fondo del
riel, `flex-1` abre el hueco del mockup entre el estado vacío y el resumen).

---

## 5. Tokens

Todos en `@theme` de `src/app/globals.css`. Anotados con el hex del mockup cuando
el token se desvía.

### Color
| Token | Valor | Origen |
|---|---|---|
| `--color-ink` | `#252b39` | medido |
| `--color-ink-soft` | `#3b4158` | medido |
| `--color-muted` | `#686e80` | mock `#8c91a1`, oscurecido por AA |
| `--color-muted-warm` | `#776963` | mock `#aea39e`, oscurecido por AA |
| `--color-coral` | `#df775f` | medido (relleno, punto, avión, progreso) |
| `--color-coral-ink` | `#b65b3f` | mock `#d48a75`, oscurecido por AA |
| `--color-coral-line` | `#eabaab` | medido (contorno del asiento) |
| `--color-coral-track` | `#ecd0c9` | medido (barra de scroll) |
| `--color-coral-dash` | `#edd7cf` | medido (borde punteado) |
| `--color-coral-deep` | `#c2553a` | **nuevo**: CTA activo con texto blanco |
| `--color-canvas` | `#fffdfd` | medido |
| `--color-rail-cold-top/bottom` | `#f8faff` → `#eff3fa` | medido (degradado vertical) |
| `--color-rail-warm-top/bottom` | `#ffffff` → `#fef8f7` | medido |
| `--color-peach-50 / -100` | `#fbefeb` / `#eee4e0` | medido |
| `--color-cta-off-ink` | `#b1a9a5` | medido |
| `--color-arch` | `#f3f6fd` | medido |
| `--color-taken` / `--color-taken-ink` | `#e5e7ee` / `#9aa1b1` | medido / mock `#b5bac5` |
| `--color-steel-from/to` | `#768db2` → `#93a8c8` | medido (card de ruta móvil) |
| `--color-island` | `#1b1f2a` | medido |

Un solo acento en toda la página. El coral aparece en cinco tonos, pero son el
mismo color en distintos papeles (relleno, contorno, texto, traza, punteado), no
cinco acentos.

### Tipografía — **Outfit** (`next/font/google`)
El mockup **no es Poppins**: la `a` de "Class" es de dos pisos y la de Poppins es
geométrica de un piso. Outfit sí la tiene de dos pisos, con tilde rectangular
sobre la `i`, `C`/`o` de círculo casi perfecto y mayúsculas muy anchas en el peso
extra, que es lo que da el aire de "MUC" y "LXR". **Comprobación numérica**: el
"MUC" del mockup mide 152 × 52 px de mockup (relación 2,92); el mío 239 × 81
(relación 2,95). La proporción de la letra coincide dentro del 1 %.

Los tamaños **no** se estimaron por altura de mayúscula: se calibraron midiendo
en el navegador el ancho real de cada cadena en Outfit a 100 px y despejando el
tamaño que iguala el ancho medido en el mockup. Resultado (css, escritorio):
MUC/LXR 36 · ciudad 14 · "Flight details" 13 · título de card 16 · "Seat" 12 ·
"Price" 13 · DATE 10 · valor de chip 14 · contador 14 · leyenda 13 · título de
cabina 14 · "Your selection" 17 · filas de resumen 14 · Total 38 · CTA 16 ·
letra de asiento 13. Móvil: MUC/LXR 34 · título de cabina 13 · letra 11 ·
Total 28 · CTA 15.

### Radios — escala cerrada de tres valores
`--radius-seat: 10px` (medido 11) · `--radius-chip: 16px` · `--radius-card: 24px`.
Más el pill (`rounded-full`) para CTA y botones circulares. Ninguna otra.

### Sombras
Casi inexistentes, como el mockup: `0 10px 30px rgba(37,43,57,0.05)` en la card
del riel, tintada al azul del fondo y sin negro puro.

### Movimiento
`--ease-soft: cubic-bezier(0.16, 1, 0.3, 1)`; 150 ms en pulsación, 200 ms en
progreso y aviso. Sólo `transform` y `opacity`.

### El arco del fuselaje
En el mockup es un **semicírculo de radio = ancho/2** (verificado: a 102 px del
vértice la semianchura medida es 188 y la teórica para r=215 es 183). Se resuelve
con `rounded-t-[9999px]`: el algoritmo de radios solapados de CSS reescala ambas
esquinas hasta que suman el ancho disponible, dejando **exactamente** un
semicírculo sea cual sea el ancho del contenedor. Un solo valor para los dos
breakpoints, sin cálculos.

---

## 6. Estados que el mockup no cubría

| Estado | Resolución | Fichero |
|---|---|---|
| **Asiento elegido** | Relleno coral `#df775f` (idéntico a la muestra "Selected" de la leyenda) con la letra en `--color-ink`. Se descartó letra blanca: da 3,02:1 y no llega a AA; el navy da **4,69:1**. Como el mockup nunca dibuja un asiento elegido, no hay pérdida de fidelidad. | `BotonAsiento.tsx` |
| **CTA activo** | `--color-coral-deep #c2553a` + texto blanco = 4,50:1. El coral del mockup con blanco encima se queda en 3,02:1, así que se oscurece lo justo. El rótulo pasa de "Select a seat" a "Continue with 1/2 seat(s)": la instrucción deja de ser cierta en cuanto hay una plaza elegida. | `BotonReservar.tsx` |
| **Límite alcanzado** | Aviso no modal, `role="status"` + `aria-live="polite"`, que **no roba el foco** y no bloquea el mapa. Anatomía de clase, qué pasó + qué hacer: *"Ya elegiste 2 asientos. Quita uno para cambiar tu selección."* Sin códigos internos y sin `alert()`. Se dibuja `fixed` en ambos breakpoints para que aparecer y desaparecer no mueva un solo píxel del mapa. Se retira solo a los 5 s y es descartable; la `key` cambia en cada intento para que el lector de pantalla lo repita. | `AvisoLimite.tsx` |
| **Cargando** | `loading.tsx` de App Router: esqueleto con la forma final (tres rieles, arco, bloques de plazas), no un spinner, para que el relevo no desplace el layout. El latido se apaga con `prefers-reduced-motion`. | `src/app/loading.tsx` |
| **Error** | `error.tsx` (Client Component, con `retry()` de Next 16). Mismo criterio de redacción: *"No pudimos cargar el mapa de cabina / Tus asientos siguen libres. Vuelve a intentarlo…"*. El `digest` se muestra pequeño y aparte, etiquetado como referencia para soporte. | `src/app/error.tsx` |
| **Vacío** | Es el único que sí traía el mockup, y se reproduce literal (caja punteada coral, dos líneas centradas). | `RielSeleccion.tsx` |
| **Selección con plazas** | El mockup no lo dibuja. Se mantiene su retícula: una tarjeta blanca por asiento, código + cabina a la izquierda, precio y botón de quitar a la derecha. Sin color nuevo. | `RielSeleccion.tsx` |
| **Tablet (768)** | Los mockups sólo definen 390 y 1440. Estirar la maqueta de móvil a 768 deforma el arco (semicírculo de radio 384). Se limita la columna a `max-w-[430px]` y se centra: a 768 se ve una columna de teléfono centrada, no una pantalla deformada. | `PantallaSeleccion.tsx` |

---

## 7. Accesibilidad: hallazgos con sus mediciones

Contraste medido en el navegador con Playwright sobre el color computado y el
fondo real resuelto subiendo por el árbol (incluidos degradados).

### Corregido: contraste de texto
| Elemento | Mockup | Implementado | Ratio |
|---|---|---|---|
| Letra del asiento libre | `#d48a75` (2,72:1) | `#b65b3f` | **4,61:1** |
| Etiquetas grises (`Seat`, `DATE`, `Munich`, `Total`, leyenda, contador) | `#8c91a1` (2,88:1) | `#686e80` | **4,66–5,08:1** |
| Número de fila | `#b5bac5` (1,86:1) | `#686e80` | **4,70:1** |
| Texto del estado vacío | `#aea39e` (~2,3:1) | `#776963` | **5,27:1** |
| Cifra del Total | `#252b39` | igual | **14,16:1 (AAA)** |

Los grises se oscurecen entre uno y dos escalones. Es la desviación cromática más
visible del trabajo y es deliberada: el usuario fija AA como piso y AAA en cifras
de decisión, y esos grises son texto real, no adorno.

### No corregido, con motivo: letra del asiento ocupado
`#9aa1b1` sobre `#e5e7ee` da **2,10:1**. Se mantiene, apoyado en la excepción
*Incidental* de WCAG 1.4.3: el texto de un **componente de interfaz inactivo** no
tiene requisito de contraste, y estos asientos son `<button disabled>` reales.
Oscurecer la letra haría que lo ocupado gritara más que lo disponible, invirtiendo
la jerarquía que la pantalla necesita. El estado nunca depende de ese contraste:
va en el `aria-label` ("…, ocupado, …"), en el atributo `disabled` y en la
inversión relleno/contorno de §3.3.

### No corregido, con motivo: rótulo del CTA apagado
`#b1a9a5` sobre `#eee4e0` da **1,85:1**. Misma excepción (botón `disabled`).
Mitigación: la misma instrucción está en el estado vacío del riel derecho a
5,27:1, y en móvil el contador `0/2` de la cabecera la sostiene a 5,02:1.
Llevarlo a AA obligaría a un `#6e6259` que se leería como botón activo y rompería
la lectura del mockup.

### Objetivo táctil
Aquí está el conflicto real de la pantalla. El asiento mide 26 px en móvil por
fidelidad, y el mínimo del usuario es 44 px. **No se puede tener las dos cosas**:
el paso de rejilla es 32 × 34 px, así que un área de 44 px pisaría a los vecinos y
el hermano posterior se quedaría con el clic.

Lo hecho:
- Un pseudo-elemento transparente extiende el área activa hasta ocupar **toda la
  celda de la rejilla, gaps incluidos**, sin tocar un píxel de lo visible:
  **32 × 34 px en móvil y 42 × 43 px en escritorio** (verificado en navegador).
  Supera el mínimo de 24 px de WCAG 2.2 SC 2.5.8 pero **no llega a los 44 px**.
- Bug encontrado por el camino: con `border-2`, el `::after` se posicionaba contra
  una caja de relleno 4 px menor y los asientos **libres** acababan con menos área
  activa (28 × 30) que los **ocupados** (32 × 34). Corregido pasando el contorno a
  `box-shadow` interior: se ve idéntico y la geometría queda uniforme.
- Los controles aislados (atrás, ajustes) sí llegan a **44 × 44** con la utilidad
  `.toque-44`, manteniendo el círculo visible en los 34 px del mockup.
- No se bloquea el zoom (sin `maximumScale` ni `userScalable`), que es la vía de
  escape real para quien necesite plazas más grandes.

### Resto
- **Teclado**: orden lógico verificado (atrás → 1A → 1B → 2B → 2C → …; los
  ocupados se saltan por `disabled`). Foco visible en todo lo interactivo:
  `outline: 2px solid #c2553a` con `offset: 2px`. Enter sobre un asiento cambia
  el `aria-label` de "disponible" a "elegido".
- **ARIA**: cada plaza es un `<button>` real con `aria-label` completo
  ("Asiento 1A, Business Class, disponible, $420"), `aria-pressed` en las
  seleccionables y `disabled` en las ocupadas. La letra visible va `aria-hidden`
  para no duplicar.
- **Movimiento reducido**: bloque global que anula animaciones y transiciones.
- La barra de estado de iOS se reproduce como marco del dispositivo, marcada
  `aria-hidden` y sin ningún dato real.

---

## 8. Verificación

Servidor real (`npm run dev`) y Playwright 1.62.1 con Chromium, a
390 × 844, 768 × 1024 y 1440 × 900 con `deviceScaleFactor: 2`.

- **Consola limpia**: 0 errores y 0 warnings en los tres anchos.
- **Fidelidad geométrica**, comparando bandas de tinta del mockup contra el render
  a 1440 (css):

  | | mockup | render |
  |---|---|---|
  | Título "Business Class" | 174–184 | 174–186 |
  | fila 1 | 203–237 | 207–241 |
  | fila 2 | 246–280 | 250–284 |
  | fila 3 | 289–323 | 293–327 |
  | Título "First Class" | 397–407 | 400–410 |
  | First fila 1 | 426–460 | 432–466 |

  Desviación máxima **6 px** acumulados en todo el alto del mapa. Paso de fila
  idéntico (43 px). Leyenda a 66–75 contra 66–80 del mockup.
- **Interacción**: elegir dos plazas actualiza a la vez contador (`0/2`→`2/2`) y
  su barra, las ranuras "Seat" del riel izquierdo (`1A`, `1B`), el "Price: $840",
  la lista del riel derecho, `Seats 1A, 1B`, `Taxes & fees $36`,
  `Seats subtotal $840` y `Total $876`. El CTA pasa a coral con
  "Continue with 2 seats". El tercer intento dispara el aviso sin mover el mapa.
- **Teclado y foco**: recorrido y activación por Enter verificados (§7).
- **Contraste**: medido elemento por elemento (§7).
- **Producción**: `npm run build` compila, TypeScript pasa y `/` se prerenderiza
  como **estático** (`○ Static`). `npm run lint` sin incidencias. Listo para
  Vercel sin configuración adicional.
- **No hay modo oscuro**: los mockups no lo definen y añadirlo habría sido
  reinterpretar la dirección visual. El bloque `prefers-color-scheme: dark` del
  boilerplate se eliminó para que el tema no cambie solo. Queda pendiente.

---

## 9. Desviaciones respecto a la imagen

1. **Grises de texto oscurecidos** uno o dos escalones (§7). Motivo: AA.
2. **Letra del asiento elegido en navy** en vez de blanco. Motivo: AA. Sin coste
   de fidelidad, el mockup no dibuja ningún asiento elegido.
3. **CTA activo en `#c2553a`** en vez del coral puro. Motivo: AA con texto blanco.
4. **Rótulo del CTA cambia** al haber selección. Motivo: "Select a seat" es una
   instrucción que deja de ser cierta.
5. **Contorno del asiento como `box-shadow` y no `border`.** Motivo: igualar el
   área activa entre libres y ocupados. Visualmente idéntico.
6. **"Business Class" se parte en dos líneas** en la card del riel, como en el
   mockup, partiendo por el último espacio (vale igual para "First Class" y
   "Economy Class").
7. **Título de la card dinámico**: sigue la cabina de la selección y muestra
   "Mixed cabins" si las dos plazas son de cabinas distintas. El mockup sólo
   enseña el estado vacío con "Business Class", que se conserva como inicial.
8. **Economy Class es invención**: no aparece en ningún mockup (los dos la cortan
   por abajo). Se le da rejilla 3|3 — que además ejercita una tercera plantilla de
   grid — 8 filas y una ocupación dispersa. Business y First sí están transcritos
   plaza a plaza.
9. **Códigos de asiento ambiguos en el mockup**: Business y First empiezan las dos
   en la fila 1, así que "1A" existe dos veces. El identificador interno lleva
   cabina (`business-1A`), la ranura compacta enseña sólo "1A" (fidelidad) y el
   riel derecho y el `aria-label` desambiguan con el nombre de cabina.
10. **Tablet acotado a 430 px** (§6).
11. **"2h 10m" se solapa con el punto de destino.** Está así en el mockup
    (comprobado sobre el recorte); se reproduce tal cual.
12. **Ancho de Outfit**: a igual altura de mayúscula, Outfit sale ~10 % más ancha
    que la fuente del mockup en el display grande. Se prioriza igualar la altura
    visual; sobra sitio en el riel.

---

## 10. Deuda conocida

- **Idioma mezclado.** `<html lang="es">` porque los textos accesibles (aria-label,
  aviso de tope, error) van en español, como pide el taller; los rótulos visibles
  siguen en inglés porque así están en los mockups. Un lector de pantalla
  pronunciará el inglés con fonética española. En producción habría que unificar
  el idioma o meter i18n de verdad.
- **Sin modo oscuro** (§8).
- **Objetivo táctil de 32 × 34 px** en el asiento móvil, por debajo de los 44 px
  del estándar propio del usuario (§7). Es una restricción geométrica del mapa de
  cabina, no un descuido.
- Los precios ($420 / $310 / $150) y las tasas ($18 por plaza) son inventados y
  coherentes; viven en `src/data/vuelo.ts`.
