# Auditoría inicial — DYEL-Form

Estado del repositorio **antes** de la reorganización. Documento de trabajo interno.

Fecha de auditoría: 2026-07-30
Peso total del repositorio (sin `.git`): **9,0 MB** · Peso de la primera carga: **≈2,9 MB**

---

## 1. Archivos HTML

| Archivo | `<title>` | `<h1>` | Propósito real |
|---|---|---|---|
| `index.html` | `Registro` | `DYEL` | Única página. Contiene tres paneles superpuestos (portada, iniciar sesión, registro), una barra de navegación con tres desplegables, una columna flotante de 4 iconos sociales y una galería de 6 figuras. |

No existe `404.html`. No existe ninguna otra página.

## 2. Archivos CSS y JS

| Archivo | ¿Se carga? | Líneas | Observaciones |
|---|---|---|---|
| `estilos.css` | Sí, `<link>` en `index.html` | 597 | Único CSS. Sin variables, sin orden, con reglas muertas y duplicadas. |
| `funciones.js` | **Referenciado pero no existe** | — | `<script src="funciones.js">` da 404. El README afirma que este archivo maneja los formularios: es falso, nunca existió en el repositorio. |
| JS embebido en `index.html` | Sí, `<script>` al final del `<body>` | 8 | 8 funciones flecha globales que sólo hacen `document.body.classList.toggle(...)`. |

## 3. Referencias rotas

| Referencia | Declarada en | Tipo | Efecto visible |
|---|---|---|---|
| `funciones.js` | `index.html:16` | `<script>` | 404 en consola en cada carga. |
| `IMG/chevron.svg` | `index.html:28` | `<img>` | Icono roto junto a «Servicios» en ≥500 px. |
| `IMG/chevron.svg` | `index.html:39` | `<img>` | Icono roto junto a «Productos» en ≥500 px. |
| `IMG/chev.svg` | `index.html:49` | `<img>` | Icono roto junto a «Soporte». Además el nombre difiere de los otros dos. |
| `IMG/menu.svg` | `estilos.css:460` | `background-image` | **El botón hamburguesa es un cuadrado invisible de 72×72 px.** En móvil no hay forma de saber que el menú existe. |
| `IMG/close.svg` | `estilos.css:466` | `background-image` | El estado «cerrar» del menú tampoco se ve. |
| `href="#"` | `index.html:92` | `<a>` | «¿Olvidaste tu contraseña?» no lleva a ningún sitio. |

Total: **5 archivos referenciados que no existen** + 1 enlace muerto.

## 4. HTML inválido

| Problema | Ubicación | Gravedad |
|---|---|---|
| `<form>` anidado dentro de otro `<form>` | `index.html:101` y `106` | Alta — HTML inválido; el navegador descarta el interno. |
| `<div class="content2-div">` sin cerrar; falta un `</form>` | `index.html:99-116` | Alta — el parser cierra las etiquetas donde puede, el DOM resultante no es el escrito. |
| Falta el atributo `lang` en `<html>` | `index.html:2` | Media — lectores de pantalla no saben el idioma. |
| `<figcaption>` fuera de su `<figure>` | `index.html:123`, `136`, `149` | Media — la asociación semántica pie/imagen se pierde. |
| Selector CSS `fig-div` para un elemento inexistente | `estilos.css:402` | Baja — regla muerta. |

## 5. Accesibilidad

| Problema | Ubicación |
|---|---|
| `user-scalable=no` impide hacer zoom | `index.html:9-10` |
| `maximun-scale` y `minumin-scale` mal escritos (no existen) | `index.html:10` |
| `initial-scale` declarado dos veces en el mismo `content` | `index.html:10` |
| Ningún `<input>` tiene `<label>` asociado; sólo `placeholder` | `index.html:89-91`, `107-110` |
| 7 de 8 `<img>` sin `alt`; los 4 restantes con `alt=""` siendo informativos | todo el archivo |
| Botón hamburguesa sin nombre accesible ni `aria-expanded` | `index.html:22` |
| Sin estilos de `:focus` visibles en ningún elemento interactivo | `estilos.css` completo |
| Los desplegables sólo se abren con `:hover` — inalcanzables por teclado | `estilos.css:572` |
| `<h1>` seguido de `<h3>` y `<h4>`: salto de nivel | `index.html:77`, `85-86` |

## 6. Contenido y datos

| Problema | Ubicación | Detalle |
|---|---|---|
| `maxlength="15"` en el campo de correo | `index.html:89`, `107` | Bloquea la mayoría de correos reales. |
| `maxlength="15"` en contraseña | `index.html:90`, `108` | Impide contraseñas seguras. |
| `type="Email"` con mayúscula | `index.html:89`, `107` | Funciona por normalización del navegador, pero es incorrecto. |
| «Ingreas tu Contraseña» | `index.html:90` | Errata. |
| «Telefóno» | `index.html:33`, `109` | Tilde en la vocal equivocada; es *Teléfono*. |
| «Tutorias» | `index.html:43` | Falta tilde; es *Tutorías*. |
| `name="Telefóno"` con tilde y mayúscula | `index.html:109` | Nombre de campo con carácter no ASCII. |
| 8 botones de menú sin destino | `index.html:31-33`, `42-43`, `52-54` | Contacto, Ubicación, Teléfono, Cursos, Tutorías, Chat, Email, Nuestras redes: ninguno hace nada. No existe contenido real detrás de ninguno. |
| 4 iconos sociales sin enlace | `index.html:61-70` | No son `<a>`, son `<img>` sueltos. No hay ninguna URL de red social en el proyecto. |
| Ningún formulario envía a ningún sitio | `index.html:88`, `101` | Sin `action`, sin `method`, sin manejador. Pulsar «Enviar» recarga la página. |

## 7. CSS muerto o defectuoso

| Regla | Línea | Motivo |
|---|---|---|
| `.div-busqueda` | 49 | Ningún elemento con esa clase. |
| `body.bodyColor .div-busqueda` | 56 | La clase `bodyColor` no se aplica nunca. |
| `.top-left` | 60 | Sin uso. |
| `.top-right` | 69 | Sin uso. |
| `.buttons2` | 108 | Sin uso. Además `padding: 10` es inválido (sin unidad). |
| `.reductionIMG0` | 412 | Sin uso. |
| `fig-div` | 402 | Elemento inexistente. |
| `.Cont-imgs4` | 329 y 358 | Declarada dos veces con `width` distinto; la segunda pisa a la primera. |
| `place-itemes: center` | 120 | Propiedad mal escrita, no existe. |
| `max-width: 1` | 134 | Valor inválido sin unidad. |
| `font-family: "Euclid Circular A"` | 427 | Tipografía nunca cargada; cae a la fuente del sistema. |
| Poppins cargada desde Google Fonts | `index.html:15` | Se descarga pero **no se aplica a `body`**: 100 % de la petición desperdiciada. |
| `margin-top: -86%` | 303, 342, 381 | Superposición por margen negativo porcentual: el layout depende del ancho del contenedor y se descuadra fuera de un rango estrecho. |
| `margin-bottom: -37px` | 84 | Valor arbitrario fuera de cualquier escala. |

Sin `!important` en el archivo. Sin estilos en línea. Sin selectores de más de 3 niveles.

## 8. Imágenes

### En uso (7 archivos, 2,88 MB)

| Archivo | Peso | Dimensiones | Uso |
|---|---|---|---|
| `DYEL-Form.png` | 545 KB | 1024×1024 | Favicon. **545 KB para un icono de 32 px.** |
| `IMG/BUHO.jpg` | 212 KB | 908×909 | Búho geométrico sobre blanco, cabecera del panel. Mostrado a 85 px. |
| `IMG/1.jpg` | 492 KB | 1080×1080 | Recorte del cartel «Expect the Unexpected». Mostrado a 250 px. |
| `IMG/3.jpg` | 697 KB | 1080×1080 | Otro recorte del mismo cartel. Mostrado a 250 px. |
| `IMG/4.jpg` | 562 KB | 1080×1080 | Cartel completo. Mostrado a 250 px. |
| `IMG/5.jpg` | 525 KB | 1080×1080 | Recorte del mismo cartel. Mostrado a 250 px. |
| `IMG/6.jpg` | 499 KB | 1080×1080 | Recorte del mismo cartel. Mostrado a 250 px. |

Ninguna tiene `width`/`height` declarados → desplazamiento de contenido al cargar.
Ninguna tiene `loading="lazy"` → las 6 se descargan de golpe.
Todas se sirven a 1080 px para pintarse a 250 px: **4,3× más píxeles de los necesarios**.

### Sin usar (22 archivos, 5,55 MB)

`IMG/7.jpg`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `17`, `18`, `19`, `20`,
`IMG/BANNER.jpg`, `IMG/BUHO2.jpg`, `IMG/FONDO.jpg`, `IMG/FONDOPINGU.jpg`, `IMG/ig.jpg`,
`IMG/logo.jpg`, `IMG/lupa.png`, `IMG/engranaje.svg`, `IMG/waves.svg`

Verificado con `grep`: ningún HTML, CSS ni JS del proyecto las referencia.

### Procedencia del material gráfico

Las imágenes de la galería **no son obra propia**. Llevan marca de agua visible del autor original:

- `1.jpg`, `3.jpg`, `4.jpg`, `5.jpg`, `6.jpg`, `FONDO.jpg` → cartel «Expect the Unexpected», firmado **`@reuel.dsgn`** / «Reuel 2022 · 208 of 365».
- `8.jpg`, `13.jpg`, `BANNER.jpg` → otros carteles del mismo autor («Reuel 2022 · 196 of 365»).
- `19.jpg`, `20.jpg` → firmados **`@songsandthespirits`**.
- Los 4 SVG de `ICONOS/` llevan cabecera **«Font Awesome Pro 6.2.1 — Commercial License»**.

Es material de terceros guardado de redes sociales. Ver el informe final.

## 9. Dependencias externas

| Dependencia | Origen | Estado |
|---|---|---|
| Poppins (300, 400, 500) | `fonts.googleapis.com` | Se descarga y no se usa. |
| `preconnect` a `fonts.googleapis.com` | `index.html:13` | Correcto. |
| `preconnect` a `fonts.gstatic.com` | `index.html:14` | Correcto. |

Sin npm, sin `package.json`, sin paso de compilación, sin jQuery, sin ninguna librería.

## 10. Archivos basura

Ninguno. No hay `.bak`, `copia de`, `_v2`, `.DS_Store`, `Thumbs.db` ni `node_modules`.

## 11. Archivos de proyecto ausentes

| Archivo | Estado |
|---|---|
| `.gitignore` | No existe. |
| `robots.txt` | No existe. |
| `sitemap.xml` | No existe. |
| `404.html` | No existe. |

## 12. Credenciales

`grep` sobre todo el repositorio buscando `api_key`, `apikey`, `secret`, `token`,
`password =`, `Bearer`, `AKIA`, `sk_live`, `pk_live`, `firebase`, `mongodb` y
bloques de clave privada: **0 coincidencias**. No hay credenciales en el código.

## 13. Nomenclatura

| Actual | Problema |
|---|---|
| `ICONOS/`, `IMG/` | Mayúsculas. |
| `BUHO.jpg`, `BANNER.jpg`, `FONDO.jpg`, `FONDOPINGU.jpg`, `DYEL-Form.png` | Mayúsculas. |
| `1.jpg` … `20.jpg` | Sin significado; además faltan `2.jpg` en la secuencia. |
| `estilos.css`, `funciones.js` | Coherentes en español, pero fuera de `assets/`. |

## 14. Duplicación de HTML

Al haber una sola página no hay duplicación entre páginas. Sí hay duplicación
interna: los tres paneles (`.content-contenedor-iniciar`, `.content-div`,
`.content2-div`) repiten las mismas 12 declaraciones CSS con la única diferencia
de `position` y `visibility`.

---

## Resumen de gravedad

| # | Hallazgo | Gravedad |
|---|---|---|
| 1 | El menú móvil es invisible: falta `IMG/menu.svg` | **Crítica** |
| 2 | `funciones.js` no existe y el README dice que sí | **Crítica** |
| 3 | HTML inválido: formularios anidados y `<div>` sin cerrar | **Alta** |
| 4 | `maxlength="15"` en correo bloquea usuarios reales | **Alta** |
| 5 | 3 iconos de menú rotos (`chevron.svg`, `chev.svg`) | Alta |
| 6 | Ningún `<label>`, ningún `:focus`, `user-scalable=no` | Alta |
| 7 | 8 botones de menú y 4 iconos sociales sin destino | Alta |
| 8 | 5,55 MB de imágenes sin usar; material de terceros | Media |
| 9 | Poppins se descarga y no se aplica | Media |
| 10 | Sin `.gitignore`, `robots.txt`, `sitemap.xml`, `404.html` | Media |
