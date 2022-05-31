<<<<<<< HEAD
const { nanoid } = require("nanoid");

const shortId = {
  type: String,
  default: () => {
    return nanoid();
  },
  require: true,
  index: true,
};

module.exports = shortId;
=======
// import { nanoid } from "nanoid";

// const shortId = {
//   type: String,
//   default: () => {
//     return nanoid();
//   },
//   require: true,
//   index: true,
// };

// module.exports = shortId;
>>>>>>> 62d8994caa487708456fa704d0a03d56cccc5f10
