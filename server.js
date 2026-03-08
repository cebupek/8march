const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const HOST = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

// ─── HTTP Server ───────────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  const now = new Date().toISOString();

  if (req.url === "/ping" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", time: now }));
    return;
  }

  if (req.url === "/" && req.method === "GET") {
    const filePath = path.join(__dirname, "index.html");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Ошибка загрузки index.html");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
});

server.listen(PORT, () => {
  console.log(`✅ Сервер запущен: ${HOST}`);
  console.log(`🏓 Пинг каждую секунду: ${HOST}/ping`);
});

// ─── Self-Ping каждую секунду ──────────────────────────────────────────────────
let pingCount = 0;

function selfPing() {
  const url = new URL("/ping", HOST);

  const options = {
    hostname: url.hostname,
    port: url.port || (url.protocol === "https:" ? 443 : 80),
    path: "/ping",
    method: "GET",
  };

  const protocol = url.protocol === "https:" ? require("https") : http;

  const req = protocol.request(options, (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      pingCount++;
      console.log(`🏓 Ping #${pingCount} → ${res.statusCode} | ${data}`);
    });
  });

  req.on("error", (err) => {
    console.error(`❌ Ping ошибка: ${err.message}`);
  });

  req.end();
}

setTimeout(() => {
  selfPing();
  setInterval(selfPing, 1000);
}, 1000);
