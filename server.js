const express = require("express");
const app = express();
const PORT = 8080;
const server = app.listen(PORT);
console.log(`Server is running at ${PORT}`);
const socket = require("socket.io");
const io = socket(server);

//addAdress
//allDevices
//newDevice
//allDeviceReturn
var devices = [];
io.sockets.on("connection", socket => {
  console.log(`New connection made`);
  socket.on("addAddress", data => {
    var o = { id: socket.id, addr: data };
    devices.push(o);
    console.log(devices);
    socket.emit("newDevice", data);
    //Broadcast that a new device has come
    const devicesAddr = devices.map(dev => {
      return dev.addr;
    });
    io.emit("allDeviceReturn", devicesAddr);
  });
  socket.on("allDevices", () => {
    //Keep on emiting the devices
    const devicesAddr = devices.map(dev => {
      return dev.addr;
    });
    io.emit("allDeviceReturn", devicesAddr);
  });
  socket.on("disconnect", () => {
    //Remove that device
    const newDevices = devices.filter(dev => {
      return dev.id !== socket.id;
    });
    devices = newDevices;
    const devicesAddr = devices.map(dev => {
      return dev.addr;
    });
    io.emit("allDeviceReturn", devicesAddr);
  });
  socket.on("genCard", () => {
    socket.emit("isCard", true);
  });
  //   socket.on("allDevices", () => {
  //     socket.emit("allDevices", devices);
  //     io.emit("allDevices", devices);
  //   });
});
