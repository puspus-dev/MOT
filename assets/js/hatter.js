/* MOT – 3D sáv az önálló oldalakon (feladatsorok, okostankönyvek), kapcsolóval.
   Használat: <script src=".../hatter.js" data-tema="fold|mertan|konyv|hang"></script> (a three.min.js és a 3d.js után). */
(function () {
  if (typeof THREE === "undefined" || typeof MOT3D === "undefined") return;
  const tema = (document.currentScript && document.currentScript.dataset.tema) || "fold";
  MOT3D.stilus();
  const sav = document.createElement("div");
  sav.className = "mot3d-sav";
  sav.innerHTML = '<div class="mot3d-vaszon" aria-hidden="true"></div><div class="mot3d-szoveg">MOT – Magyar OkosTankönyv</div>';
  document.body.insertBefore(sav, document.body.firstChild);
  MOT3D.kapcsolo(sav);
  MOT3D.jelenet(sav.querySelector(".mot3d-vaszon"), (t) => hatter3d(t, tema));
})();
