const dotenv = require("dotenv");
const zip = require("gzipme");
const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

dotenv.config();

const pgdumpPath = process.env.PG_DUMP_PATH;
const username = process.env.DB_USER;
const database = process.env.DB_NAME;
const pass = process.env.PGPASSWORD;

const date = new Date();
// const currentDate = `${date.getFullYear()}-${date.getMonth() + 1
//   }-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;
// const fileName = `${database}-${currentDate}.sql`;
const fileName = "testing.sql"

async function backup() {
  await exec(
    `${pgdumpPath} "postgresql://${username}:${pass}@127.0.0.1:5432/${database}" > backups/${fileName}`
  );
  console.log(`${pgdumpPath} "postgresql://${username}:${pass}@127.0.0.1:5432/${database}" > backups/${fileName}`)
  console.log("Backup Successfull");
}



async function main() {
  try {
    await backup();
  } catch (err) {
    console.log(err);
  }
}
main();
