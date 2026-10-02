/* Los diez senderos.
 *
 * Antes este archivo descargaba los diez vídeos enteros —632 MB— antes de
 * enseñar el menú. Ahora el menú aparece de inmediato y cada vídeo se pide
 * solo cuando el espectador lo elige; mientras uno se reproduce, se va
 * precargando el siguiente de la cola para que el encadenado no tenga cortes.
 */

var SENDEROS =
[
	{ territorio: 1, sendero: "Sendero Mirada" },
	{ territorio: 2, sendero: "Sendero Nuvole" },
	{ territorio: 3, sendero: "Sendero Cine Ojo" },
	{ territorio: 2, sendero: "Sendero Espiral" },
	{ territorio: 1, sendero: "Sendero Camino" },
	{ territorio: 3, sendero: "Sendero Ruinas" },
	{ territorio: 2, sendero: "Sendero Grito" },
	{ territorio: 1, sendero: "Sendero Tiempo" },
	{ territorio: 3, sendero: "Sendero Día" },
	{ territorio: 2, sendero: "Sendero Interludio Filmico" }
];

var audioFondo;
var divConstelacion;

/* Un reproductor para lo que se ve y otro que va cargando el siguiente por
   detrás. Al terminar un sendero se intercambian. */
var reproductor = null;
var reproductorEnEspera = null;

function crearReproductor()
{
	var v = cE('video', divPopup || document.body);
	v.className = "peliculaFull";
	v.preload = "auto";
	v.controls = false;
	v.playsInline = true;
	v.setAttribute("playsinline", "");
	v.style.display = "none";
	return v;
}

function cargarEn(video, indice)
{
	if(video.dataset.indice != String(indice))
	{
		video.dataset.indice = indice;
		video.src = urlVideo(indice);
		video.load();
	}
	return video;
}

/* Deja pedido el siguiente de la cola mientras se ve el actual. */
function precargarSiguiente()
{
	var siguiente = videosS[peliculasContador + 1];

	if(siguiente === undefined)
	{
		return;
	}

	if(!reproductorEnEspera)
	{
		reproductorEnEspera = crearReproductor();
	}

	cargarEn(reproductorEnEspera, siguiente);
}

function construirEscenario()
{
	if(!audioEnPlay)
	{
		audioEnPlay = true;
		audioFondo.play().catch(function(){ /* el navegador puede negarse hasta que haya un gesto */ });
	}

	divPopup = cE('div', document.body);
	divPopup.id = 'divPopup';

	var x = cE("div", divPopup);
	x.innerHTML = "X";
	x.className = "x";
	x.addEventListener("click", cerrarPelicula);

	divVideosPelicula = cE('div', divPopup);
	divVideosPelicula.id = 'divVideosPelicula';

	divInfo = cE("div", document.body);
	divInfo.id = "divInfo";

	var divTexto = cE("div", divInfo);
	divTexto.innerHTML = texto;
	divTexto.id = "divTexto";

	divInfoBoton = cE("div", divInfo);
	divInfoBoton.innerHTML = "PLAY";
	divInfoBoton.id = "divInfoBoton";
	divInfoBoton.addEventListener("click", function()
	{
		peliculasContador = 0;
		ponerPeliculas();
	});

	crearObjetos();

	terminoLaDescarga = true;
}

function crearObjetos()
{
	divConstelacion = cE("div", document.body);
	divConstelacion.id = "constelacion";

	for(var i = 0; i < nVideos; i++)
	{
		var videoObj = new VideoObj();
		videoObj.id = "videoObj" + i;
		videoObj.indiceVideo = i;
		videoObj.imgSrc = "2-imagenes/" + i + ".png";
		videoObj.territorio = SENDEROS[i].territorio;
		videoObj.sendero = SENDEROS[i].sendero;
		videoObj.pintar(divConstelacion);

		listaVideosObj.push(videoObj);
	}
}
