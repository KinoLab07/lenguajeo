# Lenguajeo (Walking Language)

Película interactiva de **Enrico Mandirola**. Súper-8 y 16mm, 25 minutos
repartidos en diez senderos que el espectador encadena como quiera.

Programación original: Alejandro Forero. p5.js 1.1.9.
Copia descargada de `lenguajeo.kinolab07.co` el 30 de septiembre de 2026.

## Cómo verlo en local

```bash
python3 -m http.server 4708
```

y abrir <http://localhost:4708>. No hace falta instalar nada: es HTML, CSS y
JavaScript sin dependencias ni proceso de compilación.

## Estructura

```
index.html      carga los scripts por XHR y arranca todo
1-scripts/      html.js · descarga.js · script.js · classes.js · estilos.css · p5.js
2-imagenes/     0.png … 9.png (miniaturas), logo.png, loading.gif
3-audio/        audio.mp3 (fondo del menú)
4-videos/       0.mp4 … 9.mp4 (los diez senderos)
5-fuentes/      andalemono.ttf
```

Las rutas están escritas a mano dentro de los `.js`, así que **los nombres de
las carpetas no se pueden cambiar** sin tocar `descarga.js` y `script.js`.

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

Todos en H.264, 1300×432, 24 fps, entre 2,7 y 4,2 Mbps.

## Qué se cambió respecto al original

Nada del funcionamiento. Solo limpieza de `index.html`:

- Se quitaron dos líneas comentadas que apuntaban a
  `trozos.artesonoroenweb.com`, un sitio ajeno; eran código muerto heredado de
  otro proyecto del programador.
- `og:site_name` decía `"WebGL 1"`, el marcador de la plantilla. Ahora dice
  `"Lenguajeo"`.
- Sobraba un `<meta charset>` repetido.

Se comprobó que **`p5.js` es byte a byte idéntico** a la versión oficial 1.1.9,
y que los scripts propios no contienen código inyectado. Los únicos enlaces
externos que quedan son los créditos a freesound.org, que son legítimos.

## Antes de publicarlo: tres cosas a decidir

### 1. Pesa 632 MB y se descarga entero de golpe

`descarga.js` precarga los diez vídeos con `preload="auto"` **antes** de
enseñar el menú. Cada visitante se baja los 632 MB aunque solo vaya a ver un
sendero.

GitHub Pages tiene un límite de 1 GB por sitio y un tope recomendado de 100 GB
de tráfico al mes: a 632 MB por visita, eso son unas **150 visitas al mes**
antes de que GitHub empiece a limitar el sitio.

La solución de una línea es cambiar `preload = "auto"` por `preload =
"metadata"` en `descarga.js`: el menú aparecería casi al instante y cada vídeo
se descargaría solo al elegirlo. Cambia el comportamiento, así que no se ha
tocado.

### 2. La contraseña está escrita en el JavaScript

`script.js` compara contra `"lenguajeo2023"` en texto plano. Cualquiera que
abra el código fuente del navegador la ve. Hoy ya es así en el sitio publicado,
pero **en un repositorio público de GitHub quedaría además en el historial**.

No hay forma de proteger de verdad un archivo estático desde el navegador. Si
la película debe seguir restringida, hay que servirla desde un sitio que
compruebe la contraseña en el servidor, o dejar los vídeos en una plataforma
con enlaces privados.

### 3. Archivos grandes en Git

`1.mp4` pesa 93 MB. GitHub rechaza cualquier archivo de más de 100 MB y avisa a
partir de 50 MB, y ocho de los diez vídeos pasan de 46 MB. Además, cada vez que
se reemplace un vídeo el repositorio crecerá con la copia antigua dentro del
historial.

Alternativas: Git LFS, dejar los vídeos fuera del repositorio (Cloudflare R2,
Bunny, Vimeo) y apuntar a ellos desde `descarga.js`, o reencodearlos más bajos.

## Publicar en GitHub Pages

Incluye `.nojekyll`, así que las carpetas que empiezan por número se sirven tal
cual. En *Settings → Pages*, rama `main`, carpeta `/ (root)`. Para el
subdominio, un archivo `CNAME` con `lenguajeo.kinolab07.co` y el DNS apuntando
a GitHub Pages.
