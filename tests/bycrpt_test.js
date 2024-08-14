const bcrypt = require('bcrypt');

bcrypt.hash("1234", 10)
    .then(hash => {
        console.log(hash);
    });