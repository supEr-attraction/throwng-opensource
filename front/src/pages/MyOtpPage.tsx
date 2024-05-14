import Header from "@components/Header"
import MyOtpBody from "@components/myOtp/MyOtpBody"
import "@styles/myOtp/MyOtpPage.scss"

const OtpPage = () => {
  return (
    <div className="OtpPage">
      <Header centerText="연동하기"/>
      <div className="body">
        <MyOtpBody/>
      </div>
    </div>
  )
}

export default OtpPage