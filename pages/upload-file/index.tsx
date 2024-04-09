import Dropzone from '@/components/dropzone'
import React from 'react'


const UploadFile = () => {
  return (
    <div>
        <Dropzone multipleFiles={true} onModelsDrop={() => {}}/>
    </div>
  )
}

export default UploadFile