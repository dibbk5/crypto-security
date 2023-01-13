let users = [];
const bcryptjs = require("bcryptjs");

module.exports = {
  login: (req, res) => {
    // console.log("Logging In User");
    // console.log(req.body);
    const { username, password } = req.body;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        const checkUser = bcryptjs.compareSync(password, users[i].saltPassword);
        if (checkUser) {
          res.status(200).send(users[i]);
        }
      }
    }
    res.status(400).send("User not found.");
  },
  register: (req, res) => {
    let { username, email, firstName, lastName, password, password2 } =
      req.body;

    if (!username || !email || !firstName || !lastName || !password) {
      return res.status(400).send("Missing Information");
    }

    const salt = bcryptjs.genSaltSync(4);
    const saltPassword = bcryptjs.hashSync(password, salt);

    const newUser = {
      username,
      email,
      firstName,
      lastName,
      saltPassword,
    };
    users.push(newUser);
    res.status(200).send(req.body);
  },
};
