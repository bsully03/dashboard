import React from 'react'
import BrandIcon from './BrandIcon'
import NavIcon from './NavIcon'

export default function Navigation() {
  return (
    <div class ='Navigation'>
      <BrandIcon/>
      <NavIcon name="Here"/>
      <NavIcon name="Test"/>
      <NavIcon name="Three"/>
    </div>
  )
}
