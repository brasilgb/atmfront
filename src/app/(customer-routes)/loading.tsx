import React from 'react'

export default function Loading() {
  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 bg-gray-900/20'>
      <div className='flex items-center justify-center h-full'>
        <div className='w-16 h-16 border-4 border-y-sky-600 animate-spin rounded-full'/>
      </div>
    </div>
  )
}