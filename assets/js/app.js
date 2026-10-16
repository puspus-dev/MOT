/* ==========================================================
   MOT – főoldal működése
   Az adatok a data/tantargyak.js fájlban vannak (MOT_ADATOK).
   ========================================================== */

/* ---------- BEÁLLÍTÁSOK (itt módosíthatod) ---------- */
const EVFOLYAMOK = [
  { nev: "5. osztály", allapot: "hamarosan" },
  { nev: "6. osztály", allapot: "aktiv" },
  { nev: "7. osztály", allapot: "hamarosan" },
  { nev: "8. osztály", allapot: "hamarosan" },
];
const MIN_KERESES_HOSSZ = 2;   // ennyi karaktertől keres

/* ---------- SEGÉDFÜGGVÉNYEK ---------- */
const $ = (valaszto) => document.querySelector(valaszto);

/** Egy fejezet sora: cím, (ha van) tananyag-gomb, feladat-gomb. */
function fejezetSor(fejezet) {
  const oldalak = fejezet.oldalak ? ` <small>· ${fejezet.oldalak}</small>` : "";
  const pdf = fejezet.pdf ? `<a class="gomb" href="${fejezet.pdf}">📄 Tananyag</a>` : "";
  return `
    <div class="sor">
      <div class="sor__cim">${fejezet.cim}${oldalak}</div>
      ${pdf}
      <a class="gomb gomb--tomor" href="${fejezet.feladat}">▶ Feladatok</a>
    </div>`;
}

/** Egy panel megjelenítése/elrejtése. */
function panelMutat(elem, html) {
  elem.innerHTML = html;
  elem.classList.add("panel--lathato");
}
function panelRejt(elem) {
  elem.classList.remove("panel--lathato");
}

/* ---------- FEJLÉC SZÁMLÁLÓK ---------- */
function szamlalokKirajzol() {
  const targyak = MOT_ADATOK.tantargyak;
  const fejezetek = targyak.flatMap((t) => t.fejezetek);
  const pdfek = fejezetek.filter((f) => f.pdf).length;
  $("#szamlalok").innerHTML =
    `<span>📚 ${targyak.length} tantárgy</span>` +
    `<span>📖 ${pdfek} tananyag-PDF</span>` +
    `<span>✏️ ${fejezetek.length} feladatsor</span>`;
}

/* ---------- ÉVFOLYAMFÜLEK ---------- */
function evfolyamokKirajzol() {
  $("#evfolyamok").innerHTML = EVFOLYAMOK.map((e) =>
    `<a class="evfolyam evfolyam--${e.allapot}">${e.nev}</a>`).join("");
}

/* ---------- TANTÁRGYKÁRTYÁK ---------- */
function tantargyakKirajzol() {
  $("#tantargyak").innerHTML = MOT_ADATOK.tantargyak.map((t, i) => `
    <button class="targy" style="--szin:${t.szin}" data-index="${i}">
      <div class="targy__ikon">${t.ikon}</div>
      <h3>${t.nev}</h3>
      <p>${t.fejezetek.length} fejezet / feladatsor</p>
    </button>`).join("");

  document.querySelectorAll(".targy").forEach((kartya) => {
    kartya.addEventListener("click", () => tantargyKivalaszt(kartya));
  });
}

/** Kártyára kattintás: a fejezetlista kinyitása / bezárása. */
function tantargyKivalaszt(kartya) {
  const panel = $("#fejezetek");
  const voltAktiv = kartya.classList.contains("targy--aktiv");

  document.querySelectorAll(".targy").forEach((k) => k.classList.remove("targy--aktiv"));
  if (voltAktiv) { panelRejt(panel); return; }

  const targy = MOT_ADATOK.tantargyak[kartya.dataset.index];
  kartya.classList.add("targy--aktiv");
  panelMutat(panel, `<h3>${targy.ikon} ${targy.nev}</h3>` + targy.fejezetek.map(fejezetSor).join(""));
  panel.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

/* ---------- KERESÉS ---------- */
function keres(szoveg) {
  const panel = $("#talalatok");
  const kifejezes = szoveg.trim().toLowerCase();
  if (kifejezes.length < MIN_KERESES_HOSSZ) { panelRejt(panel); return; }

  const talalatok = [];
  MOT_ADATOK.tantargyak.forEach((t) => {
    t.fejezetek.forEach((f) => {
      if ((f.cim + " " + t.nev).toLowerCase().includes(kifejezes)) {
        talalatok.push({ ...f, cim: `${t.ikon} ${t.nev} – ${f.cim}` });
      }
    });
  });

  panelMutat(panel,
    `<h3>Találatok (${talalatok.length})</h3>` +
    (talalatok.length ? talalatok.map(fejezetSor).join("") : `<div class="ures">Nincs találat.</div>`));
}

/* ---------- INDÍTÁS ---------- */
szamlalokKirajzol();
evfolyamokKirajzol();
tantargyakKirajzol();
$("#kereso").addEventListener("input", (e) => keres(e.target.value));
