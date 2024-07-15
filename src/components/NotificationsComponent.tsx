"use client";

import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface Notification {
  message: string;
}

const socket: Socket = io("http://localhost:3000", { withCredentials: true });

const NotificationsComponent: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    socket.on("vendor-notification", (notification: Notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off("vendor-notification");
    };
  }, []);

  useEffect(() => {
    const checkFairDates = () => {
      const now = new Date();
      const fairStartDate = new Date("YYYY-MM-DD"); 
      const dayBeforeFairStart = new Date(fairStartDate);
      dayBeforeFairStart.setDate(fairStartDate.getDate() - 1);

      if (now >= dayBeforeFairStart && now < fairStartDate) {
        socket.emit("notify-vendor", {
          message: "Último día para cargar productos",
        });
      }
    };

    const interval = setInterval(checkFairDates, 86400000); // para que verifique una vez al día

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsComponent;
