import { 
    Public_Sans, 
    Fira_Code, 
    Bricolage_Grotesque, 
    Libre_Baskerville, 
    Noto_Sans_JP, 
    Noto_Serif_JP, 
    Noto_Color_Emoji 
} from 'next/font/google';

export const bricoGro = Bricolage_Grotesque({ 
    subsets: ['latin'],
    variable: "--font-bricolage-grotesque",
  });
export const libreBask = Libre_Baskerville({
    subsets: ['latin'],
    variable: "--font-libre-baskerville",
    weight: ['400', '700']
});
export const publicSans = Public_Sans({ 
    subsets: ['latin'],
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
    variable: "--font-fira-code",
});
export const notoColorEmoji = Noto_Color_Emoji({ 
    subsets: ['emoji'],
    weight: '400',
    variable: "--font-noto-color-emoji",
});
  