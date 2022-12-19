import { registerAs } from "@nestjs/config";
import { ConfigKey } from "./config-keys";

export interface IDatabaseConfig {
  DATABASE_HOST:string;
  DATABASE_PORT:number;
  DATABASE_USER:string;
  DATABASE_PASSWORD:string;
  DATABASE:string
}

export default registerAs(ConfigKey.DATABASE, ():IDatabaseConfig => ({
  DATABASE_HOST:'psql-mock-database-cloud.postgres.database.azure.com',
  DATABASE_PORT:5432,
  DATABASE_USER:'jfconfusnwkeyxlwuyxphxjs@psql-mock-database-cloud',
  DATABASE_PASSWORD:'vtkqogkurtlylkvbncskfpbn',
  DATABASE:'booking1671309653167dovtoelvurhihlbh'
}));