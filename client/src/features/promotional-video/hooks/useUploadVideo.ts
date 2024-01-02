import axios from "axios";
import { useEffect, useState } from "react";

export const useUploadVideo=()=>{
    const [video, setVideo] = useState<File|undefined>();
    const [videoURL,setVideoURL]=useState<string|undefined>();
    const [isLoading,setIsLoading]=useState<boolean>(false);

    useEffect(()=>{
        if(video){
          const reader=new FileReader();
          setIsLoading(true);
          reader.readAsDataURL(video);
          reader.onloadend=()=>{
            if(typeof reader.result==="string"){
              setVideoURL(reader.result);
            }
            else{
              setVideoURL("")
            }
          }
          setIsLoading(false);
        }
      },[video]);

      const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        if(!video){
            return;
        }
        e.preventDefault();
        setIsLoading(true);
        const formData=new FormData();
        formData.append("video",video as Blob);
        await axios.put(import.meta.env.VITE_SERVER+"/api/promotional-video/upload",formData,{
                headers:{
                    "Content-Type":"multipart/form-data",
                    "Authorization":"Bearer "+localStorage.getItem("token")
                }
        }).then((res)=>{
            console.log(res.data);
            }
        ).catch((err)=>{
            console.log(err);
        });
        setIsLoading(false);
      }

    return {setVideo,videoURL,handleSubmit,isLoading}
}