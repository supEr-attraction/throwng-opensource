import QuizCloseLottie from "@components/lottie/QuizCloseLottie"
import MusicDropBtn from "@components/musicDrop/MusicDropBtn"
import { useNavigate } from "react-router-dom"
import "@styles/quiz/QuizClosePage.scss"

const QuizClosePage = () => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/', {replace:true})
  }

  return (
    <div className="QuizClosePage">
      <div className="body">
        <div className="header">
          <div>만료된 퀴즈입니다</div>
          <div>내일 다시 도전해 주세요</div>
        </div>
        <div><QuizCloseLottie/></div>
        <MusicDropBtn 
          onClick={goHome} 
          btnText="홈으로 이동" 
        />
      </div>
    </div>
  )
}

export default QuizClosePage