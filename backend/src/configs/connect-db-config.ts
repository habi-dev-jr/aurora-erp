import {ConnectionOptions, EntitySchema} from 'typeorm';
import { EnvFrom } from "../utils";

const connectDbConfig = (entities: any): ConnectionOptions => ({
  type: 'mysql',
  host: EnvFrom(process.env, 'TYPEORM_HOST'),
  port: Number(EnvFrom(process.env, 'TYPEORM_PORT')),
  username: EnvFrom(process.env, 'TYPEORM_USERNAME'),
  password: EnvFrom(process.env, 'TYPEORM_PASSWORD'),
  database: EnvFrom(process.env, 'TYPEORM_DATABASE'),
  entities: entities,
  logging: EnvFrom(process.env, 'TYPEORM_LOGGING') === 'true',
  synchronize: EnvFrom(process.env, 'TYPEORM_SYNCHRONIZE') === 'true',
});

export {connectDbConfig};
