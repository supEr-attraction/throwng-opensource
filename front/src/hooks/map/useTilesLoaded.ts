// useTilesLoaded.ts - 커스텀 훅으로 분리
import { useState, useCallback } from "react";

const useTilesLoaded = () => {
  const [tilesLoaded, setTilesLoaded] = useState(false);

  console.log(tilesLoaded);

  const onTilesLoaded = useCallback(() => {
    if (!tilesLoaded) {
      setTilesLoaded(true);
    }
  }, [tilesLoaded]);

  return { tilesLoaded, onTilesLoaded };
};

export default useTilesLoaded;
