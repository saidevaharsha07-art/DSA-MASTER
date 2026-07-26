import { ProblemModel } from '../../types';
import { BASIC_ARRAYS_PROBLEMS } from './basic-arrays';
import { PREFIX_SUM_PROBLEMS } from './prefix-sum';
import { TWO_POINTERS_PROBLEMS } from './two-pointers';
import { SLIDING_WINDOW_PROBLEMS } from './sliding-window';
import { HASHING_PROBLEMS } from './hashing';
import { BINARY_SEARCH_PROBLEMS } from './binary-search';
import { SORTING_PROBLEMS } from './sorting';
import { STACK_PROBLEMS } from './stack';
import { QUEUE_DEQUE_PROBLEMS } from './queue-deque';
import { INTERVALS_PROBLEMS } from './intervals';
import { LINKED_LIST_PROBLEMS } from './linked-list';
import { BINARY_TREES_PROBLEMS } from './binary-trees';
import { BINARY_SEARCH_TREES_PROBLEMS } from './binary-search-trees';
import { GRAPHS_PROBLEMS } from './graphs';
import { SHORTEST_PATH_PROBLEMS } from './shortest-path';
import { MINIMUM_SPANNING_TREE_PROBLEMS } from './minimum-spanning-tree';
import { BACKTRACKING_PROBLEMS } from './backtracking';
import { GREEDY_PROBLEMS } from './greedy';
import { HEAP_PROBLEMS } from './heap';
import { DYNAMIC_PROGRAMMING_PROBLEMS } from './dynamic-programming';
import { BIT_MANIPULATION_PROBLEMS } from './bit-manipulation';
import { STRINGS_PROBLEMS } from './strings';
import { MATRIX_PROBLEMS } from './matrix';
import { MATH_NUMBER_THEORY_PROBLEMS } from './math-number-theory';
import { ADVANCED_ALGORITHMS_PROBLEMS } from './advanced-algorithms';

export const ALL_PROBLEMS: ProblemModel[] = [
  ...BASIC_ARRAYS_PROBLEMS,
  ...PREFIX_SUM_PROBLEMS,
  ...TWO_POINTERS_PROBLEMS,
  ...SLIDING_WINDOW_PROBLEMS,
  ...HASHING_PROBLEMS,
  ...BINARY_SEARCH_PROBLEMS,
  ...SORTING_PROBLEMS,
  ...STACK_PROBLEMS,
  ...QUEUE_DEQUE_PROBLEMS,
  ...INTERVALS_PROBLEMS,
  ...LINKED_LIST_PROBLEMS,
  ...BINARY_TREES_PROBLEMS,
  ...BINARY_SEARCH_TREES_PROBLEMS,
  ...GRAPHS_PROBLEMS,
  ...SHORTEST_PATH_PROBLEMS,
  ...MINIMUM_SPANNING_TREE_PROBLEMS,
  ...BACKTRACKING_PROBLEMS,
  ...GREEDY_PROBLEMS,
  ...HEAP_PROBLEMS,
  ...DYNAMIC_PROGRAMMING_PROBLEMS,
  ...BIT_MANIPULATION_PROBLEMS,
  ...STRINGS_PROBLEMS,
  ...MATRIX_PROBLEMS,
  ...MATH_NUMBER_THEORY_PROBLEMS,
  ...ADVANCED_ALGORITHMS_PROBLEMS,
].map((p, index) => ({
  ...p,
  order: p.order ?? index + 1,
}));
