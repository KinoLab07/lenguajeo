/* Atajo para crear un elemento y colgarlo de su padre.
 *
 * Aquí vivían también los objetos Explorador y esCelular: doscientas líneas de
 * detección de navegador a base de leer el userAgent, con ramas para OmniWeb,
 * iCab, Konqueror, Netscape y MSIE. Lo único que decidían era si llamar a una
 * función u otra... y las tres ramas llamaban a la misma. Lo que antes se
 * resolvía así ahora lo hacen las media queries del CSS.
 */

function cE(tagName, parentEl)
{
	var elemento = document.createElement(tagName);

	if(parentEl)
	{
		parentEl.appendChild(elemento);
	}

	return elemento;
}
