<!-- MENU (TRYB MOBILNY) -->
var x = document.getElementById("icon");
var y = document.getElementById("menu");

x.onclick = function(event) {
  x.classList.toggle('open');
  y.classList.toggle('open');
}

<!-- ROZMIAR CZCIONKI -->
var fontSize = getCookieValue('fontSize');
if(fontSize == 'medium') FontMedium();
if(fontSize == 'large')  FontLarge();

function FontDefault() {
  document.getElementById('html').style.fontSize = '1vw';
  setCookie('fontSize', 'default');
}

function FontMedium() {
  document.getElementById('html').style.fontSize = '1.2vw';
  setCookie('fontSize', 'medium');
}

function FontLarge() {
  document.getElementById('html').style.fontSize = '1.4vw';
  setCookie('fontSize', 'large');
}

<!-- KONTRAST -->
let contrastMode = getCookieValue('contrastMode');
if(contrastMode == 'black')  ContrastBlack();
if(contrastMode == 'yellow') ContrastYellow();

function ContrastDefault() {
  let elementy = document.getElementsByClassName("contrast");
  for (e of elementy) e.style.color = "";
  for (e of elementy) e.style.background = "";
  elementy = document.getElementsByClassName("X");
  for (e of elementy) e.style.background = "";
  elementy = document.getElementsByClassName("contrast-container");
  for (e of elementy) e.style.boxShadow = "";
  for (e of elementy) e.style.background = "";
  elementy = document.getElementsByClassName("contrast-header");
  for (e of elementy) e.style.background = "";
  for (e of elementy) e.style.boxShadow = "";
  elementy = document.getElementsByClassName("contrast-button");
  for (e of elementy) e.style.color = "";
  for (e of elementy) e.style.borderColor = "";
  for (e of elementy) e.style.background = "";
  elementy = document.getElementsByClassName("contrast-input");
  for (e of elementy) e.style.color = "";
  for (e of elementy) e.style.borderColor = "";
  for (e of elementy) e.style.background = "";
  elementy = document.getElementsByClassName("contrast-reverse");
  for (e of elementy) e.style.color = "";
  elementy = document.getElementsByClassName("contrast-icon");
  for (e of elementy) e.style.color = "";
  setCookie('contrastMode', 'default');
}

function ContrastBlack() {
  let elementy = document.getElementsByClassName("contrast");
  for (e of elementy) e.style.color = "white";
  for (e of elementy) e.style.background = "black";
  elementy = document.getElementsByClassName("X");
  for (e of elementy) e.style.background = "white";
  elementy = document.getElementsByClassName("contrast-container");
  for (e of elementy) e.style.boxShadow = "none";
  for (e of elementy) e.style.background = "black";
  elementy = document.getElementsByClassName("contrast-header");
  for (e of elementy) e.style.background = "black";
  for (e of elementy) e.style.boxShadow = "0vw 0.1vw 0vw white";
  elementy = document.getElementsByClassName("contrast-button");
  for (e of elementy) e.style.color = "white";
  for (e of elementy) e.style.borderColor = "white";
  for (e of elementy) e.style.background = "black";
  elementy = document.getElementsByClassName("contrast-input");
  for (e of elementy) e.style.color = "white";
  for (e of elementy) e.style.borderColor = "white";
  for (e of elementy) e.style.background = "black";
  elementy = document.getElementsByClassName("contrast-icon");
  for (e of elementy) e.style.color = "white";
  elementy = document.getElementsByClassName("contrast-reverse");
  for (e of elementy) e.style.color = "white";
  setCookie('contrastMode', 'black');
}

function ContrastYellow() {
  let elementy = document.getElementsByClassName("contrast");
  for (e of elementy) e.style.color = "yellow";
  for (e of elementy) e.style.background = "black";
  elementy = document.getElementsByClassName("X");
  for (e of elementy) e.style.background = "yellow";
  elementy = document.getElementsByClassName("contrast-container");
  for (e of elementy) e.style.boxShadow = "none";
  for (e of elementy) e.style.background = "black";
  elementy = document.getElementsByClassName("contrast-header");
  for (e of elementy) e.style.background = "black";
  for (e of elementy) e.style.boxShadow = "0vw 0.1vw 0vw yellow";
  elementy = document.getElementsByClassName("contrast-button");
  for (e of elementy) e.style.color = "yellow";
  for (e of elementy) e.style.borderColor = "yellow";
  for (e of elementy) e.style.background = "black";
  elementy = document.getElementsByClassName("contrast-input");
  for (e of elementy) e.style.color = "yellow";
  for (e of elementy) e.style.borderColor = "yellow";
  for (e of elementy) e.style.background = "black";
  elementy = document.getElementsByClassName("contrast-icon");
  for (e of elementy) e.style.color = "yellow";
  elementy = document.getElementsByClassName("contrast-reverse");
  for (e of elementy) e.style.color = "white";
  setCookie('contrastMode', 'yellow');
}
