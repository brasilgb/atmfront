import React from 'react'
import DropDownMenu from './DropDownMenu'

export default function Header() {
  return (
    <header className='flex items-center justify-end h-12 px-6 border-b bg-white shadow-sm'>
      <div>
        <DropDownMenu />
      </div>
    </header>
  )
}
