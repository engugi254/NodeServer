const bcrypt = require('bcrypt');

const password = 'testpassword';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error during password hashing:', err);
  } else {
    console.log('Hashed password:', hash);
  }
});
