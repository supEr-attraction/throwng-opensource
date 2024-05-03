import MusicDropHeader from "@components/musicDrop/MusicDropHeader";
import MusicDropBody from "@components/musicDrop/MusicDropBody";
import { useState } from "react";
import Loading from "@components/Loading";
import "@styles/musicDrop/MusicDrop.scss";

const MusicDrop = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="MusicDrop">
          <MusicDropHeader />
          <MusicDropBody setIsLoading={setIsLoading} />
        </div>
      )}
    </>
  );
};

export default MusicDrop;
