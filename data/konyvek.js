/* ==========================================================
   MOT – tankönyvek és fejezetek
   Új tankönyv / fejezet: másolj egy meglévő blokkot és írd át.
   - id:       egyedi azonosító (a konyv.html?id=... használja)
   - tantargy / evfolyam: ezekre szűr a Kezdőlap
   - fejezetek[].pdf:     a tananyag PDF útvonala (vagy null)
   - fejezetek[].feladat: a feladatok.html útvonala
   ========================================================== */
const MOT_KONYVEK = [
  {
    "id": "01_Magyar_nyelv_OH-MNY06TB",
    "cim": "Magyar nyelv",
    "tantargy": "Magyar nyelv",
    "evfolyam": "6. osztály",
    "ikon": "📝",
    "szin": "#d6336c",
    "fejezetek": [
      {
        "cim": "Tanuljunk tanulni",
        "pdf": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/01_Tanuljunk_tanulni/01_Tanuljunk_tanulni.pdf",
        "feladat": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/01_Tanuljunk_tanulni/feladatok.html",
        "oldalak": "PDF 9–15. oldal"
      },
      {
        "cim": "A kommunikáció világa",
        "pdf": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/02_A_kommunikacio_vilaga/02_A_kommunikacio_vilaga.pdf",
        "feladat": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/02_A_kommunikacio_vilaga/feladatok.html",
        "oldalak": "PDF 16–39. oldal"
      },
      {
        "cim": "Szófajok I az ige",
        "pdf": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/03_Szofajok_I_az_ige/03_Szofajok_I_az_ige.pdf",
        "feladat": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/03_Szofajok_I_az_ige/feladatok.html",
        "oldalak": "PDF 40–57. oldal"
      },
      {
        "cim": "Szófajok II névszók határozószó",
        "pdf": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/04_Szofajok_II_nevszok_hatarozoszo/04_Szofajok_II_nevszok_hatarozoszo.pdf",
        "feladat": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/04_Szofajok_II_nevszok_hatarozoszo/feladatok.html",
        "oldalak": "PDF 58–99. oldal"
      },
      {
        "cim": "Szófajok III névmások igenevek",
        "pdf": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/05_Szofajok_III_nevmasok_igenevek/05_Szofajok_III_nevmasok_igenevek.pdf",
        "feladat": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/05_Szofajok_III_nevmasok_igenevek/feladatok.html",
        "oldalak": "PDF 100–123. oldal"
      },
      {
        "cim": "Szófajok IV viszonyszók mondatszók",
        "pdf": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/06_Szofajok_IV_viszonyszok_mondatszok/06_Szofajok_IV_viszonyszok_mondatszok.pdf",
        "feladat": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/06_Szofajok_IV_viszonyszok_mondatszok/feladatok.html",
        "oldalak": "PDF 124–139. oldal"
      },
      {
        "cim": "Szófajok V szófaji rendszer",
        "pdf": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/07_Szofajok_V_szofaji_rendszer/07_Szofajok_V_szofaji_rendszer.pdf",
        "feladat": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/07_Szofajok_V_szofaji_rendszer/feladatok.html",
        "oldalak": "PDF 140–147. oldal"
      },
      {
        "cim": "Fogalomtár",
        "pdf": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/08_Fogalomtar/08_Fogalomtar.pdf",
        "feladat": "6.osztaly/01_Magyar_nyelv_OH-MNY06TB/08_Fogalomtar/feladatok.html",
        "oldalak": "PDF 148–153. oldal"
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
    "fejezetek": [
      {
        "cim": "Hősok",
        "pdf": "6.osztaly/02_Irodalom_OH-MIR06TB/01_Hosok/01_Hosok.pdf",
        "feladat": "6.osztaly/02_Irodalom_OH-MIR06TB/01_Hosok/feladatok.html",
        "oldalak": "PDF 2–79. oldal"
      },
      {
        "cim": "Toldi",
        "pdf": "6.osztaly/02_Irodalom_OH-MIR06TB/02_Toldi/02_Toldi.pdf",
        "feladat": "6.osztaly/02_Irodalom_OH-MIR06TB/02_Toldi/feladatok.html",
        "oldalak": "PDF 80–175. oldal"
      },
      {
        "cim": "Szeretet",
        "pdf": "6.osztaly/02_Irodalom_OH-MIR06TB/03_Szeretet/03_Szeretet.pdf",
        "feladat": "6.osztaly/02_Irodalom_OH-MIR06TB/03_Szeretet/feladatok.html",
        "oldalak": "PDF 176–197. oldal"
      },
      {
        "cim": "Egri csillagok",
        "pdf": "6.osztaly/02_Irodalom_OH-MIR06TB/04_Egri_csillagok/04_Egri_csillagok.pdf",
        "feladat": "6.osztaly/02_Irodalom_OH-MIR06TB/04_Egri_csillagok/feladatok.html",
        "oldalak": "PDF 198–227. oldal"
      },
      {
        "cim": "Regények",
        "pdf": "6.osztaly/02_Irodalom_OH-MIR06TB/05_Regenyek/05_Regenyek.pdf",
        "feladat": "6.osztaly/02_Irodalom_OH-MIR06TB/05_Regenyek/feladatok.html",
        "oldalak": "PDF 228–257. oldal"
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
    "fejezetek": [
      {
        "cim": "Egész számok oszthatósága",
        "pdf": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/01_Egesz_szamok_oszthatosag/01_Egesz_szamok_oszthatosag.pdf",
        "feladat": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/01_Egesz_szamok_oszthatosag/feladatok.html",
        "oldalak": "PDF 9–54. oldal"
      },
      {
        "cim": "Törtek",
        "pdf": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/02_Tortek/02_Tortek.pdf",
        "feladat": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/02_Tortek/feladatok.html",
        "oldalak": "PDF 55–84. oldal"
      },
      {
        "cim": "Geometria tengelyes tükrözés",
        "pdf": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/03_Geometria_tengelyes_tukrozes/03_Geometria_tengelyes_tukrozes.pdf",
        "feladat": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/03_Geometria_tengelyes_tukrozes/feladatok.html",
        "oldalak": "PDF 85–122. oldal"
      },
      {
        "cim": "Arany százalék szöveges",
        "pdf": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/04_Arany_szazalek_szoveges/04_Arany_szazalek_szoveges.pdf",
        "feladat": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/04_Arany_szazalek_szoveges/feladatok.html",
        "oldalak": "PDF 123–172. oldal"
      },
      {
        "cim": "Kerület terület felszín térfogat",
        "pdf": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/05_Kerulet_terulet_felszin_terfogat/05_Kerulet_terulet_felszin_terfogat.pdf",
        "feladat": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/05_Kerulet_terulet_felszin_terfogat/feladatok.html",
        "oldalak": "PDF 173–202. oldal"
      },
      {
        "cim": "Statisztika",
        "pdf": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/06_Statisztika/06_Statisztika.pdf",
        "feladat": "6.osztaly/03_Matematika_tankonyv_OH-MAT06TA/06_Statisztika/feladatok.html",
        "oldalak": "PDF 203–225. oldal"
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
    "fejezetek": [
      {
        "cim": "Egesz szamok oszthatosag",
        "pdf": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/01_Egesz_szamok_oszthatosag/01_Egesz_szamok_oszthatosag.pdf",
        "feladat": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/01_Egesz_szamok_oszthatosag/feladatok.html",
        "oldalak": "PDF 9–35. oldal"
      },
      {
        "cim": "Tortek",
        "pdf": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/02_Tortek/02_Tortek.pdf",
        "feladat": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/02_Tortek/feladatok.html",
        "oldalak": "PDF 36–54. oldal"
      },
      {
        "cim": "Geometria tengelyes tukrozes",
        "pdf": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/03_Geometria_tengelyes_tukrozes/03_Geometria_tengelyes_tukrozes.pdf",
        "feladat": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/03_Geometria_tengelyes_tukrozes/feladatok.html",
        "oldalak": "PDF 55–79. oldal"
      },
      {
        "cim": "Arany szazalek szoveges",
        "pdf": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/04_Arany_szazalek_szoveges/04_Arany_szazalek_szoveges.pdf",
        "feladat": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/04_Arany_szazalek_szoveges/feladatok.html",
        "oldalak": "PDF 80–106. oldal"
      },
      {
        "cim": "Kerulet terulet felszin terfogat",
        "pdf": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/05_Kerulet_terulet_felszin_terfogat/05_Kerulet_terulet_felszin_terfogat.pdf",
        "feladat": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/05_Kerulet_terulet_felszin_terfogat/feladatok.html",
        "oldalak": "PDF 107–125. oldal"
      },
      {
        "cim": "Statisztika",
        "pdf": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/06_Statisztika/06_Statisztika.pdf",
        "feladat": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/06_Statisztika/feladatok.html",
        "oldalak": "PDF 126–137. oldal"
      },
      {
        "cim": "Mindennapi penzugyeink",
        "pdf": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/07_Mindennapi_penzugyeink/07_Mindennapi_penzugyeink.pdf",
        "feladat": "6.osztaly/04_Matematika_munkafuzet_OH-MAT06MA/07_Mindennapi_penzugyeink/feladatok.html",
        "oldalak": "PDF 138–145. oldal"
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
    "fejezetek": [
      {
        "cim": "Magyar kiralyportrek",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/01_Magyar_kiralyportrek/01_Magyar_kiralyportrek.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/01_Magyar_kiralyportrek/feladatok.html",
        "oldalak": "PDF 9–16. oldal"
      },
      {
        "cim": "Hunyadi Janos",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/02_Hunyadi_Janos/02_Hunyadi_Janos.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/02_Hunyadi_Janos/feladatok.html",
        "oldalak": "PDF 17–20. oldal"
      },
      {
        "cim": "Hunyadi Matyas",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/03_Hunyadi_Matyas/03_Hunyadi_Matyas.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/03_Hunyadi_Matyas/feladatok.html",
        "oldalak": "PDF 21–30. oldal"
      },
      {
        "cim": "Foldrajzi felfedezesek",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/04_Foldrajzi_felfedezesek/04_Foldrajzi_felfedezesek.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/04_Foldrajzi_felfedezesek/feladatok.html",
        "oldalak": "PDF 31–35. oldal"
      },
      {
        "cim": "Korai kapitalizmus",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/05_Korai_kapitalizmus/05_Korai_kapitalizmus.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/05_Korai_kapitalizmus/feladatok.html",
        "oldalak": "PDF 36–38. oldal"
      },
      {
        "cim": "Vallasi megujulas",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/06_Vallasi_megujulas/06_Vallasi_megujulas.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/06_Vallasi_megujulas/feladatok.html",
        "oldalak": "PDF 39–47. oldal"
      },
      {
        "cim": "Uj vilagkep",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/07_Uj_vilagkep/07_Uj_vilagkep.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/07_Uj_vilagkep/feladatok.html",
        "oldalak": "PDF 48–56. oldal"
      },
      {
        "cim": "A torok haboruk hosei",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/08_A_torok_haboruk_hosei/08_A_torok_haboruk_hosei.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/08_A_torok_haboruk_hosei/feladatok.html",
        "oldalak": "PDF 57–64. oldal"
      },
      {
        "cim": "Bocskai Bethlen Zrinyi",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/09_Bocskai_Bethlen_Zrinyi/09_Bocskai_Bethlen_Zrinyi.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/09_Bocskai_Bethlen_Zrinyi/feladatok.html",
        "oldalak": "PDF 65–73. oldal"
      },
      {
        "cim": "II Rakoczi Ferenc",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/10_II_Rakoczi_Ferenc/10_II_Rakoczi_Ferenc.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/10_II_Rakoczi_Ferenc/feladatok.html",
        "oldalak": "PDF 74–80. oldal"
      },
      {
        "cim": "Maria Terezia",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/11_Maria_Terezia/11_Maria_Terezia.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/11_Maria_Terezia/feladatok.html",
        "oldalak": "PDF 81–88. oldal"
      },
      {
        "cim": "Elet a torok hodoltsag koraban",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/12_Elet_a_torok_hodoltsag_koraban/12_Elet_a_torok_hodoltsag_koraban.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/12_Elet_a_torok_hodoltsag_koraban/feladatok.html",
        "oldalak": "PDF 89–95. oldal"
      },
      {
        "cim": "Elet a XVIII szazadban",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/13_Elet_a_XVIII_szazadban/13_Elet_a_XVIII_szazadban.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/13_Elet_a_XVIII_szazadban/feladatok.html",
        "oldalak": "PDF 96–100. oldal"
      },
      {
        "cim": "Ipari forradalom",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/14_Ipari_forradalom/14_Ipari_forradalom.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/14_Ipari_forradalom/feladatok.html",
        "oldalak": "PDF 101–109. oldal"
      },
      {
        "cim": "Tarsadalmi politikai forradalom",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/15_Tarsadalmi_politikai_forradalom/15_Tarsadalmi_politikai_forradalom.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/15_Tarsadalmi_politikai_forradalom/feladatok.html",
        "oldalak": "PDF 110–118. oldal"
      },
      {
        "cim": "A reformkor",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/16_A_reformkor/16_A_reformkor.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/16_A_reformkor/feladatok.html",
        "oldalak": "PDF 119–132. oldal"
      },
      {
        "cim": "A forradalom",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/17_A_forradalom/17_A_forradalom.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/17_A_forradalom/feladatok.html",
        "oldalak": "PDF 133–141. oldal"
      },
      {
        "cim": "A szabadsagharc",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/18_A_szabadsagharc/18_A_szabadsagharc.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/18_A_szabadsagharc/feladatok.html",
        "oldalak": "PDF 142–153. oldal"
      },
      {
        "cim": "A kiegyezes",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/19_A_kiegyezes/19_A_kiegyezes.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/19_A_kiegyezes/feladatok.html",
        "oldalak": "PDF 154–161. oldal"
      },
      {
        "cim": "Kislexikon es forrasok",
        "pdf": "6.osztaly/06_Tortenelem_OH-TOR06TB/20_Kislexikon_es_forrasok/20_Kislexikon_es_forrasok.pdf",
        "feladat": "6.osztaly/06_Tortenelem_OH-TOR06TB/20_Kislexikon_es_forrasok/feladatok.html",
        "oldalak": "PDF 162–169. oldal"
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
    "fejezetek": [
      {
        "cim": "A nepzene vilaga",
        "pdf": "6.osztaly/07_Enek_OH-ENZ06TA/01_A_nepzene_vilaga/01_A_nepzene_vilaga.pdf",
        "feladat": "6.osztaly/07_Enek_OH-ENZ06TA/01_A_nepzene_vilaga/feladatok.html",
        "oldalak": "PDF 6–59. oldal"
      },
      {
        "cim": "Barangolas a zenetortenetben",
        "pdf": "6.osztaly/07_Enek_OH-ENZ06TA/02_Barangolas_a_zenetortenetben/02_Barangolas_a_zenetortenetben.pdf",
        "feladat": "6.osztaly/07_Enek_OH-ENZ06TA/02_Barangolas_a_zenetortenetben/feladatok.html",
        "oldalak": "PDF 60–93. oldal"
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
  }
];
