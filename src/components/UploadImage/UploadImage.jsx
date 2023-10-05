import { useEffect, useRef, useState } from 'react'
import './UploadImage.css'
import {  AiOutlineCloudUpload } from 'react-icons/ai'
import { Button, Group } from '@mantine/core'

const UploadImage = ({propertyDetails, setPropertyDetails, nextStep, prevStep}) => {
    const [ imageURL, setImageURL] = useState(propertyDetails?.image)

    const cloudinaryRef = useRef()
    const widgetRef  =useRef()

    const handleNext = ()=>{
        setPropertyDetails((prev)=>({
            ...prev,
            image:imageURL
        }))
        nextStep()
    }

    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName :"diw8fm8iw",
                uploadPreset: "v446qgqa",
                maxFiles: 1,
            },
            (err,result)=>{
                if(result.event === "success"){
                    setImageURL(result.info.secure_url)
                }
            }
        )
    },[])

  return (
    <div className='flexColCenter uploadWrapper'>
        {
            !imageURL ? (
                <div className="flexColCenter uploadZone"   
                onClick={()=>widgetRef.current?.open()}
                >
                    <AiOutlineCloudUpload size={45}/>
                    <span>Upload Image</span>
                </div>
            ):(
                <div className="uploadImage"
                onClick={()=>widgetRef.current?.open()}
                
                >
                    <img src={imageURL} alt="" />
                </div>
            )
        }
          <Group position="center" mt={"xl"}>
          <Button  onClick={prevStep}>Back</Button>
          <Button onClick={()=>handleNext()}  disabled={!imageURL} >Next</Button>
        </Group>
    </div>
  )
}

export default UploadImage