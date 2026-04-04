import { QuranRef } from '@/components/quran-ref'

export function AppendixContent() {
  return (
    <>
      <section>
        <p>
          The Quran is characterized by a unique phenomenon never found in any
          human authored book. Every element of the Quran is mathematically
          composed — the suras, the verses, the words, the number of certain
          letters, the number of words from the same root, the number and
          variety of divine names, the unique spelling of certain words, the
          absence or deliberate alteration of certain letters within certain
          words, and many other elements of the Quran besides its content. There
          are two major facets of the Quran&apos;s mathematical system: (1) The
          mathematical literary composition, and (2) The mathematical structure
          involving the numbers of suras and verses. Because of this
          comprehensive mathematical coding, the slightest distortion of the
          Quran&apos;s text or physical arrangement is immediately exposed.
        </p>
      </section>
      {/* ── Opening card ─────────────────────────────────────────────────── */}
      <div
        data-card
        className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center space-y-2"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Simple to Understand · Impossible to Imitate
        </p>
      </div>

      {/* ── Intro ────────────────────────────────────────────────────────── */}
      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          For the first time in history we have a scripture with built-in proof
          of divine authorship — a superhuman mathematical composition.
        </p>
        <p>
          Any reader of this book can easily verify the Quran&apos;s
          mathematical miracle. The word &ldquo;God&rdquo; (Allah) is written in
          bold capital letters throughout the text. The cumulative frequency of
          occurrence of the word &ldquo;God&rdquo; is noted at the bottom of
          each page in the left hand corner. The number in the right hand corner
          is the cumulative total of the numbers for verses containing the word
          &ldquo;God.&rdquo; The last page of the text shows that the total
          occurrence of the word &ldquo;God&rdquo; is 2698, or 19×142. The total
          sum of verse numbers for all verses containing the word
          &ldquo;God&rdquo; is 118123, also a multiple of 19 (118123 = 19×6217).
          Nineteen is the common denominator throughout the Quran&apos;s
          mathematical system.
        </p>
        <p>
          This phenomenon alone suffices as incontrovertible proof that the
          Quran is God&apos;s message to the world. No human being(s) could have
          kept track of 2698 occurrences of the word &ldquo;God,&rdquo; and the
          numbers of verses where they occur. This is especially impossible in
          view of (1) the age of ignorance during which the Quran was revealed,
          and (2) the fact that the suras and verses were widely separated in
          time and place of revelation.
        </p>
      </section>

      {/* ── The Simple Facts ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-border/50" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
          The Simple Facts
        </h2>
        <hr className="flex-1 border-border/50" />
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          Like the Quran itself, the Quran&apos;s mathematical coding ranges
          from the very simple, to the very complex. The following facts do not
          require any tools to be verified, but please remember they all refer
          to the original Arabic text:
        </p>

        <ol className="space-y-3 list-none">
          {[
            'The first verse (1:1), known as "Basmalah," consists of 19 letters.',
            'The Quran consists of 114 suras, which is 19 × 6.',
            'The total number of verses in the Quran is 6346, or 19 × 334. [6234 numbered verses & 112 un-numbered verses (Basmalahs) 6234 + 112 = 6346] Note that 6 + 3 + 4 + 6 = 19.',
            'The Basmalah occurs 114 times, despite its conspicuous absence from Sura 9 (it occurs twice in Sura 27) & 114 = 19 × 6.',
            'From the missing Basmalah of Sura 9 to the extra Basmalah of Sura 27, there are precisely 19 suras.',
            'It follows that the total of the sura numbers from 9 to 27 (9+10+11+...+27) is 342, or 19 × 18.',
            'This total (342) also equals the number of words between the two Basmalahs of Sura 27, and 342 = 19 × 18.',
            'The famous first revelation (96:1–5) consists of 19 words.',
            'This 19-worded first revelation consists of 76 letters — 19 × 4.',
            'Sura 96, first in the chronological sequence, consists of 19 verses.',
            'This first chronological sura is placed atop the last 19 suras.',
            'Sura 96 consists of 304 Arabic letters, and 304 equals 19 × 16.',
            'The last revelation (Sura 110) consists of 19 words.',
            'The first verse of the last revelation (110:1) consists of 19 letters.',
            '14 different Arabic letters form 14 different sets of "Quranic Initials" (such as A.L.M. of 2:1), and prefix 29 suras. These numbers add up to 14 + 14 + 29 = 57 = 19 × 3.',
            'The total of the 29 sura numbers where the Quranic Initials occur is 2+3+7+...+50+68 = 822, and 822 + 14 (14 sets of initials) equals 836, or 19 × 44.',
            'Between the first initialed sura (Sura 2) and the last initialed sura (Sura 68) there are 38 un-initialed suras — 19 × 2.',
            'Between the first and last initialed sura there are 19 sets of alternating "initialed" and "uninitialed" suras.',
            'The Quran mentions 30 different numbers: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 19, 20, 30, 40, 50, 60, 70, 80, 99, 100, 200, 300, 1000, 2000, 3000, 5000, 50,000, & 100,000. The sum of these numbers is 162,146 = 19 × 8,534.',
          ].map((fact, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="shrink-0 flex items-center justify-center size-7 rounded-md bg-primary/10 text-primary font-mono text-xs font-semibold mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed">{fact}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Quranic Initials ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-border/50" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
          The Literary Mathematical Composition
        </h2>
        <hr className="flex-1 border-border/50" />
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          The Quran is characterized by a unique phenomenon never found in any
          other book: 29 suras are prefixed with 14 different sets of
          &ldquo;Quranic Initials,&rdquo; consisting of one to five letters per
          set. Fourteen letters, half the Arabic alphabet, participate in these
          initials. The significance of the Quranic initials remained a divinely
          guarded secret for 14 centuries.
        </p>
        <p>
          The Quran states in <QuranRef reference="10:20" /> and{' '}
          <QuranRef reference="25:4-6" /> that its miracle, i.e., proof of
          divine authorship, was destined to remain secret for a specific
          predetermined interim.
        </p>
      </section>

      {/* ── Initials table ───────────────────────────────────────────────── */}
      <div
        data-card
        className="rounded-xl border border-border/60 overflow-hidden"
      >
        <div className="px-4 py-3 bg-primary/5 border-b border-border/40">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            The Quranic Initials and Their Suras
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/30">
                <th className="text-left px-4 py-2 font-medium text-muted-foreground font-mono">
                  #
                </th>
                <th className="text-left px-4 py-2 font-medium text-muted-foreground">
                  Sura
                </th>
                <th className="text-left px-4 py-2 font-medium text-muted-foreground">
                  Title
                </th>
                <th className="text-left px-4 py-2 font-medium text-muted-foreground font-mono">
                  Initials
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                [2, 'The Heifer', 'A.L.M.'],
                [3, 'The Amramites', 'A.L.M.'],
                [7, 'The Purgatory', 'A.L.M.S'],
                [10, 'Jonah', 'A.L.R.'],
                [11, 'Hûd', 'A.L.R.'],
                [12, 'Joseph', 'A.L.R.'],
                [13, 'Thunder', 'A.L.M.R.'],
                [14, 'Abraham', 'A.L.R.'],
                [15, 'Al-Hijr Valley', 'A.L.R.'],
                [19, 'Mary', "K.H.Y.'A.S."],
                [20, 'T.H.', 'T.H.'],
                [26, 'The Poets', 'T.S.M.'],
                [27, 'The Ant', 'T.S.'],
                [28, 'History', 'T.S.M.'],
                [29, 'The Spider', 'A.L.M.'],
                [30, 'The Romans', 'A.L.M.'],
                [31, 'Luqmaan', 'A.L.M.'],
                [32, 'Prostration', 'A.L.M.'],
                [36, 'Y.S.', 'Y.S.'],
                [38, 'S.', 'S.'],
                [40, 'Forgiver', 'H.M.'],
                [41, 'Elucidated', 'H.M.'],
                [42, 'Consultation', "H.M. 'A.S.Q."],
                [43, 'Ornaments', 'H.M.'],
                [44, 'Smoke', 'H.M.'],
                [45, 'Kneeling', 'H.M.'],
                [46, 'The Dunes', 'H.M.'],
                [50, 'Q.', 'Q.'],
                [68, 'The Pen', 'NuN'],
              ].map(([sura, title, initials], i) => (
                <tr
                  key={i}
                  className="border-b border-border/20 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                    {i + 1}
                  </td>
                  <td className="px-4 py-2 font-mono text-xs text-primary font-medium">
                    {sura}
                  </td>
                  <td className="px-4 py-2 text-xs">{title}</td>
                  <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                    {initials}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Historical Background ────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-border/50" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
          Historical Background
        </h2>
        <hr className="flex-1 border-border/50" />
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          In 1968, Rashad Khalifa realized that the existing English
          translations of the Quran did not present the truthful message of
          God&apos;s Final Testament. He purchased all the available books of
          Quranic translations and exegeses, placed them on a large table, and
          began his translation. The first verse in Sura 2 is
          &ldquo;A.L.M.&rdquo; The translation of this verse took four years,
          and coincided with the divine unveiling of &ldquo;the secret,&rdquo;
          the great mathematical Miracle of the Quran.
        </p>
        <p>
          The books of Quranic exegeses unanimously agreed that &ldquo;no one
          knows the meaning or significance of the Quranic Initials A.L.M., or
          any other initials.&rdquo; He decided to write the Quran into the
          computer, analyze the whole text, and see if there were any
          mathematical correlations among these Quranic initials.
        </p>
      </section>

      {/* ── The Initial Q ────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-border/50" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
          The Initial Q (Qaaf)
        </h2>
        <hr className="flex-1 border-border/50" />
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          The computer data showed that the text of the only Q-initialed suras,
          42 and 50, contained the same number of Q&apos;s: 57 and 57. That was
          the first hint that a deliberate mathematical system might exist in
          the Quran.
        </p>
        <p>
          Sura 50 is entitled &ldquo;Q,&rdquo; prefixed with &ldquo;Q,&rdquo;
          and the first verse reads, &ldquo;Q, and the glorious Quran.&rdquo;
          This indicated that &ldquo;Q&rdquo; stands for &ldquo;Quran,&rdquo;
          and the total number of Q&apos;s in the two Q-initialed suras
          represents the Quran&apos;s 114 suras (57 + 57 = 114 = 19×6). This
          idea was strengthened by the fact that &ldquo;the Quran&rdquo; occurs
          in the Quran 57 times. The word &ldquo;Majid&rdquo; (glorious) has a
          gematrical value of 57: M(40) + J(3) + I(10) + D(4) = 57.
        </p>

        <div
          data-card
          className="rounded-xl border border-border/60 overflow-hidden"
        >
          <div className="px-4 py-3 bg-primary/5 border-b border-border/40">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Q-Related Data
            </p>
          </div>
          <ul className="divide-y divide-border/20 text-sm">
            {[
              'The frequency of occurrence of "Q" in Sura "Q" (No. 50) is 57, 19×3.',
              'The letter "Q" occurs in the other Q-initialed sura (No. 42) exactly the same number of times, 57.',
              'The total occurrence of the letter "Q" in the two Q-initialed suras is 114, which equals the number of suras in the Quran.',
              '"The Quran" is mentioned in the Quran 57 times.',
              'The description of the Quran as "Majid" (Glorious) correlates with the frequency of "Q" — gematrical value of "Majid" is 57.',
              'Sura 42 consists of 53 verses, and 42 + 53 = 95 = 19×5.',
              'Sura 50 consists of 45 verses, and 50 + 45 = 95 = 19×5.',
              'The number of Q\'s in all verses numbered "19" throughout the Quran is 76 = 19×4.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 px-4 py-2.5">
                <span className="shrink-0 size-5 flex items-center justify-center rounded bg-primary/10 text-primary font-mono text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="text-foreground/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Other initials ───────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-border/50" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
          Other Quranic Initials
        </h2>
        <hr className="flex-1 border-border/50" />
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          <strong>NuN (Noon)</strong> — This initial is unique; it occurs in one
          sura (68), and the name of the letter is spelled out as three
          letters—Noon Wow Noon—and is therefore counted as two N&apos;s. The
          total count of this letter in the N-initialed sura is 133 = 19×7.
        </p>
        <p>
          <strong>S (Saad)</strong> — This initial prefixes three suras (7, 19,
          and 38), and the total occurrence of the letter &ldquo;S&rdquo; (Saad)
          in these three suras is 152 = 19×8 (97 + 26 + 29).
        </p>
        <p>
          <strong>Y.S. (Ya Seen)</strong> — These two letters prefix Sura 36.
          The letter &ldquo;Y&rdquo; occurs 237 times and &ldquo;S&rdquo; (Seen)
          occurs 48 times. The total of both letters is 285 = 19×15.
        </p>
        <p>
          <strong>H.M. (Ha Mim)</strong> — Seven suras are prefixed with the
          letters &ldquo;H&rdquo; and &ldquo;M&rdquo; (Suras 40–46). The total
          occurrence of these two letters in the seven H.M.-initialed suras is
          2147 = 19×113.
        </p>
        <p>
          <strong>A.L.M.</strong> — These letters prefix six suras (2, 3, 29,
          30, 31, and 32). The total occurrence of the three letters in the six
          suras is 19,874 = 19×1,046.
        </p>
        <p>
          <strong>A.L.R.</strong> — Found in Suras 10, 11, 12, 14, and 15. The
          total occurrence of these letters across all five suras is 9,462 =
          19×498.
        </p>
        <p>
          <strong>K.H.Y.ʿA.S.</strong> — The longest set of initials (five
          letters), occurring in Sura 19. The five letters occur 137, 175, 343,
          117, and 26 times respectively. Total: 798 = 19×42.
        </p>
      </section>

      {/* ── Historical note ──────────────────────────────────────────────── */}
      <div
        data-card
        className="rounded-xl border border-primary/20 bg-primary/5 p-6 space-y-3"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Historical Note
        </p>
        <p className="text-base leading-relaxed text-foreground/90">
          The momentous discovery that &ldquo;19&rdquo; is the Quran&apos;s
          common denominator became a reality in January 1974, coinciding with
          Zul-Hijjah 1393 A.H. The Quran was revealed in 13 B.H. (Before
          Hijrah). This makes the number of years from the revelation of the
          Quran to the revelation of its miracle 1393 + 13 = 1406 = 19×74. The
          unveiling of the Miracle took place in 1974 — and &ldquo;19&rdquo; is
          mentioned in Sura 74 (<QuranRef reference="74:30" />
          ).
        </p>
      </div>

      {/* ── Gematrical values ────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-border/50" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
          Gematrical Values
        </h2>
        <hr className="flex-1 border-border/50" />
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          When the Quran was revealed 14 centuries ago, the numbers known today
          did not exist. A universal system was used where the letters of the
          Arabic, Hebrew, Aramaic, and Greek alphabets were used as numerals.
          The number assigned to each letter is its &ldquo;Gematrical
          Value.&rdquo;
        </p>
        <p>
          Fourteen Arabic letters, half the Arabic alphabet, participate in the
          formation of 14 different sets of Quranic Initials. By adding the
          gematrical value of each one of these letters, plus the number of
          suras which are prefixed with Quranic Initials (29), we obtain a total
          of 722 = 19×19×2.
        </p>
        <p>
          Additionally, if we add the total gematrical value of all 14 initials,
          plus the number of the first sura where the initial occurs, we get a
          grand total of 988 = 19×52.
        </p>
        <p>
          The Grand Total for all initialed suras — combining total frequency of
          initials with their total gematrical values — is 1,089,479 =
          19×57,341. The slightest alteration or distortion destroys the system.
        </p>
      </section>

      {/* ── Mathematical Coding: The Word "God" ──────────────────────────── */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-border/50" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
          Mathematical Coding: The Word &ldquo;God&rdquo;
        </h2>
        <hr className="flex-1 border-border/50" />
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          The word &ldquo;God&rdquo; (Allah) occurs in the Quran 2,698 times
          (19×142). The word &ldquo;God&rdquo; is found in 85 suras. Outside
          the initialed section of the Quran (Suras 2–68), the word
          &ldquo;God&rdquo; occurs 57 times (19×3). Between the first
          initialed sura (2) and the last initialed sura (68), the word
          &ldquo;God&rdquo; occurs 2,641 times (19×139). The sum of all sura
          and verse numbers containing the word &ldquo;God&rdquo; in the 85
          suras is 8,170 (19×430). The total sum of verse numbers for all
          verses containing &ldquo;God&rdquo; is 118,123 (19×6,217).
        </p>
      </section>

      {/* ── The Basmalah's Four Words ─────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-border/50" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
          The Basmalah&apos;s Four Words
        </h2>
        <hr className="flex-1 border-border/50" />
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          The opening statement of the Quran — &ldquo;In the name of God, Most
          Gracious, Most Merciful&rdquo; — consists of four words. Each word
          occurs in the Quran a number of times that is a multiple of 19:
        </p>
      </section>

      <div
        data-card
        className="rounded-xl border border-border/60 overflow-hidden"
      >
        <div className="px-4 py-3 bg-primary/5 border-b border-border/40">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Frequency of the Basmalah&apos;s Four Words
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/30">
                <th className="text-left px-4 py-2 font-medium text-muted-foreground">
                  Word
                </th>
                <th className="text-left px-4 py-2 font-medium text-muted-foreground font-mono">
                  Occurrences
                </th>
                <th className="text-left px-4 py-2 font-medium text-muted-foreground font-mono">
                  Multiple of 19
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Name (Ism)', '19', '19 × 1'],
                ['God (Allah)', '2,698', '19 × 142'],
                ['Most Gracious (Al-Rahman)', '57', '19 × 3'],
                ['Most Merciful (Al-Raheem)', '114', '19 × 6'],
              ].map(([word, count, multiple], i) => (
                <tr
                  key={i}
                  className="border-b border-border/20 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-2 text-xs">{word}</td>
                  <td className="px-4 py-2 font-mono text-xs text-primary font-medium">
                    {count}
                  </td>
                  <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                    {multiple}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── The Five Pillars of Islam ─────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-border/50" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
          The Five Pillars of Islam
        </h2>
        <hr className="flex-1 border-border/50" />
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          The mathematical coding of the Quran extends to its five fundamental
          religious duties — confirming that these pillars are part of the
          divinely composed scripture.
        </p>

        <ol className="space-y-3 list-none">
          {[
            {
              title: 'Shahaadah (One God)',
              detail:
                'The statement "LAA ELAAHA ELLA HOO" (There is no other god besides Him) occurs in 19 suras. The sum of all sura and verse numbers of every occurrence equals 316,502 = 19 × 16,658.',
            },
            {
              title: 'Salat (Contact Prayers)',
              detail:
                'The word "Salat" occurs 67 times in the Quran. The sum of all sura and verse numbers for every occurrence equals 4,674 = 19 × 246.',
            },
            {
              title: 'Seyaam (Fasting)',
              detail:
                'The commandments for fasting appear in specific verses across the Quran. The sum of all relevant sura and verse numbers equals 1,387 = 19 × 73.',
            },
            {
              title: 'Zakat & Hajj (Charity & Pilgrimage)',
              detail:
                'The sum of all sura and verse numbers for Zakat and Hajj commandments combined equals 3,040 = 19 × 160, confirming their divine origin.',
            },
          ].map((pillar, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="shrink-0 flex items-center justify-center size-7 rounded-md bg-primary/10 text-primary font-mono text-xs font-semibold mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed">
                <strong>{pillar.title}:</strong> {pillar.detail}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Mathematical Structure: Suras and Verses ─────────────────────── */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-border/50" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
          The Quran&apos;s Mathematical Structure
        </h2>
        <hr className="flex-1 border-border/50" />
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          The numbers of suras and verses are themselves mathematically
          structured. The sum of all sura numbers (1 through 114) plus the
          total number of verses in each sura, plus the sum of all verse
          numbers — equals 346,199 = 19 × 19 × 959. This extraordinary
          result holds for initialed and un-initialed suras alike:
        </p>
      </section>

      <div
        data-card
        className="rounded-xl border border-border/60 overflow-hidden"
      >
        <div className="px-4 py-3 bg-primary/5 border-b border-border/40">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Sura &amp; Verse Number Totals
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-muted/30">
                <th className="text-left px-4 py-2 font-medium text-muted-foreground">
                  Category
                </th>
                <th className="text-left px-4 py-2 font-medium text-muted-foreground font-mono">
                  Total
                </th>
                <th className="text-left px-4 py-2 font-medium text-muted-foreground font-mono">
                  Multiple of 19
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ['All suras (sum of sura numbers + verses + verse number sums)', '346,199', '19 × 19 × 959'],
                ['Initialed suras only', '190,133', '19 × 10,007'],
                ['Un-initialed suras only', '156,066', '19 × 8,214'],
              ].map(([cat, total, mult], i) => (
                <tr
                  key={i}
                  className="border-b border-border/20 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-2 text-xs">{cat}</td>
                  <td className="px-4 py-2 font-mono text-xs text-primary font-medium">
                    {total}
                  </td>
                  <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                    {mult}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          Beyond these totals, the Quran&apos;s mathematical miracle extends
          to superhuman numerical combinations. When the numbers of every sura
          and every verse are written side by side in sequence, the resulting
          number &mdash; thousands of digits long &mdash; is still divisible
          by 19. This holds regardless of whether the numbers are arranged
          left-to-right or right-to-left, forward or backward. Fifteen
          different such combinations have been verified, each producing a
          number divisible by 19. No human being could have engineered this
          while simultaneously composing a book of profound literary and
          spiritual content.
        </p>
      </section>

      {/* ── Why 19? ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <hr className="flex-1 border-border/50" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground shrink-0">
          Why 19?
        </h2>
        <hr className="flex-1 border-border/50" />
      </div>

      <section className="space-y-5 text-base leading-relaxed text-foreground/90">
        <p>
          The number 19 possesses unique mathematical properties that make it
          the ideal &ldquo;signature&rdquo; of the Creator:
        </p>

        <ul className="space-y-2 text-sm text-foreground/80">
          {[
            'It is a prime number — indivisible, like God.',
            'It encompasses the first numeral (1) and the last numeral (9), proclaiming God\'s attribute in the Quran (57:3): "He is the Alpha and the Omega."',
            'Its Arabic spelling is "WAHD" (One), with a gematrical value of 6+1+8+4 = 19.',
            'Its Hebrew equivalent "VAHD" also sums to 19 (6+1+8+4).',
            'It is the sum of the first and last single-digit numbers: 9 + 10 = 19.',
            'It equals the difference of their squares: 10² − 9² = 100 − 81 = 19.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p>
          The Quran itself hints at this number in{' '}
          <QuranRef reference="74:30" />:{' '}
          &ldquo;Over it is Nineteen.&rdquo; The following verse (
          <QuranRef reference="74:31" />) explains that this number was made
          to disturb the disbelievers, to convince the Christians and Jews
          (People of the Scripture), and to strengthen the faith of the
          believers.
        </p>
      </section>

    </>
  )
}
