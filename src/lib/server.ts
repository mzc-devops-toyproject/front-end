import { createApi, AvailMethods } from "../api/api";
import { ServerList } from "../config/serverList";

export interface Server {
  name: string,
  url: URL,
  healthCheckPath: string,
}

export interface ServerInterface extends Server {
  checkHealth: () => Promise<boolean>
}

export const createServerInterface = (server: Server): ServerInterface => {
  return {
    ...server,
    async checkHealth() {
      try {
        const serverApi = createApi(server.url.toString());
        const healthResponse = await serverApi({ path: server.healthCheckPath, option: { method: AvailMethods.GET } })();
        return !!healthResponse.status;
      }
      catch {
        return false;
      }
    }
  }
}

export const healthCheckServerList = ServerList.map(createServerInterface)