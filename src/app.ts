import express, { Application } from "express";
import { IDbConnector } from "./db/IDbConnector";
import { IController } from "./interfaces/controller.interface";

class App {
  private readonly app: Application;
  constructor(
    private controllers: IController[],
    private port: number,
    private databaseConnectors: IDbConnector[]
  ) {
    this.app = express();
    this.initializeMiddlewares(this.app);
    this.initializeControllers(this.app, this.controllers);
  }

  private async connectDbs(databaseConnectors: IDbConnector[]) {
    await Promise.all(
      databaseConnectors.map((databaseConnector) => {
        return databaseConnector.connect();
      })
    );
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
    this.app.listen(this.port, async () => {
      await this.connectDbs(this.databaseConnectors);
      console.log("Server is listening on port 3000");
    });
  }
}

export default App;
