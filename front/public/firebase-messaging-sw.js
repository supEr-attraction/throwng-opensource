self.addEventListener("install", function (e) {
  // console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  // console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  const data = e.data.json();
  // console.log("Received push data:", data);

  if (!data) return;

  if (!data.notification) return;

  const notificationTitle = data.notification.title;
  const notificationData = data.notification;
  const notificationRoute = data.data;
  const notificationOptions = {
    body: notificationData.body,
    icon: notificationData.image,
    tag: notificationData.tag,
    data: {
      link: notificationRoute.link,
      time: notificationRoute.time,
    },
  };

  // console.log("Notification details:", {
  //   notificationTitle,
  //   notificationOptions,
  // });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  const urlToOpen = event.notification.data.link;
  // console.log(event.notification.data.time);
  event.notification.close();
  event.waitUntil(clients.openWindow(urlToOpen));
});
