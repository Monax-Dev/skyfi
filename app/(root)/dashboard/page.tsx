import Link from 'next/link'
import DashboardLayout  from './layout'
import React from 'react'

export default function Dashboard() {
  return (
    <>
      /Dasboard
      <Link href="/" className="underline">
              Sign up
            </Link>
            <Link href="/racine" className="underline">
             racp
            </Link>
    </>
  )
}
