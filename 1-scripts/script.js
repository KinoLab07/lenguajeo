var videosS = [];
var listaVideosObj = [];

var nVideos = 10;
var nVideosSeleccionados = 0;

var divEntrar;
var divVideos;
var divRegresar;
var divPopup;
var divVideosPelicula;
var divInfo;
var peliculaVideo;
var peliculasContador = 0;
var enCreditos = false;
var yaEntroAlMenu = false;
var claveExitosa = false;
var videoEnPausa = false;
var terminoLaDescarga = false;
var audioEnPlay = false;

var texto = "And it will be there, <br>in an apparent revelry of things, <br>where the unpredictable muse will show her aura.<br><br>Y será allí, <br>en un aparente jolgorio de las cosas, <br>donde la imprevisible musa mostrará su aura.";

function construirPc()
{
	console.log(window.innerWidth + "---" + screen.height);
	
	construirContenedores();
	decargarArchivos();	
}

function construirContenedores()
{
	audioFondo = new Audio();
	audioFondo.src = "3-audio/audio.mp3";
	audioFondo.loop = true;
	audioFondo.volume = 0.1;
			
	divEntrar = cE('div', document.body);
	divEntrar.id = 'divEntrar';	
	
	divRegresar = cE("div", document.body);
	divRegresar.id = "divRegresar";
	divRegresar.innerHTML = "HOME";
	divRegresar.addEventListener("click", function()
	{
		construirInicio();
	});
	
	construirInicio();
	
	divPopupDescarga = cE('div', document.body);
	divPopupDescarga.id = "divPopupDescarga";	
}
	
function construirMenu()
{
	if(!claveExitosa)
	{
		divEntrar.style.display = "block";
		divEntrar.innerHTML = "";
		
		var divClave = cE("div", divEntrar);
		divClave.id = "divClave";
		
		var div = cE("div", divClave);
		div.innerHTML = "Enter the password to watch this movie";
		
		var divError = cE("div", divClave);
		divError.id = "divError";
		divError.innerHTML = "The key is wrong";
		
		var input = cE("input", divClave);
		
		var botonClaveDiv = cE("div", divClave);
		
		var botonClave = cE("span", botonClaveDiv);
		botonClave.id = "botonClave";
		botonClave.innerHTML = "Enter";
		botonClave.addEventListener("click", function()
		{
			if(input.value != "lenguajeo2023")
			{
				divError.style.display = "block";
			}
			else
			{
				claveExitosa = true;
				divEntrar.style.display = "none";
				divClave.style.display = "none";
				construirMenu();
				popupDescarga();
			}
		});
		
	}
	else
	{	
		if(!yaEntroAlMenu)
		{
			yaEntroAlMenu = true;
			openFullscreen(document.body);
		}
		else
		{
			divEntrar.style.display = "none";
			divRegresar.style.display = "block";
		}
	}
}

function openFullscreen(elem)
 {
	if (elem.requestFullscreen) 
	{
		elem.requestFullscreen();
	} 
	else if (elem.webkitRequestFullscreen) 
	{ 
		elem.webkitRequestFullscreen();
	} 
	else if (elem.msRequestFullscreen) 
	{ 
		elem.msRequestFullscreen();
	}
	
	window.setTimeout(function()
	{
		construirEscenario();
	}, 1500);
}

function construirInicio()
{
	divEntrar.style.display = "block";
	divEntrar.innerHTML = "";
	
	divRegresar.style.display = "none";
	
	var divTextosInt = cE("divTextosInt", divEntrar);
	
	var div	= cE("div", divTextosInt);
	div.id = "tituloEntrada";
	div.innerHTML = "LENGUAJEO (Walking Language)";
	
	var div	= cE("div", divTextosInt);
	div.id = "creditos1";
	div.innerHTML = "Written. Cooked. Filmed. Sound. Developed and partly edited by";
	
	var div	= cE("div", divTextosInt);
	div.id = "creditos2";
	div.innerHTML = "ENRICO MANDIROLA";
	
	var div	= cE("div", divTextosInt);
	div.className = "creditosTexto";
	div.innerHTML = "There are three territories in this filmic cartography. <br>" +
	"Each associated word-image suggests a possible place to get lost and build your own map.<br>" +
	"Each territory proposes certain routes.<br>" +
	"Each route is a place that has been walked and that I invite you to follow.<br>" +
	"<br>" +
	"Crossroads of possible paths to build filmic drifts.<br>" +
	"Every mountain, every river, every valley, belongs to a story,<br>" +
	"and each crossing between them will be a crossing of stories. <br>" +
	"The sequentiality of reading or listening or viewing each path, creates the map of an idea.";	
	
	var position = divTextosInt.getBoundingClientRect();	
	
	var divBotones = cE("div", divEntrar);
	divBotones.style.height = (window.innerHeight > position.bottom) ? window.innerHeight - position.bottom + "px" : "80px";
	divBotones.id = "divBotones";
	
	var div	= cE("div", divBotones);
	div.style.marginTop = (window.innerHeight > position.bottom) ? window.innerHeight - position.bottom - 60 + "px" : "40px"
	div.id = "filme";
	div.innerHTML = "FILM";
	div.addEventListener("click", function()
	{
		divEntrar.style.display = "none";
		divRegresar.style.display = "block";
		construirMenu();
	});
	
	var div	= cE("div", divBotones);
	div.style.marginTop = (window.innerHeight > position.bottom) ? window.innerHeight - position.bottom - 60 + "px" : "40px"
	div.id = "credits";
	div.innerHTML = "CREDITS";
	div.addEventListener("click", function()
	{
		ponerCreditos()
	});
}

function ponerCreditos()
{
	enCreditos = true;
	
	divRegresar.style.display = "none";
	
	divEntrar.innerHTML = "";
	
	var divCreditos = cE("div", divEntrar);
	divCreditos.className = "divCreditos";
	
	divCreditos.innerHTML = "Written. Cooked. Filmed. Sound. Developed and partly edited by <br>"+
	"Enrico Mandirola<br>"+
	"<br><br>"+
	"WebDesign: Alejandro Forero<br>"+
	"<br>"+
	"The texts written on the screen and the voice-over are the author's words mixed with fragments of the following texts:<br>"+
	"<i>But the clouds</i> – by Samuel Beckett (Trad. by Carlo Fruttero)<br>"+
	"<i>The tower</i> – by William Butler Yeats (Trad. By Antonio Rivero Taravillo)<br>"+
	"<i>Eighth Elegy</i> – by Rainer Maria Rilke (Trad. by Jorge Mejia Toro)<br>"+
	"<br>"+
	"The music and sound design was composed from original creations created by the author and sound fragments extracted from the page: www.freesound.org.<br>"+
	"The authors of the fragments that contributed to the creation of the piece are mentioned below:<br>"+
	"<br>"+
	"https://freesound.org/people/EminYildirim/sounds/536109/<br>"+
	"https://freesound.org/people/calebrankin/sounds/529383/<br>"+
	"https://freesound.org/people/vonfleisch/sounds/196699/<br>"+
	"https://freesound.org/people/InspectorJ/sounds/398808/<br>"+
	"https://freesound.org/people/MattJ99/sounds/66787/<br>"+
	"https://freesound.org/people/InspectorJ/sounds/413549/<br>"+
	"https://freesound.org/people/Slanesh/sounds/31763/<br>"+
	"https://freesound.org/people/InspectorJ/sounds/484470/<br>"+
	"https://freesound.org/people/InspectorJ/sounds/484344/<br>"+
	"https://freesound.org/people/mboscolo/sounds/212663/<br>"+
	"https://freesound.org/people/bouncyballblue/sounds/533914/<br>"+
	"https://freesound.org/people/Hope-Sounds/sounds/501048/<br>"+
	"https://freesound.org/people/niwki/sounds/172404/<br>"+
	"https://freesound.org/people/Astounded/sounds/518585/<br>"+
	"https://freesound.org/people/straget/sounds/414921/<br>"+
	"https://freesound.org/people/pulswelle/sounds/339517/<br>"+
	"https://freesound.org/people/nemoDaedalus/sounds/60453/<br>"+
	"https://freesound.org/people/nextmaking/sounds/86045/<br>"+
	"https://freesound.org/people/LG/sounds/74471/<br>"+
	"https://freesound.org/people/LG/sounds/72805/<br>"+
	"https://freesound.org/people/urupin/sounds/159609/<br>"+
	"https://freesound.org/people/jus/sounds/73617/<br>"+
	"https://freesound.org/people/Bidone/sounds/71778/<br>"+
	"https://freesound.org/people/tim.kahn/sounds/201102/<br>"+
	"<br>"+
	"<br>"+
	"ACKNOWLEDGMENTS:<br>"+
	"These are the names that represent those bodies with organs that for some years have accompanied me in the reflection and construction of this body without organs that I begin to recognize in this film. To these names I say thank you. It has been a delight to share this walking language and this cooking with you. Natalia, Malaika, Diego, German, Henry, Juanito, Waira, Claudia, my family of blood, my family of spirits, Alejandro with his codes, Ricardo and Mauricio who put up with me, and continue to put up with me.<br>"+
	"";
	
	var imgLogoDiv = cE("div", divEntrar);
	imgLogoDiv.className = "imgLogoDiv";
	
	var img = cE("img", imgLogoDiv);
	img.src = "2-imagenes/logo.png";
	
	var divBotones = cE("div", divEntrar);
	divBotones.style.height = "80px";
	divBotones.style.lineHeight = "80px";
	divBotones.id = "divBotones";
	
	var div	= cE("div", divBotones);
	div.id = "filme";
	div.innerHTML = "FILM";
	div.addEventListener("click", function()
	{
		divEntrar.style.display = "none";
		divRegresar.style.display = "block";
		construirMenu();
	});
	
	var div	= cE("div", divBotones);
	div.id = "credits";
	div.innerHTML = "HOME";
	div.addEventListener("click", function()
	{
		construirInicio(divEntrar);
	});
}

function ponerPeliculas()
{
	audioFondo.pause();
	divPopup.style.display = "block";		
	divVideosPelicula.innerHTML = "";
	
	var loadingImg = cE("img", divVideosPelicula);
	loadingImg.id = "loadingImg";
	loadingImg.src = "2-imagenes/loading.gif";	
	
	if(peliculasContador < videosS.length)
	{			
		videoEnPausa = false;
		
		peliculaVideo = null;
		
		peliculaVideo = videosS[peliculasContador];
		peliculaVideo.currentTime = 0;
		peliculaVideo.style.display = "block";	
		peliculaVideo.play();
		peliculaVideo.onended = function()
		{
			peliculaVideo.style.display = "none";
			peliculasContador++;
			ponerPeliculas();
		}
	}
	else
	{
		divVideosPelicula.innerHTML = "";
		divPopup.style.display = "none";
		quitarSeleccion();		
	}
}

function quitarSeleccion()
{	
	for(var i=0; i<listaVideosObj.length; i++)
	{
		var videoObj = listaVideosObj[i];
	
		videoObj.escogido = false;
				
		var indice = videosS.indexOf(videoObj.videoFull);
		
		if(indice > -1) 
		{
			videosS.splice(indice, 1);	
			videoObj.contenedorInfo.style.opacity = 0;		
		}
	}
	
	actualizarInfo();
	
	window.setTimeout(function()
	{
		audioFondo.play();
	}, 1000)
}

function actualizarInfo()
{
	for(var i=0; i<listaVideosObj.length; i++)
	{
		var videoObj = listaVideosObj[i];
		
		var indice = videosS.indexOf(videoObj.videoFull);
		
		if(indice>=0)
		{
			videoObj.nVideoTexto.style.opacity = 1;
			videoObj.nVideoTexto.innerHTML = indice+1;
		}
		else
		{
			videoObj.nVideoTexto.style.opacity = 0;
		}		
	}
	
	if(videosS.length > 0)
	{
		divInfoBoton.style.display = "block";
	}
	else
	{
		divInfoBoton.style.display = "none";
	}
}

function mostrarPopup()
{

}

function preload() 
{	
	
}

function setup() 
{

}

function draw()
{
	background(0);	
}

function windowResized() 
{
  	resizeCanvas(windowWidth, windowHeight);
}