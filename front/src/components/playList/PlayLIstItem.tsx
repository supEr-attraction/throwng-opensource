import PlayListItemModal from "./PlayListItemModal";
import PlayListDirectListenModal from "./PlayListDirectListenModal";
import { Content } from "../../types/songType";
import { useRecoilValue } from "recoil";
import { detailModal, speedListenModal } from "@store/playList/atoms";
import SongItemModule from "@components/SongItemModule";

interface Props {
  song: Content;
  index: number;
  deleteSongFromPlayList: (index: number) => void;
  modalStateHandler: (index: number) => void;
  speedListenModalHandler: (index: number) => void;
}

const PlayListItem = ({ song, index, deleteSongFromPlayList, modalStateHandler, speedListenModalHandler }: Props) => {
  const modalSongIndex = useRecoilValue<number | null>(detailModal);
  const speedModal = useRecoilValue<number | null>(speedListenModal);
  
  return (
    <>
      <SongItemModule
        song={song}
        type="playlist"
        index={index}
        onClick={() => speedListenModalHandler(index)}
        onClickMore={() => modalStateHandler(index)}
      />
      {modalSongIndex === index && (
        <PlayListItemModal song={song} deleteSongFromPlayList={deleteSongFromPlayList} />
      )}
      {speedModal === index && <PlayListDirectListenModal song={song} />}
    </>
  );
};
export default PlayListItem;
