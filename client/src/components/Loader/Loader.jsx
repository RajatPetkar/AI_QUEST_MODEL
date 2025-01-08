import React from 'react'
import { FallingLines } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div 
    className="loader" 
    style={{ 
      display: 'grid',
      placeContent: 'center'
    }}>
      <FallingLines
        color="#A5A5A5"
        width="100"
        visible={true}
        ariaLabel='falling-lines-loading'
      />
    </div>
  )
}

export default Loader