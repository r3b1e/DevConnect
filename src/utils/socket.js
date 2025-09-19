const socket = require("socket.io");
const Chat = require("../models/chat");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173" || "*",
    },
  });

  io.on("connection", (socket) => {
    //Handle events
    socket.on("joinChat", ({ fromUserId, toUserId }) => {
      const room = [fromUserId, toUserId].sort().join("_");
      console.log(room);
      socket.join(room);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, fromUserId, toUserId, text }) => {
        try {
          const roomId = [fromUserId, toUserId].sort().join("_");
          console.log(firstName + " " + text);
          let chat = await Chat.findOne({
            participants: { $all: [fromUserId, toUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [fromUserId, toUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: fromUserId,
            text,
          });

          await chat.save();

          io.to(roomId).emit("messageReceived", { firstName, text });
        } catch (error) {
          console.log(error);
        }
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
