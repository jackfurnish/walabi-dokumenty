import type { ProjectInput, BudgetTier, DesignStyle } from '@/lib/schemas/project'
import type { SpaceAnalysis, RedesignStrategy, FurnitureRecommendation } from '@/lib/schemas/pipeline'

// ============================================================
// Redesign Strategist — Module B
// Budget-driven, style-aware strategy
// Tone: senior interior project manager
// ============================================================

const DESIGN_DIRECTIONS: Record<DesignStyle, string> = {
  'organic-modern':            'Zakorzenione ciepło — wprowadzenie naturalnych materiałów i organicznych form tworzy pokój, który sprawia autentycznie zamieszkałe i premium wrażenie, nie zmontowane z katalogu.',
  'arhaus-luxury':             'Warstwowy luksus w stylu amerykańskim — głębokie drewna, pluszowe tapicerki i akcenty z mosiądzu budują pokój komunikujący inwestycję bez ostentacji.',
  'japandi-hospitality':       'Zdyscyplinowany spokój — precyzyjne wybory materiałowe i powściągliwy język form tworzą przestrzeń, w której każdy element zasługuje na swoje miejsce.',
  'boutique-warm-minimalism':  'Edytowany komfort — minimalistyczna struktura z ciepłymi momentami materiałowymi: pokój powinien czuć się jak przemyślane schronienie, nie neutralna pustka.',
}

const GUEST_EMOTIONS: Record<DesignStyle, string> = {
  'organic-modern':           'Wypoczęty, uziemiony, daleko od korporacyjnej sterylności',
  'arhaus-luxury':            'Rozpieszczony, pod wrażeniem, chętny do przedłużenia pobytu',
  'japandi-hospitality':      'Spokojny, skupiony, wdzięczny za cichą jakość',
  'boutique-warm-minimalism': 'Swobodny, przytulny bez bałaganu, cicho zadowolony',
}

const LIGHTING_RECS: Record<BudgetTier, string[]> = {
  'light-refresh': [
    'Natychmiastowa wymiana żarówek w oprawie sufitowej na ciepłą biel (2700K)',
    'Wprowadzenie dopasowanych lamp stojących przy łóżku z ciepłymi kloszami',
    'Dodanie prostej lampki do czytania lub kinkietu, jeśli pozwala na to miejsce przy łóżku',
  ],
  'medium-upgrade': [
    'Wymiana oprawy sufitowej na przemyślaną lampę wiszącą lub plafon zgodny ze stylem',
    'Określenie lamp przy łóżku jako dopasowanej pary — właściwa skala do nowego łóżka',
    'Dodanie funkcji ściemniacza do głównego obwodu',
    'Rozważenie oświetlenia z karnisza lub listwy LED za zagłówkiem dla ambientowego rozmycia',
  ],
  'premium-redesign': [
    'Kompleksowy projekt oświetlenia: otoczenie (karnisz/wisząca), zadaniowe (biurko, czytanie), akcentowe (punkty na dzieła)',
    'Ciepła listwa LED za zagłówkiem — ściemniana do 10%',
    'Lampa podłogowa w strefie wypoczynkowej lub do czytania',
    'Wymiana wszystkich wyłączników i gniazdek na premium wykończenie zgodne z paletą okuć',
  ],
}

const TEXTILE_RECS: Record<DesignStyle, string[]> = {
  'organic-modern': [
    'Naturalna lniana pościel w ciepłej bieli lub owsie — nie hotelowej bieli',
    'Fakturowana narzuta u stóp łóżka: bawełna w splocie waflowym lub gruba dzianina',
    'Dodatkowa warstwa z szeerskiej zasłony za istniejącą roletą dla złagodzonej jakości światła',
    'Dwie poduszki akcentowe w dopełniającym ziemistym odcieniu',
  ],
  'arhaus-luxury': [
    'Pościel z bawełny satynowej o wysokiej liczbie nitek z kontrastowym obszyciem — głęboka kość słoniowa lub szampan',
    'Narzuta z aksamitu lub matelassé w ciepłym kolorze koniaku lub leśnej zieleni',
    'Pełnej długości podszyte zasłony z obciążonym rąbkiem — zamiast syntetycznej rolety',
    'Zestaw trzech poduszek z mieszanką faktur: aksamit, tkanina, jednolita',
  ],
  'japandi-hospitality': [
    'Prana kamieniem pościel lniana — bez wzoru, bez jaskrawej bieli',
    'Pojedyncza smukła narzuta w stonowanej szałwii lub ciepłej glinie',
    'Zasłony lniane w stylu pinch-pleat do sufitu — maksymalna iluzja wysokości',
    'Tylko jeden akcent poduszkowy — zainteresowanie materiałem ponad ilością',
  ],
  'boutique-warm-minimalism': [
    'Pościel bawełniana percale w ciepłym kremie — gładka i świeża',
    'Narzuta z bawełnianej dzianiny lub lekkiej wełny — złożona precyzyjnie u stóp',
    'System podwójnych zasłon sheer + zaciemniające dla elastycznej kontroli światła',
    'Maksymalnie dwie poduszki — jednolite odcienie, jakościowa tkanina',
  ],
}

type FurnitureRecsMap = Record<BudgetTier, FurnitureRecommendation[]>

const FURNITURE_RECS: FurnitureRecsMap = {
  'light-refresh': [
    { item: 'Bed frame', action: 'keep', reason: 'Konstrukcyjnie sprawny; modernizacja tkaniny zagłówka wystarczająca na tym poziomie' },
    { item: 'Headboard cover / textile pad', action: 'replace', reason: 'Główny element wiodący — nowy panel tapicerowany dramatycznie zmienia pierwsze wrażenie' },
    { item: 'Bedside lamps', action: 'replace', reason: 'Obecne oprawy to najtańszy hotel standard; para lamp to wymiana oświetlenia o najwyższym ROI' },
    { item: 'Bedding set', action: 'replace', reason: 'Natychmiastowy sygnał jakości dla gości — obecna tkanina syntetyczna widoczna na zdjęciach' },
    { item: 'Ceiling fixture', action: 'keep', reason: 'Niekrytyczne na tym poziomie; wymiana żarówki na 2700K przynosi poprawę bez elektryka' },
    { item: 'Decorative tray + objects', action: 'add', reason: 'Głębia stylingowa przy łóżku dla fotografii — obecnie puste' },
    { item: 'Window curtain panel', action: 'replace', reason: 'Obecna roleta jest instytucjonalna; panel z sheerskiej tkaniny dodaje miękkości niskim kosztem' },
  ],
  'medium-upgrade': [
    { item: 'Bed frame + headboard', action: 'replace', reason: 'Centralny element — obecny natychmiast komunikuje kategorię budżetową' },
    { item: 'Bedside tables', action: 'replace', reason: 'Istniejące są zbyt małe i niedopasowane; potrzebna para we właściwej skali do nowego łóżka' },
    { item: 'Bedside lamps', action: 'replace', reason: 'Wymiana jako dopasowana para zgodna z nowym stylem mebli' },
    { item: 'Desk / work surface', action: 'replace', reason: 'Powierzchnia laminatowa niezgodna z uaktualnionym językiem materiałowym pokoju' },
    { item: 'Desk chair', action: 'replace', reason: 'Standardowe krzesło hotelowe podważa zmodernizowane biurko; potrzebna prosta tapicerowana opcja' },
    { item: 'Ceiling fixture', action: 'replace', reason: 'Lampa wisząca lub quality plafon zakotwicza zmodernizowaną paletę' },
    { item: 'Minibar / shelf unit', action: 'keep', reason: 'Wymóg funkcjonalny; przestrylizowanie powierzchni obiektami na tym poziomie' },
    { item: 'Full textile programme', action: 'add', reason: 'Pościel, zasłony, narzuta, poduszki — dopełnienie wizualnej modernizacji' },
    { item: 'Artwork — one piece', action: 'add', reason: 'Kotew ściany za łóżkiem; zapobiega temu, by świeżo zmodernizowany pokój wyglądał pusto' },
  ],
  'premium-redesign': [
    { item: 'Bed frame — custom WALABI', action: 'replace', reason: 'Sygnaturowy element wiodący; niestandardowe wymiary i tapicerka zgodna z briefem' },
    { item: 'Bedside tables — matched pair', action: 'replace', reason: 'Niestandardowe lub dobrane elementy skoordynowane z językiem projektu łóżka' },
    { item: 'Wardrobe surround / panel', action: 'replace', reason: 'Istniejące wykończenie laminatowe niezgodne z premium paletą; wymiana na fornir lub lakier' },
    { item: 'Desk + storage unit', action: 'replace', reason: 'Pełny redesign strefy biurowej: blat, półka, zarządzanie kablami zintegrowane' },
    { item: 'Desk chair', action: 'replace', reason: 'Jakościowy tapicerowany element — widoczny na zdjęciach pokoju' },
    { item: 'All lighting fixtures', action: 'replace', reason: 'Kompleksowy projekt oświetlenia: wisząca, przy łóżku, biurko, akcentowe' },
    { item: 'Minibar unit', action: 'replace', reason: 'Integracja lub przeniesienie do niestandardowej stolarki — usunięcie instytucjonalnego urządzenia z widoku' },
    { item: 'Full textile programme', action: 'add', reason: 'Premium pościel, podszyte zasłony, narzuta, zestaw poduszek, tekstylia łazienkowe' },
    { item: 'Art + object programme', action: 'add', reason: 'Kuratorowane dzieła, lustro, obiekty statement — warstwa historii marki hotelu' },
    { item: 'All hardware', action: 'replace', reason: 'Klamki, wieszaki, okucia łazienkowe — spójność detali krytyczna na tym poziomie' },
  ],
}

const COST_RATIOS: Record<BudgetTier, RedesignStrategy['costEffortRatio']> = {
  'light-refresh':  'low-cost-high-impact',
  'medium-upgrade': 'medium-investment',
  'premium-redesign': 'premium-full-scope',
}

const IMPACT_STATEMENTS: Record<BudgetTier, string> = {
  'light-refresh':    'Znacząca poprawa jakości fotografii online i postrzeganego poziomu pokoju — osiągalna bez żadnych fachowców na miejscu.',
  'medium-upgrade':   'Widoczny awans kategorii na zdjęciach gości Booking.com i TripAdvisor. Pokój powinien wyglądać jako autentyczne 4★, a nie aspiracyjne 3★.',
  'premium-redesign': 'Transformacyjny — pokój staje się aktywem marki i generatorem przychodów. Niestandardowe elementy WALABI wyróżniają obiekt spośród konkurujących hoteli w kategorii.',
}

const PRIORITY_ACTIONS: Record<BudgetTier, string[]> = {
  'light-refresh': [
    'Zamówienie pary lamp przy łóżku (dopasowanych) — natychmiastowy montaż bez elektryka',
    'Wymiana pościeli na alternatywę z naturalnego włókna w ciepłej bieli',
    'Wymiana żarówek sufitowych na ciepłą biel 2700K (ta sama oprawa, zerowy koszt)',
    'Dodanie zasłony o fakturze lnu nad istniejącą roletą',
    'Zestylizowanie tacy przy łóżku z 2–3 przemyślanymi obiektami do fotografii',
  ],
  'medium-upgrade': [
    'Określenie i zamówienie niestandardowego lub dobranego stelaża łóżka z zagłówkiem — najdłuższy czas realizacji',
    'Wybór dopasowanej pary stolików nocnych we właściwej skali do nowego łóżka',
    'Zamówienie lampy wiszącej lub quality plafonu',
    'Zamówienie kompletnego programu tkanin skoordynowanego z nową paletą',
    'Pozyskanie jednego dzieła sztuki na ścianę za łóżkiem przed sesją fotograficzną',
    'Wymiana biurka i krzesła zadaniowego dla spójności materiałowej',
  ],
  'premium-redesign': [
    'Zlecenie niestandardowego stelaża łóżka WALABI — uzgodnienie wymiarów, materiału, wykończenia',
    'Kompletna specyfikacja programu meblowego przed złożeniem jakichkolwiek zamówień',
    'Finalizacja projektu oświetlenia z wykwalifikowanym projektantem — pozwolenie jeśli wymagane prace w karniszu',
    'Brief dla konsultanta tekstylnego lub pozyskanie kompletnego programu przez sieć WALABI',
    'Brief art direction: uzgodnienie programu dzieł i planu instalacji',
    'Zaplanowanie sekwencji instalacji: najpierw oświetlenie, meble, tkaniny, obiekty',
  ],
}

export function runRedesignStrategist(
  input: ProjectInput,
  spaceAnalysis: SpaceAnalysis
): RedesignStrategy {
  return {
    designDirection:          DESIGN_DIRECTIONS[input.style],
    targetGuestEmotion:       GUEST_EMOTIONS[input.style],
    furnitureRecommendations: FURNITURE_RECS[input.budgetTier],
    lightingRecommendations:  LIGHTING_RECS[input.budgetTier],
    textileRecommendations:   TEXTILE_RECS[input.style],
    costEffortRatio:          COST_RATIOS[input.budgetTier],
    estimatedImpact:          IMPACT_STATEMENTS[input.budgetTier],
    priorityActions:          PRIORITY_ACTIONS[input.budgetTier],
    summary:                  buildStrategySummary(input),
  }
}

function buildStrategySummary(input: ProjectInput): string {
  const styleNote: Record<string, string> = {
    'organic-modern':           'ciepło naturalnych materiałów i organiczne formy',
    'arhaus-luxury':            'warstwowy luksus i głębię materiałową',
    'japandi-hospitality':      'precyzję materiałową i zdyscyplinowany spokój',
    'boutique-warm-minimalism': 'edytowany komfort i ciepłe powściągnięcie',
  }
  const budgetFrame: Record<string, string> = {
    'light-refresh':    'W ramach budżetu lekkiego odświeżenia, strategia koncentruje inwestycję na trzech punktach o najwyższym ROI: ciepło oświetlenia, jakość tkanin i jeden wiodący element.',
    'medium-upgrade':   'Średnia modernizacja pozwala na fundamentalną zmianę języka meblowego pokoju — wymianę głównych elementów, które obecnie komunikują kategorię budżetową.',
    'premium-redesign': 'Premium redesign zleca pełne możliwości WALABI: niestandardowe meble, przemyślany projekt oświetlenia i kompletny program materiałowy — tworząc pokój, który staje się wyróżnikiem marki.',
  }

  return `${budgetFrame[input.budgetTier]} Kierunek projektowy stawia na ${styleNote[input.style]}, przy czym każda decyzja służy celowi poprawy percepcji gości i jakości fotografii pokoju.`
}
