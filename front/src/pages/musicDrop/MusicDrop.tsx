import "@styles/musicDrop/MusicDrop.scss"
import { useLocation } from "react-router-dom";
import MusicDropHeader from "@components/musicDrop/MusicDropHeader";
import MusicDropBody from "@components/musicDrop/MusicDropBody";

const MusicDrop = () => {  
  const location = useLocation();
  const songInfo = location.state!

  return (
    <>
      <MusicDropHeader songInfo={songInfo.song}/>
      <MusicDropBody />
    </>
  )
};

export default MusicDrop