import { readFile } from "node:fs/promises";
const topics = [
  "Arrays",
  "Strings",
  "Hashing",
  "Two Pointers",
  "Sliding Window",
  "Binary Search",
  "Prefix Sum",
];
const problems = JSON.parse(await readFile("public/data/problems.json", "utf8"));
const errors = [];
const ids = new Set(),
  urls = new Set();
for (const p of problems) {
  if (!Number.isInteger(p.id) || ids.has(p.id)) errors.push(`duplicate/invalid ID: ${p.id}`);
  ids.add(p.id);
  if (!p.url?.match(/^https:\/\/leetcode\.com\/problems\/.+\/$/) || urls.has(p.url))
    errors.push(`duplicate/invalid URL: ${p.url}`);
  urls.add(p.url);
  if (!p.title) errors.push(`missing title: ${p.id}`);
  if (!topics.includes(p.topic)) errors.push(`invalid topic: ${p.topic}`);
  if (!["Easy", "Medium", "Hard"].includes(p.difficulty))
    errors.push(`invalid difficulty: ${p.id}`);
}
if (problems.length !== 340) errors.push(`expected 340 records; found ${problems.length}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `Validated ${problems.length} records: unique IDs, unique official URLs, and required fields are valid.`,
);
