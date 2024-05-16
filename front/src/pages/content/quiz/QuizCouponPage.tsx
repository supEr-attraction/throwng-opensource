import ContentCoupon from "@/components/content/ContentCoupon";

const QuizCouponPage = () => {
  return <ContentCoupon storageKey="quizCompleted" couponType="quiz" redirectPath="/content" />;
};

export default QuizCouponPage;
