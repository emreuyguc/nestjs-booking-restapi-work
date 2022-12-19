import { registerAs } from "@nestjs/config";
import { ConfigKey } from "./config-keys";

export interface IAppConfig {
  SERVER_PORT
}

export default registerAs(ConfigKey.APP, ():IAppConfig => ({
  SERVER_PORT  : 4000
}));