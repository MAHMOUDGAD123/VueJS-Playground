type RequireOnly<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;

type Prettify<T> = {
  [k in keyof T]: T[k];
} & {};

/**
 * Ignore empty string from a union type
 *
 * @example
 *
 * ```ts
 * '' | 'a' | 'b'  =>  'a' | 'b'
 * ```
 */
type NonEmpty<T extends string> = T extends '' ? never : T;

/** Flattens tuples/arrays into their union, passes through strings as-is */
type Flatten<T> = T extends readonly (infer U)[] ? U : T;

// Ranges
// ---------------------------------------------------------------------------
/** Build an array of length N */
type BuildTuple<L extends number, T extends unknown[] = []> = T['length'] extends L
  ? T
  : BuildTuple<L, [...T, unknown]>;

/** Create numbers from 0 up to N */
type RangeUpTo<N extends number, T extends unknown[] = []> = T['length'] extends N
  ? T['length'] | RangeUpTo<N, [...T, unknown]>
  : never;

/** Build union of all numbers from 0..N */
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number] | N // include N
  : Enumerate<N, [...Acc, Acc['length']]>;

/** Range<From, To> = Numbers between From and To inclusive */
type RangeFromTo<From extends number, To extends number> =
  | Exclude<Enumerate<To>, Enumerate<From>>
  | From;
// ---------------------------------------------------------------------------

// Convert tuple to union
// ---------------------------------------------------------------------------
/**
 * Join a tuple of string segments into paths,
 * producing all suffix-unions (like progressively dropping the first element).
 *
 * @example
 *
 * ```ts
 * convert tuple to union
 * ['a', 'b', 'c', 'd']  =>  "a/b/c/d" | "b/c/d" | "c/d" | "d"
 * ```
 */
type JoinPaths<T extends string[]> = T extends [
  infer Head extends string,
  ...infer Tail extends string[],
]
  ? `${Head}${Tail extends [] ? '' : `/${Join<Tail>}`}` | JoinPaths<Tail>
  : never;

/** Helper to fully join a tuple into one string. */
type Join<T extends string[]> = T extends [
  infer Head extends string,
  ...infer Tail extends string[],
]
  ? `${Head}${Tail extends [] ? '' : `/${Join<Tail>}`}`
  : '';

/**
 * Filter out any union members that do NOT contain a "/"
 *
 * ```ts
 * "a/b/c/d" | "b/c/d" | "c/d" | "d"  =>  "a/b/c/d" | "b/c/d" | "c/d"
 * ```
 */
type OnlyWithSlash<U extends string> = U extends `${string}/${string}` ? U : never;
// ---------------------------------------------------------------------------
