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
    title: 'Khishwe',
    authors: [
        {
            name: 'Khishwe',
        }
    ],
    icons: {
        icon: '/images/favicon.ico'
    },
    openGraph: {
        title: 'Khishwe',
        images: [
            {
                url: '',
                width: 1200,
                height: 630,
                alt: 'Khishwe',
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
            {children}
        </main>
        </body>
        </html>
    );
}
