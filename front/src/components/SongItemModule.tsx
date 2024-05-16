import { SongItem } from "../types/songType";
import { IoMdMore } from "react-icons/io";
import "@styles/SongItemModule.scss"

interface Props {
  song: SongItem;
  type?: 'history' | 'playlist' | 'search';
  index?: number;
  onClickMore?: () => void;
  onClick?: () => void;
}

const SongItemModule = ({ song, type, index, onClickMore, onClick }: Props) => {
  
  const handleItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (type === 'playlist') {
      e.stopPropagation();
    }
    onClick?.();
  };

  const handleMoreClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onClickMore?.();
  };

  const renderDiv = () => {
    switch (type) {
      case 'history':
        return (
          <div
            key={index}
            id={`${index}`}
            className="SongItemModule"
            onClick={onClick}
          >
            {renderCommonContent()}
          </div>
        );
      case 'playlist':
        return (
          <div
            key={`${song.playlistId}-${index}`}
            id={song.youtubeId}
            className="SongItemModule"
            onClick={(e) => handleItemClick(e)}
          >
            {renderCommonContent()}
          </div>
        );
      case 'search':
      default:
        return (
          <div
            key={index}
            className="SongItemModule"
            onClick={onClick}
          >
            {renderCommonContent()}
          </div>
        );
    }
  };

  const renderCommonContent = () => (
    <div className="item">
      <div className="img-container">
        <img src={song.albumImage} loading="lazy" />
      </div>
      <div className="item-wide">
        <div className="item-detail">
          <div className="item-title">{song.title}</div>
          <div className="item-artist">{song.artist}</div>
          {type === 'history' &&
            <div className="item-comment">{song.comment}</div>
          }
        </div>
        {type === 'playlist' &&
          <div
            className="item-detail-btn"
            onClick={(e) => handleMoreClick(e)}
          >
            <IoMdMore />
          </div>
        }
      </div>
    </div>
  );

  return renderDiv();
};

export default SongItemModule;
