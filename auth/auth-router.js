const bcrypt = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
    let user = req.body;

    // hash the password
    const hash = bcrypt.hashSync(user.password, 14); // the 8 is the number of rounds (2^8) (iterations)

    // override the plain text password with the hash
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            console.log('----->', error)
            res.status(500).json(error);
        });
});

//here is a good place to add cookie
router.post("/login", (req, res) => {
    let { username, password } = req.body;

    // check that the password

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                // in here with .compare()
                // change the users-model findBy() to return the password as well
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: "Invalid Credentials" });
            }
        })
        .catch(error => {
            console.log('----->', error)
            res.status(500).json(error);
        });
});

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                res.status(500).json({
                    message:
                        "you can checkout any time you like, but you can never leave!!!!!",
                });
            } else {
                res.status(200).json({ message: "logged out" });
            }
        });
    } else {
        res.status(200).end();
    }
});

module.exports = router;