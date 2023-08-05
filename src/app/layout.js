import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Firiya ECommerce Task',
  description: 'Task for Firiya',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={'min-h-screen bg-gray-200 ' + inter.className}>
        <Header/>
        {children}
      </body>
    </html>
  )
}
