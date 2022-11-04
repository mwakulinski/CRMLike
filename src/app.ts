import express, { Application } from "express";
import { IController } from "./interfaces/controller.interface";

class App {
  private readonly app: Application;
  constructor(private controllers: IController[], private port: number) {
    this.app = express();
    this.initializeMiddlewares(this.app);
    this.initializeControllers(this.app, this.controllers);
  }

  private initializeMiddlewares(app: Application) {
    app.use(express.json());
  }

  private initializeControllers(app: Application, controllers: IController[]) {
    controllers.forEach((controller) => {
      app.use("/api", controller.router);
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log("Server is listening on port 3000");
    });
  }
}

export default App;
