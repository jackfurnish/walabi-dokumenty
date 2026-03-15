// ============================================================
// WALABI Render Pipeline — UI Translations (PL / EN)
// ============================================================

export type Lang = 'pl' | 'en'

export const translations = {
  // ---- Navigation / Header ----
  nav: {
    projects:   { pl: 'Projekty',       en: 'Projects' },
    newProject: { pl: 'Nowy projekt',   en: 'New Project' },
  },

  // ---- Header ----
  header: {
    renderPipeline: { pl: 'Render Pipeline', en: 'Render Pipeline' },
  },

  // ---- Footer ----
  footer: {
    tagline: { pl: 'Meble na zamówienie & wnętrza hotelowe', en: 'Bespoke Furniture & Hospitality Interiors' },
    version:  { pl: 'Render Pipeline MVP v0.1',              en: 'Render Pipeline MVP v0.1' },
  },

  // ---- Landing page ----
  landing: {
    overline:         { pl: 'WALABI · Render Pipeline', en: 'WALABI · Render Pipeline' },
    heroTitle1:       { pl: 'Przekształć pokoje hotelowe', en: 'Transform Hotel Rooms' },
    heroTitle2:       { pl: 'w koncepcje gotowe na inwestycję', en: 'into Investment-Ready Concepts' },
    heroDescription:  {
      pl: 'Wgraj jedno zdjęcie pokoju. Otrzymaj kompletną strategię redesignu, koncepcję mebli na zamówienie, prompt do renderowania i podsumowanie inwestorskie — wygenerowane przez ustrukturyzowany pipeline AI zgodny ze standardami designu WALABI.',
      en: 'Upload one existing room photo. Receive a complete redesign strategy, bespoke furniture concept, photorealistic render prompt, and investor-facing summary — all generated through a structured AI pipeline aligned with WALABI\'s design standards.',
    },
    ctaStartRedesign: { pl: 'Rozpocznij redesign', en: 'Start a Redesign' },
    ctaViewProjects:  { pl: 'Zobacz projekty',     en: 'View Projects' },
    existingRoom:     { pl: 'Istniejący pokój',    en: 'Existing Room' },
    strategyLayer:    { pl: 'Warstwa strategii',   en: 'Strategy Layer' },
    redesignConcept:  { pl: 'Koncepcja redesignu', en: 'Redesign Concept' },
    scopeOverline:    { pl: 'Zakres',              en: 'Scope' },
    scopeTitle:       { pl: 'Jeden skoncentrowany przypadek użycia', en: 'One focused use case' },
    scopeBody:        {
      pl: 'To narzędzie jest zaprojektowane dla jednego, komercyjnie wartościowego scenariusza: ',
      en: 'This tool is designed for a single, commercially valuable scenario: ',
    },
    scopeHighlight:   {
      pl: 'redesign pokojów hotelowych 3–4★ bez remontu strukturalnego.',
      en: 'redesigning 3–4★ hotel rooms without structural renovation.',
    },
    scopeBodyEnd: {
      pl: ' To nie jest generyczna platforma do projektowania wnętrz. To narzędzie sprzedażowe i pre-produkcyjne dla WALABI do wsparcia klientów hotelowych, demonstracji ekspertyzy i przyspieszenia rozmów projektowych.',
      en: ' It is not a generic interior design platform. It is a sales and pre-production tool for WALABI to support hotel clients, demonstrate expertise, and accelerate project conversations.',
    },
    howItWorksOverline: { pl: 'Jak to działa',       en: 'How it works' },
    howItWorksTitle:    { pl: 'Pipeline pięciu modułów', en: 'Five-module pipeline' },
    ctaBannerTitle:     { pl: 'Gotowy wygenerować swoją pierwszą koncepcję?', en: 'Ready to generate your first concept?' },
    ctaBannerBody:      {
      pl: 'Wgraj zdjęcie pokoju i otrzymaj kompletny pakiet gotowy na inwestora w mniej niż minutę.',
      en: 'Upload a room photo and receive a complete investor-ready package in under a minute.',
    },
  },

  // ---- Pipeline steps (landing page) ----
  pipelineSteps: {
    uploadTitle:       { pl: 'Wgraj i skonfiguruj',        en: 'Upload & Configure' },
    uploadDesc:        {
      pl: 'Dostarcz zdjęcie istniejącego pokoju hotelowego. Wybierz typ pokoju, docelowy styl i poziom budżetu.',
      en: 'Provide a photo of the existing hotel room. Choose room type, target style, and budget tier.',
    },
    spaceTitle:        { pl: 'Analiza przestrzeni',        en: 'Space Analysis' },
    spaceDesc:         {
      pl: 'Pipeline identyfikuje problemy wizualne, punkty centralne, jakość oświetlenia i możliwości redesignu.',
      en: 'The pipeline identifies visual issues, focal points, lighting quality, and redesign opportunities.',
    },
    strategyTitle:     { pl: 'Strategia redesignu',        en: 'Redesign Strategy' },
    strategyDesc:      {
      pl: 'Generowany jest ustrukturyzowany plan — co zachować, wymienić lub dodać — z logiką kosztów i nakładu pracy.',
      en: 'A structured plan is generated — what to keep, replace, or add — with cost-effort logic.',
    },
    renderTitle:       { pl: 'Pakiet promptów renderowania', en: 'Render Prompt Package' },
    renderDesc:        {
      pl: 'Kompletny, gotowy do produkcji master prompt do fotorealistycznego generowania obrazów.',
      en: 'A complete, production-ready render master prompt for photorealistic image generation.',
    },
    investorTitle:     { pl: 'Podsumowanie inwestorskie',  en: 'Investor Summary' },
    investorDesc:      {
      pl: 'Zwięzła, przekonująca narracja wyjaśniająca wpływ na biznes i poprawę postrzegania przez gości.',
      en: 'A concise, persuasive narrative explaining business impact and guest perception upgrade.',
    },
  },

  // ---- Projects page ----
  projects: {
    overline:         { pl: 'Biblioteka projektów',    en: 'Project Library' },
    heading:          { pl: 'Twoje koncepcje redesignu', en: 'Your Redesign Concepts' },
    noProjectsYet:    {
      pl: 'Brak projektów. Zacznij od stworzenia swojej pierwszej koncepcji redesignu.',
      en: 'No projects yet. Start by creating your first redesign concept.',
    },
    projectsSaved:    { pl: 'projektów zapisanych lokalnie', en: 'projects saved locally' },
    projectSaved:     { pl: 'projekt zapisany lokalnie',     en: 'project saved locally' },
    loadDemo:         { pl: 'Wczytaj demo',            en: 'Load Demo' },
    newProject:       { pl: 'Nowy projekt',             en: 'New Project' },
    emptyTitle:       { pl: 'Brak koncepcji redesignu', en: 'No redesign concepts yet' },
    emptyBody:        {
      pl: 'Wgraj zdjęcie pokoju hotelowego i skonfiguruj parametry redesignu, aby wygenerować swój pierwszy pakiet koncepcji.',
      en: 'Upload a hotel room photo and configure the redesign parameters to generate your first concept package.',
    },
    viewDemoProject:  { pl: 'Zobacz projekt demo',      en: 'View Demo Project' },
    startRedesign:    { pl: 'Rozpocznij redesign',       en: 'Start a Redesign' },
    deleteConfirm:    { pl: 'Usunąć ten projekt? Tej operacji nie można cofnąć.', en: 'Delete this project? This cannot be undone.' },
    projectDeleted:   { pl: 'Projekt usunięty',          en: 'Project deleted' },
    demoLoaded:       { pl: 'Projekt demo wczytany',     en: 'Demo project loaded' },
    demoAlreadyIn:    { pl: 'Projekt demo już w bibliotece', en: 'Demo project already in library' },
  },

  // ---- Project detail page ----
  project: {
    backToProjects: { pl: 'Wróć do projektów', en: 'Back to Projects' },
    notFound:       { pl: 'Projekt nie znaleziony', en: 'Project not found' },
  },

  // ---- New Project page ----
  newProject: {
    overline:   { pl: 'Nowy projekt',               en: 'New Project' },
    heading:    { pl: 'Rozpocznij koncepcję redesignu', en: 'Start a Redesign Concept' },
    subheading: {
      pl: 'Wgraj zdjęcie pokoju hotelowego i skonfiguruj parametry redesignu. Pipeline wygeneruje kompletny pakiet koncepcji w kilka sekund.',
      en: 'Upload a photo of the hotel room and configure the redesign parameters. The pipeline will generate a complete concept package in seconds.',
    },
  },

  // ---- NewProjectForm ----
  form: {
    step1of5:     { pl: 'Krok 1 z 5', en: 'Step 1 of 5' },
    step2of5:     { pl: 'Krok 2 z 5', en: 'Step 2 of 5' },
    step3of5:     { pl: 'Krok 3 z 5', en: 'Step 3 of 5' },
    step4of5:     { pl: 'Krok 4 z 5', en: 'Step 4 of 5' },
    step5of5:     { pl: 'Krok 5 z 5', en: 'Step 5 of 5' },
    stepPhoto:    { pl: 'Zdjęcie pokoju',   en: 'Room Photo' },
    stepRoom:     { pl: 'Typ pokoju',       en: 'Room Type' },
    stepStyle:    { pl: 'Styl designu',     en: 'Design Style' },
    stepBudget:   { pl: 'Poziom budżetu',   en: 'Budget Tier' },
    stepConfirm:  { pl: 'Potwierdź',        en: 'Confirm' },
    uploadTitle:  { pl: 'Wgraj zdjęcie pokoju', en: 'Upload a Room Photo' },
    uploadBody:   {
      pl: 'Dostarcz wyraźne zdjęcie istniejącego pokoju hotelowego. Zostanie ono przeanalizowane pod kątem możliwości redesignu.',
      en: 'Provide a clear photo of the existing hotel room. This will be analyzed for redesign opportunities.',
    },
    uploadRequired: {
      pl: 'Proszę wgrać przynajmniej jedno zdjęcie pokoju, aby kontynuować.',
      en: 'Please upload at least one room photo to continue.',
    },
    uploadRequiredSubmit: {
      pl: 'Wymagane jest przynajmniej jedno zdjęcie pokoju.',
      en: 'At least one room photo is required.',
    },
    roomTypeTitle:  { pl: 'Typ pokoju',        en: 'Room Type' },
    roomTypeBody:   { pl: 'Wybierz typ przestrzeni, którą chcesz przeprojektować.', en: 'Select the type of space you want to redesign.' },
    styleTitle:     { pl: 'Styl designu',      en: 'Design Style' },
    styleBody:      { pl: 'Wybierz kierunek estetyczny dla redesignu.', en: 'Choose the aesthetic direction for the redesign.' },
    budgetTitle:    { pl: 'Poziom budżetu',     en: 'Budget Tier' },
    budgetBody:     { pl: 'Wybierz zakres inwestycji dla tego redesignu.', en: 'Select the investment scope for this redesign.' },
    confirmTitle:   { pl: 'Potwierdź i generuj', en: 'Confirm & Generate' },
    confirmBody:    { pl: 'Nazwij projekt i uruchom pipeline.', en: 'Name your project and start the pipeline.' },
    roomLabel:      { pl: 'Pokój',   en: 'Room' },
    styleLabel:     { pl: 'Styl',    en: 'Style' },
    budgetLabel:    { pl: 'Budżet',  en: 'Budget' },
    projectName:    { pl: 'Nazwa projektu', en: 'Project Name' },
    optional:       { pl: '(opcjonalne)',   en: '(optional)' },
    projectNamePlaceholder: { pl: 'np. Grand Majestic · Japandi Suite', en: 'e.g. Grand Majestic · Japandi Suite' },
    notes:          { pl: 'Notatki', en: 'Notes' },
    notesPlaceholder: {
      pl: 'Wszelkie szczególne ograniczenia, preferencje klienta lub kontekst...',
      en: 'Any specific constraints, client preferences, or context...',
    },
    back:           { pl: 'Wstecz',  en: 'Back' },
    continue:       { pl: 'Dalej',   en: 'Continue' },
    generate:       { pl: 'Generuj koncepcję redesignu', en: 'Generate Redesign Concept' },
    projectCreated: { pl: 'Projekt utworzony', en: 'Project created' },
    pipelineRunning: { pl: 'Uruchamianie pipeline redesignu…', en: 'Running redesign pipeline…' },
  },

  // ---- ProjectCard ----
  card: {
    noImage: { pl: 'Brak zdjęcia', en: 'No image' },
    open:    { pl: 'Otwórz',       en: 'Open' },
    delete:  { pl: 'Usuń',         en: 'Delete' },
  },

  // ---- ResultsWorkspace ----
  workspace: {
    roomLabel:    { pl: 'Pokój',   en: 'Room' },
    styleLabel:   { pl: 'Styl',    en: 'Style' },
    budgetLabel:  { pl: 'Budżet',  en: 'Budget' },
    exportMarkdown:    { pl: 'Eksportuj jako Markdown', en: 'Export as Markdown' },
    copyFullPackage:   { pl: 'Kopiuj cały pakiet',      en: 'Copy full package' },
    noRoomPhoto:       { pl: 'Brak zdjęcia pokoju',     en: 'No room photo uploaded' },
    pipelineFailed:    { pl: 'Pipeline nieudany',        en: 'Pipeline failed' },
    pipelineError:     {
      pl: 'Wystąpił błąd podczas generowania pakietu koncepcji.',
      en: 'An error occurred while generating the concept package.',
    },
    retry:             { pl: 'Spróbuj ponownie',         en: 'Retry' },
  },

  // ---- PipelineProgress ----
  pipeline: {
    running:     { pl: 'Pipeline w toku',        en: 'Pipeline Running' },
    analyzing:   { pl: 'Analiza przestrzeni',    en: 'Analyzing space' },
    strategizing:{ pl: 'Budowanie strategii',    en: 'Building strategy' },
    styling:     { pl: 'Definiowanie stylu',     en: 'Defining style' },
    concepting:  { pl: 'Koncepcja mebli',        en: 'Concepting furniture' },
    prompting:   { pl: 'Generowanie promptu',    en: 'Generating prompt' },
    summarizing: { pl: 'Pisanie podsumowania',   en: 'Writing summary' },
  },

  // ---- Section headings ----
  sections: {
    spaceAnalysis:     { pl: 'Analiza przestrzeni',      en: 'Space Analysis' },
    redesignStrategy:  { pl: 'Strategia redesignu',      en: 'Redesign Strategy' },
    styleDirection:    { pl: 'Kierunek stylistyczny',    en: 'WALABI Style Direction' },
    furnitureConcept:  { pl: 'Koncepcja mebli',          en: 'Furniture Concept' },
    renderPrompt:      { pl: 'Master Prompt renderowania', en: 'Render Master Prompt' },
    investorSummary:   { pl: 'Podsumowanie inwestorskie', en: 'Investor Summary' },
  },

  // ---- CopyButton ----
  copy: {
    copy:   { pl: 'Kopiuj',     en: 'Copy' },
    copied: { pl: 'Skopiowano', en: 'Copied' },
    copyPrompt:       { pl: 'Kopiuj prompt',           en: 'Copy prompt' },
    copyFullPackage:  { pl: 'Kopiuj cały pakiet',      en: 'Copy full package' },
    copySummary:      { pl: 'Kopiuj podsumowanie',     en: 'Copy summary' },
  },
} as const

export type Translations = typeof translations

// Helper: pull correct string for given lang
export function t<
  Section extends keyof Translations,
  Key extends keyof Translations[Section],
>(
  section: Section,
  key: Key,
  lang: Lang,
): string {
  const entry = translations[section][key] as Record<Lang, string>
  return entry[lang] ?? entry['en']
}
