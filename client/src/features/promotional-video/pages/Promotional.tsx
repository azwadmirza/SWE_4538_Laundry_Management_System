import NavbarLaundry from "../../../partials/navbarLaundry";
import Video from "../components/video";
import '../assets/css/promotional.css';
import UploadVideo from "../components/upload-video";
import { useUploadVideo } from "../hooks/useUploadVideo";
import Loader from "../../../partials/loader";
const Promotional = () => {
    const {videoURL,setVideo,handleSubmit,isLoading}=useUploadVideo();
    return ( 
        <div className="promotional">
            <NavbarLaundry/>
            <section>
                <UploadVideo setVideo={setVideo} handleSubmit={handleSubmit}/>
                {(!isLoading && (<Video video={videoURL}/>)) || (isLoading && (<Loader/>))}
            </section>
        </div>
     );
}
 
export default Promotional;