<!-- SEKCJA FILTROWANIA OFERT -->
var z = document.getElementById("show/hide");
var v = document.getElementById("filter");
var q = document.getElementById("form");

z.onclick = function(event) {
z.classList.toggle('fa-eye-slash');
v.classList.toggle('open');
q.classList.toggle('open');
}
