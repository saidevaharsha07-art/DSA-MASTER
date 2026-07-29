const fs = require('fs');
const path = require('path');

const ocrText = `
Rating Phase: 800
2230A Optimal Purchase 800 Math
2228A Marisa Steals Reimu's Takeout 800 Greedy
2227A Koshary 800 Math
2218A The 67th Integer Problem 800 Brute Force
2211A Antimedian Deletion 800 Math
2205B Simons and Cakes for Success 800 Math
2204A Passing the Ball 800 Brute Force
2189A Table with Numbers 800 Greedy
2182A New Year String 800 Greedy
2179B Blackslex and Showering 800 Greedy
2176A Operations with Inversions 800 Greedy
2175A Little Fairy's Painting 800 Implementation/Basics
2173A Sleeping Through Classes 800 Greedy
2172A ASCII Art Contest 800 Implementation/Basics
2170A Maximum Neighborhood 800 Greedy
2167C Isamatdin and His Magic Wand! 800 Sorting
2161A Round Trip 800 Greedy
2157A Dungeon Equilibrium 800 Sorting
2155A El fucho 800 Math
2152A Increase or Smash 800 Greedy
2146A Equal Occurrences 800 Greedy
2134A Painting With Two Colors 800 Constructive
2133A Redstone? 800 Data Structures
2132A Homework 800 Brute Force
2126A Only One Digit 800 Brute Force
2125A Difficult Contest 800 Sorting
2117A False Alarm 800 Greedy
2112A Race 800 Math
2111A Energy Crystals 800 Greedy
2110A Fashionable Array 800 Sorting
2109A It's Time To Duel 800 Implementation/Basics
2103A Common Multiple 800 Greedy
2090A Treasure Hunt 800 Math
2074A Draw a Square 800 Implementation/Basics
2072A New World, New Me, New Array 800 Greedy
2065A Skibidus and Amog'u 800 Greedy
2050A Line Breaks 800 Implementation/Basics
2049A MEX Destruction 800 Greedy
2048A Kevin and Combination Lock 800 Greedy
2047A Alyona and a Square Jigsaw Puzzle 800 Math
2044B Normal Problem 800 Implementation/Basics
2038J Waiting for... 800 Greedy
2038N Fixing the Expression 800 Implementation/Basics
2037A Twice 800 Implementation/Basics
2037B Intercepted Inputs 800 Brute Force
2036A Quintomania 800 Implementation/Basics
2035A Sliding 800 Math
2033A Sakurako and Kosuke 800 Constructive
2032A Circuit 800 Greedy
2027A Rectangle Arrangement 800 Math
2022A Bus to Pénjamo 800 Greedy
2014A Robin Helps 800 Greedy
2010A Alternating Sum of Numbers 800 Brute Force
2010B Three Brothers 800 Brute Force
2009B osu!mania 800 Brute Force
2004A Closest Point 800 Math
2002A Distanced Coloring 800 Constructive
2001A Make All Equal 800 Greedy
2000A Primary Task 800 Math
1999A A+B Again? 800 Math
1999C Showering 800 Greedy
1998A Find K Distinct Points with Fixed Center 800 Constructive
1997A Strong Password 800 Brute Force
1996B Scale 800 Greedy
1995A Diagonals 800 Greedy
1994A Diverse Game 800 Greedy
1993A Question Marks 800 Greedy
1991A Maximize the Last Element 800 Greedy
1989A Catch the Coin 800 Implementation/Basics
1985A Creating Words 800 Implementation/Basics
1982A Soccer 800 Sorting
1979A Guess the Maximum 800 Greedy
1976A Verify Password 800 Sorting
1975A Bazoka and Mocha's Array 800 Sorting
1974B Symmetric Encoding 800 Sorting
1971A My First Sorting Problem 800 Sorting
1971B Different String 800 Implementation/Basics
1969A Two Friends 800 Constructive
1950A Stair, Peak, or Neither? 800 Implementation/Basics
1950B Upscaling 800 Implementation/Basics
1950C Clock Conversion 800 Math
1946A Median of an Array 800 Sorting
1937A Shuffle Party 800 Math
1933B Turtle Math: Fast Three Task 800 Math
1932A Thorns and Coins 800 Greedy
1926A Vlad and the Best of Five 800 Implementation/Basics
1926B Vlad and Shapes 800 Implementation/Basics
1923A Moving Chips 800 Greedy
1922A Tricky Template 800 Constructive
1921B Arranging Cats 800 Greedy
1918A Brick Wall 800 Greedy
1916A 2023 800 Constructive
1915A Odd One Out 800 Implementation/Basics
1915B Not Quite Latin Square 800 Brute Force
1915C Can I Square? 800 Binary Search
1914A Problemsolving Log 800 Implementation/Basics
1913A Rating Increase 800 Implementation/Basics
1909A Distinct Buttons 800 Math
1907A Rook 800 Implementation/Basics
1898A Milica and String 800 Brute Force
1894A Secret Sport 800 Implementation/Basics
1890B Qingshan Loves Strings 800 Constructive
1873A Short Sort 800 Brute Force
1873C Target Practice 800 Math
1873D 1D Eraser 800 Two Pointers
1864A Increasing and Decreasing 800 Greedy
1863A Channel 800 Greedy
1862A Gift Carpet 800 Greedy
1856A Tales of a Sort 800 Implementation/Basics
1850A To My Critics 800 Sorting
1850B Ten Words of Wisdom 800 Sorting
1850C Word on the Paper 800 Implementation/Basics
1849A Morning Sandwich 800 Math
1846A Rudolph and Cut the Rope 800 Math
1846B Rudolph and Tic-Tac-Toe 800 Brute Force
1845A Forbidden Integer 800 Constructive
1840A Cipher Shifer 800 Two Pointers
1839A The Good Array 800 Greedy
1836A Destroyer 800 Sorting
1833A Musical Puzzle 800 Implementation/Basics
1829A Love Story 800 Implementation/Basics
1829B Blank Space 800 Implementation/Basics
1829C Mr. Perfectly Fine 800 Greedy
1822A TubeTube Feed 800 Brute Force
1820A Yura's New Name 800 Implementation/Basics
1814A Coins 800 Math
1809A Garland 800 Implementation/Basics
1807A Plus or Minus 800 Implementation/Basics
1807C Find and Replace 800 Greedy
1802A Likes 800 Greedy
1800A Is It a Cat? 800 Implementation/Basics
1799A Recent Actions 800 Greedy
1798A Showstopper 800 Sorting
1797A Li Hua and Maze 800 Greedy
1796A Typical Interview Problem 800 Brute Force
1795A Two Towers 800 Brute Force
1791A Codeforces Checking 800 Implementation/Basics
1791B Following Directions 800 Implementation/Basics
1791C Prepend and Append 800 Two Pointers
1790A Polycarp and the Day of Pi 800 Math
1789B Serval and Inversion Magic 800 Two Pointers
1788A One and Two 800 Brute Force
1786A1 Non-alternating Deck (easy version) 800 Implementation/Basics
1786A2 Alternating Deck (hard version) 800 Implementation/Basics
1778A Flip Flop Sum 800 Greedy
1775A1 Gardener and the Capybaras (easy version) 800 Constructive
1772A A+B? 800 Implementation/Basics
1772B Matrix Rotation 800 Brute Force
1767A Cut the Triangle 800 Implementation/Basics
1766A Extremely Round 800 Brute Force
1760A Medium Number 800 Sorting
1760B Atilla's Favorite Problem 800 Greedy
1760C Advantage 800 Sorting
1759A Yes-Yes? 800 Implementation/Basics
1750A Indirect Sort 800 Constructive
1750B Maximum Substring 800 Greedy
1749A Cowardly Rooks 800 Greedy
1744A Number Replacement 800 Greedy
1744B Even-Odd Increments 800 Math

Rating Phase: 900
2195B Heapify 1 900 Sorting
2185C Shifted MEX 900 Sorting
2178B Impost or Sus 900 Greedy
2169A Alice and Bob 900 Greedy
2157B Expansion Plan 2 900 Math
2102B The Picky Cat 900 Sorting
2085A Serval and String Theory 900 Constructive
2028A Alice's Adventures in "Chess" 900 Brute Force
1988A Split the Multiset 900 Greedy
1988B Make Majority 900 Greedy
1985D Manhattan Circle 900 Math
1973A Chess For Three 900 DP / Prefix-style
1971C Clock and Strings 900 Implementation/Basics
1918B Minimize Inversions 900 Sorting
1915D Unnatural Language Processing 900 Greedy
1904A Forked! 900 Brute Force
1872B The Corridor or There and Back Again 900 Greedy
1856B Good Arrays 900 Math
1850D Balanced Round 900 Sorting
1845B Come Together 900 Math
1808A Lucky Numbers 900 Brute Force
1807D Odd Queries 900 Data Structures

Rating Phase: 1000
2230B Digit String 1000 Greedy
2217B Flip the Bit (Easy Version) 1000 Greedy
2194B Offshores 1000 Greedy
2167D Yet Another Array Problem 1000 Brute Force
2156B Strange Machine 1000 Binary Search
2145B Deck of Cards 1000 Greedy
2104B Move to the End 1000 Greedy
2092B Lady Bug 1000 Constructive
2090B Pushing Balls 1000 DP / Prefix-style
2051C Preparing for the Exam 1000 Constructive
2039B Shohag Loves Strings 1000 Greedy
2034B Rakhsh's Revival 1000 Two Pointers
1999B Card Game 1000 Constructive
1970A1 Balanced Shuffle (Easy) 1000 Sorting
1955B Progressive Square 1000 Sorting
1907B YetnotherrokenKeoard 1000 Data Structures
1841B Keep it Beautiful 1000 Implementation/Basics
1829D Gold Rush 1000 DP / Prefix-style
1811B Conveyor Belts 1000 Math
1804B Vaccination 1000 Greedy
1802B Settlement of Guinea Pigs 1000 Greedy
1798B Three Sevens 1000 Greedy
1796B Asterisk-Minor Template 1000 Implementation/Basics
1790C Premutation 1000 Brute Force
1769B1 Kopirovaniye faylov I 1000 Brute Force
1766B Notepad# 1000 Implementation/Basics
1761B Elimination of a Ring 1000 Greedy
1760D Challenging Valleys 1000 Two Pointers
1744C Traffic Light 1000 Two Pointers

Rating Phase: 1100
2228B Remilia Plays Soku 1100 Implementation/Basics
2208B Cyclists 1100 Sorting
2197B Array and Permutation 1100 Two Pointers
2185D OutOfMemoryError 1100 Two Pointers
2179C Blackslex and Number Theory 1100 Sorting
2169B Drifting Away 1100 Greedy
2146B Merging the Sets 1100 Greedy
2137C Maximum Even Sum 1100 Greedy
2111B Fibonacci Cubes 1100 DP / Prefix-style
2070B Robot Program 1100 Brute Force
2036C Anya and 1100 1100 Brute Force
2032B Medians 1100 Greedy
2009C The Legend of Freya the Frog 1100 Math
1999D Slavic's Exam 1100 Greedy
1984B Large Addition 1100 Math
1976B Increase/Decrease/Copy 1100 Greedy
1971D Binary Cut 1100 Sorting
1966B Rectangle Filling 1100 Constructive
1957B A BIT of a Construction 1100 Greedy
1950D Product of Binary Decimals 1100 DP / Prefix-style
1948B Array Fix 1100 Greedy
1933C Turtle Fingers: Count the Values of k 1100 Brute Force
1923B Monsters Attack! 1100 Greedy
1899B 250 Thousand Tons of TNT 1100 Brute Force
1863C MEX Repetition 1100 Math
1862C Flower City Fence 1100 Sorting
1857B Maximum Rounding 1100 Greedy
1850E Cardboard for Pictures 1100 Binary Search
1788B Sum of Two Numbers 1100 Greedy
1762B Make Array Good 1100 Sorting

Rating Phase: 1200
2234C Vessels, Heights and Two Versions (Easy Version) 1200 Two Pointers
2227D Palindromex 1200 Two Pointers
2202B ABAB Construction 1200 Greedy
2178C First or Second 1200 Greedy
2172E Number Maze 1200 Implementation/Basics
2134C Even Larger 1200 Greedy
2121C Those Who Are With Us 1200 Greedy
2085B Serval and Final MEX 1200 Constructive
2048C Kevin and Binary Strings 1200 Greedy
2019B All Pairs Segments 1200 Math
2000D Right Left Wrong 1200 Two Pointers
1992D Test of Love 1200 Greedy
1983B Corner Twist 1200 Greedy
1982B Collatz Conjecture 1200 Brute Force
1954B Make It Ugly 1200 Math
1941D Rudolf and the Ball Game 1200 DP / Prefix-style
1926C Vlad and a Sum of Sum of Digits 1200 DP / Prefix-style
1916C Training Before the Olympiad 1200 Greedy
1914D Three Activities 1200 Sorting
1881C Perfect Square 1200 Brute Force
1874A Jellyfish and Game 1200 Greedy
1848B Vika and the Bridge 1200 Sorting
1832C Contrast Value 1200 Greedy
1826A Trust Nobody 1200 Sorting
1763B Incinerate 1200 Sorting

Rating Phase: 1300
2230C Arrange the Numbers in a Circle 1300 Constructive
2150A Incremental Path 1300 Data Structures
2121D 1709 1300 Sorting
2108B SUMdamental Decomposition 1300 Greedy
2101A Mex in the Grid 1300 Constructive
2086C Disappearing Permutation 1300 Greedy
2072D For Wizards, the Exam Is Easy 1300 Greedy
2056B Find the Permutation 1300 Sorting
2049B pspspsps 1300 Constructive
2044E Insane Problem 1300 Binary Search
2041A The Bento Box Adventure 1300 Sorting
2036D I Love 1543 1300 Brute Force
2025C New Game 1300 Two Pointers
1999E Triple Operations 1300 DP / Prefix-style
1978C Manhattan Permutations 1300 Greedy
1955C Inhabitant of the Deep Sea 1300 Greedy
1937B Binary Path 1300 Greedy
1922C Closest Cities 1300 Greedy
1899E Queue Sort 1300 Sorting
1889A Qingshan Loves Strings 2 1300 Greedy
1870C Colorful Table 1300 Two Pointers
1868A Fill in the Matrix 1300 Constructive
1851D Prefix Permutation Sums 1300 Math
1850F We Were Both Children 1300 Brute Force
1846E1 Rudolf and Snowflakes (simple version) 1300 Brute Force
1844C Particles 1300 Greedy
1821C Tear It Apart 1300 Brute Force
1768C Elemental Decompress 1300 Sorting
1766C Hamiltonian Wall 1300 DP / Prefix-style
1746C Permutation Operations 1300 Greedy

Rating Phase: 1400
2231C Chipmunk Theo and Equality 1400 Sorting
2171D Rae Taylor and Trees (easy version) 1400 Binary Search
2151C Incremental Stay 1400 Greedy
2114D Come a Little Closer 1400 Greedy
2111D Creating a Schedule 1400 Sorting
2093D Skibidi Table 1400 Implementation/Basics
2084C You Soared Afar With Grace 1400 Greedy
2074D Counting Points 1400 Two Pointers
2028B Alice's Adventures in Permuting 1400 Binary Search
2020C Bitwise Balancing 1400 Math
1993C Light Switches 1400 Math
1986D Mathematical Problem 1400 Two Pointers
1983C Have Your Cake and Eat It Too 1400 Binary Search
1980D GCD-sequence 1400 Greedy
1974D Ingenuity-2 1400 Greedy
1967A Permutation Counting 1400 Sorting
1932C LR-remainders 1400 Two Pointers
1932D Card Game 1400 Greedy
1918C XOR-distance 1400 Greedy
1895C Torn Lucky Ticket 1400 DP / Prefix-style
1824A LuoTianyi and the Show 1400 Greedy
1750C Complementary XOR 1400 Constructive
1749C Number Game 1400 Binary Search
1748B Diverse Substrings 1400 Brute Force
`;

const lines = ocrText.split('\n').map(l => l.trim()).filter(Boolean);

let currentRating = 800;
const problems = [];

const categoryMapping = {
  'Math': { categorySlug: 'math-number-theory', categoryTitle: 'Math & Number Theory', kingdomTitle: 'The Numeric Sanctum', catId: 'cat-14', subtopic: 'Number Theory / Arithmetic', topics: ['Math', 'Number Theory'] },
  'Greedy': { categorySlug: 'greedy', categoryTitle: 'Greedy', kingdomTitle: 'The Merchant\'s Gambit', catId: 'cat-10', subtopic: 'Sorting Greedy / Choice Strategy', topics: ['Greedy', 'Sorting'] },
  'DP / Prefix-style': { categorySlug: 'dynamic-programming', categoryTitle: 'Dynamic Programming', kingdomTitle: 'Time Citadel', catId: 'cat-12', subtopic: '1D DP / Prefix Sum', topics: ['Dynamic Programming', 'Prefix Sum'] },
  'Graph': { categorySlug: 'graphs', categoryTitle: 'Graphs', kingdomTitle: 'Shadow Forest', catId: 'cat-8', subtopic: 'Graph Traversal & BFS/DFS', topics: ['Graph', 'DFS', 'BFS'] },
  'Implementation/Basics': { categorySlug: 'basic-arrays', categoryTitle: 'Basic Arrays', kingdomTitle: 'Kingdom of Beginnings', catId: 'cat-1', subtopic: 'Array Fundamentals & Simulation', topics: ['Array', 'Implementation'] },
  'Binary Search': { categorySlug: 'binary-search', categoryTitle: 'Binary Search', kingdomTitle: 'The Hidden Truth', catId: 'cat-5', subtopic: 'Classic Binary Search', topics: ['Binary Search', 'Array'] },
  'Sorting': { categorySlug: 'sorting', categoryTitle: 'Sorting', kingdomTitle: 'The Ordered Realms', catId: 'cat-6', subtopic: 'Comparison & Custom Sorting', topics: ['Sorting', 'Array'] },
  'Two Pointers': { categorySlug: 'two-pointers', categoryTitle: 'Two Pointers', kingdomTitle: 'Twin Rivers Kingdom', catId: 'cat-3', subtopic: 'Opposite Direction / Fast & Slow', topics: ['Two Pointers', 'Array'] },
  'Data Structures': { categorySlug: 'stack', categoryTitle: 'Stack & Queue', kingdomTitle: 'The Tower of Stacks', catId: 'cat-7', subtopic: 'Stack & Queue Design', topics: ['Stack', 'Data Structures'] },
  'Constructive': { categorySlug: 'basic-arrays', categoryTitle: 'Basic Arrays', kingdomTitle: 'Kingdom of Beginnings', catId: 'cat-1', subtopic: 'Constructive Algorithms', topics: ['Array', 'Constructive'] },
  'Brute Force': { categorySlug: 'backtracking', categoryTitle: 'Backtracking', kingdomTitle: 'The Maze of Choices', catId: 'cat-9', subtopic: 'Constraint Backtracking / Search', topics: ['Backtracking', 'Brute Force'] },
};

for (const line of lines) {
  if (line.startsWith('Rating Phase:')) {
    currentRating = parseInt(line.replace('Rating Phase:', '').trim());
    continue;
  }

  const match = line.match(/^([0-9]{3,4}[A-Z0-9]+)\s+(.+?)\s+([0-9]{3,4})\s+(.+)$/);
  if (!match) continue;

  const [_, code, name, ratingStr, concept] = match;
  const rating = parseInt(ratingStr);

  const codeMatch = code.match(/^([0-9]+)([A-Z0-9]+)$/);
  let url = 'https://codeforces.com/problemset/problem/' + code + '/';
  if (codeMatch) {
    url = 'https://codeforces.com/problemset/problem/' + codeMatch[1] + '/' + codeMatch[2];
  }

  let estTime = 20;
  let xp = 10;
  if (rating >= 800 && rating <= 1000) {
    estTime = 20;
    xp = 10;
  } else if (rating >= 1100 && rating <= 1400) {
    estTime = 30;
    xp = 20;
  } else if (rating >= 1500 && rating <= 1800) {
    estTime = 45;
    xp = 30;
  } else {
    estTime = 60;
    xp = 40;
  }

  const meta = categoryMapping[concept] || categoryMapping['Implementation/Basics'];

  problems.push({
    code,
    name: code + ' ' + name,
    rating,
    concept,
    status: false,
    categoryTitle: meta.categoryTitle,
    categorySlug: meta.categorySlug,
    subtopic: meta.subtopic,
    lcNumber: 'N/A',
    problemName: code + ' ' + name,
    premium: 'No',
    accRate: 'N/A',
    topics: meta.topics,
    companyTags: ['Codeforces'],
    estTime: estTime + 'm',
    xp: xp,
    openLink: url,
    kingdomTitle: meta.kingdomTitle,
  });
}

console.log('Parsed ' + problems.length + ' Codeforces problems.');
fs.writeFileSync(path.join(__dirname, 'cf_parsed.json'), JSON.stringify(problems, null, 2));
