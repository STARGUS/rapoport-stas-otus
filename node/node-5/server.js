const http = require("http");
const fs = require("fs");
const express = require("express");
const app = express();

const server = http.createServer(app);

// Загружаем socket.io
const { Server } = require("socket.io");
const { join } = require("path");
app.use(express.static(join(__dirname, "page")));
const io = new Server(server);
const GEOJSONFILE = "./geojson.json";

io.on("connection", (socket) => {
  const newFile = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [],
        },
        properties: { prop0: "value0" },
      },
      {
        type: "Feature",
        geometry: { type: "LineString", coordinates: [] },
        properties: { prop0: "value0", prop1: 0 },
      },
    ],
  };
  fs.writeFileSync(GEOJSONFILE, JSON.stringify(newFile));
  socket.on("geolocation", ({ lat, lng }) => {
    if ((!!lat && !!lng && typeof lat == "number", typeof lng == "number")) {
      const data = JSON.parse(fs.readFileSync(GEOJSONFILE, "utf8"));
      if (!!data) {
        data.features[1].geometry.coordinates.push([lat, lng]); // Маршрут движения
        data.features[0].geometry.coordinates = [lat, lng]; // Флаг текущей координаты
        fs.writeFileSync(GEOJSONFILE, JSON.stringify(data));
        socket.emit("geoMap", {
          position: data.features[1].geometry.coordinates,
          location: [lat, lng],
        });
      }
    }
  });
});

server.listen(3000, () => console.log("Сервер стартанул"));
