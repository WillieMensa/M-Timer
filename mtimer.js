/*
	mtimer.js

*/

//	-------------------------
//	Constantes
//	-------------------------
const
	VERSION	= "0.9.6",			//	version inicial
	FONDO_APP = "#011",			//	 "#ffc",
	FONT_NIVEL1 = "balooregular"	//	titulo:	"Bangers",	"Luckiest Guy",	"titan_one", "Sigmar One"
	//	FONT_NIVEL2 = "bangersregular",	//	botones: "Bangers",	//	"Sigmar One",
	//	FONT_NIVEL3 = "sriracharegular",		//	textos:
	//	DEBUG = false,
	DEBUG = true,				//	depurar o no depurar
	minutosOff = 150,		//	pos izq txt min
	foo = 0;

var
	nDist = undefined,		//	tiempo fijado en el timer en milisegundos
	cMin = "20",
	cSeg = "00",					//	minutos y segundos en formato texto
	stopTime = undefined,	//	el horario de finalizacion
	detener = false,			//	variable indica solicitud detener temporizador
	audioElement = document.createElement('audio');	//	contiene el elemento de audio para avisar finalizacion de tiempo




function init() {
	fijaTiempo();
	if (DEBUG)
	{
		var	screenWidth = window.innerWidth,
			screenHeight = window.innerHeight;
			document.getElementById("medidas").innerHTML = "Pantall: " + screenWidth + " x " + screenHeight + " / Version: " + VERSION;

	}

	document.getElementById('detiene').style.visibility='hidden';

}




function ajustaMinu( nDir ) {
	//	ajustar valores iniciales del timer
	var nMin = undefined;
	nMin = parseInt( cMin ) + nDir;
	nMin = ((nMin < 0) ? 0 : ((nMin > 60) ? 60 : nMin ) );
	cMin = ("00" + nMin).slice(-2);
	document.getElementById("minutos").innerHTML = cMin;
	//	console.log ("nMin, cMin: " + nMin + ", " + cMin);
}


function ajustaSegu( nDir ) {
	//	ajustar valores iniciales del timer
	var nSeg = undefined;
	nSeg = parseInt( cSeg ) + nDir;
	nSeg = ((nSeg < 0) ? 0 : ((nSeg > 60) ? 60 : nSeg ) );
	cSeg = ("00" + nSeg).slice(-2);
	document.getElementById("segundos").innerHTML = cSeg;
}



function fijaTiempo() {
	document.getElementById("minutos").innerHTML = cMin;
  document.getElementById("segundos").innerHTML = cSeg;

}



function startButton() {
	nDist = cMin * 60000 + cSeg * 1000;
	console.log( "nDist: " + nDist );

	if (nDist > 0) {


			detener = false;
			document.getElementById('detiene').style.visibility='visible';

			stopTime = new Date().getTime() + nDist + 10;		//	devuelve la hora de finalizacion
				//	agrego 2 milisegundos para compensar tiempo de calculo previo
				//	caso contrario no muestra el primer momento correctamente

			if (DEBUG) { console.log("Tiempo inicial, stopTime: " + cMin + ":" + cSeg + ", " + stopTime);	}

			ocultaBotones();
			iniciaReloj();


	} else {
		nDist = 0;
		cMin = "00";
		cSeg = "00";
		detener = true;
	}

	if (DEBUG){	console.log("despues de iniciaReloj()");}
	//	muestraBotones();

}


//	boton para iniciar timer
function iniciaReloj() {

	document.getElementById('detiene').style.visibility='visible';


	//	setInterval() Ejecuta una función o un fragmento de código de forma repetitiva cada vez
	//	que termina el periodo de tiempo determinado. Devuelve un ID de proceso.
	//	en este caso actualiza la cuenta regresiva cada segundo
	var x = setInterval(function() {

		// Get todays date and time
		var now = new Date().getTime();

		//	console.log( "stopTime, now, cDist antes: " + stopTime +", " + now +", " + cDist )

		// Find the distance between now and the count down date
		nDist = stopTime - now;
		//	console.log( "nDist, stopTime, now: " + nDist +", "+ stopTime +", "+ now );

		actualizaReloj();


		// If the count down is over, write some text
		if (nDist < 10 ) {
			clearInterval(x);
			//	aqui poner aviso: una alarma de sonido, parpadeo y/o similar

			// creamos el objeto audio
			//	var audioElement = document.createElement('audio');
			// indicamos el archivo de audio a cargar
			audioElement.setAttribute('src', 'psicosis.mp3');
			//	Si deseamos que una vez cargado empieze a sonar...
			//	audioElement.setAttribute('autoplay', 'autoplay');
			//	iniciamos el audio
			audioElement.play();

		} else if (detener) {
			//	sin alarma porque fue detencion solicitada
			clearInterval(x);

		}

	}, 1000);

}



function actualizaReloj() {
		// Time calculations for minutes and seconds
		cMin = ("00" + Math.floor((nDist % (3600000)) / 60000 )).slice(-2);
		cSeg = ("00" + Math.floor((nDist % 60000 ) / 1000)).slice(-2);

		// Output the result
		//	<!-- document.getElementById("minutos").innerHTML = strMin.slice(-2); -->
		document.getElementById("minutos").innerHTML = cMin;
		document.getElementById("segundos").innerHTML = cSeg;

		//	console.log( "cDist, : " +  cDist + ", " + strMin.slice(-2) + ":" + strSeg.slice(-2));
		//	console.log( strSeg + ", " + strSeg.length + ", " + strSeg.slice(-2));
}


//--------------------
// hidden all button
//--------------------
function ocultaBotones() {
	//	oculta botones innecesarios mientras funciona el timer
	document.getElementById('incMinu').style.visibility='hidden';
	document.getElementById('decMinu').style.visibility='hidden';
	document.getElementById('inicia').style.visibility='hidden';
	document.getElementById('detiene').style.visibility='hidden';
	document.getElementById('incSegu').style.visibility='hidden';
	document.getElementById('decSegu').style.visibility='hidden';

}



//--------------------
// muestra todos los botones
//--------------------
function muestraBotones() {
	//	oculta botones innecesarios mientras funciona el timer
	document.getElementById('incMinu').style.visibility='visible';
	document.getElementById('decMinu').style.visibility='visible';
	document.getElementById('inicia').style.visibility='visible';
	document.getElementById('detiene').style.visibility='visible';
	document.getElementById('incSegu').style.visibility='visible';
	document.getElementById('decSegu').style.visibility='visible';

}



function detiene() {
	detener=true;
	muestraBotones();
	document.getElementById('detiene').style.visibility='hidden';

	audioElement.pause();
	audioElement.currentTime = 0;
	//	audioElement.muted = true;

}


/*	=======================================
BEGIN for set|get|clear localstorage

documentacion en:
	https://developer.mozilla.org/es/docs/Web/API/API_de_almacenamiento_web/Usando_la_API_de_almacenamiento_web

======================================	*/

function setStorage(key, value) 
{
	if(typeof(window.localStorage) != 'undefined'){ 
		window.localStorage.setItem(key,value); 
	} 
}

function getStorage(key) 
{
	var value = null;
	if(typeof(window.localStorage) != 'undefined'){ 
		value = window.localStorage.getItem(key); 
	} 
	return value;
}

function clearStorage(key) 
{
	if(typeof(window.localStorage) != 'undefined'){ 
		window.localStorage.removeItem(key); 
	} 
}


//-------------------------------------------------------------------
// adaptacion idiomas
//-------------------------------------------------------------------
function initLanguage()		//	para adaptar a diferentes idiomas
{
	var sysLang = "sp";

	if(sysLang == "en" || sysLang == "en") { //	ingles
		txtAyuda	= "Help";
		txtJugar = "Play",
		txtAcerca = "About",
		txtDescAcerca =
			'About MENSA timer version ' + VERSION  + '\n' +
			'Is a timer developed by Willie Verger Ingenuity Games \n' +
			'Support: info@ingverger.com.ar\n' +
			'Web: ingverger.com.ar\n' +
			'\n';
		txtDescAyuda =
			'How does it work? \n' +
			'There is a set of cards, each with an image, placed in such a way \n' +
			'The game ends when all pairs have been found. \n',
			txtFin = "Well resolved!\nCongratulations! ",
			txtTiempo = "Elapsed time: ";
		finishText = "Congratulation";
		levelText = "Level";
	} else if(sysLang == "de" || sysLang == "de") { //	aleman
		txtAyuda	= "Hilfe";
		txtJugar = "Spielen",
		txtAcerca = "Über",
		txtDificu = "Schwierigkeit";
		txtDescAcerca =
			'Über MEMORIOSO Version ' + VERSION  + '\n' +
			'Es ist ein von Willie Verger Ingenuity Games \n' +
			'entwickeltes Spiel, um Konzentration und \n' +
			'Gedächtnis zu trainieren. \n' +
			'Unterstützung: info@ingverger.com.ar\n' +
			'Web: ingverger.com.ar\n' +
			'\n';
		txtDescAyuda =
			'Was ist es?\n' +
			'MEMORIOSO ist ein Spiel der Konzentration und des Gedächtnisses.\n' +
			'Es gibt eine Reihe von Karten mit jeweils einem Bild so platziert,\n' +
			'dass seine Vorderseite nicht sichtbar ist.\n' +
			'Es gibt zwei Registerkarten für jedes Bild. Das Spiel ist zu finden\n' +
			'die Paare gleicher Bilder.\n' +
			'Wenn Sie auf ein Bild klicken, wird es umgedreht.\n' +
			'Es werden zwei aufeinander folgende Karten ausgewählt. Wenn sie \n' +
			'sich als gleich herausstellen, werden sie vom Board entfernt. \n' +
			'Wenn sie unterschiedlich sind, kehren sie zur ursprünglichen \n' +
			'Position zurück.\n' +
			'Das Spiel endet, wenn alle Paare gefunden wurden.\n',
		txtFin = "Gut gelöst!\nGlückwunsch! ",
		txtTiempo = "Verstrichene Zeit: ";
		noSolutionText = "keine losung ";
		nextText = "Nächste";
		finishText = "Glückwunsch!";
		levelText = "Niveau";
	}
}


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



