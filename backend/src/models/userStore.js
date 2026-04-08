const users = [];

export const userStore = {
  create(user) {
    users.push(user);
    return user;
  },
  findByEmail(email) {
    return users.find((user) => user.email === email);
  },
  findById(id) {
    return users.find((user) => user.id === id);
  }
};
