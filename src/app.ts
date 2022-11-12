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
    try {
      await Promise.all(
        databaseConnectors.map((databaseConnector) =>
          databaseConnector.connect()
        )
      );
      console.log("connected to db");
    } catch (error) {
      throw new Error("Unable to connect to database");
    }
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
      console.log("Server is listening on port 3000");
      await this.connectDbs(this.databaseConnectors);
    });
  }
}

export default App;
