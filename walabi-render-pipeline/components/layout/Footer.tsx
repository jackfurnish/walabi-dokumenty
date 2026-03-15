export function Footer() {
  return (
    <footer className="border-t border-stone-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <span className="text-xs text-stone-400">
          © {new Date().getFullYear()} WALABI — Bespoke Furniture & Hospitality Interiors
        </span>
        <span className="text-xs text-stone-400">
          Render Pipeline MVP v0.1
        </span>
      </div>
    </footer>
  )
}
