require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 3002;
const mongoDBURI =
  process.env.MONGO_DB_ATLAS_URL || "mongodb://localhost:27017/taraz";

  const defaultIamgePath = process.env.DEFAULT_IMAGE_PATH || "../public/images/users/avatar-default.svg";

module.exports = {
  serverPort,
  mongoDBURI,
  defaultIamgePath,
};
