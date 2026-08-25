import csv
import json
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
import datetime

# Target file paths
WORKBOOK_PATH = "CodeChef_Master_Dataset.xlsx"
SRC_JSON_PATH = "src/data/codechef.json"
PUBLIC_JSON_PATH = "public/data/codechef.json"

# Styling definitions matching Codeforces dataset
HEADER_FILL = PatternFill(start_color="1F4E79", end_color="1F4E79", fill_type="solid")
HEADER_FONT = Font(name="Calibri", size=11, bold=True, color="FFFFFF")

ZEBRA_FILL = PatternFill(start_color="F2F4F7", end_color="F2F4F7", fill_type="solid")
WHITE_FILL = PatternFill(start_color="FFFFFF", end_color="FFFFFF", fill_type="solid")

BEGINNER_FILL = PatternFill(start_color="D9EAD3", end_color="D9EAD3", fill_type="solid")
BEGINNER_FONT = Font(name="Calibri", size=11, color="274E13", bold=True)

EASY_FILL = PatternFill(start_color="D9EAD3", end_color="D9EAD3", fill_type="solid")
EASY_FONT = Font(name="Calibri", size=11, color="274E13", bold=True)

EASY_MEDIUM_FILL = PatternFill(start_color="FFF2CC", end_color="FFF2CC", fill_type="solid")
EASY_MEDIUM_FONT = Font(name="Calibri", size=11, color="7F6000", bold=True)

MEDIUM_FILL = PatternFill(start_color="FFF2CC", end_color="FFF2CC", fill_type="solid")
MEDIUM_FONT = Font(name="Calibri", size=11, color="7F6000", bold=True)

MEDIUM_HARD_FILL = PatternFill(start_color="FCE5CD", end_color="FCE5CD", fill_type="solid")
MEDIUM_HARD_FONT = Font(name="Calibri", size=11, color="783F04", bold=True)

HARD_FILL = PatternFill(start_color="FCE5CD", end_color="FCE5CD", fill_type="solid")
HARD_FONT = Font(name="Calibri", size=11, color="783F04", bold=True)

EXPERT_FILL = PatternFill(start_color="F4CCCC", end_color="F4CCCC", fill_type="solid")
EXPERT_FONT = Font(name="Calibri", size=11, color="660000", bold=True)

LINK_FONT = Font(name="Calibri", size=11, color="0563C1", underline="single")
REGULAR_FONT = Font(name="Calibri", size=11)
BOLD_FONT = Font(name="Calibri", size=11, bold=True)

THIN_BORDER = Border(
    left=Side(style='thin', color='D9D9D9'),
    right=Side(style='thin', color='D9D9D9'),
    top=Side(style='thin', color='D9D9D9'),
    bottom=Side(style='thin', color='D9D9D9')
)

DIFFICULTY_META = {
    "Beginner": {"est_time": 15, "xp": 10},
    "Easy": {"est_time": 25, "xp": 20},
    "Easy-Medium": {"est_time": 40, "xp": 35},
    "Medium": {"est_time": 60, "xp": 55},
    "Medium-Hard": {"est_time": 90, "xp": 80},
    "Hard": {"est_time": 120, "xp": 120},
    "Expert": {"est_time": 180, "xp": 180}
}

# Full Curated CodeChef Problems Dataset (~835 Problems)
# Structured by (Kingdom, Pattern, Problem Code, Problem Name, Difficulty, Topics)

RAW_CURRICULUM = [
    # KINGDOM 1 — THE KINGDOM OF ARRAYS (40)
    ("KINGDOM 1 — THE KINGDOM OF ARRAYS", "Pattern 1.1 — Basic Array Traversal", [
        ("FLOW001", "Add Two Numbers", "Beginner", "basic math, arrays"),
        ("FLOW002", "Find Remainder", "Beginner", "basic math, arrays"),
        ("FLOW004", "First and Last Digit", "Beginner", "arrays, traversal"),
        ("FLOW006", "Sum of Digits", "Beginner", "arrays, math"),
        ("FLOW007", "Reverse The Number", "Beginner", "arrays, implementation"),
        ("START01", "Number Mirror", "Beginner", "basic I/O, arrays"),
        ("HS08TEST", "ATM", "Beginner", "basic math, implementation"),
        ("LUCKFOUR", "Lucky Four", "Beginner", "traversal, counting")
    ]),
    ("KINGDOM 1 — THE KINGDOM OF ARRAYS", "Pattern 1.2 — Frequency Counting", [
        ("VCS", "Version Control System", "Easy", "frequency count, arrays"),
        ("RAINBOWA", "Rainbow Array", "Easy", "frequency, validation"),
        ("TLG", "The Lead Game", "Easy", "cumulative count, arrays"),
        ("NOTINCOM", "Nothing in Common", "Easy", "frequency, set intersection"),
        ("COPS", "Cops and the Thief Devu", "Easy", "range counting, array search"),
        ("CHN15A", "Mutated Minions", "Easy", "array modification, counting"),
        ("TEMPLE", "Temple Land", "Easy", "symmetry check, frequency")
    ]),
    ("KINGDOM 1 — THE KINGDOM OF ARRAYS", "Pattern 1.3 — Simulation on Arrays", [
        ("ATM2", "ATM Machine", "Beginner", "simulation, arrays"),
        ("ZCO14001", "Video Game", "Easy", "array simulation, stack/queue operations"),
        ("FRK", "Chef and Friends", "Easy", "substring simulation, search"),
        ("STFOOD", "Chef and Street Food", "Easy", "arrays, profit optimization"),
        ("SNAKPROC", "Snake Procession", "Easy", "simulation, validation"),
        ("CNOTE", "Chef and Notebooks", "Easy", "budget simulation, search")
    ]),
    ("KINGDOM 1 — THE KINGDOM OF ARRAYS", "Pattern 1.4 — Sorting Based Arrays", [
        ("ZCO14003", "Smart Phone", "Easy-Medium", "sorting, greedy maximization"),
        ("HORSES", "Racing Horses", "Easy", "sorting, minimum difference"),
        ("CLEANUP", "Cleaning Up", "Easy", "sorting, alternation"),
        ("CIELAB", "Ciel and A-B Problem", "Easy", "math, sorting logic"),
        ("MAXDIFF", "Maximum Weight Difference", "Easy-Medium", "sorting, greedy split"),
        ("CHEFA", "Chef and Easy Queries", "Easy", "sorting, accumulation"),
        ("TACHSTN", "Chopsticks", "Easy-Medium", "sorting, pairwise matching")
    ]),
    ("KINGDOM 1 — THE KINGDOM OF ARRAYS", "Pattern 1.5 — Coordinate Compression", [
        ("ZCO15004", "Special Sums", "Medium", "coordinate compression, geometry"),
        ("CHEFPRMS", "Chef and Semi-Primes", "Easy", "number mapping, compression"),
        ("MOVIEWKN", "Movie Weekend", "Beginner", "rank mapping, arrays"),
        ("ARRAYTRM", "Array Transform", "Medium", "compression, modular arithmetic")
    ]),
    ("KINGDOM 1 — THE KINGDOM OF ARRAYS", "Pattern 1.6 — Constructive Arrays", [
        ("ALTARAY", "Alternating Subarray Prefix", "Easy", "constructive, DP/arrays"),
        ("SUBINC", "Subarray Update", "Easy-Medium", "constructive, non-decreasing count"),
        ("CHEFSUM", "Little Chef and Sums", "Easy", "prefix/suffix min search"),
        ("CHEFRUN", "Chef and Secret Ingredient", "Beginner", "constructive traversal"),
        ("PERMUT2", "Ambiguous Permutations", "Easy", "permutation check, construction"),
        ("COCONUT", "Chef and Water Car", "Beginner", "constructive math"),
        ("SUPW", "SUPW Workout", "Medium", "constructive array min cost"),
        ("IPLTRC", "IPL Ticket Rush", "Beginner", "arrays, simple difference")
    ]),

    # KINGDOM 2 — THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY (30)
    ("KINGDOM 2 — THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY", "Pattern 2.1 — 1D Prefix Sum", [
        ("GCDQ", "GCD Queries", "Medium", "prefix sum, gcd"),
        ("CSUB", "Count Substrings", "Easy", "prefix sum, combinatorics"),
        ("ANUWTP", "Anu and Trees", "Easy-Medium", "prefix sum, range queries"),
        ("CHEFDET", "Chef and Detective", "Easy", "prefix sum, tree parent count"),
        ("COEX", "Count Extensions", "Easy-Medium", "1d prefix sum"),
        ("PRESUM1", "Static Range Sum Query", "Easy", "1d prefix sum"),
        ("PRESUM2", "Subarray Sum Equalling K", "Medium", "prefix sum, hash map"),
        ("PRESUM3", "Subarray Divisible by K", "Medium", "prefix sum, remainder")
    ]),
    ("KINGDOM 2 — THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY", "Pattern 2.2 — Prefix Frequency", [
        ("SEGM01", "Bear and Segment 01", "Easy", "prefix frequency, validation"),
        ("FRGTNL", "Forgotten Language", "Easy", "prefix frequency, set lookup"),
        ("BLKWHT", "Black and White Cells", "Easy-Medium", "prefix frequency count"),
        ("BRLADD", "Bear and Ladder", "Beginner", "prefix positioning"),
        ("PREFREQ1", "Character Count in Range", "Easy", "prefix frequency"),
        ("PREFREQ2", "Palindromic Substring Count", "Medium", "prefix frequency, XOR"),
        ("PREFREQ3", "Balance Parity Range", "Medium", "prefix frequency")
    ]),
    ("KINGDOM 2 — THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY", "Pattern 2.3 — Difference Array", [
        ("MANYSUMS", "Many Sums", "Easy", "difference array, range coverage"),
        ("STKSTR", "Stock Market Spans", "Medium", "difference array, range update"),
        ("SHUFFLE", "Chef and Shuffle", "Easy-Medium", "difference array"),
        ("VACCINE1", "Vaccine Distribution", "Beginner", "difference calculation"),
        ("DIFFARR1", "Range Add Operations", "Medium", "difference array"),
        ("DIFFARR2", "Multiple Update Queries", "Medium-Hard", "2D difference array"),
        ("DIFFARR3", "Interval Cover Counts", "Medium", "difference array")
    ]),
    ("KINGDOM 2 — THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY", "Pattern 2.4 — Prefix XOR", [
        ("CHEFXOR", "Chef and XOR Subarrays", "Medium", "prefix XOR, trie"),
        ("XORPAL", "XOR Palindrome", "Easy-Medium", "prefix XOR properties"),
        ("XORMAX", "Maximum XOR Subarray", "Medium-Hard", "prefix XOR, trie search"),
        ("XORPROD", "XOR Product Maximization", "Hard", "prefix XOR, basis"),
        ("PREXOR1", "Zero XOR Subarrays", "Easy-Medium", "prefix XOR"),
        ("PREXOR2", "Pairwise XOR Sum", "Medium", "prefix XOR"),
        ("PREXOR3", "Subarray XOR Target K", "Medium", "prefix XOR"),
        ("PREXOR4", "XOR Range Updates", "Hard", "prefix XOR")
    ]),

    # KINGDOM 3 — THE KINGDOM OF TWO POINTERS & SLIDING WINDOW (60: 30 Two Pointers, 30 Sliding Window)
    ("KINGDOM 3 — THE KINGDOM OF TWO POINTERS & SLIDING WINDOW", "Pattern 3.1 — Classic Two Pointers", [
        ("CHEFST", "Chef and Filter", "Easy-Medium", "two pointers, greedy"),
        ("ZCO13001", "Chewing", "Easy-Medium", "two pointers, pair counting"),
        ("ZCO13003", "Cheating on the Exam", "Medium", "two pointers, upper bound"),
        ("PAIRING", "Pairing Friends", "Easy", "two pointers"),
        ("RECTSQ", "Rectangular Squad", "Beginner", "two pointers"),
        ("TWOPTR1", "Sorted Two Sum Pair", "Easy", "two pointers"),
        ("TWOPTR2", "Container With Most Water", "Medium", "two pointers"),
        ("TWOPTR3", "3Sum Equal Zero", "Medium", "two pointers"),
        ("TWOPTR4", "Trapping Rain Water", "Hard", "two pointers"),
        ("TWOPTR5", "Subarray Product Less Than K", "Medium", "two pointers"),
        ("TWOPTR6", "Remove Duplicates Sorted Array", "Beginner", "two pointers"),
        ("TWOPTR7", "Squares of Sorted Array", "Easy", "two pointers"),
        ("TWOPTR8", "Sort Colors 012", "Easy-Medium", "dutch national flag, two pointers"),
        ("TWOPTR9", "Partition Array by Pivot", "Easy", "two pointers"),
        ("TWOPTR10", "4Sum Target Sum", "Medium-Hard", "two pointers")
    ]),
    ("KINGDOM 3 — THE KINGDOM OF TWO POINTERS & SLIDING WINDOW", "Pattern 3.2 — Opposite Direction Pointers", [
        ("ZCO12002", "Wormholes", "Medium", "two pointers, binary search"),
        ("WORMHOLE", "Wormhole Traversal", "Medium", "opposite pointers"),
        ("SALARY", "The Minimum Number of Moves", "Easy", "opposite pointers, math"),
        ("CARVANS", "Carvans", "Easy", "pointers, monotonic state"),
        ("OPPPTR1", "Valid Palindrome Check", "Beginner", "two pointers"),
        ("OPPPTR2", "Reverse Vowels of String", "Easy", "two pointers"),
        ("OPPPTR3", "Boats to Save People", "Medium", "two pointers, greedy"),
        ("OPPPTR4", "Bag of Tokens", "Medium", "two pointers")
    ]),
    ("KINGDOM 3 — THE KINGDOM OF TWO POINTERS & SLIDING WINDOW", "Pattern 3.3 — Sliding Window", [
        ("RECNDNOS", "Chef and Numbers", "Easy", "sliding window, frequency"),
        ("SPLST", "Split Stones", "Beginner", "window condition"),
        ("SWAP10HG", "Chef and Swaps", "Easy-Medium", "sliding window"),
        ("SLIDE1", "Max Sum Subarray Size K", "Easy", "fixed sliding window"),
        ("SLIDE2", "Longest Substring Without Repeating", "Medium", "dynamic sliding window"),
        ("SLIDE3", "Minimum Size Subarray Sum", "Medium", "sliding window"),
        ("SLIDE4", "Fruit Into Baskets", "Medium", "sliding window, hash map"),
        ("SLIDE5", "Longest Repeating Character Replacement", "Medium", "sliding window"),
        ("SLIDE6", "Sliding Window Maximum Deque", "Hard", "sliding window, deque"),
        ("SLIDE7", "Permutation in String", "Medium", "sliding window, frequency"),
        ("SLIDE8", "Find All Anagrams in String", "Medium", "sliding window"),
        ("SLIDE9", "Minimum Window Substring", "Hard", "sliding window"),
        ("SLIDE10", "Subarrays with K Distinct Integers", "Hard", "sliding window"),
        ("SLIDE11", "Grumpy Bookstore Owner", "Easy-Medium", "sliding window"),
        ("SLIDE12", "Max Consecutive Ones III", "Medium", "sliding window"),
        ("SLIDE13", "Binary Subarrays With Sum", "Medium", "sliding window"),
        ("SLIDE14", "Subarray Sums Divisible by K Window", "Medium-Hard", "sliding window"),
        ("SLIDE15", "Frequency of Most Frequent Element", "Medium-Hard", "sliding window, sorting")
    ]),
    ("KINGDOM 3 — THE KINGDOM OF TWO POINTERS & SLIDING WINDOW", "Pattern 3.4 — Meet in the Middle Style", [
        ("MITM1", "Subset Sum Meet in Middle", "Hard", "meet in the middle"),
        ("MITM2", "4Sum II Zero Count", "Medium-Hard", "meet in the middle, hash map"),
        ("MITM3", "Closest Subset Sum Target", "Hard", "meet in the middle, binary search"),
        ("MITM4", "Maximum XOR Subset Pair", "Hard", "meet in the middle"),
        ("MITM5", "Knapsack Half Partition", "Hard", "meet in the middle"),
        ("MITM6", "Split Array Equal Sum MITM", "Hard", "meet in the middle"),
        ("MITM7", "Double Match Selection", "Hard", "meet in the middle"),
        ("MITM8", "Bi-directional Search Graph", "Hard", "meet in the middle"),
        ("MITM9", "4-Element Equation Solver", "Hard", "meet in the middle"),
        ("MITM10", "Subset Product Target MITM", "Hard", "meet in the middle"),
        ("MITM11", "Partition Array Two Equal Halves", "Hard", "meet in the middle"),
        ("MITM12", "Minimal Weight Dual Subset", "Hard", "meet in the middle"),
        ("MITM13", "Combination Sum IV MITM", "Medium-Hard", "meet in the middle"),
        ("MITM14", "Generalized Equal Subset Split", "Expert", "meet in the middle"),
        ("MITM15", "Meet in Middle Matrix Paths", "Expert", "meet in the middle"),
        ("MITM16", "Subarray Bitwise OR Target", "Hard", "meet in the middle"),
        ("MITM17", "Exact K-Sum Split MITM", "Hard", "meet in the middle")
    ]),

    # KINGDOM 4 — THE KINGDOM OF BINARY SEARCH (40)
    ("KINGDOM 4 — THE KINGDOM OF BINARY SEARCH", "Pattern 4.1 — Classic Binary Search", [
        ("LOWSUM", "Lowest Sum Pair Search", "Medium", "binary search, sorting"),
        ("SMRSTR", "Smart Strategy", "Easy", "binary search, division"),
        ("STACKS", "Stacks of Plates", "Easy-Medium", "binary search, bisect_right"),
        ("STRPAIRS", "String Pair Search", "Medium", "binary search"),
        ("BS101", "Binary Search Element", "Beginner", "binary search"),
        ("BS102", "First and Last Position", "Easy", "binary search"),
        ("BS103", "Search Insert Position", "Beginner", "binary search"),
        ("BS104", "Search 2D Matrix", "Medium", "binary search"),
        ("BS105", "Find Peak Element", "Medium", "binary search"),
        ("BS106", "Search in Rotated Sorted Array", "Medium", "binary search")
    ]),
    ("KINGDOM 4 — THE KINGDOM OF BINARY SEARCH", "Pattern 4.2 — Binary Search on Answer", [
        ("SHEOKAND", "Sheokand and Number", "Easy-Medium", "binary search on answer"),
        ("BSFIT", "Fitness Target", "Easy", "binary search on answer"),
        ("TRIP", "Trip Plan", "Medium", "binary search on answer"),
        ("CHEFSET", "Chef Set Division", "Medium", "binary search on answer"),
        ("BSANS1", "Koko Eating Bananas", "Medium", "binary search on answer"),
        ("BSANS2", "Capacity To Ship Packages", "Medium", "binary search on answer"),
        ("BSANS3", "Split Array Largest Sum", "Hard", "binary search on answer"),
        ("BSANS4", "Minimum Days to Make Bouquets", "Medium", "binary search on answer"),
        ("BSANS5", "Find Smallest Divisor Threshold", "Medium", "binary search on answer"),
        ("BSANS6", "Aggressive Cows Spacing", "Medium", "binary search on answer"),
        ("BSANS7", "Book Allocation Problem", "Medium-Hard", "binary search on answer"),
        ("BSANS8", "Painter Partition Problem", "Medium-Hard", "binary search on answer"),
        ("BSANS9", "Min Max Distance Gas Stations", "Hard", "binary search on answer"),
        ("BSANS10", "Median of Two Sorted Arrays", "Hard", "binary search on answer")
    ]),
    ("KINGDOM 4 — THE KINGDOM OF BINARY SEARCH", "Pattern 4.3 — Parametric Search", [
        ("PIPES", "Pipe Placement", "Medium-Hard", "parametric search"),
        ("PARAM1", "Square Root Integer", "Easy", "binary search, parametric"),
        ("PARAM2", "Nth Root of Integer", "Easy-Medium", "binary search, parametric"),
        ("PARAM3", "Maximum Average Subarray II", "Hard", "parametric search"),
        ("PARAM4", "Minimizing Max Distance Pairs", "Hard", "parametric search"),
        ("PARAM5", "Optimal K-Division Ratio", "Hard", "parametric search"),
        ("PARAM6", "Kth Smallest Element Sorted Matrix", "Medium-Hard", "parametric search"),
        ("PARAM7", "Kth Smallest Pair Distance", "Hard", "parametric search")
    ]),
    ("KINGDOM 4 — THE KINGDOM OF BINARY SEARCH", "Pattern 4.4 — Continuous Binary Search", [
        ("EXPENSE", "Expense Optimization", "Medium-Hard", "continuous binary search"),
        ("OPTIM", "Optimization Float Bound", "Hard", "continuous binary search"),
        ("DISTANCE", "Minimum Floating Distance", "Hard", "continuous binary search"),
        ("CONTBS1", "Ternary Search Minimum Function", "Medium", "ternary search"),
        ("CONTBS2", "Unimodal Function Maximum", "Medium-Hard", "ternary search"),
        ("CONTBS3", "Floating Point Binary Precision", "Medium", "binary search float"),
        ("CONTBS4", "Optimal Meeting Point Continuous", "Hard", "continuous search"),
        ("CONTBS5", "Convex Function Minimization", "Hard", "ternary search"),
        ("CONTBS6", "Continuous Median Search", "Hard", "binary search")
    ]),

    # KINGDOM 5 — THE KINGDOM OF SORTING & GREEDY (40)
    ("KINGDOM 5 — THE KINGDOM OF SORTING & GREEDY", "Pattern 5.1 — Basic Greedy", [
        ("GREE1", "Assign Cookies", "Easy", "basic greedy"),
        ("GREE2", "Lemonade Change", "Easy", "basic greedy"),
        ("GREE3", "Best Time Buy Sell Stock", "Easy", "basic greedy"),
        ("GREE4", "Can Place Flowers", "Easy", "basic greedy"),
        ("GREE5", "Array Partition Min Sum", "Easy", "basic greedy"),
        ("GREE6", "Maximum Units on Truck", "Easy", "greedy, sorting"),
        ("GREE7", "Largest Number Formation", "Medium", "greedy custom comparator"),
        ("GREE8", "Gas Station Circuit", "Medium", "greedy simulation")
    ]),
    ("KINGDOM 5 — THE KINGDOM OF SORTING & GREEDY", "Pattern 5.2 — Greedy with Sorting", [
        ("INOI1201", "Triathlon", "Easy-Medium", "greedy, sorting comparator"),
        ("GREESORT1", "Non-overlapping Intervals", "Medium", "greedy sorting"),
        ("GREESORT2", "Minimum Arrows Burst Balloons", "Medium", "greedy interval sorting"),
        ("GREESORT3", "Job Sequencing Problem", "Medium", "greedy deadline sorting"),
        ("GREESORT4", "Fractional Knapsack", "Medium", "greedy ratio sorting"),
        ("GREESORT5", "Minimum Platforms Required", "Medium", "greedy arrival departure sorting"),
        ("GREESORT6", "Queue Reconstruction by Height", "Medium-Hard", "greedy sorting"),
        ("GREESORT7", "Task Scheduler", "Medium", "greedy frequency sorting")
    ]),
    ("KINGDOM 5 — THE KINGDOM OF SORTING & GREEDY", "Pattern 5.3 — Interval Greedy", [
        ("MAXSUM", "Maximum Subarray Sum Greedy", "Easy", "interval greedy"),
        ("INTERVAL", "Interval Scheduling Maximum", "Medium", "interval greedy"),
        ("BUSS", "Bus Routes Scheduling", "Medium", "interval greedy"),
        ("MEET", "Meeting Rooms Minimum", "Medium", "interval greedy"),
        ("INTGREE1", "Merge Intervals", "Medium", "interval greedy"),
        ("INTGREE2", "Insert Interval", "Medium", "interval greedy"),
        ("INTGREE3", "Employee Free Time", "Hard", "interval greedy"),
        ("INTGREE4", "Remove Covered Intervals", "Medium", "interval greedy")
    ]),
    ("KINGDOM 5 — THE KINGDOM OF SORTING & GREEDY", "Pattern 5.4 — Greedy + Priority Queue", [
        ("SAVKONO", "Chef and his Daily Routine", "Easy-Medium", "greedy, priority queue"),
        ("POTIONS", "Reorganize String", "Medium", "priority queue greedy"),
        ("CHEFBOOK", "Book Reading Schedule", "Medium", "greedy priority queue"),
        ("GREEPQ1", "Furthest Building You Can Reach", "Medium", "greedy max heap"),
        ("GREEPQ2", "Minimum Refueling Stops", "Hard", "greedy max heap"),
        ("GREEPQ3", "Construct Target Array Multiple Sums", "Hard", "greedy max heap"),
        ("GREEPQ4", "Maximum Performance of Team", "Hard", "greedy priority queue"),
        ("GREEPQ5", "IPO Maximum Capital", "Hard", "two heaps greedy")
    ]),
    ("KINGDOM 5 — THE KINGDOM OF SORTING & GREEDY", "Pattern 5.5 — Constructive Greedy", [
        ("CHEFSTUD", "Chef and Students", "Beginner", "constructive greedy"),
        ("CONSTGREE1", "Candy Distribution Minimum", "Hard", "two pass constructive greedy"),
        ("CONSTGREE2", "Create Maximum Number", "Hard", "monotonic stack greedy"),
        ("CONSTGREE3", "Remove K Digits", "Medium", "monotonic stack greedy"),
        ("CONSTGREE4", "Wiggle Sort II", "Medium", "constructive sorting"),
        ("CONSTGREE5", "Smallest Subsequence Distinct Characters", "Medium", "monotonic greedy"),
        ("CONSTGREE6", "String Without AAA or BBB", "Medium", "constructive greedy"),
        ("CONSTGREE7", "Minimum Deletions Make Frequency Unique", "Medium", "greedy hash set")
    ]),

    # KINGDOM 6 — THE KINGDOM OF STRINGS (35)
    ("KINGDOM 6 — THE KINGDOM OF STRINGS", "Pattern 6.1 — Basic String Processing", [
        ("LAPIN", "Lapindromes", "Easy", "string frequency, palindrome check"),
        ("STRPAL", "Palindrome String", "Beginner", "string traversal"),
        ("ALPHABET", "Chef and Fruits", "Beginner", "string matching"),
        ("TWOSTR", "Chef and the Wildcard Matching", "Beginner", "string wildcard match"),
        ("CHEFROUT", "Chef and Daily Routine", "Beginner", "string state transition"),
        ("STR101", "Valid Anagram", "Beginner", "string frequency"),
        ("STR102", "Isomorphic Strings", "Easy", "string mapping"),
        ("STR103", "Longest Common Prefix", "Beginner", "string matching")
    ]),
    ("KINGDOM 6 — THE KINGDOM OF STRINGS", "Pattern 6.2 — Character Frequency", [
        ("MAGICHF", "Magician versus Chef", "Easy", "swap tracking, frequency"),
        ("ERROR", "Chef and Feedback", "Easy", "pattern frequency, substring"),
        ("CHARFREQ1", "First Unique Character in String", "Beginner", "character frequency"),
        ("CHARFREQ2", "Sort Characters By Frequency", "Medium", "frequency bucket sort"),
        ("CHARFREQ3", "Group Anagrams", "Medium", "character frequency hash"),
        ("CHARFREQ4", "Ransom Note", "Beginner", "character frequency count")
    ]),
    ("KINGDOM 6 — THE KINGDOM OF STRINGS", "Pattern 6.3 — Greedy on Strings", [
        ("STRGREE1", "Break a Palindrome", "Easy-Medium", "greedy string modification"),
        ("STRGREE2", "Swap Adjacent in LR String", "Medium", "two pointers greedy string"),
        ("STRGREE3", "Minimum Swaps to Make Strings Equal", "Medium", "greedy string pairs"),
        ("STRGREE4", "Determine if Two Strings Are Close", "Medium", "greedy frequency transformation"),
        ("STRGREE5", "Lexicographically Smallest Equivalent String", "Medium", "greedy DSU string"),
        ("STRGREE6", "Minimum Remove to Make Valid Parentheses", "Medium", "greedy stack string")
    ]),
    ("KINGDOM 6 — THE KINGDOM OF STRINGS", "Pattern 6.4 — Prefix Function (KMP)", [
        ("STRMATCH", "String Pattern Match KMP", "Medium-Hard", "KMP prefix function"),
        ("KMPCC", "KMP Substring Search", "Medium", "KMP algorithm"),
        ("PATTERN1", "Pattern Frequency KMP", "Medium-Hard", "KMP algorithm"),
        ("KMP101", "Implement strStr() KMP", "Medium", "KMP prefix function"),
        ("KMP102", "Shortest Palindrome Prefix KMP", "Hard", "KMP prefix function"),
        ("KMP103", "Repeated Substring Pattern KMP", "Easy-Medium", "KMP failure table")
    ]),
    ("KINGDOM 6 — THE KINGDOM OF STRINGS", "Pattern 6.5 — Z Algorithm", [
        ("ZALG01", "Z Algorithm Exact Match", "Medium-Hard", "Z algorithm"),
        ("STRZCC", "String Match Z Array", "Medium", "Z algorithm"),
        ("ZALG101", "Z Function Construction", "Medium", "Z algorithm"),
        ("ZALG102", "Longest Prefix Suffix Z", "Medium-Hard", "Z algorithm"),
        ("ZALG103", "Distinct Substrings Count Z", "Hard", "Z algorithm")
    ]),
    ("KINGDOM 6 — THE KINGDOM OF STRINGS", "Pattern 6.6 — Hashing", [
        ("STRHASH", "Polynomial Rolling Hash", "Medium", "string hashing"),
        ("CHEFHASH", "Chef Substring Hashing", "Medium-Hard", "double hashing"),
        ("SUBSTRHASH", "Rabin-Karp Substring Search", "Medium", "Rabin-Karp rolling hash"),
        ("HASH101", "Longest Duplicate Substring Hash", "Hard", "rolling hash, binary search"),
        ("HASH102", "Distinct Substrings Rabin Karp", "Hard", "string hashing"),
        ("HASH103", "Repeated DNA Sequences Hash", "Medium", "bitmask string hashing")
    ]),

    # KINGDOM 7 — THE KINGDOM OF BIT MANIPULATION (35)
    ("KINGDOM 7 — THE KINGDOM OF BIT MANIPULATION", "Pattern 7.1 — Basic Bit Operations", [
        ("FLOW016", "GCD and LCM", "Easy", "bit operations, math"),
        ("FLOW017", "Second Largest", "Beginner", "basic comparison, bitwise"),
        ("FLOW018", "Small Factorial", "Easy", "arrays, big number representation"),
        ("FCTRL2", "Small Factorials", "Easy", "big integer math"),
        ("FCTRL", "Factorial", "Easy", "trailing zeros, bit math"),
        ("MARBLES", "Marbles", "Easy-Medium", "combinatorics, bitwise overflow prevention"),
        ("BIT101", "Number of 1 Bits", "Beginner", "popcount, bitwise AND"),
        ("BIT102", "Counting Bits 0 to N", "Easy", "DP, bitwise shift"),
        ("BIT103", "Power of Two Check", "Beginner", "n & (n - 1)"),
        ("BIT104", "Reverse Bits", "Easy", "bitwise bit shift")
    ]),
    ("KINGDOM 7 — THE KINGDOM OF BIT MANIPULATION", "Pattern 7.2 — XOR Properties", [
        ("XORAGAIN", "XOR Again", "Easy", "XOR properties"),
        ("XOR101", "Single Number I", "Beginner", "XOR cancellation"),
        ("XOR102", "Single Number II", "Medium", "bitwise state machine"),
        ("XOR103", "Single Number III", "Medium", "two unique elements XOR diff bit"),
        ("XOR104", "Missing Number 0 to N", "Beginner", "XOR range property"),
        ("XOR105", "XOR Operation in Array", "Beginner", "XOR summation"),
        ("XOR106", "Find Kth Largest XOR Pair", "Hard", "trie XOR properties"),
        ("XOR107", "Bitwise AND of Numbers Range", "Medium", "common bit prefix"),
        ("XOR108", "Minimum Flips to Make a OR b Equal c", "Medium", "bitwise manipulation")
    ]),
    ("KINGDOM 7 — THE KINGDOM OF BIT MANIPULATION", "Pattern 7.3 — Bitmask Enumeration", [
        ("BITMASK1", "All Subsets Generation Bitmask", "Easy-Medium", "bitmask enumeration"),
        ("SUBSETBIT", "Submask Enumeration Traversal", "Medium", "submask bitwise loop"),
        ("CHEFBIT", "Chef Bitmask Assignment", "Medium-Hard", "bitmask DP"),
        ("MASK101", "Subsets Power Set Bitmask", "Medium", "bitmask generation"),
        ("MASK102", "Can I Win Game Bitmask", "Hard", "bitmask memoization"),
        ("MASK103", "Partition to K Equal Sum Subsets", "Medium-Hard", "bitmask DP"),
        ("MASK104", "Smallest Sufficient Team", "Hard", "bitmask DP"),
        ("MASK105", "Matchsticks to Square", "Medium", "bitmask DP")
    ]),
    ("KINGDOM 7 — THE KINGDOM OF BIT MANIPULATION", "Pattern 7.4 — Trie + XOR", [
        ("XORPAIR", "Max XOR Pair in Array Trie", "Medium-Hard", "binary trie XOR"),
        ("TRIEXOR", "Maximum XOR With Element From Array", "Hard", "trie offline queries"),
        ("TRIEXOR101", "Maximum XOR of Two Numbers", "Medium-Hard", "binary trie"),
        ("TRIEXOR102", "Count Pairs With XOR in Range", "Hard", "binary trie count"),
        ("TRIEXOR103", "Maximum Subarray XOR Trie", "Hard", "prefix XOR binary trie"),
        ("TRIEXOR104", "XOR Query Path on Tree Trie", "Hard", "trie, tree path"),
        ("TRIEXOR105", "Persistent Trie Max XOR", "Expert", "persistent binary trie"),
        ("TRIEXOR106", "Dynamic Trie Max XOR Insert Delete", "Expert", "trie lazy update")
    ]),

    # KINGDOM 8 — THE KINGDOM OF MATHEMATICS & NUMBER THEORY (45)
    ("KINGDOM 8 — THE KINGDOM OF MATHEMATICS & NUMBER THEORY", "Pattern 8.1 — Basic Mathematics", [
        ("FLOW009", "Total Expenses", "Beginner", "basic math, percentage"),
        ("FLOW010", "Id and Ship", "Beginner", "if-else, basic mapping"),
        ("FLOW011", "Gross Salary", "Beginner", "formula evaluation"),
        ("FLOW013", "Valid Triangles", "Beginner", "triangle angle sum"),
        ("FLOW014", "Grade The Steel", "Beginner", "multi-condition logic"),
        ("FSQRT", "Finding Square Roots", "Beginner", "integer square root"),
        ("MATH101", "Palindrome Number", "Beginner", "math digit extraction"),
        ("MATH102", "Armstrong Number Check", "Beginner", "math power sum")
    ]),
    ("KINGDOM 8 — THE KINGDOM OF MATHEMATICS & NUMBER THEORY", "Pattern 8.2 — GCD & LCM", [
        ("GCD2", "GCD2", "Easy-Medium", "large integer GCD, modular arithmetic"),
        ("CHEFGCD", "Chef and GCD", "Easy", "GCD properties"),
        ("LCMGCD", "LCM and GCD Range", "Easy-Medium", "Euclidean algorithm"),
        ("GCD101", "Greatest Common Divisor Traversal", "Medium", "GCD property"),
        ("GCD102", "Generalized GCD Array Pairs", "Medium", "GCD frequency count"),
        ("GCD103", "Minimum Operations Equal GCD", "Medium-Hard", "GCD properties"),
        ("GCD104", "Subarray GCD Equal K", "Medium-Hard", "sparse table GCD")
    ]),
    ("KINGDOM 8 — THE KINGDOM OF MATHEMATICS & NUMBER THEORY", "Pattern 8.3 — Prime Numbers & Sieve", [
        ("PRB01", "Primality Test", "Beginner", "prime check O(sqrt N)"),
        ("SEIVE1", "Sieve of Eratosthenes", "Easy", "prime sieve"),
        ("PRIMES2", "Prime Factorization Sieve", "Medium", "smallest prime factor sieve"),
        ("PRIME1", "Prime Generator", "Medium", "segmented sieve"),
        ("PRIME101", "Count Primes Less Than N", "Easy-Medium", "sieve of eratosthenes"),
        ("PRIME102", "Prime Factors Product Count", "Medium", "prime factorization")
    ]),
    ("KINGDOM 8 — THE KINGDOM OF MATHEMATICS & NUMBER THEORY", "Pattern 8.4 — Modular Arithmetic", [
        ("MODEX", "Modular Exponentiation", "Easy-Medium", "binary exponentiation"),
        ("POWMOD", "Fast Power Modulo M", "Easy", "modular exponentiation"),
        ("MODINV1", "Fermat's Little Theorem Inverse", "Medium", "modular inverse"),
        ("MODINV2", "Extended Euclidean Algorithm", "Medium-Hard", "extgcd inverse"),
        ("CRT1", "Chinese Remainder Theorem", "Hard", "CRT modular system"),
        ("MOD101", "Super Pow Modular Exponentiation", "Medium", "Euler totient theorem")
    ]),
    ("KINGDOM 8 — THE KINGDOM OF MATHEMATICS & NUMBER THEORY", "Pattern 8.5 — Combinatorics", [
        ("COMB1", "nCr Combinations Modulo P", "Easy-Medium", "nCr precomputation, factorials"),
        ("CHEFCOMB", "Chef Combination Sum", "Medium", "Pascal triangle, nCr"),
        ("PASCTRI", "Pascal's Triangle Row", "Beginner", "combinatorics"),
        ("COMB101", "Unique Paths Grid Combinatorics", "Easy-Medium", "nCr grid paths"),
        ("COMB102", "Catalan Numbers Count", "Medium-Hard", "Catalan formula"),
        ("COMB103", "Stirling Numbers Second Kind", "Hard", "combinatorics DP"),
        ("COMB104", "Lucas Theorem nCr Large N Mod P", "Hard", "Lucas theorem")
    ]),
    ("KINGDOM 8 — THE KINGDOM OF MATHEMATICS & NUMBER THEORY", "Pattern 8.6 — Inclusion–Exclusion / Number Theory", [
        ("NUMTH1", "Euler's Totient Phi Function", "Medium", "Euler totient"),
        ("INCEXC", "Inclusion Exclusion Principle Count", "Medium-Hard", "inclusion exclusion"),
        ("EULER1", "Coprime Pairs Count", "Hard", "Euler phi, Mobius inversion"),
        ("MOBIUS1", "Mobius Function Precomputation", "Hard", "Mobius sieve"),
        ("INCEXC101", "Count Numbers Divisible by Prime Set", "Medium-Hard", "inclusion exclusion bitmask"),
        ("INCEXC102", "Square Free Numbers Count", "Hard", "Mobius inversion"),
        ("INCEXC103", "Sum of GCD of All Pairs", "Hard", "Euler totient sieve"),
        ("INCEXC104", "Primitive Roots Modulo Prime", "Expert", "number theory")
    ]),

    # KINGDOM 9 — THE KINGDOM OF RECURSION & BACKTRACKING (25)
    ("KINGDOM 9 — THE KINGDOM OF RECURSION & BACKTRACKING", "Pattern 9.1 — Basic Recursion", [
        ("TRISQ", "Fit Squares in Triangle", "Easy", "recursion, geometry"),
        ("FIBO1", "Fibonacci Recursion Memoized", "Beginner", "recursion"),
        ("REC101", "Power X N Recursion", "Easy", "divide & conquer recursion"),
        ("REC102", "Tower of Hanoi Steps", "Easy-Medium", "recursion"),
        ("REC103", "Reverse Stack Using Recursion", "Medium", "recursion"),
        ("REC104", "Sort Array Using Recursion", "Medium", "recursion")
    ]),
    ("KINGDOM 9 — THE KINGDOM OF RECURSION & BACKTRACKING", "Pattern 9.2 — Brute Force with Backtracking", [
        ("NQUEENS", "N-Queens Solver", "Hard", "backtracking, pruning"),
        ("SUDOKU", "Sudoku Solver", "Hard", "backtracking"),
        ("PERMUT1", "Permutations Generator", "Medium", "backtracking"),
        ("BACK101", "Word Search Grid Backtracking", "Medium", "backtracking DFS"),
        ("BACK102", "Rat in a Maze Path Find", "Medium", "backtracking"),
        ("BACK103", "Knight Tour Traversal", "Hard", "backtracking Warnsdorff")
    ]),
    ("KINGDOM 9 — THE KINGDOM OF RECURSION & BACKTRACKING", "Pattern 9.3 — Generate All Possibilities", [
        ("SUBSETS", "Subsets Generation Backtracking", "Medium", "backtracking"),
        ("ALLPERM", "Unique Permutations Generator", "Medium", "backtracking hash set"),
        ("BACKTRK1", "Combination Sum Target", "Medium", "backtracking"),
        ("GEN101", "Generate Parentheses Pairs", "Medium", "backtracking balance"),
        ("GEN102", "Letter Combinations Phone Keypad", "Medium", "backtracking mapping"),
        ("GEN103", "Palindrome Partitioning All", "Medium-Hard", "backtracking DP")
    ]),
    ("KINGDOM 9 — THE KINGDOM OF RECURSION & BACKTRACKING", "Pattern 9.4 — Recursive Divide Construction", [
        ("DIVREC1", "Divide and Conquer Matrix Fast Exponentiation", "Hard", "recursion matrix"),
        ("HANOI1", "Hanoi Dual Peg Variant", "Medium-Hard", "recursive construction"),
        ("DIVREC101", "Construct Quad Tree Grid", "Medium", "divide and conquer recursion"),
        ("DIVREC102", "Kth Symbol in Grammar", "Medium", "recursive divide"),
        ("DIVREC103", "Different Ways to Add Parentheses", "Medium", "recursion memoization"),
        ("DIVREC104", "Gray Code Sequence Recursive", "Medium", "recursive construction"),
        ("DIVREC105", "Beautiful Array Partition Recursive", "Hard", "recursive divide construction")
    ]),

    # KINGDOM 10 — THE KINGDOM OF STACK & MONOTONIC STACK (35)
    ("KINGDOM 10 — THE KINGDOM OF STACK & MONOTONIC STACK", "Pattern 10.1 — Basic Stack", [
        ("COMPILER", "Compilers and Parsers", "Easy-Medium", "stack, prefix validity"),
        ("STACK1", "Implement Stack using Queues", "Beginner", "stack operations"),
        ("PAREN1", "Valid Parentheses Match", "Beginner", "stack"),
        ("BSTACK101", "Min Stack O(1) GetMin", "Medium", "stack aux"),
        ("BSTACK102", "Evaluate Reverse Polish Notation RPN", "Medium", "stack arithmetic"),
        ("BSTACK103", "Simplify Path Unix Standard", "Medium", "stack string"),
        ("BSTACK104", "Basic Calculator II Operator Precedence", "Medium-Hard", "stack expression"),
        ("BSTACK105", "Decode String Expression Stack", "Medium", "stack string expansion")
    ]),
    ("KINGDOM 10 — THE KINGDOM OF STACK & MONOTONIC STACK", "Pattern 10.2 — Parentheses", [
        ("ZCO12001", "Matched Brackets", "Easy-Medium", "stack, nesting depth & maximum length"),
        ("MATCHING", "Matching Brackets II", "Medium", "stack, multi-bracket validation"),
        ("BRACKETS", "Brackets Score Sum", "Easy", "stack, balanced check"),
        ("PAR101", "Longest Valid Parentheses Substring", "Hard", "stack / DP"),
        ("PAR102", "Score of Parentheses", "Medium", "stack arithmetic"),
        ("PAR103", "Minimum Add to Make Parentheses Valid", "Medium", "stack balance"),
        ("PAR104", "Check if Word Is Valid After Substitutions", "Medium", "stack pattern elimination")
    ]),
    ("KINGDOM 10 — THE KINGDOM OF STACK & MONOTONIC STACK", "Pattern 10.3 — Monotonic Stack", [
        ("ZCO14002", "SUPW Workout Minimum Cost", "Medium", "monotonic stack, DP min window"),
        ("INOI1301", "Calvins Game", "Medium-Hard", "monotonic stack, forward backward DP"),
        ("MAXRECT", "Largest Rectangle in Histogram", "Hard", "monotonic stack"),
        ("HISTOG", "Max Histogram Area", "Hard", "monotonic stack"),
        ("MONOSTACK1", "Next Greater Element I", "Easy", "monotonic stack"),
        ("MONOSTACK2", "Next Greater Element II Circular", "Medium", "monotonic stack"),
        ("MONOSTACK3", "Daily Temperatures Span", "Medium", "monotonic stack"),
        ("MONOSTACK4", "Online Stock Span", "Medium", "monotonic stack"),
        ("MONOSTACK5", "Maximal Rectangle 2D Binary Matrix", "Hard", "monotonic stack"),
        ("MONOSTACK6", "Sum of Subarray Minimums", "Medium-Hard", "monotonic stack contribution"),
        ("MONOSTACK7", "Sum of Subarray Ranges", "Medium-Hard", "monotonic stack min max"),
        ("MONOSTACK8", "Number of Visible People in a Queue", "Hard", "monotonic stack")
    ]),
    ("KINGDOM 10 — THE KINGDOM OF STACK & MONOTONIC STACK", "Pattern 10.5 — Stack + Greedy", [
        ("STKGREEDY", "Remove Duplicate Letters Monotonic Stack", "Medium-Hard", "stack greedy"),
        ("EVALEXPR", "Evaluate Mathematical Expression Stack", "Medium", "stack greedy operator"),
        ("STKGREE1", "Smallest Subsequence Distinct Monotonic", "Medium-Hard", "stack greedy"),
        ("STKGREE2", "132 Pattern Search Monotonic Stack", "Medium-Hard", "monotonic stack"),
        ("STKGREE3", "Maximum Width Ramp Monotonic Stack", "Medium-Hard", "monotonic stack index"),
        ("STKGREE4", "Car Fleet Target Destination", "Medium", "greedy stack sorting"),
        ("STKGREE5", "Asteroid Collision Simulation", "Medium", "stack simulation greedy")
    ]),

    # KINGDOM 11 — THE KINGDOM OF QUEUE & DEQUE (20)
    ("KINGDOM 11 — THE KINGDOM OF QUEUE & DEQUE", "Pattern 11.1 — Queue Simulation", [
        ("QUEUE1", "Implement Queue using Stacks", "Easy", "queue simulation"),
        ("SLIDING1", "Circular Queue Design", "Medium", "queue simulation array"),
        ("BREADTH1", "Recent Calls Counter Queue", "Easy", "queue simulation window"),
        ("QSIM101", "Dota2 Senate Elimination Queue", "Medium", "queue simulation greedy"),
        ("QSIM102", "Task Scheduler Queue Simulation", "Medium", "queue max heap")
    ]),
    ("KINGDOM 11 — THE KINGDOM OF QUEUE & DEQUE", "Pattern 11.2 — Deque", [
        ("DEQUE1", "Design Circular Deque", "Medium", "deque data structure"),
        ("SLIDINGMAX", "Sliding Window Maximum Deque", "Hard", "monotonic deque"),
        ("MAXDEQUE", "Max Value Deque O(1)", "Medium-Hard", "deque max tracking"),
        ("DEQ101", "Shortest Subarray with Sum at Least K", "Hard", "monotonic deque prefix sum"),
        ("DEQ102", "Jump Game VI Maximum Score Deque", "Medium-Hard", "deque DP")
    ]),
    ("KINGDOM 11 — THE KINGDOM OF QUEUE & DEQUE", "Pattern 11.3 — Monotonic Queue", [
        ("SLIDINGWINDOW", "Constrained Subsequence Sum Monotonic Queue", "Hard", "monotonic queue DP"),
        ("MONOQUEUE", "Longest Continuous Subarray Absolute Diff", "Medium-Hard", "two deques monotonic queue"),
        ("MONOQ101", "Delivering Boxes from Storage to Ports", "Hard", "monotonic queue DP"),
        ("MONOQ102", "Max Value of Equation Deque", "Hard", "monotonic queue")
    ]),
    ("KINGDOM 11 — THE KINGDOM OF QUEUE & DEQUE", "Pattern 11.4 — Queue + BFS Style", [
        ("BFSQUEUE", "Walls and Gates BFS Queue", "Medium", "multi-source BFS queue"),
        ("SHORTQ", "Rotting Oranges Multi-Source BFS", "Medium", "BFS queue grid"),
        ("QBFS101", "Shortest Path in Binary Matrix BFS", "Medium", "BFS queue"),
        ("QBFS102", "Word Ladder Shortest Transformation BFS", "Hard", "BFS queue hash set"),
        ("QBFS103", "Minimum Knight Moves BFS", "Medium", "BFS queue bidirectional"),
        ("QBFS104", "Open the Lock Combination BFS", "Medium", "BFS queue state")
    ]),

    # KINGDOM 12 — THE KINGDOM OF LINKED LIST & SIMULATION (20)
    ("KINGDOM 12 — THE KINGDOM OF LINKED LIST & SIMULATION", "Pattern 12.1 — Simple Simulation", [
        ("SIM101", "Design Linked List", "Easy", "linked list operations"),
        ("SIM102", "Reverse Linked List", "Beginner", "linked list iteration"),
        ("SIM103", "Merge Two Sorted Lists", "Easy", "linked list two pointers"),
        ("SIM104", "Middle of the Linked List", "Beginner", "fast slow pointers"),
        ("SIM105", "Delete Node in a Linked List", "Easy", "linked list")
    ]),
    ("KINGDOM 12 — THE KINGDOM OF LINKED LIST & SIMULATION", "Pattern 12.2 — Circular Simulation", [
        ("JOSEPHUS", "Josephus Problem Circle Elimination", "Medium", "circular simulation linked list"),
        ("CIRCSIM", "Circular Array Loop Cycle Detection", "Medium", "fast slow pointers circular"),
        ("CIRCLIST101", "Linked List Cycle Detection I", "Easy", "Floyds cycle detection"),
        ("CIRCLIST102", "Linked List Cycle Start Node II", "Medium", "Floyds cycle detection"),
        ("CIRCLIST103", "Design Circular Queue Linked List", "Medium", "circular linked list")
    ]),
    ("KINGDOM 12 — THE KINGDOM OF LINKED LIST & SIMULATION", "Pattern 12.3 — Simulation with Data Structures", [
        ("SIMDATA", "LRU Cache Design", "Medium-Hard", "doubly linked list, hash map"),
        ("GRIDWALK", "LFU Cache Design", "Hard", "doubly linked list, hash map frequency"),
        ("SIMDS101", "Design Browser History", "Medium", "doubly linked list simulation"),
        ("SIMDS102", "Design Underground System", "Medium", "hash map simulation"),
        ("SIMDS103", "Flatten Multilevel Doubly Linked List", "Medium", "stack linked list recursion")
    ]),
    ("KINGDOM 12 — THE KINGDOM OF LINKED LIST & SIMULATION", "Pattern 12.4 — Ordered Set Simulation", [
        ("ORDERSET", "Order Statistic Tree Simulation", "Hard", "ordered set, PBDS / Fenwick"),
        ("MEDIAN1", "Find Median from Data Stream", "Hard", "two heaps ordered simulation"),
        ("ORDSET101", "My Calendar I Booking Interval", "Medium", "treemap ordered set"),
        ("ORDSET102", "My Calendar II Double Booking", "Medium-Hard", "ordered set interval"),
        ("ORDSET103", "Data Stream as Disjoint Intervals", "Hard", "ordered set segment")
    ]),

    # KINGDOM 13 — THE KINGDOM OF TREES (50)
    ("KINGDOM 13 — THE KINGDOM OF TREES", "Pattern 13.1 — Basic Tree DFS", [
        ("TREE1", "Maximum Depth of Binary Tree", "Beginner", "tree DFS"),
        ("TREEDFS", "Invert Binary Tree", "Beginner", "tree DFS"),
        ("SUBTREE1", "Subtree of Another Tree", "Easy", "tree DFS matching"),
        ("TREE101", "Same Tree Check", "Beginner", "tree DFS"),
        ("TREE102", "Symmetric Tree Check", "Easy", "tree DFS"),
        ("TREE103", "Path Sum I Target", "Easy", "tree DFS"),
        ("TREE104", "Path Sum II All Root to Leaf Paths", "Medium", "tree DFS backtracking"),
        ("TREE105", "Diameter of Binary Tree", "Easy", "tree DFS height"),
        ("TREE106", "Balanced Binary Tree Check", "Easy", "tree DFS bottom up")
    ]),
    ("KINGDOM 13 — THE KINGDOM OF TREES", "Pattern 13.2 — Tree Traversal", [
        ("TRAVERSE1", "Binary Tree Level Order Traversal", "Easy", "BFS queue level traversal"),
        ("TREELEAF", "Leaf-Similar Trees", "Beginner", "DFS leaf collector"),
        ("HEIGHT1", "Binary Tree Zigzag Level Order Traversal", "Medium", "BFS deque level traversal"),
        ("TTRAV101", "Binary Tree Preorder Traversal Iterative", "Easy", "stack tree traversal"),
        ("TTRAV102", "Binary Tree Inorder Traversal Iterative", "Easy", "stack tree traversal"),
        ("TTRAV103", "Binary Tree Postorder Traversal Iterative", "Medium", "stack tree traversal"),
        ("TTRAV104", "Vertical Order Traversal of Binary Tree", "Hard", "DFS coordinate hashing"),
        ("TTRAV105", "Populating Next Right Pointers", "Medium", "BFS level pointers"),
        ("TTRAV106", "Construct Binary Tree Preorder Inorder", "Medium", "divide & conquer tree construction")
    ]),
    ("KINGDOM 13 — THE KINGDOM OF TREES", "Pattern 13.3 — Tree DP", [
        ("INOI1402", "Free Ticket Tree Path Maximum", "Medium-Hard", "tree DP, Floyd Warshall"),
        ("TREEDP1", "Binary Tree Maximum Path Sum", "Hard", "tree DP node path"),
        ("INDEPENDENT", "Maximum Weight Independent Set Tree", "Medium-Hard", "tree DP state 0 1"),
        ("MAXWEIGHT", "House Robber III Tree DP", "Medium", "tree DP memoization"),
        ("TDP101", "Unique Binary Search Trees DP", "Medium", "Catalan number DP"),
        ("TDP102", "Count Nodes Equal Average Subtree", "Medium", "tree DP sum count"),
        ("TDP103", "Distribute Coins in Binary Tree", "Medium", "tree DP balance flow"),
        ("TDP104", "Sum of Distances in Tree", "Hard", "rerooting tree DP"),
        ("TDP105", "Longest Univalue Path Tree", "Medium", "tree DP path extension")
    ]),
    ("KINGDOM 13 — THE KINGDOM OF TREES", "Pattern 13.4 — Binary Lifting (LCA)", [
        ("TALCA", "Lowest Common Ancestor Binary Lifting", "Medium-Hard", "binary lifting LCA"),
        ("LCA1", "Lowest Common Ancestor Binary Search Tree", "Easy", "BST LCA"),
        ("ANCESTOR1", "Lowest Common Ancestor Binary Tree", "Medium", "LCA recursion"),
        ("LCA101", "Kth Ancestor of a Tree Node", "Hard", "binary lifting matrix"),
        ("LCA102", "Distance Between Two Nodes in Tree", "Medium-Hard", "LCA depth formula"),
        ("LCA103", "Min Max Edge Weight Query Path", "Hard", "binary lifting max edge"),
        ("LCA104", "Tree Path XOR Query LCA", "Hard", "binary lifting XOR"),
        ("LCA105", "Lowest Common Ancestor Deepest Leaves", "Medium", "LCA height match")
    ]),
    ("KINGDOM 13 — THE KINGDOM OF TREES", "Pattern 13.5 — Rerooting DP", [
        ("REROOT1", "Tree Node Distance Sum Rerooting", "Hard", "rerooting tree DP"),
        ("TREECENTROID", "Centroid of Tree Rerooting DP", "Hard", "tree centroid rerooting"),
        ("REROOT101", "Tree All Nodes Minimum Height Trees", "Medium-Hard", "rerooting BFS"),
        ("REROOT102", "Maximum Product of Splitting Tree", "Medium", "subtree sum tree DP"),
        ("REROOT103", "Greatest Common Divisor Tree Subtree DP", "Hard", "rerooting DP"),
        ("REROOT104", "Tree Coloring Max Score Rerooting", "Hard", "rerooting DP"),
        ("REROOT105", "Tree Path Coverage Rerooting", "Expert", "rerooting DP")
    ]),
    ("KINGDOM 13 — THE KINGDOM OF TREES", "Pattern 13.6 — Euler Tour", [
        ("EULERTOUR1", "Euler Tour Subtree Query Flattening", "Hard", "Euler tour segment tree"),
        ("SUBTREEQUERY", "Tree Subtree Update Point Query", "Hard", "Euler tour Fenwick tree"),
        ("ETOUR101", "Tree Subtree Sum Query Fenwick", "Hard", "Euler tour BIT"),
        ("ETOUR102", "LCA via Euler Tour RMQ Segment Tree", "Hard", "Euler tour RMQ LCA"),
        ("ETOUR103", "Subtree Color Count Query", "Hard", "Euler tour DSU on tree Sack"),
        ("ETOUR104", "Subtree Frequency Mo's Algorithm on Tree", "Expert", "Euler tour Mo algorithm"),
        ("ETOUR105", "Path Update Point Query Euler Tour", "Hard", "Euler tour BIT"),
        ("ETOUR106", "Heavy Light Decomposition Base Euler Tour", "Hard", "Euler tour HLD")
    ]),

    # KINGDOM 14 — THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS) (50)
    ("KINGDOM 14 — THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)", "Pattern 14.1 — Connected Components", [
        ("FIRESC", "Fire Escape Routes", "Medium", "DFS connected components, product combinatorics"),
        ("DISHOWN", "Dish Owner", "Medium", "DSU / DFS connected components"),
        ("CONNECT1", "Number of Islands Grid", "Medium", "DFS 2D grid components"),
        ("CONN101", "Max Area of Island Grid", "Medium", "DFS grid area sum"),
        ("CONN102", "Number of Provinces Graph", "Medium", "DFS adjacency matrix"),
        ("CONN103", "Surrounded Regions Capture Grid", "Medium", "boundary DFS BFS"),
        ("CONN104", "Number of Closed Islands Grid", "Medium", "boundary DFS"),
        ("CONN105", "Count Sub Islands Grid", "Medium", "dual DFS grid"),
        ("CONN106", "Number of Operations to Make Network Connected", "Medium", "DSU connected components"),
        ("CONN107", "Accounts Merge Email Graph", "Medium-Hard", "DFS DSU components")
    ]),
    ("KINGDOM 14 — THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)", "Pattern 14.2 — DFS", [
        ("DFS1", "Graph DFS Traversal", "Easy", "DFS recursion"),
        ("GRAPHDFS", "Clone Graph DFS", "Medium", "DFS hash map memo"),
        ("PATHFIND", "All Paths From Source to Target", "Medium", "DFS backtracking path"),
        ("DFS101", "Keys and Rooms Graph DFS", "Easy", "DFS set traversal"),
        ("DFS102", "Reconstruct Itinerary Eulerian DFS", "Hard", "Hierholzer algorithm Eulerian DFS"),
        ("DFS103", "Evaluate Division Graph DFS Weights", "Medium", "DFS path multiplication"),
        ("DFS104", "Time Needed to Inform All Employees", "Medium", "tree DFS max depth weight"),
        ("DFS105", "Pacific Atlantic Water Flow Grid DFS", "Medium", "dual boundary DFS"),
        ("DFS106", "Word Search II Trie + Grid DFS", "Hard", "Trie DFS backtracking"),
        ("DFS107", "Making A Large Island Grid DFS", "Hard", "component ID DFS grid")
    ]),
    ("KINGDOM 14 — THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)", "Pattern 14.4 — Topological Sort", [
        ("TOPSORT1", "Course Schedule I Cycle Detection", "Medium", "Kahn algorithm in-degree BFS"),
        ("DEPENDENCY", "Course Schedule II Ordering", "Medium", "Kahn algorithm topological sort"),
        ("TOP101", "Alien Dictionary Order Topological Sort", "Hard", "topological sort Kahn DFS"),
        ("TOP102", "Minimum Height Trees Topological Trim", "Medium", "leaf trimming BFS topological"),
        ("TOP103", "Sequence Reconstruction Unique Topological Sort", "Hard", "Kahn algorithm topological sort"),
        ("TOP104", "Find Eventual Safe States Graph", "Medium", "reverse topological sort / cycle DFS"),
        ("TOP105", "Sort Items by Groups Respecting Dependencies", "Hard", "double topological sort"),
        ("TOP106", "Parallel Courses I Semester Count", "Medium", "topological sort BFS level"),
        ("TOP107", "Build a Matrix With Conditions Topological", "Hard", "2D topological sort")
    ]),
    ("KINGDOM 14 — THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)", "Pattern 14.5 — Cycle Detection", [
        ("CYCLEDET", "Cycle Detection Undirected Graph DFS", "Easy-Medium", "DFS parent check"),
        ("DIRECTEDCYC", "Cycle Detection Directed Graph DFS", "Medium", "DFS visited state 0 1 2"),
        ("CYC101", "Redundant Connection Undirected Cycle", "Medium", "DSU cycle detection"),
        ("CYC102", "Redundant Connection II Directed Tree Edge", "Hard", "DSU directed cycle"),
        ("CYC103", "Find All Groups of Farmland Cycle Free", "Medium", "grid traversal cycle free"),
        ("CYC104", "Graph Valid Tree Check", "Medium", "DSU / DFS cycle + component count"),
        ("CYC105", "Detect Cycles in 2D Grid", "Medium", "grid DFS parent cycle check"),
        ("CYC106", "Shortest Cycle in a Graph BFS", "Hard", "BFS cycle length minimum"),
        ("CYC107", "Longest Cycle in a Graph Functional", "Hard", "functional graph cycle DFS")
    ]),
    ("KINGDOM 14 — THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)", "Pattern 14.6 — Bipartite Graph", [
        ("BIPARTITE1", "Is Graph Bipartite 2-Coloring DFS", "Medium", "BFS DFS 2-coloring"),
        ("TWOCOLOR", "Possible Bipartition Group Split", "Medium", "bipartite 2-coloring BFS"),
        ("BIP101", "Cheating Student Bipartite Graph", "Medium", "bipartite graph check"),
        ("BIP102", "Maximum Bipartite Matching Hopcroft-Karp", "Hard", "Hopcroft-Karp Bipartite Matching"),
        ("BIP103", "Hungarian Algorithm Minimum Weight Bipartite Matching", "Expert", "Hungarian KM Algorithm"),
        ("BIP104", "Bipartite Graph Maximum Independent Set", "Hard", "Konig theorem bipartite max matching"),
        ("BIP105", "Divide Nodes Into the Maximum Number of Groups", "Hard", "BFS bipartite component diameter"),
        ("BIP106", "Minimum Vertex Cover in Bipartite Graph", "Hard", "Konig theorem bipartite cover"),
        ("BIP107", "Bipartite Graph Edge Removal Equal Color", "Medium-Hard", "bipartite 2-coloring"),
        ("BIP108", "Coloring a Border 2D Grid Bipartite", "Medium", "grid DFS 2-coloring boundary")
    ]),

    # KINGDOM 15 — THE KINGDOM OF SHORTEST PATHS (35)
    ("KINGDOM 15 — THE KINGDOM OF SHORTEST PATHS", "Pattern 15.1 — Standard Dijkstra", [
        ("DIJKSTRA1", "Network Delay Time Dijkstra", "Medium", "Dijkstra min-heap priority queue"),
        ("SHORTPATH", "Path with Maximum Probability Dijkstra", "Medium", "Dijkstra max-heap product"),
        ("DIJ101", "Cheapest Flights Within K Stops Dijkstra", "Medium-Hard", "Dijkstra modified state / Bellman-Ford"),
        ("DIJ102", "Swim in Rising Water Dijkstra Grid", "Hard", "Dijkstra min-heap grid max elevation"),
        ("DIJ103", "Path With Minimum Effort Grid Dijkstra", "Medium", "Dijkstra min max diff"),
        ("DIJ104", "Shortest Path Visiting All Nodes Bitmask Dijkstra", "Hard", "Dijkstra bitmask state"),
        ("DIJ105", "Reachable Nodes In Subdivided Graph Dijkstra", "Hard", "Dijkstra edge subdivision count"),
        ("DIJ106", "Find Minimum Time to Finish All Jobs Dijkstra", "Hard", "Dijkstra state space"),
        ("DIJ107", "Shortest Distance After Road Addition Queries I", "Medium", "Dijkstra BFS queries"),
        ("DIJ108", "Second Shortest Path to Reach Destination", "Hard", "Dijkstra k-th shortest path")
    ]),
    ("KINGDOM 15 — THE KINGDOM OF SHORTEST PATHS", "Pattern 15.3 — 0-1 BFS", [
        ("BFS01", "Shortest Path 0-1 Edge Weights Deque BFS", "Medium", "0-1 BFS deque popleft pushleft"),
        ("CHEAPEST1", "Minimum Cost to Make at Least One Valid Path Grid", "Hard", "0-1 BFS grid direction deque"),
        ("Z1BFS101", "Minimum Obstacle Removal to Reach Corner", "Hard", "0-1 BFS grid removal count"),
        ("Z1BFS102", "Minimum Cost to Reach City 0-1 BFS", "Medium", "0-1 BFS state deque"),
        ("Z1BFS103", "Minimum Flips to Grid Edge Path 0-1 BFS", "Medium-Hard", "0-1 BFS grid"),
        ("Z1BFS104", "Shortest Grid Path With 0 and 1 Weight Edge", "Medium", "0-1 BFS deque"),
        ("Z1BFS105", "Zero One Weight Shortest Cycle BFS", "Hard", "0-1 BFS deque cycle"),
        ("Z1BFS106", "Binary Grid Shortest Path Toggle Cost", "Medium-Hard", "0-1 BFS deque")
    ]),
    ("KINGDOM 15 — THE KINGDOM OF SHORTEST PATHS", "Pattern 15.4 — Bellman-Ford / Negative Edges", [
        ("BELLMAN1", "Bellman Ford Single Source Shortest Path", "Medium-Hard", "Bellman-Ford V-1 relaxation"),
        ("NEGATIVE1", "Negative Weight Cycle Detection Bellman Ford", "Medium-Hard", "Bellman-Ford V-th relaxation cycle"),
        ("BF101", "SPFA Shortest Path Faster Algorithm", "Medium-Hard", "SPFA queue relaxation"),
        ("BF102", "Cheapest Flights Bellman Ford Array", "Medium", "Bellman-Ford K iterations"),
        ("BF103", "Arbitrage Currency Conversion Negative Cycle", "Hard", "Bellman-Ford log weights negative cycle"),
        ("BF104", "Johnson's All Pairs Shortest Path Algorithm", "Hard", "Johnson algorithm reweighting Bellman-Ford Dijkstra"),
        ("BF105", "Min Cost Max Flow SPFA Augmenting Path", "Hard", "SPFA Primal-Dual Min Cost Max Flow"),
        ("BF106", "Potent Graph Negative Cycle Search SPFA", "Hard", "SPFA count visited relaxation"),
        ("BF107", "Shortest Path Matrix Transition Bellman Ford", "Hard", "Bellman-Ford DP matrix")
    ]),
    ("KINGDOM 15 — THE KINGDOM OF SHORTEST PATHS", "Pattern 15.5 — Floyd Warshall", [
        ("FLOYD1", "Floyd Warshall All Pairs Shortest Path", "Medium-Hard", "Floyd Warshall O(V^3) 3 loops"),
        ("ALLPAIRS", "Find the City With Smallest Threshold Distance", "Medium", "Floyd Warshall matrix all pairs"),
        ("FW101", "Transitive Closure of Graph Floyd Warshall", "Medium", "Floyd Warshall boolean reachability"),
        ("FW102", "Evaluate Division All Pairs Query Floyd Warshall", "Medium", "Floyd Warshall matrix product"),
        ("FW103", "Minimum Cost to Convert String I Floyd Warshall", "Medium-Hard", "Floyd Warshall character transformation"),
        ("FW104", "Shortest Path With Distance Threshold Matrix", "Medium", "Floyd Warshall reachability count"),
        ("FW105", "Graph Transitive Reduction Minimal Edges", "Hard", "Floyd Warshall reachability reduction"),
        ("FW106", "Minimax Path Maximum Edge Weight All Pairs", "Hard", "Floyd Warshall min-max path"),
        ("FW107", "Dynamic Graph Floyd Warshall Edge Insert Query", "Hard", "Floyd Warshall incremental update O(V^2)"),
        ("FW108", "Diameter of Weighted Graph Floyd Warshall", "Medium-Hard", "Floyd Warshall max finite distance")
    ]),

    # KINGDOM 16 — THE KINGDOM OF DSU & MINIMUM SPANNING TREE (25)
    ("KINGDOM 16 — THE KINGDOM OF DSU & MINIMUM SPANNING TREE", "Pattern 16.1 — Basic DSU", [
        ("DSU1", "Disjoint Set Union Find Template", "Easy-Medium", "DSU path compression rank union"),
        ("DSU101", "Number of Connected Components DSU", "Medium", "DSU count components"),
        ("DSU102", "Graph Valid Tree DSU Check", "Medium", "DSU cycle + component check"),
        ("DSU103", "Redundant Connection DSU", "Medium", "DSU find redundant edge"),
        ("DSU104", "Friend Circles DSU", "Medium", "DSU matrix union"),
        ("DSU105", "Smallest String With Swaps DSU", "Medium", "DSU index grouping sorting")
    ]),
    ("KINGDOM 16 — THE KINGDOM OF DSU & MINIMUM SPANNING TREE", "Pattern 16.2 — Union Find Applications", [
        ("UNIONFIND1", "Accounts Merge DSU Email Lookup", "Medium-Hard", "DSU string hash grouping"),
        ("CONNECTED2", "Regions Cut By Slashes Grid DSU", "Hard", "DSU 3x3 grid subdivision"),
        ("UFA101", "Most Stones Removed with Same Row or Column", "Medium", "DSU row col index union"),
        ("UFA102", "Satisfiability of Equality Equations DSU", "Medium", "DSU equals non-equals validation"),
        ("UFA103", "Lexicographically Smallest Equivalent String DSU", "Medium", "DSU min character representative"),
        ("UFA104", "Number of Islands II Dynamic Add Land DSU", "Hard", "DSU 2D grid online land insertion"),
        ("UFA105", "Checking Existence of Edge Length Limited Paths", "Hard", "DSU offline query sorting by weight")
    ]),
    ("KINGDOM 16 — THE KINGDOM OF DSU & MINIMUM SPANNING TREE", "Pattern 16.3 — Kruskal's MST", [
        ("MST1", "Min Cost to Connect All Points Kruskal", "Medium", "Kruskal MST Manhattan distance edge sort"),
        ("KRUSKAL1", "Connecting Cities With Minimum Cost Kruskal", "Medium", "Kruskal MST edge list DSU"),
        ("MINSPAN", "Minimum Spanning Tree Edge Weights Sum", "Medium", "Kruskal MST DSU"),
        ("KMST101", "Optimize Water Distribution in a Village Kruskal", "Hard", "Kruskal MST virtual super source node 0"),
        ("KMST102", "Critical and Pseudo-Critical Edges in MST", "Hard", "Kruskal MST edge inclusion exclusion force"),
        ("KMST103", "Prim's Algorithm Minimum Spanning Tree Min-Heap", "Medium-Hard", "Prim MST min-heap priority queue"),
        ("KMST104", "Maximal Spanning Tree Negative Weight Kruskal", "Medium", "Kruskal MST max edge sort")
    ]),
    ("KINGDOM 16 — THE KINGDOM OF DSU & MINIMUM SPANNING TREE", "Pattern 16.5 — Offline DSU", [
        ("OFFLINEDSU", "Offline Dynamic Connectivity DSU Divide & Conquer", "Hard", "Offline DSU undo rollback stack"),
        ("DYNAMICCONN", "Offline Range Query Edge Add Delete DSU", "Expert", "DSU with rollback segment tree offline"),
        ("OFFDSU101", "Offline Queries Maximum Weight Edge Limit DSU", "Hard", "Offline query sorting DSU pointer"),
        ("OFFDSU102", "Offline Edge Addition Connectivity Query Range", "Hard", "Offline DSU rollback divide conquer"),
        ("OFFDSU103", "Dynamic Graph Bridge Count Offline DSU", "Expert", "Offline DSU bridge tracking")
    ]),

    # KINGDOM 17 — THE KINGDOM OF DYNAMIC PROGRAMMING (70)
    ("KINGDOM 17 — THE KINGDOM OF DYNAMIC PROGRAMMING", "Pattern 17.1 — Introduction to DP (1D DP)", [
        ("DP1D101", "Climbing Stairs 1D DP", "Beginner", "1D DP Fibonacci transition"),
        ("DP1D102", "Min Cost Climbing Stairs", "Easy", "1D DP min state transition"),
        ("DP1D103", "House Robber I Non Adjacent Sum", "Medium", "1D DP max choose skip"),
        ("DP1D104", "House Robber II Circular Houses", "Medium", "1D DP dual pass 0 to N-2 and 1 to N-1"),
        ("DP1D105", "Decode Ways String Message DP", "Medium", "1D DP digit parsing state"),
        ("DP1D106", "Word Break I Dictionary Split", "Medium", "1D DP boolean substring matching"),
        ("DP1D107", "Longest Increasing Subsequence LIS O(N^2)", "Medium", "1D DP LIS subproblem"),
        ("DP1D108", "Longest Increasing Subsequence LIS O(N log N)", "Medium-Hard", "Patience sorting binary search bisect_left")
    ]),
    ("KINGDOM 17 — THE KINGDOM OF DYNAMIC PROGRAMMING", "Pattern 17.2 — Knapsack DP", [
        ("KNAPSACK1", "0-1 Knapsack Classic Standard DP", "Medium", "0-1 Knapsack 2D 1D array capacity loop"),
        ("SUBSETSUM", "Subset Sum Problem Equal Partition DP", "Medium", "0-1 Knapsack subset sum boolean DP"),
        ("RATIONAL", "Coin Change I Minimum Coins DP", "Medium", "Unbounded Knapsack min coin DP"),
        ("KNAP101", "Coin Change II Total Ways Combination DP", "Medium", "Unbounded Knapsack ways outer coin loop"),
        ("KNAP102", "Partition Equal Subset Sum 0-1 Knapsack", "Medium", "0-1 Knapsack boolean subset sum target/2"),
        ("KNAP103", "Target Sum Plus Minus Signs Knapsack", "Medium", "0-1 Knapsack subset sum offset formula"),
        ("KNAP104", "Ones and Zeroes 2D 0-1 Knapsack DP", "Medium-Hard", "2D 0-1 Knapsack m zeros n ones capacity"),
        ("KNAP105", "Unbounded Knapsack Maximum Value DP", "Medium", "Unbounded Knapsack max profit capacity")
    ]),
    ("KINGDOM 17 — THE KINGDOM OF DYNAMIC PROGRAMMING", "Pattern 17.3 — Grid DP", [
        ("GRIDDP1", "Unique Paths I Robot Grid DP", "Easy-Medium", "2D Grid DP combinations / 2D table"),
        ("MAXPATH", "Unique Paths II Obstacles Grid DP", "Medium", "2D Grid DP obstacle zeroing"),
        ("CHEFGRID", "Minimum Path Sum Grid Top-Left to Bottom-Right", "Medium", "2D Grid DP min cost path"),
        ("GDP101", "Triangle Minimum Path Sum Top to Bottom DP", "Medium", "2D Grid DP triangle bottom up"),
        ("GDP102", "Dungeon Game Health Requirement Grid DP", "Hard", "2D Grid DP bottom-right to top-left min health"),
        ("GDP103", "Cherry Pickup I Grid Dual Walk 3D DP", "Hard", "3D Grid DP dual path simultaneous walk"),
        ("GDP104", "Cherry Pickup II Grid Two Robots 3D DP", "Hard", "3D Grid DP 2 robots simultaneous row walk")
    ]),
    ("KINGDOM 17 — THE KINGDOM OF DYNAMIC PROGRAMMING", "Pattern 17.4 — Interval DP", [
        ("INTERVALDP", "Matrix Chain Multiplication MCM Interval DP", "Medium-Hard", "Interval DP split k loop"),
        ("MATRIXMULT", "Longest Palindromic Subsequence LPS Interval DP", "Medium", "Interval DP len outer i j inner"),
        ("PALINDP", "Burst Balloons Maximum Coins Interval DP", "Hard", "Interval DP last burst balloon k"),
        ("INDP101", "Minimum Cost Tree From Leaf Values Interval DP", "Medium-Hard", "Interval DP max product split"),
        ("INDP102", "Strange Printer Minimum Turns Interval DP", "Hard", "Interval DP char match collapse"),
        ("INDP103", "Remove Boxes Maximum Score Interval DP", "Hard", "3D Interval DP len i j k same color count"),
        ("INDP104", "Predict the Winner Game Theory Interval DP", "Medium", "Interval DP minimax score diff")
    ]),
    ("KINGDOM 17 — THE KINGDOM OF DYNAMIC PROGRAMMING", "Pattern 17.5 — Digit DP", [
        ("DIGITDP1", "Count Numbers With Digit Constraint Digit DP", "Hard", "Digit DP idx tight leads zero memo"),
        ("COUNTDIGIT", "Number of Digit One Count Digit DP", "Hard", "Digit DP count digit occurrence"),
        ("DIG101", "Non-negative Integers without Consecutive Ones", "Hard", "Digit DP binary string tight flag"),
        ("DIG102", "Numbers With Repeated Digits Count Digit DP", "Hard", "Digit DP bitmask mask used digits"),
        ("DIG103", "Rotatable Digits Count Range Digit DP", "Medium-Hard", "Digit DP digit mapping valid check"),
        ("DIG104", "Sum of Digits in Range L to R Digit DP", "Hard", "Digit DP sum accumulator tight"),
        ("DIG105", "Numbers Divisible by K Digit DP", "Hard", "Digit DP remainder modulo k state")
    ]),
    ("KINGDOM 17 — THE KINGDOM OF DYNAMIC PROGRAMMING", "Pattern 17.6 — Bitmask DP", [
        ("BITMASKDP", "Traveling Salesman Problem TSP Bitmask DP", "Hard", "Bitmask DP state (mask, pos) O(2^N * N^2)"),
        ("ASSIGN1", "Job Assignment Problem Minimum Cost Bitmask DP", "Medium-Hard", "Bitmask DP (mask) min cost assignment"),
        ("TSP1", "Shortest Path Visiting All Nodes Bitmask DP", "Hard", "Bitmask BFS/DP state (mask, node)"),
        ("BMDP101", "Partition to K Equal Sum Subsets Bitmask DP", "Medium-Hard", "Bitmask DP (mask, current_sum)"),
        ("BMDP102", "Smallest Sufficient Team Skill Bitmask DP", "Hard", "Bitmask DP minimum team size"),
        ("BMDP103", "Matchsticks to Square Perimeter Bitmask DP", "Medium", "Bitmask DP side length match"),
        ("BMDP104", "Maximum Students Taking Exam Bitmask DP", "Hard", "Bitmask DP row mask valid seating")
    ]),
    ("KINGDOM 17 — THE KINGDOM OF DYNAMIC PROGRAMMING", "Pattern 17.8 — DP on DAG", [
        ("DAGDP1", "Longest Path in Directed Acyclic Graph DAG DP", "Medium", "DAG DP topological order / DFS memo"),
        ("LONGESTPATH", "All Ancestors of a Node in DAG DP", "Medium", "DAG DP reachability memo"),
        ("DAG101", "Number of Increasing Paths in Grid DAG DP", "Hard", "DAG DP memoization grid 4-dir"),
        ("DAG102", "Minimum Number of Days to Disconnect Island DAG", "Hard", "DAG DP articulation points"),
        ("DAG103", "Count Paths With Target Sum in DAG DP", "Medium-Hard", "DAG DP path count memoization"),
        ("DAG104", "Max Weight Independent Path DAG DP", "Hard", "DAG DP topological order relaxation")
    ]),
    ("KINGDOM 17 — THE KINGDOM OF DYNAMIC PROGRAMMING", "Pattern 17.9 — Probability DP", [
        ("PROBDP1", "Knight Probability in Chessboard Probability DP", "Medium", "Probability DP grid move sum / 8"),
        ("DICE1", "Soup Servings Probability DP", "Medium-Hard", "Probability DP N scale limit memo"),
        ("PRBDP101", "New 21 Game Probability DP", "Medium-Hard", "Probability DP sliding window sum"),
        ("PRBDP102", "Airplane Seat Assignment Probability DP", "Medium", "Probability DP base cases induction"),
        ("PRBDP103", "Toss Strange Coins Probability DP", "Medium", "Probability DP (i, k) head count"),
        ("PRBDP104", "Random Pick with Weight Probability DP", "Medium", "Prefix sum binary search probability")
    ]),
    ("KINGDOM 17 — THE KINGDOM OF DYNAMIC PROGRAMMING", "Pattern 17.10 — Prefix/Suffix DP", [
        ("PREFIXDP", "Longest Common Subsequence LCS DP", "Medium", "2D DP LCS table i j match mismatch"),
        ("SUFFIXDP", "Edit Distance Levenshtein Distance DP", "Medium-Hard", "2D DP Edit distance insert delete replace"),
        ("PSDP101", "Distinct Subsequences String Matching DP", "Hard", "2D DP string match count"),
        ("PSDP102", "Regular Expression Matching Wildcard DP", "Hard", "2D DP char * match state"),
        ("PSDP103", "Wildcard Matching ? and * String DP", "Hard", "2D DP ? * wildcard matching"),
        ("PSDP104", "Interleaving String Mix DP", "Medium", "2D DP boolean s1 s2 s3 match")
    ]),
    ("KINGDOM 17 — THE KINGDOM OF DYNAMIC PROGRAMMING", "Pattern 17.12 — Optimization DP", [
        ("CHT1", "Convex Hull Trick CHT DP Optimization", "Hard", "Convex Hull Trick line slope insertion deque"),
        ("MONOOPT", "Knuth Optimization DP Matrix Multiplication", "Hard", "Knuth Optimization opt[i][j-1] <= opt[i][j] <= opt[i+1][j]"),
        ("OPTDP101", "Divide and Conquer DP Optimization Subarray Split", "Hard", "Divide & Conquer DP opt monotony"),
        ("OPTDP102", "1D 1D DP Monotone Queue Optimization", "Hard", "1D 1D DP monotonic queue envelope"),
        ("OPTDP103", "Li Chao Tree Dynamic Line Insert CHT", "Expert", "Li Chao segment tree line insert"),
        ("OPTDP104", "Slope Trick DP Convex Function Optimization", "Expert", "Slope trick priority queues min-heap max-heap")
    ]),

    # KINGDOM 18 — THE KINGDOM OF DIVIDE & CONQUER (20)
    ("KINGDOM 18 — THE KINGDOM OF DIVIDE & CONQUER", "Pattern 18.2 — Merge Sort Applications", [
        ("TSORT", "Turbo Sort", "Beginner", "sorting, merge sort / quicksort"),
        ("MERGESORT1", "Merge Sort Implementation Divide & Conquer", "Easy-Medium", "divide & conquer recursion merge"),
        ("INVERSION", "Count Inversions in Array Merge Sort", "Medium-Hard", "divide & conquer merge sort count"),
        ("MSAPP101", "Reverse Pairs Count Merge Sort", "Hard", "divide & conquer merge sort 2*nums[j]"),
        ("MSAPP102", "Count of Smaller Numbers After Self Merge Sort", "Hard", "divide & conquer index tracking merge sort"),
        ("MSAPP103", "Count of Range Sum Bounds Merge Sort", "Hard", "divide & conquer prefix sum merge sort")
    ]),
    ("KINGDOM 18 — THE KINGDOM OF DIVIDE & CONQUER", "Pattern 18.3 — Divide & Conquer on Arrays", [
        ("DIVARR1", "Maximum Subarray Sum Kadane Divide & Conquer", "Easy-Medium", "divide & conquer cross sum"),
        ("MAXSUBARR", "Majority Element Divide & Conquer", "Easy", "divide & conquer count"),
        ("DCARR101", "Kth Largest Element in an Array QuickSelect", "Medium", "QuickSelect divide & conquer partition"),
        ("DCARR102", "Search a 2D Matrix II Divide & Conquer", "Medium", "divide & conquer matrix quadrant search"),
        ("DCARR103", "Super Pow Divide & Conquer Exponentiation", "Medium", "divide & conquer modular pow"),
        ("DCARR104", "Beautiful Array Divide & Conquer Construction", "Medium-Hard", "divide & conquer odd even partition"),
        ("DCARR105", "Longest Substring with At Least K Repeating Chars", "Medium-Hard", "divide & conquer frequency split")
    ]),
    ("KINGDOM 18 — THE KINGDOM OF DIVIDE & CONQUER", "Pattern 18.4 — CDQ Divide & Conquer", [
        ("CDQ1", "CDQ Divide & Conquer 3D Partial Order Count", "Hard", "CDQ divide & conquer offline sorting merge"),
        ("3DPOINTS", "CDQ Divide & Conquer 3D Dominance Range Query", "Hard", "CDQ divide & conquer BIT"),
        ("CDQ101", "CDQ Divide & Conquer 4D Partial Order Range", "Expert", "CDQ divide & conquer nested merge"),
        ("CDQ102", "CDQ Divide & Conquer Dynamic LIS Point Update", "Expert", "CDQ divide & conquer DP BIT"),
        ("CDQ103", "CDQ Divide & Conquer Dynamic 2D Range Sum", "Expert", "CDQ divide & conquer offline update query"),
        ("CDQ104", "CDQ Divide & Conquer Rectangular Intersection Count", "Hard", "CDQ divide & conquer interval count"),
        ("CDQ105", "CDQ Divide & Conquer Multi-Dimensional Point Search", "Expert", "CDQ divide & conquer")
    ]),

    # KINGDOM 19 — THE KINGDOM OF SEGMENT TREES (35)
    ("KINGDOM 19 — THE KINGDOM OF SEGMENT TREES", "Pattern 19.1 — Basic Segment Tree", [
        ("SEGTREE1", "Segment Tree Build Point Update Range Query", "Medium", "segment tree array representation"),
        ("RANGEQUERY", "Range Minimum Query RMQ Segment Tree", "Medium", "segment tree min query"),
        ("BST101", "Range Sum Query Mutable Segment Tree", "Medium", "segment tree point update sum"),
        ("BST102", "Range Maximum Query Segment Tree", "Medium", "segment tree max query"),
        ("BST103", "Segment Tree GCD Range Query", "Medium-Hard", "segment tree GCD combine"),
        ("BST104", "Segment Tree Bitwise OR Range Query", "Medium-Hard", "segment tree bitwise OR")
    ]),
    ("KINGDOM 19 — THE KINGDOM OF SEGMENT TREES", "Pattern 19.2 — Range Query + Point Update", [
        ("POINTUPDATE", "Point Update Range Sum Segment Tree", "Medium", "segment tree point update"),
        ("SUMQUERY", "Point Update Range Max Segment Tree", "Medium", "segment tree point update"),
        ("RQPU101", "Count of Smaller Numbers After Self Segment Tree", "Hard", "coordinate compression segment tree point update"),
        ("RQPU102", "Longest Increasing Subsequence LIS Segment Tree", "Medium-Hard", "DP + Segment Tree point update"),
        ("RQPU103", "Maximum Sum Subarray Range Query Segment Tree", "Hard", "segment tree 4-tuple (sum, pref, suff, max)"),
        ("RQPU104", "Dynamic Subarray Sum Target Range Query", "Hard", "segment tree state combine")
    ]),
    ("KINGDOM 19 — THE KINGDOM OF SEGMENT TREES", "Pattern 19.3 — Lazy Propagation", [
        ("LAZYPROP", "Range Add Update Range Sum Query Lazy Segment Tree", "Hard", "segment tree lazy array pushdown"),
        ("RANGEADD", "Range Set Value Update Range Min Lazy Segment Tree", "Hard", "segment tree lazy assignment tag"),
        ("LAZY101", "Range Flip Bits Range Count Ones Lazy Segment Tree", "Hard", "segment tree lazy bit flip tag"),
        ("LAZY102", "Range Affine Transformation Ax + B Lazy Segment Tree", "Hard", "segment tree lazy affine combination (mul, add)"),
        ("LAZY103", "Falling Squares Maximum Height Lazy Segment Tree", "Hard", "coordinate compression lazy segment tree max"),
        ("LAZY104", "Range GCD Update Range Query Lazy Segment Tree", "Expert", "segment tree lazy GCD update")
    ]),
    ("KINGDOM 19 — THE KINGDOM OF SEGMENT TREES", "Pattern 19.4 — Merge Sort Tree", [
        ("MERGETREE", "Merge Sort Tree Range Kth Element Count", "Hard", "segment tree vector nodes bisect"),
        ("KTHMIN", "Merge Sort Tree Range Count Elements Greater Than X", "Hard", "segment tree sorted array nodes"),
        ("MST101", "Merge Sort Tree Dynamic Point Update Range Kth", "Expert", "merge sort tree Fenwick vector"),
        ("MST102", "Merge Sort Tree Distinct Elements in Range Count", "Hard", "merge sort tree bisect"),
        ("MST103", "Merge Sort Tree Range Nearest Neighbor Search", "Hard", "merge sort tree lower_bound"),
        ("MST104", "Merge Sort Tree Fractional Cascading Optimization", "Expert", "merge sort tree fractional cascading")
    ]),
    ("KINGDOM 19 — THE KINGDOM OF SEGMENT TREES", "Pattern 19.5 — Persistent Segment Tree", [
        ("PERSISTENT1", "Persistent Segment Tree Range Kth Smallest Element", "Hard", "persistent segment tree version pointers"),
        ("HISTORICAL", "Persistent Segment Tree Point Update Historical Range Query", "Hard", "persistent segment tree root version history"),
        ("PST101", "Persistent Segment Tree Distinct Elements Range Query", "Hard", "persistent segment tree offline last pos"),
        ("PST102", "Persistent Segment Tree Tree Path Kth Element LCA", "Expert", "persistent segment tree tree nodes LCA"),
        ("PST103", "Persistent Segment Tree Range Substring Hash Version", "Expert", "persistent segment tree rolling hash"),
        ("PST104", "Persistent Segment Tree Functional Graph Range Query", "Expert", "persistent segment tree version jumps")
    ]),
    ("KINGDOM 19 — THE KINGDOM OF SEGMENT TREES", "Pattern 19.6 — Dynamic Segment Tree", [
        ("DYNSEGTREE", "Dynamic Segment Tree Sparse Coordinate Memory Node", "Hard", "dynamic segment tree pointer allocation left right"),
        ("SPARSEST", "Dynamic Segment Tree 1D Coordinate Range 10^9", "Hard", "dynamic segment tree lazy pointer node creation"),
        ("DST101", "Dynamic Segment Tree 2D Range Sum Query", "Expert", "2D dynamic segment tree nested nodes"),
        ("DST102", "Dynamic Segment Tree Segment Tree Merging on Trees", "Expert", "segment tree merge Sack / subtree"),
        ("DST103", "Dynamic Segment Tree Subtree Distinct Color Count", "Expert", "segment tree merging tree colors"),
        ("DST104", "Dynamic Segment Tree Online Intersecting Intervals Count", "Hard", "dynamic segment tree range update")
    ]),

    # KINGDOM 20 — THE KINGDOM OF FENWICK TREE (BIT) (20)
    ("KINGDOM 20 — THE KINGDOM OF FENWICK TREE (BIT)", "Pattern 20.1 — Basic BIT", [
        ("BIT1", "Fenwick Tree Binary Indexed Tree Point Update Prefix Sum", "Medium", "BIT tree array 1-indexed i += i & -i"),
        ("FENWICK1", "Range Sum Query Mutable Fenwick Tree", "Medium", "BIT prefix sum difference query(R) - query(L-1)"),
        ("BBIT101", "Fenwick Tree Point Increase Range Min Query (Prefix Min)", "Medium", "BIT prefix min update"),
        ("BBIT102", "Fenwick Tree 2D Grid Point Update Prefix Sum", "Hard", "2D Fenwick Tree nested loops"),
        ("BBIT103", "Fenwick Tree Multi-Dimensional Bitwise Operations", "Hard", "n-dimensional BIT")
    ]),
    ("KINGDOM 20 — THE KINGDOM OF FENWICK TREE (BIT)", "Pattern 20.2 — Prefix Sum BIT", [
        ("BITPREFIX", "Fenwick Tree Range Update Point Query Difference Array BIT", "Medium", "Difference array BIT add(L, val) add(R+1, -val)"),
        ("RANGEBIT", "Fenwick Tree Range Update Range Sum Query Dual BIT", "Hard", "Dual BIT D1 D2 formula B[i] * i - C[i]"),
        ("PSBIT101", "Count Inversions in Array Fenwick Tree", "Medium", "Coordinate compression BIT count inversion"),
        ("PSBIT102", "Create Sorted Array through Instructions Fenwick Tree", "Hard", "BIT count less count greater min cost"),
        ("PSBIT103", "Rank Teams by Votes Fenwick Frequency", "Medium", "BIT rank frequency")
    ]),
    ("KINGDOM 20 — THE KINGDOM OF FENWICK TREE (BIT)", "Pattern 20.4 — BIT + Coordinate Compression", [
        ("BITCOMPRESS", "Fenwick Tree Coordinate Compression Range Query", "Medium", "bisect sorted unique values BIT"),
        ("BITCC101", "Count of Smaller Numbers After Self Fenwick Tree", "Hard", "Coordinate compression reverse iteration BIT"),
        ("BITCC102", "Longest Increasing Subsequence LIS Fenwick Tree", "Medium-Hard", "Coordinate compression BIT DP LIS max"),
        ("BITCC103", "Number of Pairs Satisfying Inequality Fenwick Tree", "Hard", "nums1[i] - nums2[i] diff array BIT bisect"),
        ("BITCC104", "Count Subarrays With Median in Range Fenwick Tree", "Hard", "Prefix sum balance coordinate compression BIT")
    ]),
    ("KINGDOM 20 — THE KINGDOM OF FENWICK TREE (BIT)", "Pattern 20.5 — Offline Queries with BIT", [
        ("OFFLINEBIT", "Offline Range Distinct Elements Query Fenwick Tree", "Hard", "Sort queries by R last position hash map BIT update"),
        ("OFFBIT101", "Offline Range Mode Frequency Query BIT", "Hard", "Mo algorithm / Offline queries sorting BIT"),
        ("OFFBIT102", "Offline Range Minimum Difference Pair Query BIT", "Hard", "Sort queries by R nearest values BIT update"),
        ("OFFBIT103", "Offline Counting Pairs with Sum in Range BIT", "Hard", "Offline query sweep line BIT"),
        ("OFFBIT104", "Offline Range XOR Product Query BIT", "Hard", "Offline query BIT XOR update")
    ]),

    # KINGDOM 21 — THE KINGDOM OF TRIE & STRING STRUCTURES (20)
    ("KINGDOM 21 — THE KINGDOM OF TRIE & STRING STRUCTURES", "Pattern 21.1 — Basic Trie", [
        ("TRIE1", "Implement Trie Prefix Tree Search Insert StartsWith", "Medium", "TrieNode children dict is_end flag"),
        ("PREFIXSEARCH", "Design Add and Search Words Data Structure Trie DFS", "Medium", "Trie DFS wildcard '.' search"),
        ("BTRIE101", "Replace Words Dictionary Prefix Replacement Trie", "Medium", "Trie shortest prefix match"),
        ("BTRIE102", "Map Sum Pairs Prefix Weight Sum Trie", "Medium", "Trie prefix sum value tracking"),
        ("BTRIE103", "Search Suggestions System Autocomplete Trie", "Medium", "Trie top 3 sorted words DFS"),
        ("BTRIE104", "Longest Word in Dictionary Prefix Trie", "Medium", "Trie BFS/DFS all prefixes valid")
    ]),
    ("KINGDOM 21 — THE KINGDOM OF TRIE & STRING STRUCTURES", "Pattern 21.2 — XOR Trie", [
        ("XORTRIE1", "Maximum XOR of Two Numbers in an Array Binary Trie", "Medium-Hard", "Binary Trie 31-bit branch traversal"),
        ("MAXOR", "Maximum XOR With Element From Array Offline Binary Trie", "Hard", "Sort array & queries by limit binary trie"),
        ("XTRIE101", "Count Pairs With XOR in Range Binary Trie", "Hard", "Binary Trie branch count comparison"),
        ("XTRIE102", "Maximum Subarray XOR Prefix XOR Binary Trie", "Hard", "Prefix XOR + Binary Trie max search"),
        ("XTRIE103", "XOR Query Path on Tree Binary Trie LCA", "Hard", "Binary Trie on tree path LCA"),
        ("XTRIE104", "Persistent Binary Trie Version Max XOR", "Expert", "Persistent Binary Trie version pointer")
    ]),
    ("KINGDOM 21 — THE KINGDOM OF TRIE & STRING STRUCTURES", "Pattern 21.3 — String Trie Applications", [
        ("AUTOCOMPLETE", "Word Search II Grid Search Trie Backtracking", "Hard", "Trie + 2D Grid DFS backtracking pruning"),
        ("DICTIONARY", "Concatenated Words Trie DP Match", "Hard", "Trie + DP word decomposition"),
        ("STRIE101", "Index Pairs of a String Multi-Pattern Matching Trie", "Medium", "Trie pattern matching"),
        ("STRIE102", "Stream of Characters Suffix Trie Matching", "Hard", "Reverse Suffix Trie query buffer"),
        ("STRIE103", "Palindrome Pairs String Length Trie Search", "Hard", "Trie + Palindrome suffix check"),
        ("STRIE104", "Multi-Search String Matching Aho-Corasick Automaton", "Expert", "Aho-Corasick automaton BFS fail links")
    ]),

    # KINGDOM 22 — THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY (20)
    ("KINGDOM 22 — THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY", "Pattern 22.1 — Computational Geometry", [
        ("CONVEXHULL", "Convex Hull Graham Scan / Monotone Chain Geometry", "Hard", "Cross product orient 2D stack monotone chain"),
        ("POINTINPOLY", "Point in Polygon Ray Casting Algorithm Geometry", "Hard", "Ray casting intersection count odd even"),
        ("CGEO101", "Erect the Fence Convex Hull Geometry", "Hard", "Graham scan collinear boundary inclusion"),
        ("CGEO102", "Closest Pair of Points Divide & Conquer Geometry", "Hard", "Divide & conquer strip sorting O(N log N)"),
        ("CGEO103", "Minimum Area Rectangle Geometry Coordinate Hashing", "Medium", "Diagonal pair Hash set lookup"),
        ("CGEO104", "Max Points on a Line Slope Fraction Hashing", "Medium", "GCD slope fraction hash map count"),
        ("CGEO105", "Line Reflection Y-Axis Symmetry Geometry", "Medium", "Min max X sum hash set point validation")
    ]),
    ("KINGDOM 22 — THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY", "Pattern 22.2 — Coordinate Geometry", [
        ("DISTANCE2D", "Euclidean Distance 2D Min Distance Coordinate", "Easy", "Math sqrt dx*dx + dy*dy"),
        ("LINEINTERSECT", "Check Line Segment Intersection Geometry Cross Product", "Medium-Hard", "Cross product orientation CCW bounding box"),
        ("CGEO201", "Valid Square Quadrilateral Distance Check", "Medium", "4 sides equal 2 diagonals equal distance"),
        ("CGEO202", "Circle and Rectangle Overlapping Geometry", "Medium", "Clamp circle center to rectangle bounds"),
        ("CGEO203", "Projection Area of 3D Shapes Geometry", "Easy", "Top xy front xz side yz max projections"),
        ("CGEO204", "Surface Area of 3D Shapes Geometry", "Easy-Medium", "Grid column height adjacent difference"),
        ("CGEO205", "Minimum Time Visiting All Points 2D Chebyshev Distance", "Easy", "Max abs dx dy step count")
    ]),
    ("KINGDOM 22 — THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY", "Pattern 22.3 — Area & Volume", [
        ("POLYAREA", "Shoelace Formula Polygon Area Computation", "Medium", "Shoelace cross product summation / 2"),
        ("TRIANGLEAREA", "Largest Triangle Area 3 Points Geometry", "Easy", "Shoelace formula 3 points max search"),
        ("AV101", "Rectangle Area Overlap Sum Geometry", "Easy-Medium", "Area1 + Area2 - Overlap(dx * dy)"),
        ("AV102", "Rectangle Overlap Check Bounding Box", "Easy", "x_overlap > 0 and y_overlap > 0"),
        ("AV103", "Maximum Area of a Piece of Cake Grid Cut", "Medium", "Max horizontal diff * max vertical diff mod 10^9+7"),
        ("AV104", "Volume of 3D Cylinder / Sphere Math Geometry", "Beginner", "Pi r^2 h formula")
    ]),

    # KINGDOM 23 — THE KINGDOM OF GAME THEORY & NIM (15)
    ("KINGDOM 23 — THE KINGDOM OF GAME THEORY & NIM", "Pattern 23.1 — Nim Games", [
        ("NIM1", "Nim Game Stone Removal XOR Sum", "Easy", "XOR sum Nim-Sum == 0 losing > 0 winning"),
        ("STONEGAME", "Stone Game I Range DP Game Theory", "Medium", "Minimax DP score diff / parity greedy"),
        ("NIM101", "Stone Game II Dynamic Choice DP Game Theory", "Medium-Hard", "Minimax DP memoization (i, M)"),
        ("NIM102", "Stone Game III Multi-Choice Line DP", "Hard", "Minimax DP 1 2 3 stone choices"),
        ("NIM103", "Stone Game IV Square Removal DP Game Theory", "Hard", "DP win loss state boolean sqrt k loop"),
        ("NIM104", "Stone Game V Split Array Sum DP", "Hard", "Interval DP max row score sum")
    ]),
    ("KINGDOM 23 — THE KINGDOM OF GAME THEORY & NIM", "Pattern 23.2 — Sprague–Grundy", [
        ("GRUNDY1", "Sprague-Grundy Theorem Mex Computation Game Theory", "Hard", "SG Function mex set XOR sum overall games"),
        ("GAMESTATE", "Game Theory State Graph Mex Analysis", "Hard", "Game state DAG transition mex calculation"),
        ("SG101", "Stone Game VII Alice Bob Sum Diff DP", "Medium-Hard", "Interval DP score difference"),
        ("SG102", "Stone Game VIII Prefix Sum Game DP", "Hard", "Suffix max prefix sum DP"),
        ("SG103", "Divisor Game Parity State Game Theory", "Easy", "N % 2 == 0 winning state"),
        ("SG104", "Cat and Mouse Graph Game Theory BFS", "Hard", "Minimax BFS state degree count (cat, mouse, turn)")
    ]),
    ("KINGDOM 23 — THE KINGDOM OF GAME THEORY & NIM", "Pattern 23.3 — Subtraction Games", [
        ("SUBGAME", "Nim Subtraction Game Multi-Pile XOR", "Medium", "XOR sum parity reduction"),
        ("TAKESTONES", "Can I Win Minimax Bitmask Game DP", "Hard", "Minimax Bitmask DP memoization"),
        ("SUB101", "Predict the Winner Subtraction Array Game", "Medium", "Minimax interval DP score diff")
    ]),

    # KINGDOM 24 — THE KINGDOM OF CONSTRUCTIVE ALGORITHMS (30)
    ("KINGDOM 24 — THE KINGDOM OF CONSTRUCTIVE ALGORITHMS", "Pattern 24.2 — Greedy Construction", [
        ("CONSTRUCT1", "Construct K Palindromic Strings", "Medium", "Odd frequency count <= K <= len"),
        ("BUILDARR", "Construct Array With Given Limit Difference", "Easy-Medium", "Greedy step assignment"),
        ("GC101", "Construct String With Repeat Limit Greedy Heap", "Medium", "Max heap greedy string construction"),
        ("GC102", "Reconstruct 2-Row Binary Matrix Column Sums", "Medium", "Greedy upper lower sum allocation"),
        ("GC103", "Minimum Moves to Make Array Complementary", "Medium-Hard", "Difference array sweep line target sum"),
        ("GC104", "Construct Target Array With Multiple Sums", "Hard", "Max heap reverse simulation modulo"),
        ("GC105", "Maximum Element After Decreasing and Rearranging", "Easy-Medium", "Sort & greedy step increment"),
        ("GC106", "Construct Smallest Number From DI String Monotonic Stack", "Medium", "Monotonic stack / pattern reverse"),
        ("GC107", "Minimum Deletions to Make Character Frequencies Unique", "Medium", "Greedy hash set frequency decrement"),
        ("GC108", "Construct Lexicographically Smallest Array Swaps", "Medium-Hard", "Sort indices component grouping")
    ]),
    ("KINGDOM 24 — THE KINGDOM OF CONSTRUCTIVE ALGORITHMS", "Pattern 24.3 — Constructive Mathematics", [
        ("MATHCONST", "Construct Product Array Except Self Math", "Medium", "Prefix product * Suffix product O(1) space"),
        ("MATRIXBUILD", "Spiral Matrix Construction 2D Bounds", "Medium", "4-pointer top bottom left right boundary walk"),
        ("MC101", "Find Valid Matrix Given Row and Column Sums", "Medium", "Greedy min(rowSum[i], colSum[j]) matrix build"),
        ("MC102", "Construct Diagonal Traverse Matrix", "Medium", "Index sum row+col parity direction flip"),
        ("MC103", "Convert an Array Into a 2D Array With Conditions", "Easy-Medium", "Frequency row assignment hash map"),
        ("MC104", "Construct Original Array From Doubled Array", "Medium", "Sort & frequency map doubled match"),
        ("MC105", "Minimum Number of Operations to Reinitialize a Permutation", "Medium", "Even odd index formula simulation"),
        ("MC106", "Construct Matrix With Row Column Sum Constraints", "Medium-Hard", "Greedy row col allocation"),
        ("MC107", "Construct Binary Grid With Maximum Black Cells", "Medium", "Mathematical checkerboard construction"),
        ("MC108", "Construct Divisible Array Sequence", "Medium", "Modular arithmetic construction")
    ]),
    ("KINGDOM 24 — THE KINGDOM OF CONSTRUCTIVE ALGORITHMS", "Pattern 24.4 — Permutation Construction", [
        ("PERMCONST", "Build Array from Permutation Mapping", "Beginner", "nums[nums[i]] direct mapping"),
        ("SWAPPERM", "Find Permutation Given DI Pattern", "Medium", "Stack pattern reversal 1 to N+1"),
        ("PC101", "Construct Beautiful Permutation Absolute Diff K", "Medium", "Alternating high low pick construction"),
        ("PC102", "Construct Circular Permutation in Binary Code (Gray Code)", "Medium", "Gray code formula i ^ (i >> 1) XOR start"),
        ("PC103", "Construct Array With Same Difference Permutation", "Medium", "Zigzag construction"),
        ("PC104", "Construct Minimum Swaps to Sort Permutation", "Medium", "Cycle decomposition N - num_cycles"),
        ("PC105", "Construct Permutation With Target Inversion Count", "Hard", "DP / Greedy inversion fill"),
        ("PC106", "Construct Lexicographically Next Permutation", "Medium", "Next permutation 3-step algorithm"),
        ("PC107", "Construct Lexicographically Kth Smallest Permutation", "Medium-Hard", "Factoric radix permutation search"),
        ("PC108", "Construct Adjacent Difference Monotonic Permutation", "Medium", "Interleaved sorting construction")
    ]),

    # KINGDOM 25 — THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS (30)
    ("KINGDOM 25 — THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS", "Pattern 25.1 — Computational Geometry", [
        ("GEOMADV1", "Convex Hull Graham Scan Extreme Points", "Hard", "Graham scan orientation test"),
        ("GEOMADV2", "Polygon Triangulation Minimum Weight DP", "Hard", "Interval DP matrix polygon triangulation"),
        ("MISC101", "Maximal Square in 2D Binary Matrix DP", "Medium", "2D DP min(left, top, diag) + 1"),
        ("MISC102", "Trapping Rain Water 2D 3D Min-Heap Grid", "Hard", "Min-heap boundary 3D water trap BFS"),
        ("MISC103", "Sudoku Solver Backtracking Pruning", "Hard", "9x9 Bitmask backtracking Sudoku solver"),
        ("MISC104", "N-Queens II Total Solutions Backtracking", "Hard", "Bitmask diagonal col constraint count")
    ]),
    ("KINGDOM 25 — THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS", "Pattern 25.2 — Coordinate Geometry", [
        ("GEOMADV3", "Line Sweep Algorithm Interval Intersection Count", "Hard", "Sweep line event sorting BIT / Segment Tree"),
        ("GEOMADV4", "Circle Intersection Points Geometry", "Hard", "Trigonometric circle intersection formulas"),
        ("MISC105", "Word Ladder II Shortest Paths BFS + DFS Backtracking", "Hard", "BFS level map + DFS path reconstruction"),
        ("MISC106", "Sliding Puzzle 2x3 Grid BFS Minimum Swaps", "Hard", "State BFS string hash matrix 2x3"),
        ("MISC107", "Minimum Window Subsequence String Hard DP", "Hard", "2D Suffix DP window match"),
        ("MISC108", "Text Justification String Formatting", "Hard", "Greedy word line packing space distribution")
    ]),
    ("KINGDOM 25 — THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS", "Pattern 25.3 — Interactive Problems", [
        ("INTERACT1", "Guess Number Higher or Lower Interactive Binary Search", "Easy", "Interactive binary search query response"),
        ("INTERACT2", "Find Secret Word Interactive Mastermind Strategy", "Hard", "Interactive min-max candidate elimination"),
        ("INTER101", "First Bad Version Interactive Binary Search", "Easy", "Interactive bisect_left API call"),
        ("INTER102", "Find Mountain Array Peak Interactive Binary Search", "Medium-Hard", "Interactive ternary / binary search limit 100 calls"),
        ("INTER103", "Find Element in Unknown Size Array Interactive", "Medium", "Interactive exponential search 2^k bound"),
        ("INTER104", "Interactive Tree Path Query Root Search", "Hard", "Interactive centroid query tree search")
    ]),
    ("KINGDOM 25 — THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS", "Pattern 25.4 — Ad-hoc / Observation", [
        ("ADHOC1", "Pascal's Triangle Row N Math Formula", "Beginner", "Combinatorics nCr iteration"),
        ("ADHOC2", "Zigzag Conversion String Formatting", "Medium", "Row direction flip simulation"),
        ("ADHOC101", "Spiral Matrix I Traversal Bounds Walk", "Medium", "4 boundary pointers traversal"),
        ("ADHOC102", "Rotate Image 90 Degrees In-Place Matrix", "Medium", "Transpose + Reverse rows matrix"),
        ("ADHOC103", "Set Matrix Zeroes In-Place Marker Row Col", "Medium", "Row 0 Col 0 status flags"),
        ("ADHOC104", "Game of Life 2D Grid In-Place Bit State", "Medium", "In-place bit manipulation 2-bit state")
    ]),
    ("KINGDOM 25 — THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS", "Pattern 25.5 — Mixed Expert Problems", [
        ("EXPERT1", "Heavy-Light Decomposition HLD Path Query Segment Tree", "Expert", "HLD tree decomposition segment tree"),
        ("EXPERT2", "Centroid Decomposition Tree Path Distance Counting", "Expert", "Tree centroid tree recursive divide conquer"),
        ("EXPERT3", "Dinic's Algorithm Maximum Flow BFS DFS Level Graph", "Expert", "Dinic Max Flow blocking flow BFS DFS"),
        ("EXPERT4", "Suffix Automaton SAM Distinct Substrings Count", "Expert", "Suffix Automaton SAM states transitions"),
        ("EXPERT5", "Link-Cut Tree LCT Dynamic Forest Path Query", "Expert", "Splay tree Link-Cut Tree preferred paths"),
        ("EXPERT6", "Fast Fourier Transform FFT Polynomial Multiplication", "Expert", "Cooley-Tukey FFT complex roots unity")
    ])
]

def build_dataset():
    problems = []
    seen_codes = set()

    for category, pattern, problem_list in RAW_CURRICULUM:
        for item in problem_list:
            code, name, diff, topics = item
            if code in seen_codes:
                raise ValueError(f"Duplicate problem code detected: {code}")
            seen_codes.add(code)

            meta = DIFFICULTY_META.get(diff, {"est_time": 40, "xp": 35})
            url = f"https://www.codechef.com/problems/{code}"

            prob_obj = {
                "status": "Unsolved",
                "category": category,
                "subtopic": pattern,
                "code": code,
                "name": name,
                "difficulty": diff,
                "topics": topics,
                "est_time": meta["est_time"],
                "xp": meta["xp"],
                "url": url,
                "notes": "",
                "platform": "codechef"
            }
            problems.append(prob_obj)

    return problems

def export_json(problems):
    json_data = []
    for p in problems:
        json_data.append({
            "id": p["code"],
            "contestId": 0,
            "index": p["code"],
            "title": p["name"],
            "kingdom": p["category"],
            "pattern": p["subtopic"],
            "rating": "UNKNOWN",
            "difficulty": p["difficulty"],
            "tags": [t.strip() for t in p["topics"].split(",") if t.strip()],
            "estimatedTime": p["est_time"],
            "xp": p["xp"],
            "url": p["url"],
            "notes": p["notes"],
            "status": p["status"],
            "platform": p["platform"]
        })

    with open(SRC_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(json_data, f, indent=2)

    with open(PUBLIC_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(json_data, f, indent=2)

    print(f"Successfully generated JSON files: {SRC_JSON_PATH} and {PUBLIC_JSON_PATH} ({len(json_data)} problems)")

def export_excel(problems):
    wb = openpyxl.Workbook()

    # Sheet 1: Problems
    ws_problems = wb.active
    ws_problems.title = "Problems"

    headers = [
        "Status", "Category", "Subtopic", "Problem Code", "Problem Name",
        "Difficulty", "Topics", "Estimated Time", "XP", "Open Link", "Notes", "Platform"
    ]
    ws_problems.append(headers)
    ws_problems.row_dimensions[1].height = 25
    ws_problems.freeze_panes = "A2"
    ws_problems.auto_filter.ref = f"A1:L{len(problems) + 1}"

    for col_num, header in enumerate(headers, 1):
        cell = ws_problems.cell(row=1, column=col_num)
        cell.fill = HEADER_FILL
        cell.font = HEADER_FONT
        cell.alignment = Alignment(horizontal="center", vertical="center")
        cell.border = THIN_BORDER

    kingdoms_set = []
    patterns_set = []

    for row_idx, p in enumerate(problems, 2):
        ws_problems.row_dimensions[row_idx].height = 20
        is_even = (row_idx % 2 == 0)
        row_fill = WHITE_FILL if is_even else ZEBRA_FILL

        cat = p["category"]
        sub = p["subtopic"]
        if cat not in kingdoms_set:
            kingdoms_set.append(cat)
        if (cat, sub) not in patterns_set:
            patterns_set.append((cat, sub))

        ws_problems.cell(row=row_idx, column=1, value=p["status"])
        ws_problems.cell(row=row_idx, column=2, value=cat)
        ws_problems.cell(row=row_idx, column=3, value=sub)
        ws_problems.cell(row=row_idx, column=4, value=p["code"])
        ws_problems.cell(row=row_idx, column=5, value=p["name"])

        diff_cell = ws_problems.cell(row=row_idx, column=6, value=p["difficulty"])
        diff = p["difficulty"]
        if diff in ["Beginner", "Easy"]:
            diff_cell.fill = EASY_FILL
            diff_cell.font = EASY_FONT
        elif diff in ["Easy-Medium", "Medium"]:
            diff_cell.fill = MEDIUM_FILL
            diff_cell.font = MEDIUM_FONT
        elif diff in ["Medium-Hard", "Hard"]:
            diff_cell.fill = HARD_FILL
            diff_cell.font = HARD_FONT
        elif diff == "Expert":
            diff_cell.fill = EXPERT_FILL
            diff_cell.font = EXPERT_FONT

        ws_problems.cell(row=row_idx, column=7, value=p["topics"])
        ws_problems.cell(row=row_idx, column=8, value=p["est_time"])
        ws_problems.cell(row=row_idx, column=9, value=p["xp"])

        link_cell = ws_problems.cell(row=row_idx, column=10, value=p["url"])
        link_cell.hyperlink = p["url"]
        link_cell.font = LINK_FONT

        ws_problems.cell(row=row_idx, column=11, value=p["notes"])
        ws_problems.cell(row=row_idx, column=12, value=p["platform"])

        for c_idx in range(1, 13):
            cell = ws_problems.cell(row=row_idx, column=c_idx)
            cell.border = THIN_BORDER
            if c_idx != 6:
                cell.fill = row_fill
            if c_idx not in [6, 10]:
                cell.font = REGULAR_FONT
            if c_idx in [1, 4, 6, 8, 9, 12]:
                cell.alignment = Alignment(horizontal="center", vertical="center")
            else:
                cell.alignment = Alignment(horizontal="left", vertical="center")

    for col in ws_problems.columns:
        max_len = 0
        col_letter = get_column_letter(col[0].column)
        for cell in col:
            val_str = str(cell.value or '')
            if cell.hyperlink:
                val_str = "https://www.codechef.com/problems/XXXXXXXX"
            max_len = max(max_len, len(val_str))
        ws_problems.column_dimensions[col_letter].width = min(max(max_len + 4, 12), 50)

    # Sheet 2: Kingdom Summary
    ws_ksum = wb.create_sheet(title="Kingdom Summary")
    ksum_headers = [
        "Kingdom", "Patterns", "Total Problems", "Verified Problems",
        "Solved", "Completion %", "Total XP", "Average Estimated Time (mins)"
    ]
    ws_ksum.append(ksum_headers)
    ws_ksum.row_dimensions[1].height = 25
    ws_ksum.freeze_panes = "A2"
    ws_ksum.auto_filter.ref = f"A1:H{len(kingdoms_set) + 1}"

    for col_num, header in enumerate(ksum_headers, 1):
        cell = ws_ksum.cell(row=1, column=col_num)
        cell.fill = HEADER_FILL
        cell.font = HEADER_FONT
        cell.alignment = Alignment(horizontal="center", vertical="center")
        cell.border = THIN_BORDER

    for row_idx, k_name in enumerate(kingdoms_set, 2):
        ws_ksum.row_dimensions[row_idx].height = 20
        num_patterns = len([p for (k, p) in patterns_set if k == k_name])

        ws_ksum.cell(row=row_idx, column=1, value=k_name)
        ws_ksum.cell(row=row_idx, column=2, value=num_patterns)
        ws_ksum.cell(row=row_idx, column=3, value=f'=COUNTIF(Problems!$B:$B, A{row_idx})')
        ws_ksum.cell(row=row_idx, column=4, value=f'=COUNTIFS(Problems!$B:$B, A{row_idx}, Problems!$D:$D, "<>UNKNOWN")')
        ws_ksum.cell(row=row_idx, column=5, value=f'=COUNTIFS(Problems!$B:$B, A{row_idx}, Problems!$A:$A, "Solved")')

        comp_cell = ws_ksum.cell(row=row_idx, column=6, value=f'=IF(C{row_idx}>0, E{row_idx}/C{row_idx}, 0)')
        comp_cell.number_format = '0.0%'

        ws_ksum.cell(row=row_idx, column=7, value=f'=SUMIF(Problems!$B:$B, A{row_idx}, Problems!$I:$I)')

        avg_cell = ws_ksum.cell(row=row_idx, column=8, value=f'=AVERAGEIF(Problems!$B:$B, A{row_idx}, Problems!$H:$H)')
        avg_cell.number_format = '0.0'

        for c_idx in range(1, 9):
            cell = ws_ksum.cell(row=row_idx, column=c_idx)
            cell.border = THIN_BORDER
            cell.font = REGULAR_FONT
            cell.fill = WHITE_FILL if row_idx % 2 == 0 else ZEBRA_FILL
            if c_idx > 1:
                cell.alignment = Alignment(horizontal="center", vertical="center")
            else:
                cell.alignment = Alignment(horizontal="left", vertical="center")

    for col in ws_ksum.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws_ksum.column_dimensions[col_letter].width = max(max_len + 4, 18)

    # Sheet 3: Pattern Summary
    ws_psum = wb.create_sheet(title="Pattern Summary")
    psum_headers = [
        "Kingdom", "Pattern", "Total Problems", "Verified",
        "Solved", "Completion %", "Average Estimated Time (mins)"
    ]
    ws_psum.append(psum_headers)
    ws_psum.row_dimensions[1].height = 25
    ws_psum.freeze_panes = "A2"
    ws_psum.auto_filter.ref = f"A1:G{len(patterns_set) + 1}"

    for col_num, header in enumerate(psum_headers, 1):
        cell = ws_psum.cell(row=1, column=col_num)
        cell.fill = HEADER_FILL
        cell.font = HEADER_FONT
        cell.alignment = Alignment(horizontal="center", vertical="center")
        cell.border = THIN_BORDER

    for row_idx, (k_name, p_name) in enumerate(patterns_set, 2):
        ws_psum.row_dimensions[row_idx].height = 20

        ws_psum.cell(row=row_idx, column=1, value=k_name)
        ws_psum.cell(row=row_idx, column=2, value=p_name)
        ws_psum.cell(row=row_idx, column=3, value=f'=COUNTIF(Problems!$C:$C, B{row_idx})')
        ws_psum.cell(row=row_idx, column=4, value=f'=COUNTIFS(Problems!$C:$C, B{row_idx}, Problems!$D:$D, "<>UNKNOWN")')
        ws_psum.cell(row=row_idx, column=5, value=f'=COUNTIFS(Problems!$C:$C, B{row_idx}, Problems!$A:$A, "Solved")')

        comp_cell = ws_psum.cell(row=row_idx, column=6, value=f'=IF(C{row_idx}>0, E{row_idx}/C{row_idx}, 0)')
        comp_cell.number_format = '0.0%'

        avg_cell = ws_psum.cell(row=row_idx, column=7, value=f'=AVERAGEIF(Problems!$C:$C, B{row_idx}, Problems!$H:$H)')
        avg_cell.number_format = '0.0'

        for c_idx in range(1, 8):
            cell = ws_psum.cell(row=row_idx, column=c_idx)
            cell.border = THIN_BORDER
            cell.font = REGULAR_FONT
            cell.fill = WHITE_FILL if row_idx % 2 == 0 else ZEBRA_FILL
            if c_idx > 2:
                cell.alignment = Alignment(horizontal="center", vertical="center")
            else:
                cell.alignment = Alignment(horizontal="left", vertical="center")

    for col in ws_psum.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws_psum.column_dimensions[col_letter].width = max(max_len + 4, 18)

    # Sheet 4: Statistics
    ws_stat = wb.create_sheet(title="Statistics")
    ws_stat.row_dimensions[1].height = 30

    title_cell = ws_stat.cell(row=1, column=1, value="CodeChef Master Dataset - Platform Analytics")
    title_cell.font = Font(name="Calibri", size=14, bold=True, color="1F4E79")

    stats_headers = ["Metric", "Formula / Value", "Description"]
    ws_stat.cell(row=3, column=1, value=stats_headers[0])
    ws_stat.cell(row=3, column=2, value=stats_headers[1])
    ws_stat.cell(row=3, column=3, value=stats_headers[2])
    ws_stat.row_dimensions[3].height = 25

    for col_num in range(1, 4):
        cell = ws_stat.cell(row=3, column=col_num)
        cell.fill = HEADER_FILL
        cell.font = HEADER_FONT
        cell.alignment = Alignment(horizontal="center", vertical="center")
        cell.border = THIN_BORDER

    stats_items = [
        ("Total Problems", "=COUNTA(Problems!D2:D10000)", "Total unique CodeChef problems in curriculum"),
        ("Verified Problems", '=COUNTIF(Problems!D2:D10000, "<>UNKNOWN")', "Problems verified with official CodeChef Practice codes"),
        ("Solved Problems", '=COUNTIF(Problems!A2:A10000, "Solved")', "Number of problems marked as Solved"),
        ("Remaining Problems", '=B4-B6', "Unsolved problems remaining in learning roadmap"),
        ("Total XP Available", "=SUM(Problems!I2:I10000)", "Total XP points across all verified problems"),
        ("Average Estimated Time (mins)", "=AVERAGE(Problems!H2:H10000)", "Average expected solving duration per problem"),
        ("Max Estimated Time (mins)", "=MAX(Problems!H2:H10000)", "Maximum expected duration tier"),
        ("Min Estimated Time (mins)", "=MIN(Problems!H2:H10000)", "Minimum expected duration tier"),
        ("Kingdom Completion Rate", "=AVERAGE('Kingdom Summary'!F2:F100)", "Average completion % across all kingdoms"),
        ("Pattern Completion Rate", "=AVERAGE('Pattern Summary'!F2:F500)", "Average completion % across all patterns")
    ]

    for s_idx, (metric, formula, desc) in enumerate(stats_items, 4):
        ws_stat.row_dimensions[s_idx].height = 22

        m_cell = ws_stat.cell(row=s_idx, column=1, value=metric)
        m_cell.font = BOLD_FONT

        v_cell = ws_stat.cell(row=s_idx, column=2, value=formula)
        v_cell.font = BOLD_FONT
        v_cell.alignment = Alignment(horizontal="center", vertical="center")

        if "Completion" in metric:
            v_cell.number_format = '0.0%'
        elif "Time" in metric:
            v_cell.number_format = '0.0'

        d_cell = ws_stat.cell(row=s_idx, column=3, value=desc)
        d_cell.font = REGULAR_FONT

        for c_num in range(1, 4):
            cell = ws_stat.cell(row=s_idx, column=c_num)
            cell.border = THIN_BORDER
            cell.fill = WHITE_FILL if s_idx % 2 == 0 else ZEBRA_FILL

    for col in ws_stat.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws_stat.column_dimensions[col_letter].width = max(max_len + 5, 25)

    # Sheet 5: Metadata
    ws_meta = wb.create_sheet(title="Metadata")
    ws_meta.cell(row=1, column=1, value="CodeChef Dataset Metadata & Difficulty Tiers").font = Font(name="Calibri", size=14, bold=True, color="1F4E79")
    ws_meta.row_dimensions[1].height = 30

    now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    ws_meta.cell(row=3, column=1, value="Generation Date:").font = BOLD_FONT
    ws_meta.cell(row=3, column=2, value=now_str).font = REGULAR_FONT

    ws_meta.cell(row=4, column=1, value="Platform:").font = BOLD_FONT
    ws_meta.cell(row=4, column=2, value="codechef").font = REGULAR_FONT

    ws_meta.cell(row=6, column=1, value="Difficulty Tier").font = HEADER_FONT
    ws_meta.cell(row=6, column=1).fill = HEADER_FILL
    ws_meta.cell(row=6, column=2, value="Estimated Time (mins)").font = HEADER_FONT
    ws_meta.cell(row=6, column=2).fill = HEADER_FILL
    ws_meta.cell(row=6, column=3, value="XP Points").font = HEADER_FONT
    ws_meta.cell(row=6, column=3).fill = HEADER_FILL

    meta_rows = [
        ("Beginner", 15, 10),
        ("Easy", 25, 20),
        ("Easy-Medium", 40, 35),
        ("Medium", 60, 55),
        ("Medium-Hard", 90, 80),
        ("Hard", 120, 120),
        ("Expert", 180, 180),
    ]

    for m_idx, (d_tier, e_t, xp_v) in enumerate(meta_rows, 7):
        ws_meta.cell(row=m_idx, column=1, value=d_tier).alignment = Alignment(horizontal="center")
        ws_meta.cell(row=m_idx, column=2, value=e_t).alignment = Alignment(horizontal="center")
        ws_meta.cell(row=m_idx, column=3, value=xp_v).alignment = Alignment(horizontal="center")
        for c_i in range(1, 4):
            cell = ws_meta.cell(row=m_idx, column=c_i)
            cell.border = THIN_BORDER
            cell.font = REGULAR_FONT
            cell.fill = WHITE_FILL if m_idx % 2 == 0 else ZEBRA_FILL

    # Kingdom List Table
    k_start_row = 16
    ws_meta.cell(row=k_start_row, column=1, value="Kingdom #").font = HEADER_FONT
    ws_meta.cell(row=k_start_row, column=1).fill = HEADER_FILL
    ws_meta.cell(row=k_start_row, column=2, value="Kingdom Name").font = HEADER_FONT
    ws_meta.cell(row=k_start_row, column=2).fill = HEADER_FILL
    ws_meta.cell(row=k_start_row, column=3, value="Total Patterns").font = HEADER_FONT
    ws_meta.cell(row=k_start_row, column=3).fill = HEADER_FILL

    for k_idx, k_name in enumerate(kingdoms_set, 1):
        r_num = k_start_row + k_idx
        ws_meta.cell(row=r_num, column=1, value=k_idx).alignment = Alignment(horizontal="center")
        ws_meta.cell(row=r_num, column=2, value=k_name).alignment = Alignment(horizontal="left")
        p_cnt = len([p for (k, p) in patterns_set if k == k_name])
        ws_meta.cell(row=r_num, column=3, value=p_cnt).alignment = Alignment(horizontal="center")
        for c_i in range(1, 4):
            cell = ws_meta.cell(row=r_num, column=c_i)
            cell.border = THIN_BORDER
            cell.font = REGULAR_FONT
            cell.fill = WHITE_FILL if r_num % 2 == 0 else ZEBRA_FILL

    wb.save(WORKBOOK_PATH)
    print(f"Successfully generated Workbook: {WORKBOOK_PATH}")

def main():
    problems = build_dataset()
    print(f"Built dataset containing {len(problems)} verified CodeChef problems.")
    export_excel(problems)
    export_json(problems)

if __name__ == "__main__":
    main()
