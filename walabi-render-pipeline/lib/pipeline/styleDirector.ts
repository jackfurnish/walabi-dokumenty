import type { ProjectInput, DesignStyle } from '@/lib/schemas/project'
import type { StyleDirection } from '@/lib/schemas/pipeline'

// ============================================================
// Style Director — Module C
// WALABI's 4 design families — each with full palette definition
// Tone: brand creative director, not trend blogger
// ============================================================

type StyleLibrary = Record<DesignStyle, Omit<StyleDirection, 'styleFamily'>>

const STYLE_LIBRARY: StyleLibrary = {

  'organic-modern': {
    styleDescription:
      'Organic Modern channels the material warmth of the natural world through considered, contemporary form. It is not rustic, not Scandinavian, not \"boho\" — it is a grown-up design language that uses texture, weight, and biological curve as its primary tools. In a hotel context, it communicates that someone with taste, not a procurement team, designed this room.',

    colorPalette: {
      primary:   'Warm White — off-white with a faint yellow undertone, never clinical',
      secondary: 'Oat / Greige — warm mid-tone that reads as beige in low light, stone in daylight',
      accent:    'Terracotta or Ochre — one warm earth tone used sparingly as a material moment',
      neutral:   'Warm Charcoal — deep brown-tinted charcoal for grounding elements',
      notes:     'No cool whites, no greys without warmth, no black. Every tone should read as found in nature.',
    },

    materialPalette: {
      wood:    'White Oak — open grain, wire-brushed or natural oil finish. Never varnished or gloss.',
      textile: 'Linen and waffle-weave cotton. Slub texture visible. Pre-washed finish. Earth tones.',
      metal:   'Warm Brass — unlacquered or satin, not mirror-polished. Aged patina acceptable.',
      stone:   'Travertine or Sandstone — honed, not polished. Tactile surface visible.',
      notes:   'Every material should have a story. If it could be in a hardware store catalogue, choose again.',
    },

    decorRules: [
      'Krzywe zamiast kątów prostych wszędzie tam, gdzie pozwala na to konstrukcja — łukowy zagłówek, zaokrąglona krawędź stołu',
      'Jeden obiekt o organicznej formie na strefę: ceramika ręcznie toczona, obiekt z naturalnego drewna, element kamienny',
      'Rośliny jako przemyślane elementy projektu, nie wypełniacze — jeden architektoniczny okaz zamiast wielu małych doniczek',
      'Warstwowe tkaniny: warstwa bazowa, narzuta, jedna lub dwie poduszki. Nigdy więcej.',
      'Sztuka: jeden przemyślany element na ścianę, nie siatka galeryjna. Preferowana fotografia lub abstrakcja.',
      'Powierzchnie powinny oddychać — nie zdekorowane, ale i nie gołe',
      'Okucia w spójnym ciepłym mosiądzu — bez mieszania z chromem',
    ],

    forbiddenPatterns: [
      'Meble z lakierem wysokołyskowym w jakiejkolwiek formie',
      'Wykończenia metalowe chromowane lub w chłodnych tonach',
      'Tkaniny z dużymi wzorami (geometryczne, kwiatowe, w paski)',
      'Dopasowane zestawy mebli od jednego producenta (wygląd \"kompletu\")',
      'Sztuczne rośliny lub suszone kwiaty',
      'Hotelowa biel, jaskrawa biel lub len w chłodnych tonach',
      'Klisze symetrycznych lamp stołowych bez przemyślanego rozmieszczenia',
    ],

    keyReferences: [
      'Aesop retail interiors — material discipline',
      'Noma restaurant, Copenhagen — tactile warmth without decoration',
      'Nobu Hotel interiors — natural material luxury',
    ],

    moodKeywords: ['dotykowy', 'uziemiony', 'ciepły', 'przemyślany', 'żywy', 'nieśpieszny'],
  },

  // ---------------------------------------------------------------

  'arhaus-luxury': {
    styleDescription:
      'Arhaus-inspired luxury translates the American craft furniture tradition into a hospitality context: deep wood tones, plush upholstery, layered textiles, and the kind of material weight that communicates generosity. This is a room where the guest immediately understands the budget tier without being told. It is not showy — it is self-assured.',

    colorPalette: {
      primary:   'Deep Ivory — warm white with a faint amber depth, not cream, not yellow',
      secondary: 'Cognac / Caramel — warm mid-brown used in upholstery and leather accents',
      accent:    'Forest Green or Plum — a rich, darkened accent tone for cushions or throws',
      neutral:   'Dark Walnut — the furniture wood tone anchors the palette as the dominant dark',
      notes:     'The palette should feel like a gentlemen\'s club edited for the 21st century. Rich without red-tone excess.',
    },

    materialPalette: {
      wood:    'Dark Walnut or Blackened Oak — substantial grain, smooth to matte finish, not wax.',
      textile: 'Velvet and performance bouclé — upholstery in cognac, cream, or forest. Full-weight curtains.',
      metal:   'Aged Brass or Oil-Rubbed Bronze — visible, but used with intention. Not decorative excess.',
      stone:   'Marble — Calacatta or similar veined white for surface accents only. Not flooring.',
      notes:   'Weight is everything. Every element should feel like it took effort to source and install.',
    },

    decorRules: [
      'Zagłówek musi być ponadwymiarowy i tapicerowany — to główna architektoniczna wypowiedź pokoju',
      'Warstwowe tkaniny są niezbędne: prześcieradło bazowe, narzuta lub kołdra, narzuta dekoracyjna, minimum dwie poduszki',
      'Dzieła w ciemnej lub złoconej ramie — wzmacniają poczucie trwałości',
      'Książki lub obiekty na powierzchniach — pokój powinien sugerować życie przeżyte, nie showroom wystawiony',
      'Zasłony pełnej długości tylko do sufitu — nic, co unosi się nad poziomem podłogi',
      'Jeden element oświetleniowy statement — ponadwymiarowa lampa wisząca lub rzeźbiarska lampa podłogowa',
      'Program okuć mosiężnych: klamka, wieszak na ręcznik, listwa obrazowa — spójne w całym pomieszczeniu',
    ],

    forbiddenPatterns: [
      'Meble z płyty lub laminatu w jakiejkolwiek formie',
      'Okucia chromowane — całkowicie niezgodne z tą paletą',
      'Minimalistyczna powściągliwość — ten styl wymaga hojnego warstwowania',
      'Biała lub chłodnoodcieniowa tapicerka jako główna tkanina',
      'Rolety lub syntetyczne zasłony',
      'Gołe ściany — wymagane dzieło, lustro lub akcentowe wykończenie',
      'Korporacyjna konfiguracja biurka \"business hotel\"',
    ],

    keyReferences: [
      'Arhaus flagship stores — upholstery weight and layering',
      'The NoMad Hotel, New York — plush layered luxury',
      'Rosewood properties — craft material story',
    ],

    moodKeywords: ['hojny', 'pluszowy', 'pewny siebie', 'rzemieślniczy', 'ciężki', 'warstwowy'],
  },

  // ---------------------------------------------------------------

  'japandi-hospitality': {
    styleDescription:
      'Japandi Hospitality is not minimalism — it is intentional restraint. Every element present is present because it earned its place. The material language is precise: natural wood, linen, matte stone, and quiet metal. In a hotel context, this style speaks to a guest who finds luxury in the absence of noise — and who will write reviews mentioning \"the quality of calm\" rather than the size of the TV.',

    colorPalette: {
      primary:   'Stone White — a warm, slightly greyed white. Architectural, not domestic.',
      secondary: 'Warm Ash — the primary wood tone; pale, matte, never yellow-toned',
      accent:    'Sage or Muted Clay — a single warm or cool accent tone used once per room',
      neutral:   'Charcoal Matte — deep, dry charcoal for a single grounding element (frame, lamp base)',
      notes:     'The palette is quiet. If a colour is asking for attention, it does not belong here.',
    },

    materialPalette: {
      wood:    'Ash or Maple — light, straight grain, matte oil finish. Joinery-precise edges.',
      textile: 'Stone-washed linen — no pattern, no sheen. Dried herbs, warm sand, aged slate tones.',
      metal:   'Matte Black or Gunmetal — used sparingly. Visible only as a precise detail, not decor.',
      stone:   'Honed Concrete or Slate tile — matte surface, no gloss. Texture visible but not rough.',
      notes:   'Every material should look like it was chosen after five others were rejected.',
    },

    decorRules: [
      'Jeden obiekt na powierzchnię — jeśli są dwa, jeden musi zostać usunięty',
      'Asymetria preferowana nad symetrią wszędzie tam, gdzie pozwala na to konstrukcja',
      'Wysokość łóżka nisko przy podłodze — platforma lub rama z minimalnymi nogami wzmacnia poziomy spokój',
      'Zasłony do sufitu w monochromatycznym lnie — bez wzoru, bez widocznych okuć',
      'Sztuka: jeden element, przemyślane rozmieszczenie, znaczna przestrzeń wokół niego',
      'Ceramiczny lub kamienny obiekt przy łóżku — zastępuje bukiet kwiatów lub dekoracyjny nadmiar',
      'Całe przechowywanie ukryte — widoczny bałagan jest błędem projektowym na tym poziomie',
    ],

    forbiddenPatterns: [
      'Nadmierna dekoracja — w razie wątpliwości, usuń to',
      'Ciepłe mosiężne lub złote okucia — niezgodne z tą paletą',
      'Wzór na jakiejkolwiek głównej powierzchni tekstylnej',
      'Tapicerowane zagłówki w bogatych lub jasnych odcieniach',
      'Wiele dzieł na jednej ścianie',
      'Dopasowane zestawy lamp odczytywane jako symetria z katalogu hotelowego',
      'Ciepłe odcienie drewna (orzech, dąb z żółtym podtonem)',
    ],

    keyReferences: [
      'Muji Hotel, Tokyo — material honesty',
      'Ace Hotel Kyoto — Japanese craft meeting hospitality restraint',
      'Zaborin Ryokan — considered object placement',
    ],

    moodKeywords: ['precyzyjny', 'cichy', 'szczery', 'nieśpieszny', 'zasłużony', 'spokojny'],
  },

  // ---------------------------------------------------------------

  'boutique-warm-minimalism': {
    styleDescription:
      'Boutique Warm Minimalism occupies the commercially accessible centre of the premium design spectrum. It is warm enough for guests who find pure minimalism cold, restrained enough for guests who find maximalism exhausting. In a hotel context, it is the style most likely to generate strong photography and positive online reviews — because it photographs clean, reads as premium, and feels genuinely comfortable to inhabit.',

    colorPalette: {
      primary:   'Warm Cream — softer than white, lighter than ivory. Reads as fresh, not aged.',
      secondary: 'White Oak (material colour) — the pale warm wood tone as visual anchor',
      accent:    'Terracotta or Dusty Rose — one warm accent, used in textile only',
      neutral:   'Warm Stone — mid-tone beige-grey for balancing surfaces',
      notes:     'The palette must work well in daylight photography. Nothing that reads cold or clinical on camera.',
    },

    materialPalette: {
      wood:    'White Oak — clean grain, light, matte finish. The most commercially versatile warm wood.',
      textile: 'Cotton percale and linen-cotton mix. Smooth base layers, textured accent pieces.',
      metal:   'Brushed Brass or Satin Nickel — soft, not shiny. Subtle hardware programme.',
      stone:   'Limestone or Terrazzo — warm tone, honed finish. Used as a material moment, not throughout.',
      notes:   'This palette should be easy to source and deliver — commercial availability is a feature, not a compromise.',
    },

    decorRules: [
      'Czyste powierzchnie z jednym przemyślanym obiektem — nie przestylingować, nie pozostawiać pustych',
      'Zagłówek obecny i we właściwej skali — tapicerowany w kremie, owsie lub ciepłej bieli',
      'Pościel gładka, świeża i właściwie wyprasowana — jakość fotograficzna to kluczowy efekt',
      'Jedna roślina lub element organiczny — dodaje życia bez wizualnej złożoności',
      'Sztuka: jeden element na ścianę, prosta rama, spokojny temat',
      'Zasłony w pełnym splocie — warstwa sheerska do złagodzenia światła, zaciemniające z tyłu',
      'Widoczna podłoga drewniana lub dywany w ciepłych odcieniach — zimne kafle powinny być przykryte w miarę możliwości',
    ],

    forbiddenPatterns: [
      'Mocno kontrastowe wzory na jakiejkolwiek powierzchni',
      'Chłodne szarości, błękity lub fiolety — paleta musi pozostać ciepła',
      'Elementy industrialne: odsłonięte rury, gołe beton, surowy metal',
      'Nadmiernie zdobne lub dekoracyjne okucia',
      'Ciemne, ciężkie meble wizualnie ściskające pokój',
      'Neonowe lub mocno kolorowe dzieła',
      'Zbyt kuratorowany styling \"Instagram-trap\" — musi czuć się autentycznie, nie wyreżyserowanie',
    ],

    keyReferences: [
      '1 Hotels — warm material simplicity',
      'The LINE Hotel — approachable premium',
      'Scandic Hotels premium tier — warm Scandinavian hospitality',
    ],

    moodKeywords: ['czysty', 'ciepły', 'przystępny', 'świeży', 'autentyczny', 'komfortowy'],
  },
}

export function runStyleDirector(input: ProjectInput): StyleDirection {
  const styleData = STYLE_LIBRARY[input.style]
  const styleFamilyLabel: Record<DesignStyle, string> = {
    'organic-modern':           'Organic Modern',
    'arhaus-luxury':            'Arhaus-Inspired Luxury',
    'japandi-hospitality':      'Japandi Hospitality',
    'boutique-warm-minimalism': 'Boutique Warm Minimalism',
  }

  return {
    styleFamily:    styleFamilyLabel[input.style],
    ...styleData,
  }
}
