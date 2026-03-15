import type { ProjectInput, BudgetTier, DesignStyle, RoomType } from '@/lib/schemas/project'
import type {
  SpaceAnalysis,
  RedesignStrategy,
  StyleDirection,
  FurnitureConcept,
  InvestorSummary,
} from '@/lib/schemas/pipeline'
import { getRoomTypeLabel, getStyleLabel, getBudgetTierLabel } from '@/constants/options'

// ============================================================
// Investor Summary Generator — Module F
// Commercial narrative for hotel owners, investors, GMs
// Tone: senior consultant presenting to board — not a brochure
// ============================================================

const CONCEPT_TITLES: Record<DesignStyle, Record<RoomType, string>> = {
  'organic-modern': {
    'hotel-room':        'Zakorzeniony Pokój — Modernizacja Materiałów Organicznych',
    'boutique-suite':    'Żywy Apartament — Transformacja w Stylu Organic Modern',
    'apartment-bedroom': 'Ciepła Sypialnia — Organiczna Modernizacja Mieszkalna',
  },
  'arhaus-luxury': {
    'hotel-room':        'Przemyślany Pokój — Modernizacja Warstwowego Luksusu',
    'boutique-suite':    'Grand Suite — Redesign w Stylu Amerykańskiego Rzemiosła',
    'apartment-bedroom': 'Hojny Pokój — Warstwowy Program Materiałowy',
  },
  'japandi-hospitality': {
    'hotel-room':        'Cichy Pokój — Japandi Dyscyplina Materiałowa',
    'boutique-suite':    'Spokojny Apartament — Koncepcja Japandi Hospitality',
    'apartment-bedroom': 'Przemyślana Sypialnia — Zdyscyplinowany Spokój Materiałowy',
  },
  'boutique-warm-minimalism': {
    'hotel-room':        'Czysty Pokój — Ciepła Minimalistyczna Modernizacja',
    'boutique-suite':    'Boutique Suite — Redesign Ciepłego Minimalizmu',
    'apartment-bedroom': 'Edycja — Program Butikowego Ciepłego Minimalizmu',
  },
}

const ELEVATOR_PITCHES: Record<BudgetTier, (style: string, room: string) => string> = {
  'light-refresh': (style, room) =>
    `Ukierunkowane odświeżenie w stylu ${style} przekształca ten ${room} ze standardowego w warty recenzji — poprzez jakość tkanin, ciepło oświetlenia i przemyślany styling — bez żadnych fachowców, zmian konstrukcyjnych ani długiego zamknięcia pokoju.`,

  'medium-upgrade': (style, room) =>
    `Selektywna modernizacja mebli w stylu ${style} zastępuje główne elementy komunikujące kategorię budżetową w tym ${room}, dostarczając widoczny awans kategorii, który goście rozpoznają natychmiast — i fotografują.`,

  'premium-redesign': (style, room) =>
    `Pełny redesign w stylu ${style} przez WALABI przekształca ten ${room} w wyróżnik marki: meble wykonane na zamówienie, przemyślany projekt oświetlenia i kompletny program materiałowy, który wyróżnia obiekt spośród każdego konkurenta w swojej kategorii.`,
}

const DESIGN_NARRATIVES: Record<DesignStyle, string> = {
  'organic-modern':
    'Redesign wprowadza ciepło naturalnych materiałów jako swój główny język: biały dąb, len, kamionka i trawertyn zastępują syntetyczne powierzchnie, które obecnie komunikują koszt zamiast starań. Efektem jest pokój, który sprawia wrażenie zmontowanego przez kogoś ze smakiem — nie przez zespół zakupów z limitem budżetowym.',

  'arhaus-luxury':
    'Koncepcja czerpie z tradycji amerykańskiego rzemiosła meblowego: głębokie odcienie drewna, pluszowa tapicerka, warstwowe tkaniny i detale z mosiądzu budują pokój komunikujący inwestycję bez ostentacji. Gość rozumie poziom, zanim przeczyta kartę pokoju.',

  'japandi-hospitality':
    'Redesign stosuje precyzję materiałową jako swoje główne narzędzie: każdy obecny element zasłużył na swoje miejsce, a każdy nieobecny został celowo usunięty. Efektem jest pokój, w którym goście odczuwają jakość poprzez brak kompromisów — len ma ciężar, drewno ma usłojenie, powierzchnie mają fakturę.',

  'boutique-warm-minimalism':
    'Koncepcja tworzy komercyjnie czytelne premium — ciepłe, czyste i autentycznie komfortowe, bez wysiłku ekstremalnego minimalizmu ani kosztów pełnego luksusu. To styl najbardziej prawdopodobny do generowania mocnej fotografii, wysokich ocen recenzji i ponownych rezerwacji w szerokim segmencie gości.',
}

const BUSINESS_IMPACTS: Record<BudgetTier, string> = {
  'light-refresh':
    'Przy inwestycji lekkiego odświeżenia, główny zwrot biznesowy jest fotograficzny: ulepszone zdjęcia pokoi na Booking.com, TripAdvisor i własnej stronie hotelu napędzają konwersję z przeglądania na rezerwację. Wtórny wpływ to percepcja gości przy zameldowaniu — pokój przekracza oczekiwania zamiast je potwierdzać. Oczekiwana poprawa oceny recenzji: 0,2–0,4 gwiazdki w ciągu 60 dni od zakończenia.',

  'medium-upgrade':
    'Średnia modernizacja dostarcza praktyczną reklasyfikację kategorii, nawet jeśli nie oficjalną. Goście rezerwujący pokój 3★ i trafiający na przestrzeń 4★ wystawiają nieproporcjonalnie pozytywne recenzje — i hotel może zacząć odpowiednio wyceniać. Platformy rezerwacyjne nagradzają ulepszoną fotografię lepszą pozycją w wynikach wyszukiwania. Oczekiwana możliwość ADR (średnia dzienna stawka): +8–15% w zależności od rynku. Okres zwrotu przy 70% obłożeniu: zazwyczaj 14–22 miesiące.',

  'premium-redesign':
    'Premium redesign WALABI tworzy aktywa przychodów: pokoje na nowym standardzie osiągają znaczącą premię cenową, przyciągają uwagę mediów, wspierają upselling F&B i spa oraz zapewniają fotograficzną podstawę dla repozycjonowania marki. W hotelach portfelowych flagowo przeprojektowany pokój staje się punktem odniesienia podnoszącym postrzeganą poprzeczkę dla całego obiektu. Oczekiwana możliwość ADR: +20–35% dla przeprojektowanej kategorii. Inwestycja to nie koszt — to program poprawy marży.',
}

const PROPOSED_SCOPES: Record<BudgetTier, string[]> = {
  'light-refresh': [
    'Wymiana pary lamp przy łóżku (dopasowane, ciepłe odcienie)',
    'Kompletny program pościeli: baza lniana lub bawełniana, narzuta, poduszki',
    'Zasłony: sheerski panel zastępujący istniejącą roletę',
    'Styling przy łóżku i na powierzchniach: taca, ceramiczny obiekt, przemyślane akcesoria',
    'Wymiana żarówek sufitowych: ciepła biel 2700K',
  ],
  'medium-upgrade': [
    'Stelaż łóżka i tapicerowany zagłówek: nowy element statement',
    'Dopasowana para stolików nocnych we właściwej skali',
    'Lampa wisząca sufitowa i instalacja ściemniacza',
    'Para lamp przy łóżku zgodna z nową paletą stylistyczną',
    'Wymiana biurka i krzesła biurowego',
    'Kompletny program tkanin: pościel, zasłony, narzuta, poduszki',
    'Jeden element sztuki na ścianę za łóżkiem',
  ],
  'premium-redesign': [
    'Niestandardowy stelaż łóżka i zagłówek WALABI — produkcja na zamówienie',
    'Kompletny program meblowy: łóżko, stoliki nocne, strefa biurkowa, obudowa szafy',
    'Projekt i instalacja oświetlenia: otoczenie, zadaniowe, akcentowe',
    'Stolarka szafy i przechowywania w wykończeniu programu',
    'Kompletny program tkanin: pościel, zasłony, tekstylia łazienkowe',
    'Program sztuki i obiektów: kuratorowany wybór zgodny z historią marki',
    'Wymiana okuć: wszystkie widoczne elementy w spójnej palecie',
    'Zarządzanie projektem WALABI: specyfikacja, produkcja, dostawa, instalacja, odbiór',
  ],
}

const TIMELINES: Record<BudgetTier, string> = {
  'light-refresh':    '5–7 dni roboczych od zamówienia. Nie wymagane zamknięcie pokoju — akcesoria dostarczone i zestylizowane w mniej niż 3 godziny.',
  'medium-upgrade':   '4–6 tygodni czasu realizacji produkcji. Zamknięcie pokoju: 1–2 dni na dostawę i instalację mebli.',
  'premium-redesign': '6–10 tygodni od potwierdzonej specyfikacji. Zamknięcie pokoju: 3–5 dni dla pełnego programu instalacji. Kierownik projektu WALABI na miejscu przez cały czas.',
}

const PERCEPTION_UPGRADES: Record<DesignStyle, string> = {
  'organic-modern':
    'Goście opisują pokój jako „inny niż inne hotele" — zauważają jakość materiałów, fotografują go i udostępniają. Pokój zaczyna generować własny marketing.',

  'arhaus-luxury':
    'Goście odczuwają inwestycję bez informowania ich o niej. Ciężar tapicerki, wykończenie drewna, jakość pościeli — te elementy rejestrują się podświadomie i przynoszą ocenę recenzji, której nie można kupić lepszym telewizorem.',

  'japandi-hospitality':
    'Goście poszukujący premium ciszy — rosnąca i wysokowartościowa demografia — natychmiast rozpoznają język projektu. Przedłużają pobyty, wracają i polecają rówieśnikom, którzy podzielają tę samą preferencję dla jakości materiałów nad dekoracyjnym hałasem.',

  'boutique-warm-minimalism':
    'Pokój fotografuje się czysto, odczytuje jako premium i czuje autentycznie komfortowo. Ta kombinacja — rzadka na rynku 3–4★ — napędza zarówno konwersję online, jak i satysfakcję na miejscu.',
}

const WALABI_ROLE_STATEMENTS: Record<BudgetTier, string> = {
  'light-refresh':
    'WALABI dostarcza, koordynuje i realizuje kompletny program akcesoriów i tkanin. Jeden punkt kontaktu dla pozyskiwania, kontroli jakości i logistyki dostaw.',

  'medium-upgrade':
    'WALABI specyfikuje, pozyskuje i dostarcza program meblowy z koordynacją produkcji. WALABI działa jako partner projektowy i zakupowy hotelu — usuwając złożoność zarządzania wieloma dostawcami.',

  'premium-redesign':
    'WALABI projektuje, produkuje i instaluje kompletny program pokoju. Od początkowej specyfikacji przez produkcję, dostawę i instalację na miejscu — jeden partner, jedna odpowiedzialność. To nie jest relacja dostawcy mebli; to relacja realizacji projektu.',
}

const CTAS: Record<BudgetTier, string> = {
  'light-refresh':
    'Skontaktuj się z WALABI, aby potwierdzić wybór produktów, otrzymać ostateczną wycenę i zaplanować dostawę. Czas realizacji od pierwszej rozmowy do ukończonego pokoju: poniżej dwóch tygodni.',

  'medium-upgrade':
    'Skontaktuj się z WALABI, aby rozpocząć specyfikację. Krótka wizja na miejscu (pół dnia) potwierdza wymiary i wymagania instalacyjne. Produkcja rozpoczyna się po potwierdzeniu zaliczki.',

  'premium-redesign':
    'Zaplanuj wstępną konsultację z zespołem projektowym WALABI. Przedstawiamy pełną propozycję specyfikacji w ciągu pięciu dni roboczych od wizyty na miejscu. Produkcja rozpoczyna się po zatwierdzeniu przez klienta — bez założeń, bez niespodzianek.',
}

export function runInvestorSummary(
  input: ProjectInput,
  spaceAnalysis: SpaceAnalysis,
  strategy: RedesignStrategy,
  style: StyleDirection,
  furniture: FurnitureConcept
): InvestorSummary {
  const styleLabel  = getStyleLabel(input.style)
  const roomLabel   = getRoomTypeLabel(input.roomType).toLowerCase()
  const budgetLabel = getBudgetTierLabel(input.budgetTier)

  return {
    conceptTitle:          CONCEPT_TITLES[input.style][input.roomType],
    elevatorPitch:         ELEVATOR_PITCHES[input.budgetTier](styleLabel, roomLabel),
    designNarrative:       DESIGN_NARRATIVES[input.style],
    businessImpact:        BUSINESS_IMPACTS[input.budgetTier],
    proposedScope:         PROPOSED_SCOPES[input.budgetTier],
    estimatedTimeline:     TIMELINES[input.budgetTier],
    guestPerceptionUpgrade: PERCEPTION_UPGRADES[input.style],
    walabiRoleStatement:   WALABI_ROLE_STATEMENTS[input.budgetTier],
    callToAction:          CTAS[input.budgetTier],
  }
}
