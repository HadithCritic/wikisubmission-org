import { QuranRef } from '@/components/quran-ref'
import Link from 'next/link'

export function AppendixContent() {
  return (
    <>
      {/* Opening verse card */}
      <div
        data-card
        className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center space-y-2"
      >
        <p className="text-base leading-relaxed italic text-foreground/90">
          &ldquo;God took a covenant from the prophets, saying, &lsquo;I will give you the
          scripture and wisdom. Afterwards, a messenger will come to confirm all existing
          scriptures. You shall believe in him and support him.&rsquo; He said,
          &lsquo;Do you agree with this, and pledge to fulfill this covenant?&rsquo; They
          said, &lsquo;We agree.&rsquo; He said, &lsquo;You have thus borne witness, and
          I am also a witness.&rsquo;&rdquo;
        </p>
        <p className="text-xs text-muted-foreground font-mono">
          <QuranRef reference="3:81" />
        </p>
      </div>

      {/* Intro */}
      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          God&apos;s Messenger of the Covenant is a consolidating messenger. His mission
          is to purify and unify all existing religions into one: Submission (Islam).
          Islam is a description of one&apos;s total submission and devotion to God
          ALONE, without idolizing Jesus, Mary, Muhammad, or the saints. Anyone meeting
          this criterion qualifies as a &ldquo;Muslim&rdquo; (Submitter) — Muslim Jews,
          Muslim Christians, and so on.
        </p>
        <p>
          The Quran is clear that the only religion approved by God is Submission
          (<QuranRef reference="3:19" />), and that anyone who seeks other than Submission
          as a religion, it will not be accepted (<QuranRef reference="3:85" />).
        </p>
      </section>

      {/* Nabi vs. Rasoul */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-border/50" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
          Prophet vs. Messenger
        </h2>
        <hr className="flex-1 border-border/50" />
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          The Quran makes a critical distinction between <em>Nabi</em> (Prophet) and{' '}
          <em>Rasoul</em> (Messenger). A prophet delivers a new scripture, while a
          messenger confirms existing scripture without bringing new revelation. Every
          prophet is also a messenger, but not every messenger is a prophet.
        </p>
        <p>
          <QuranRef reference="33:40" /> states: &ldquo;Muhammad was not the father of
          any of your men; he was a messenger (Rasoul) of God and the last prophet
          (Nabi).&rdquo; Muhammad was thus the last prophet — no new scripture after
          him — but messengers can and do come after him. The gematrical value of
          &ldquo;Muhammad Khaatum Al-Nabiyyeen&rdquo; equals 1349, or 19×71,
          confirming this through the Quran&apos;s mathematical code.
        </p>
        <p>
          All previous messengers required divine proof of their messengership: Moses
          transformed his staff into a serpent, Jesus healed lepers and revived the dead,
          Saleh produced the famous camel, Abraham walked out of fire, and Muhammad&apos;s
          proof was the Quran itself (<QuranRef reference="29:50-51" />). A new messenger
          likewise requires divine, incontrovertible proof.
        </p>
      </section>

      {/* Prophecy */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-border/50" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
          The Prophecy
        </h2>
        <hr className="flex-1 border-border/50" />
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          References to a consolidating messenger appear throughout the Quran at{' '}
          <QuranRef reference="3:81" />, <QuranRef reference="33:7" />, and{' '}
          <QuranRef reference="33:40" />. This prophecy is also found in the Bible at
          Malachi 3:1–3: &ldquo;Lo, I am sending my messenger to prepare the way before
          me; and suddenly there will come to the temple the Lord whom you seek and the
          messenger of the covenant whom you desire.&rdquo;
        </p>
        <p>
          The covenant was confirmed in a personal experience during the Hajj pilgrimage
          on Zul-Hijjah 3, 1391 (December 21, 1971): &ldquo;I was sitting still, while
          the prophets, one by one, came towards me, looked at my face, then nodded their
          heads.&rdquo; Notably, the numerical sum of month (12) + day (3) + year (1391)
          = 1406 = 19×74. The number 19 is mentioned in Sura 74.
        </p>
      </section>

      {/* Mathematical proof */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-border/50" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
          Mathematical Proof
        </h2>
        <hr className="flex-1 border-border/50" />
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          The Quran&apos;s 19-based mathematical miracle was unveiled after being hidden
          for 1406 years (19×74). The root word &ldquo;Rashada&rdquo; (right guidance)
          occurs exactly 19 times in the Quran — matching the Quran&apos;s mathematical
          denominator. The name &ldquo;Khalifa&rdquo; (vicegerent / successor) appears
          in Suras 2 and 38.
        </p>

        <div
          data-card
          className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-3 text-sm"
        >
          <p className="font-semibold text-foreground">Key Mathematical Facts</p>
          <ul className="space-y-2 text-foreground/80">
            <li>
              &bull; &ldquo;Rashada&rdquo; locations (40:29, 40:38) + &ldquo;Khalifa&rdquo;
              location (38:26): 40+29+38+38+26 = 171 = 19×9
            </li>
            <li>
              &bull; All sura and verse numbers for &ldquo;Rashada&rdquo; and
              &ldquo;Khalifa&rdquo; sum to 1463 = 19×77
            </li>
            <li>
              &bull; Gematrical value of &ldquo;Rashad&rdquo; = 505; &ldquo;Khalifa&rdquo; = 725
            </li>
            <li>
              &bull; Sum of verse numbers from 1:1 through the first &ldquo;Rashada&rdquo;
              occurrence (2:186) = 17,233 = 19×907
            </li>
            <li>
              &bull; 505 + 725 + 3 + 192 = 1425 = 19×75
            </li>
          </ul>
        </div>

        <p>
          Among the five great messengers, the gematrical values of their names sum to
          a multiple of 19: Abraham (258) + Ismail (211) + Isaac (169) + Muhammad (92)
          + Rashad (505) = 1235 = 19×65.
        </p>
        <p>
          Verse 3:81 itself carries profound mathematical confirmation. The gematrical
          value of the entire verse = 13,148 = 19×692. The key phrase &ldquo;JAA&apos;AKUM
          RASOOLUN MUSADDIQUN LEMAA MA&apos;AKUM&rdquo; (a messenger will come to confirm
          what you have) = 836 = 19×44. And 505 + 725 + 81 = 1311 = 19×69.
        </p>
      </section>

      {/* Verse 36:3 */}
      <div
        data-card
        className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center space-y-2"
      >
        <p className="text-base leading-relaxed italic text-foreground/90">
          &ldquo;Surely, you are one of the messengers.&rdquo;
        </p>
        <p className="text-xs text-muted-foreground font-mono">
          <QuranRef reference="36:3" />
        </p>
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          Among the initialed suras, Sura 36 (Ya Seen) occupies position 19. The
          gematrical value of verse 36:3 (612) + sura (36) + verse (3) + name values
          (505+725) = 1881 = 19×99. Sura 36 has 83 verses: 36+83+505+725 = 1349 = 19×71.
          From 3:81 to 36:3 there are exactly 3333 verses; 3333+505 = 3838 = 19×202.
        </p>
        <p>
          Additionally, verse 5:19 — &ldquo;O people of the scripture, our messenger
          has come to you, to clarify things for you, after a long period without
          messengers&rdquo; — has a verse number of 19, matching the Quran&apos;s
          denominator and the number of &ldquo;Rashada&rdquo; occurrences. The sura
          and verse numbers through 5:19 = 703 = 19×37.
        </p>
        <p>
          Verse 44:13 likewise yields: sura/verse numbers from 1:1 through 44:13 =
          5415 = 19×19×15. And 44+13 = 57 = 19×3.
        </p>
      </section>

      {/* End of World */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-border/50" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
          End of the World
        </h2>
        <hr className="flex-1 border-border/50" />
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          God alone knows the end of the world (<QuranRef reference="7:187" />,{' '}
          <QuranRef reference="31:34" />, <QuranRef reference="33:63" />,{' '}
          <QuranRef reference="41:47" />, <QuranRef reference="43:85" />), yet He
          chooses to reveal certain knowledge to messengers He selects (
          <QuranRef reference="72:27" />). Sura 72 contains four occurrences of
          &ldquo;Rashada&rdquo; at verses 2, 10, 14, and 21. The sum 1230+72+2+10+14+21
          = 1349 = 19×71. The opening phrase of <QuranRef reference="72:27" />,
          &ldquo;Only the Messenger that He chooses,&rdquo; has a gematrical value of
          1919.
        </p>
      </section>

      {/* Criteria */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-border/50" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
          Criteria for God&apos;s Messenger
        </h2>
        <hr className="flex-1 border-border/50" />
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>Three minimum criteria identify God&apos;s Messenger of the Covenant:</p>
        <ol className="space-y-3 list-none">
          {[
            'God\'s messenger advocates the worship of God ALONE, and the abolition of all forms of idol worship.',
            'God\'s messenger never asks for a wage for himself.',
            'God\'s messenger is given divine, incontrovertible proof of his messengership.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="shrink-0 flex items-center justify-center size-7 rounded-md bg-primary/10 text-primary font-mono text-xs font-semibold mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
        <p>
          Such a messenger is supported by God&apos;s invisible soldiers (
          <QuranRef reference="3:124-126" />, <QuranRef reference="9:26" />,{' '}
          <QuranRef reference="33:9" />, <QuranRef reference="48:4" />,{' '}
          <QuranRef reference="74:31" />), guaranteed victory and dignity (
          <QuranRef reference="40:51" />, <QuranRef reference="58:21" />).
        </p>
      </section>

      {/* Principal Duties */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-border/50" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
          Principal Duties
        </h2>
        <hr className="flex-1 border-border/50" />
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>The principal duties of God&apos;s Messenger of the Covenant include:</p>
        <ol className="space-y-2 list-none">
          {[
            <>Unveil the Quran&apos;s mathematical miracle (<Link href="/appendices/1" className="text-primary underline underline-offset-2">Appendix 1</Link>).</>,
            <>Remove the false verses 9:128–129 (<Link href="/appendices/24" className="text-primary underline underline-offset-2">Appendix 24</Link>).</>,
            <>Explain the purpose of our life (<Link href="/appendices/7" className="text-primary underline underline-offset-2">Appendix 7</Link>).</>,
            <>Proclaim one religion and purge corruptions from Judaism, Christianity, and Islam (<Link href="/appendices/13" className="text-primary underline underline-offset-2">Appendix 13</Link>, <Link href="/appendices/15" className="text-primary underline underline-offset-2">15</Link>, <Link href="/appendices/19" className="text-primary underline underline-offset-2">19</Link>).</>,
            <>Proclaim Zakat as a prerequisite for redemption (<QuranRef reference="7:156" />) and explain its correct practice (<Link href="/appendices/15" className="text-primary underline underline-offset-2">Appendix 15</Link>).</>,
            <>Unveil the end of the world (<Link href="/appendices/25" className="text-primary underline underline-offset-2">Appendix 25</Link>).</>,
            <>Proclaim that those who die before the age of 40 are destined for Heaven (<Link href="/appendices/32" className="text-primary underline underline-offset-2">Appendix 32</Link>).</>,
            <>Explain the death of Jesus (<Link href="/appendices/22" className="text-primary underline underline-offset-2">Appendix 22</Link>).</>,
            <>Explain the delivery of the Quran through Muhammad (<Link href="/appendices/28" className="text-primary underline underline-offset-2">Appendix 28</Link>).</>,
            <>Announce that Muhammad wrote the Quran with his own hand (<Link href="/appendices/28" className="text-primary underline underline-offset-2">Appendix 28</Link>).</>,
            <>Explain why most believers do not reach Heaven (<Link href="/appendices/27" className="text-primary underline underline-offset-2">Appendix 27</Link>).</>,
            <>Proclaim that God never ordered Abraham to kill his son (<Link href="/appendices/9" className="text-primary underline underline-offset-2">Appendix 9</Link>).</>,
            <>Proclaim the secret of perfect happiness (Introduction).</>,
            <>Establish the Quran&apos;s criminal justice system (<Link href="/appendices/37" className="text-primary underline underline-offset-2">Appendix 37</Link>).</>,
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="shrink-0 flex items-center justify-center size-7 rounded-md bg-primary/10 text-primary font-mono text-xs font-semibold mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
