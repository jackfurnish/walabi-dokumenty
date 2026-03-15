import type { ProjectInput, RoomType, BudgetTier } from '@/lib/schemas/project'
import type { SpaceAnalysis } from '@/lib/schemas/pipeline'

// ============================================================
// Space Analyzer — Module A
// Deterministic, room-type-aware analysis
// Output tone: professional interior consultant, not AI assistant
// ============================================================

const ROOM_ISSUES: Record<RoomType, string[]> = {
  'hotel-room': [
    'Generyczny zagłówek z tkaniny syntetycznej dominuje ścianę główną bez odpowiedniej masy wizualnej',
    'Pojedyncza lampa sufitowa tworzy płaskie, bezcieniowe oświetlenie — eliminuje głębię i ciepło',
    'Powierzchnie mebli z laminatu odbijają ostre światło, sygnalizując niski koszt wykonania',
    'Stoliki nocne niedopasowane lub zbyt małe w stosunku do skali łóżka',
    'Zasłony pozbawione warstwowości — pojedyncza roleta eliminuje całą miękkość',
    'Widoczne prowadzenie kabli na panelu przy łóżku jest widoczne na zdjęciach',
    'Umieszczenie minibarku zaburza wizualny przepływ w pokoju',
  ],
  'boutique-suite': [
    'Strefa wypoczynkowa pozbawiona wyraźnego elementu wiodącego — sprawia wrażenie dorobionej',
    'Potencjał wysokości sufitu niewykorzystany — brak elementów pionowych przyciągających wzrok',
    'Wiele sprzecznych odcieni drewna tworzy wizualny chaos',
    'Brak celowych stref oświetleniowych — jedno źródło oświetla wszystko równomiernie',
    'Strefa przejścia do łazienki widoczna i nierozwiązana estetycznie',
    'Brak warstwowania tkanin — pojedyncza narzuta niewystarczająca dla tego segmentu',
    'Niewykorzystana możliwość ściany wiodącej za łóżkiem lub sofą',
  ],
  'apartment-bedroom': [
    'Układ priorytetyzuje komunikację nad kompozycją — meble ustawione dla wygody, nie do ekspozycji',
    'Rozwiązania przechowywania widoczne i niedekoracyjne',
    'Brak przemyślanej palety kolorystycznej — ściany i meble w niezwiązanych ze sobą neutralach',
    'Zagłówek łóżka nieobecny lub zbyt niski — łóżko wygląda jak materac na stelażu',
    'Naturalne źródło światła częściowo zasłonięte przez ustawienie mebli',
    'Element sufitu (wentylator, zwykły kinkiet) obniża postrzeganą jakość',
  ],
}

const ROOM_STRENGTHS: Record<RoomType, string[]> = {
  'hotel-room': [
    'Odpowiednia powierzchnia podłogi dla przemyślanego redesignu',
    'Standardowe proporcje pokoju pozwalają na modularne ustawienie mebli',
    'Okno zapewnia użyteczne naturalne oświetlenie',
  ],
  'boutique-suite': [
    'Powierzchnia pokoju pozwala na wyraźne rozdzielenie stref',
    'Wysokość sufitu powyżej standardu — wspiera oświetlenie wiszące',
    'Wiele ścian nadających się do akcentowego wykończenia',
  ],
  'apartment-bedroom': [
    'Skala mieszkalna natychmiast tworzy potencjał ciepła',
    'Integracja szafy możliwa bez zmian konstrukcyjnych',
    'Naturalne światło z okna stwarza warunki przyjazne fotografii',
  ],
}

const FOCAL_POINTS: Record<RoomType, string> = {
  'hotel-room':        'Ściana za łóżkiem — główna oś kompozycji dla fotografii gości',
  'boutique-suite':    'Strefa wypoczynkowa / ściana wiodąca widoczna od wejścia — strefa pierwszego wrażenia',
  'apartment-bedroom': 'Ściana za łóżkiem z naturalnym oświetleniem krzyżowym — oś fotograficzna',
}

const LIGHTING_NOTES: Record<RoomType, string> = {
  'hotel-room':        'Pojedyncze źródło sufitowe tworzy płaską, instytucjonalną jakość oświetlenia. Brak ciepłego warstwowania przy łóżku.',
  'boutique-suite':    'Dominacja oświetlenia górnego. Brak rozdzielenia światła otoczenia i akcentowego. Nieużyte możliwości dla lamp wiszących i podłogowych.',
  'apartment-bedroom': 'Zależność od pojedynczego okna i oświetlenia górnego. Atmosfera wieczorna nieistniejąca bez interwencji.',
}

const OPPORTUNITIES: Record<BudgetTier, string[]> = {
  'light-refresh': [
    'Wymiana tkanin (pościel, poduszki, zasłony) natychmiast podnosi postrzeganą jakość',
    'Wprowadzenie ciepłego oświetlenia przy łóżku eliminuje instytucjonalny charakter',
    'Dodanie jednej przemyślanej warstwy dekoracyjnej (taca, grafika, roślina) dla głębi fotograficznej',
    'Wymiana syntetycznej zasłony na tkaninę o fakturze lnu dla miękkiej jakości światła',
  ],
  'medium-upgrade': [
    'Wymiana stelaża łóżka i zagłówka jako głównego elementu wiodącego',
    'Wprowadzenie dopasowanych stolików nocnych we właściwej skali',
    'Modernizacja oświetlenia: lampy przy łóżku + wisząca lub opcja karnisza',
    'Wymiana jednostki minibarku lub biurka na alternatywę z ciepłego materiału',
    'Dodanie warstwowego programu tkanin: warstwa bazowa, narzuta, poduszki akcentowe',
    'Wprowadzenie jednego dzieła sztuki zakotwiczającego kompozycję ściany za łóżkiem',
  ],
  'premium-redesign': [
    'Niestandardowy stelaż łóżka WALABI jako element sygnaturowy',
    'Kompletny program meblowy: łóżko, stoliki nocne, biurko, obudowa szafy',
    'Przemyślany projekt oświetlenia: otoczenie, zadaniowe, akcentowe we wszystkich strefach',
    'Na miarę szafa lub integracja przechowywania zgodna z językiem projektu',
    'Kompletny program tkanin: pościel, zasłony, poduszki, narzuta, szlafroki',
    'Art direction: kuratorowane dzieła, lustra, obiekty — zgodne z historią marki',
    'Modernizacja materiałów na wszystkich widocznych powierzchniach: uchwyty, okucia, haki',
  ],
}

export function runSpaceAnalyzer(input: ProjectInput): SpaceAnalysis {
  const issues = pickItems(ROOM_ISSUES[input.roomType], 4)
  const strengths = ROOM_STRENGTHS[input.roomType]
  const opportunities = OPPORTUNITIES[input.budgetTier]

  // Confidence varies slightly by room type and budget tier
  const baseConfidence = { 'hotel-room': 80, 'boutique-suite': 75, 'apartment-bedroom': 78 }
  const budgetModifier = { 'light-refresh': 5, 'medium-upgrade': 3, 'premium-redesign': 0 }
  const confidenceScore = baseConfidence[input.roomType] + budgetModifier[input.budgetTier]

  // Lighting quality: almost always average/poor in existing 3-4* rooms
  const lightingQuality = input.budgetTier === 'premium-redesign' ? 'average' : 'poor'

  const summary = buildSummary(input)

  return {
    roomType: input.roomType,
    detectedIssues: issues,
    focalPoint: FOCAL_POINTS[input.roomType],
    lightingQuality,
    lightingNotes: LIGHTING_NOTES[input.roomType],
    redesignOpportunities: opportunities,
    existingStrengths: strengths,
    confidenceScore,
    summary,
  }
}

function buildSummary(input: ProjectInput): string {
  const roomLabel = { 'hotel-room': 'standardowy pokój hotelowy', 'boutique-suite': 'apartament butikowy', 'apartment-bedroom': 'sypialnia apartamentowa' }[input.roomType]
  const budgetLabel = { 'light-refresh': 'ukierunkowane odświeżenie', 'medium-upgrade': 'selektywna modernizacja', 'premium-redesign': 'pełny redesign konceptualny' }[input.budgetTier]

  return `Ten ${roomLabel} prezentuje wyraźny potencjał poprawy poprzez ${budgetLabel}. Główne problemy koncentrują się w jakości oświetlenia, programie tkanin i języku materiałowym mebli — wszystkie możliwe do rozwiązania bez ingerencji konstrukcyjnych. Podstawowe proporcje pokoju są do pracy; brakuje przemyślanej kuracji i dyscypliny materiałowej.`
}

function pickItems<T>(arr: T[], count: number): T[] {
  // Deterministic selection — not random, always consistent per room type
  return arr.slice(0, Math.min(count, arr.length))
}
