import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Time Capsule Game",
  description: "A futuristic game to learn Future Perfect and Future Perfect Continuous tenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
          @keyframes move-background {
            from {
              transform: translate3d(0px, 0px, 0px);
            }
            to { 
              transform: translate3d(1000px, 0px, 0px);
            }
          }

          .stars {
            background: black url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png) repeat;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: block;
            z-index: -1;
          }

          .twinkling {
            width: 10000px;
            height: 100%;
            background: transparent url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/twinkling.png) repeat;
            background-size: 1000px 1000px;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: -1;
            animation: move-background 70s linear infinite;
          }
        `}</style>
      </head>
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}