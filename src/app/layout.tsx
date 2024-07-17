import "~/styles/globals.css";

import { Nunito } from "next/font/google";
import { cn } from "~/lib/utils";
import { Toaster } from "~/components/ui/toaster";

const nunito = Nunito({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata = {
  title: "Lucas e Ana Júlia",
  description: "Site para convidados do casamento",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("overflow-x-hidden", ...nunito.className)}>
      <body className="overflow-x-hidden text-cream">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
