# MOT – Fejlesztői dokumentáció (API)

A MOT egy **statikus weboldal**: nincs szerver és adatbázis, minden fájl a böngészőben fut. Az „API" itt azokat a **adatformátumokat, URL-paramétereket és JavaScript-függvényeket** jelenti, amelyekkel az oldal bővíthető. A dokumentáció a jelenlegi állapotot írja le; a végén egy külön, **még meg nem valósított** szerveroldali terv is szerepel.

## 1. Fájlszerkezet

```
index.html            Kezdőlap: tankönyvválasztó (szűrők + kártyák)
konyv.html            Tankönyv nézet: tartalomjegyzék
diagram.html          Fogalomtérképek (mxGraph)
animaciok.html        3D animációk (three.js)
elozmenyek.html       Megoldott feladatsorok
segitseg.html, impresszum.html, dokumentacio.html
data/konyvek.js       Tankönyvek és fejezetek (MOT_KONYVEK)
data/diagramok.js     Fogalomtérképek (MOT_DIAGRAMOK)
assets/css/style.css  Közös stíluslap (színek az 1. blokkban)
assets/js/            kozos.js, fooldal.js, konyv.js, diagram.js, elozmenyek.js, 3d.js, animaciok.js
assets/vendor/mxgraph Harmadik féltől: mxGraph (Apache 2.0)
assets/vendor/three   Harmadik féltől: three.js r147 (MIT)
6.osztaly/<tankonyv>/ PDF-ek, okostankonyv.html, fejezetenként feladatok.html
```

## 2. URL-paraméterek

| URL | Jelentés |
|---|---|
| `konyv.html?id=<könyv-id>` | Egy tankönyv tartalomjegyzéke. Ismeretlen id esetén hibaüzenet. |
| `diagram.html` | A fogalomtérképek listája. |
| `diagram.html?id=<diagram-id>` | Egy fogalomtérkép megjelenítése. |
| `animaciok.html#<név>` | A 3D animációk oldala a megadott kártyához görget: `naprendszer`, `evszakok`, `foldbelseje`, `toltesek`. |
| `6.osztaly/<könyv>/okostankonyv.html#oldal-<N>` | Az okostankönyv N. oldalára ugrik (N = PDF-oldalszám). |

## 3. Tankönyvek: `data/konyvek.js`

A fájl egy `MOT_KONYVEK` nevű tömböt definiál. Egy elem:

| Mező | Típus | Kötelező | Leírás |
|---|---|---|---|
| `id` | string | igen | Egyedi azonosító; megegyezik a mappa nevével (pl. `06_Tortenelem_OH-TOR06TB`). |
| `cim` | string | igen | A tankönyv neve. |
| `tantargy` | string | igen | A tantárgyszűrő értéke (pl. `Történelem`). |
| `evfolyam` | string | igen | Az évfolyamszűrő értéke (pl. `6. osztály`). |
| `ikon`, `szin` | string | igen | Emoji és hex színkód a kártyához. |
| `okostankonyv` | string \| null | nem | A teljes HTML-tankönyv útvonala. |
| `csoportok` | objektum | nem | Témakör neve → `{ "feladat": "…" }`: témakörönkénti feladatsor (pl. Természettudomány). |
| `animaciok` | boolean | nem | `true`: a tankönyv oldalán megjelenik a „3D animációk" gomb. |
| `fejezetek` | tömb | igen | Lásd lent. |

Egy **fejezet**:

| Mező | Típus | Leírás |
|---|---|---|
| `cim` | string | A fejezet neve. |
| `pdf` | string \| null | A fejezetre vágott PDF útvonala. |
| `feladat` | string \| null | A `feladatok.html` útvonala (az **eredménytár kulcsa**, lásd 5.). `null`, ha a feladat csak témakörönként van. |
| `csoport` | string | A lecke témaköre. Ha meg van adva, a tartalomjegyzék témakör-fejlécekkel csoportosít; a fejléc a `csoportok` megfelelő feladatsorára mutat. |
| `oldalak` | string | Megjelenített szöveg, pl. `PDF 9–15. oldal`. |
| `elso_oldal` | number | A fejezet első PDF-oldala; ide ugrik az okostankönyv-gomb. |

## 4. Feladatsorok: a `feladatok.html` kérdésformátuma

Minden feladatsor oldalán egy `const D = [...]` tömb tartalmazza a kérdéseket. Három típus van:

```json
{ "t": "c", "q": "Kérdés?", "o": ["helyes", "rossz1", "rossz2"], "a": 0 }
{ "t": "f", "q": "Kérdés?", "a": ["helyes válasz", "elfogadott másik alak"] }
{ "t": "m", "q": "Párosítsd!", "p": [["bal1", "jobb1"], ["bal2", "jobb2"]] }
```

* **`c` – feleletválasztós**: `o` a válaszlista, `a` a helyes elem **indexe**. A sorrendet az oldal betöltéskor véletlenszerűen keveri.
* **`f` – beírós**: `a` az elfogadott válaszok listája. Az összehasonlításnál a kis- és nagybetű, a szóközök és a tizedesvessző/pont különbsége nem számít.
* **`m` – párosítás**: `p` a (bal, jobb) párok listája. A jobb oldali értékek legördülő menüből választhatók; a kérdés akkor számít jónak, ha minden pár helyes.

Egy kérdés 1 pontot ér. A feladatsor végén az oldal kiírja az eredményt, és elmenti (lásd 5.).

## 5. Eredménytár (localStorage)

Kulcs: `mot_eredmenyek`. Érték: JSON objektum, amelynek kulcsa a feladatsor `feladat` útvonala:

```json
{
  "6.osztaly/03_.../01_Egesz_szamok_oszthatosag/feladatok.html": {
    "cim": "Matematika tankönyv – Egesz szamok oszthatosag",
    "pont": 5, "max": 8, "legjobb": 6, "ido": 1760680000000
  }
}
```

`ido` ezredmásodperces időbélyeg. Az adat csak a felhasználó böngészőjében van, nem kerül szerverre. Törlése: **Előzmények → Eredmények törlése**.

## 6. JavaScript-függvények (`assets/js/kozos.js`)

| Függvény | Leírás |
|---|---|
| `oldalKeret(aktiv)` | Kirajzolja a fejlécet, menüt és láblécet; `aktiv` az aktuális menüpont fájlneve. Az oldalnak tartalmaznia kell a `#fejlec` és `#lablec` elemet. |
| `eredmenyek()` | Visszaadja az eredménytárat objektumként (hiba esetén `{}`). |
| `eredmenyekTorol()` | Törli az eredménytárat. |
| `$(valaszto)` | `document.querySelector` rövidítése. |
| `MENU`, `LOGO_FAJL` | Beállítások: menüpontok, logó útvonala (`assets/img/logo.png`). |

## 7. Fogalomtérképek (mxGraph): `data/diagramok.js`

A `MOT_DIAGRAMOK` tömb egy eleme:

| Mező | Leírás |
|---|---|
| `id` | Egyedi azonosító (`diagram.html?id=…`). |
| `cim` | A diagram címe. |
| `konyv` | A kapcsolódó tankönyv `id`-ja (a tankönyv nézetből erre linkelünk). |
| `xml` | Az ábra `mxGraphModel` XML-je. |
| `leiras` | Objektum: csomópont-`id` → magyarázat; kattintásra jelenik meg az ábra alatt. |

Az XML-t kézzel vagy a [draw.io](https://www.drawio.com/) szerkesztővel is elő lehet állítani (*Extras → Edit Diagram*). A megjelenítő (`diagram.js`) **csak olvasható**: a csomópontok nem mozgathatók, az ábra húzással görgethető. Az mxGraph 4.2.2-es verziója van beépítve; a projekt fejlesztése megszűnt, az utódja a [maxGraph](https://github.com/maxGraph/maxGraph).

## 7/b. 3D animációk (`assets/js/3d.js`, three.js)

A 3D jelenetek a [three.js](https://threejs.org/) r147-es verzióját használják, amely helyben, az `assets/vendor/three/` mappában van (nem külső szerverről töltődik). A főoldal kék sávjában a forgó Föld is ez; az `animaciok.html` négy interaktív jelenetet tartalmaz.

| Függvény | Jelenet |
|---|---|
| `hero3d(tarolo)` | Főoldali háttér: forgó Föld keringő Holddal (nem interaktív). |
| `naprendszer(tarolo)` | Nap–Föld–Hold, sebességcsúszka, tengely és pálya ki/be. |
| `evszakok(tarolo)` | A Föld keringése döntött tengellyel; gombok az évszakokra, csúszka a pályán, magyarázat. |
| `foldBelseje(tarolo)` | Kivágott gömb a Föld rétegeivel; réteg kiemelése gombbal. |
| `toltesek(tarolo)` | Elektromos vonzás és taszítás nyilakkal. |

* **Közös színpad:** `szinpad(tarolo, opciok)` hozza létre a renderert és a kamerát. Húzással forgatható, görgetéssel nagyítható; a ciklus csak akkor fut, amikor a tároló látszik. Visszaad egy objektumot, amelyen `ciklus(fn)`-nel adhatsz hozzá képkockánkénti frissítést (`fn(dt, ido)`).
* **Beállítások:** `opciok.tavol` (kamera távolsága), `pitch`/`yaw` (kezdő nézet), `interaktiv` (false: nem forgatható), `csillagok` (csillagos háttér).
* **Új jelenet:** írj egy `function sajatJelenet(tarolo)` függvényt a `3d.js`-ben (másolj egy meglévőt), tegyél az `animaciok.html`-be egy `<div class="anim" id="…-vaszon">` elemet, és hívd meg az `animaciok.js`-ben.
* **Textúrák:** a Föld és a Hold felszíne programból készül (`foldTextura()`, `holdTextura()`), nincs külső képfájl.
* **Hozzáférhetőség:** ha a böngészőben be van kapcsolva a „mozgás csökkentése", a jelenetek csak egy állóképet rajzolnak. WebGL nélküli böngészőben tájékoztató szöveg jelenik meg.

## 8. Új tartalom hozzáadása

1. **Új fejezet:** tedd a PDF-et és a `feladatok.html`-t a tankönyv mappájába, majd vegyél fel egy blokkot a `fejezetek` listába (`data/konyvek.js`).
2. **Új tankönyv:** vegyél fel egy új elemet a `MOT_KONYVEK` tömbbe, és hozz létre hozzá mappát a `6.osztaly/` alatt.
3. **Új évfolyam:** írd be az `evfolyam` mezőbe az új értéket (pl. `7. osztály`), a Kezdőlap szűrője automatikusan felveszi.
4. **Új fogalomtérkép:** másolj egy blokkot a `data/diagramok.js`-ben.
5. **Új kérdés:** szerkeszd a megfelelő `feladatok.html` `const D = [...]` tömbjét a 4. fejezet formátuma szerint.

## 9. Licencek

* **mxGraph** – Apache License 2.0 (`assets/vendor/mxgraph/LICENSE`).
* **three.js** – MIT licenc (`assets/vendor/three/LICENSE`).
* **Tankönyvek** – az Oktatási Hivatal kiadványai; a felhasználásra vonatkozó jogosultságot az üzemeltető vállalja.
* **Feladatok, kód** – saját készítésű.

## 10. Terv: szerveroldali API (nincs megvalósítva)

Ha a MOT később szervert kap (pl. bejelentkezés, osztályszintű eredmények), a jelenlegi adatmodellre ez a REST-felület illeszkedne. **Ez csak javaslat, jelenleg ilyen végpont nem létezik.**

| Végpont | Leírás |
|---|---|
| `GET /api/konyvek?tantargy=&evfolyam=` | A `MOT_KONYVEK` szűrt listája. |
| `GET /api/konyvek/{id}` | Egy tankönyv fejezetekkel. |
| `GET /api/feladatok/{feladat-id}` | Egy feladatsor kérdései (a 4. fejezet formátumában). |
| `POST /api/eredmenyek` | Egy eredmény mentése: `{ "feladat": "...", "pont": 5, "max": 8 }`. |
| `GET /api/eredmenyek` | A bejelentkezett felhasználó eredményei. |
