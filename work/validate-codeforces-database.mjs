import { readFile } from "node:fs/promises";

const ratings = [800, 900, 1000, 1100, 1200, 1300, 1400];
const expected = new Map([
  [800, 159],
  [900, 22],
  [1000, 29],
  [1100, 30],
  [1200, 25],
  [1300, 30],
  [1400, 24],
]);
const all = [];

for (const rating of ratings) {
  const records = JSON.parse(await readFile(`public/data/codeforces/rating${rating}.json`, "utf8"));
  if (records.length !== expected.get(rating)) throw new Error(`rating${rating}: unexpected count`);
  if (records.some((record) => record.rating !== rating))
    throw new Error(`rating${rating}: mixed ratings`);
  all.push(...records);
}

const duplicate = (key) => new Set(all.map((record) => record[key])).size !== all.length;
if (all.length !== 319 || duplicate("problemId") || duplicate("url")) {
  throw new Error("Invalid Codeforces database: expected 319 unique IDs and URLs.");
}
if (
  all.some(
    (record) =>
      record.url !==
      `https://codeforces.com/problemset/problem/${record.contestId}/${record.problemLetter}`,
  )
) {
  throw new Error("Invalid official Codeforces URL.");
}
console.log(
  "Validated 319 Codeforces problems: ordered rating files, unique IDs, and official URLs.",
);
