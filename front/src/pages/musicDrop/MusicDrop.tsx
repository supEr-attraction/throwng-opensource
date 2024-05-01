import "@styles/musicDrop/MusicDrop.scss"
import MusicDropHeader from "@components/musicDrop/MusicDropHeader";
import MusicDropBody from "@components/musicDrop/MusicDropBody";
import { useState } from "react";
import Loading from "@components/Loading";

const MusicDrop = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
    {isLoading ? <Loading /> :
      <>
        <MusicDropHeader />
        <MusicDropBody setIsLoading={setIsLoading}/>
      </>
    }
    </>
  )
};

export default MusicDrop