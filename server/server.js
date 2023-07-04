

const app = require("./app");
const cloudinary=require('cloudinary')



//handled Unchaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down server due to unhandled Unchaught Exception`);
  process.exit(1);
})

const dotenv = require('dotenv');
dotenv.config({path:"MERN_PROJECT_2\server\config\config.env"});

//conntion with database
require('./db/conn')

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME||"db9gfpozg",
  api_key:process.env.CLOUDINARY_API_KEY ||"854454422457697",
  api_secret:process.env.CLOUDINARY_API_SECRET||"ZdUVeuxm2YbI5wzCGsnWSVao7Fs"
})

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log(`server is running at ${PORT}..`);
})



//handled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down server due to unhandled promise rejection`);
  server.close((err) => {
    process.exit(1);
  });


})