
exports.seed = function (knex) {
  return knex("users").insert([
    { username: "april", password: "pass1" },
    { username: "jen", password: "pass2" },
    { username: "michael", password: "pass3" },
  ]);
};
