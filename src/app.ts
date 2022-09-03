import express, { Application } from "express";
import { IController } from "./interfaces/controller.interface";

class App {
  private app: Application = express();
  constructor(private controllers: IController[], private port: number) {
    this.initializeControllers(this.controllers);
    this.app.use(express.json());
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router);
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log("Server is listening on port 3000");
    });
  }
}

export default App;
