import { useNavigate } from "react-router-dom"
import {Song} from "../../types/songType.ts"
import SearchedWords from "./SearchedWords.tsx"
import "@styles/musicSearch/MusicList.scss"
import { useRecoilValue, useResetRecoilState } from "recoil"
import { inputSearchKeyWord, searchResultsState } from "@store/musicSearch/atoms.ts"
import { useEffect } from "react"

interface Props {
  onWordClick: (title: string) => void,
}

const MusicList = ({onWordClick}: Props) => {
  const searchResults = useRecoilValue(searchResultsState);
  const navigate = useNavigate();
  const title = useRecoilValue(inputSearchKeyWord);
  const resetSearchResults = useResetRecoilState(searchResultsState);

  useEffect(() => {
    resetSearchResults();
  }, [title]);

  const handleGoNavigation = (song : Song) => {
    navigate(`/music/drop/${song.youtubeId}`, {state: {song:song}})
  }

  return (
    <div className="MusicList">
      {searchResults && searchResults.length > 0 ? (
        <div className="searchResults">
          {searchResults.map((song, index:number) => (
            <div key={index} className="result-item" onClick={() => handleGoNavigation(song)}>
              
              <div className="image-container">
                <img src={song.albumImage}/>
              </div>

              <div className="item-wide">
                <div className="item-detail">
                  <div className="item-title">{song.title}</div>
                  <div className="item-artist">{song.artist}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <SearchedWords onWordClick={onWordClick} />
      )}
    </div>
  )
}

export default MusicList