import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      database: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
    },
    jwt: {
      expiration: process.env.ACCESS_TOKEN_EXPIRATION,
      refreshExpiration: process.env.REFRESH_TOKEN_EXPIRATION,
      refreshSecret: process.env.REFRESH_TOKEN_SECRET,
      secret: process.env.ACCESS_TOKEN_SECRET,
    },
    frontend: {
      url: process.env.FRONTEND_URL,
      webapp: process.env.WEBAPP_URL,
    },
    AWSS3: {
      accessKeyId: process.env.AWSS3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWSS3_SECRET_ACCESS_KEY,
      region: process.env.AWSS3_REGION,
      bucket: process.env.AWSS3_BUCKET,
    },
  };
});
