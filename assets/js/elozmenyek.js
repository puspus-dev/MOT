/* MOT – Előzmények: a megoldott feladatsorok listája */
oldalKeret("elozmenyek.html");

function kirajzol() {
  const lista = Object.entries(eredmenyek()).sort((a, b) => b[1].ido - a[1].ido);
  $("#elozmenyek").innerHTML = lista.length
    ? `<table><tr><th>Feladatsor</th><th>Utolsó</th><th>Legjobb</th><th>Mikor</th></tr>` +
      lista.map(([hely, e]) => `
        <tr><td><a href="${hely}"><b>${e.cim}</b></a></td>
            <td>${e.pont} / ${e.max}</td><td>${e.legjobb} / ${e.max}</td>
            <td>${new Date(e.ido).toLocaleString("hu-HU")}</td></tr>`).join("") + `</table>`
    : `<div class="ures">Eddig még egy feladatsort sem oldottál meg. Kezdd a <a href="index.html"><b>Kezdőlapon</b></a>!</div>`;
}
$("#torles").addEventListener("click", () => {
  if (confirm("Biztosan törlöd az összes eredményt?")) { eredmenyekTorol(); kirajzol(); }
});
kirajzol();
