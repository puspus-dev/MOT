/* MOT – 3D animációk oldal: a kártyák a 3d.js ANIMACIOK regiszteréből épülnek, és a közös 3D-kapcsolóval ki-be kapcsolhatók.
   A #hash (pl. animaciok.html#evszakok) a megfelelő kártyához görget. */
oldalKeret("animaciok.html");
if (typeof THREE === "undefined") {
  $("#kartyak").innerHTML = `<div class="panel ures">A 3D könyvtár nem töltődött be.</div>`;
} else {
  ANIMACIOK.forEach((a) => animBeszur(a.kulcs, $("#kartyak")));
}
if (location.hash) setTimeout(() => { const e = document.getElementById(location.hash.slice(1)); if (e) e.scrollIntoView({ behavior: "smooth" }); }, 300);
