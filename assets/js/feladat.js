/* ==========================================================
   MOT – beágyazott feladatsorok az okostankönyvekben
   Tartalom: 1. Eredménytár  2. Stílus  3. Egy feladatsor (kvíz)
             4. Panel (fülek)  5. Beépítés a kész okostankönyv-oldalakba
   Egy feladatsor adata: { id, cim, key, utan, d }
     id    – egyedi azonosító (a #feladat-<id> hivatkozás használja)
     cim   – a fejezet neve          key – az eredménytár kulcsa
     utan  – az az oldalszám, amely UTÁN a fejezet feladatai következnek
     d     – kérdések: { t:"c"|"f"|"m", q, ... } (lásd a dokumentációt)
   ========================================================== */
const MOTFeladat = {
  TAR: "mot_eredmenyek",

  /* ---------- 1. EREDMÉNYTÁR ---------- */
  tar() { try { return JSON.parse(localStorage.getItem(this.TAR)) || {}; } catch (e) { return {}; } },
  ment(adat, pont, max) {
    try {
      const t = this.tar(), r = t[adat.key] || {};
      t[adat.key] = { cim: adat.konyv ? `${adat.konyv} – ${adat.cim}` : adat.cim, pont, max, legjobb: Math.max(pont, r.legjobb || 0), ido: Date.now() };
      localStorage.setItem(this.TAR, JSON.stringify(t));
    } catch (e) {}
  },

  /* ---------- 2. STÍLUS (a befogadó oldaltól független) ---------- */
  stilus() {
    if (document.getElementById("mf-css")) return;
    const st = document.createElement("style"); st.id = "mf-css";
    st.textContent = `
.mf-fulek{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0}
.mf-ful{padding:6px 12px;border-radius:999px;border:1px solid #1c7ed6;background:none;color:inherit;font:600 14px system-ui,sans-serif;cursor:pointer}
.mf-ful.mf-aktiv{background:#1c7ed6;color:#fff}.mf-ful.mf-kesz{border-color:#2f9e44}
.mf-kerdes{border:1px solid rgba(128,128,128,.35);border-radius:10px;padding:12px;margin:10px 0}
.mf-opcio,.mf-gomb{display:block;width:100%;text-align:left;margin:6px 0;padding:9px 12px;border:1px solid rgba(128,128,128,.45);border-radius:8px;background:none;color:inherit;font:inherit;cursor:pointer}
.mf-gomb{display:inline-block;width:auto;background:#1c7ed6;color:#fff;border:0;font-weight:700}
.mf-sor{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:6px 0}
.mf-kerdes input,.mf-kerdes select{font:inherit;padding:7px;border:1px solid rgba(128,128,128,.5);border-radius:6px;background:transparent;color:inherit;max-width:100%}
.mf-ok{border-color:#2f9e44!important;color:#2f9e44}.mf-no{border-color:#e03131!important;color:#e03131}
.mf-sav{height:8px;border-radius:4px;background:rgba(128,128,128,.3);margin:8px 0}.mf-sav i{display:block;height:8px;border-radius:4px;background:#1c7ed6;width:0}
.mf-eredmeny{font-weight:700;font-size:18px;margin:8px 0}
.mf-vege{margin:8px 0 18px;text-align:right}`;
    document.head.appendChild(st);
  },

  /* ---------- 3. EGY FELADATSOR ---------- */
  kviz(adat, doboz, kesz) {
    doboz.innerHTML = "";
    const D = adat.d, norm = (x) => String(x).toLowerCase().replace(/\s+/g, "").replace(",", ".").replace(/\.$/, "");
    let n = 0, k = 0;
    const sav = document.createElement("div"); sav.className = "mf-sav"; sav.innerHTML = "<i></i>"; doboz.appendChild(sav);
    const eredmeny = document.createElement("div"); eredmeny.className = "mf-eredmeny";
    function vege(ok, doboz2) {                      // egy kérdés lezárása
      if (doboz2.dataset.k) return; doboz2.dataset.k = 1; k++; if (ok) n++;
      sav.firstChild.style.width = (100 * k / D.length) + "%";
      if (k === D.length) {
        eredmeny.textContent = `Eredmény: ${n} / ${D.length}`;
        MOTFeladat.ment(adat, n, D.length); if (kesz) kesz(n, D.length);
        const ujra = document.createElement("button"); ujra.className = "mf-gomb"; ujra.textContent = "Újra"; ujra.onclick = () => MOTFeladat.kviz(adat, doboz, kesz); eredmeny.appendChild(document.createTextNode(" ")); eredmeny.appendChild(ujra);
      }
    }
    D.forEach((x, i) => {
      const d = document.createElement("div"); d.className = "mf-kerdes"; d.innerHTML = `<b>${i + 1}. ${x.q}</b>`;
      if (x.t === "c") {                              // feleletválasztós
        x.o.map((o, j) => [o, j]).sort(() => Math.random() - 0.5).forEach(([o, j]) => {
          const b = document.createElement("button"); b.type = "button"; b.className = "mf-opcio"; b.textContent = o;
          b.onclick = () => { if (d.dataset.k) return; const ok = j === x.a; b.classList.add(ok ? "mf-ok" : "mf-no");
            if (!ok) [...d.querySelectorAll(".mf-opcio")].find((e) => e.textContent === x.o[x.a]).classList.add("mf-ok"); vege(ok, d); };
          d.appendChild(b);
        });
      } else if (x.t === "f") {                       // beírós
        const r = document.createElement("div"); r.className = "mf-sor"; r.innerHTML = `<input placeholder="Válasz"><button type="button" class="mf-gomb">Ellenőriz</button><span></span>`;
        const [be, bt, sp] = r.children;
        const ell = () => { if (d.dataset.k) return; const ok = x.a.map(norm).includes(norm(be.value));
          sp.textContent = ok ? "✔ Helyes!" : "✘ Helyes válasz: " + x.a[0]; sp.className = ok ? "mf-ok" : "mf-no"; vege(ok, d); };
        bt.onclick = ell; be.addEventListener("keydown", (e) => { if (e.key === "Enter") ell(); }); d.appendChild(r);
      } else {                                        // párosítás
        const jobb = x.p.map((e) => e[1]).sort(() => Math.random() - 0.5), sel = [];
        x.p.forEach((e) => { const r = document.createElement("div"); r.className = "mf-sor"; const s = document.createElement("select");
          s.innerHTML = `<option value="">–</option>` + jobb.map((l) => `<option>${l}</option>`).join(""); r.append(e[0] + " → ", s); sel.push(s); d.appendChild(r); });
        const bt = document.createElement("button"); bt.type = "button"; bt.className = "mf-gomb"; bt.textContent = "Ellenőriz";
        bt.onclick = () => { if (d.dataset.k) return; let ok = true; sel.forEach((s, j) => { const g = s.value === x.p[j][1]; if (!g) ok = false; s.className = g ? "mf-ok" : "mf-no"; }); vege(ok, d); };
        d.appendChild(bt);
      }
      doboz.appendChild(d);
    });
    doboz.appendChild(eredmeny);
  },

  /* ---------- 4. PANEL: fülek (fejezetek) + a kiválasztott feladatsor ---------- */
  panel(szulo, adatok) {
    this.stilus();
    szulo.innerHTML = `<h2>✏️ Interaktív feladatok</h2><p style="opacity:.8;margin:.2em 0">Válaszd ki a fejezetet, és oldd meg a feladatokat! Az eredményed a böngésződben megmarad (Előzmények).</p><div class="mf-fulek"></div><div class="mf-teszt"></div>`;
    const fulek = szulo.querySelector(".mf-fulek"), teszt = szulo.querySelector(".mf-teszt"), gombok = {};
    const felirat = (a) => { const e = this.tar()[a.key]; return (e ? "✓ " : "") + a.cim + (e ? ` (${e.legjobb}/${e.max})` : ""); };
    adatok.forEach((a) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "mf-ful"; b.textContent = felirat(a);
      if (this.tar()[a.key]) b.classList.add("mf-kesz");
      b.onclick = () => valaszt(a.id); fulek.appendChild(b); gombok[a.id] = b;
    });
    function valaszt(id, gorget) {
      const a = adatok.find((x) => x.id === id); if (!a) return;
      Object.values(gombok).forEach((b) => b.classList.remove("mf-aktiv")); gombok[id].classList.add("mf-aktiv");
      MOTFeladat.kviz(a, teszt, () => { gombok[id].textContent = felirat(a); gombok[id].classList.add("mf-kesz"); });
      if (gorget) szulo.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    const hash = () => { const m = location.hash.match(/^#feladat-(.+)$/); if (m && adatok.some((a) => a.id === m[1])) valaszt(decodeURIComponent(m[1]), true); };
    if (adatok.length) valaszt(adatok[0].id);
    hash(); window.addEventListener("hashchange", hash);
    return { valaszt };
  },
  /** Egy fejezet végén megjelenő gomb, ami a panelben megnyitja a feladatsort. */
  vegeGomb(adat, panelObj) {
    const d = document.createElement("div"); d.className = "mf-vege";
    const b = document.createElement("button"); b.type = "button"; b.className = "mf-gomb"; b.textContent = "✏️ Feladatok: " + adat.cim;
    b.onclick = () => panelObj.valaszt(adat.id, true); d.appendChild(b); return d;
  },

  /* ---------- 5. BEÉPÍTÉS a kész (statikus) okostankönyv-oldalakba ---------- */
  okostankonyvbe(adatok) {
    const gyak = document.getElementById("gyakorlas"), host = gyak ? gyak.parentNode : document.querySelector("article, main");
    const panel = document.createElement("section"); panel.className = "panel"; panel.id = "feladatok";
    if (gyak) host.insertBefore(panel, gyak); else host.prepend(panel);
    const p = this.panel(panel, adatok);
    const nav = document.querySelector("nav");
    if (nav) { const a = document.createElement("a"); a.href = "#feladatok"; a.textContent = "Feladatok"; nav.insertBefore(a, nav.children[2] || null); }
    adatok.forEach((a) => { const lap = document.getElementById("oldal-" + a.utan); if (lap) lap.insertAdjacentElement("afterend", this.vegeGomb(a, p)); });
    const kereso = document.getElementById("search");   // keresés közben a fejezetvégi gombok elrejtése
    if (kereso) kereso.addEventListener("input", () => document.querySelectorAll(".mf-vege").forEach((e) => { e.hidden = !!kereso.value.trim(); }));
    return p;
  },
};
