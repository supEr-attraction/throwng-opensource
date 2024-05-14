import Header from "@components/Header";
import NotificationBody from "@components/notification/NotificationBody";
import "@styles/notification/NotificationPage.scss";

const NotificationPage = () => {
  return (
    <div className="NotificationPage">
      <Header centerText="내 알림" />
      <div className="body">
        <NotificationBody />
      </div>
    </div>
  );
};

export default NotificationPage;
