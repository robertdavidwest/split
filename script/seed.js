"use strict";

const {
  db,
  models: { User, Song, Section },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const user = await User.create({ username: "robert", password: "123" });

  const song = await Song.create({
    name: "Pride & Joy",
    audioUrl: "02 - Pride and Joy.mp3",
    artist: "Stevie Ray Vaughan",
  });

  await song.setUser(user);

  const section1 = await Section.create({
    label: "intro",
    start: 0,
    end: 30,
    playbackRate: 0.75,
    loop: true,
  });

  const section2 = await Section.create({
    label: "solo",
    start: 99.01,
    end: 144.1234,
    playbackRate: 0.5,
    loop: true,
  });

  await section1.setSong(song);
  await section2.setSong(song);

  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
