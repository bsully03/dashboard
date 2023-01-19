import React from 'react'
import BrandIcon from './BrandIcon'
import NavIcon from './NavIcon'

export default function Navigation() {
  return (
    <div className ='Navigation'>
      <BrandIcon/>
      <NavIcon name="Overview"/>
      <NavIcon name="Metrics"/>
      <NavIcon name="Data"/>
    </div>
  )
}
