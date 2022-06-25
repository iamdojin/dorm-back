module.exports = () => {
  var io = require("socket.io")(strapi.server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  io.on("connection", function (socket) {
    socket.on("join", ({ username, room }) => {
      console.log("user connected");
      console.log("username is ", username);
      console.log("room is...", room);
    });
  });
};

io.on("connection", function (socket) {
  socket.on("sendMessage", async (data, callback) => {
    try {
      const user = await userExists(data.userId);
      if (user) {
        io.to(user.room).emit("message", {
          user: user.username,
          text: data.message,
        });
      } else {
        callback(`User doesn't exist in the database. Rejoin the chat`);
      }
      callback();
    } catch (err) {
      console.log("err inside catch block", err);
    }
  });
});
