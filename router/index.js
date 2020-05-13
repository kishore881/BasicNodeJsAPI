const express = require("express");
const shortid = require("shortid");
const router = express.Router();
const userModel = require("../db/model");

// @route: POST /api/users
// @desc:  Add a new user

router.post("/users", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const userId = shortid.generate();

  if (!username || !email) {
    res.send("Both username and email are required");
  } else {
    if (await userModel.findOne({ username }))
      res.send("username is already taken");
    else if (await userModel.findOne({ email }))
      res.send("email is already taken");
    else {
      if (!validEmail(email)) res.send("Invalid email");
      else {
        const user = new userModel({ username, userId, email });
        await user.save();
        res.json(transform(user));
      }
    }
  }
});

// @route: GET /api/users
// @desc:  Get all the users

router.get("/users", async (req, res) => {
  const users = await userModel.find({}, (err, result) => {
    if (err) console.log(err);
    else {
      return result;
    }
  });

  if (users.length > 0) {
    users.forEach((user, index, array) => {
      array[index] = transform(user);
    });
    res.json(users);
  } else {
    res.send("No users found");
  }
});

// @route: GET /api/users/:id
// @desc:  Get user with specific id

router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findOne({ userId: id }, (err, result) => {
    if (err) console.log(err);
    else {
      return result;
    }
  });

  if (user) {
    res.json(transform(user));
  } else {
    res.send("User does not exist");
  }
});

// @route: PUT /api/users/:id
// @desc:  Update user with specific id

router.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  if ((await userModel.findOne({ userId: id })) == null)
    res.send("User does not exist");
  else {
    const username = req.body.username;
    const email = req.body.email;

    if (!email && !username) {
      res.send("Enter username or email to update");
    } else {
      if (email && !validEmail(email)) {
        res.send("Invalid email");
      } else {
        var update = {};

        if (email) update.email = email;
        if (username) update.username = username;

        const user = await userModel.findOneAndUpdate({ userId: id }, update, {
          new: true,
        });

        res.json(transform(user));
      }
    }
  }
});

// @route: DELETE /api/users/:id
// @desc: Delete a user with specific id

router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findOneAndDelete({ userId: id });

  if (user) {
    res.send(`Deleted user: ${user.username}`);
  } else {
    res.send(`User does not exist`);
  }
});

module.exports = router;

function validEmail(email) {
  if (
    email.includes("@") &&
    email.indexOf("@") < email.length - 1 &&
    email.indexOf("@") > 0
  )
    return true;
  else return false;
}

function transform(user) {
  return { username: user.username, userId: user.userId, email: user.email };
}
