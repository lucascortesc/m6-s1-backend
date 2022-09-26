import app from "./app";
import AppDataSource from "./data-source";

const InitConnection = async () => {
  let PORT = process.env.PORT || 8080;

  if (process.env.NODE_ENV === "test") {
    PORT = 8001;
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
//
