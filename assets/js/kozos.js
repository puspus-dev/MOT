/* ==========================================================
   MOT – közös elemek: fejléc, menü, lábléc, eredménytár
   Minden oldal betölti, és az oldalKeret() függvénnyel indítja.
   ========================================================== */

/* ---------- BEÁLLÍTÁSOK (itt módosíthatod) ---------- */
const MENU = [
  { fel: "index.html",       nev: "Kezdőlap" },
  { fel: "animaciok.html",   nev: "3D animációk" },
  { fel: "diagram.html",     nev: "Fogalomtérképek" },
  { fel: "elozmenyek.html",  nev: "Előzmények" },
  { fel: "segitseg.html",    nev: "Segítség" },
  { fel: "rolunk.html",  nev: "Rólunk" },
];
const LOGO_FAJL = "assets/img/logo.png";   // ha nincs ott a fájl, a „MOT" jelvény látszik

const $ = (v) => document.querySelector(v);

/** Fejléc + menü + lábléc kirajzolása. `aktiv` = az aktuális menüpont fájlneve; `tema` = a 3D háttér témája (fold, mertan, konyv, hang). */
function oldalKeret(aktiv, tema = "fold") {
  $("#fejlec").className = "fejlec";
  $("#fejlec").innerHTML = `
    <div class="sav fejlec__sor">
      <a class="logo" href="index.html">
        <img class="logo__kep" src="${LOGO_FAJL}" alt="MOT logó"
             onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">
        <span class="logo__jel" style="display:none">MOT</span>
        <span>Magyar OkosTankönyv<small>INTERAKTÍV TANANYAG</small></span>
      </a>
      <nav class="menu">${MENU.map((m) =>
        `<a href="${m.fel}" class="${m.fel === aktiv ? "aktiv" : ""}">${m.nev}</a>`).join("")}</nav>
    </div>`;
  /* 3D: kapcsoló a fejlécben + háttér a kék sávban (ha a three.js és a 3d.js be van töltve) */
  if (typeof MOT3D !== "undefined" && typeof THREE !== "undefined") {
    MOT3D.kapcsolo($(".fejlec__sor"));
    const sav = $(".bevezeto");
    if (sav) {
      let hely = sav.querySelector(".hero3d");
      if (!hely) { hely = document.createElement("div"); hely.className = "hero3d"; hely.setAttribute("aria-hidden", "true"); sav.prepend(hely); }
      MOT3D.jelenet(hely, (t) => hatter3d(t, tema));
    }
  }
  $("#lablec").className = "lablec";
  $("#lablec").innerHTML = "MOT – Magyar OkosTankönyv · A tankönyvek az Oktatási Hivatal kiadványai, a feladatok saját készítésűek.";
}

/* ---------- EREDMÉNYTÁR (a böngészőben, localStorage) ---------- */
const TAR_KULCS = "mot_eredmenyek";
function eredmenyek() {
  try { return JSON.parse(localStorage.getItem(TAR_KULCS)) || {}; } catch (e) { return {}; }
}
function eredmenyekTorol() {
  try { localStorage.removeItem(TAR_KULCS); } catch (e) {}
}
