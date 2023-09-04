import BackToTop from './_components/common/back-to-top'
import Footer from './_components/navigation/footer'
import Navbar from './_components/navigation/navbar'
import View from "./_components/view-tracking/view"
import Providers from './_theme/providers'
import {
  bricoGro,
  firaCode,
  libreBask,
  notoColorEmoji,
  notoSansJP,
  notoSerifJP,
  publicSans,
  urwGothic
} from "./fonts"
import './globals.css'
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

export const revalidate = process.env.REVALIDATION_TIME;
export const metadata = {
  title: {
    template: `%s — the lazy sundays blog`,
    default: `the lazy sundays blog`,
  },
  openGraph: {
    siteName: 'the lazy sundays blog',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
      <html lang="en" suppressHydrationWarning className={`${urwGothic.variable} ${publicSans.variable} ${notoSansJP.variable} ${notoSerifJP.variable} ${libreBask.variable} ${bricoGro.variable} ${firaCode.variable} ${notoColorEmoji.variable}`}>
          <body className={`flex flex-col min-h-screen justify-start content-center font-logo bg-bgprimary text-textprimary sunset-overlook`}>
            <Providers>
              <View id="home"/>
              <Navbar />
              <main id='pg-content' className='self-center w-full px-4 sm:px-14 lg:px-20 pb-5 max-w-screen-readable'>
                {children}
              </main>
              <BackToTop />
              <Footer />
            </Providers>
          </body>
      </html>
  )
}
