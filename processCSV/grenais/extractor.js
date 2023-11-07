//The maximum execute anonymous code length is 32000.
const fs = require("fs").promises;
const parse = require("csv-parse/lib/sync");

const CSVDelimiter = ",";

(async function () {
  content = await fs.readFile(`./copaDoBrasil.csv`);
  content2 = await fs.readFile(`./brasileiro.csv`);

  const records = parse(content);
  const records2 = parse(content2);

  let array = [];

  records.slice(1).forEach((record) => {
    if (!array.includes(record[5])) {
      array.push(record[5]);
    }
  });

  records2.slice(1).forEach((record) => {
    if (!array.includes(record[3])) {
      array.push(record[3]);
    }
  });

  array.sort().forEach((value) => {
    console.log(value);
  });
})();
