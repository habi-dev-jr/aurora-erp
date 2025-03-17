import {ConnectionOptions, EntitySchema} from 'typeorm';

const connectDbConfig = (entities: any): ConnectionOptions => ({
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: entities,
  logging: process.env.TYPEORM_LOGGING === 'true',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
});

export {connectDbConfig};
