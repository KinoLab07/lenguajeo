/* De dónde salen los diez vídeos.
 *
 * Vacío  -> la carpeta local 4-videos/, que es lo cómodo para trabajar.
 * Con URL -> los adjuntos de la release de GitHub (ver 4-videos/LEEME.md).
 *
 * Ejemplo:
 *   var VIDEOS_BASE = "https://github.com/USUARIO/REPO/releases/download/videos-v1/";
 */
var VIDEOS_BASE = "";

function urlVideo(i)
{
	return (VIDEOS_BASE || "4-videos/") + i + ".mp4";
}
