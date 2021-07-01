const dotenv = require("dotenv");
const zip = require("gzipme");
const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

dotenv.config();

const pgrestorePath = process.env.PG_RESTORE_PATH;
const username = process.env.DB_USER;
const database = process.env.DB_NAME;
const pass = process.env.PGPASSWORD;

const date = new Date();
// const currentDate = `${date.getFullYear()}-${date.getMonth() + 1
//   }-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;
// const fileName = `${database}-${currentDate}.sql`;
const fileName = "testing.sql"
const dropDB = `${pgrestorePath} "postgresql://${username}:${pass}@127.0.0.1:5433" -c "drop database ${database}"`
const createDB = `${pgrestorePath} "postgresql://${username}:${pass}@127.0.0.1:5433" -c "create database ${database}"`
const restoreDB = `${pgrestorePath} "postgresql://${username}:${pass}@127.0.0.1:5433/${database}" < backups/${fileName}`

async function restore() {
  // console.log(dropDB)
  await exec(dropDB)
  await exec(createDB)
  await exec(restoreDB)

  console.log("restore Successfull");
}



async function main() {
  try {
    await restore();
  } catch (err) {
    console.log(err);
  }
}
main();
