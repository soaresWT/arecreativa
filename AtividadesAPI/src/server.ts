import app from "./app";
import envConfig from "./config/env";

const PORT = envConfig.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
