import { writeFile, mkdir } from "node:fs/promises";

const query = `query problemsetQuestionList($limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
  questionList(categorySlug: "", limit: $limit, skip: $skip, filters: $filters) {
    totalNum data { questionFrontendId title titleSlug difficulty acRate topicTags { name slug } }
  }
}`;
const topics = [
  [
    "Arrays",
    "array",
    90,
    "Master arrays from basic traversal and simulation through advanced in-place techniques.",
    40,
    6,
  ],
  [
    "Strings",
    "string",
    60,
    "Build reliable string manipulation, parsing, and matching skills.",
    30,
    4,
  ],
  ["Hashing", "hash-table", 35, "Use hash maps and sets to trade memory for fast lookup.", 20, 3],
  [
    "Two Pointers",
    "two-pointers",
    40,
    "Learn converging, partitioning, and fast/slow pointer techniques.",
    24,
    3,
  ],
  ["Sliding Window", "sliding-window", 35, "Master fixed and variable window constraints.", 22, 3],
  ["Binary Search", "binary-search", 45, "Search ordered spaces and monotonic answers.", 28, 4],
  [
    "Prefix Sum",
    "prefix-sum",
    35,
    "Answer range queries efficiently with prefix and difference techniques.",
    20,
    3,
  ],
];
const patternFor = (p) => {
  const tags = p.topicTags.map((t) => t.slug);
  if (tags.includes("sliding-window")) return "Sliding Window";
  if (tags.includes("binary-search")) return "Binary Search";
  if (tags.includes("two-pointers")) return "Two Pointers";
  if (tags.includes("prefix-sum")) return "Prefix Sum";
  if (tags.includes("hash-table")) return "Hash Map";
  if (tags.includes("sorting")) return "Sorting";
  if (tags.includes("greedy")) return "Greedy";
  if (tags.includes("simulation")) return "Simulation";
  return "Traversal";
};
const level = { Easy: 0, Medium: 1, Hard: 2 };
async function fetchTag(tag) {
  const r = await fetch("https://leetcode.com/graphql/", {
    method: "POST",
    headers: { "content-type": "application/json", referer: "https://leetcode.com/problemset/" },
    body: JSON.stringify({ query, variables: { limit: 200, skip: 0, filters: { tags: [tag] } } }),
  });
  const j = await r.json();
  if (j.errors) throw new Error(JSON.stringify(j.errors));
  return j.data.questionList.data;
}
const all = [];
const output = {};
const used = new Set();
for (const [title, tag, count, description, hours, weeks] of topics) {
  const raw = await fetchTag(tag);
  const selected = raw
    .filter((p) => p.questionFrontendId && p.titleSlug && !used.has(p.questionFrontendId))
    .sort(
      (a, b) =>
        level[a.difficulty] - level[b.difficulty] ||
        Number(a.questionFrontendId) - Number(b.questionFrontendId),
    )
    .slice(0, count);
  selected.forEach((p) => used.add(p.questionFrontendId));
  const problems = selected.map((p) => ({
    id: Number(p.questionFrontendId),
    title: p.title,
    difficulty: p.difficulty,
    topic: title,
    pattern: patternFor(p),
    acceptance: `${Number(p.acRate).toFixed(1)}%`,
    estimatedTime:
      p.difficulty === "Easy" ? "10 mins" : p.difficulty === "Medium" ? "20 mins" : "35 mins",
    companies: [],
    tags: p.topicTags.map((t) => t.name),
    url: `https://leetcode.com/problems/${p.titleSlug}/`,
    resources: { official: "", neetcode: "", takeuforward: "", striver: "", youtube: "" },
  }));
  output[title] = {
    title,
    description,
    estimatedHours: hours,
    estimatedWeeks: weeks,
    recommendedProblems: problems.length,
    difficultyDistribution: Object.fromEntries(
      ["Easy", "Medium", "Hard"].map((d) => [d, problems.filter((p) => p.difficulty === d).length]),
    ),
    patterns: [...new Set(problems.map((p) => p.pattern))],
    problems,
  };
  all.push(...problems);
}
const fileName = (t) => t.toLowerCase().replaceAll(" ", "-") + ".json";
await mkdir("public/data", { recursive: true });
for (const value of Object.values(output))
  await writeFile(`public/data/${fileName(value.title)}`, JSON.stringify(value.problems, null, 2));
await writeFile(
  "public/data/roadmap.json",
  JSON.stringify(
    {
      version: 1,
      order: topics.map(([title]) => title),
      topics: Object.values(output).map(({ problems, ...meta }) => meta),
    },
    null,
    2,
  ),
);
const grouped = (key) =>
  Object.fromEntries(
    [...new Set(all.flatMap((p) => (Array.isArray(p[key]) ? p[key] : [p[key]])))]
      .filter(Boolean)
      .map((v) => [
        v,
        all.filter((p) => (Array.isArray(p[key]) ? p[key] : [p[key]]).includes(v)).map((p) => p.id),
      ]),
  );
await writeFile(
  "public/data/patterns.json",
  JSON.stringify(
    Object.fromEntries(
      [...new Set(all.map((p) => p.pattern))].map((p, i) => [
        p,
        {
          description: `Practice ${p} problems in increasing difficulty.`,
          difficulty: "Mixed",
          relatedTopics: [...new Set(all.filter((x) => x.pattern === p).map((x) => x.topic))],
          recommendedOrder: i + 1,
        },
      ]),
    ),
    null,
    2,
  ),
);
await writeFile("public/data/tags.json", JSON.stringify(grouped("tags"), null, 2));
const companyGroups = Object.fromEntries(
  [
    "Amazon",
    "Google",
    "Microsoft",
    "Meta",
    "Adobe",
    "Apple",
    "Netflix",
    "Uber",
    "Oracle",
    "Atlassian",
    "Goldman Sachs",
    "Bloomberg",
    "Visa",
    "PayPal",
    "Walmart",
    "Flipkart",
    "Intuit",
  ].map((name) => [name, all.filter((p) => p.companies.includes(name)).map((p) => p.id)]),
);
await writeFile("public/data/companies.json", JSON.stringify(companyGroups, null, 2));
await writeFile(
  "public/data/statistics.json",
  JSON.stringify(
    {
      totalProblems: all.length,
      difficulty: Object.fromEntries(
        ["Easy", "Medium", "Hard"].map((d) => [d, all.filter((p) => p.difficulty === d).length]),
      ),
      topics: Object.fromEntries(Object.entries(output).map(([t, v]) => [t, v.problems.length])),
      patterns: Object.fromEntries(
        Object.entries(grouped("pattern")).map(([p, ids]) => [p, ids.length]),
      ),
      companies: Object.fromEntries(
        Object.entries(companyGroups).map(([name, ids]) => [name, ids.length]),
      ),
    },
    null,
    2,
  ),
);
await writeFile("public/data/problems.json", JSON.stringify(all, null, 2));
console.log(`Generated ${all.length} verified LeetCode problems.`);
