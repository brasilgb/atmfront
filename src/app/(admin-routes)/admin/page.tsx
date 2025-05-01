
import KpisApp from '@/components/Charts/KpisApp'
import React from 'react'

export default async function Admin() {
  return (
    <div className="md:grid grid-cols-4 gap-4">
      <KpisApp />
      <KpisApp />
      <KpisApp />
      <KpisApp />
    </div>
  )
}
