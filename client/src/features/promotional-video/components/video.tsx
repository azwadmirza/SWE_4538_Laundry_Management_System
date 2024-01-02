interface IVideoProps{
    video:string|undefined;
}
const Video = ({video}:IVideoProps) => {
  return (
    <div className="video justify-content-center d-flex">
      <video src={video} controls width="100%" height="auto">
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
