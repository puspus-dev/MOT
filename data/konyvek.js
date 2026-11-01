/* ==========================================================
   MOT – tankönyvek és fejezetek
   Új tankönyv / fejezet: másolj egy meglévő blokkot és írd át.
   - id:       egyedi azonosító (a konyv.html?id=... használja)
   - tantargy / evfolyam: ezekre szűr a Kezdőlap
   - fejezetek[].pdf:     a tananyag PDF útvonala (vagy null)
   - okostankonyv:        a teljes, kereshető HTML-tankönyv (vagy null)
   - fejezetek[].elso_oldal: a fejezet első oldala az okostankönyvben (ugrás: #oldal-N)
   - csoportok:           (nem kötelező) témakör -> { feladat }: témakörönkénti feladatsor
   - fejezetek[].csoport: (nem kötelező) a lecke témaköre; ha van, a tartalomjegyzék témakörönként csoportosít
   - animaciok:           (nem kötelező) true: a 3D animációk gombja megjelenik
   - fejezetek[].feladat: a feladatok.html útvonala (vagy null). Az okostankönyvvel rendelkező könyveknél ez `okostankonyv.html#feladat-<id>`: a feladatok az okostankönyvbe vannak építve
   ========================================================== */
const MOT_KONYVEK = [
  {
    "id": "01_Magyar_nyelv_OH-MNY06TB",
    "cim": "Magyar nyelv",
    "tantargy": "Magyar nyelv",
    "evfolyam": "6. osztály",
    "ikon": "📝",
    "szin": "#d6336c",
    "okostankonyv": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/okostankonyv.html",
    "fejezetek": [
      {
        "cim": "Tanuljunk tanulni",
        "pdf": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/01_Tanuljunk_tanulni/01_Tanuljunk_tanulni.pdf",
        "feladat": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/okostankonyv.html#feladat-01_Tanuljunk_tanulni",
        "oldalak": "PDF 9–15. oldal",
        "elso_oldal": 9
      },
      {
        "cim": "A kommunikacio vilaga",
        "pdf": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/02_A_kommunikacio_vilaga/02_A_kommunikacio_vilaga.pdf",
        "feladat": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/okostankonyv.html#feladat-02_A_kommunikacio_vilaga",
        "oldalak": "PDF 16–39. oldal",
        "elso_oldal": 16
      },
      {
        "cim": "Szofajok I az ige",
        "pdf": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/03_Szofajok_I_az_ige/03_Szofajok_I_az_ige.pdf",
        "feladat": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/okostankonyv.html#feladat-03_Szofajok_I_az_ige",
        "oldalak": "PDF 40–57. oldal",
        "elso_oldal": 40
      },
      {
        "cim": "Szofajok II nevszok hatarozoszo",
        "pdf": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/04_Szofajok_II_nevszok_hatarozoszo/04_Szofajok_II_nevszok_hatarozoszo.pdf",
        "feladat": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/okostankonyv.html#feladat-04_Szofajok_II_nevszok_hatarozoszo",
        "oldalak": "PDF 58–99. oldal",
        "elso_oldal": 58
      },
      {
        "cim": "Szofajok III nevmasok igenevek",
        "pdf": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/05_Szofajok_III_nevmasok_igenevek/05_Szofajok_III_nevmasok_igenevek.pdf",
        "feladat": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/okostankonyv.html#feladat-05_Szofajok_III_nevmasok_igenevek",
        "oldalak": "PDF 100–123. oldal",
        "elso_oldal": 100
      },
      {
        "cim": "Szofajok IV viszonyszok mondatszok",
        "pdf": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/06_Szofajok_IV_viszonyszok_mondatszok/06_Szofajok_IV_viszonyszok_mondatszok.pdf",
        "feladat": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/okostankonyv.html#feladat-06_Szofajok_IV_viszonyszok_mondatszok",
        "oldalak": "PDF 124–139. oldal",
        "elso_oldal": 124
      },
      {
        "cim": "Szofajok V szofaji rendszer",
        "pdf": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/07_Szofajok_V_szofaji_rendszer/07_Szofajok_V_szofaji_rendszer.pdf",
        "feladat": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/okostankonyv.html#feladat-07_Szofajok_V_szofaji_rendszer",
        "oldalak": "PDF 140–147. oldal",
        "elso_oldal": 140
      },
      {
        "cim": "Fogalomtar",
        "pdf": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/08_Fogalomtar/08_Fogalomtar.pdf",
        "feladat": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/okostankonyv.html#feladat-08_Fogalomtar",
        "oldalak": "PDF 148–153. oldal",
        "elso_oldal": 148
      }
    ]
  },
  {
    "id": "02_Irodalom_OH-MIR06TB",
    "cim": "Irodalom",
    "tantargy": "Irodalom",
    "evfolyam": "6. osztály",
    "ikon": "📖",
    "szin": "#7048e8",
    "okostankonyv": "6.osztaly/02_Irodalom_OH-MIR06TB/okostankonyv.html",
    "fejezetek": [
      {
        "cim": "Hosok",
        "pdf": "6.osztaly/02_Irodalom_OH-MIR06TB/01_Hosok/01_Hosok.pdf",
        "feladat": "6.osztaly/02_Irodalom_OH-MIR06TB/okostankonyv.html#feladat-01_Hosok",
        "oldalak": "PDF 2–79. oldal",
        "elso_oldal": 2
      },
      {
        "cim": "Toldi",
        "pdf": "6.osztaly/02_Irodalom_OH-MIR06TB/02_Toldi/02_Toldi.pdf",
        "feladat": "6.osztaly/02_Irodalom_OH-MIR06TB/okostankonyv.html#feladat-02_Toldi",
        "oldalak": "PDF 80–175. oldal",
        "elso_oldal": 80
      },
      {
        "cim": "Szeretet",
        "pdf": "6.osztaly/02_Irodalom_OH-MIR06TB/03_Szeretet/03_Szeretet.pdf",
        "feladat": "6.osztaly/02_Irodalom_OH-MIR06TB/okostankonyv.html#feladat-03_Szeretet",
        "oldalak": "PDF 176–197. oldal",
        "elso_oldal": 176
      },
      {
        "cim": "Egri csillagok",
        "pdf": "6.osztaly/02_Irodalom_OH-MIR06TB/04_Egri_csillagok/04_Egri_csillagok.pdf",
        "feladat": "6.osztaly/02_Irodalom_OH-MIR06TB/okostankonyv.html#feladat-04_Egri_csillagok",
        "oldalak": "PDF 198–227. oldal",
        "elso_oldal": 198
      },
      {
        "cim": "Regenyek",
        "pdf": "6.osztaly/02_Irodalom_OH-MIR06TB/05_Regenyek/05_Regenyek.pdf",
        "feladat": "6.osztaly/02_Irodalom_OH-MIR06TB/okostankonyv.html#feladat-05_Regenyek",
        "oldalak": "PDF 228–257. oldal",
        "elso_oldal": 228
      }
    ]
  },
  {
    "id": "03_Matematika_tankonyv_OH-MAT06TA",
    "cim": "Matematika tankönyv",
    "tantargy": "Matematika",
    "evfolyam": "6. osztály",
    "ikon": "➗",
    "szin": "#1c7ed6",
    "okostankonyv": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/okostankonyv.html",
    "fejezetek": [
      {
        "cim": "Egesz szamok oszthatosag",
        "pdf": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/01_Egesz_szamok_oszthatosag/01_Egesz_szamok_oszthatosag.pdf",
        "feladat": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/okostankonyv.html#feladat-01_Egesz_szamok_oszthatosag",
        "oldalak": "PDF 9–54. oldal",
        "elso_oldal": 9
      },
      {
        "cim": "Tortek",
        "pdf": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/02_Tortek/02_Tortek.pdf",
        "feladat": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/okostankonyv.html#feladat-02_Tortek",
        "oldalak": "PDF 55–84. oldal",
        "elso_oldal": 55
      },
      {
        "cim": "Geometria tengelyes tukrozes",
        "pdf": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/03_Geometria_tengelyes_tukrozes/03_Geometria_tengelyes_tukrozes.pdf",
        "feladat": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/okostankonyv.html#feladat-03_Geometria_tengelyes_tukrozes",
        "oldalak": "PDF 85–122. oldal",
        "elso_oldal": 85
      },
      {
        "cim": "Arany szazalek szoveges",
        "pdf": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/04_Arany_szazalek_szoveges/04_Arany_szazalek_szoveges.pdf",
        "feladat": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/okostankonyv.html#feladat-04_Arany_szazalek_szoveges",
        "oldalak": "PDF 123–172. oldal",
        "elso_oldal": 123
      },
      {
        "cim": "Kerulet terulet felszin terfogat",
        "pdf": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/05_Kerulet_terulet_felszin_terfogat/05_Kerulet_terulet_felszin_terfogat.pdf",
        "feladat": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/okostankonyv.html#feladat-05_Kerulet_terulet_felszin_terfogat",
        "oldalak": "PDF 173–202. oldal",
        "elso_oldal": 173
      },
      {
        "cim": "Statisztika",
        "pdf": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/06_Statisztika/06_Statisztika.pdf",
        "feladat": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/okostankonyv.html#feladat-06_Statisztika",
        "oldalak": "PDF 203–225. oldal",
        "elso_oldal": 203
      }
    ]
  },
  {
    "id": "04_Matematika_munkafuzet_OH-MAT06MA",
    "cim": "Matematika munkafüzet",
    "tantargy": "Matematika",
    "evfolyam": "6. osztály",
    "ikon": "✏️",
    "szin": "#0c8599",
    "okostankonyv": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/okostankonyv.html",
    "fejezetek": [
      {
        "cim": "Egesz szamok oszthatosag",
        "pdf": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/01_Egesz_szamok_oszthatosag/01_Egesz_szamok_oszthatosag.pdf",
        "feladat": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/okostankonyv.html#feladat-01_Egesz_szamok_oszthatosag",
        "oldalak": "PDF 9–35. oldal",
        "elso_oldal": 9
      },
      {
        "cim": "Tortek",
        "pdf": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/02_Tortek/02_Tortek.pdf",
        "feladat": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/okostankonyv.html#feladat-02_Tortek",
        "oldalak": "PDF 36–54. oldal",
        "elso_oldal": 36
      },
      {
        "cim": "Geometria tengelyes tukrozes",
        "pdf": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/03_Geometria_tengelyes_tukrozes/03_Geometria_tengelyes_tukrozes.pdf",
        "feladat": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/okostankonyv.html#feladat-03_Geometria_tengelyes_tukrozes",
        "oldalak": "PDF 55–79. oldal",
        "elso_oldal": 55
      },
      {
        "cim": "Arany szazalek szoveges",
        "pdf": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/04_Arany_szazalek_szoveges/04_Arany_szazalek_szoveges.pdf",
        "feladat": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/okostankonyv.html#feladat-04_Arany_szazalek_szoveges",
        "oldalak": "PDF 80–106. oldal",
        "elso_oldal": 80
      },
      {
        "cim": "Kerulet terulet felszin terfogat",
        "pdf": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/05_Kerulet_terulet_felszin_terfogat/05_Kerulet_terulet_felszin_terfogat.pdf",
        "feladat": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/okostankonyv.html#feladat-05_Kerulet_terulet_felszin_terfogat",
        "oldalak": "PDF 107–125. oldal",
        "elso_oldal": 107
      },
      {
        "cim": "Statisztika",
        "pdf": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/06_Statisztika/06_Statisztika.pdf",
        "feladat": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/okostankonyv.html#feladat-06_Statisztika",
        "oldalak": "PDF 126–137. oldal",
        "elso_oldal": 126
      },
      {
        "cim": "Mindennapi penzugyeink",
        "pdf": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/07_Mindennapi_penzugyeink/07_Mindennapi_penzugyeink.pdf",
        "feladat": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/okostankonyv.html#feladat-07_Mindennapi_penzugyeink",
        "oldalak": "PDF 138–145. oldal",
        "elso_oldal": 138
      }
    ]
  },
  {
    "id": "05_Angol_Get_to_the_top_plus_2",
    "cim": "Get to the Top Plus 2 (MM Publications)",
    "tantargy": "Angol",
    "evfolyam": "6. osztály",
    "ikon": "🇬🇧",
    "szin": "#e8590c",
    "fejezetek": [
      {
        "cim": "Gyakorló feladatok",
        "pdf": null,
        "feladat": "6.osztaly/05_Angol_Get_to_the_top_plus_2/feladatok.html"
      }
    ]
  },
  {
    "id": "06_Tortenelem_OH-TOR06TB",
    "cim": "Történelem",
    "tantargy": "Történelem",
    "evfolyam": "6. osztály",
    "ikon": "🏰",
    "szin": "#a0522d",
    "okostankonyv": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html",
    "fejezetek": [
      {
        "cim": "Magyar kiralyportrek",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/01_Magyar_kiralyportrek/01_Magyar_kiralyportrek.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-01_Magyar_kiralyportrek",
        "oldalak": "PDF 9–16. oldal",
        "elso_oldal": 9
      },
      {
        "cim": "Hunyadi Janos",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/02_Hunyadi_Janos/02_Hunyadi_Janos.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-02_Hunyadi_Janos",
        "oldalak": "PDF 17–20. oldal",
        "elso_oldal": 17
      },
      {
        "cim": "Hunyadi Matyas",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/03_Hunyadi_Matyas/03_Hunyadi_Matyas.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-03_Hunyadi_Matyas",
        "oldalak": "PDF 21–30. oldal",
        "elso_oldal": 21
      },
      {
        "cim": "Foldrajzi felfedezesek",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/04_Foldrajzi_felfedezesek/04_Foldrajzi_felfedezesek.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-04_Foldrajzi_felfedezesek",
        "oldalak": "PDF 31–35. oldal",
        "elso_oldal": 31
      },
      {
        "cim": "Korai kapitalizmus",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/05_Korai_kapitalizmus/05_Korai_kapitalizmus.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-05_Korai_kapitalizmus",
        "oldalak": "PDF 36–38. oldal",
        "elso_oldal": 36
      },
      {
        "cim": "Vallasi megujulas",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/06_Vallasi_megujulas/06_Vallasi_megujulas.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-06_Vallasi_megujulas",
        "oldalak": "PDF 39–47. oldal",
        "elso_oldal": 39
      },
      {
        "cim": "Uj vilagkep",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/07_Uj_vilagkep/07_Uj_vilagkep.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-07_Uj_vilagkep",
        "oldalak": "PDF 48–56. oldal",
        "elso_oldal": 48
      },
      {
        "cim": "A torok haboruk hosei",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/08_A_torok_haboruk_hosei/08_A_torok_haboruk_hosei.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-08_A_torok_haboruk_hosei",
        "oldalak": "PDF 57–64. oldal",
        "elso_oldal": 57
      },
      {
        "cim": "Bocskai Bethlen Zrinyi",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/09_Bocskai_Bethlen_Zrinyi/09_Bocskai_Bethlen_Zrinyi.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-09_Bocskai_Bethlen_Zrinyi",
        "oldalak": "PDF 65–73. oldal",
        "elso_oldal": 65
      },
      {
        "cim": "II Rakoczi Ferenc",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/10_II_Rakoczi_Ferenc/10_II_Rakoczi_Ferenc.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-10_II_Rakoczi_Ferenc",
        "oldalak": "PDF 74–80. oldal",
        "elso_oldal": 74
      },
      {
        "cim": "Maria Terezia",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/11_Maria_Terezia/11_Maria_Terezia.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-11_Maria_Terezia",
        "oldalak": "PDF 81–88. oldal",
        "elso_oldal": 81
      },
      {
        "cim": "Elet a torok hodoltsag koraban",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/12_Elet_a_torok_hodoltsag_koraban/12_Elet_a_torok_hodoltsag_koraban.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-12_Elet_a_torok_hodoltsag_koraban",
        "oldalak": "PDF 89–95. oldal",
        "elso_oldal": 89
      },
      {
        "cim": "Elet a XVIII szazadban",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/13_Elet_a_XVIII_szazadban/13_Elet_a_XVIII_szazadban.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-13_Elet_a_XVIII_szazadban",
        "oldalak": "PDF 96–100. oldal",
        "elso_oldal": 96
      },
      {
        "cim": "Ipari forradalom",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/14_Ipari_forradalom/14_Ipari_forradalom.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-14_Ipari_forradalom",
        "oldalak": "PDF 101–109. oldal",
        "elso_oldal": 101
      },
      {
        "cim": "Tarsadalmi politikai forradalom",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/15_Tarsadalmi_politikai_forradalom/15_Tarsadalmi_politikai_forradalom.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-15_Tarsadalmi_politikai_forradalom",
        "oldalak": "PDF 110–118. oldal",
        "elso_oldal": 110
      },
      {
        "cim": "A reformkor",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/16_A_reformkor/16_A_reformkor.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-16_A_reformkor",
        "oldalak": "PDF 119–132. oldal",
        "elso_oldal": 119
      },
      {
        "cim": "A forradalom",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/17_A_forradalom/17_A_forradalom.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-17_A_forradalom",
        "oldalak": "PDF 133–141. oldal",
        "elso_oldal": 133
      },
      {
        "cim": "A szabadsagharc",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/18_A_szabadsagharc/18_A_szabadsagharc.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-18_A_szabadsagharc",
        "oldalak": "PDF 142–153. oldal",
        "elso_oldal": 142
      },
      {
        "cim": "A kiegyezes",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/19_A_kiegyezes/19_A_kiegyezes.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-19_A_kiegyezes",
        "oldalak": "PDF 154–161. oldal",
        "elso_oldal": 154
      },
      {
        "cim": "Kislexikon es forrasok",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/20_Kislexikon_es_forrasok/20_Kislexikon_es_forrasok.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/okostankonyv.html#feladat-20_Kislexikon_es_forrasok",
        "oldalak": "PDF 162–169. oldal",
        "elso_oldal": 162
      }
    ]
  },
  {
    "id": "07_Enek_OH-ENZ06TA",
    "cim": "Ének-zene",
    "tantargy": "Ének-zene",
    "evfolyam": "6. osztály",
    "ikon": "🎵",
    "szin": "#2f9e44",
    "okostankonyv": "6.osztaly/07_Enek_OH-ENZ06TA/okostankonyv.html",
    "fejezetek": [
      {
        "cim": "A nepzene vilaga",
        "pdf": "6.osztaly/07_Enek_OH-ENZ06TA/01_A_nepzene_vilaga/01_A_nepzene_vilaga.pdf",
        "feladat": "6.osztaly/07_Enek_OH-ENZ06TA/okostankonyv.html#feladat-01_A_nepzene_vilaga",
        "oldalak": "PDF 6–59. oldal",
        "elso_oldal": 6
      },
      {
        "cim": "Barangolas a zenetortenetben",
        "pdf": "6.osztaly/07_Enek_OH-ENZ06TA/02_Barangolas_a_zenetortenetben/02_Barangolas_a_zenetortenetben.pdf",
        "feladat": "6.osztaly/07_Enek_OH-ENZ06TA/okostankonyv.html#feladat-02_Barangolas_a_zenetortenetben",
        "oldalak": "PDF 60–93. oldal",
        "elso_oldal": 60
      }
    ]
  },
  {
    "id": "08_Hittan_romai_katolikus_A_sziklara_epult_egyhaz",
    "cim": "A sziklára épült egyház (Szent István Társulat)",
    "tantargy": "Hittan",
    "evfolyam": "6. osztály",
    "ikon": "✝️",
    "szin": "#5f3dc4",
    "fejezetek": [
      {
        "cim": "Gyakorló feladatok",
        "pdf": null,
        "feladat": "6.osztaly/08_Hittan_romai_katolikus_A_sziklara_epult_egyhaz/feladatok.html"
      }
    ]
  },
  {
    "id": "09_Hittan_reformatus_Isten_vilagossagaban",
    "cim": "Isten világosságában (RPI)",
    "tantargy": "Hittan",
    "evfolyam": "6. osztály",
    "ikon": "✝️",
    "szin": "#364fc7",
    "fejezetek": [
      {
        "cim": "Gyakorló feladatok",
        "pdf": null,
        "feladat": "6.osztaly/09_Hittan_reformatus_Isten_vilagossagaban/feladatok.html"
      }
    ]
  },
  {
    "id": "10_Hittan_gorog_katolikus_Velunk_az_Isten",
    "cim": "Velünk az Isten! (Dr. Obbágy László)",
    "tantargy": "Hittan",
    "evfolyam": "6. osztály",
    "ikon": "✝️",
    "szin": "#862e9c",
    "fejezetek": [
      {
        "cim": "Gyakorló feladatok",
        "pdf": null,
        "feladat": "6.osztaly/10_Hittan_gorog_katolikus_Velunk_az_Isten/feladatok.html"
      }
    ]
  },
  {
    "id": "11_Termeszettudomany_OH-TER06TB",
    "cim": "Természettudomány",
    "tantargy": "Természettudomány",
    "evfolyam": "6. osztály",
    "ikon": "🔬",
    "szin": "#2b8a3e",
    "okostankonyv": "6.osztaly/11_Termeszettudomany_OH-TER06TB/okostankonyv.html",
    "csoportok": {
      "Az erdő életközössége": {
        "feladat": "6.osztaly/11_Termeszettudomany_OH-TER06TB/okostankonyv.html#feladat-01_Az_erdo_eletkozossege"
      },
      "Kölcsönhatások. Az energia": {
        "feladat": "6.osztaly/11_Termeszettudomany_OH-TER06TB/okostankonyv.html#feladat-02_Kolcsonhatasok_Az_energia"
      },
      "A Föld bolygó": {
        "feladat": "6.osztaly/11_Termeszettudomany_OH-TER06TB/okostankonyv.html#feladat-03_A_Fold_bolygo"
      },
      "A természet erői": {
        "feladat": "6.osztaly/11_Termeszettudomany_OH-TER06TB/okostankonyv.html#feladat-04_A_termeszet_eroi"
      },
      "Az őshonos füves területek és a mezők életközössége": {
        "feladat": "6.osztaly/11_Termeszettudomany_OH-TER06TB/okostankonyv.html#feladat-05_Az_oshonos_fuves_teruletek_es_a_mezok_el"
      },
      "Vizek, vízpartok életközössége": {
        "feladat": "6.osztaly/11_Termeszettudomany_OH-TER06TB/okostankonyv.html#feladat-06_Vizek_vizpartok_eletkozossege"
      }
    },
    "animaciok": true,
    "fejezetek": [
      {
        "cim": "Előszó, a tankönyv jelölései",
        "csoport": "Bevezető",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/00_Bevezeto/Eloszo_a_tankonyv_jelolesei/Eloszo_a_tankonyv_jelolesei.pdf",
        "feladat": null,
        "oldalak": "PDF 1–6. oldal",
        "elso_oldal": 1
      },
      {
        "cim": "Erdőt alkotó fáink: a tölgy és a bükk",
        "csoport": "Az erdő életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/01_Az_erdo_eletkozossege/01_Erdot_alkoto_faink_a_tolgy_es_a_bukk/01_Erdot_alkoto_faink_a_tolgy_es_a_bukk.pdf",
        "feladat": null,
        "oldalak": "PDF 7–10. oldal",
        "elso_oldal": 7
      },
      {
        "cim": "Az erdeifenyő. Gombák az erdőben",
        "csoport": "Az erdő életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/01_Az_erdo_eletkozossege/02_Az_erdeifenyo_Gombak_az_erdoben/02_Az_erdeifenyo_Gombak_az_erdoben.pdf",
        "feladat": null,
        "oldalak": "PDF 11–13. oldal",
        "elso_oldal": 11
      },
      {
        "cim": "A cserjék és a gyepszint virágos növényei",
        "csoport": "Az erdő életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/01_Az_erdo_eletkozossege/03_A_cserjek_es_a_gyepszint_viragos_novenyei/03_A_cserjek_es_a_gyepszint_viragos_novenyei.pdf",
        "feladat": null,
        "oldalak": "PDF 14–16. oldal",
        "elso_oldal": 14
      },
      {
        "cim": "Virágtalan növények az erdőben",
        "csoport": "Az erdő életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/01_Az_erdo_eletkozossege/04_Viragtalan_novenyek_az_erdoben/04_Viragtalan_novenyek_az_erdoben.pdf",
        "feladat": null,
        "oldalak": "PDF 17–19. oldal",
        "elso_oldal": 17
      },
      {
        "cim": "A gímszarvas, az őz és a vaddisznó",
        "csoport": "Az erdő életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/01_Az_erdo_eletkozossege/05_A_gimszarvas_az_oz_es_a_vaddiszno/05_A_gimszarvas_az_oz_es_a_vaddiszno.pdf",
        "feladat": null,
        "oldalak": "PDF 20–22. oldal",
        "elso_oldal": 20
      },
      {
        "cim": "A róka, a sün és a mókus",
        "csoport": "Az erdő életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/01_Az_erdo_eletkozossege/06_A_roka_a_sun_es_a_mokus/06_A_roka_a_sun_es_a_mokus.pdf",
        "feladat": null,
        "oldalak": "PDF 23–25. oldal",
        "elso_oldal": 23
      },
      {
        "cim": "Harkályok és énekesmadarak az erdőben",
        "csoport": "Az erdő életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/01_Az_erdo_eletkozossege/07_Harkalyok_es_enekesmadarak_az_erdoben/07_Harkalyok_es_enekesmadarak_az_erdoben.pdf",
        "feladat": null,
        "oldalak": "PDF 26–28. oldal",
        "elso_oldal": 26
      },
      {
        "cim": "Ragadozó madarak az erdőben",
        "csoport": "Az erdő életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/01_Az_erdo_eletkozossege/08_Ragadozo_madarak_az_erdoben/08_Ragadozo_madarak_az_erdoben.pdf",
        "feladat": null,
        "oldalak": "PDF 29–31. oldal",
        "elso_oldal": 29
      },
      {
        "cim": "Ízeltlábúak az erdőben",
        "csoport": "Az erdő életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/01_Az_erdo_eletkozossege/09_Izeltlabuak_az_erdoben/09_Izeltlabuak_az_erdoben.pdf",
        "feladat": null,
        "oldalak": "PDF 32–34. oldal",
        "elso_oldal": 32
      },
      {
        "cim": "Az erdő életközössége",
        "csoport": "Az erdő életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/01_Az_erdo_eletkozossege/10_Az_erdo_eletkozossege/10_Az_erdo_eletkozossege.pdf",
        "feladat": null,
        "oldalak": "PDF 35–37. oldal",
        "elso_oldal": 35
      },
      {
        "cim": "Az erdők védelme",
        "csoport": "Az erdő életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/01_Az_erdo_eletkozossege/11_Az_erdok_vedelme/11_Az_erdok_vedelme.pdf",
        "feladat": null,
        "oldalak": "PDF 38–39. oldal",
        "elso_oldal": 38
      },
      {
        "cim": "Megfigyelések, vizsgálatok az erdőben",
        "csoport": "Az erdő életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/01_Az_erdo_eletkozossege/12_Megfigyelesek_vizsgalatok_az_erdoben/12_Megfigyelesek_vizsgalatok_az_erdoben.pdf",
        "feladat": null,
        "oldalak": "PDF 40–41. oldal",
        "elso_oldal": 40
      },
      {
        "cim": "Herman Ottó munkássága",
        "csoport": "Az erdő életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/01_Az_erdo_eletkozossege/13_Herman_Otto_munkassaga/13_Herman_Otto_munkassaga.pdf",
        "feladat": null,
        "oldalak": "PDF 42–43. oldal",
        "elso_oldal": 42
      },
      {
        "cim": "Rendszerezzük ismereteinket!",
        "csoport": "Az erdő életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/01_Az_erdo_eletkozossege/14_Rendszerezzuk_ismereteinket/14_Rendszerezzuk_ismereteinket.pdf",
        "feladat": null,
        "oldalak": "PDF 44–46. oldal",
        "elso_oldal": 44
      },
      {
        "cim": "A mechanikai kölcsönhatás",
        "csoport": "Kölcsönhatások. Az energia",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/02_Kolcsonhatasok_Az_energia/01_A_mechanikai_kolcsonhatas/01_A_mechanikai_kolcsonhatas.pdf",
        "feladat": null,
        "oldalak": "PDF 47–50. oldal",
        "elso_oldal": 47
      },
      {
        "cim": "A termikus kölcsönhatás",
        "csoport": "Kölcsönhatások. Az energia",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/02_Kolcsonhatasok_Az_energia/02_A_termikus_kolcsonhatas/02_A_termikus_kolcsonhatas.pdf",
        "feladat": null,
        "oldalak": "PDF 51–52. oldal",
        "elso_oldal": 51
      },
      {
        "cim": "Kísérletek, megfigyelések (1)",
        "csoport": "Kölcsönhatások. Az energia",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/02_Kolcsonhatasok_Az_energia/03_Kiserletek_megfigyelesek_1/03_Kiserletek_megfigyelesek_1.pdf",
        "feladat": null,
        "oldalak": "PDF 53–54. oldal",
        "elso_oldal": 53
      },
      {
        "cim": "Az elektromos és a mágneses kölcsönhatás",
        "csoport": "Kölcsönhatások. Az energia",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/02_Kolcsonhatasok_Az_energia/04_Az_elektromos_es_a_magneses_kolcsonhatas/04_Az_elektromos_es_a_magneses_kolcsonhatas.pdf",
        "feladat": null,
        "oldalak": "PDF 55–57. oldal",
        "elso_oldal": 55
      },
      {
        "cim": "Kísérletek, megfigyelések (2)",
        "csoport": "Kölcsönhatások. Az energia",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/02_Kolcsonhatasok_Az_energia/05_Kiserletek_megfigyelesek_2/05_Kiserletek_megfigyelesek_2.pdf",
        "feladat": null,
        "oldalak": "PDF 58–60. oldal",
        "elso_oldal": 58
      },
      {
        "cim": "Az energia I.",
        "csoport": "Kölcsönhatások. Az energia",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/02_Kolcsonhatasok_Az_energia/06_Az_energia_I/06_Az_energia_I.pdf",
        "feladat": null,
        "oldalak": "PDF 61–63. oldal",
        "elso_oldal": 61
      },
      {
        "cim": "Az energia II.",
        "csoport": "Kölcsönhatások. Az energia",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/02_Kolcsonhatasok_Az_energia/07_Az_energia_II/07_Az_energia_II.pdf",
        "feladat": null,
        "oldalak": "PDF 64–66. oldal",
        "elso_oldal": 64
      },
      {
        "cim": "A Nap és a napenergia",
        "csoport": "Kölcsönhatások. Az energia",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/02_Kolcsonhatasok_Az_energia/08_A_Nap_es_a_napenergia/08_A_Nap_es_a_napenergia.pdf",
        "feladat": null,
        "oldalak": "PDF 67–69. oldal",
        "elso_oldal": 67
      },
      {
        "cim": "Energiafelhasználás, energiatakarékosság",
        "csoport": "Kölcsönhatások. Az energia",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/02_Kolcsonhatasok_Az_energia/09_Energiafelhasznalas_energiatakarekossag/09_Energiafelhasznalas_energiatakarekossag.pdf",
        "feladat": null,
        "oldalak": "PDF 70–72. oldal",
        "elso_oldal": 70
      },
      {
        "cim": "Kísérletek, megfigyelések (3)",
        "csoport": "Kölcsönhatások. Az energia",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/02_Kolcsonhatasok_Az_energia/10_Kiserletek_megfigyelesek_3/10_Kiserletek_megfigyelesek_3.pdf",
        "feladat": null,
        "oldalak": "PDF 73–74. oldal",
        "elso_oldal": 73
      },
      {
        "cim": "Rendszerezzük ismereteinket!",
        "csoport": "Kölcsönhatások. Az energia",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/02_Kolcsonhatasok_Az_energia/11_Rendszerezzuk_ismereteinket/11_Rendszerezzuk_ismereteinket.pdf",
        "feladat": null,
        "oldalak": "PDF 75–76. oldal",
        "elso_oldal": 75
      },
      {
        "cim": "Együtt a Naprendszerben",
        "csoport": "A Föld bolygó",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/03_A_Fold_bolygo/01_Egyutt_a_Naprendszerben/01_Egyutt_a_Naprendszerben.pdf",
        "feladat": null,
        "oldalak": "PDF 77–80. oldal",
        "elso_oldal": 77
      },
      {
        "cim": "Tájékozódás a gömb alakú Földön",
        "csoport": "A Föld bolygó",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/03_A_Fold_bolygo/02_Tajekozodas_a_gomb_alaku_Foldon/02_Tajekozodas_a_gomb_alaku_Foldon.pdf",
        "feladat": null,
        "oldalak": "PDF 81–83. oldal",
        "elso_oldal": 81
      },
      {
        "cim": "A Föld forgása",
        "csoport": "A Föld bolygó",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/03_A_Fold_bolygo/03_A_Fold_forgasa/03_A_Fold_forgasa.pdf",
        "feladat": null,
        "oldalak": "PDF 84–87. oldal",
        "elso_oldal": 84
      },
      {
        "cim": "A Föld keringése a Nap körül",
        "csoport": "A Föld bolygó",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/03_A_Fold_bolygo/04_A_Fold_keringese_a_Nap_korul/04_A_Fold_keringese_a_Nap_korul.pdf",
        "feladat": null,
        "oldalak": "PDF 88–90. oldal",
        "elso_oldal": 88
      },
      {
        "cim": "Az éghajlati övezetek",
        "csoport": "A Föld bolygó",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/03_A_Fold_bolygo/05_Az_eghajlati_ovezetek/05_Az_eghajlati_ovezetek.pdf",
        "feladat": null,
        "oldalak": "PDF 91–93. oldal",
        "elso_oldal": 91
      },
      {
        "cim": "A Föld éghajlatát alakító tényezők",
        "csoport": "A Föld bolygó",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/03_A_Fold_bolygo/06_A_Fold_eghajlatat_alakito_tenyezok/06_A_Fold_eghajlatat_alakito_tenyezok.pdf",
        "feladat": null,
        "oldalak": "PDF 94–96. oldal",
        "elso_oldal": 94
      },
      {
        "cim": "Európa és Magyarország földrajzi helyzete",
        "csoport": "A Föld bolygó",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/03_A_Fold_bolygo/07_Europa_es_Magyarorszag_foldrajzi_helyzete/07_Europa_es_Magyarorszag_foldrajzi_helyzete.pdf",
        "feladat": null,
        "oldalak": "PDF 97–99. oldal",
        "elso_oldal": 97
      },
      {
        "cim": "A levegő védelme, az emberiség védelme",
        "csoport": "A Föld bolygó",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/03_A_Fold_bolygo/08_A_levego_vedelme_az_emberiseg_vedelme/08_A_levego_vedelme_az_emberiseg_vedelme.pdf",
        "feladat": null,
        "oldalak": "PDF 100–101. oldal",
        "elso_oldal": 100
      },
      {
        "cim": "Megfigyelések, feladatok",
        "csoport": "A Föld bolygó",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/03_A_Fold_bolygo/09_Megfigyelesek_feladatok/09_Megfigyelesek_feladatok.pdf",
        "feladat": null,
        "oldalak": "PDF 102–104. oldal",
        "elso_oldal": 102
      },
      {
        "cim": "Rendszerezzük ismereteinket!",
        "csoport": "A Föld bolygó",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/03_A_Fold_bolygo/10_Rendszerezzuk_ismereteinket/10_Rendszerezzuk_ismereteinket.pdf",
        "feladat": null,
        "oldalak": "PDF 105–106. oldal",
        "elso_oldal": 105
      },
      {
        "cim": "A vulkánok és a földrengések",
        "csoport": "A természet erői",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/04_A_termeszet_eroi/01_A_vulkanok_es_a_foldrengesek/01_A_vulkanok_es_a_foldrengesek.pdf",
        "feladat": null,
        "oldalak": "PDF 107–110. oldal",
        "elso_oldal": 107
      },
      {
        "cim": "Hogyan keletkeztek a hegységek?",
        "csoport": "A természet erői",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/04_A_termeszet_eroi/02_Hogyan_keletkeztek_a_hegysegek/02_Hogyan_keletkeztek_a_hegysegek.pdf",
        "feladat": null,
        "oldalak": "PDF 111–113. oldal",
        "elso_oldal": 111
      },
      {
        "cim": "A külső erők felszínformáló munkája",
        "csoport": "A természet erői",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/04_A_termeszet_eroi/03_A_kulso_erok_felszinformalo_munkaja/03_A_kulso_erok_felszinformalo_munkaja.pdf",
        "feladat": null,
        "oldalak": "PDF 114–116. oldal",
        "elso_oldal": 114
      },
      {
        "cim": "A kőzetek és a felszín formakincse",
        "csoport": "A természet erői",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/04_A_termeszet_eroi/04_A_kozetek_es_a_felszin_formakincse/04_A_kozetek_es_a_felszin_formakincse.pdf",
        "feladat": null,
        "oldalak": "PDF 117–119. oldal",
        "elso_oldal": 117
      },
      {
        "cim": "A lánchegységek és a röghegységek formakincse",
        "csoport": "A természet erői",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/04_A_termeszet_eroi/05_A_lanchegysegek_es_a_roghegysegek_formakincse/05_A_lanchegysegek_es_a_roghegysegek_formakincse.pdf",
        "feladat": null,
        "oldalak": "PDF 120–122. oldal",
        "elso_oldal": 120
      },
      {
        "cim": "Hogyan alakultak ki alföldjeink?",
        "csoport": "A természet erői",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/04_A_termeszet_eroi/06_Hogyan_alakultak_ki_alfoldjeink/06_Hogyan_alakultak_ki_alfoldjeink.pdf",
        "feladat": null,
        "oldalak": "PDF 123–125. oldal",
        "elso_oldal": 123
      },
      {
        "cim": "Legértékesebb természeti erőforrásunk: a talaj",
        "csoport": "A természet erői",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/04_A_termeszet_eroi/07_Legertekesebb_termeszeti_eroforrasunk_a_talaj/07_Legertekesebb_termeszeti_eroforrasunk_a_talaj.pdf",
        "feladat": null,
        "oldalak": "PDF 126–128. oldal",
        "elso_oldal": 126
      },
      {
        "cim": "Hogyan alakítja át az ember a környezetét?",
        "csoport": "A természet erői",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/04_A_termeszet_eroi/08_Hogyan_alakitja_at_az_ember_a_kornyezetet/08_Hogyan_alakitja_at_az_ember_a_kornyezetet.pdf",
        "feladat": null,
        "oldalak": "PDF 129–130. oldal",
        "elso_oldal": 129
      },
      {
        "cim": "Időszámítás a Föld és az emberiség történetében",
        "csoport": "A természet erői",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/04_A_termeszet_eroi/09_Idoszamitas_a_Fold_es_az_emberiseg_torteneteb/09_Idoszamitas_a_Fold_es_az_emberiseg_torteneteb.pdf",
        "feladat": null,
        "oldalak": "PDF 131–132. oldal",
        "elso_oldal": 131
      },
      {
        "cim": "Megfigyelések, vizsgálódások",
        "csoport": "A természet erői",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/04_A_termeszet_eroi/10_Megfigyelesek_vizsgalodasok/10_Megfigyelesek_vizsgalodasok.pdf",
        "feladat": null,
        "oldalak": "PDF 133–134. oldal",
        "elso_oldal": 133
      },
      {
        "cim": "Rendszerezzük ismereteinket!",
        "csoport": "A természet erői",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/04_A_termeszet_eroi/11_Rendszerezzuk_ismereteinket/11_Rendszerezzuk_ismereteinket.pdf",
        "feladat": null,
        "oldalak": "PDF 135–136. oldal",
        "elso_oldal": 135
      },
      {
        "cim": "Az őshonos füves puszták kialakulása, növényei",
        "csoport": "Az őshonos füves területek és a mezők életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/05_Az_oshonos_fuves_teruletek_es_a_mezok_el/01_Az_oshonos_fuves_pusztak_kialakulasa_novenyei/01_Az_oshonos_fuves_pusztak_kialakulasa_novenyei.pdf",
        "feladat": null,
        "oldalak": "PDF 137–140. oldal",
        "elso_oldal": 137
      },
      {
        "cim": "Ízeltlábúak a füves területeken",
        "csoport": "Az őshonos füves területek és a mezők életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/05_Az_oshonos_fuves_teruletek_es_a_mezok_el/02_Izeltlabuak_a_fuves_teruleteken/02_Izeltlabuak_a_fuves_teruleteken.pdf",
        "feladat": null,
        "oldalak": "PDF 141–143. oldal",
        "elso_oldal": 141
      },
      {
        "cim": "A fürge gyík és a vakond",
        "csoport": "Az őshonos füves területek és a mezők életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/05_Az_oshonos_fuves_teruletek_es_a_mezok_el/03_A_furge_gyik_es_a_vakond/03_A_furge_gyik_es_a_vakond.pdf",
        "feladat": null,
        "oldalak": "PDF 144–145. oldal",
        "elso_oldal": 144
      },
      {
        "cim": "A mezei nyúl és a füves területek rágcsáló kisemlősei",
        "csoport": "Az őshonos füves területek és a mezők életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/05_Az_oshonos_fuves_teruletek_es_a_mezok_el/04_A_mezei_nyul_es_a_fuves_teruletek_ragcsalo_ki/04_A_mezei_nyul_es_a_fuves_teruletek_ragcsalo_ki.pdf",
        "feladat": null,
        "oldalak": "PDF 146–148. oldal",
        "elso_oldal": 146
      },
      {
        "cim": "A fácán és a füves területek ragadozó madarai",
        "csoport": "Az őshonos füves területek és a mezők életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/05_Az_oshonos_fuves_teruletek_es_a_mezok_el/05_A_facan_es_a_fuves_teruletek_ragadozo_madarai/05_A_facan_es_a_fuves_teruletek_ragadozo_madarai.pdf",
        "feladat": null,
        "oldalak": "PDF 149–151. oldal",
        "elso_oldal": 149
      },
      {
        "cim": "Termesztett növényeink: a búza és a kukorica",
        "csoport": "Az őshonos füves területek és a mezők életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/05_Az_oshonos_fuves_teruletek_es_a_mezok_el/06_Termesztett_novenyeink_a_buza_es_a_kukorica/06_Termesztett_novenyeink_a_buza_es_a_kukorica.pdf",
        "feladat": null,
        "oldalak": "PDF 152–154. oldal",
        "elso_oldal": 152
      },
      {
        "cim": "Termesztett növényeink: a napraforgó, a repce és a lucerna",
        "csoport": "Az őshonos füves területek és a mezők életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/05_Az_oshonos_fuves_teruletek_es_a_mezok_el/07_Termesztett_novenyeink_a_napraforgo_a_repce_e/07_Termesztett_novenyeink_a_napraforgo_a_repce_e.pdf",
        "feladat": null,
        "oldalak": "PDF 155–157. oldal",
        "elso_oldal": 155
      },
      {
        "cim": "Megfigyelések, vizsgálatok a füves területeken",
        "csoport": "Az őshonos füves területek és a mezők életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/05_Az_oshonos_fuves_teruletek_es_a_mezok_el/08_Megfigyelesek_vizsgalatok_a_fuves_teruleteken/08_Megfigyelesek_vizsgalatok_a_fuves_teruleteken.pdf",
        "feladat": null,
        "oldalak": "PDF 158–158. oldal",
        "elso_oldal": 158
      },
      {
        "cim": "Rendszerezzük ismereteinket!",
        "csoport": "Az őshonos füves területek és a mezők életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/05_Az_oshonos_fuves_teruletek_es_a_mezok_el/09_Rendszerezzuk_ismereteinket/09_Rendszerezzuk_ismereteinket.pdf",
        "feladat": null,
        "oldalak": "PDF 159–160. oldal",
        "elso_oldal": 159
      },
      {
        "cim": "A víz jelentősége. A vizek parányi élőlényei",
        "csoport": "Vizek, vízpartok életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/06_Vizek_vizpartok_eletkozossege/01_A_viz_jelentosege_A_vizek_paranyi_elolenyei/01_A_viz_jelentosege_A_vizek_paranyi_elolenyei.pdf",
        "feladat": null,
        "oldalak": "PDF 161–164. oldal",
        "elso_oldal": 161
      },
      {
        "cim": "Lágyszárúak a vízben és a vízparton",
        "csoport": "Vizek, vízpartok életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/06_Vizek_vizpartok_eletkozossege/02_Lagyszaruak_a_vizben_es_a_vizparton/02_Lagyszaruak_a_vizben_es_a_vizparton.pdf",
        "feladat": null,
        "oldalak": "PDF 165–167. oldal",
        "elso_oldal": 165
      },
      {
        "cim": "A ligeterdők és a vízparti fák",
        "csoport": "Vizek, vízpartok életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/06_Vizek_vizpartok_eletkozossege/03_A_ligeterdok_es_a_vizparti_fak/03_A_ligeterdok_es_a_vizparti_fak.pdf",
        "feladat": null,
        "oldalak": "PDF 168–170. oldal",
        "elso_oldal": 168
      },
      {
        "cim": "Az orvosi pióca. Csigák és kagylók a vízben",
        "csoport": "Vizek, vízpartok életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/06_Vizek_vizpartok_eletkozossege/04_Az_orvosi_pioca_Csigak_es_kagylok_a_vizben/04_Az_orvosi_pioca_Csigak_es_kagylok_a_vizben.pdf",
        "feladat": null,
        "oldalak": "PDF 171–173. oldal",
        "elso_oldal": 171
      },
      {
        "cim": "Ízeltlábúak a vízben és a vízparton",
        "csoport": "Vizek, vízpartok életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/06_Vizek_vizpartok_eletkozossege/05_Izeltlabuak_a_vizben_es_a_vizparton/05_Izeltlabuak_a_vizben_es_a_vizparton.pdf",
        "feladat": null,
        "oldalak": "PDF 174–176. oldal",
        "elso_oldal": 174
      },
      {
        "cim": "A hazai vizekben élő halak",
        "csoport": "Vizek, vízpartok életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/06_Vizek_vizpartok_eletkozossege/06_A_hazai_vizekben_elo_halak/06_A_hazai_vizekben_elo_halak.pdf",
        "feladat": null,
        "oldalak": "PDF 177–179. oldal",
        "elso_oldal": 177
      },
      {
        "cim": "Békák a vízben és a vízparton",
        "csoport": "Vizek, vízpartok életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/06_Vizek_vizpartok_eletkozossege/07_Bekak_a_vizben_es_a_vizparton/07_Bekak_a_vizben_es_a_vizparton.pdf",
        "feladat": null,
        "oldalak": "PDF 180–182. oldal",
        "elso_oldal": 180
      },
      {
        "cim": "A vízisikló és a mocsári teknős",
        "csoport": "Vizek, vízpartok életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/06_Vizek_vizpartok_eletkozossege/08_A_vizisiklo_es_a_mocsari_teknos/08_A_vizisiklo_es_a_mocsari_teknos.pdf",
        "feladat": null,
        "oldalak": "PDF 183–185. oldal",
        "elso_oldal": 183
      },
      {
        "cim": "A vizek, vízpartok madarai",
        "csoport": "Vizek, vízpartok életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/06_Vizek_vizpartok_eletkozossege/09_A_vizek_vizpartok_madarai/09_A_vizek_vizpartok_madarai.pdf",
        "feladat": null,
        "oldalak": "PDF 186–188. oldal",
        "elso_oldal": 186
      },
      {
        "cim": "A vizek, vízpartok életközössége",
        "csoport": "Vizek, vízpartok életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/06_Vizek_vizpartok_eletkozossege/10_A_vizek_vizpartok_eletkozossege/10_A_vizek_vizpartok_eletkozossege.pdf",
        "feladat": null,
        "oldalak": "PDF 189–191. oldal",
        "elso_oldal": 189
      },
      {
        "cim": "A vizek szennyezése. A vizes élőhelyek védelme",
        "csoport": "Vizek, vízpartok életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/06_Vizek_vizpartok_eletkozossege/11_A_vizek_szennyezese_A_vizes_elohelyek_vedelme/11_A_vizek_szennyezese_A_vizes_elohelyek_vedelme.pdf",
        "feladat": null,
        "oldalak": "PDF 192–194. oldal",
        "elso_oldal": 192
      },
      {
        "cim": "Megfigyelések, vizsgálatok a vizes élőhelyeken",
        "csoport": "Vizek, vízpartok életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/06_Vizek_vizpartok_eletkozossege/12_Megfigyelesek_vizsgalatok_a_vizes_elohelyeken/12_Megfigyelesek_vizsgalatok_a_vizes_elohelyeken.pdf",
        "feladat": null,
        "oldalak": "PDF 195–196. oldal",
        "elso_oldal": 195
      },
      {
        "cim": "Rendszerezzük ismereteinket!",
        "csoport": "Vizek, vízpartok életközössége",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/06_Vizek_vizpartok_eletkozossege/13_Rendszerezzuk_ismereteinket/13_Rendszerezzuk_ismereteinket.pdf",
        "feladat": null,
        "oldalak": "PDF 197–200. oldal",
        "elso_oldal": 197
      },
      {
        "cim": "Fogalomtár",
        "csoport": "Függelék",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/07_Fuggelek/Fogalomtar/Fogalomtar.pdf",
        "feladat": null,
        "oldalak": "PDF 201–212. oldal",
        "elso_oldal": 201
      },
      {
        "cim": "Tartalom és képjegyzék",
        "csoport": "Függelék",
        "pdf": "6.osztaly/11_Termeszettudomany_OH-TER06TB/07_Fuggelek/Tartalom_es_kepjegyzek/Tartalom_es_kepjegyzek.pdf",
        "feladat": null,
        "oldalak": "PDF 213–218. oldal",
        "elso_oldal": 213
      }
    ]
  }
];
