/* ==========================================================
   MOT – 3D animációk (three.js r147, helyben tárolva)
   Tartalom: 0. Kapcsoló (MOT3D)  1. Közös színpad  2. Segédek  3. Háttértémák
             4. Nap–Föld–Hold  5. Évszakok  6. Föld belseje
             7. Elektromos töltések
   Minden jelenet egy függvény, amely egy tárolóelemet kap.
   Új jelenet: másolj egy meglévőt, és hívd meg az animaciok.js-ben.
   ========================================================== */
const MOZGASCSOKKENTES = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const FOK = Math.PI / 180;

/* ---------- 0. 3D KAPCSOLÓ ÉS JELENETKEZELŐ (MOT3D) ----------
   Minden 3D elem (háttér, animáció) a MOT3D.jelenet()-en át indul, így egyetlen kapcsolóval ki-be kapcsolható.
   Az állapot a böngészőben marad (localStorage: mot_3d = "be" / "ki"). */
const MOT3D = {
  kulcs: "mot_3d",
  valtozas: [],          // figyelők: (bekapcsolva) => void
  utolso: null,          // a legutóbb létrehozott színpad (a jelenet() használja)
  /** Be van-e kapcsolva? Alapértelmezés: be, kivéve ha a böngészőben csökkentett mozgás van beállítva. */
  be() {
    try { const v = localStorage.getItem(this.kulcs); if (v !== null) return v === "be"; } catch (e) {}
    return !MOZGASCSOKKENTES;
  },
  beallit(be) {
    try { localStorage.setItem(this.kulcs, be ? "be" : "ki"); } catch (e) {}
    this.valtozas.forEach((f) => f(be));
  },
  figyel(fn) { this.valtozas.push(fn); fn(this.be()); },
  /** Tantárgy → háttértéma. */
  tema(tantargy) { return { "Természettudomány": "fold", "Matematika": "mertan", "Ének-zene": "hang" }[tantargy] || "konyv"; },
  /** A kapcsoló (switch) beillesztése a megadott elembe. */
  kapcsolo(szulo) {
    if (!szulo) return;
    this.stilus();
    const l = document.createElement("label"); l.className = "kapcsolo"; l.title = "3D animációk ki- és bekapcsolása";
    l.innerHTML = `<input type="checkbox" role="switch" aria-label="3D animációk"><span class="kapcsolo__sav"></span><span>3D</span>`;
    const cb = l.querySelector("input"); cb.onchange = () => MOT3D.beallit(cb.checked);
    szulo.appendChild(l); this.figyel((be) => { cb.checked = be; });
  },
  /** Egy 3D jelenet indítása a tárolóban; a kapcsolóval leáll / újraindul.
   *  epit(tarolo) a jelenetet építő függvény; uzenet=true esetén kikapcsolt állapotban szöveg látszik. */
  jelenet(tarolo, epit, uzenet) {
    if (!tarolo) return { torol() {} };
    let s = null;
    const fn = (be) => {
      if (be && !s) { tarolo.innerHTML = ""; this.utolso = null; epit(tarolo); s = this.utolso; }
      else if (!be) {
        if (s) { s.leallit(); s = null; }
        tarolo.innerHTML = uzenet ? `<div class="ures" style="padding:24px;color:#cfd8e8">A 3D animációk ki vannak kapcsolva. Kapcsold be a kapcsolóval (3D)!</div>` : "";
      }
    };
    this.figyel(fn);
    return { torol: () => { const i = this.valtozas.indexOf(fn); if (i >= 0) this.valtozas.splice(i, 1); if (s) { s.leallit(); s = null; } } };
  },
  /** A kapcsoló és a sáv stílusa (egyszer kerül az oldalba). */
  stilus() {
    if (document.getElementById("mot3d-css")) return;
    const st = document.createElement("style"); st.id = "mot3d-css";
    st.textContent = `
.kapcsolo{display:inline-flex;align-items:center;gap:8px;cursor:pointer;font:600 14px system-ui,sans-serif;user-select:none;position:relative}
.kapcsolo input{position:absolute;opacity:0;width:0;height:0}
.kapcsolo__sav{width:42px;height:24px;border-radius:999px;background:#8d9ab0;position:relative;transition:background .2s}
.kapcsolo__sav::after{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:transform .2s}
.kapcsolo input:checked+.kapcsolo__sav{background:#2f9e44}
.kapcsolo input:checked+.kapcsolo__sav::after{transform:translateX(18px)}
.kapcsolo input:focus-visible+.kapcsolo__sav{outline:2px solid #4c9aff;outline-offset:2px}
.mot3d-sav{position:relative;height:96px;overflow:hidden;margin:0 0 12px;background:linear-gradient(120deg,#0b4f9c,#1c7ed6);color:#fff;display:flex;align-items:center;padding:0 16px;font:600 17px system-ui,sans-serif}
.mot3d-vaszon{position:absolute;top:0;bottom:0;right:0;width:55%}
.mot3d-szoveg{position:relative;z-index:1}
.mot3d-sav .kapcsolo{position:absolute;right:12px;top:8px;z-index:2;color:#fff}
.mot-anim{margin:16px 0;padding:16px;border:1px solid #dde4ef;border-radius:16px;background:#fff;color:#1b2a41;font:16px/1.5 system-ui,sans-serif}
.mot-anim h3{margin:0 0 6px;font-size:20px}.mot-anim p{margin:.3em 0}
.mot-anim .anim{width:100%;height:400px;border-radius:12px;overflow:hidden;background:radial-gradient(circle at 50% 40%,#12284a,#050b18)}
.mot-anim .vezerlo{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;margin:12px 0 4px}
.mot-anim .vezerlo label{font-size:14px;color:#5b6b82;display:flex;align-items:center;gap:6px}
.mot-anim .gomb{padding:7px 14px;border-radius:999px;border:1px solid #1c7ed6;color:#0b4f9c;background:none;font:700 14px system-ui,sans-serif;cursor:pointer}
.mot-anim .gomb--tomor{background:#1c7ed6;color:#fff}
.mot-anim .animinfo{margin-top:8px;padding:12px 14px;border-radius:12px;background:#f3f6fb;min-height:52px}
.mot-anim canvas.holdkep{background:#0b1020;border-radius:50%}
@media(prefers-color-scheme:dark){.mot-anim{background:#18212f;color:#e8eef8;border-color:#2a3649}.mot-anim .animinfo{background:#0f1520}.mot-anim .gomb{color:#7db4ff}.mot-anim .gomb--tomor{color:#fff}}`;
    document.head.appendChild(st);
  },
};

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
  let lathato = true, utolso = performance.now(), ido = 0, fut = false, leall = false, io = null, ro = null;
  function kep(most) {
    fut = false; if (leall) return;
    const dt = Math.min((most - utolso) / 1000, 0.1); utolso = most; ido += dt;
    feladatok.forEach((f) => f(dt, ido));
    renderer.render(scene, kamera);
    if (lathato && !MOZGASCSOKKENTES) { fut = true; requestAnimationFrame(kep); }
  }
  function indit() { if (!fut) { utolso = performance.now(); fut = true; requestAnimationFrame(kep); } }
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver((e) => { lathato = e[0].isIntersecting; if (lathato) indit(); }); io.observe(tarolo);
  }
  if ("ResizeObserver" in window) { ro = new ResizeObserver(() => { meretez(); renderer.render(scene, kamera); }); ro.observe(tarolo); }
  meretez(); kameraBeallit(); indit();

  function leallit() {                       // a kapcsoló kikapcsolásakor: ciklus, megfigyelők, WebGL-kontextus felszabadítása
    leall = true; if (io) io.disconnect(); if (ro) ro.disconnect();
    renderer.dispose(); if (renderer.forceContextLoss) renderer.forceContextLoss();
    if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
  }
  const pad = { scene, kamera, renderer, nezet, kameraBeallit, leallit, ciklus: (fn) => feladatok.push(fn) };
  MOT3D.utolso = pad;
  return pad;
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

/* ---------- 3. HÁTTÉRTÉMÁK (minden oldal kék sávjában) ----------
   fold = Föld + Hold, mertan = forgó testek, konyv = lebegő könyvek, hang = hangszínszabályzó-oszlopok. */
const HATTEREK = {
  fold(s) {
    const fold = foldKeszit(2); s.scene.add(fold.dont); fold.tengely.visible = false;
    s.scene.add(new THREE.Mesh(new THREE.SphereGeometry(2.12, 32, 24), new THREE.MeshBasicMaterial({ color: 0x6fb3ff, transparent: true, opacity: .13, side: THREE.BackSide })));
    const holdKor = new THREE.Group(); s.scene.add(holdKor);
    const hold = new THREE.Mesh(new THREE.SphereGeometry(0.45, 24, 16), new THREE.MeshStandardMaterial({ map: holdTextura(), roughness: 1 }));
    hold.position.set(4.2, 0.6, 0); holdKor.add(hold);
    s.ciklus((dt) => { fold.gomb.rotation.y += dt * 0.22; holdKor.rotation.y += dt * 0.18; });
  },
  mertan(s) {
    const g = new THREE.Group(); s.scene.add(g);
    const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7, 0), new THREE.MeshStandardMaterial({ color: 0x4dabf7, flatShading: true, roughness: .4 }));
    const kocka = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(3.4, 3.4, 3.4)), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: .65 }));
    const gy1 = new THREE.Mesh(new THREE.TorusGeometry(2.9, 0.05, 8, 72), new THREE.MeshBasicMaterial({ color: 0xffd43b }));
    const gy2 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.04, 8, 72), new THREE.MeshBasicMaterial({ color: 0xff8787 }));
    g.add(ico, kocka, gy1, gy2);
    s.ciklus((dt, t) => { g.rotation.y += dt * 0.3; ico.rotation.x += dt * 0.5; kocka.rotation.z += dt * 0.2; gy1.rotation.x = t * 0.4; gy2.rotation.y = t * 0.3; });
  },
  konyv(s) {
    const szinek = [0xd6336c, 0x7048e8, 0x1c7ed6, 0x2f9e44, 0xe8590c], konyvek = [];
    szinek.forEach((sz, i) => {
      const fed = new THREE.MeshStandardMaterial({ color: sz, roughness: .6 }), lap = new THREE.MeshStandardMaterial({ color: 0xf5f1e6, roughness: .9 });
      const b = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.6, 0.32), [lap, fed, lap, lap, fed, fed]);   // +x, −x, +y, −y, +z, −z
      b.position.set(-4 + i * 2, i % 2 ? 0.8 : -0.6, (i % 3) - 1); b.userData.y0 = b.position.y; s.scene.add(b); konyvek.push(b);
    });
    s.ciklus((dt, t) => konyvek.forEach((b, i) => {
      b.rotation.y += dt * (0.4 + i * 0.08); b.rotation.x = Math.sin(t * 0.6 + i) * 0.25; b.position.y = b.userData.y0 + Math.sin(t * 1.2 + i) * 0.25;
    }));
  },
  hang(s) {
    const g = new THREE.Group(); g.rotation.x = 0.25; s.scene.add(g); const oszlopok = [];
    for (let i = 0; i < 11; i++) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1, 0.5), new THREE.MeshStandardMaterial({ color: new THREE.Color().setHSL(0.55 + i * 0.035, 0.8, 0.55) }));
      m.position.x = (i - 5) * 0.8; g.add(m); oszlopok.push(m);
    }
    s.ciklus((dt, t) => {
      oszlopok.forEach((m, i) => { const h = 1.2 + Math.abs(Math.sin(t * 2 + i * 0.6)) * 2.6 + Math.sin(t * 3.1 + i) * 0.4; m.scale.y = h; m.position.y = h / 2 - 1.2; });
      g.rotation.y = Math.sin(t * 0.3) * 0.5;
    });
  },
};
/** Háttérjelenet a megadott témával. */
function hatter3d(tarolo, tema = "fold") {
  const s = szinpad(tarolo, { tavol: 9, pitch: 0.25, interaktiv: false, csillagok: tema === "fold" || tema === "hang" });
  if (!s) return null;
  s.scene.add(new THREE.AmbientLight(0x8090b8, 0.8));
  const f = new THREE.DirectionalLight(0xffffff, 1.4); f.position.set(6, 4, 5); s.scene.add(f);
  (HATTEREK[tema] || HATTEREK.fold)(s);
  return s;
}
const hero3d = (tarolo) => hatter3d(tarolo, "fold");   // régi név (kompatibilitás)

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

/* ---------- 8. HOLDFÁZISOK ---------- */
function holdKepRajz(vaszon, fi) {                    // a Hold „Földről nézett" alakja (északi félgömb): fi = 0° újhold, 180° telihold
  const x = vaszon.getContext("2d"), R = 44, cx = 50, cy = 50, k = Math.cos(fi * FOK), nov = fi < 180;
  x.clearRect(0, 0, 100, 100); x.fillStyle = "#2a2f3d"; x.beginPath(); x.arc(cx, cy, R, 0, 6.283); x.fill();
  x.fillStyle = "#f2efe2";
  for (let y = -R; y <= R; y++) {                     // soronként: megvilágított rész a terminátorig
    const w = Math.sqrt(R * R - y * y), t = k * w;
    if (nov) x.fillRect(cx + t, cy + y, w - t, 1); else x.fillRect(cx - w, cy + y, w + t, 1);
  }
}
const FAZISNEVEK = [[0, "újhold"], [45, "növekvő sarló"], [90, "első negyed"], [135, "növekvő hold"], [180, "telihold"], [225, "fogyó hold"], [270, "utolsó negyed"], [315, "fogyó sarló"]];
function holdfazisok(tarolo) {
  const s = szinpad(tarolo, { tavol: 17, pitch: 0.75, csillagok: true });
  if (!s) return;
  s.scene.add(new THREE.AmbientLight(0x1a2236, 0.35));
  const nap = new THREE.DirectionalLight(0xffffff, 2.0); nap.position.set(30, 0, 0); s.scene.add(nap);   // a napsugarak +x felől érkeznek
  const napGomb = new THREE.Mesh(new THREE.SphereGeometry(2.2, 32, 24), new THREE.MeshBasicMaterial({ color: 0xffc933 })); napGomb.position.set(22, 0, 0); s.scene.add(napGomb);
  const fold = foldKeszit(1.4); s.scene.add(fold.dont); fold.tengely.visible = false;
  const palya = gyuru(6, 0x9aa4b8, 0.04); s.scene.add(palya);
  const hold = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 24), new THREE.MeshStandardMaterial({ map: holdTextura(), roughness: 1 })); s.scene.add(hold);
  const all = { fi: 0, jatek: true }, cs = $id("hf-csuszka"), gomb = $id("hf-jatek"), info = $id("hf-info"), kep = $id("hf-kep");
  if (gomb) gomb.onclick = () => { all.jatek = !all.jatek; gomb.textContent = all.jatek ? "⏸ Megállít" : "▶ Indít"; };
  if (cs) cs.oninput = () => { all.fi = +cs.value; all.jatek = false; if (gomb) gomb.textContent = "▶ Indít"; };
  s.ciklus((dt) => {
    if (all.jatek) all.fi = (all.fi + dt * 24) % 360;
    hold.position.set(6 * Math.cos(all.fi * FOK), 0, -6 * Math.sin(all.fi * FOK));
    fold.gomb.rotation.y += dt * 0.5;
    const nev = FAZISNEVEK.reduce((m, f) => (Math.abs(((all.fi - f[0] + 540) % 360) - 180) < 22.5 ? f[1] : m), "");
    const fenyes = Math.round((1 - Math.cos(all.fi * FOK)) * 50);
    if (kep) holdKepRajz(kep, all.fi);
    if (info) info.innerHTML = `<b>${nev}</b> – a Hold megvilágított felének kb. ${fenyes}%-át látjuk a Földről. A Holdnak mindig a Nap felé néző fele világos, a fázis attól függ, honnan nézzük.`;
    if (cs) cs.value = Math.round(all.fi);
  });
}

/* ---------- 9. SZÉLERŐMŰPARK ---------- */
function szelerom(tarolo) {
  const s = szinpad(tarolo, { tavol: 26, pitch: 0.18, yaw: 0.3 });
  if (!s) return;
  s.scene.add(new THREE.HemisphereLight(0xcfe6ff, 0x4c7a3a, 1.0)); const f = new THREE.DirectionalLight(0xffffff, 1.0); f.position.set(8, 14, 10); s.scene.add(f);
  const fold = new THREE.Mesh(new THREE.CircleGeometry(40, 48), new THREE.MeshStandardMaterial({ color: 0x5aa05a, roughness: 1 })); fold.rotation.x = -Math.PI / 2; fold.position.y = -4; s.scene.add(fold);
  const rotorok = [];
  [[-9, -3, 0.9], [0, 0, 1.15], [9, -5, 0.8]].forEach(([x, z, m]) => {     // három erőmű = „park"
    const g = new THREE.Group(); g.position.set(x, -4, z); g.scale.setScalar(m); s.scene.add(g);
    const torony = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.5, 9, 16), new THREE.MeshStandardMaterial({ color: 0xf1f3f5, roughness: .6 })); torony.position.y = 4.5; g.add(torony);
    const gondola = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.7, 1.9), new THREE.MeshStandardMaterial({ color: 0xdee2e6 })); gondola.position.set(0, 9.2, 0.2); g.add(gondola);
    const rotor = new THREE.Group(); rotor.position.set(0, 9.2, 1.25); g.add(rotor);
    for (let i = 0; i < 3; i++) {
      const lapat = new THREE.Mesh(new THREE.BoxGeometry(0.28, 4.2, 0.05), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      lapat.position.y = 2.1; const t = new THREE.Group(); t.rotation.z = i * 2.0944; t.add(lapat); rotor.add(t);
    }
    rotor.add(new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 12), new THREE.MeshStandardMaterial({ color: 0xc92a2a })));
    rotorok.push(rotor);
  });
  const cs = $id("sz-csuszka"), info = $id("sz-info"), sav = $id("sz-sav");
  const all = { v: 8 };
  if (cs) cs.oninput = () => { all.v = +cs.value; };
  s.ciklus((dt) => {
    const hasznos = all.v >= 3;                                  // 3 m/s alatt nem indul be
    const omega = hasznos ? Math.min(all.v, 20) * 0.28 : 0;      // szemléltető fordulatszám
    rotorok.forEach((r) => { r.rotation.z -= dt * omega; });
    const teljesitmeny = hasznos ? Math.min(1, Math.pow(all.v / 12, 3)) : 0;   // a szél erejével gyorsan nő
    if (sav) sav.style.width = Math.round(teljesitmeny * 100) + "%";
    if (info) info.innerHTML = `Szélsebesség: <b>${all.v} m/s</b> – ` + (!hasznos ? "túl gyenge szél, a lapátok nem indulnak be, nincs villamosenergia-termelés." :
      teljesitmeny >= 1 ? "erős szél, az erőművek a legnagyobb teljesítménnyel termelnek." : "az erőművek termelnek: minél erősebb a szél, annál több villamos energiát adnak.");
  });
}

/* ---------- 10. REGISZTER: az animációk leírása (az animaciok.html és az okostankönyvek is ebből építkezik) ---------- */
const ANIMACIOK = [
  { kulcs: "naprendszer", ikon: "☀️", cim: "Nap, Föld és Hold", fn: naprendszer,
    leiras: "A Föld a tengelye körül forog (ettől váltakozik a nappal és az éjszaka), és közben kering a Nap körül. A Hold a Földet kerüli meg. <i>Az arányok szemléltetők, nem méretarányosak.</i>",
    vezerlo: `<button class="gomb" id="nap-jatek">⏸ Megállít</button><label>Sebesség <input type="range" id="nap-sebesseg" min="0.2" max="4" step="0.1" value="1"></label><label><input type="checkbox" id="nap-tengely" checked> Forgástengely</label><label><input type="checkbox" id="nap-palya" checked> Hold pályája</label>`,
    info: "Figyeld meg, hogy a Föld mindig félig meg van világítva: ahol a Nap felé néz, ott nappal van, a másik oldalon éjszaka." },
  { kulcs: "evszakok", ikon: "🌦️", cim: "Az évszakok kialakulása", fn: evszakok, infoId: "ev-info",
    leiras: "A Föld forgástengelye ferde, és a keringés során mindig ugyanarra dől. Ezért kap a két félgömb az év különböző szakaszaiban más-más szögben napsugarakat.",
    vezerlo: `<button class="gomb gomb--tomor" data-theta="90">Tavasz (márc. 21.)</button><button class="gomb gomb--tomor" data-theta="180">Nyár (jún. 21.)</button><button class="gomb gomb--tomor" data-theta="270">Ősz (szept. 23.)</button><button class="gomb gomb--tomor" data-theta="0">Tél (dec. 22.)</button><button class="gomb" id="ev-jatek">▶ Automatikus keringés</button><label>Pálya <input type="range" id="ev-csuszka" min="0" max="360" value="180"></label>`, info: "" },
  { kulcs: "holdfazisok", ikon: "🌙", cim: "A Hold fázisai", fn: holdfazisok, infoId: "hf-info",
    leiras: "A Hold a Föld körül kering, és mindig a Nap felé néző fele világos. Attól függően, hogy hol áll, a Földről más-más alakban látjuk. A bal alsó kép azt mutatja, amit az északi félgömbről látunk.",
    vezerlo: `<button class="gomb" id="hf-jatek">⏸ Megállít</button><label>Pálya <input type="range" id="hf-csuszka" min="0" max="359" value="0"></label><canvas class="holdkep" id="hf-kep" width="100" height="100" style="width:64px;height:64px"></canvas>`, info: "" },
  { kulcs: "foldbelseje", ikon: "🌋", cim: "A Föld belső szerkezete", fn: foldBelseje, infoId: "fb-info",
    leiras: "A kivágott gömbön látszanak a Föld rétegei. Válassz egy réteget, és olvasd el a leírását! <i>A rétegek vastagsága szemléltető, nem méretarányos.</i>",
    vezerlo: `<button class="gomb gomb--tomor" data-reteg="kereg">Földkéreg</button><button class="gomb gomb--tomor" data-reteg="kopeny">Földköpeny</button><button class="gomb gomb--tomor" data-reteg="kulsomag">Külső mag</button><button class="gomb gomb--tomor" data-reteg="belsomag">Belső mag</button><button class="gomb" id="fb-forgat">⏸ Forgatás leállítása</button>`, info: "Válassz egy réteget a gombokkal!" },
  { kulcs: "toltesek", ikon: "⚡", cim: "Elektromos kölcsönhatás: vonzás és taszítás", fn: toltesek, infoId: "tolt-info",
    leiras: "Az azonos töltésű testek taszítják, az ellentétes töltésűek vonzzák egymást. A sárga nyilak az erőhatás irányát mutatják, közelebb erősebbek.",
    vezerlo: `<button class="gomb gomb--tomor" data-tolt="vonzas">+ és − (ellentétes)</button><button class="gomb gomb--tomor" data-tolt="taszitas">+ és + (azonos)</button>`, info: "" },
  { kulcs: "szelerom", ikon: "🌬️", cim: "Szélerőműpark", fn: szelerom, infoId: "sz-info",
    leiras: "A szél forgatja a lapátokat, a generátor pedig villamos energiát termel. Állítsd a szél erejét, és figyeld, mi történik! <i>A számok szemléltetők.</i>",
    vezerlo: `<label>Szélsebesség <input type="range" id="sz-csuszka" min="0" max="20" step="1" value="8"></label><span style="display:inline-block;width:140px;height:12px;border-radius:6px;background:#d9dee8;overflow:hidden" title="Termelt teljesítmény"><i id="sz-sav" style="display:block;height:12px;width:0;background:#2f9e44"></i></span>`, info: "" },
];
/** Egy animációs kártya (cím, leírás, 3D vászon, vezérlők, információs sáv). */
function animKartya(a) {
  const d = document.createElement("section"); d.className = "panel animkartya mot-anim"; d.id = a.kulcs;
  d.innerHTML = `<h3>${a.ikon} ${a.cim}</h3><p>${a.leiras}</p><div class="anim" id="${a.kulcs}-vaszon"></div>
    <div class="vezerlo">${a.vezerlo}</div><div class="animinfo"${a.infoId ? ` id="${a.infoId}"` : ""}>${a.info}</div>`;
  return d;
}
/** Animáció beillesztése: `hova` = szülő (a végére) vagy egy elem, ami UTÁN kerül (mod = "utan"). Visszaad: kezelő (torol). */
function animBeszur(kulcs, hova, mod = "vegere") {
  const a = ANIMACIOK.find((x) => x.kulcs === kulcs); if (!a || !hova) return { elem: hova, torol() {} };
  MOT3D.stilus();
  const k = animKartya(a);
  if (mod === "utan") hova.insertAdjacentElement("afterend", k); else hova.appendChild(k);
  const h = MOT3D.jelenet(k.querySelector(".anim"), a.fn, true);
  return { elem: k, torol() { h.torol(); k.remove(); } };
}
