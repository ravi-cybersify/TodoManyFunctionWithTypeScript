import React from 'react'
import AsideMenu from './AsideMenu.tsx'
import Content from './Content.tsx'

const MyDays:React.FC = () => {
  return (
    <div className='flex ml-20 mr-28 my-12 '>
      <AsideMenu />
      <Content />
    </div>
  )
}

export default MyDays
