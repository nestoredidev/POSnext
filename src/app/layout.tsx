import type {Metadata} from "next";
import {Outfit} from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";

const outfit = Outfit({
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "POS-Venta",
    description: "POS-venta moderno y minimalista",
};

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="es">
        <head>
            <link rel="icon" href="/logo.svg"/>
        </head>
        <body
            className={`${outfit.className} antialiased bg-gray-200`}
        >
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
