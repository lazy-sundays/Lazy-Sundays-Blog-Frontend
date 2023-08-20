import BackToTop from './_components/common/back-to-top'
import Footer from './_components/navigation/footer'
import Navbar from './_components/navigation/navbar'
import Providers from './_theme/providers'
import './globals.css'
import { Public_Sans, Fira_Code, Bricolage_Grotesque, Libre_Baskerville, Noto_Sans_JP, Noto_Color_Emoji } from 'next/font/google'

const bricoGro = Bricolage_Grotesque({ 
  subsets: ['latin'],
  variable: "--font-bricolage-grotesque",
});
const libreBask = Libre_Baskerville({
  subsets: ['latin'],
  variable: "--font-libre-baskerville",
  weight: '400'
});
const publicSans = Public_Sans({ 
  subsets: ['latin'],
  variable: "--font-public-sans",
});
const notoSansJP = Noto_Sans_JP({ 
  variable: "--font-noto-sans-jp",
  weight: '400',
  preload: false,
});
const firaCode = Fira_Code({ 
  subsets: ['latin'],
  variable: "--font-fira-code",
});
const notoColorEmoji = Noto_Color_Emoji({ 
  subsets: ['emoji'],
  weight: '400',
  variable: "--font-noto-color-emoji",
});


export const revalidate = 10;
export const metadata = {
  title: 'the lazy sundays blog',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
      <html lang="en" suppressHydrationWarning className={`${publicSans.variable} ${notoSansJP.variable} ${libreBask.variable} ${bricoGro.variable} ${firaCode.variable} ${notoColorEmoji.variable}`}>
          <body className={`font-logo bg-bgprimary text-textprimary sunset-overlook`}>
            <Providers>
              <Navbar />
              <main id='pg-content' className='mb-auto min-h-[calc(100vh-18.75rem)] px-4 pt-5 pb-10 sm:px-14 lg:px-20'>
                {children}
              </main>
              <BackToTop />
              <Footer />
            </Providers>
          </body>
      </html>
  )
}