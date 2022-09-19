import AppDataSource from "./data-source";
import app from "./app";

const InitConnection = async () => {
  let PORT = process.env.PORT || 3001;

  if (process.env.NODE_ENV === "test") {
    PORT = 3000;
  }

  await AppDataSource.initialize()
    .then(() => {
      console.log(`CONNECTION STABLISHED WITH DATABASE`);
    })
    .catch((error) => {
      console.log(error);
    });

  app.listen(PORT, () => {
    console.log(`Application running on port: ${PORT}`);
  });
};

InitConnection();