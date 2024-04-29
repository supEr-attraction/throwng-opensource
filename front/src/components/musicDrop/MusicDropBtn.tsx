import "@styles/musicDrop/MusicDropBtn.scss";

interface Props {
  onClick:(e:React.MouseEvent<HTMLDivElement>) => void,
  btnText:string
}

const MusicDropBtn = ({onClick, btnText}:Props) => {
  return (
    <div className="put-btn-div">
      <div className="put-btn" onClick={onClick}>
        {btnText}
      </div>
    </div>
  )
}

export default MusicDropBtn