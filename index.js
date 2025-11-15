import dotenv from "dotenv";
import { app, server } from "./src/server.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Servidor corriendo en http://localhost:${PORT}/realTimeProducts`);
});