var indiceArchivos = 0;
var tiempoEspera = 500;

var video0;
var video1;
var video2;
var video3;
var video4;
var video5;
var video6;
var video7;
var video8;
var video9;
var audioFondo;

var indiceArchivosAnterior = 0;
var porcentaje = 0;
var indiceArchivos = 0;

function popupDescarga()
{	
	if(terminoLaDescarga)
	{
		divPopupDescarga.style.display = "none";	
	}
	else
	{
		if(indiceArchivosAnterior == indiceArchivos)
		{
			porcentaje++;
			
			if(porcentaje > Math.floor((indiceArchivos+1)*100/10))
			{
				porcentaje = Math.floor((indiceArchivos+1)*100/10);
			}
		}
		else
		{
			porcentaje = Math.floor(indiceArchivos*100/10);
		}
		
		if(porcentaje == 100)
		{
			porcentaje = 99;	
		}
		
		divPopupDescarga.style.display = "block";
		divPopupDescarga.innerHTML = porcentaje + "%";
		
		indiceArchivosAnterior = indiceArchivos;
		
		window.setTimeout(function()
		{
			popupDescarga();
		}, 911);
	}
}

function decargarArchivos()
{	
	if(indiceArchivos == 0)
	{
		video0 = cE('video', document.body);
		video0.id = "video0";
		video0.src = '4-videos/0.mp4?n=5';
		video0.style.display = "none";
		video0.preload = "auto";
		video0.oncanplay = continuarDescarga;
	}
	else if(indiceArchivos == 1)
	{
		video1 = cE('video', document.body);
		video1.id = "video1";
		video1.src = '4-videos/1.mp4?n=5';
		video1.style.display = "none";
		video1.preload = "auto";
		video1.controls = false;	
		video1.oncanplay = continuarDescarga;
	}
	else if(indiceArchivos == 2)
	{		
		video2 = cE('video', document.body);
		video2.id = "video2";
		video2.src = '4-videos/2.mp4?n=5';
		video2.style.display = "none";
		video2.preload = "auto";
		video2.controls = false;	
		video2.oncanplay = continuarDescarga;
	}
	else if(indiceArchivos == 3)
	{
		video3 = cE('video', document.body);
		video3.id = "video3";
		video3.src = '4-videos/3.mp4?n=5';
		video3.style.display = "none";
		video3.preload = "auto";
		video3.controls = false;	
		video3.oncanplay = continuarDescarga;
	}
	else if(indiceArchivos == 4)
	{
		video4 = cE('video', document.body);
		video4.id = "video4";
		video4.src = '4-videos/4.mp4?n=5';
		video4.style.display = "none";
		video4.preload = "auto";
		video4.controls = false;	
		video4.oncanplay = continuarDescarga;
	}
	else if(indiceArchivos == 5)
	{
		video5 = cE('video', document.body);
		video5.id = "video5";
		video5.src = '4-videos/5.mp4?n=5';
		video5.style.display = "none";
		video5.preload = "auto";
		video5.controls = false;	
		video5.oncanplay = continuarDescarga;
	}
	else if(indiceArchivos == 6)
	{
		video6 = cE('video', document.body);
		video6.id = "video6";
		video6.src = '4-videos/6.mp4?n=5';
		video6.style.display = "none";
		video6.preload = "auto";
		video6.controls = false;	
		video6.oncanplay = continuarDescarga;
	}
	else if(indiceArchivos == 7)
	{
		video7 = cE('video', document.body);
		video7.id = "video7";
		video7.src = '4-videos/7.mp4?n=5';
		video7.style.display = "none";
		video7.preload = "auto";
		video7.controls = false;	
		video7.oncanplay = continuarDescarga;
	}
	else if(indiceArchivos == 8)
	{
		video8 = cE('video', document.body);
		video8.id = "video8";
		video8.src = '4-videos/8.mp4?n=5';
		video8.style.display = "none";
		video8.preload = "auto";
		video8.controls = false;	
		video8.oncanplay = continuarDescarga;
	}
	else if(indiceArchivos == 9)
	{
		video9 = cE('video', document.body);
		video9.id = "video9";
		video9.src = '4-videos/9.mp4?n=5';
		video9.style.display = "none";
		video9.controls = false;
		video9.preload = "auto";	
		video9.oncanplay = continuarDescarga;
	}
	else if(indiceArchivos >= 10)
	{		
		if(!terminoLaDescarga)
		{
			terminoLaDescarga = true;
			crearObjetos();
		}
	}
}

function continuarDescarga()
{
	indiceArchivos++;
	decargarArchivos();
}

function construirEscenario()
{
	if(!audioEnPlay)
	{
		audioEnPlay = true;
		audioFondo.play()
	}
		
	divPopup = cE('div', document.body);
	divPopup.id = 'divPopup';
	
	var x = cE("div", divPopup);
	x.innerHTML = "X";
	x.className = "x";
	x.addEventListener("click", function()
	{
		peliculaVideo.pause();
		peliculaVideo.style.display = "none";
		videoEnPausa = true;
		divPopup.style.display = "none";
		divVideosPelicula.innerHTML = "";
		quitarSeleccion();
	});
	
	divVideosPelicula = cE('div', divPopup);
	divVideosPelicula.innerHTML = "Estamos acá";
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
};

function crearObjetos()
{
	console.log("entro");
	
	for(var i=0; i<nVideos; i++)
	{
		if(i==0)
		{
			var territorio = 1;
			var sendero = "Sendero Mirada";	
			var videoFull = video0;
		}
		else if(i==1)
		{
			var territorio = 2;
			var sendero = "Sendero Nuvole";
			var videoFull = video1;
		}
		else if(i==2)
		{
			var territorio = 3;
			var sendero = "Sendero Cine Ojo";
			var videoFull = video2;
		}
		else if(i==3)
		{
			var territorio = 2;
			var sendero = "Sendero Espiral";
			var videoFull = video3;
		}
		else if(i==4)
		{
			var territorio = 1;
			var sendero = "Sendero Camino";
			var videoFull = video4;
		}
		else if(i==5)
		{
		
			var territorio = 3;
			var sendero = "Sendero Ruinas";
			var videoFull = video5;
		}
		else if(i==6)
		{
		
			var territorio = 2;
			var sendero = "Sendero Grito";
			var videoFull = video6;
		}
		else if(i==7)
		{
		
			var territorio = 1;
			var sendero = "Sendero Tiempo";
			var videoFull = video7;
		}
		else if(i==8)
		{
			
			var territorio = 3;
			var sendero = "Sendero Día";
			var videoFull = video8;
		}
		else
		{
			var territorio = 2;
			var sendero = "Sendero Interludio Filmico";
			var videoFull = video9;
		}
		
		var videoObj = new VideoObj();
		videoObj.id = "videoObj" + i;
		videoObj.imgSrc = "2-imagenes/" + i +".png?v=5";
		videoObj.territorio = territorio;
		videoObj.sendero = sendero;
		videoObj.videoFullSrc = "4-videos/" + i + ".mp4?v=5";
		videoObj.videoFull = videoFull;
		videoObj.pintar();
		
		listaVideosObj.push(videoObj);
	}
}