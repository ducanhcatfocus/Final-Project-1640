const { spawn } = require("child_process");

//mongodump --uri mongodb+srv://databaseproject1:<PASSWORD>@project1.vwann.mongodb.net/<DATABASE>
//mongodump --uri mongodb+srv://databaseproject1:1234@project1.vwann.mongodb.net/myFirstDatabase
//mongodump --host=mongodb1.example.net --port=3017 --username=user --password="pass" --out=/opt/backup/mongodump-2013-10-24
module.exports = function () {
  const child = spawn("mongodump", [
    `--uri mongodb+srv://databaseproject1:1234@project1.vwann.mongodb.net/myFirstDatabase`,
  ]);

  child.stdout.on("data", (data) => {
    console.log("stdout:\n", data);
  });
  child.stderr.on("data", (data) => {
    console.log("stderr:\n", data);
  });
  child.on("error", (err) => {
    console.log("error:\n", err);
  });
  child.on("exit", (code, signal) => {
    if (code) console.log("process exit with code", code);
    else if (signal) console.log("process killed with signal", signal);
    else console.log("Back up successfully");
  });
};
