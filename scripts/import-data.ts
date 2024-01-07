import fs from "fs";
import { parse } from "csv-parse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PATH_TO_CSV = "scripts/hotels.csv";

async function main() {
  const parser = fs
    .createReadStream(PATH_TO_CSV)
    .pipe(parse({ delimiter: ";", columns: true }));

  const records = [];
  for await (const record of parser) {
    records.push(
      prisma.hotel.create({
        data: {
          name: record["Hotel Name"],
          image: record["Image"],
          city: record["City"],
          address: record["Address"],
          description: record["Description"],
          stars: parseInt(record["Stars"]),
        },
      })
    );
  }

  // Run all the queries in a transaction so that if the csv file is malformed,
  // nothing will be inserted rather than partially inserted data
  await prisma.$transaction(records);
}

await main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
