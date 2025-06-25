import React from 'react'

type ItemGridProps = {
  items: object[]
}

const ItemGrid: React.FC<ItemGridProps> = ({ items }) => {

  if(items.length == 0) 
  return (
    <div className='mt-5 flex justify-center'>
      <h1 className='text-3xl italic'>No publications...</h1>
    </div>
  )

  return (
    <div className='grid grid-cols-3'>
      {/* <p>{items.}</p> */}
    </div>
  )
}

export default ItemGrid