/**
 * Client-side Arabic → Latin transliteration for Quranic Uthmani text.
 *
 * The Uthmani script includes full diacritical marks (harakāt) which allow
 * accurate phonetic rendering without a database lookup.
 *
 * Scheme: simplified ALA-LC / common Quran transliteration convention.
 */

// ─── Consonant map ─────────────────────────────────────────────────────────
const CONSONANTS: Record<string, string> = {
  '\u0627': 'a',  // alef ا
  '\u0671': 'a',  // alef wasla ٱ (used in definite article ال)
  '\u0628': 'b',  // ba ب
  '\u062A': 't',  // ta ت
  '\u062B': 'th', // tha ث
  '\u062C': 'j',  // jim ج
  '\u062D': 'ḥ',  // ha ح
  '\u062E': 'kh', // kha خ
  '\u062F': 'd',  // dal د
  '\u0630': 'dh', // dhal ذ
  '\u0631': 'r',  // ra ر
  '\u0632': 'z',  // zain ز
  '\u0633': 's',  // sin س
  '\u0634': 'sh', // shin ش
  '\u0635': 'ṣ',  // sad ص
  '\u0636': 'ḍ',  // dad ض
  '\u0637': 'ṭ',  // ta ط
  '\u0638': 'ẓ',  // zha ظ
  '\u0639': '\'', // ain ع
  '\u063A': 'gh', // ghain غ
  '\u0641': 'f',  // fa ف
  '\u0642': 'q',  // qaf ق
  '\u0643': 'k',  // kaf ك
  '\u0644': 'l',  // lam ل
  '\u0645': 'm',  // mim م
  '\u0646': 'n',  // nun ن
  '\u0647': 'h',  // ha ه
  '\u0648': 'w',  // waw و
  '\u064A': 'y',  // ya ي
  '\u0629': 'h',  // ta marbuta ة
  '\u0649': 'a',  // alef maqsura ى (long a)
  '\u0626': '\'y',// hamza on ya ئ
  '\u0624': '\'w',// hamza on waw ؤ
  '\u0623': '\'', // hamza on alef أ
  '\u0625': '\'', // hamza under alef إ
  '\u0622': 'ā',  // alef with madda آ
  '\u0621': '\'', // hamza ء
}

// ─── Diacritic map ─────────────────────────────────────────────────────────
const DIACRITICS: Record<string, string> = {
  '\u064E': 'a',   // fatha
  '\u064F': 'u',   // damma
  '\u0650': 'i',   // kasra
  '\u064B': 'an',  // tanwin fath
  '\u064C': 'un',  // tanwin damm
  '\u064D': 'in',  // tanwin kasr
  '\u0652': '',    // sukun — no vowel
  '\u0670': 'ā',   // superscript alef (long a)
}

// Characters to strip (don't affect pronunciation)
const STRIP = new Set([
  '\u0651', // shadda — handled separately (doubles consonant)
  '\u0640', // tatweel ـ
  '\u06DC', // small high seen
  '\u06DF', // small high rounded zero
  '\u06E0', // small high upright rectangular zero
  '\u06E2', // small high meem isolated form
  '\u06E4', // small high madda
  '\u06E7', // small high ya
  '\u06E8', // small high noon
  '\u06EA', // empty centre low stop
  '\u06EB', // empty centre high stop
  '\u06EC', // rounded high stop with filled centre
  '\u06ED', // small low meem
  '\u0610', // sign sallallahou alayhe wasallam
  '\u0615', // sign of sajda
  '\u065C', // above dot
])

/**
 * Transliterate an Arabic word (with diacritics) to Latin script.
 * Returns an empty string if the input is empty or null.
 */
export function transliterateArabic(arabic: string | undefined | null): string {
  if (!arabic) return ''

  const chars = [...arabic] // spread for proper Unicode iteration
  const result: string[] = []
  let i = 0

  while (i < chars.length) {
    const ch = chars[i]
    const next = chars[i + 1]

    // Skip strip-only characters
    if (STRIP.has(ch)) {
      i++
      continue
    }

    // Shadda — double the previous consonant in the output
    if (ch === '\u0651') {
      if (result.length > 0) {
        const last = result[result.length - 1]
        // Only double actual consonant letters (not vowels)
        if (last && /[a-zA-Zḥṣḍṭẓāīū']/.test(last[last.length - 1])) {
          result.push(last)
        }
      }
      i++
      continue
    }

    // Diacritic alone (no preceding consonant output yet)
    if (ch in DIACRITICS) {
      result.push(DIACRITICS[ch])
      i++
      continue
    }

    // Consonant
    const consonant = CONSONANTS[ch]
    if (consonant !== undefined) {
      // Check for shadda immediately after
      const hasShadda = next === '\u0651'

      // Emit consonant (doubled if shadda)
      result.push(hasShadda ? consonant + consonant : consonant)
      if (hasShadda) i++ // consume shadda

      // Emit following diacritic(s)
      let j = i + 1
      while (j < chars.length && (chars[j] in DIACRITICS || STRIP.has(chars[j]))) {
        if (chars[j] in DIACRITICS) {
          result.push(DIACRITICS[chars[j]])
        }
        j++
      }
      i = j
      continue
    }

    // Unknown character — skip
    i++
  }

  const raw = result
    .join('')
    // Collapse any triple (or more) identical characters down to two
    .replace(/(.)\1{2,}/g, '$1$1')

  return raw.charAt(0).toUpperCase() + raw.slice(1)
}
