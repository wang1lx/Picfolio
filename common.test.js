// const should = chai.should();

// const createDefaultUser = async () => {
//   const newUser = new User(defaultUser);
//   await newUser.save();
// };

// const getDefaultUser = async () => {
//   const users = await User.findOne({ email: defaultUser.email });
//   if (users.length === 0) {
//     await createUser();
//   } else {
//     return users[0];
//   }
// };

// const loginWithDefaultUser = async () => {
//   return request
//     .post('/api/auth')
//     .send({ email: defaultUser.email, password: defaultUser.password })
// };

// const cleanAllUsers = async () => {
//   await User.deleteMany({});
// };
