/* ==========================================================
   MOT – 3D animációk (three.js r147, helyben tárolva)
   Tartalom: 1. Közös színpad  2. Segédek  3. Főoldali háttér
             4. Nap–Föld–Hold  5. Évszakok  6. Föld belseje
             7. Elektromos töltések
   Minden jelenet egy függvény, amely egy tárolóelemet kap.
   Új jelenet: másolj egy meglévőt, és hívd meg az animaciok.js-ben.
   ========================================================== */
const MOZGASCSOKKENTES = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const FOK = Math.PI / 180;

/* ---------- 1. KÖZÖS SZÍNPAD ---------- */
/** Létrehozza a renderert, a kamerát (húzással forgatható, görgetéssel nagyítható) és az animációs ciklust.
 *  opciok: { tavol, magas, interaktiv, csillagok }.  Visszaad: { scene, kamera, renderer, ciklus(fn) } vagy null. */
function szinpad(tarolo, opciok = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch (hiba) {
    tarolo.innerHTML = `<div class="ures">A 3D nézethez WebGL-t támogató böngésző kell.</div>`;
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  tarolo.appendChild(renderer.domElement);
  renderer.domElement.style.display = "block";

  const scene = new THREE.Scene();
  const kamera = new THREE.PerspectiveCamera(45, 1, 0.1, 400);
  const nezet = { yaw: opciok.yaw ?? 0, pitch: opciok.pitch ?? 0.45, tav: opciok.tavol ?? 24 };
  const feladatok = [];

  function kameraBeallit() {
    nezet.pitch = Math.max(-1.3, Math.min(1.3, nezet.pitch));
    kamera.position.set(
      nezet.tav * Math.sin(nezet.yaw) * Math.cos(nezet.pitch),
      nezet.tav * Math.sin(nezet.pitch),
      nezet.tav * Math.cos(nezet.yaw) * Math.cos(nezet.pitch));
    kamera.lookAt(0, 0, 0);
  }
  function meretez() {
    const sz = tarolo.clientWidth || 300, m = tarolo.clientHeight || 300;
    renderer.setSize(sz, m, false);
    renderer.domElement.style.width = "100%"; renderer.domElement.style.height = "100%";
    kamera.aspect = sz / m; kamera.updateProjectionMatrix();
  }

  if (opciok.interaktiv !== false) {          // húzás = forgatás, görgetés = nagyítás
    let huz = null;
    const v = renderer.domElement; v.style.touchAction = "none"; v.style.cursor = "grab";
    v.addEventListener("pointerdown", (e) => { huz = [e.clientX, e.clientY]; v.setPointerCapture(e.pointerId); v.style.cursor = "grabbing"; });
    v.addEventListener("pointermove", (e) => {
      if (!huz) return;
      nezet.yaw -= (e.clientX - huz[0]) * 0.008; nezet.pitch += (e.clientY - huz[1]) * 0.008;
      huz = [e.clientX, e.clientY]; kameraBeallit();
    });
    const vege = () => { huz = null; v.style.cursor = "grab"; };
    v.addEventListener("pointerup", vege); v.addEventListener("pointercancel", vege);
    v.addEventListener("wheel", (e) => {
      e.preventDefault(); nezet.tav = Math.max(6, Math.min(70, nezet.tav * (1 + Math.sign(e.deltaY) * 0.08))); kameraBeallit();
    }, { passive: false });
  }

  if (opciok.csillagok) {                      // csillagos háttér
    const n = 700, poz = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 120 + Math.random() * 60, u = Math.random() * 2 - 1, f = Math.random() * 6.283, s = Math.sqrt(1 - u * u);
      poz.set([r * s * Math.cos(f), r * u, r * s * Math.sin(f)], i * 3);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(poz, 3));
    scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 0.55, sizeAttenuation: true })));
  }

  /* animációs ciklus: csak akkor fut, ha a tároló látszik */
  let lathato = true, utolso = performance.now(), ido = 0, fut = false;
  function kep(most) {
    fut = false;
    const dt = Math.min((most - utolso) / 1000, 0.1); utolso = most; ido += dt;
    feladatok.forEach((f) => f(dt, ido));
    renderer.render(scene, kamera);
    if (lathato && !MOZGASCSOKKENTES) { fut = true; requestAnimationFrame(kep); }
  }
  function indit() { if (!fut) { utolso = performance.now(); fut = true; requestAnimationFrame(kep); } }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((e) => { lathato = e[0].isIntersecting; if (lathato) indit(); }).observe(tarolo);
  }
  if ("ResizeObserver" in window) new ResizeObserver(() => { meretez(); renderer.render(scene, kamera); }).observe(tarolo);
  meretez(); kameraBeallit(); indit();

  return { scene, kamera, renderer, nezet, kameraBeallit, ciklus: (fn) => feladatok.push(fn) };
}

/* ---------- 2. SEGÉDEK ---------- */
/** Determinisztikus véletlen (mulberry32), hogy a Föld minden betöltéskor ugyanúgy nézzen ki. */
function veletlen(mag) {
  return () => { mag |= 0; mag = (mag + 0x6d2b79f5) | 0; let t = Math.imul(mag ^ (mag >>> 15), 1 | mag);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
/** Stilizált földfelszín-textúra (óceán, szárazföldek, sarki jégsapkák) – nincs külső kép. */
function foldTextura() {
  const c = document.createElement("canvas"); c.width = 1024; c.height = 512;
  const x = c.getContext("2d"), r = veletlen(7);
  const g = x.createLinearGradient(0, 0, 0, 512); g.addColorStop(0, "#2467b0"); g.addColorStop(.5, "#1d5aa3"); g.addColorStop(1, "#2467b0");
  x.fillStyle = g; x.fillRect(0, 0, 1024, 512);
  for (let i = 0; i < 26; i++) {                 // szárazföldek: egymást fedő foltok
    const cx = r() * 1024, cy = 90 + r() * 330, n = 7 + (r() * 9 | 0);
    for (let j = 0; j < n; j++) {
      const rad = 14 + r() * 42, px = cx + (r() - .5) * 120, py = cy + (r() - .5) * 70;
      const f = x.createRadialGradient(px, py, 2, px, py, rad);
      f.addColorStop(0, r() > .35 ? "#4c9f50" : "#9a8c4f"); f.addColorStop(1, "#3f8a45");
      x.fillStyle = f; x.beginPath(); x.arc(px, py, rad, 0, 6.283); x.fill();
    }
  }
  const sark = (y0, y1) => { const q = x.createLinearGradient(0, y0, 0, y1); q.addColorStop(0, "rgba(255,255,255,1)"); q.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = q; x.fillRect(0, Math.min(y0, y1), 1024, Math.abs(y1 - y0)); };
  sark(0, 55); sark(512, 457);
  const t = new THREE.CanvasTexture(c); t.anisotropy = 4; return t;
}
function holdTextura() {
  const c = document.createElement("canvas"); c.width = 256; c.height = 128; const x = c.getContext("2d"), r = veletlen(3);
  x.fillStyle = "#a9a9ad"; x.fillRect(0, 0, 256, 128);
  for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(90,90,95,${.25 + r() * .3})`; x.beginPath(); x.arc(r() * 256, r() * 128, 3 + r() * 11, 0, 6.283); x.fill(); }
  return new THREE.CanvasTexture(c);
}
function gyuru(sugar, szin = 0x8a99b3, vast = 0.05) {   // pályavonal
  const m = new THREE.Mesh(new THREE.RingGeometry(sugar - vast, sugar + vast, 128), new THREE.MeshBasicMaterial({ color: szin, side: THREE.DoubleSide, transparent: true, opacity: .55 }));
  m.rotation.x = -Math.PI / 2; return m;
}
function tengelyVonal(hossz, szin = 0xffffff) {         // a Föld forgástengelye
  const m = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, hossz, 8), new THREE.MeshBasicMaterial({ color: szin })); return m;
}
function foldKeszit(sugar) {                            // Föld: döntött tengelyű csoport + forgó gömb
  const dont = new THREE.Group(); dont.rotation.z = -23.5 * FOK;   // a tengely 23,5°-ot hajlik
  const gomb = new THREE.Mesh(new THREE.SphereGeometry(sugar, 48, 32), new THREE.MeshStandardMaterial({ map: foldTextura(), roughness: .85 }));
  const tengely = tengelyVonal(sugar * 3);
  dont.add(gomb, tengely);
  return { dont, gomb, tengely };
}
function napKeszit() {                                  // Nap + fényforrás
  const nap = new THREE.Mesh(new THREE.SphereGeometry(3, 40, 28), new THREE.MeshBasicMaterial({ color: 0xffc933 }));
  const fenyko = new THREE.Mesh(new THREE.SphereGeometry(3.7, 32, 24), new THREE.MeshBasicMaterial({ color: 0xffa51f, transparent: true, opacity: .22 }));
  const feny = new THREE.PointLight(0xffffff, 1.7, 0, 0);
  const g = new THREE.Group(); g.add(nap, fenyko, feny); return g;
}
const $id = (i) => document.getElementById(i);

/* ---------- 3. FŐOLDALI HÁTTÉR: forgó Föld + keringő Hold ---------- */
function hero3d(tarolo) {
  const s = szinpad(tarolo, { tavol: 9, pitch: 0.25, interaktiv: false, csillagok: true });
  if (!s) return;
  s.scene.add(new THREE.AmbientLight(0x6d7fa8, 0.7));
  const fn = new THREE.DirectionalLight(0xffffff, 1.5); fn.position.set(6, 3, 5); s.scene.add(fn);
  const fold = foldKeszit(2); fold.dont.position.set(0, 0, 0); s.scene.add(fold.dont); fold.tengely.visible = false;
  const lég = new THREE.Mesh(new THREE.SphereGeometry(2.12, 32, 24), new THREE.MeshBasicMaterial({ color: 0x6fb3ff, transparent: true, opacity: .13, side: THREE.BackSide }));
  s.scene.add(lég);
  const holdKor = new THREE.Group(); s.scene.add(holdKor);
  const hold = new THREE.Mesh(new THREE.SphereGeometry(0.45, 24, 16), new THREE.MeshStandardMaterial({ map: holdTextura(), roughness: 1 }));
  hold.position.set(4.2, 0.6, 0); holdKor.add(hold);
  s.ciklus((dt) => { fold.gomb.rotation.y += dt * 0.22; holdKor.rotation.y += dt * 0.18; });
}

/* ---------- 4. NAP–FÖLD–HOLD ---------- */
function naprendszer(tarolo) {
  const s = szinpad(tarolo, { tavol: 34, pitch: 0.5, csillagok: true });
  if (!s) return;
  s.scene.add(new THREE.AmbientLight(0x2a3a60, 0.6), napKeszit(), gyuru(12));
  const fold = foldKeszit(1.2), foldCs = new THREE.Group(); foldCs.add(fold.dont); s.scene.add(foldCs);
  const holdCs = new THREE.Group(); foldCs.add(holdCs);
  const hold = new THREE.Mesh(new THREE.SphereGeometry(0.34, 24, 16), new THREE.MeshStandardMaterial({ map: holdTextura(), roughness: 1 }));
  hold.position.x = 2.6; holdCs.add(hold);
  const holdPalya = gyuru(2.6, 0x9aa4b8, 0.025); foldCs.add(holdPalya);

  const all = { jatek: true, seb: 1, theta: 0 };
  const gomb = $id("nap-jatek"), seb = $id("nap-sebesseg"), teng = $id("nap-tengely"), pal = $id("nap-palya");
  if (gomb) gomb.onclick = () => { all.jatek = !all.jatek; gomb.textContent = all.jatek ? "⏸ Megállít" : "▶ Indít"; };
  if (seb) seb.oninput = () => { all.seb = +seb.value; };
  if (teng) teng.onchange = () => { fold.tengely.visible = teng.checked; };
  if (pal) pal.onchange = () => { holdPalya.visible = pal.checked; };
  if (teng) fold.tengely.visible = teng.checked;
  s.ciklus((dt) => {
    if (!all.jatek) return;
    const d = dt * all.seb;
    all.theta += d * (6.283 / 60);                         // 1 év ≈ 60 s (szemléltető arányok!)
    foldCs.position.set(12 * Math.cos(all.theta), 0, -12 * Math.sin(all.theta));
    fold.gomb.rotation.y += d * 2.1;                       // forgás
    holdCs.rotation.y += d * 0.63;                         // a Hold keringése a Föld körül
  });
}

/* ---------- 5. ÉVSZAKOK ---------- */
function evszakok(tarolo) {
  const s = szinpad(tarolo, { tavol: 34, pitch: 0.55, csillagok: true });
  if (!s) return;
  s.scene.add(new THREE.AmbientLight(0x2a3a60, 0.55), napKeszit(), gyuru(12));
  const fold = foldKeszit(1.3), foldCs = new THREE.Group(); foldCs.add(fold.dont); s.scene.add(foldCs);
  /* A tengely a térben mindig ugyanarra dől (+x irányba), ezért változnak az évszakok. */
  const jelek = [[0, "Téli napforduló"], [90, "Tavaszi napéjegyenlőség"], [180, "Nyári napforduló"], [270, "Őszi napéjegyenlőség"]];
  jelek.forEach(([fok]) => {                              // halvány Föld-jelölők a négy állomáson
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .35 }));
    m.position.set(12 * Math.cos(fok * FOK), 0, -12 * Math.sin(fok * FOK)); s.scene.add(m);
  });
  const all = { jatek: false, theta: 180, cel: null };
  const info = $id("ev-info"), gomb = $id("ev-jatek"), cs = $id("ev-csuszka");
  const SZAKASZ = [["tél", "nyár"], ["tavasz", "ősz"], ["nyár", "tél"], ["ősz", "tavasz"]];   // [északi, déli félgömb]
  const NEVEK = ["tél", "tavasz", "nyár", "ősz"];
  function szoveg() {
    const t = ((all.theta % 360) + 360) % 360, i = Math.floor(t / 90) % 4;
    const kozel = jelek.find(([f]) => Math.abs(((t - f + 540) % 360) - 180) < 4);
    if (info) info.innerHTML = (kozel ? `<b>${kozel[1]}</b> – ` : "") +
      `az északi félgömbön <b>${SZAKASZ[i][0]}</b> van, a déli félgömbön <b>${SZAKASZ[i][1]}</b>.` +
      (Math.abs(((t - 180 + 540) % 360) - 180) < 4 ? " Az északi félgömb a Nap felé hajlik." : "") +
      (Math.abs(((t - 0 + 540) % 360) - 180) < 4 ? " Az északi félgömb elfordul a Naptól." : "");
    if (cs) cs.value = Math.round(t);
  }
  document.querySelectorAll("[data-theta]").forEach((b) => b.onclick = () => { all.cel = +b.dataset.theta; all.jatek = false; if (gomb) gomb.textContent = "▶ Automatikus keringés"; });
  if (gomb) gomb.onclick = () => { all.jatek = !all.jatek; all.cel = null; gomb.textContent = all.jatek ? "⏸ Megállít" : "▶ Automatikus keringés"; };
  if (cs) cs.oninput = () => { all.theta = +cs.value; all.cel = null; all.jatek = false; if (gomb) gomb.textContent = "▶ Automatikus keringés"; };
  s.ciklus((dt) => {
    if (all.jatek) all.theta += dt * 18;
    else if (all.cel !== null) {                          // sima odafordulás a kiválasztott állomásra
      const k = ((all.cel - all.theta + 540) % 360) - 180;
      if (Math.abs(k) < 0.5) { all.theta = all.cel; all.cel = null; } else all.theta += k * Math.min(1, dt * 4);
    }
    foldCs.position.set(12 * Math.cos(all.theta * FOK), 0, -12 * Math.sin(all.theta * FOK));
    fold.gomb.rotation.y += dt * 1.5;
    szoveg();
  });
}

/* ---------- 6. A FÖLD BELSEJE (kivágott gömb, rétegek) ---------- */
const RETEGEK = [
  { kulcs: "kereg", nev: "Földkéreg", r: 1.0, szin: 0x8b6b43, leiras: "A Föld vékony, szilárd, külső burka. Vastagsága a kontinenseken nagyobb, az óceánok alatt kisebb (néhány kilométertől kb. 70 kilométerig)." },
  { kulcs: "kopeny", nev: "Földköpeny", r: 0.9, szin: 0xd2552b, leiras: "A kéreg alatti, forró, nagy nyomású kőzetréteg. Egészen kb. 2900 km mélységig tart." },
  { kulcs: "kulsomag", nev: "Külső mag", r: 0.55, szin: 0xf0a32b, leiras: "Olvadt, folyékony fémből áll (főleg vas és nikkel). Kb. 2900 és 5100 km közötti mélységben van." },
  { kulcs: "belsomag", nev: "Belső mag", r: 0.27, szin: 0xfff0a0, leiras: "A Föld középpontjának szilárd, rendkívül forró fémmagja, kb. 5100 km mélységtől a középpontig (kb. 6370 km)." },
];
function foldBelseje(tarolo) {
  const s = szinpad(tarolo, { tavol: 4.4, pitch: 0.3, yaw: 0.5 });
  if (!s) return;
  s.scene.add(new THREE.AmbientLight(0xffffff, 0.75)); const f = new THREE.DirectionalLight(0xffffff, 0.9); f.position.set(3, 4, 5); s.scene.add(f);
  const csoport = new THREE.Group(); s.scene.add(csoport);
  const anyagok = {};
  RETEGEK.forEach((l, i) => {
    const anyag = new THREE.MeshStandardMaterial({ color: l.szin, roughness: .8, side: THREE.DoubleSide, emissive: 0x000000 });
    anyagok[l.kulcs] = anyag;
    // phiLength = 270°: negyed gömbnyi kivágás, hogy látsszanak a belső rétegek
    const m = new THREE.Mesh(new THREE.SphereGeometry(l.r, 48, 32, 0, 1.5 * Math.PI), anyag);
    csoport.add(m);
  });
  const info = $id("fb-info");
  function kiemel(kulcs) {
    Object.entries(anyagok).forEach(([k, a]) => a.emissive.setHex(k === kulcs ? 0x553300 : 0x000000));
    const l = RETEGEK.find((x) => x.kulcs === kulcs);
    if (info) info.innerHTML = l ? `<b>${l.nev}</b><br>${l.leiras}` : "Válassz egy réteget a gombokkal!";
  }
  document.querySelectorAll("[data-reteg]").forEach((b) => b.onclick = () => kiemel(b.dataset.reteg));
  const forg = $id("fb-forgat"); let auto = true;
  if (forg) forg.onclick = () => { auto = !auto; forg.textContent = auto ? "⏸ Forgatás leállítása" : "▶ Forgatás"; };
  s.ciklus((dt) => { if (auto) csoport.rotation.y += dt * 0.35; });
}

/* ---------- 7. ELEKTROMOS TÖLTÉSEK: vonzás és taszítás ---------- */
function jelCimke(szoveg, szin) {
  const c = document.createElement("canvas"); c.width = c.height = 128; const x = c.getContext("2d");
  x.fillStyle = szin; x.beginPath(); x.arc(64, 64, 60, 0, 6.283); x.fill();
  x.fillStyle = "#fff"; x.font = "bold 96px sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(szoveg, 64, 70);
  return new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c) }));
}
function toltesek(tarolo) {
  const s = szinpad(tarolo, { tavol: 13, pitch: 0.2, csillagok: false });
  if (!s) return;
  s.scene.add(new THREE.AmbientLight(0xffffff, 0.8)); const f = new THREE.DirectionalLight(0xffffff, 0.8); f.position.set(3, 5, 6); s.scene.add(f);
  const golyo = (szin) => new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 24), new THREE.MeshStandardMaterial({ color: szin, roughness: .4 }));
  const a = golyo(0xd6336c), b = golyo(0x1c7ed6), ja = jelCimke("+", "#a61e4d"), jb = jelCimke("−", "#1864ab");
  ja.scale.set(1.3, 1.3, 1); jb.scale.set(1.3, 1.3, 1); a.add(ja); b.add(jb);
  const nyil = (szin) => new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), 2, szin, 0.45, 0.3);
  const na = nyil(0xffc933), nb = nyil(0xffc933); s.scene.add(a, b, na, nb);
  s.scene.add(new THREE.GridHelper(16, 16, 0x8a99b3, 0x8a99b3));
  const all = { mod: "vonzas" }, info = $id("tolt-info");
  function modValt(m) {
    all.mod = m; jb.material.map.dispose();
    // az "ellentétes" módban a B töltés negatív (kék, −), az "azonos" módban pozitív (piros, +)
    const pozitiv = m === "taszitas";
    b.material.color.setHex(pozitiv ? 0xd6336c : 0x1c7ed6);
    const ujra = jelCimke(pozitiv ? "+" : "−", pozitiv ? "#a61e4d" : "#1864ab"); jb.material = ujra.material;
    if (info) info.innerHTML = pozitiv ? "<b>Azonos töltések</b> (+ és +): egymást <b>taszítják</b>." : "<b>Ellentétes töltések</b> (+ és −): egymást <b>vonzzák</b>.";
  }
  document.querySelectorAll("[data-tolt]").forEach((g) => g.onclick = () => modValt(g.dataset.tolt));
  modValt("vonzas");
  const lassit = (u) => u * u * (3 - 2 * u);
  s.ciklus((dt, t) => {
    const u = (t % 6) / 6, e = lassit(u < 0.85 ? u / 0.85 : 1);
    const tav = all.mod === "vonzas" ? 6 - 4.6 * e : 2.2 + 4.2 * e;          // vonzás: közelednek, taszítás: távolodnak
    a.position.x = -tav / 2; b.position.x = tav / 2;
    const ero = Math.max(0.6, Math.min(3.6, 9 / (tav * tav) * 3));         // közelebb → erősebb (szemléltetés)
    const ir = all.mod === "vonzas" ? 1 : -1;
    na.position.set(a.position.x + ir * 0.9, 0, 0); na.setDirection(new THREE.Vector3(ir, 0, 0)); na.setLength(ero, 0.45, 0.3);
    nb.position.set(b.position.x - ir * 0.9, 0, 0); nb.setDirection(new THREE.Vector3(-ir, 0, 0)); nb.setLength(ero, 0.45, 0.3);
  });
}
