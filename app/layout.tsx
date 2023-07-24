import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import RentModal from './components/modals/RentModal'

import getCurrentUser from './actions/getCurrentUser'
import ToastProvider from './components/provider/ToastProvider'
import SearchModal from './components/modals/SearchModal'

const font = Poppins(
  {
    subsets: ['latin'],
    weight: ['400']
  }
)

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone using NextJS',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToastProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
