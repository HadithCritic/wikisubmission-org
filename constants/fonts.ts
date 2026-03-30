import { Sora, Geist_Mono, Amiri, Plus_Jakarta_Sans } from 'next/font/google'
import localFont from "next/font/local";

const glacial = localFont({
    src: "../public/font/GlacialIndifference-Regular.otf",
    weight: '400'
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
})

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
})

export const Fonts = {
  glacial: glacial,
  geistMono: geistMono,
  amiri: amiri,
}
