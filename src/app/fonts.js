import { 
    Public_Sans, 
    Fira_Code, 
    Bricolage_Grotesque, 
    Libre_Baskerville, 
    Noto_Sans_JP, 
    Noto_Serif_JP, 
    Noto_Color_Emoji 
} from 'next/font/google';
import localFont from 'next/font/local'

export const bricoGro = Bricolage_Grotesque({ 
    subsets: ['latin'],
    weight: ['200', '400', '700'],
    variable: "--font-bricolage-grotesque",
  });
export const libreBask = Libre_Baskerville({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: "--font-libre-baskerville",
    weight: ['400', '700']
});
export const publicSans = Public_Sans({ 
    subsets: ['latin'],
    weight: ['200', '400', '700'],
    variable: "--font-public-sans",
});
export const notoSansJP = Noto_Sans_JP({ 
    variable: "--font-noto-sans-jp",
    weight: ['200', '400', '700'],
    preload: false,
});
export const notoSerifJP = Noto_Serif_JP({ 
    variable: "--font-noto-serif-jp",
    weight: ['200', '400', '700'],
    preload: false,
});
export const firaCode = Fira_Code({ 
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: "--font-fira-code",
});
export const notoColorEmoji = Noto_Color_Emoji({ 
    subsets: ['emoji'],
    weight: '400',
    variable: "--font-noto-color-emoji",
});
export const urwGothic = localFont({
    variable: "--font-urw-gothic",
    src: [
        {
            path: './_fonts/urwgothic-book-webfont.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: './_fonts/urwgothic-bookoblique-webfont.woff2',
            weight: '400',
            style: 'oblique',
        },
        {
            path: './_fonts/urwgothic-demi-webfont.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: './_fonts/urwgothic-demioblique-webfont.woff2',
            weight: '700',
            style: 'oblique',
        },
    ],
    display: 'swap'
});
  