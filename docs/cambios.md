# Registro de cambios

Reorganización completa del proyecto, agrupada por fase. El estado de partida está
documentado en [auditoria.md](auditoria.md).

No se ejecutó ningún comando de git. Todos los cambios son locales.

---

## Fase 1 — Auditoría

- Inventariados los 30 archivos del repositorio, con peso y dimensiones de las 28 imágenes.
- Verificadas una a una las 17 rutas referenciadas: **5 apuntaban a archivos inexistentes**.
- Comprobado por `grep` que no hay credenciales, tokens ni claves de API en el código.
- Escrito `docs/auditoria.md` con 14 tablas.

## Fase 2 — Estructura

Estructura anterior → nueva:

| Antes | Después |
|---|---|
| `estilos.css` | `assets/css/base.css` + `layout.css` + `components.css` |
| `funciones.js` (no existía) | `assets/js/main.js` + `assets/js/modules/{nav,auth,gallery}.js` |
| `IMG/BUHO.jpg` | `assets/img/logo/buho-geometrico.webp` |
| `IMG/4.jpg` | `assets/img/content/cartel-expect-the-unexpected.webp` |
| `IMG/1.jpg` | `assets/img/content/detalle-joy-or-sorrow.webp` |
| `IMG/3.jpg` | `assets/img/content/detalle-the-unexpected.webp` |
| `IMG/5.jpg` | `assets/img/content/detalle-unusual-event.webp` |
| `IMG/6.jpg` | `assets/img/content/detalle-sello-reuel.webp` |
| `DYEL-Form.png` | `assets/img/logo/{favicon-32.png, apple-touch-icon.png, og-dyel-form.png}` |

- Carpetas `IMG/` e `ICONOS/` eliminadas. Todo en minúsculas y con guiones.
- Creados `404.html`, `robots.txt`, `sitemap.xml`, `.gitignore`, `docs/`.

## Fase 3 — Higiene

- **35 archivos eliminados**, 8,1 MB:
  - 22 imágenes que ningún archivo referenciaba (`7.jpg` a `20.jpg`, `BANNER`, `BUHO2`, `FONDO`,
    `FONDOPINGU`, `ig`, `logo`, `lupa`, `engranaje.svg`, `waves.svg`).
  - Los 4 SVG de `ICONOS/`, que llevaban cabecera «Font Awesome **Pro** — Commercial License».
  - `estilos.css` y `DYEL-Form.png`, sustituidos por los archivos derivados.
- `.gitignore` creado según el stack real: `node_modules/`, `.env`, `*.log`, `dist/`, `.vercel/`,
  `.DS_Store`, `Thumbs.db`.
- Formato normalizado en los 13 archivos: 2 espacios, comillas dobles en HTML, punto y coma en JS,
  salto de línea final, sin tabuladores, sin CRLF, sin BOM.
- No había credenciales que retirar.

## Fase 4 — Imágenes

- Las 7 imágenes en uso convertidas a WebP: **2,88 MB → 0,89 MB (−69 %)**.
- Redimensionadas al tamaño real de presentación: recortes de galería a 800 px, cartel completo a
  1200 px, marca del búho a 256 px. Antes se servían a 1080 px para pintarse a 250 px.
- El favicon pesaba **545 KB a 1024×1024**; ahora son 2,4 KB a 32×32 más un icono táctil de 180 px.
- Fondo blanco del búho convertido en transparencia, para que la marca se integre en la barra
  oscura sin dejar un rectángulo visible.
- `width` y `height` declarados en todas las imágenes, para que no haya desplazamiento de contenido.
- `loading="lazy"` en las 5 piezas de la galería y en el diálogo; ninguna imagen sobre el pliegue.
- `alt` reescrito describiendo lo que se ve realmente en cada pieza.
- Generada `og-dyel-form.png` (1200×630) a partir del logotipo real del proyecto.

## Fase 5 — HTML, SEO y accesibilidad

- Reescrito `index.html` con estructura semántica: `header`, `nav`, `main`, `section`, `footer`.
- **Corregido HTML inválido**: había un `<form>` anidado dentro de otro y un `<div>` sin cerrar.
- Añadido `lang="es"`.
- `<head>` completo: título de 50 caracteres, descripción de 158, canonical, Open Graph con
  imagen real, favicon e icono táctil.
- Corregido el `viewport`: eliminados `user-scalable=no`, el `initial-scale` duplicado y los
  inexistentes `maximun-scale` y `minumin-scale`. Ya se puede hacer zoom.
- Añadido enlace «Saltar al contenido».
- Todos los campos con `<label>` asociado y errores enlazados por `aria-describedby`.
- Botón de menú con `aria-expanded` y nombre accesible.
- `robots.txt` y `sitemap.xml` con la URL real del sitio.
- `404.html` con título propio, descripción propia, `noindex` y enlace de vuelta al inicio.

### Contenido retirado por no tener nada real detrás

- **Los tres menús desplegables** (Servicios, Productos, Soporte) y sus 8 botones: Contacto,
  Ubicación, Teléfono, Cursos, Tutorías, Chat, Email y Nuestras redes. Ninguno tenía destino ni
  contenido, y rellenarlos habría exigido inventar direcciones y teléfonos.
- **La columna flotante de 4 iconos sociales**: no eran enlaces, eran `<img>` sueltos, y en el
  proyecto no consta ninguna URL de red social.
- El enlace «¿Olvidaste tu contraseña?», que apuntaba a `#`.

### Erratas corregidas

`Ingreas` → `Ingresa` · `Telefóno` → `Teléfono` · `Tutorias` → `Tutorías` ·
`type="Email"` → `type="email"` · `name="Telefóno"` → `name="telefono"`.

## Fase 6 — CSS y sistema de diseño

- Sistema de variables en `:root` derivado de lo que el sitio ya usaba: `#19191c` de la barra
  original y `#2bb5ec` muestreado del logotipo. Los azules de texto se oscurecieron hasta
  `#0b6f96` (5,64:1 sobre blanco) para cumplir el contraste mínimo.
- Escala de espaciado 4/8/16/24/32/48/64/96. Desaparecen los `margin-bottom: -37px`.
- Escala tipográfica coherente. Una sola familia: Poppins, que antes se descargaba y **no se
  aplicaba a nada** — la petición se desperdiciaba por completo.
- Eliminadas 7 reglas muertas (`.div-busqueda`, `.top-left`, `.top-right`, `.buttons2`,
  `.reductionIMG0`, `fig-div`, `body.bodyColor .div-busqueda`) y la duplicación de `.Cont-imgs4`.
- Corregidas las propiedades inválidas: `place-itemes`, `max-width: 1`, `padding: 10`.
- Retirada la referencia a `"Euclid Circular A"`, tipografía que nunca se cargó.
- Sin `!important`, sin estilos en línea, sin selectores de más de 3 niveles.

## Fase 7 — Responsive

- Mobile-first, media queries con `min-width` en 480 / 768 / 1024 / 1440.
- **Menú móvil funcional**. Antes el botón era un cuadrado invisible porque se pintaba con
  `background-image: url("IMG/menu.svg")` y ese archivo no existía. Ahora los iconos son SVG en
  línea. Verificado: abre, cierra con Escape, cierra al pulsar un enlace, cierra al pulsar el
  velo, bloquea el desplazamiento de fondo y devuelve el foco al botón.
- Sustituidas las superposiciones por `margin-top: -86%`, que descuadraban el diseño fuera de un
  rango estrecho de anchos, por una cuadrícula real.
- Verificado sin scroll horizontal en 360, 480, 768, 1024 y 1440 px.
- Áreas táctiles de 44×44 px como mínimo, comprobado midiendo cada control a 360 px.

## Fase 8 — UX / UI

- Los cuatro bloques de la página comparten borde izquierdo.
- Un CTA principal por pantalla, con destino real.
- Estados completos en cada control: `default`, `hover`, `focus-visible`, `active`, `disabled`,
  con transiciones de 180 ms.
- Formularios con validación visible: mensajes concretos por campo, resumen del número de campos
  a revisar, estado de comprobación con el botón desactivado y confirmación final.
- **La confirmación dice la verdad**: «Datos correctos. Esta demo no tiene servidor: no se ha
  enviado ni guardado nada.» En lugar de fingir una cuenta creada, el proyecto declara lo que es.
- Ancho de línea limitado a 68 caracteres.
- `maxlength="15"` retirado del correo y de la contraseña: bloqueaba a la mayoría de usuarios
  reales y limitaba la seguridad de la clave. Ahora la contraseña pide 8 caracteres como mínimo.

## Fase 9 — JavaScript

- El proyecto pasa de **8 funciones globales que sólo hacían `body.classList.toggle`** a un punto
  de entrada y tres módulos.
- Resuelto el `<script src="funciones.js">` que daba 404 en cada carga; ese archivo nunca existió.
- Un único objeto global, `window.DYEL`. Sin `var`. Sin variables sueltas.
- Se emplean scripts clásicos con `defer` en lugar de módulos ES a propósito: los módulos ES están
  bloqueados bajo `file://`, y así la página funciona también al abrir `index.html` con doble clic.
- Delegación de eventos en la galería y en el panel de acceso.
- Comprobada la existencia de cada elemento antes de operar sobre él; si falta alguno, el módulo
  se retira en silencio.
- El diálogo se apoya en `<dialog>` nativo: Escape, foco atrapado y devolución del foco son
  comportamiento del navegador, no código propio.
- Corregido un fallo de tiempos: el cajón se abría con una transición de `visibility`, de modo que
  el primer enlace todavía no era enfocable cuando se le pasaba el foco.

## Fase 10 — Rendimiento

| Métrica | Antes | Después |
|---|---|---|
| Peso de la primera carga | ≈2,9 MB | **671 KB** |
| Peticiones | 14 (5 de ellas en 404) | **13, ninguna fallida** |
| Peticiones rotas | 5 | 0 |
| Favicon | 545 KB | 2,4 KB |

- Todos los scripts con `defer`.
- Fuentes con `font-display: swap` y `preconnect` a los dos orígenes.
- Iconos en SVG en línea: cero peticiones y ningún archivo de icono que mantener.

## Fase 11 — QA

Verificado en Chrome sin interfaz, contra un servidor local y también por `file://`:

- Cada enlace de navegación y de pie apunta a un destino existente.
- Las 19 rutas de `img`, `link`, `script` y `data-full` responden 200.
- Las 4 anclas internas (`#contenido`, `#inicio`, `#acceso`, `#galeria`) existen en el documento.
- **Cero mensajes en consola** en `index.html` y en `404.html`, servidos y por `file://`.
- Sin scroll horizontal en los 5 anchos probados.
- Menú móvil verificado en las cuatro formas de cierre.
- Formularios verificados en vacío, con datos inválidos y con datos válidos.
- Diálogo verificado: abre, cambia de imagen, cierra con el botón y con Escape real.
- Sin «Lorem ipsum», «TODO», «TBD» ni texto de plantilla.
- Ambas páginas con título y descripción únicos, dentro de los rangos recomendados.
- Orden de tabulación comprobado pulsando Tab: los campos de los paneles ocultos no entran.

## Fases 12 y 13 — Documentación y despliegue

- `README.md` reescrito en inglés técnico. Se retiró la sección «Known issues», que enumeraba
  fallos ya corregidos, y la afirmación de que `funciones.js` gestionaba los formularios.
- Este registro creado.
- Sin rutas absolutas de la máquina local. Todas las rutas internas son relativas y en minúsculas.
- No se creó configuración de hosting: no se indicó destino.
- No se ejecutó ningún despliegue.
