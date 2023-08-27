import BackToTop from './_components/common/back-to-top'
import Footer from './_components/navigation/footer'
import Navbar from './_components/navigation/navbar'
import Providers from './_theme/providers'
import View from "./_components/view-tracking/view"
import './globals.css'
import {
  bricoGro,
  firaCode,
  libreBask,
  notoColorEmoji,
  notoSansJP,
  notoSerifJP,
  publicSans,
} from "./fonts"

export const revalidate = 10;
export const metadata = {
  title: {
    template: `%s: the lazy sundays blog`,
    default: `the lazy sundays blog`,
  },
  openGraph: {
    siteName: 'the lazy sundays blog',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/sun-concept.png',
    shortcut: '/sun-concept.png',
    apple: '/sun-concept.png',
    other: {
      rel: 'sun-concept',
      url: '/sun-concept.png',
    },
  },
};

export default function RootLayout({ children }) {
  return (
      <html lang="en" suppressHydrationWarning className={`${publicSans.variable} ${notoSansJP.variable} ${notoSerifJP.variable} ${libreBask.variable} ${bricoGro.variable} ${firaCode.variable} ${notoColorEmoji.variable}`}>
          <body className={`font-logo bg-bgprimary text-textprimary sunset-overlook`}>
            <Providers>
              <View id="home"/>
              <Navbar />
              <main id='pg-content' className='min-h-[calc(100vh-18.75rem)] px-4 py-5 sm:px-14 lg:px-20'>
                {children}
              </main>
              <BackToTop />
              <Footer />
            </Providers>
          </body>
      </html>
  )
}
