/* ==========================================================
   MOT – közös elemek: fejléc, menü, lábléc, eredménytár
   Minden oldal betölti, és az oldalKeret() függvénnyel indítja.
   ========================================================== */

/* ---------- BEÁLLÍTÁSOK (itt módosíthatod) ---------- */
const MENU = [
  { fel: "index.html",       nev: "Kezdőlap" },
  { fel: "elozmenyek.html",  nev: "Előzmények" },
  { fel: "segitseg.html",    nev: "Segítség" },
  { fel: "rolunk.html",  nev: "Rólunk" },
];
const LOGO_FAJL = "assets/img/logo.svg";   // ha nincs ott a fájl, a „MOT" jelvény látszik

const $ = (v) => document.querySelector(v);

/** Fejléc + menü + lábléc kirajzolása. `aktiv` = az aktuális menüpont fájlneve. */
function oldalKeret(aktiv) {
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
