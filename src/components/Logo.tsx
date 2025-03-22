import React from 'react'
import { PiShootingStarFill } from 'react-icons/pi'

export default function Logo() {
  return (
    <div className="flex flex-row items-center">
    <a href="/" className="flex flex-row items-center gap-2 text-black font-semibold text-lg">
    <PiShootingStarFill  size={24} />
      <span className="text-black">KeyMap</span>
    </a>
  </div>
  )
}
