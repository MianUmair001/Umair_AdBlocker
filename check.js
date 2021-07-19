const fs = require("fs");
const hostsArray = [];
try {
  // read contents of the file
  const data = fs.readFileSync("blocked_sites.js", "UTF-8");

  // split the contents by new line
  const lines = data.split(/\r?\n/);

  lines.forEach((line) => {
    if (line.includes("2")) {
      check = line.replace("2", "");
      hostsArray.push(check);
    }
  });
} catch (err) {
  console.error(err);
}

hostsArray.shift();

const writeStream = fs.createWriteStream("NewBlockedSites.js");
const pathName = writeStream.path;

writeStream.write(`var blocked_sites=[`);

// write each value of the array on the file breaking line
hostsArray.forEach((value) => writeStream.write(`${value}\n`));

writeStream.write(`]`);

// the finish event is emitted when all data has been flushed from the stream
writeStream.on("finish", () => {
  console.log(`wrote all the array data to file ${pathName}`);
});

// handle the errors on the write process
writeStream.on("error", (err) => {
  console.error(`There is an error writing the file ${pathName} => ${err}`);
});

// close the stream
writeStream.end();
