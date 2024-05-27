import Elysia from "elysia";
import modules from "../modules";
import fs from "node:fs";
import path from "node:path";
import { App } from "..";

const registerRoutes = async (app: App) => {
	for (const key of Object.keys(modules)) {
		const module = modules[key];
		if (!module.enable || !module.url) continue;

		const moduleName = module.name;
		const controllersPath = path.resolve(
			`src/modules/${moduleName}/controller`,
		);
		const controllers = await fs.promises.readdir(controllersPath);

		for (const controller of controllers) {
			const routersModule = await import(
				path.resolve(`src/modules/${moduleName}/controller/${controller}`)
			);
			console.log(routersModule.routes, "=");
			app.use(routersModule.routes);
			app.get("/go1", () => 2);
		}
	}

	return app;
};

export default registerRoutes;
