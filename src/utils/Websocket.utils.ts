import { WebSocketServer } from "ws";
import { httpServer } from "../index.js";
import talkcollection from "../models/talkcollection.model.js";


const webSocketControl = async () => {
  const wss = new WebSocketServer({
    server: httpServer,
  });
  wss.on("connection", (ws) => {
    console.log("Connected");
    ws.on("message", async (message) => {
      const data = JSON.parse(message);
      if (data.format == "GroupChat") {
        const savedData = new talkcollection({
          group_name: data.group_name,
          name: data.name,
          email: data.email,
          message: data.message,
          image: data.image,
          image_title: data.image_title,
          date: data.date,
        });
        wss.clients.forEach((client) => {
          if (client.readyState == ws.OPEN) {
            client.send(JSON.stringify(savedData));
          }
        });
        await savedData.save();
      } else if (data.type) {
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === ws.OPEN) {
            client.send(message);
          }
        });
      } else {
        console.log("Unknown message type", data);
      }
    });
    ws.on("close", () => {
      console.log("Disconnected");
    });
  });
};

export default webSocketControl;
