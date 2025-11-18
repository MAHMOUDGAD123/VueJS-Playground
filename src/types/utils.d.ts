/* eslint-disable */

type RequireOnly<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;

type Prettify<T> = {
  [k in keyof T]: T[k];
} & {};

type StringWithLiterals<T> = T | (string & {});

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

// Helper to match path to route name
type PathArrayToString<T extends string[] | string> = T extends string
  ? T
  : T extends string[]
    ? JoinPaths<T>
    : never;
// ---------------------------------------------------------------------------

// A utility type to exclude non-object types (arrays are treated as primitives here for simplicity,
// as flattening array elements into top-level object properties usually isn't the goal)
type Primitive = string | number | boolean | symbol | undefined | null;

type DeepFlatten<T> = {
  [K in keyof T]: T[K] extends Primitive
    ? { [P in K]: T[K] } // If primitive, keep as is (but in an object for intersection later)
    : T[K] extends Function // Exclude functions
      ? { [P in K]: T[K] }
      : DeepFlattenWithPrefix<T[K], K & string>; // Recurse for objects
}[keyof T] extends infer U
  ? (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never
  : never;

// Helper type to prepend the parent key to nested keys
type DeepFlattenWithPrefix<T, P extends string> = {
  [K in keyof T]: T[K] extends Primitive
    ? { [SK in `${P}/${K & string}`]: T[K] }
    : T[K] extends Function
      ? { [SK in `${P}/${K & string}`]: T[K] }
      : DeepFlattenWithPrefix<T[K], `${K & string}`>;
  // : DeepFlattenWithPrefix<T[K], `${P}/${K & string}`>;
}[keyof T] extends infer U
  ? (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never
  : never;

/**
 * Flattens an object type into a single intersection type containing
 * all nested properties with their original keys.
 * Warning: This can cause key collisions where nested properties override top-level ones.
 */
type UnstructuredFlatten<T> = T extends Primitive
  ? T
  : T extends Function
    ? T
    : {
          // Intersection of all current keys T and recursively flattened nested object types
          [K in keyof T]: T[K] extends Primitive | Function
            ? Pick<T, K> // Keep primitive keys as single object type
            : UnstructuredFlatten<T[K]>; // Recurse for nested objects
        }[keyof T] extends infer U
      ? (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
        ? I // Uses intersection magic to combine all single-property objects into one
        : never
      : never;
