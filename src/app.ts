import { Server } from './server';
export class App {
  server?: Server;

  constructor() {
    const port =  "8000";
    this.server = new Server(port);
  }

  async start() {
    try {
      await this.server?.listen();
    } catch (error) {
      console.error(error as string);
    }
  }

  async stop() {
    return this.server?.stop();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }
}