import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AppModule} from "../app/app.module";
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {ConfigKey} from "./data/configs/config-keys";
import DatabaseConfig, {IDatabaseConfig} from "./data/configs/database.config";
import AppConfig from "./data/configs/app.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                DatabaseConfig,
                AppConfig
            ]
        }),
        TypeOrmModule.forRootAsync({
            useFactory: async (config: ConfigService) => {
                const db_config = await config.get<IDatabaseConfig>(ConfigKey.DATABASE)
                return  {
                    type: "postgres",
                    ...(process.env.DB_URL && {url: process.env.DB_URL}),
                    ...(!process.env.DB_URL && {
                        host: db_config.DATABASE_HOST,
                        port: db_config.DATABASE_PORT,
                        username: db_config.DATABASE_USER,
                        password: db_config.DATABASE_PASSWORD,
                        database: db_config.DATABASE,
                    }),
                    autoLoadEntities: true,
                    synchronize: false,
                    logging: true
                }
            },
            imports: [
                ConfigModule
            ],
            inject: [
                ConfigService
            ]
        }),
        AppModule
    ]

})
export class CoreModule {
}
