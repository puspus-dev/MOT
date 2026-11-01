/* MOT – Kezdőlap: tankönyvválasztó (tantárgy + évfolyam szűrő) és a 3D háttér */
oldalKeret("index.html");

const szuroTantargy = $("#szuro-tantargy");
const szuroEvfolyam = $("#szuro-evfolyam");
const szuroSzoveg   = $("#szuro-szoveg");

/** Egy könyv feladatsorainak száma: leckénkénti + témakörönkénti. */
const feladatDb = (k) => k.fejezetek.filter((f) => f.feladat).length + Object.keys(k.csoportok || {}).length;

/** Egy legördülő menü feltöltése az adatokban előforduló értékekkel. */
function opcioTolt(elem, ertekek, mind) {
  elem.innerHTML = `<option value="">${mind}</option>` +
    [...new Set(ertekek)].map((e) => `<option>${e}</option>`).join("");
}
opcioTolt(szuroTantargy, MOT_KONYVEK.map((k) => k.tantargy), "Minden tantárgy");
opcioTolt(szuroEvfolyam, MOT_KONYVEK.map((k) => k.evfolyam), "Minden évfolyam");

/** Egy tankönyvkártya. */
function kartya(k) {
  return `
    <a class="konyv" style="--szin:${k.szin}" href="konyv.html?id=${k.id}">
      <div class="konyv__ikon">${k.ikon}</div>
      <h3>${k.cim}</h3>
      <p>${k.tantargy} · ${k.evfolyam}</p>
      <p>${k.fejezetek.length} lecke / fejezet · ${feladatDb(k)} feladatsor${k.okostankonyv ? " · 📖 okostankönyv" : ""}</p>
      <div class="konyv__gomb">Megnyitás →</div>
    </a>`;
}

/** A szűrők alapján újrarajzolja a kártyákat. */
function kirajzol() {
  const szoveg = szuroSzoveg.value.trim().toLowerCase();
  const lista = MOT_KONYVEK.filter((k) =>
    (!szuroTantargy.value || k.tantargy === szuroTantargy.value) &&
    (!szuroEvfolyam.value || k.evfolyam === szuroEvfolyam.value) &&
    (!szoveg || (k.cim + " " + k.fejezetek.map((f) => f.cim).join(" ")).toLowerCase().includes(szoveg)));
  $("#konyvek").innerHTML = lista.length ? lista.map(kartya).join("") : `<div class="ures">Nincs a szűrésnek megfelelő tankönyv.</div>`;
}

[szuroTantargy, szuroEvfolyam].forEach((e) => e.addEventListener("change", kirajzol));
szuroSzoveg.addEventListener("input", kirajzol);

$("#szamlalok").innerHTML =
  `<span>📚 ${MOT_KONYVEK.length} tankönyv</span><span>✏️ ${MOT_KONYVEK.reduce((a, k) => a + feladatDb(k), 0)} feladatsor</span><span>🌍 4 3D animáció</span>`;
kirajzol();

