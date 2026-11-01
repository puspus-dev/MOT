/* MOT – Tankönyv nézet: tartalomjegyzék (témakörökkel), haladás, gombok */
const azonosito = new URLSearchParams(location.search).get("id");
const konyv = MOT_KONYVEK.find((k) => k.id === azonosito);
oldalKeret("index.html", konyv && typeof MOT3D !== "undefined" ? MOT3D.tema(konyv.tantargy) : "fold");   // a háttér a tantárgyhoz igazodik

/** A könyv összes feladatsora (leckénkénti + témakörönkénti) a haladás számolásához. */
const feladatok = (k) => [...k.fejezetek.map((f) => f.feladat), ...Object.values(k.csoportok || {}).map((c) => c.feladat)].filter(Boolean);

/** Egy lecke / fejezet sora. */
function sor(f, i, tar) {
  const e = f.feladat && tar[f.feladat];
  const allapot = e ? `Legjobb eredmény: ${e.legjobb} / ${e.max}` : (f.oldalak || "");
  return `
    <div class="sor">
      <div class="sor__szam ${e ? "sor__szam--kesz" : ""}">${e ? "✓" : i + 1}</div>
      <div class="sor__cim">${f.cim}<small>${allapot}</small></div>
      ${konyv.okostankonyv && f.elso_oldal ? `<a class="gomb" href="${konyv.okostankonyv}#oldal-${f.elso_oldal}">📖 Okostankönyv</a>` : ""}
      ${f.pdf ? `<a class="gomb" href="${f.pdf}">📄 PDF</a>` : ""}
      ${f.feladat ? `<a class="gomb gomb--tomor" href="${f.feladat}">▶ Feladatok</a>` : ""}
    </div>`;
}
/** Témakör-fejléc (ha a könyv témakörökre van bontva): a témakör feladatsorával. */
function csoportFejlec(nev, tar) {
  const c = (konyv.csoportok || {})[nev], e = c && tar[c.feladat];
  return `<div class="csoport"><b>${e ? "✓ " : ""}${nev}</b>` +
    (c ? `<a class="gomb gomb--tomor" href="${c.feladat}">▶ Témakör feladatai${e ? ` (${e.legjobb}/${e.max})` : ""}</a>` : "") + `</div>`;
}

if (!konyv) {
  $("#cim").textContent = "Tankönyv nem található";
  $("#tartalomjegyzek").innerHTML = `<div class="ures">Válassz tankönyvet a <a href="index.html"><b>Kezdőlapon</b></a>.</div>`;
} else {
  document.title = konyv.cim + " – MOT";
  $("#cim").textContent = `${konyv.ikon} ${konyv.cim}`;
  $("#morzsa").innerHTML = `<a href="index.html">Kezdőlap</a> › ${konyv.tantargy} › ${konyv.cim}`;
  $("#leiras").textContent = `${konyv.tantargy} · ${konyv.evfolyam}`;

  /* felső gombok: okostankönyv, fogalomtérképek, 3D animációk */
  let gombok = "";
  if (konyv.okostankonyv) gombok += `<a class="gomb gomb--tomor" href="${konyv.okostankonyv}">📖 Teljes okostankönyv (kereshető szöveg + PDF)</a> `;
  gombok += MOT_DIAGRAMOK.filter((d) => d.konyv === konyv.id).map((d) => `<a class="gomb gomb--tomor" href="diagram.html?id=${d.id}">🧩 ${d.cim}</a> `).join("");
  if (konyv.animaciok) gombok += `<a class="gomb gomb--tomor" href="animaciok.html">🌍 3D animációk</a>`;
  $("#okosgomb").innerHTML = gombok;

  const tar = eredmenyek();
  const lista = feladatok(konyv);
  $("#haladas").textContent = `Haladásod: ${lista.filter((h) => tar[h]).length} / ${lista.length} feladatsor megoldva`;

  let aktualis = null, html = "";
  konyv.fejezetek.forEach((f, i) => {
    if (f.csoport && f.csoport !== aktualis) { aktualis = f.csoport; html += csoportFejlec(aktualis, tar); }
    html += sor(f, i, tar);
  });
  $("#tartalomjegyzek").innerHTML = html;
}
