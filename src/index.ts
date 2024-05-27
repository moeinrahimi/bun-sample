import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import registerRoutes from "./libs/registerRoutes";
const app = new Elysia().use(swagger()).get("/", () => "Hello eeee 21");
await registerRoutes(app)
// import './models'
import http from "http";
const server = http.createServer(app);

const io = new Server(server);
io.on("connection", (socket) => {
	console.log("a user connected");
	io.emit("test", { hello: 1 });
	socket.on("ping", (e) => {
		console.log(e, "ping sent");
		socket.emit("pong", "pong!");
	});
});

server.listen(3000);
console.log(`🦊 Elysia is running at `);
import { Server } from "socket.io";
export type App = typeof app;

// socketio works fine
// eslint(not working on bun)
// setup https://biomejs.dev/guides/getting-started/
// integrate with vscode and etc https://biomejs.dev/guides/integrate-in-editor/
// tsconfig
// prettier
// sample structure
//https://github.com/agnyz/the-bed-stack/tree/main/src