import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {League_Gothic} from "next/font/google";
import "./globals.css";
import "./layout.css";

import localFont from 'next/font/local'
import Nav from './components/Nav'

const inter = Inter({subsets: ["latin"]});
const league_gothic = League_Gothic({subsets: ["latin"]})

const edo = localFont({
    src: [
        {
            path: '../public/fonts/edo.ttf',
            weight: '800',
        },
    ],
    variable: '--font-edo',
})

export const metadata: Metadata = {
    title: 'Aeons',
    description: 'Aeons are vibrant, chaotic, and rebellious beings, brought to life in a neo-expressionist style. Embodying a pursuit of exploration and a dream to bring art to the eternal chain, Aeons merge the worlds of fine art and PFPs, introducing a fresh and unique style to ordinals.',
    authors: [
        {
            name: 'ei0haro',
            url: 'https://x.com/ei0haro'
        }
    ],
    icons: {
        icon: '/favicon.ico'
    },
    openGraph: {
        title: 'Aeons',
        description: 'Aeons are vibrant, chaotic, and rebellious beings, brought to life in a neo-expressionist style. Embodying a pursuit of exploration and a dream to bring art to the eternal chain, Aeons merge the worlds of fine art and PFPs, introducing a fresh and unique style to ordinals.',
        url: 'https://aeonsbtc.com',
        images: [
            {
                url: 'https://aeonsbtc.com/Number1.png',
                width: 1200,
                height: 630,
                alt: 'Aeons',
            },
        ],

    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">

        <body className={`${edo.variable} ${inter.className} ${league_gothic.className}`}>
        <main
            className="main flex min-h-screen flex-col items-center justify-center bg-cover bg-[url('/blackaeonsbg.png')]">
            <Nav/>
            {children}
        </main>
        </body>
        </html>
    );
}
