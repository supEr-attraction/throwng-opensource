import Header from "@components/Header";
import NotificationBody from "@components/notification/NotificationBody";

const NotificationPage = () => {
  return (
    <div className="NotificationPage">
      <Header centerText="내 알림" />
      <NotificationBody />
    </div>
  );
};

export default NotificationPage;
