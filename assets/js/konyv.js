/* MOT – Tankönyv nézet: tartalomjegyzék + a megoldott feladatok jelölése */
oldalKeret("index.html");

const azonosito = new URLSearchParams(location.search).get("id");
const konyv = MOT_KONYVEK.find((k) => k.id === azonosito);

if (!konyv) {
  $("#cim").textContent = "Tankönyv nem található";
  $("#tartalomjegyzek").innerHTML = `<div class="ures">Válassz tankönyvet a <a href="index.html"><b>Kezdőlapon</b></a>.</div>`;
} else {
  document.title = konyv.cim + " – MOT";
  $("#cim").textContent = `${konyv.ikon} ${konyv.cim}`;
  $("#morzsa").innerHTML = `<a href="index.html">Kezdőlap</a> › ${konyv.tantargy} › ${konyv.cim}`;
  $("#leiras").textContent = `${konyv.tantargy} · ${konyv.evfolyam}`;

  const tar = eredmenyek();
  const kesz = konyv.fejezetek.filter((f) => tar[f.feladat]).length;
  $("#haladas").textContent = `Haladásod: ${kesz} / ${konyv.fejezetek.length} feladatsor megoldva`;

  $("#tartalomjegyzek").innerHTML = konyv.fejezetek.map((f, i) => {
    const e = tar[f.feladat];
    const allapot = e ? `Legjobb eredmény: ${e.legjobb} / ${e.max}` : (f.oldalak || "");
    return `
      <div class="sor">
        <div class="sor__szam ${e ? "sor__szam--kesz" : ""}">${e ? "✓" : i + 1}</div>
        <div class="sor__cim">${f.cim}<small>${allapot}</small></div>
        ${f.pdf ? `<a class="gomb" href="${f.pdf}">📄 Tananyag</a>` : ""}
        <a class="gomb gomb--tomor" href="${f.feladat}">▶ Feladatok</a>
      </div>`;
  }).join("");
}
