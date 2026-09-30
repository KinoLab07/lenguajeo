class VideoObj
{
	constructor()
	{
		this.id;
		this.img;
		this.imgSrc;
		this.video;
		this.contenedor;
		this.escogido = false;
	}
	
	pintar()
	{
		var thisObj = this;
		
		this.contenedorImg = cE("div", document.body);
		this.contenedorImg.id = "cImg-" + this.id;
		this.contenedorImg.className = "contenedorImg";
		
		this.img = cE("img", this.contenedorImg);
		this.img.src = this.imgSrc;	
		
		this.contenedorInfo = cE("div", document.body);
		this.contenedorInfo.id = "cInfo-" + this.id;
		this.contenedorInfo.className = (this.prueba>0) ? "contenedorInfo2" : "contenedorInfo";
		this.contenedorInfo.addEventListener("mouseover", function()
		{			
			thisObj.contenedorInfo.style.opacity = 1;			
		});
		this.contenedorInfo.addEventListener("mouseout", function()
		{
			if(!thisObj.escogido)
			{			
				thisObj.contenedorInfo.style.opacity = 0;
			}
		});
		this.contenedorInfo.addEventListener("click", function()
		{			
			thisObj.selecionarVideo();	
		});
		
		var div = cE("div", this.contenedorInfo);
		div.className = "territorio";
		div.innerHTML = "Territorio";
		
		var territorioTexto;
		
		if(this.territorio==1)
		{
			territorioTexto = "Metacine";
		}
		else if(this.territorio==2)
		{
			territorioTexto = "Musa";
		}
		else
		{
			territorioTexto = "Cine Poesia";
		}
		
		var div = cE("div", this.contenedorInfo);
		div.innerHTML = territorioTexto;
		
		this.nVideoTexto = cE("div", this.contenedorInfo);
		this.nVideoTexto.className = "numero";
		this.nVideoTexto.innerHTML = " ";
		
		var div = cE("div", this.contenedorInfo);
		div.innerHTML = this.sendero;
	}
	
	selecionarVideo()
	{
		var thisObj = this;
		
		if(!thisObj.escogido)
		{
			thisObj.escogido = true;			
			
			var indice = videosS.length;
			videosS[indice] = this.videoFull;
			
			thisObj.indice = indice;			
			thisObj.nVideoTexto.innerHTML = indice+1;
		}
		else
		{
			thisObj.escogido = false;
			
			var indice = videosS.indexOf(this.videoFull);
			
			if (indice > -1) 
			{
  				videosS.splice(indice, 1);			
			}
		}
		
		actualizarInfo();			
	}
}