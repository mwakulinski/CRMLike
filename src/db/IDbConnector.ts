export interface IDbConnector {
  connect: () => Promise<void>;
}
