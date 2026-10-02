# Los vídeos no están en este repositorio

Los diez senderos pesan 632 MB. Meterlos en Git tiene dos problemas: GitHub
Pages tiene un tope de 1 GB por sitio y unos 100 GB de tráfico al mes, y cada
vez que se reemplazara un vídeo el historial se quedaría con la copia vieja
dentro para siempre.

En su lugar se publican como **adjuntos de una release de GitHub**, que se
sirven desde el CDN de GitHub y no gastan la cuota de Pages.

## Subirlos

Con los diez `.mp4` en esta carpeta y la [CLI de GitHub](https://cli.github.com)
instalada:

```bash
./tools/subir-videos.sh
```

## De dónde los lee el sitio

De `1-scripts/config.js`. Si `VIDEOS_BASE` está vacío, los busca en esta misma
carpeta, que es lo cómodo para trabajar sin conexión. Si tiene una URL, los
lee de ahí.
