'use client'

import { formatCurrency } from 'apps-common/utils'

export default function ShoesPage() {
  return (
    <p>
      {process.env.NEXT_PUBLIC_VERCEL_ENV || 'development'}
      {formatCurrency(100)}
    </p>
  )
}
