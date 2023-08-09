import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@components/Header";
import Providers from "@providers/sessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Firiya ECommerce Task",
  description: "Task for Firiya",
};
export default async function RootLayout({ children }) 
{
  const session = await getServerSession(authOptions);

  return (
    <html lang="tr">
      <body className={"min-h-screen bg-gray-200 " + inter.className}>
        <Providers session={session}>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
