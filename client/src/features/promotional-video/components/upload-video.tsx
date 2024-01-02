import { Card } from "react-bootstrap";

interface UploadVideoProps{
    setVideo:React.Dispatch<React.SetStateAction<File | undefined>>;
    handleSubmit:(e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  }

const UploadVideo = ({setVideo,handleSubmit}:UploadVideoProps) => {
  return (
    <div className="upload-video">
      <Card>
        <Card.Header className="card-header">Upload Promotional Video</Card.Header>
        <Card.Body>
        <form onSubmit={handleSubmit}>
        <div className="input-group flex">
          <input
            type="file"
            name="file"
            accept="video/*"
            id="imageFileProfile"
            className="form-control"
            onChange={(e) => {
              if (e.target.files !== null) {
                setVideo(e.target.files[0]);
              }
            }}
          />
          <div className="w-100">

          <button type="submit" className="full-width custom-button mx-auto">Upload Video</button>
          </div>
        </div>
      </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UploadVideo;
