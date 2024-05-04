import Header from "@components/Header"
import MyCouponBody from "@components/myCoupon/MyCouponBody"
import "@styles/myCoupon/MyCouponPage.scss"

const MyCouponPage = () => {
  return (
    <div className="MyCouponPage">
      <Header centerText="쿠폰함"/>
      <div className="body none-scroll">
        <MyCouponBody />
      </div>
    </div>
  )
}

export default MyCouponPage