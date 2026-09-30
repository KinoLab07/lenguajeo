# Lenguajeo (Walking Language)

Película interactiva de **Enrico Mandirola**. Súper-8 y 16mm, 25 minutos
repartidos en diez senderos que el espectador encadena como quiera.

Programación original: Alejandro Forero.
Copia descargada de `lenguajeo.kinolab07.co` el 30 de septiembre de 2026.

## Cómo verlo en local

```bash
python3 -m http.server 4708
```

y abrir <http://localhost:4708>. Con los diez `.mp4` en `4-videos/` funciona
sin conexión. No hay dependencias ni proceso de compilación.

> El servidor de Python no admite peticiones por rango, así que en local no se
> puede adelantar dentro de un vídeo. En GitHub sí funciona.

## Estructura

```
index.html      la página; carga sus scripts con <script defer>
1-scripts/
  config.js     de dónde salen los vídeos
  html.js       cE(): crear un elemento y colgarlo de su padre
  classes.js    VideoObj: cada sendero del menú
  descarga.js   los diez senderos y la carga perezosa de vídeo
  script.js     pantallas, menú y reproducción encadenada
  estilos.css   todo el diseño
2-imagenes/     0.png … 9.png (miniaturas), logo.png, loading.gif
3-audio/        audio.mp3 (fondo del menú)
4-videos/       los diez senderos — NO están en el repositorio, ver LEEME.md
5-fuentes/      andalemono.ttf
```

Las rutas están escritas dentro de los `.js`, así que **los nombres de las
carpetas no se pueden cambiar** sin tocar `config.js` y `descarga.js`.

### Los diez senderos

| # | Territorio | Sendero | Duración | Peso |
|---|---|---|---:|---:|
| 0 | Metacine    | Mirada              | 2:18 | 52 MB |
| 1 | Musa        | Nuvole              | 3:08 | 93 MB |
| 2 | Cine Poesía | Cine Ojo            | 1:55 | 41 MB |
| 3 | Musa        | Espiral             | 3:21 | 68 MB |
| 4 | Metacine    | Camino              | 3:33 | 83 MB |
| 5 | Cine Poesía | Ruinas              | 1:37 | 48 MB |
| 6 | Musa        | Grito               | 2:47 | 82 MB |
| 7 | Metacine    | Tiempo              | 2:43 | 81 MB |
| 8 | Cine Poesía | Día                 | 2:06 | 46 MB |
| 9 | Musa        | Interludio Fílmico  | 1:32 | 29 MB |

Todos en H.264, 1300×432, 24 fps, entre 2,7 y 4,2 Mbps. **No se han vuelto a
comprimir**: son los mismos bytes que servía el sitio original. El grano de la
película se lleva mal con la compresión, así que reencodearlos más bajos
emborronaría precisamente la textura que es la obra.

## Los vídeos van en una release, no en el repositorio

Pesan 632 MB. Se suben como adjuntos de una release de GitHub, que se sirven
desde su CDN y no gastan la cuota de tráfico de Pages. Con la
[CLI de GitHub](https://cli.github.com) instalada y los diez `.mp4` en
`4-videos/`:

```bash
./tools/subir-videos.sh
```

El script imprime al final la línea que hay que pegar en `1-scripts/config.js`:

```js
var VIDEOS_BASE = "https://github.com/USUARIO/REPO/releases/download/videos-v1/";
```

Con `VIDEOS_BASE` vacío, el sitio los busca en la carpeta local. Así se puede
trabajar sin conexión y publicar sin cambiar nada más.

## Qué se cambió respecto al original

El aspecto y el funcionamiento son los mismos. Todo lo de abajo es fontanería.

**Fuera p5.js.** Pesaba 3,6 MB, el 97% del JavaScript del sitio. Lo único que
hacía era crear un lienzo de 100×100 píxeles y pintarlo de negro sesenta veces
por segundo. Ese lienzo no se veía: el fondo negro lo pone el CSS.

**Los scripts se cargan con `<script defer>`.** Antes `index.html` bajaba cada
uno por XHR, lo convertía en un blob y lo inyectaba, **uno detrás de otro**,
esperando a que terminara el anterior. Los blobs además impedían que el
navegador los guardara en caché, así que cada visita repetía la descarga
entera.

**Los vídeos se cargan al elegirlos.** Antes se bajaban los diez —632 MB—
antes de enseñar el menú. Ahora el menú aparece de inmediato y mientras se
reproduce un sendero se precarga solo el siguiente de la cola, así el
encadenado sigue sin cortes.

**Funciona en el móvil.** Antes no: el código detectaba si eras móvil y luego
llamaba a la misma función en las tres ramas, así que la detección no hacía
nada, y la constelación está colocada con coordenadas absolutas. Ahora, por
debajo de 900 px, pasa a una rejilla de dos columnas con la ficha de cada
sendero siempre visible, porque en una pantalla táctil no hay «pasar el ratón».

**Cada sendero es un solo elemento.** Antes la miniatura y su ficha eran dos
divs sueltos superpuestos con veinte reglas de coordenadas repetidas en el CSS.
Ahora son uno, con diez reglas. Es lo que permite reordenarlos en el móvil.

**La pantalla completa ya no bloquea.** En Safari de iPhone la petición falla y
antes dejaba al visitante ante una pantalla negra.

**Fuera la detección de navegador.** Doscientas líneas que miraban el userAgent
buscando OmniWeb, iCab, Konqueror, Netscape y MSIE, para decidir entre tres
ramas que hacían lo mismo.

**Se puede navegar con el teclado.** Cada sendero responde a Tab y a Enter.

### El resultado

|  | Antes | Ahora |
|---|---:|---:|
| Para ver el menú | 632 MB | 0,8 MB |
| JavaScript | 3,7 MB | 30 KB |
| Caché entre visitas | ninguna | completa |
| En el móvil | roto | funciona |

## Queda una cosa por decidir: la contraseña

`script.js` compara contra `"lenguajeo2023"` en texto plano. Cualquiera que
abra el código fuente del navegador la ve — hoy ya pasa en el sitio publicado,
pero **en un repositorio público quedaría además en el historial**.

Desde el navegador no hay forma de proteger de verdad un archivo estático. Si
la película debe seguir restringida, hace falta un servidor que valide la
contraseña, o dejar los vídeos en una plataforma con enlaces privados. Si no,
lo honesto es quitarla.

## Publicar en GitHub Pages

Incluye `.nojekyll`, así que las carpetas que empiezan por número se sirven tal
cual. En *Settings → Pages*, rama `main`, carpeta `/ (root)`. Para el
subdominio, un archivo `CNAME` con `lenguajeo.kinolab07.co` y el DNS apuntando
a GitHub Pages.
