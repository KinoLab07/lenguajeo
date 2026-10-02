/* Cada sendero del menú.
 *
 * Antes la miniatura y su ficha eran dos elementos sueltos colgados del body,
 * colocados uno encima del otro a base de coordenadas repetidas en el CSS.
 * Ahora cada sendero es un solo contenedor con las dos cosas dentro, así que
 * basta con situar el contenedor: el CSS se queda con la mitad de reglas y en
 * un teléfono se puede reordenar la rejilla sin tocar nada más.
 */

class VideoObj
{
	constructor()
	{
		this.id;
		this.imgSrc;
		this.indiceVideo;
		this.escogido = false;
	}

	pintar(padre)
	{
		var thisObj = this;

		this.contenedor = cE("div", padre || document.body);
		this.contenedor.id = "sendero-" + this.indiceVideo;
		this.contenedor.className = "sendero";
		this.contenedor.tabIndex = 0;
		this.contenedor.setAttribute("role", "button");
		this.contenedor.setAttribute("aria-pressed", "false");
		this.contenedor.setAttribute("aria-label", this.sendero);

		this.contenedorImg = cE("div", this.contenedor);
		this.contenedorImg.className = "contenedorImg";

		this.img = cE("img", this.contenedorImg);
		this.img.src = this.imgSrc;
		this.img.alt = "";
		this.img.loading = "lazy";

		this.contenedorInfo = cE("div", this.contenedor);
		this.contenedorInfo.className = "contenedorInfo";

		var div = cE("div", this.contenedorInfo);
		div.className = "territorio";
		div.innerHTML = "Territorio";

		var territorioTexto;

		if(this.territorio == 1)
		{
			territorioTexto = "Metacine";
		}
		else if(this.territorio == 2)
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

		this.contenedor.addEventListener("click", function()
		{
			thisObj.selecionarVideo();
		});

		this.contenedor.addEventListener("keydown", function(e)
		{
			if(e.key === "Enter" || e.key === " ")
			{
				e.preventDefault();
				thisObj.selecionarVideo();
			}
		});
	}

	selecionarVideo()
	{
		var indice = videosS.indexOf(this.indiceVideo);

		if(indice === -1)
		{
			videosS.push(this.indiceVideo);
			this.escogido = true;
		}
		else
		{
			videosS.splice(indice, 1);
			this.escogido = false;
		}

		this.contenedor.setAttribute("aria-pressed", String(this.escogido));
		this.contenedor.classList.toggle("escogido", this.escogido);

		actualizarInfo();
	}
}
