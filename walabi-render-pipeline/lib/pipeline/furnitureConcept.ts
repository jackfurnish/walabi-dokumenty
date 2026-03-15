import type { ProjectInput, BudgetTier, DesignStyle } from '@/lib/schemas/project'
import type { RedesignStrategy, StyleDirection, FurnitureConcept, FurniturePiece } from '@/lib/schemas/pipeline'

// ============================================================
// Furniture Concept Generator — Module D
// WALABI-specific pieces with real specifications
// Tone: furniture manufacturer + interior designer hybrid
// ============================================================

// --- Hero Bed Frames by Style ---

const BED_FRAMES: Record<DesignStyle, FurniturePiece> = {
  'organic-modern': {
    name: 'Arc Bed Frame',
    role: 'hero',
    material: 'White Oak — wire-brushed, natural oil finish',
    finish: 'Natural Oil — open pore, matte',
    dimensions: '180×200 cm (King) / 160×200 cm (Queen) — headboard H: 110 cm',
    notes: 'Łukowy profil zagłówka z litego dębu z tapicerowanym środkowym panelem lnianym. Niski prześwit nóg (18 cm) dla uziemionej masy wizualnej. Zintegrowana podstawa listewkowa.',
    manufacturabilityNote: 'Standardowa produkcja WALABI — czas realizacji 4–6 tygodni. Tapicerowanie panelu zagłówka wykonywane we własnym zakresie.',
  },
  'arhaus-luxury': {
    name: 'Grand Tufted Bed Frame',
    role: 'hero',
    material: 'Solid Dark Walnut frame — performance velvet upholstery',
    finish: 'Satin lacquer on walnut components, cognac velvet headboard',
    dimensions: '180×200 cm — headboard H: 140 cm oversized',
    notes: 'Ponadwymiarowy zagłówek z pikowaniem guzikowym i detalem nogi z orzecha. Opcjonalna szuflada ukryta. Tapicerowana listwa boczna dla pełnego premium wykończenia.',
    manufacturabilityNote: 'Program na zamówienie WALABI — 6–8 tygodni. Dostępna opcja COM dla zgodności z marką hotelową.',
  },
  'japandi-hospitality': {
    name: 'Hira Platform Bed',
    role: 'hero',
    material: 'Ash — clear oil finish, natural grain',
    finish: 'Clear Oil — reveals grain, no sheen',
    dimensions: '180×200 cm — platform height 22 cm total, headboard H: 75 cm',
    notes: 'Minimalna rama platformowa z listewkowym zagłówkiem z jesionu. Bez tapicerki — uczciwość materiałowa jest tu wypowiedzią projektową. Skrajnie niski profil dla poziomego wizualnego spokoju.',
    manufacturabilityNote: 'Standardowa produkcja WALABI — 4–5 tygodni. Wszystkie złącza odsłonięte i wykonane z tolerancją jakości ekspozycyjnej.',
  },
  'boutique-warm-minimalism': {
    name: 'Nido Upholstered Bed',
    role: 'hero',
    material: 'White Oak frame with full upholstered headboard in cotton-linen blend',
    finish: 'Matte oil on oak, warm cream upholstery',
    dimensions: '180×200 cm — headboard H: 100 cm',
    notes: 'Czysty, kanałowy design zagłówka z widoczną nogą dębową przy podstawie. Proporcje zbalansowane dla standardowej wysokości pokoju hotelowego. Najbardziej komercyjnie transferowalny element w kolekcji.',
    manufacturabilityNote: 'Standardowa produkcja WALABI — 4–5 tygodni. Opcja COM/COL zagłówka dla tkaniny specyficznej dla hotelu.',
  },
}

// --- Bedside Tables by Style ---

const BEDSIDE_TABLES: Record<DesignStyle, FurniturePiece> = {
  'organic-modern': {
    name: 'Ronde Bedside Table',
    role: 'supporting',
    material: 'White Oak — solid top with turned or tapered leg',
    finish: 'Natural Oil',
    dimensions: 'Ø 45 cm × H 55 cm — round form',
    notes: 'Okrągły blat eliminuje zahaczanie o narożniki w ciasnych układach pokoi. Pojedyncza otwarta półka lub szuflada. Opcja integracji USB-A/C w blacie.',
    manufacturabilityNote: 'Produkcja standardowa — 3–4 tygodnie. Integracja USB przez wkładkę od zewnętrznego dostawcy, pozyskaną przez WALABI.',
  },
  'arhaus-luxury': {
    name: 'Marlowe Bedside Cabinet',
    role: 'supporting',
    material: 'Dark Walnut — solid top, two-drawer cabinet, brass pull',
    finish: 'Satin lacquer, oil-rubbed brass hardware',
    dimensions: '50×40 cm × H 60 cm — cabinet form',
    notes: 'Szafka dwuszufladowa z widocznym złączem jaskółczego ogona na narożnikach. Mosiężna uchwytka pierścieniowa. Blat z 3 mm sfazowaną krawędzią. Wyściółka szuflad w materiale imitującym zamsz.',
    manufacturabilityNote: 'Program na zamówienie — 5–6 tygodni. Okucia pozyskiwane z sieci dostawców WALABI.',
  },
  'japandi-hospitality': {
    name: 'Shiro Floating Shelf Unit',
    role: 'supporting',
    material: 'Ash — wall-mounted cantilevered shelf with concealed bracket',
    finish: 'Clear Oil',
    dimensions: '55×28 cm × H (single shelf) — adjustable installation height',
    notes: 'Montaż ścienny dla całkowitego uwolnienia płaszczyzny podłogi. Pojedyncza półka z zintegrowanym kanałem kablowym do ładowania telefonu. Minimalna widoczna instalacja.',
    manufacturabilityNote: 'Produkcja standardowa — 3 tygodnie. Wsporniki ścienne w zestawie, zapewnione mocowania do betonu lub muru.',
  },
  'boutique-warm-minimalism': {
    name: 'Forma Bedside Table',
    role: 'supporting',
    material: 'White Oak — rectangular top with single drawer and open shelf',
    finish: 'Natural Oil',
    dimensions: '45×38 cm × H 58 cm',
    notes: 'Proporcjonowany do użytku przy łóżku Nido. Szuflada z otwarciem push-to-open (bez uchwytu). Dolna półka na obiekt stylingowy lub materiał do czytania.',
    manufacturabilityNote: 'Produkcja standardowa — 3–4 tygodnie. Projektowany do produkcji jako para dopasowana.',
  },
}

// --- Desk by Budget ---

const DESKS: Record<BudgetTier, FurniturePiece> = {
  'light-refresh': {
    name: 'Desk Surface Restyle',
    role: 'supporting',
    material: 'Existing desk base retained — new surface styling only',
    finish: 'Desk pad in leather or cork added over existing surface',
    dimensions: 'Existing',
    notes: 'Na poziomie lekkiego odświeżenia wymiana biurka nie jest uzasadniona. Przemyślana mata biurkowa, skoordynowana taca na akcesoria i modernizacja lampy przynoszą wymaganą poprawę.',
    manufacturabilityNote: 'Brak wymaganej produkcji — wyłącznie pozyskane akcesoria.',
  },
  'medium-upgrade': {
    name: 'Tana Desk',
    role: 'supporting',
    material: 'White Oak or Ash — solid top with hairpin or tapered legs',
    finish: 'Natural Oil',
    dimensions: '120×55 cm × H 75 cm',
    notes: 'Czyste, nieskomplikowane biurko proporcjonowane do funkcjonującego pokoju hotelowego. Zintegrowany kanał kablowy z tyłu. Głębokość blatu pozwala na laptop + monitor jeśli wymagane.',
    manufacturabilityNote: 'Produkcja standardowa — 3–4 tygodnie. Wykończenie nóg zgodne z programem stolików nocnych.',
  },
  'premium-redesign': {
    name: 'Tana Desk — Full Zone',
    role: 'supporting',
    material: 'Solid Oak top with integrated joinery surround — shelving and cable trunking built in',
    finish: 'Natural Oil on timber, matte black cable management elements',
    dimensions: '140×60 cm × H 75 cm, with 40 cm shelf above',
    notes: 'Kompleksowy projekt strefy biurowej: blat roboczy, zintegrowany regał, prowadzenie kabli i wspornik lampy zadaniowej. Zaprojektowany jako przemyślany element stolarski, nie samodzielny stół.',
    manufacturabilityNote: 'Stolarka na zamówienie — 5–7 tygodni. Wymaga mocowania ściennego dla elementu półki.',
  },
}

// --- Accent Pieces by Style ---

const ACCENT_PIECES: Record<DesignStyle, FurniturePiece[]> = {
  'organic-modern': [
    {
      name: 'Ceramic Table Lamp Base',
      role: 'accent',
      material: 'Stoneware ceramic — wheel-thrown form, matte earth glaze',
      finish: 'Matte glaze in warm taupe or sand',
      dimensions: 'H 35 cm, shade Ø 40 cm linen drum',
      notes: 'Organiczna forma podstawy komunikuje rzemieślnicze pochodzenie. Klosz lniany w ciepłej bieli.',
      manufacturabilityNote: 'Pozyskiwane przez sieć rzemieślniczą WALABI. Czas realizacji 2–3 tygodnie.',
    },
  ],
  'arhaus-luxury': [
    {
      name: 'Sculptural Floor Lamp',
      role: 'accent',
      material: 'Aged brass stem — tripod or arc form — with heavyweight linen or empire shade',
      finish: 'Aged Brass — hand-finished',
      dimensions: 'H 160–175 cm',
      notes: 'Element statement dla strefy do czytania lub narożnika. Maksymalnie jeden na pokój — nie jako para.',
      manufacturabilityNote: 'Pozyskiwane. Czas realizacji 2–4 tygodnie w zależności od stanu magazynowego.',
    },
  ],
  'japandi-hospitality': [
    {
      name: 'Stone Object — Bedside',
      role: 'accent',
      material: 'Honed travertine or sandstone — small block or sculptural form',
      finish: 'Honed natural surface, no polish',
      dimensions: 'Approx. 12×8 cm — tabletop object',
      notes: 'Zastępuje kompozycję kwiatową. Stały, niewymagający konserwacji. Komunikuje dbałość o projekt.',
      manufacturabilityNote: 'Pozyskiwane od dostawcy kamienia. Jednorazowe zamówienie na projekt.',
    },
  ],
  'boutique-warm-minimalism': [
    {
      name: 'Terracotta or Ceramic Vase',
      role: 'accent',
      material: 'Terracotta or earthenware — simple cylindrical or tapered form',
      finish: 'Unglazed or single-tone matte glaze',
      dimensions: 'H 25–35 cm',
      notes: 'Suszone trawy lub pojedyncza łodyga — nie świeże kwiaty. Bezobsługowy i fotogeniczny.',
      manufacturabilityNote: 'Pozyskiwany. Oszczędny element akcentowy o wysokim zwrocie wizualnym.',
    },
  ],
}

// --- Textile Specs ---

const TEXTILE_SPECS: Record<DesignStyle, string[]> = {
  'organic-modern': [
    'Pościel: prana kamieniem pościel lniana o 200 nitkach, owsiana lub ciepłobiała. Dwie poszewki, prześcieradło dopasowane, prześcieradło płaskie.',
    'Kołdra: alternatywa dla puchu węgierskiej gęsi, waga 400 gsm, pokrowiec lniany',
    'Narzuta: bawełna w splocie waflowym w kolorze terakoty lub gliny — złożona u stóp łóżka',
    'Poduszki: 2× len w dopełniających odcieniach — 50×50 cm',
    'Zasłony: tkanina o wyglądzie lnu, pełnej długości, złamana biel. Nagłówek oczka, szyna mocowana do sufitu.',
  ],
  'arhaus-luxury': [
    'Pościel: satyna bawełniana egipska 400TC, głęboka kość słoniowa z kontrastowym obszyciem. W pełni wyprasowana.',
    'Kołdra: europejski puch gęsi, 600 fill power, bawełniany pokrowiec',
    'Narzuta: matelassé bawełniany w szampanie lub ciepłym kremie — pod warstwą kołdry',
    'Narzuta dekoracyjna: wełna lub mieszanka kaszmiru w kolorze koniaku lub leśnym — draped u stóp',
    'Poduszki: zestaw 3× — aksamit, tkanina, jednolita mieszanka. 50×50 + 30×50 cm',
    'Zasłony: ciężkie podszyte zasłony, od sufitu do podłogi, w skoordynowanej tkaninie. Pinch pleat.',
  ],
  'japandi-hospitality': [
    'Pościel: prana kamieniem pościel lniana, ciepła szarość lub jasny len. Minimalna. Właściwie wyprasowana.',
    'Kołdra: wypełnienie z naturalnego włókna, czysty pokrowiec bez dekoracji',
    'Narzuta: pojedyncza smukła narzuta w stonowanej szałwii lub glinie — złożona precyzyjnie',
    'Poduszki: tylko 1 — len, bez wzoru',
    'Zasłony: pinch pleat o wyglądzie lnu, mocowane do sufitu, monochromatyczne. Pełne podszewka zaciemniająca.',
  ],
  'boutique-warm-minimalism': [
    'Pościel: bawełna percale 300TC, ciepły krem. Gładkie wykończenie, bez dekoracji.',
    'Kołdra: mikrofibra lub alternatywa dla puchu — biała, prasowana',
    'Narzuta: lekka bawełniana dzianina lub szczotkowana bawełna w ciepłym piasku — złożona u stóp',
    'Poduszki: 2× w koordynujących neutralnych odcieniach. 50×50 cm.',
    'Zasłony: podwójny system — sheerska warstwa lniana + zaciemniające podszewka. Pełny splot, mocowane do sufitu.',
  ],
}

// --- Lighting Programme ---

const LIGHTING_SPECS: Record<BudgetTier, string[]> = {
  'light-refresh': [
    'Lampy przy łóżku: dopasowana para — ceramiczna lub drewniana podstawa, klosz lniany, żarówka E27 Edison 2700K',
    'Sufit: wyłącznie wymiana żarówki — ciepła biel 2700K, ta sama oprawa',
  ],
  'medium-upgrade': [
    'Sufit: lampa wisząca w koordynującym materiale — rattanowa, ceramiczna lub metalowa zależnie od stylu. Ściemnialna E27.',
    'Lampy przy łóżku: dopasowana para — podstawa proporcjonalna do nowej skali łóżka. Ciepły klosz.',
    'Biurko: kierunkowa lampa zadaniowa — matowa czerń lub mosiądz zgodny z programem okuć.',
    'Wszystkie żarówki: ciepła biel 2700K. Ściemniacz na obwodzie sufitu.',
  ],
  'premium-redesign': [
    'Otoczenie: oświetlenie z karnisza za zagłówkiem — listwa LED 2700K, ściemniana do 10%',
    'Sufit: lampa wisząca statement — na zamówienie lub dobrana, zgodna z językiem projektu',
    'Przy łóżku: zintegrowane ścienne ramię do czytania — wysuwane, kierunkowe',
    'Biurko: jakościowa lampa zadaniowa — w wykończeniu programu okuć',
    'Lampa podłogowa: jedna w strefie czytania lub wypoczynkowej — element statement',
    'Wszystkie obwody na ściemniaczach. Programowanie scen: przyjazd, sen, ranek.',
  ],
}

export function runFurnitureConcept(
  input: ProjectInput,
  strategy: RedesignStrategy,
  style: StyleDirection
): FurnitureConcept {
  const bedFrame    = BED_FRAMES[input.style]
  const bedsideTable = BEDSIDE_TABLES[input.style]
  const desk        = DESKS[input.budgetTier]
  const accents     = ACCENT_PIECES[input.style]

  const heroPieces: FurniturePiece[] = input.budgetTier !== 'light-refresh'
    ? [bedFrame]
    : []

  const supportingPieces: FurniturePiece[] = [
    ...(input.budgetTier !== 'light-refresh' ? [bedsideTable, bedsideTable] : []),
    desk,
  ]

  const productionNotes = buildProductionNotes(input)

  return {
    heroPieces,
    supportingPieces,
    accentPieces: accents,
    textiles:     TEXTILE_SPECS[input.style],
    lighting:     LIGHTING_SPECS[input.budgetTier],
    practicalNotes: [
      'Wszystkie wymiary są orientacyjne — przed produkcją należy potwierdzić na podstawie inwentaryzacji pokoju',
      'Stelaż łóżka powinien posiadać antypoślizgowe nóżki chroniące wykończenie podłogi',
      'Wszystkie elementy drewniane muszą być zaakceptowane przez klienta przed wykończeniem',
      input.budgetTier === 'premium-redesign'
        ? 'Pełna instalacja przez zespół WALABI — dostawa, montaż, ustawienie, odbiór z listą kontrolną'
        : 'Instalacja może być wykonana przez zespół techniczny hotelu z listą kontrolną dostawy WALABI',
    ],
    walabiProductionNotes: productionNotes,
  }
}

function buildProductionNotes(input: ProjectInput): string {
  const tierNotes: Record<BudgetTier, string> = {
    'light-refresh':
      'W zakresie lekkiego odświeżenia WALABI dostarcza akcesoria i tkaniny. Bez wymaganej produkcji na zamówienie. Dostawa w ciągu 5–7 dni roboczych od potwierdzenia zamówienia.',
    'medium-upgrade':
      'Standardowy program produkcji. Czas realizacji 4–6 tygodni od potwierdzonej specyfikacji. WALABI koordynuje dostawę i dostarcza listę kontrolną instalacji. Nadzór na miejscu dostępny na życzenie.',
    'premium-redesign':
      'Pełny program na zamówienie. Produkcja rozpoczyna się po podpisaniu arkusza specyfikacji i wpłacie 50% zaliczki. Kierownik projektu WALABI przydzielany na etapie zlecenia. Zespół instalacyjny zarządza pełną dostawą, ustawieniem i odbiorem.',
  }
  return tierNotes[input.budgetTier]
}
