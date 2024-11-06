import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
}

const getEnvConfig = (): EnvConfig => {
  const { PORT, DATABASE_URL, JWT_SECRET } = process.env;

  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return {
    PORT: PORT || "3008",
    DATABASE_URL: DATABASE_URL,
    JWT_SECRET: JWT_SECRET,
  };
};

const envConfig = getEnvConfig();

export default envConfig;
