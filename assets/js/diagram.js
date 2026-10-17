/* MOT – Fogalomtérkép megjelenítő (mxGraph, csak olvasható nézet)
   - diagram.html            → a diagramok listája
   - diagram.html?id=...     → egy diagram megjelenítése, kattintásra magyarázat */
oldalKeret("diagram.html");

const diagramAzon = new URLSearchParams(location.search).get("id");
const diagram = MOT_DIAGRAMOK.find((d) => d.id === diagramAzon);

if (!diagram) {
  listaMutat();
} else {
  document.title = diagram.cim + " – MOT";
  $("#cim").textContent = "🧩 " + diagram.cim;
  const konyv = MOT_KONYVEK.find((k) => k.id === diagram.konyv);
  $("#leiras").innerHTML = konyv ? `Tankönyv: <a href="konyv.html?id=${konyv.id}"><b>${konyv.cim}</b></a>` : "";
  $("#lista").style.display = "none";
  if (typeof mxClient === "undefined" || !mxClient.isBrowserSupported()) {
    $("#diagram").innerHTML = `<div class="ures">Ez a böngésző nem támogatja a diagramok megjelenítését.</div>`;
  } else {
    diagramRajzol(diagram);
  }
}

/** A diagramok listája (diagram nélküli hívás). */
function listaMutat() {
  $("#cim").textContent = "Fogalomtérképek";
  $("#leiras").textContent = "Kattintható ábrák a tananyag fontos fogalmairól.";
  $("#diagram").style.display = "none";
  $("#magyarazat").style.display = "none";
  $("#lista").innerHTML = MOT_DIAGRAMOK.map((d) => {
    const k = MOT_KONYVEK.find((x) => x.id === d.konyv);
    return `<a class="konyv" style="--szin:${k ? k.szin : "#1c7ed6"}" href="diagram.html?id=${d.id}">
              <div class="konyv__ikon">🧩</div><h3>${d.cim}</h3><p>${k ? k.cim : ""}</p>
              <div class="konyv__gomb">Megnyitás →</div></a>`;
  }).join("");
}

/** A diagram felépítése az XML-ből. */
function diagramRajzol(d) {
  const tarolo = $("#diagram");
  const graph = new mxGraph(tarolo);
  graph.setHtmlLabels(true);
  graph.setTooltips(true);
  graph.setPanning(true);
  graph.panningHandler.useLeftButtonForPanning = true;
  [ "setCellsMovable", "setCellsResizable", "setCellsEditable", "setCellsSelectable",
    "setConnectable", "setCellsDisconnectable", "setCellsDeletable", "setCellsCloneable"
  ].forEach((f) => graph[f](false));
  graph.maxFitScale = 1;                       // kisebb képernyőn kicsinyít, nagyobbra nem nagyít

  const dok = mxUtils.parseXml(d.xml);
  new mxCodec(dok).decode(dok.documentElement, graph.getModel());
  graph.fit(20);

  graph.addListener(mxEvent.CLICK, (kuldo, esemeny) => {
    const cella = esemeny.getProperty("cell");
    const szoveg = cella && d.leiras[cella.id];
    $("#magyarazat").innerHTML = szoveg
      ? `<b>${cella.value}</b><br>${szoveg}`
      : `<span class="ures">Kattints egy elemre a magyarázatért.</span>`;
  });
  window.addEventListener("resize", () => graph.fit(20));
}
