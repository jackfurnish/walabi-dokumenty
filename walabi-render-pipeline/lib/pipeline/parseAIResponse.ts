// ============================================================
// Shared helper: parse AI JSON response with deterministic fallback
// ============================================================

export function parseAIResponse<T>(raw: string, fallback: () => T): T {
  // Attempt 1: strip code fences and parse directly
  try {
    const cleaned = raw
      .replace(/^```json\s*/im, '')
      .replace(/^```\s*/im, '')
      .replace(/\s*```\s*$/im, '')
      .trim()
    return JSON.parse(cleaned) as T
  } catch { /* try next strategy */ }

  // Attempt 2: extract first {...} block (handles text before/after JSON)
  try {
    const start = raw.indexOf('{')
    const end   = raw.lastIndexOf('}')
    if (start !== -1 && end > start) {
      return JSON.parse(raw.slice(start, end + 1)) as T
    }
  } catch { /* try next strategy */ }

  // Attempt 3: extract first [...] block (array responses)
  try {
    const start = raw.indexOf('[')
    const end   = raw.lastIndexOf(']')
    if (start !== -1 && end > start) {
      return JSON.parse(raw.slice(start, end + 1)) as T
    }
  } catch { /* fall through */ }

  console.warn('[Pipeline API] Failed to parse AI response, using deterministic fallback')
  return fallback()
}
