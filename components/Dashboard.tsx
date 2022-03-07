import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import getCurrentTime from "../utils/getCurrentTime";
import axios from "axios";

export default function Dashboard() {
  const { user, setUser, auth, app } = useContext(AppContext);
  const [time, setTime] = useState(null);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (user) {
      const time = getCurrentTime();
      setTime(time);
      let backgroundPosition: string;
      let color = "white";

      switch (time) {
        case "morning":
          backgroundPosition = "50% 25%";
          color = "black";
          break;
        case "afternoon":
          backgroundPosition = "50% 50%";
          color = "black";
          break;
        case "evening":
          backgroundPosition = "50% 50%";
          break;
        case "night":
          backgroundPosition = "50% 35%";
          break;
      }

      const backgroundImageStyle = {
        backgroundImage: `url(/images/${time}.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: backgroundPosition,
        color: color,
        opcaity: 0.6,
      };
      setStyle(backgroundImageStyle);
    }
  }, [user]);

  if (user) {
    return (
      <div className="dashboard-wrapper">
        <div className="greetings-card" style={style}>
          {time && (
            <h3>
              Good {time} {user.result.displayName}
            </h3>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
