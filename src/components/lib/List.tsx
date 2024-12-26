import React from 'react'

interface list{
    icon: React.ReactNode,
    name: string
}

const List:React.FC<list> = ({icon,name})=> {
  return (
    <div className='flex gap-3 border pr-12 pl-2 py-1  '>
      <span className='text-green-400'>{icon}</span>
      <span className='text-lg'>{name}</span>
    </div>
  )
}

export default List
