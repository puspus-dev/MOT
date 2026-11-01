/* MOT – 3D animációk oldal: a jelenetek indítása. A #hash (pl. animaciok.html#evszakok) a megfelelő kártyához görget. */
oldalKeret("animaciok.html");
if (typeof THREE === "undefined") {
  document.querySelectorAll(".anim").forEach((e) => e.innerHTML = `<div class="ures">A 3D könyvtár nem töltődött be.</div>`);
} else {
  naprendszer($id("naprendszer-vaszon"));
  evszakok($id("evszakok-vaszon"));
  foldBelseje($id("foldbelseje-vaszon"));
  toltesek($id("toltesek-vaszon"));
}
if (location.hash) setTimeout(() => { const e = document.getElementById(location.hash.slice(1)); if (e) e.scrollIntoView({ behavior: "smooth" }); }, 200);
