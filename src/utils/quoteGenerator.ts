// Coelho-stílusú közhely mondatok generálása
// Minimum 12 szó, gagyi, patetikus, túlzóan filozofikus

// Alany esetek és ragozott alakjaik (nom = nevező, acc = tárgyeset, dat = dativusz)
const subjectsData = [
  { nom: 'Az élet', acc: 'az életet', dat: 'az életnek' },
  { nom: 'A szív', acc: 'a szívet', dat: 'a szívnek' },
  { nom: 'A lélek', acc: 'a lelket', dat: 'a léleknek' },
  { nom: 'A sors', acc: 'a sorsot', dat: 'a sorsnak' },
  { nom: 'Az út', acc: 'az utat', dat: 'az útnak' },
  { nom: 'A szerelem', acc: 'a szerelmet', dat: 'a szerelemnek' },
  { nom: 'Az álom', acc: 'az álmot', dat: 'az álomnak' },
  { nom: 'A remény', acc: 'a reményt', dat: 'a reménynek' },
  { nom: 'Az idő', acc: 'az időt', dat: 'az időnek' },
  { nom: 'A béke', acc: 'a békét', dat: 'a békének' },
  { nom: 'Az igazság', acc: 'az igazságot', dat: 'az igazságnak' },
  { nom: 'A fény', acc: 'a fényt', dat: 'a fénynek' },
  { nom: 'A pillanat', acc: 'a pillanatot', dat: 'a pillanatnak' },
  { nom: 'A szenvedély', acc: 'a szenvedélyt', dat: 'a szenvedélynek' },
  { nom: 'A végzet', acc: 'a végzetet', dat: 'a végzetnek' },
  { nom: 'A csend', acc: 'a csendet', dat: 'a csendnek' },
  { nom: 'A szabadság', acc: 'a szabadságot', dat: 'a szabadságnak' },
  { nom: 'Az öröm', acc: 'az örömet', dat: 'az örömnek' },
  { nom: 'A bánat', acc: 'a bánatot', dat: 'a bánatnak' },
  { nom: 'A vágy', acc: 'a vágyat', dat: 'a vágynak' },
  // Filozofiai alanyok
  { nom: 'A tudat', acc: 'a tudatot', dat: 'a tudatnak' },
  { nom: 'A valóság', acc: 'a valóságot', dat: 'a valóságnak' },
  { nom: 'A lényeg', acc: 'a lényeget', dat: 'a lényegnek' },
  { nom: 'Az illúzió', acc: 'az illúziót', dat: 'az illúziónak' },
  { nom: 'A végtelenség', acc: 'a végtelenséget', dat: 'a végtelenségnek' },
];

const subjects = subjectsData.map(s => s.nom);

// Összehasonlítások – csak azok, ami a sablonban valóban működnek
const comparisons = [
  'olyan, mint',
  'akár',
  'pontosan úgy van, mint',
  'valóban olyan, mint',
  'éppen olyan, mint',
];

// Összehasonlítások "hogy" után (szubjektus nélkül) – "akár" itt nem működik
const comparisonsSub = [
  'olyan, mint',
  'pontosan úgy van, mint',
  'valóban olyan, mint',
  'éppen olyan, mint',
];

// Igék – tárgyas ragozás (bennünket = határozott tárgy → definit alak)
const actions = [
  'vezeti', 'formálja', 'átöleli', 'elvezeti', 'alakítja',
  'teremti meg', 'megrendíti', 'lelkesíti', 'megragadja', 'felébreszti',
];

const metaphors = [
  'egy folyó, amely nem tud visszafordulni',
  'egy titokzatos könyv, amit csak a szív tud elolvasni',
  'egy végtelen óceán, ahol minden csepp egy-egy álom',
  'egy hegy, amit csak a lélek ereje tud megmászni',
  'egy láng, ami örökké ég a sötétségben',
  'egy tükör, amelyben mindenki önmagát látja',
  'egy kert, ahol minden virág egy-egy emlék',
  'egy ösvény, amit a csillagok megvilágítják',
  'egy dal, amit csak a lelkek hallják',
  'egy híd, ami összeköti a múltat és a jövőt',
  // Filozofiai metafórák
  'egy végtelen labirintus, amelyben minden fal egy-egy illúzió',
  'egy csendes mélység, amelyet csak a tudat tud felfogni',
  'egy tükör, amelyben a valóság és az illúzió összeolvad',
  'egy hullám, amely mindig visszatér a tengerbe',
  'egy ajtó, amely a lelket a végtelenbe nyitja',
];

// Csak azok, ami metafóra (vonatkozó mondattal) után is grammatikusan működnek
const connectors = [
  'mert', 'mivel', 'amikor', 'és ezért', 'így', 'de', 'azonban', 'miközben',
];

const deepThoughts = [
  'a sors már megírta a történetet',
  'minden lépés egy új kezdet felé vezet',
  'a szerelem fénye mindent beragyogja',
  'az igazság mindig utat talál magának',
  'a lélek útja végtelenül gyönyörű',
  'minden pillanat egy ajándék az univerzumtól',
  'a szív titkai csak a csendben nyílnak meg',
  'az élet csodái mindenütt körülveszik minket',
  'a remény soha nem hal meg igazán',
  'minden végzet egy új kezdet lehetősége',
  // Filozofiai mélyedelmek
  'a tudat az egyetlen valóság, amit igazán megismerhetünk',
  'minden dolog összefügg a végtelenben',
  'az illúzió és a valóság közötti határvonal elmosódik',
  'a lélek mélyén rejlik a mindenség kulcsa',
];

const poeticEndings = [
  'és ebben rejlik az élet legnagyobb titka',
  'mint ahogy a csillagok is tudják',
  'ahogy azt az ősi bölcsesség is tanítja',
  'és ez az, ami igazán számít',
  'mert ez az egyetlen út a boldogsághoz',
  'és ezt érezni kell, nem csak érteni',
  'ahogy minden igaz keresőnek tudnia kell',
  'mint egy költemény, amit a szél súg',
  'és ebben találjuk meg önmagunkat',
  'ahogy a világ teremtése óta mindig is volt'
];

// Filozofok – a sablonokban használt nevek
const philosophers = [
  'Herakleitosz', 'Szókratész', 'Platon', 'Aristotelész',
  'Descartes', 'Kant', 'Nietzsche', 'Heidegger',
  'Buddha', 'Konfúcius', 'Spinoza', 'Kierkegaard',
];

// Filozofos attribúciók – humoros szerzőség a mondat alá
const philosopherAttributions = [
  'egy bölcs a kávézóban',
  'Paulo Coelho kisebb öccse',
  'Herakleitosz, de rosszabbul',
  'Nietzsche, ha kevesebb bort ivott volna',
  'egy szombat estei Aristotelész',
  'Descartes, de kevesebb kétkedéssel',
  'Buddha, ha Twitter-en lett volna',
  'Konfúcius egy távoli unokatestvére',
  'egy valóban fontos ember, messze innen',
  'Platon, szóban',
  'egy ismeretlen Kant-tanítvány',
  'Spinoza, kedvezőbb kedvben',
];

export const generateCoelhoQuote = (): string => {
  const templates = [
    // Összehasonlítások (olyan, mint...)
    () => `${random(subjects)} ${random(comparisons)} ${random(metaphors)}, ${random(connectors)} ${random(deepThoughts)}.`,

    () => `${random(subjects)} ${random(comparisons)} ${random(metaphors)}, ${random(poeticEndings)}.`,

    () => `${random(subjects)} nem más, mint ${random(metaphors)}, ${random(connectors)} ${random(deepThoughts)}.`,

    () => {
      const subj = random(subjectsData);
      return `Amikor megérted, hogy ${subj.nom.toLowerCase()} ${random(comparisons)} ${random(metaphors)}, akkor ${random(deepThoughts)}.`;
    },

    // Igés szerkezetek
    () => `${random(subjects)} ${random(actions)} bennünket, mert ${random(deepThoughts)}, ${random(poeticEndings)}.`,

    () => `${random(subjects)} útja mindig a ${random(['szív', 'lélek', 'szerelem', 'remény', 'vágy', 'tudat'])} mélyén kezdődik, és ${random(deepThoughts)}.`,

    () => {
      const subj = random(subjectsData);
      return `A bölcsek azt mondják, hogy ${subj.nom.toLowerCase()} ${random(comparisons)} ${random(metaphors)}, és ${random(deepThoughts)}.`;
    },

    () => {
      const subj = random(subjectsData);
      return `${subj.nom} legmélyebb titka abban rejlik, hogy az ${random(comparisonsSub)} ${random(metaphors)}, ezért ${random(deepThoughts)}.`;
    },

    () => {
      const subj = random(subjectsData);
      return `Minden nap, amikor felébredünk, ${subj.nom.toLowerCase()} új lehetőséget ad nekünk, mert ${random(deepThoughts)}.`;
    },

    () => {
      const subj = random(subjectsData);
      return `Csak akkor értjük meg igazán ${subj.acc}, amikor felismerjük, hogy az ${random(comparisonsSub)} ${random(metaphors)}, és ${random(deepThoughts)}.`;
    },

    // Filozofikus sablonok
    () => {
      const subj = random(subjectsData);
      return `Azt a bölcsséget, amit ${random(philosophers)} is tanította, mi is felismerjük: ${subj.nom.toLowerCase()} ${random(comparisons)} ${random(metaphors)}, mert ${random(deepThoughts)}.`;
    },

    () => {
      const subj = random(subjectsData);
      return `De miért keressük mi ${subj.acc}, ha tudjuk, hogy ${random(deepThoughts)}? Mert ${random(subjects)} ${random(comparisons)} ${random(metaphors)}.`;
    },

    () => {
      const subj = random(subjectsData);
      return `Amikor a tudat felébredik, az első igazság, amit megtanulja, az, hogy ${subj.nom.toLowerCase()} ${random(comparisons)} ${random(metaphors)}, és ezért ${random(deepThoughts)}.`;
    },
  ];

  const template = random(templates);
  return template();
};

export const generatePhilosopherAttribution = (): string => {
  return random(philosopherAttributions);
};

// Helper függvény random elem kiválasztásához
function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
