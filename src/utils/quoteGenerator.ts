// Coelho-stílusú közhely mondatok generálása
// Minimum 12 szó, gagyi, patetikus, túlzóan filozofikus

// Alany esetek és ragozott alakjaik
const subjectsData = [
  { nom: 'Az élet', acc: 'az életet', gen: 'az életnek' },
  { nom: 'A szív', acc: 'a szívet', gen: 'a szívnek' },
  { nom: 'A lélek', acc: 'a lelket', gen: 'a léleknek' },
  { nom: 'A sors', acc: 'a sorsot', gen: 'a sorsnak' },
  { nom: 'Az út', acc: 'az utat', gen: 'az útnak' },
  { nom: 'A szerelem', acc: 'a szerelmet', gen: 'a szerelemnek' },
  { nom: 'Az álom', acc: 'az álmot', gen: 'az álomnak' },
  { nom: 'A remény', acc: 'a reményt', gen: 'a reménynek' },
  { nom: 'Az idő', acc: 'az időt', gen: 'az időnek' },
  { nom: 'A béke', acc: 'a békét', gen: 'a békének' },
  { nom: 'Az igazság', acc: 'az igazságot', gen: 'az igazságnak' },
  { nom: 'A fény', acc: 'a fényt', gen: 'a fénynek' },
  { nom: 'A pillanat', acc: 'a pillanatot', gen: 'a pillanatnak' },
  { nom: 'A szenvedély', acc: 'a szenvedélyt', gen: 'a szenvedélynek' },
  { nom: 'A végzet', acc: 'a végzetet', gen: 'a végzetnek' },
  { nom: 'A csend', acc: 'a csendet', gen: 'a csendnek' },
  { nom: 'A szabadság', acc: 'a szabadságot', gen: 'a szabadságnak' },
  { nom: 'Az öröm', acc: 'az örömet', gen: 'az örömnek' },
  { nom: 'A bánat', acc: 'a bánatot', gen: 'a bánatnak' },
  { nom: 'A vágy', acc: 'a vágyat', gen: 'a vágynak' },
];

const subjects = subjectsData.map(s => s.nom);

// Összehasonlítások (olyan, mint)
const comparisons = [
  'olyan, mint', 'akár', 'hasonlít', 'emlékeztet arra, mint',
  'olyan, mintha', 'hasonló', 'olyan, akár'
];

// Igék (megfelelő ragozással)
const actions = [
  'vezet', 'mutat', 'tanít', 'sugall', 'teremt', 'formál',
  'átölel', 'megtanít', 'megmutat', 'elvezet', 'rávilágít'
];

const metaphors = [
  'egy folyó, amely nem tud visszafordulni',
  'egy titokzatos könyv, amit csak a szív tud elolvasni',
  'egy végtelen óceán, ahol minden csepp egy-egy álom',
  'egy hegy, amit csak a lélek ereje tud megmászni',
  'egy láng, ami örökké ég a sötétségben',
  'egy tükör, amelyben mindenki önmagát látja',
  'egy kert, ahol minden virág egy-egy emlék',
  'egy ösvény, amit a csillagok világítanak meg',
  'egy dal, amit csak a lelkek hallanak',
  'egy híd, ami összeköti a múltat és a jövőt'
];

const connectors = [
  'mert', 'mivel', 'ahol', 'amelyben', 'ahonnan', 'amikor',
  'és ezért', 'így', 'de', 'azonban', 'miközben', 'hogy'
];

const deepThoughts = [
  'a sors már megírta a történetet',
  'minden lépés egy új kezdet felé vezet',
  'a szerelem fénye mindent beragyog',
  'az igazság mindig utat talál magának',
  'a lélek útja végtelenül gyönyörű',
  'minden pillanat egy ajándék az univerzumtól',
  'a szív titkai csak a csendben nyílnak meg',
  'az élet csodái mindenütt körülvesznek minket',
  'a remény soha nem hal meg igazán',
  'minden végzet egy új kezdet lehetősége'
];

const poeticEndings = [
  'és ebben rejlik az élet legnagyobb titka',
  'mint ahogy a csillagok is tudják',
  'ahogy azt az ősi bölcsesség is tanítja',
  'és ez az, ami igazán számít',
  'mert ez az egyetlen út a boldogsághoz',
  'és ezt érezni kell, nem csak érteni',
  'ahogy minden igaz keresőnek tudnia kell',
  'mint egy költemény, amit a szél suttog',
  'és ebben találjuk meg önmagunkat',
  'ahogy a világ teremtése óta mindig is volt'
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

    () => `${random(subjects)} útja mindig a ${random(['szív', 'lélek', 'szerelem', 'remény', 'igazság'])} mélyén kezdődik, és ${random(deepThoughts)}.`,

    () => {
      const subj = random(subjectsData);
      return `A bölcsek azt mondják, hogy ${subj.nom.toLowerCase()} ${random(comparisons)} ${random(metaphors)}, és ${random(deepThoughts)}.`;
    },

    () => `${random(subjects)} legmélyebb titka abban rejlik, hogy ${random(comparisons)} ${random(metaphors)}, ezért ${random(deepThoughts)}.`,

    () => {
      const subj = random(subjectsData);
      return `Minden nap, amikor felébredünk, ${subj.nom.toLowerCase()} új lehetőséget ad nekünk, mert ${random(deepThoughts)}.`;
    },

    () => {
      const subj = random(subjectsData);
      return `Csak akkor értjük meg igazán ${subj.acc}, amikor felismerjük, hogy ${random(comparisons)} ${random(metaphors)}, és ${random(deepThoughts)}.`;
    },
  ];

  // Válasszunk ki egy random template-et és generáljuk a mondatot
  const template = random(templates);
  return template();
};

// Helper függvény random elem kiválasztásához
function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
