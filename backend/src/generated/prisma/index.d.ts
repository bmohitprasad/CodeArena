
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Teacher
 * 
 */
export type Teacher = $Result.DefaultSelection<Prisma.$TeacherPayload>
/**
 * Model Class
 * 
 */
export type Class = $Result.DefaultSelection<Prisma.$ClassPayload>
/**
 * Model Enrollment
 * 
 */
export type Enrollment = $Result.DefaultSelection<Prisma.$EnrollmentPayload>
/**
 * Model Assignment
 * 
 */
export type Assignment = $Result.DefaultSelection<Prisma.$AssignmentPayload>
/**
 * Model Problem
 * 
 */
export type Problem = $Result.DefaultSelection<Prisma.$ProblemPayload>
/**
 * Model AssignmentSubmission
 * 
 */
export type AssignmentSubmission = $Result.DefaultSelection<Prisma.$AssignmentSubmissionPayload>
/**
 * Model ProblemSubmission
 * 
 */
export type ProblemSubmission = $Result.DefaultSelection<Prisma.$ProblemSubmissionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Students
 * const students = await prisma.student.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Students
   * const students = await prisma.student.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teacher`: Exposes CRUD operations for the **Teacher** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teachers
    * const teachers = await prisma.teacher.findMany()
    * ```
    */
  get teacher(): Prisma.TeacherDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.class`: Exposes CRUD operations for the **Class** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Classes
    * const classes = await prisma.class.findMany()
    * ```
    */
  get class(): Prisma.ClassDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.enrollment`: Exposes CRUD operations for the **Enrollment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Enrollments
    * const enrollments = await prisma.enrollment.findMany()
    * ```
    */
  get enrollment(): Prisma.EnrollmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assignment`: Exposes CRUD operations for the **Assignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assignments
    * const assignments = await prisma.assignment.findMany()
    * ```
    */
  get assignment(): Prisma.AssignmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.problem`: Exposes CRUD operations for the **Problem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Problems
    * const problems = await prisma.problem.findMany()
    * ```
    */
  get problem(): Prisma.ProblemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assignmentSubmission`: Exposes CRUD operations for the **AssignmentSubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AssignmentSubmissions
    * const assignmentSubmissions = await prisma.assignmentSubmission.findMany()
    * ```
    */
  get assignmentSubmission(): Prisma.AssignmentSubmissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.problemSubmission`: Exposes CRUD operations for the **ProblemSubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProblemSubmissions
    * const problemSubmissions = await prisma.problemSubmission.findMany()
    * ```
    */
  get problemSubmission(): Prisma.ProblemSubmissionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Student: 'Student',
    Teacher: 'Teacher',
    Class: 'Class',
    Enrollment: 'Enrollment',
    Assignment: 'Assignment',
    Problem: 'Problem',
    AssignmentSubmission: 'AssignmentSubmission',
    ProblemSubmission: 'ProblemSubmission'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "student" | "teacher" | "class" | "enrollment" | "assignment" | "problem" | "assignmentSubmission" | "problemSubmission"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Teacher: {
        payload: Prisma.$TeacherPayload<ExtArgs>
        fields: Prisma.TeacherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeacherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeacherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findFirst: {
            args: Prisma.TeacherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeacherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findMany: {
            args: Prisma.TeacherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          create: {
            args: Prisma.TeacherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          createMany: {
            args: Prisma.TeacherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeacherCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          delete: {
            args: Prisma.TeacherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          update: {
            args: Prisma.TeacherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          deleteMany: {
            args: Prisma.TeacherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeacherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeacherUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          upsert: {
            args: Prisma.TeacherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          aggregate: {
            args: Prisma.TeacherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeacher>
          }
          groupBy: {
            args: Prisma.TeacherGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeacherGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeacherCountArgs<ExtArgs>
            result: $Utils.Optional<TeacherCountAggregateOutputType> | number
          }
        }
      }
      Class: {
        payload: Prisma.$ClassPayload<ExtArgs>
        fields: Prisma.ClassFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          findFirst: {
            args: Prisma.ClassFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          findMany: {
            args: Prisma.ClassFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          create: {
            args: Prisma.ClassCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          createMany: {
            args: Prisma.ClassCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClassCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          delete: {
            args: Prisma.ClassDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          update: {
            args: Prisma.ClassUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          deleteMany: {
            args: Prisma.ClassDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClassUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          upsert: {
            args: Prisma.ClassUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          aggregate: {
            args: Prisma.ClassAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClass>
          }
          groupBy: {
            args: Prisma.ClassGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassCountArgs<ExtArgs>
            result: $Utils.Optional<ClassCountAggregateOutputType> | number
          }
        }
      }
      Enrollment: {
        payload: Prisma.$EnrollmentPayload<ExtArgs>
        fields: Prisma.EnrollmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EnrollmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EnrollmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          findFirst: {
            args: Prisma.EnrollmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EnrollmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          findMany: {
            args: Prisma.EnrollmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          create: {
            args: Prisma.EnrollmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          createMany: {
            args: Prisma.EnrollmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EnrollmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          delete: {
            args: Prisma.EnrollmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          update: {
            args: Prisma.EnrollmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          deleteMany: {
            args: Prisma.EnrollmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EnrollmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EnrollmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          upsert: {
            args: Prisma.EnrollmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          aggregate: {
            args: Prisma.EnrollmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEnrollment>
          }
          groupBy: {
            args: Prisma.EnrollmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.EnrollmentCountArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentCountAggregateOutputType> | number
          }
        }
      }
      Assignment: {
        payload: Prisma.$AssignmentPayload<ExtArgs>
        fields: Prisma.AssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          findFirst: {
            args: Prisma.AssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          findMany: {
            args: Prisma.AssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>[]
          }
          create: {
            args: Prisma.AssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          createMany: {
            args: Prisma.AssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>[]
          }
          delete: {
            args: Prisma.AssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          update: {
            args: Prisma.AssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          deleteMany: {
            args: Prisma.AssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssignmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>[]
          }
          upsert: {
            args: Prisma.AssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          aggregate: {
            args: Prisma.AssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssignment>
          }
          groupBy: {
            args: Prisma.AssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<AssignmentCountAggregateOutputType> | number
          }
        }
      }
      Problem: {
        payload: Prisma.$ProblemPayload<ExtArgs>
        fields: Prisma.ProblemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProblemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProblemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          findFirst: {
            args: Prisma.ProblemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProblemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          findMany: {
            args: Prisma.ProblemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>[]
          }
          create: {
            args: Prisma.ProblemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          createMany: {
            args: Prisma.ProblemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProblemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>[]
          }
          delete: {
            args: Prisma.ProblemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          update: {
            args: Prisma.ProblemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          deleteMany: {
            args: Prisma.ProblemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProblemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProblemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>[]
          }
          upsert: {
            args: Prisma.ProblemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemPayload>
          }
          aggregate: {
            args: Prisma.ProblemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProblem>
          }
          groupBy: {
            args: Prisma.ProblemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProblemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProblemCountArgs<ExtArgs>
            result: $Utils.Optional<ProblemCountAggregateOutputType> | number
          }
        }
      }
      AssignmentSubmission: {
        payload: Prisma.$AssignmentSubmissionPayload<ExtArgs>
        fields: Prisma.AssignmentSubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssignmentSubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentSubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssignmentSubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentSubmissionPayload>
          }
          findFirst: {
            args: Prisma.AssignmentSubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentSubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssignmentSubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentSubmissionPayload>
          }
          findMany: {
            args: Prisma.AssignmentSubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentSubmissionPayload>[]
          }
          create: {
            args: Prisma.AssignmentSubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentSubmissionPayload>
          }
          createMany: {
            args: Prisma.AssignmentSubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssignmentSubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentSubmissionPayload>[]
          }
          delete: {
            args: Prisma.AssignmentSubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentSubmissionPayload>
          }
          update: {
            args: Prisma.AssignmentSubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentSubmissionPayload>
          }
          deleteMany: {
            args: Prisma.AssignmentSubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssignmentSubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssignmentSubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentSubmissionPayload>[]
          }
          upsert: {
            args: Prisma.AssignmentSubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentSubmissionPayload>
          }
          aggregate: {
            args: Prisma.AssignmentSubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssignmentSubmission>
          }
          groupBy: {
            args: Prisma.AssignmentSubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssignmentSubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssignmentSubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<AssignmentSubmissionCountAggregateOutputType> | number
          }
        }
      }
      ProblemSubmission: {
        payload: Prisma.$ProblemSubmissionPayload<ExtArgs>
        fields: Prisma.ProblemSubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProblemSubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProblemSubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSubmissionPayload>
          }
          findFirst: {
            args: Prisma.ProblemSubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProblemSubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSubmissionPayload>
          }
          findMany: {
            args: Prisma.ProblemSubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSubmissionPayload>[]
          }
          create: {
            args: Prisma.ProblemSubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSubmissionPayload>
          }
          createMany: {
            args: Prisma.ProblemSubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProblemSubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSubmissionPayload>[]
          }
          delete: {
            args: Prisma.ProblemSubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSubmissionPayload>
          }
          update: {
            args: Prisma.ProblemSubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSubmissionPayload>
          }
          deleteMany: {
            args: Prisma.ProblemSubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProblemSubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProblemSubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSubmissionPayload>[]
          }
          upsert: {
            args: Prisma.ProblemSubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProblemSubmissionPayload>
          }
          aggregate: {
            args: Prisma.ProblemSubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProblemSubmission>
          }
          groupBy: {
            args: Prisma.ProblemSubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProblemSubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProblemSubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<ProblemSubmissionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    student?: StudentOmit
    teacher?: TeacherOmit
    class?: ClassOmit
    enrollment?: EnrollmentOmit
    assignment?: AssignmentOmit
    problem?: ProblemOmit
    assignmentSubmission?: AssignmentSubmissionOmit
    problemSubmission?: ProblemSubmissionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    enrollments: number
    submissions: number
    problemSubs: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | StudentCountOutputTypeCountEnrollmentsArgs
    submissions?: boolean | StudentCountOutputTypeCountSubmissionsArgs
    problemSubs?: boolean | StudentCountOutputTypeCountProblemSubsArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssignmentSubmissionWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountProblemSubsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemSubmissionWhereInput
  }


  /**
   * Count Type TeacherCountOutputType
   */

  export type TeacherCountOutputType = {
    classes: number
  }

  export type TeacherCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classes?: boolean | TeacherCountOutputTypeCountClassesArgs
  }

  // Custom InputTypes
  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherCountOutputType
     */
    select?: TeacherCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountClassesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassWhereInput
  }


  /**
   * Count Type ClassCountOutputType
   */

  export type ClassCountOutputType = {
    enrollments: number
    assignments: number
  }

  export type ClassCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | ClassCountOutputTypeCountEnrollmentsArgs
    assignments?: boolean | ClassCountOutputTypeCountAssignmentsArgs
  }

  // Custom InputTypes
  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassCountOutputType
     */
    select?: ClassCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
  }

  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssignmentWhereInput
  }


  /**
   * Count Type AssignmentCountOutputType
   */

  export type AssignmentCountOutputType = {
    problems: number
    submissions: number
    problemSubs: number
  }

  export type AssignmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problems?: boolean | AssignmentCountOutputTypeCountProblemsArgs
    submissions?: boolean | AssignmentCountOutputTypeCountSubmissionsArgs
    problemSubs?: boolean | AssignmentCountOutputTypeCountProblemSubsArgs
  }

  // Custom InputTypes
  /**
   * AssignmentCountOutputType without action
   */
  export type AssignmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentCountOutputType
     */
    select?: AssignmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AssignmentCountOutputType without action
   */
  export type AssignmentCountOutputTypeCountProblemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemWhereInput
  }

  /**
   * AssignmentCountOutputType without action
   */
  export type AssignmentCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssignmentSubmissionWhereInput
  }

  /**
   * AssignmentCountOutputType without action
   */
  export type AssignmentCountOutputTypeCountProblemSubsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemSubmissionWhereInput
  }


  /**
   * Count Type ProblemCountOutputType
   */

  export type ProblemCountOutputType = {
    problemSubs: number
  }

  export type ProblemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problemSubs?: boolean | ProblemCountOutputTypeCountProblemSubsArgs
  }

  // Custom InputTypes
  /**
   * ProblemCountOutputType without action
   */
  export type ProblemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemCountOutputType
     */
    select?: ProblemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProblemCountOutputType without action
   */
  export type ProblemCountOutputTypeCountProblemSubsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemSubmissionWhereInput
  }


  /**
   * Count Type AssignmentSubmissionCountOutputType
   */

  export type AssignmentSubmissionCountOutputType = {
    problems: number
  }

  export type AssignmentSubmissionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    problems?: boolean | AssignmentSubmissionCountOutputTypeCountProblemsArgs
  }

  // Custom InputTypes
  /**
   * AssignmentSubmissionCountOutputType without action
   */
  export type AssignmentSubmissionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentSubmissionCountOutputType
     */
    select?: AssignmentSubmissionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AssignmentSubmissionCountOutputType without action
   */
  export type AssignmentSubmissionCountOutputTypeCountProblemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemSubmissionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentAvgAggregateOutputType = {
    roll_num: number | null
  }

  export type StudentSumAggregateOutputType = {
    roll_num: number | null
  }

  export type StudentMinAggregateOutputType = {
    roll_num: number | null
    name: string | null
    branch: string | null
    password: string | null
    role: $Enums.UserRole | null
  }

  export type StudentMaxAggregateOutputType = {
    roll_num: number | null
    name: string | null
    branch: string | null
    password: string | null
    role: $Enums.UserRole | null
  }

  export type StudentCountAggregateOutputType = {
    roll_num: number
    name: number
    branch: number
    password: number
    role: number
    _all: number
  }


  export type StudentAvgAggregateInputType = {
    roll_num?: true
  }

  export type StudentSumAggregateInputType = {
    roll_num?: true
  }

  export type StudentMinAggregateInputType = {
    roll_num?: true
    name?: true
    branch?: true
    password?: true
    role?: true
  }

  export type StudentMaxAggregateInputType = {
    roll_num?: true
    name?: true
    branch?: true
    password?: true
    role?: true
  }

  export type StudentCountAggregateInputType = {
    roll_num?: true
    name?: true
    branch?: true
    password?: true
    role?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    roll_num: number
    name: string
    branch: string
    password: string
    role: $Enums.UserRole
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    roll_num?: boolean
    name?: boolean
    branch?: boolean
    password?: boolean
    role?: boolean
    enrollments?: boolean | Student$enrollmentsArgs<ExtArgs>
    submissions?: boolean | Student$submissionsArgs<ExtArgs>
    problemSubs?: boolean | Student$problemSubsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    roll_num?: boolean
    name?: boolean
    branch?: boolean
    password?: boolean
    role?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    roll_num?: boolean
    name?: boolean
    branch?: boolean
    password?: boolean
    role?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    roll_num?: boolean
    name?: boolean
    branch?: boolean
    password?: boolean
    role?: boolean
  }

  export type StudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"roll_num" | "name" | "branch" | "password" | "role", ExtArgs["result"]["student"]>
  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | Student$enrollmentsArgs<ExtArgs>
    submissions?: boolean | Student$submissionsArgs<ExtArgs>
    problemSubs?: boolean | Student$problemSubsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StudentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      enrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
      submissions: Prisma.$AssignmentSubmissionPayload<ExtArgs>[]
      problemSubs: Prisma.$ProblemSubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      roll_num: number
      name: string
      branch: string
      password: string
      role: $Enums.UserRole
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `roll_num`
     * const studentWithRoll_numOnly = await prisma.student.findMany({ select: { roll_num: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `roll_num`
     * const studentWithRoll_numOnly = await prisma.student.createManyAndReturn({
     *   select: { roll_num: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students and returns the data updated in the database.
     * @param {StudentUpdateManyAndReturnArgs} args - Arguments to update many Students.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Students and only return the `roll_num`
     * const studentWithRoll_numOnly = await prisma.student.updateManyAndReturn({
     *   select: { roll_num: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    enrollments<T extends Student$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, Student$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    submissions<T extends Student$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, Student$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    problemSubs<T extends Student$problemSubsArgs<ExtArgs> = {}>(args?: Subset<T, Student$problemSubsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */
  interface StudentFieldRefs {
    readonly roll_num: FieldRef<"Student", 'Int'>
    readonly name: FieldRef<"Student", 'String'>
    readonly branch: FieldRef<"Student", 'String'>
    readonly password: FieldRef<"Student", 'String'>
    readonly role: FieldRef<"Student", 'UserRole'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student updateManyAndReturn
   */
  export type StudentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to delete.
     */
    limit?: number
  }

  /**
   * Student.enrollments
   */
  export type Student$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Student.submissions
   */
  export type Student$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentSubmission
     */
    select?: AssignmentSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentSubmission
     */
    omit?: AssignmentSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentSubmissionInclude<ExtArgs> | null
    where?: AssignmentSubmissionWhereInput
    orderBy?: AssignmentSubmissionOrderByWithRelationInput | AssignmentSubmissionOrderByWithRelationInput[]
    cursor?: AssignmentSubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssignmentSubmissionScalarFieldEnum | AssignmentSubmissionScalarFieldEnum[]
  }

  /**
   * Student.problemSubs
   */
  export type Student$problemSubsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSubmission
     */
    select?: ProblemSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSubmission
     */
    omit?: ProblemSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSubmissionInclude<ExtArgs> | null
    where?: ProblemSubmissionWhereInput
    orderBy?: ProblemSubmissionOrderByWithRelationInput | ProblemSubmissionOrderByWithRelationInput[]
    cursor?: ProblemSubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProblemSubmissionScalarFieldEnum | ProblemSubmissionScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Teacher
   */

  export type AggregateTeacher = {
    _count: TeacherCountAggregateOutputType | null
    _avg: TeacherAvgAggregateOutputType | null
    _sum: TeacherSumAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  export type TeacherAvgAggregateOutputType = {
    id: number | null
  }

  export type TeacherSumAggregateOutputType = {
    id: number | null
  }

  export type TeacherMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    dept: string | null
    role: $Enums.UserRole | null
  }

  export type TeacherMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    dept: string | null
    role: $Enums.UserRole | null
  }

  export type TeacherCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    dept: number
    role: number
    _all: number
  }


  export type TeacherAvgAggregateInputType = {
    id?: true
  }

  export type TeacherSumAggregateInputType = {
    id?: true
  }

  export type TeacherMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    dept?: true
    role?: true
  }

  export type TeacherMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    dept?: true
    role?: true
  }

  export type TeacherCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    dept?: true
    role?: true
    _all?: true
  }

  export type TeacherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teacher to aggregate.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teachers
    **/
    _count?: true | TeacherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeacherAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeacherSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeacherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeacherMaxAggregateInputType
  }

  export type GetTeacherAggregateType<T extends TeacherAggregateArgs> = {
        [P in keyof T & keyof AggregateTeacher]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeacher[P]>
      : GetScalarType<T[P], AggregateTeacher[P]>
  }




  export type TeacherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeacherWhereInput
    orderBy?: TeacherOrderByWithAggregationInput | TeacherOrderByWithAggregationInput[]
    by: TeacherScalarFieldEnum[] | TeacherScalarFieldEnum
    having?: TeacherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeacherCountAggregateInputType | true
    _avg?: TeacherAvgAggregateInputType
    _sum?: TeacherSumAggregateInputType
    _min?: TeacherMinAggregateInputType
    _max?: TeacherMaxAggregateInputType
  }

  export type TeacherGroupByOutputType = {
    id: number
    email: string
    password: string
    name: string
    dept: string
    role: $Enums.UserRole
    _count: TeacherCountAggregateOutputType | null
    _avg: TeacherAvgAggregateOutputType | null
    _sum: TeacherSumAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  type GetTeacherGroupByPayload<T extends TeacherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeacherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeacherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeacherGroupByOutputType[P]>
            : GetScalarType<T[P], TeacherGroupByOutputType[P]>
        }
      >
    >


  export type TeacherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    dept?: boolean
    role?: boolean
    classes?: boolean | Teacher$classesArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    dept?: boolean
    role?: boolean
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    dept?: boolean
    role?: boolean
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    dept?: boolean
    role?: boolean
  }

  export type TeacherOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "dept" | "role", ExtArgs["result"]["teacher"]>
  export type TeacherInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classes?: boolean | Teacher$classesArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeacherIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TeacherIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TeacherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Teacher"
    objects: {
      classes: Prisma.$ClassPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      name: string
      dept: string
      role: $Enums.UserRole
    }, ExtArgs["result"]["teacher"]>
    composites: {}
  }

  type TeacherGetPayload<S extends boolean | null | undefined | TeacherDefaultArgs> = $Result.GetResult<Prisma.$TeacherPayload, S>

  type TeacherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeacherFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeacherCountAggregateInputType | true
    }

  export interface TeacherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Teacher'], meta: { name: 'Teacher' } }
    /**
     * Find zero or one Teacher that matches the filter.
     * @param {TeacherFindUniqueArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeacherFindUniqueArgs>(args: SelectSubset<T, TeacherFindUniqueArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Teacher that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeacherFindUniqueOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeacherFindUniqueOrThrowArgs>(args: SelectSubset<T, TeacherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teacher that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeacherFindFirstArgs>(args?: SelectSubset<T, TeacherFindFirstArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teacher that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeacherFindFirstOrThrowArgs>(args?: SelectSubset<T, TeacherFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teachers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teachers
     * const teachers = await prisma.teacher.findMany()
     * 
     * // Get first 10 Teachers
     * const teachers = await prisma.teacher.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teacherWithIdOnly = await prisma.teacher.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeacherFindManyArgs>(args?: SelectSubset<T, TeacherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Teacher.
     * @param {TeacherCreateArgs} args - Arguments to create a Teacher.
     * @example
     * // Create one Teacher
     * const Teacher = await prisma.teacher.create({
     *   data: {
     *     // ... data to create a Teacher
     *   }
     * })
     * 
     */
    create<T extends TeacherCreateArgs>(args: SelectSubset<T, TeacherCreateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teachers.
     * @param {TeacherCreateManyArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeacherCreateManyArgs>(args?: SelectSubset<T, TeacherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teachers and returns the data saved in the database.
     * @param {TeacherCreateManyAndReturnArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teachers and only return the `id`
     * const teacherWithIdOnly = await prisma.teacher.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeacherCreateManyAndReturnArgs>(args?: SelectSubset<T, TeacherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Teacher.
     * @param {TeacherDeleteArgs} args - Arguments to delete one Teacher.
     * @example
     * // Delete one Teacher
     * const Teacher = await prisma.teacher.delete({
     *   where: {
     *     // ... filter to delete one Teacher
     *   }
     * })
     * 
     */
    delete<T extends TeacherDeleteArgs>(args: SelectSubset<T, TeacherDeleteArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Teacher.
     * @param {TeacherUpdateArgs} args - Arguments to update one Teacher.
     * @example
     * // Update one Teacher
     * const teacher = await prisma.teacher.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeacherUpdateArgs>(args: SelectSubset<T, TeacherUpdateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teachers.
     * @param {TeacherDeleteManyArgs} args - Arguments to filter Teachers to delete.
     * @example
     * // Delete a few Teachers
     * const { count } = await prisma.teacher.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeacherDeleteManyArgs>(args?: SelectSubset<T, TeacherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeacherUpdateManyArgs>(args: SelectSubset<T, TeacherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers and returns the data updated in the database.
     * @param {TeacherUpdateManyAndReturnArgs} args - Arguments to update many Teachers.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teachers and only return the `id`
     * const teacherWithIdOnly = await prisma.teacher.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeacherUpdateManyAndReturnArgs>(args: SelectSubset<T, TeacherUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Teacher.
     * @param {TeacherUpsertArgs} args - Arguments to update or create a Teacher.
     * @example
     * // Update or create a Teacher
     * const teacher = await prisma.teacher.upsert({
     *   create: {
     *     // ... data to create a Teacher
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Teacher we want to update
     *   }
     * })
     */
    upsert<T extends TeacherUpsertArgs>(args: SelectSubset<T, TeacherUpsertArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherCountArgs} args - Arguments to filter Teachers to count.
     * @example
     * // Count the number of Teachers
     * const count = await prisma.teacher.count({
     *   where: {
     *     // ... the filter for the Teachers we want to count
     *   }
     * })
    **/
    count<T extends TeacherCountArgs>(
      args?: Subset<T, TeacherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeacherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeacherAggregateArgs>(args: Subset<T, TeacherAggregateArgs>): Prisma.PrismaPromise<GetTeacherAggregateType<T>>

    /**
     * Group by Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeacherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeacherGroupByArgs['orderBy'] }
        : { orderBy?: TeacherGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeacherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeacherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Teacher model
   */
  readonly fields: TeacherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Teacher.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeacherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    classes<T extends Teacher$classesArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$classesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Teacher model
   */
  interface TeacherFieldRefs {
    readonly id: FieldRef<"Teacher", 'Int'>
    readonly email: FieldRef<"Teacher", 'String'>
    readonly password: FieldRef<"Teacher", 'String'>
    readonly name: FieldRef<"Teacher", 'String'>
    readonly dept: FieldRef<"Teacher", 'String'>
    readonly role: FieldRef<"Teacher", 'UserRole'>
  }
    

  // Custom InputTypes
  /**
   * Teacher findUnique
   */
  export type TeacherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findUniqueOrThrow
   */
  export type TeacherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findFirst
   */
  export type TeacherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findFirstOrThrow
   */
  export type TeacherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findMany
   */
  export type TeacherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teachers to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher create
   */
  export type TeacherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to create a Teacher.
     */
    data: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
  }

  /**
   * Teacher createMany
   */
  export type TeacherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Teacher createManyAndReturn
   */
  export type TeacherCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Teacher update
   */
  export type TeacherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to update a Teacher.
     */
    data: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
    /**
     * Choose, which Teacher to update.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher updateMany
   */
  export type TeacherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to update.
     */
    limit?: number
  }

  /**
   * Teacher updateManyAndReturn
   */
  export type TeacherUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to update.
     */
    limit?: number
  }

  /**
   * Teacher upsert
   */
  export type TeacherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The filter to search for the Teacher to update in case it exists.
     */
    where: TeacherWhereUniqueInput
    /**
     * In case the Teacher found by the `where` argument doesn't exist, create a new Teacher with this data.
     */
    create: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
    /**
     * In case the Teacher was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
  }

  /**
   * Teacher delete
   */
  export type TeacherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter which Teacher to delete.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher deleteMany
   */
  export type TeacherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teachers to delete
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to delete.
     */
    limit?: number
  }

  /**
   * Teacher.classes
   */
  export type Teacher$classesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    where?: ClassWhereInput
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    cursor?: ClassWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Teacher without action
   */
  export type TeacherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
  }


  /**
   * Model Class
   */

  export type AggregateClass = {
    _count: ClassCountAggregateOutputType | null
    _avg: ClassAvgAggregateOutputType | null
    _sum: ClassSumAggregateOutputType | null
    _min: ClassMinAggregateOutputType | null
    _max: ClassMaxAggregateOutputType | null
  }

  export type ClassAvgAggregateOutputType = {
    class_id: number | null
    teacher_id: number | null
  }

  export type ClassSumAggregateOutputType = {
    class_id: number | null
    teacher_id: number | null
  }

  export type ClassMinAggregateOutputType = {
    class_id: number | null
    name: string | null
    joinCode: string | null
    teacher_id: number | null
  }

  export type ClassMaxAggregateOutputType = {
    class_id: number | null
    name: string | null
    joinCode: string | null
    teacher_id: number | null
  }

  export type ClassCountAggregateOutputType = {
    class_id: number
    name: number
    joinCode: number
    teacher_id: number
    _all: number
  }


  export type ClassAvgAggregateInputType = {
    class_id?: true
    teacher_id?: true
  }

  export type ClassSumAggregateInputType = {
    class_id?: true
    teacher_id?: true
  }

  export type ClassMinAggregateInputType = {
    class_id?: true
    name?: true
    joinCode?: true
    teacher_id?: true
  }

  export type ClassMaxAggregateInputType = {
    class_id?: true
    name?: true
    joinCode?: true
    teacher_id?: true
  }

  export type ClassCountAggregateInputType = {
    class_id?: true
    name?: true
    joinCode?: true
    teacher_id?: true
    _all?: true
  }

  export type ClassAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Class to aggregate.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Classes
    **/
    _count?: true | ClassCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClassAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClassSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassMaxAggregateInputType
  }

  export type GetClassAggregateType<T extends ClassAggregateArgs> = {
        [P in keyof T & keyof AggregateClass]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClass[P]>
      : GetScalarType<T[P], AggregateClass[P]>
  }




  export type ClassGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassWhereInput
    orderBy?: ClassOrderByWithAggregationInput | ClassOrderByWithAggregationInput[]
    by: ClassScalarFieldEnum[] | ClassScalarFieldEnum
    having?: ClassScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassCountAggregateInputType | true
    _avg?: ClassAvgAggregateInputType
    _sum?: ClassSumAggregateInputType
    _min?: ClassMinAggregateInputType
    _max?: ClassMaxAggregateInputType
  }

  export type ClassGroupByOutputType = {
    class_id: number
    name: string
    joinCode: string
    teacher_id: number
    _count: ClassCountAggregateOutputType | null
    _avg: ClassAvgAggregateOutputType | null
    _sum: ClassSumAggregateOutputType | null
    _min: ClassMinAggregateOutputType | null
    _max: ClassMaxAggregateOutputType | null
  }

  type GetClassGroupByPayload<T extends ClassGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassGroupByOutputType[P]>
            : GetScalarType<T[P], ClassGroupByOutputType[P]>
        }
      >
    >


  export type ClassSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    class_id?: boolean
    name?: boolean
    joinCode?: boolean
    teacher_id?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    enrollments?: boolean | Class$enrollmentsArgs<ExtArgs>
    assignments?: boolean | Class$assignmentsArgs<ExtArgs>
    _count?: boolean | ClassCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["class"]>

  export type ClassSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    class_id?: boolean
    name?: boolean
    joinCode?: boolean
    teacher_id?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["class"]>

  export type ClassSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    class_id?: boolean
    name?: boolean
    joinCode?: boolean
    teacher_id?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["class"]>

  export type ClassSelectScalar = {
    class_id?: boolean
    name?: boolean
    joinCode?: boolean
    teacher_id?: boolean
  }

  export type ClassOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"class_id" | "name" | "joinCode" | "teacher_id", ExtArgs["result"]["class"]>
  export type ClassInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    enrollments?: boolean | Class$enrollmentsArgs<ExtArgs>
    assignments?: boolean | Class$assignmentsArgs<ExtArgs>
    _count?: boolean | ClassCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClassIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }
  export type ClassIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }

  export type $ClassPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Class"
    objects: {
      teacher: Prisma.$TeacherPayload<ExtArgs>
      enrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
      assignments: Prisma.$AssignmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      class_id: number
      name: string
      joinCode: string
      teacher_id: number
    }, ExtArgs["result"]["class"]>
    composites: {}
  }

  type ClassGetPayload<S extends boolean | null | undefined | ClassDefaultArgs> = $Result.GetResult<Prisma.$ClassPayload, S>

  type ClassCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClassFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClassCountAggregateInputType | true
    }

  export interface ClassDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Class'], meta: { name: 'Class' } }
    /**
     * Find zero or one Class that matches the filter.
     * @param {ClassFindUniqueArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassFindUniqueArgs>(args: SelectSubset<T, ClassFindUniqueArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Class that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClassFindUniqueOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Class that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassFindFirstArgs>(args?: SelectSubset<T, ClassFindFirstArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Class that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Classes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Classes
     * const classes = await prisma.class.findMany()
     * 
     * // Get first 10 Classes
     * const classes = await prisma.class.findMany({ take: 10 })
     * 
     * // Only select the `class_id`
     * const classWithClass_idOnly = await prisma.class.findMany({ select: { class_id: true } })
     * 
     */
    findMany<T extends ClassFindManyArgs>(args?: SelectSubset<T, ClassFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Class.
     * @param {ClassCreateArgs} args - Arguments to create a Class.
     * @example
     * // Create one Class
     * const Class = await prisma.class.create({
     *   data: {
     *     // ... data to create a Class
     *   }
     * })
     * 
     */
    create<T extends ClassCreateArgs>(args: SelectSubset<T, ClassCreateArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Classes.
     * @param {ClassCreateManyArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassCreateManyArgs>(args?: SelectSubset<T, ClassCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Classes and returns the data saved in the database.
     * @param {ClassCreateManyAndReturnArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Classes and only return the `class_id`
     * const classWithClass_idOnly = await prisma.class.createManyAndReturn({
     *   select: { class_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClassCreateManyAndReturnArgs>(args?: SelectSubset<T, ClassCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Class.
     * @param {ClassDeleteArgs} args - Arguments to delete one Class.
     * @example
     * // Delete one Class
     * const Class = await prisma.class.delete({
     *   where: {
     *     // ... filter to delete one Class
     *   }
     * })
     * 
     */
    delete<T extends ClassDeleteArgs>(args: SelectSubset<T, ClassDeleteArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Class.
     * @param {ClassUpdateArgs} args - Arguments to update one Class.
     * @example
     * // Update one Class
     * const class = await prisma.class.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassUpdateArgs>(args: SelectSubset<T, ClassUpdateArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Classes.
     * @param {ClassDeleteManyArgs} args - Arguments to filter Classes to delete.
     * @example
     * // Delete a few Classes
     * const { count } = await prisma.class.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassDeleteManyArgs>(args?: SelectSubset<T, ClassDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Classes
     * const class = await prisma.class.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassUpdateManyArgs>(args: SelectSubset<T, ClassUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classes and returns the data updated in the database.
     * @param {ClassUpdateManyAndReturnArgs} args - Arguments to update many Classes.
     * @example
     * // Update many Classes
     * const class = await prisma.class.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Classes and only return the `class_id`
     * const classWithClass_idOnly = await prisma.class.updateManyAndReturn({
     *   select: { class_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClassUpdateManyAndReturnArgs>(args: SelectSubset<T, ClassUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Class.
     * @param {ClassUpsertArgs} args - Arguments to update or create a Class.
     * @example
     * // Update or create a Class
     * const class = await prisma.class.upsert({
     *   create: {
     *     // ... data to create a Class
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Class we want to update
     *   }
     * })
     */
    upsert<T extends ClassUpsertArgs>(args: SelectSubset<T, ClassUpsertArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassCountArgs} args - Arguments to filter Classes to count.
     * @example
     * // Count the number of Classes
     * const count = await prisma.class.count({
     *   where: {
     *     // ... the filter for the Classes we want to count
     *   }
     * })
    **/
    count<T extends ClassCountArgs>(
      args?: Subset<T, ClassCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClassAggregateArgs>(args: Subset<T, ClassAggregateArgs>): Prisma.PrismaPromise<GetClassAggregateType<T>>

    /**
     * Group by Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClassGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassGroupByArgs['orderBy'] }
        : { orderBy?: ClassGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClassGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Class model
   */
  readonly fields: ClassFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Class.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends TeacherDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeacherDefaultArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    enrollments<T extends Class$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, Class$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignments<T extends Class$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Class$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Class model
   */
  interface ClassFieldRefs {
    readonly class_id: FieldRef<"Class", 'Int'>
    readonly name: FieldRef<"Class", 'String'>
    readonly joinCode: FieldRef<"Class", 'String'>
    readonly teacher_id: FieldRef<"Class", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Class findUnique
   */
  export type ClassFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class findUniqueOrThrow
   */
  export type ClassFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class findFirst
   */
  export type ClassFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class findFirstOrThrow
   */
  export type ClassFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class findMany
   */
  export type ClassFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Classes to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class create
   */
  export type ClassCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The data needed to create a Class.
     */
    data: XOR<ClassCreateInput, ClassUncheckedCreateInput>
  }

  /**
   * Class createMany
   */
  export type ClassCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Class createManyAndReturn
   */
  export type ClassCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Class update
   */
  export type ClassUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The data needed to update a Class.
     */
    data: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>
    /**
     * Choose, which Class to update.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class updateMany
   */
  export type ClassUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Classes.
     */
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyInput>
    /**
     * Filter which Classes to update
     */
    where?: ClassWhereInput
    /**
     * Limit how many Classes to update.
     */
    limit?: number
  }

  /**
   * Class updateManyAndReturn
   */
  export type ClassUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * The data used to update Classes.
     */
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyInput>
    /**
     * Filter which Classes to update
     */
    where?: ClassWhereInput
    /**
     * Limit how many Classes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Class upsert
   */
  export type ClassUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The filter to search for the Class to update in case it exists.
     */
    where: ClassWhereUniqueInput
    /**
     * In case the Class found by the `where` argument doesn't exist, create a new Class with this data.
     */
    create: XOR<ClassCreateInput, ClassUncheckedCreateInput>
    /**
     * In case the Class was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>
  }

  /**
   * Class delete
   */
  export type ClassDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter which Class to delete.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class deleteMany
   */
  export type ClassDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classes to delete
     */
    where?: ClassWhereInput
    /**
     * Limit how many Classes to delete.
     */
    limit?: number
  }

  /**
   * Class.enrollments
   */
  export type Class$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Class.assignments
   */
  export type Class$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    where?: AssignmentWhereInput
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    cursor?: AssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssignmentScalarFieldEnum | AssignmentScalarFieldEnum[]
  }

  /**
   * Class without action
   */
  export type ClassDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
  }


  /**
   * Model Enrollment
   */

  export type AggregateEnrollment = {
    _count: EnrollmentCountAggregateOutputType | null
    _avg: EnrollmentAvgAggregateOutputType | null
    _sum: EnrollmentSumAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  export type EnrollmentAvgAggregateOutputType = {
    class_id: number | null
    student_id: number | null
  }

  export type EnrollmentSumAggregateOutputType = {
    class_id: number | null
    student_id: number | null
  }

  export type EnrollmentMinAggregateOutputType = {
    class_id: number | null
    student_id: number | null
  }

  export type EnrollmentMaxAggregateOutputType = {
    class_id: number | null
    student_id: number | null
  }

  export type EnrollmentCountAggregateOutputType = {
    class_id: number
    student_id: number
    _all: number
  }


  export type EnrollmentAvgAggregateInputType = {
    class_id?: true
    student_id?: true
  }

  export type EnrollmentSumAggregateInputType = {
    class_id?: true
    student_id?: true
  }

  export type EnrollmentMinAggregateInputType = {
    class_id?: true
    student_id?: true
  }

  export type EnrollmentMaxAggregateInputType = {
    class_id?: true
    student_id?: true
  }

  export type EnrollmentCountAggregateInputType = {
    class_id?: true
    student_id?: true
    _all?: true
  }

  export type EnrollmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enrollment to aggregate.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Enrollments
    **/
    _count?: true | EnrollmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EnrollmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EnrollmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnrollmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnrollmentMaxAggregateInputType
  }

  export type GetEnrollmentAggregateType<T extends EnrollmentAggregateArgs> = {
        [P in keyof T & keyof AggregateEnrollment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnrollment[P]>
      : GetScalarType<T[P], AggregateEnrollment[P]>
  }




  export type EnrollmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithAggregationInput | EnrollmentOrderByWithAggregationInput[]
    by: EnrollmentScalarFieldEnum[] | EnrollmentScalarFieldEnum
    having?: EnrollmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnrollmentCountAggregateInputType | true
    _avg?: EnrollmentAvgAggregateInputType
    _sum?: EnrollmentSumAggregateInputType
    _min?: EnrollmentMinAggregateInputType
    _max?: EnrollmentMaxAggregateInputType
  }

  export type EnrollmentGroupByOutputType = {
    class_id: number
    student_id: number
    _count: EnrollmentCountAggregateOutputType | null
    _avg: EnrollmentAvgAggregateOutputType | null
    _sum: EnrollmentSumAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  type GetEnrollmentGroupByPayload<T extends EnrollmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnrollmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnrollmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
            : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
        }
      >
    >


  export type EnrollmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    class_id?: boolean
    student_id?: boolean
    class?: boolean | ClassDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    class_id?: boolean
    student_id?: boolean
    class?: boolean | ClassDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    class_id?: boolean
    student_id?: boolean
    class?: boolean | ClassDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectScalar = {
    class_id?: boolean
    student_id?: boolean
  }

  export type EnrollmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"class_id" | "student_id", ExtArgs["result"]["enrollment"]>
  export type EnrollmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type EnrollmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type EnrollmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassDefaultArgs<ExtArgs>
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $EnrollmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Enrollment"
    objects: {
      class: Prisma.$ClassPayload<ExtArgs>
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      class_id: number
      student_id: number
    }, ExtArgs["result"]["enrollment"]>
    composites: {}
  }

  type EnrollmentGetPayload<S extends boolean | null | undefined | EnrollmentDefaultArgs> = $Result.GetResult<Prisma.$EnrollmentPayload, S>

  type EnrollmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EnrollmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EnrollmentCountAggregateInputType | true
    }

  export interface EnrollmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Enrollment'], meta: { name: 'Enrollment' } }
    /**
     * Find zero or one Enrollment that matches the filter.
     * @param {EnrollmentFindUniqueArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnrollmentFindUniqueArgs>(args: SelectSubset<T, EnrollmentFindUniqueArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Enrollment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EnrollmentFindUniqueOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnrollmentFindUniqueOrThrowArgs>(args: SelectSubset<T, EnrollmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enrollment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindFirstArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnrollmentFindFirstArgs>(args?: SelectSubset<T, EnrollmentFindFirstArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enrollment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindFirstOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnrollmentFindFirstOrThrowArgs>(args?: SelectSubset<T, EnrollmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Enrollments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Enrollments
     * const enrollments = await prisma.enrollment.findMany()
     * 
     * // Get first 10 Enrollments
     * const enrollments = await prisma.enrollment.findMany({ take: 10 })
     * 
     * // Only select the `class_id`
     * const enrollmentWithClass_idOnly = await prisma.enrollment.findMany({ select: { class_id: true } })
     * 
     */
    findMany<T extends EnrollmentFindManyArgs>(args?: SelectSubset<T, EnrollmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Enrollment.
     * @param {EnrollmentCreateArgs} args - Arguments to create a Enrollment.
     * @example
     * // Create one Enrollment
     * const Enrollment = await prisma.enrollment.create({
     *   data: {
     *     // ... data to create a Enrollment
     *   }
     * })
     * 
     */
    create<T extends EnrollmentCreateArgs>(args: SelectSubset<T, EnrollmentCreateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Enrollments.
     * @param {EnrollmentCreateManyArgs} args - Arguments to create many Enrollments.
     * @example
     * // Create many Enrollments
     * const enrollment = await prisma.enrollment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EnrollmentCreateManyArgs>(args?: SelectSubset<T, EnrollmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Enrollments and returns the data saved in the database.
     * @param {EnrollmentCreateManyAndReturnArgs} args - Arguments to create many Enrollments.
     * @example
     * // Create many Enrollments
     * const enrollment = await prisma.enrollment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Enrollments and only return the `class_id`
     * const enrollmentWithClass_idOnly = await prisma.enrollment.createManyAndReturn({
     *   select: { class_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EnrollmentCreateManyAndReturnArgs>(args?: SelectSubset<T, EnrollmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Enrollment.
     * @param {EnrollmentDeleteArgs} args - Arguments to delete one Enrollment.
     * @example
     * // Delete one Enrollment
     * const Enrollment = await prisma.enrollment.delete({
     *   where: {
     *     // ... filter to delete one Enrollment
     *   }
     * })
     * 
     */
    delete<T extends EnrollmentDeleteArgs>(args: SelectSubset<T, EnrollmentDeleteArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Enrollment.
     * @param {EnrollmentUpdateArgs} args - Arguments to update one Enrollment.
     * @example
     * // Update one Enrollment
     * const enrollment = await prisma.enrollment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EnrollmentUpdateArgs>(args: SelectSubset<T, EnrollmentUpdateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Enrollments.
     * @param {EnrollmentDeleteManyArgs} args - Arguments to filter Enrollments to delete.
     * @example
     * // Delete a few Enrollments
     * const { count } = await prisma.enrollment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EnrollmentDeleteManyArgs>(args?: SelectSubset<T, EnrollmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Enrollments
     * const enrollment = await prisma.enrollment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EnrollmentUpdateManyArgs>(args: SelectSubset<T, EnrollmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enrollments and returns the data updated in the database.
     * @param {EnrollmentUpdateManyAndReturnArgs} args - Arguments to update many Enrollments.
     * @example
     * // Update many Enrollments
     * const enrollment = await prisma.enrollment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Enrollments and only return the `class_id`
     * const enrollmentWithClass_idOnly = await prisma.enrollment.updateManyAndReturn({
     *   select: { class_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EnrollmentUpdateManyAndReturnArgs>(args: SelectSubset<T, EnrollmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Enrollment.
     * @param {EnrollmentUpsertArgs} args - Arguments to update or create a Enrollment.
     * @example
     * // Update or create a Enrollment
     * const enrollment = await prisma.enrollment.upsert({
     *   create: {
     *     // ... data to create a Enrollment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Enrollment we want to update
     *   }
     * })
     */
    upsert<T extends EnrollmentUpsertArgs>(args: SelectSubset<T, EnrollmentUpsertArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentCountArgs} args - Arguments to filter Enrollments to count.
     * @example
     * // Count the number of Enrollments
     * const count = await prisma.enrollment.count({
     *   where: {
     *     // ... the filter for the Enrollments we want to count
     *   }
     * })
    **/
    count<T extends EnrollmentCountArgs>(
      args?: Subset<T, EnrollmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnrollmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EnrollmentAggregateArgs>(args: Subset<T, EnrollmentAggregateArgs>): Prisma.PrismaPromise<GetEnrollmentAggregateType<T>>

    /**
     * Group by Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EnrollmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnrollmentGroupByArgs['orderBy'] }
        : { orderBy?: EnrollmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EnrollmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnrollmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Enrollment model
   */
  readonly fields: EnrollmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Enrollment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnrollmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    class<T extends ClassDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassDefaultArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Enrollment model
   */
  interface EnrollmentFieldRefs {
    readonly class_id: FieldRef<"Enrollment", 'Int'>
    readonly student_id: FieldRef<"Enrollment", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Enrollment findUnique
   */
  export type EnrollmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment findUniqueOrThrow
   */
  export type EnrollmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment findFirst
   */
  export type EnrollmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment findFirstOrThrow
   */
  export type EnrollmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment findMany
   */
  export type EnrollmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollments to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment create
   */
  export type EnrollmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Enrollment.
     */
    data: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>
  }

  /**
   * Enrollment createMany
   */
  export type EnrollmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Enrollments.
     */
    data: EnrollmentCreateManyInput | EnrollmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Enrollment createManyAndReturn
   */
  export type EnrollmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * The data used to create many Enrollments.
     */
    data: EnrollmentCreateManyInput | EnrollmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Enrollment update
   */
  export type EnrollmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Enrollment.
     */
    data: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>
    /**
     * Choose, which Enrollment to update.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment updateMany
   */
  export type EnrollmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Enrollments.
     */
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyInput>
    /**
     * Filter which Enrollments to update
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to update.
     */
    limit?: number
  }

  /**
   * Enrollment updateManyAndReturn
   */
  export type EnrollmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * The data used to update Enrollments.
     */
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyInput>
    /**
     * Filter which Enrollments to update
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Enrollment upsert
   */
  export type EnrollmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Enrollment to update in case it exists.
     */
    where: EnrollmentWhereUniqueInput
    /**
     * In case the Enrollment found by the `where` argument doesn't exist, create a new Enrollment with this data.
     */
    create: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>
    /**
     * In case the Enrollment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>
  }

  /**
   * Enrollment delete
   */
  export type EnrollmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter which Enrollment to delete.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment deleteMany
   */
  export type EnrollmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enrollments to delete
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to delete.
     */
    limit?: number
  }

  /**
   * Enrollment without action
   */
  export type EnrollmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
  }


  /**
   * Model Assignment
   */

  export type AggregateAssignment = {
    _count: AssignmentCountAggregateOutputType | null
    _avg: AssignmentAvgAggregateOutputType | null
    _sum: AssignmentSumAggregateOutputType | null
    _min: AssignmentMinAggregateOutputType | null
    _max: AssignmentMaxAggregateOutputType | null
  }

  export type AssignmentAvgAggregateOutputType = {
    id: number | null
    classId: number | null
  }

  export type AssignmentSumAggregateOutputType = {
    id: number | null
    classId: number | null
  }

  export type AssignmentMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    createdAt: Date | null
    classId: number | null
    deadline: Date | null
  }

  export type AssignmentMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    createdAt: Date | null
    classId: number | null
    deadline: Date | null
  }

  export type AssignmentCountAggregateOutputType = {
    id: number
    title: number
    description: number
    createdAt: number
    classId: number
    deadline: number
    _all: number
  }


  export type AssignmentAvgAggregateInputType = {
    id?: true
    classId?: true
  }

  export type AssignmentSumAggregateInputType = {
    id?: true
    classId?: true
  }

  export type AssignmentMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    createdAt?: true
    classId?: true
    deadline?: true
  }

  export type AssignmentMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    createdAt?: true
    classId?: true
    deadline?: true
  }

  export type AssignmentCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    createdAt?: true
    classId?: true
    deadline?: true
    _all?: true
  }

  export type AssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assignment to aggregate.
     */
    where?: AssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assignments to fetch.
     */
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assignments
    **/
    _count?: true | AssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssignmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssignmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssignmentMaxAggregateInputType
  }

  export type GetAssignmentAggregateType<T extends AssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssignment[P]>
      : GetScalarType<T[P], AggregateAssignment[P]>
  }




  export type AssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssignmentWhereInput
    orderBy?: AssignmentOrderByWithAggregationInput | AssignmentOrderByWithAggregationInput[]
    by: AssignmentScalarFieldEnum[] | AssignmentScalarFieldEnum
    having?: AssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssignmentCountAggregateInputType | true
    _avg?: AssignmentAvgAggregateInputType
    _sum?: AssignmentSumAggregateInputType
    _min?: AssignmentMinAggregateInputType
    _max?: AssignmentMaxAggregateInputType
  }

  export type AssignmentGroupByOutputType = {
    id: number
    title: string
    description: string
    createdAt: Date
    classId: number
    deadline: Date
    _count: AssignmentCountAggregateOutputType | null
    _avg: AssignmentAvgAggregateOutputType | null
    _sum: AssignmentSumAggregateOutputType | null
    _min: AssignmentMinAggregateOutputType | null
    _max: AssignmentMaxAggregateOutputType | null
  }

  type GetAssignmentGroupByPayload<T extends AssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], AssignmentGroupByOutputType[P]>
        }
      >
    >


  export type AssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    classId?: boolean
    deadline?: boolean
    class?: boolean | ClassDefaultArgs<ExtArgs>
    problems?: boolean | Assignment$problemsArgs<ExtArgs>
    submissions?: boolean | Assignment$submissionsArgs<ExtArgs>
    problemSubs?: boolean | Assignment$problemSubsArgs<ExtArgs>
    _count?: boolean | AssignmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assignment"]>

  export type AssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    classId?: boolean
    deadline?: boolean
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assignment"]>

  export type AssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    classId?: boolean
    deadline?: boolean
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assignment"]>

  export type AssignmentSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    classId?: boolean
    deadline?: boolean
  }

  export type AssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "createdAt" | "classId" | "deadline", ExtArgs["result"]["assignment"]>
  export type AssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassDefaultArgs<ExtArgs>
    problems?: boolean | Assignment$problemsArgs<ExtArgs>
    submissions?: boolean | Assignment$submissionsArgs<ExtArgs>
    problemSubs?: boolean | Assignment$problemSubsArgs<ExtArgs>
    _count?: boolean | AssignmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }
  export type AssignmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }

  export type $AssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Assignment"
    objects: {
      class: Prisma.$ClassPayload<ExtArgs>
      problems: Prisma.$ProblemPayload<ExtArgs>[]
      submissions: Prisma.$AssignmentSubmissionPayload<ExtArgs>[]
      problemSubs: Prisma.$ProblemSubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string
      createdAt: Date
      classId: number
      deadline: Date
    }, ExtArgs["result"]["assignment"]>
    composites: {}
  }

  type AssignmentGetPayload<S extends boolean | null | undefined | AssignmentDefaultArgs> = $Result.GetResult<Prisma.$AssignmentPayload, S>

  type AssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssignmentCountAggregateInputType | true
    }

  export interface AssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Assignment'], meta: { name: 'Assignment' } }
    /**
     * Find zero or one Assignment that matches the filter.
     * @param {AssignmentFindUniqueArgs} args - Arguments to find a Assignment
     * @example
     * // Get one Assignment
     * const assignment = await prisma.assignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssignmentFindUniqueArgs>(args: SelectSubset<T, AssignmentFindUniqueArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Assignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssignmentFindUniqueOrThrowArgs} args - Arguments to find a Assignment
     * @example
     * // Get one Assignment
     * const assignment = await prisma.assignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentFindFirstArgs} args - Arguments to find a Assignment
     * @example
     * // Get one Assignment
     * const assignment = await prisma.assignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssignmentFindFirstArgs>(args?: SelectSubset<T, AssignmentFindFirstArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentFindFirstOrThrowArgs} args - Arguments to find a Assignment
     * @example
     * // Get one Assignment
     * const assignment = await prisma.assignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assignments
     * const assignments = await prisma.assignment.findMany()
     * 
     * // Get first 10 Assignments
     * const assignments = await prisma.assignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assignmentWithIdOnly = await prisma.assignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssignmentFindManyArgs>(args?: SelectSubset<T, AssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Assignment.
     * @param {AssignmentCreateArgs} args - Arguments to create a Assignment.
     * @example
     * // Create one Assignment
     * const Assignment = await prisma.assignment.create({
     *   data: {
     *     // ... data to create a Assignment
     *   }
     * })
     * 
     */
    create<T extends AssignmentCreateArgs>(args: SelectSubset<T, AssignmentCreateArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assignments.
     * @param {AssignmentCreateManyArgs} args - Arguments to create many Assignments.
     * @example
     * // Create many Assignments
     * const assignment = await prisma.assignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssignmentCreateManyArgs>(args?: SelectSubset<T, AssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assignments and returns the data saved in the database.
     * @param {AssignmentCreateManyAndReturnArgs} args - Arguments to create many Assignments.
     * @example
     * // Create many Assignments
     * const assignment = await prisma.assignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assignments and only return the `id`
     * const assignmentWithIdOnly = await prisma.assignment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Assignment.
     * @param {AssignmentDeleteArgs} args - Arguments to delete one Assignment.
     * @example
     * // Delete one Assignment
     * const Assignment = await prisma.assignment.delete({
     *   where: {
     *     // ... filter to delete one Assignment
     *   }
     * })
     * 
     */
    delete<T extends AssignmentDeleteArgs>(args: SelectSubset<T, AssignmentDeleteArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Assignment.
     * @param {AssignmentUpdateArgs} args - Arguments to update one Assignment.
     * @example
     * // Update one Assignment
     * const assignment = await prisma.assignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssignmentUpdateArgs>(args: SelectSubset<T, AssignmentUpdateArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assignments.
     * @param {AssignmentDeleteManyArgs} args - Arguments to filter Assignments to delete.
     * @example
     * // Delete a few Assignments
     * const { count } = await prisma.assignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssignmentDeleteManyArgs>(args?: SelectSubset<T, AssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assignments
     * const assignment = await prisma.assignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssignmentUpdateManyArgs>(args: SelectSubset<T, AssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assignments and returns the data updated in the database.
     * @param {AssignmentUpdateManyAndReturnArgs} args - Arguments to update many Assignments.
     * @example
     * // Update many Assignments
     * const assignment = await prisma.assignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Assignments and only return the `id`
     * const assignmentWithIdOnly = await prisma.assignment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AssignmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Assignment.
     * @param {AssignmentUpsertArgs} args - Arguments to update or create a Assignment.
     * @example
     * // Update or create a Assignment
     * const assignment = await prisma.assignment.upsert({
     *   create: {
     *     // ... data to create a Assignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assignment we want to update
     *   }
     * })
     */
    upsert<T extends AssignmentUpsertArgs>(args: SelectSubset<T, AssignmentUpsertArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Assignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentCountArgs} args - Arguments to filter Assignments to count.
     * @example
     * // Count the number of Assignments
     * const count = await prisma.assignment.count({
     *   where: {
     *     // ... the filter for the Assignments we want to count
     *   }
     * })
    **/
    count<T extends AssignmentCountArgs>(
      args?: Subset<T, AssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssignmentAggregateArgs>(args: Subset<T, AssignmentAggregateArgs>): Prisma.PrismaPromise<GetAssignmentAggregateType<T>>

    /**
     * Group by Assignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssignmentGroupByArgs['orderBy'] }
        : { orderBy?: AssignmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Assignment model
   */
  readonly fields: AssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Assignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    class<T extends ClassDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassDefaultArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    problems<T extends Assignment$problemsArgs<ExtArgs> = {}>(args?: Subset<T, Assignment$problemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    submissions<T extends Assignment$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, Assignment$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    problemSubs<T extends Assignment$problemSubsArgs<ExtArgs> = {}>(args?: Subset<T, Assignment$problemSubsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Assignment model
   */
  interface AssignmentFieldRefs {
    readonly id: FieldRef<"Assignment", 'Int'>
    readonly title: FieldRef<"Assignment", 'String'>
    readonly description: FieldRef<"Assignment", 'String'>
    readonly createdAt: FieldRef<"Assignment", 'DateTime'>
    readonly classId: FieldRef<"Assignment", 'Int'>
    readonly deadline: FieldRef<"Assignment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Assignment findUnique
   */
  export type AssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignment to fetch.
     */
    where: AssignmentWhereUniqueInput
  }

  /**
   * Assignment findUniqueOrThrow
   */
  export type AssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignment to fetch.
     */
    where: AssignmentWhereUniqueInput
  }

  /**
   * Assignment findFirst
   */
  export type AssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignment to fetch.
     */
    where?: AssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assignments to fetch.
     */
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assignments.
     */
    cursor?: AssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assignments.
     */
    distinct?: AssignmentScalarFieldEnum | AssignmentScalarFieldEnum[]
  }

  /**
   * Assignment findFirstOrThrow
   */
  export type AssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignment to fetch.
     */
    where?: AssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assignments to fetch.
     */
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assignments.
     */
    cursor?: AssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assignments.
     */
    distinct?: AssignmentScalarFieldEnum | AssignmentScalarFieldEnum[]
  }

  /**
   * Assignment findMany
   */
  export type AssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignments to fetch.
     */
    where?: AssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assignments to fetch.
     */
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assignments.
     */
    cursor?: AssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assignments.
     */
    skip?: number
    distinct?: AssignmentScalarFieldEnum | AssignmentScalarFieldEnum[]
  }

  /**
   * Assignment create
   */
  export type AssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Assignment.
     */
    data: XOR<AssignmentCreateInput, AssignmentUncheckedCreateInput>
  }

  /**
   * Assignment createMany
   */
  export type AssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assignments.
     */
    data: AssignmentCreateManyInput | AssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Assignment createManyAndReturn
   */
  export type AssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * The data used to create many Assignments.
     */
    data: AssignmentCreateManyInput | AssignmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assignment update
   */
  export type AssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Assignment.
     */
    data: XOR<AssignmentUpdateInput, AssignmentUncheckedUpdateInput>
    /**
     * Choose, which Assignment to update.
     */
    where: AssignmentWhereUniqueInput
  }

  /**
   * Assignment updateMany
   */
  export type AssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assignments.
     */
    data: XOR<AssignmentUpdateManyMutationInput, AssignmentUncheckedUpdateManyInput>
    /**
     * Filter which Assignments to update
     */
    where?: AssignmentWhereInput
    /**
     * Limit how many Assignments to update.
     */
    limit?: number
  }

  /**
   * Assignment updateManyAndReturn
   */
  export type AssignmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * The data used to update Assignments.
     */
    data: XOR<AssignmentUpdateManyMutationInput, AssignmentUncheckedUpdateManyInput>
    /**
     * Filter which Assignments to update
     */
    where?: AssignmentWhereInput
    /**
     * Limit how many Assignments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assignment upsert
   */
  export type AssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Assignment to update in case it exists.
     */
    where: AssignmentWhereUniqueInput
    /**
     * In case the Assignment found by the `where` argument doesn't exist, create a new Assignment with this data.
     */
    create: XOR<AssignmentCreateInput, AssignmentUncheckedCreateInput>
    /**
     * In case the Assignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssignmentUpdateInput, AssignmentUncheckedUpdateInput>
  }

  /**
   * Assignment delete
   */
  export type AssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter which Assignment to delete.
     */
    where: AssignmentWhereUniqueInput
  }

  /**
   * Assignment deleteMany
   */
  export type AssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assignments to delete
     */
    where?: AssignmentWhereInput
    /**
     * Limit how many Assignments to delete.
     */
    limit?: number
  }

  /**
   * Assignment.problems
   */
  export type Assignment$problemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    where?: ProblemWhereInput
    orderBy?: ProblemOrderByWithRelationInput | ProblemOrderByWithRelationInput[]
    cursor?: ProblemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProblemScalarFieldEnum | ProblemScalarFieldEnum[]
  }

  /**
   * Assignment.submissions
   */
  export type Assignment$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentSubmission
     */
    select?: AssignmentSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentSubmission
     */
    omit?: AssignmentSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentSubmissionInclude<ExtArgs> | null
    where?: AssignmentSubmissionWhereInput
    orderBy?: AssignmentSubmissionOrderByWithRelationInput | AssignmentSubmissionOrderByWithRelationInput[]
    cursor?: AssignmentSubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssignmentSubmissionScalarFieldEnum | AssignmentSubmissionScalarFieldEnum[]
  }

  /**
   * Assignment.problemSubs
   */
  export type Assignment$problemSubsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSubmission
     */
    select?: ProblemSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSubmission
     */
    omit?: ProblemSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSubmissionInclude<ExtArgs> | null
    where?: ProblemSubmissionWhereInput
    orderBy?: ProblemSubmissionOrderByWithRelationInput | ProblemSubmissionOrderByWithRelationInput[]
    cursor?: ProblemSubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProblemSubmissionScalarFieldEnum | ProblemSubmissionScalarFieldEnum[]
  }

  /**
   * Assignment without action
   */
  export type AssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
  }


  /**
   * Model Problem
   */

  export type AggregateProblem = {
    _count: ProblemCountAggregateOutputType | null
    _avg: ProblemAvgAggregateOutputType | null
    _sum: ProblemSumAggregateOutputType | null
    _min: ProblemMinAggregateOutputType | null
    _max: ProblemMaxAggregateOutputType | null
  }

  export type ProblemAvgAggregateOutputType = {
    id: number | null
    assignmentId: number | null
  }

  export type ProblemSumAggregateOutputType = {
    id: number | null
    assignmentId: number | null
  }

  export type ProblemMinAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    assignmentId: number | null
    expectedOutput: string | null
  }

  export type ProblemMaxAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    assignmentId: number | null
    expectedOutput: string | null
  }

  export type ProblemCountAggregateOutputType = {
    id: number
    title: number
    content: number
    assignmentId: number
    expectedOutput: number
    _all: number
  }


  export type ProblemAvgAggregateInputType = {
    id?: true
    assignmentId?: true
  }

  export type ProblemSumAggregateInputType = {
    id?: true
    assignmentId?: true
  }

  export type ProblemMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    assignmentId?: true
    expectedOutput?: true
  }

  export type ProblemMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    assignmentId?: true
    expectedOutput?: true
  }

  export type ProblemCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    assignmentId?: true
    expectedOutput?: true
    _all?: true
  }

  export type ProblemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Problem to aggregate.
     */
    where?: ProblemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Problems to fetch.
     */
    orderBy?: ProblemOrderByWithRelationInput | ProblemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProblemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Problems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Problems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Problems
    **/
    _count?: true | ProblemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProblemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProblemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProblemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProblemMaxAggregateInputType
  }

  export type GetProblemAggregateType<T extends ProblemAggregateArgs> = {
        [P in keyof T & keyof AggregateProblem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProblem[P]>
      : GetScalarType<T[P], AggregateProblem[P]>
  }




  export type ProblemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemWhereInput
    orderBy?: ProblemOrderByWithAggregationInput | ProblemOrderByWithAggregationInput[]
    by: ProblemScalarFieldEnum[] | ProblemScalarFieldEnum
    having?: ProblemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProblemCountAggregateInputType | true
    _avg?: ProblemAvgAggregateInputType
    _sum?: ProblemSumAggregateInputType
    _min?: ProblemMinAggregateInputType
    _max?: ProblemMaxAggregateInputType
  }

  export type ProblemGroupByOutputType = {
    id: number
    title: string
    content: string
    assignmentId: number
    expectedOutput: string
    _count: ProblemCountAggregateOutputType | null
    _avg: ProblemAvgAggregateOutputType | null
    _sum: ProblemSumAggregateOutputType | null
    _min: ProblemMinAggregateOutputType | null
    _max: ProblemMaxAggregateOutputType | null
  }

  type GetProblemGroupByPayload<T extends ProblemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProblemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProblemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProblemGroupByOutputType[P]>
            : GetScalarType<T[P], ProblemGroupByOutputType[P]>
        }
      >
    >


  export type ProblemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    assignmentId?: boolean
    expectedOutput?: boolean
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
    problemSubs?: boolean | Problem$problemSubsArgs<ExtArgs>
    _count?: boolean | ProblemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["problem"]>

  export type ProblemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    assignmentId?: boolean
    expectedOutput?: boolean
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["problem"]>

  export type ProblemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    assignmentId?: boolean
    expectedOutput?: boolean
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["problem"]>

  export type ProblemSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    assignmentId?: boolean
    expectedOutput?: boolean
  }

  export type ProblemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "assignmentId" | "expectedOutput", ExtArgs["result"]["problem"]>
  export type ProblemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
    problemSubs?: boolean | Problem$problemSubsArgs<ExtArgs>
    _count?: boolean | ProblemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProblemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
  }
  export type ProblemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
  }

  export type $ProblemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Problem"
    objects: {
      assignment: Prisma.$AssignmentPayload<ExtArgs>
      problemSubs: Prisma.$ProblemSubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      content: string
      assignmentId: number
      expectedOutput: string
    }, ExtArgs["result"]["problem"]>
    composites: {}
  }

  type ProblemGetPayload<S extends boolean | null | undefined | ProblemDefaultArgs> = $Result.GetResult<Prisma.$ProblemPayload, S>

  type ProblemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProblemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProblemCountAggregateInputType | true
    }

  export interface ProblemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Problem'], meta: { name: 'Problem' } }
    /**
     * Find zero or one Problem that matches the filter.
     * @param {ProblemFindUniqueArgs} args - Arguments to find a Problem
     * @example
     * // Get one Problem
     * const problem = await prisma.problem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProblemFindUniqueArgs>(args: SelectSubset<T, ProblemFindUniqueArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Problem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProblemFindUniqueOrThrowArgs} args - Arguments to find a Problem
     * @example
     * // Get one Problem
     * const problem = await prisma.problem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProblemFindUniqueOrThrowArgs>(args: SelectSubset<T, ProblemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Problem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemFindFirstArgs} args - Arguments to find a Problem
     * @example
     * // Get one Problem
     * const problem = await prisma.problem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProblemFindFirstArgs>(args?: SelectSubset<T, ProblemFindFirstArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Problem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemFindFirstOrThrowArgs} args - Arguments to find a Problem
     * @example
     * // Get one Problem
     * const problem = await prisma.problem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProblemFindFirstOrThrowArgs>(args?: SelectSubset<T, ProblemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Problems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Problems
     * const problems = await prisma.problem.findMany()
     * 
     * // Get first 10 Problems
     * const problems = await prisma.problem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const problemWithIdOnly = await prisma.problem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProblemFindManyArgs>(args?: SelectSubset<T, ProblemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Problem.
     * @param {ProblemCreateArgs} args - Arguments to create a Problem.
     * @example
     * // Create one Problem
     * const Problem = await prisma.problem.create({
     *   data: {
     *     // ... data to create a Problem
     *   }
     * })
     * 
     */
    create<T extends ProblemCreateArgs>(args: SelectSubset<T, ProblemCreateArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Problems.
     * @param {ProblemCreateManyArgs} args - Arguments to create many Problems.
     * @example
     * // Create many Problems
     * const problem = await prisma.problem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProblemCreateManyArgs>(args?: SelectSubset<T, ProblemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Problems and returns the data saved in the database.
     * @param {ProblemCreateManyAndReturnArgs} args - Arguments to create many Problems.
     * @example
     * // Create many Problems
     * const problem = await prisma.problem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Problems and only return the `id`
     * const problemWithIdOnly = await prisma.problem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProblemCreateManyAndReturnArgs>(args?: SelectSubset<T, ProblemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Problem.
     * @param {ProblemDeleteArgs} args - Arguments to delete one Problem.
     * @example
     * // Delete one Problem
     * const Problem = await prisma.problem.delete({
     *   where: {
     *     // ... filter to delete one Problem
     *   }
     * })
     * 
     */
    delete<T extends ProblemDeleteArgs>(args: SelectSubset<T, ProblemDeleteArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Problem.
     * @param {ProblemUpdateArgs} args - Arguments to update one Problem.
     * @example
     * // Update one Problem
     * const problem = await prisma.problem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProblemUpdateArgs>(args: SelectSubset<T, ProblemUpdateArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Problems.
     * @param {ProblemDeleteManyArgs} args - Arguments to filter Problems to delete.
     * @example
     * // Delete a few Problems
     * const { count } = await prisma.problem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProblemDeleteManyArgs>(args?: SelectSubset<T, ProblemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Problems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Problems
     * const problem = await prisma.problem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProblemUpdateManyArgs>(args: SelectSubset<T, ProblemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Problems and returns the data updated in the database.
     * @param {ProblemUpdateManyAndReturnArgs} args - Arguments to update many Problems.
     * @example
     * // Update many Problems
     * const problem = await prisma.problem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Problems and only return the `id`
     * const problemWithIdOnly = await prisma.problem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProblemUpdateManyAndReturnArgs>(args: SelectSubset<T, ProblemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Problem.
     * @param {ProblemUpsertArgs} args - Arguments to update or create a Problem.
     * @example
     * // Update or create a Problem
     * const problem = await prisma.problem.upsert({
     *   create: {
     *     // ... data to create a Problem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Problem we want to update
     *   }
     * })
     */
    upsert<T extends ProblemUpsertArgs>(args: SelectSubset<T, ProblemUpsertArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Problems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemCountArgs} args - Arguments to filter Problems to count.
     * @example
     * // Count the number of Problems
     * const count = await prisma.problem.count({
     *   where: {
     *     // ... the filter for the Problems we want to count
     *   }
     * })
    **/
    count<T extends ProblemCountArgs>(
      args?: Subset<T, ProblemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProblemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Problem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProblemAggregateArgs>(args: Subset<T, ProblemAggregateArgs>): Prisma.PrismaPromise<GetProblemAggregateType<T>>

    /**
     * Group by Problem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProblemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProblemGroupByArgs['orderBy'] }
        : { orderBy?: ProblemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProblemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProblemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Problem model
   */
  readonly fields: ProblemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Problem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProblemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignment<T extends AssignmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssignmentDefaultArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    problemSubs<T extends Problem$problemSubsArgs<ExtArgs> = {}>(args?: Subset<T, Problem$problemSubsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Problem model
   */
  interface ProblemFieldRefs {
    readonly id: FieldRef<"Problem", 'Int'>
    readonly title: FieldRef<"Problem", 'String'>
    readonly content: FieldRef<"Problem", 'String'>
    readonly assignmentId: FieldRef<"Problem", 'Int'>
    readonly expectedOutput: FieldRef<"Problem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Problem findUnique
   */
  export type ProblemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problem to fetch.
     */
    where: ProblemWhereUniqueInput
  }

  /**
   * Problem findUniqueOrThrow
   */
  export type ProblemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problem to fetch.
     */
    where: ProblemWhereUniqueInput
  }

  /**
   * Problem findFirst
   */
  export type ProblemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problem to fetch.
     */
    where?: ProblemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Problems to fetch.
     */
    orderBy?: ProblemOrderByWithRelationInput | ProblemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Problems.
     */
    cursor?: ProblemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Problems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Problems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Problems.
     */
    distinct?: ProblemScalarFieldEnum | ProblemScalarFieldEnum[]
  }

  /**
   * Problem findFirstOrThrow
   */
  export type ProblemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problem to fetch.
     */
    where?: ProblemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Problems to fetch.
     */
    orderBy?: ProblemOrderByWithRelationInput | ProblemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Problems.
     */
    cursor?: ProblemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Problems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Problems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Problems.
     */
    distinct?: ProblemScalarFieldEnum | ProblemScalarFieldEnum[]
  }

  /**
   * Problem findMany
   */
  export type ProblemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter, which Problems to fetch.
     */
    where?: ProblemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Problems to fetch.
     */
    orderBy?: ProblemOrderByWithRelationInput | ProblemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Problems.
     */
    cursor?: ProblemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Problems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Problems.
     */
    skip?: number
    distinct?: ProblemScalarFieldEnum | ProblemScalarFieldEnum[]
  }

  /**
   * Problem create
   */
  export type ProblemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * The data needed to create a Problem.
     */
    data: XOR<ProblemCreateInput, ProblemUncheckedCreateInput>
  }

  /**
   * Problem createMany
   */
  export type ProblemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Problems.
     */
    data: ProblemCreateManyInput | ProblemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Problem createManyAndReturn
   */
  export type ProblemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * The data used to create many Problems.
     */
    data: ProblemCreateManyInput | ProblemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Problem update
   */
  export type ProblemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * The data needed to update a Problem.
     */
    data: XOR<ProblemUpdateInput, ProblemUncheckedUpdateInput>
    /**
     * Choose, which Problem to update.
     */
    where: ProblemWhereUniqueInput
  }

  /**
   * Problem updateMany
   */
  export type ProblemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Problems.
     */
    data: XOR<ProblemUpdateManyMutationInput, ProblemUncheckedUpdateManyInput>
    /**
     * Filter which Problems to update
     */
    where?: ProblemWhereInput
    /**
     * Limit how many Problems to update.
     */
    limit?: number
  }

  /**
   * Problem updateManyAndReturn
   */
  export type ProblemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * The data used to update Problems.
     */
    data: XOR<ProblemUpdateManyMutationInput, ProblemUncheckedUpdateManyInput>
    /**
     * Filter which Problems to update
     */
    where?: ProblemWhereInput
    /**
     * Limit how many Problems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Problem upsert
   */
  export type ProblemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * The filter to search for the Problem to update in case it exists.
     */
    where: ProblemWhereUniqueInput
    /**
     * In case the Problem found by the `where` argument doesn't exist, create a new Problem with this data.
     */
    create: XOR<ProblemCreateInput, ProblemUncheckedCreateInput>
    /**
     * In case the Problem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProblemUpdateInput, ProblemUncheckedUpdateInput>
  }

  /**
   * Problem delete
   */
  export type ProblemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
    /**
     * Filter which Problem to delete.
     */
    where: ProblemWhereUniqueInput
  }

  /**
   * Problem deleteMany
   */
  export type ProblemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Problems to delete
     */
    where?: ProblemWhereInput
    /**
     * Limit how many Problems to delete.
     */
    limit?: number
  }

  /**
   * Problem.problemSubs
   */
  export type Problem$problemSubsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSubmission
     */
    select?: ProblemSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSubmission
     */
    omit?: ProblemSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSubmissionInclude<ExtArgs> | null
    where?: ProblemSubmissionWhereInput
    orderBy?: ProblemSubmissionOrderByWithRelationInput | ProblemSubmissionOrderByWithRelationInput[]
    cursor?: ProblemSubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProblemSubmissionScalarFieldEnum | ProblemSubmissionScalarFieldEnum[]
  }

  /**
   * Problem without action
   */
  export type ProblemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Problem
     */
    select?: ProblemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Problem
     */
    omit?: ProblemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemInclude<ExtArgs> | null
  }


  /**
   * Model AssignmentSubmission
   */

  export type AggregateAssignmentSubmission = {
    _count: AssignmentSubmissionCountAggregateOutputType | null
    _avg: AssignmentSubmissionAvgAggregateOutputType | null
    _sum: AssignmentSubmissionSumAggregateOutputType | null
    _min: AssignmentSubmissionMinAggregateOutputType | null
    _max: AssignmentSubmissionMaxAggregateOutputType | null
  }

  export type AssignmentSubmissionAvgAggregateOutputType = {
    id: number | null
    student_id: number | null
    assignmentId: number | null
  }

  export type AssignmentSubmissionSumAggregateOutputType = {
    id: number | null
    student_id: number | null
    assignmentId: number | null
  }

  export type AssignmentSubmissionMinAggregateOutputType = {
    id: number | null
    student_id: number | null
    assignmentId: number | null
    isCompleted: boolean | null
    submittedAt: Date | null
  }

  export type AssignmentSubmissionMaxAggregateOutputType = {
    id: number | null
    student_id: number | null
    assignmentId: number | null
    isCompleted: boolean | null
    submittedAt: Date | null
  }

  export type AssignmentSubmissionCountAggregateOutputType = {
    id: number
    student_id: number
    assignmentId: number
    isCompleted: number
    submittedAt: number
    _all: number
  }


  export type AssignmentSubmissionAvgAggregateInputType = {
    id?: true
    student_id?: true
    assignmentId?: true
  }

  export type AssignmentSubmissionSumAggregateInputType = {
    id?: true
    student_id?: true
    assignmentId?: true
  }

  export type AssignmentSubmissionMinAggregateInputType = {
    id?: true
    student_id?: true
    assignmentId?: true
    isCompleted?: true
    submittedAt?: true
  }

  export type AssignmentSubmissionMaxAggregateInputType = {
    id?: true
    student_id?: true
    assignmentId?: true
    isCompleted?: true
    submittedAt?: true
  }

  export type AssignmentSubmissionCountAggregateInputType = {
    id?: true
    student_id?: true
    assignmentId?: true
    isCompleted?: true
    submittedAt?: true
    _all?: true
  }

  export type AssignmentSubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssignmentSubmission to aggregate.
     */
    where?: AssignmentSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssignmentSubmissions to fetch.
     */
    orderBy?: AssignmentSubmissionOrderByWithRelationInput | AssignmentSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssignmentSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssignmentSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssignmentSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AssignmentSubmissions
    **/
    _count?: true | AssignmentSubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssignmentSubmissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssignmentSubmissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssignmentSubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssignmentSubmissionMaxAggregateInputType
  }

  export type GetAssignmentSubmissionAggregateType<T extends AssignmentSubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateAssignmentSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssignmentSubmission[P]>
      : GetScalarType<T[P], AggregateAssignmentSubmission[P]>
  }




  export type AssignmentSubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssignmentSubmissionWhereInput
    orderBy?: AssignmentSubmissionOrderByWithAggregationInput | AssignmentSubmissionOrderByWithAggregationInput[]
    by: AssignmentSubmissionScalarFieldEnum[] | AssignmentSubmissionScalarFieldEnum
    having?: AssignmentSubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssignmentSubmissionCountAggregateInputType | true
    _avg?: AssignmentSubmissionAvgAggregateInputType
    _sum?: AssignmentSubmissionSumAggregateInputType
    _min?: AssignmentSubmissionMinAggregateInputType
    _max?: AssignmentSubmissionMaxAggregateInputType
  }

  export type AssignmentSubmissionGroupByOutputType = {
    id: number
    student_id: number
    assignmentId: number
    isCompleted: boolean
    submittedAt: Date
    _count: AssignmentSubmissionCountAggregateOutputType | null
    _avg: AssignmentSubmissionAvgAggregateOutputType | null
    _sum: AssignmentSubmissionSumAggregateOutputType | null
    _min: AssignmentSubmissionMinAggregateOutputType | null
    _max: AssignmentSubmissionMaxAggregateOutputType | null
  }

  type GetAssignmentSubmissionGroupByPayload<T extends AssignmentSubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssignmentSubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssignmentSubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssignmentSubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], AssignmentSubmissionGroupByOutputType[P]>
        }
      >
    >


  export type AssignmentSubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    assignmentId?: boolean
    isCompleted?: boolean
    submittedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
    problems?: boolean | AssignmentSubmission$problemsArgs<ExtArgs>
    _count?: boolean | AssignmentSubmissionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assignmentSubmission"]>

  export type AssignmentSubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    assignmentId?: boolean
    isCompleted?: boolean
    submittedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assignmentSubmission"]>

  export type AssignmentSubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    assignmentId?: boolean
    isCompleted?: boolean
    submittedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assignmentSubmission"]>

  export type AssignmentSubmissionSelectScalar = {
    id?: boolean
    student_id?: boolean
    assignmentId?: boolean
    isCompleted?: boolean
    submittedAt?: boolean
  }

  export type AssignmentSubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "student_id" | "assignmentId" | "isCompleted" | "submittedAt", ExtArgs["result"]["assignmentSubmission"]>
  export type AssignmentSubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
    problems?: boolean | AssignmentSubmission$problemsArgs<ExtArgs>
    _count?: boolean | AssignmentSubmissionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AssignmentSubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
  }
  export type AssignmentSubmissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
  }

  export type $AssignmentSubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AssignmentSubmission"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      assignment: Prisma.$AssignmentPayload<ExtArgs>
      problems: Prisma.$ProblemSubmissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      student_id: number
      assignmentId: number
      isCompleted: boolean
      submittedAt: Date
    }, ExtArgs["result"]["assignmentSubmission"]>
    composites: {}
  }

  type AssignmentSubmissionGetPayload<S extends boolean | null | undefined | AssignmentSubmissionDefaultArgs> = $Result.GetResult<Prisma.$AssignmentSubmissionPayload, S>

  type AssignmentSubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssignmentSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssignmentSubmissionCountAggregateInputType | true
    }

  export interface AssignmentSubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AssignmentSubmission'], meta: { name: 'AssignmentSubmission' } }
    /**
     * Find zero or one AssignmentSubmission that matches the filter.
     * @param {AssignmentSubmissionFindUniqueArgs} args - Arguments to find a AssignmentSubmission
     * @example
     * // Get one AssignmentSubmission
     * const assignmentSubmission = await prisma.assignmentSubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssignmentSubmissionFindUniqueArgs>(args: SelectSubset<T, AssignmentSubmissionFindUniqueArgs<ExtArgs>>): Prisma__AssignmentSubmissionClient<$Result.GetResult<Prisma.$AssignmentSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AssignmentSubmission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssignmentSubmissionFindUniqueOrThrowArgs} args - Arguments to find a AssignmentSubmission
     * @example
     * // Get one AssignmentSubmission
     * const assignmentSubmission = await prisma.assignmentSubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssignmentSubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, AssignmentSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssignmentSubmissionClient<$Result.GetResult<Prisma.$AssignmentSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssignmentSubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentSubmissionFindFirstArgs} args - Arguments to find a AssignmentSubmission
     * @example
     * // Get one AssignmentSubmission
     * const assignmentSubmission = await prisma.assignmentSubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssignmentSubmissionFindFirstArgs>(args?: SelectSubset<T, AssignmentSubmissionFindFirstArgs<ExtArgs>>): Prisma__AssignmentSubmissionClient<$Result.GetResult<Prisma.$AssignmentSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AssignmentSubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentSubmissionFindFirstOrThrowArgs} args - Arguments to find a AssignmentSubmission
     * @example
     * // Get one AssignmentSubmission
     * const assignmentSubmission = await prisma.assignmentSubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssignmentSubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, AssignmentSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssignmentSubmissionClient<$Result.GetResult<Prisma.$AssignmentSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AssignmentSubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentSubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssignmentSubmissions
     * const assignmentSubmissions = await prisma.assignmentSubmission.findMany()
     * 
     * // Get first 10 AssignmentSubmissions
     * const assignmentSubmissions = await prisma.assignmentSubmission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assignmentSubmissionWithIdOnly = await prisma.assignmentSubmission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssignmentSubmissionFindManyArgs>(args?: SelectSubset<T, AssignmentSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AssignmentSubmission.
     * @param {AssignmentSubmissionCreateArgs} args - Arguments to create a AssignmentSubmission.
     * @example
     * // Create one AssignmentSubmission
     * const AssignmentSubmission = await prisma.assignmentSubmission.create({
     *   data: {
     *     // ... data to create a AssignmentSubmission
     *   }
     * })
     * 
     */
    create<T extends AssignmentSubmissionCreateArgs>(args: SelectSubset<T, AssignmentSubmissionCreateArgs<ExtArgs>>): Prisma__AssignmentSubmissionClient<$Result.GetResult<Prisma.$AssignmentSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AssignmentSubmissions.
     * @param {AssignmentSubmissionCreateManyArgs} args - Arguments to create many AssignmentSubmissions.
     * @example
     * // Create many AssignmentSubmissions
     * const assignmentSubmission = await prisma.assignmentSubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssignmentSubmissionCreateManyArgs>(args?: SelectSubset<T, AssignmentSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AssignmentSubmissions and returns the data saved in the database.
     * @param {AssignmentSubmissionCreateManyAndReturnArgs} args - Arguments to create many AssignmentSubmissions.
     * @example
     * // Create many AssignmentSubmissions
     * const assignmentSubmission = await prisma.assignmentSubmission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AssignmentSubmissions and only return the `id`
     * const assignmentSubmissionWithIdOnly = await prisma.assignmentSubmission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssignmentSubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, AssignmentSubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentSubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AssignmentSubmission.
     * @param {AssignmentSubmissionDeleteArgs} args - Arguments to delete one AssignmentSubmission.
     * @example
     * // Delete one AssignmentSubmission
     * const AssignmentSubmission = await prisma.assignmentSubmission.delete({
     *   where: {
     *     // ... filter to delete one AssignmentSubmission
     *   }
     * })
     * 
     */
    delete<T extends AssignmentSubmissionDeleteArgs>(args: SelectSubset<T, AssignmentSubmissionDeleteArgs<ExtArgs>>): Prisma__AssignmentSubmissionClient<$Result.GetResult<Prisma.$AssignmentSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AssignmentSubmission.
     * @param {AssignmentSubmissionUpdateArgs} args - Arguments to update one AssignmentSubmission.
     * @example
     * // Update one AssignmentSubmission
     * const assignmentSubmission = await prisma.assignmentSubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssignmentSubmissionUpdateArgs>(args: SelectSubset<T, AssignmentSubmissionUpdateArgs<ExtArgs>>): Prisma__AssignmentSubmissionClient<$Result.GetResult<Prisma.$AssignmentSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AssignmentSubmissions.
     * @param {AssignmentSubmissionDeleteManyArgs} args - Arguments to filter AssignmentSubmissions to delete.
     * @example
     * // Delete a few AssignmentSubmissions
     * const { count } = await prisma.assignmentSubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssignmentSubmissionDeleteManyArgs>(args?: SelectSubset<T, AssignmentSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssignmentSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentSubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssignmentSubmissions
     * const assignmentSubmission = await prisma.assignmentSubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssignmentSubmissionUpdateManyArgs>(args: SelectSubset<T, AssignmentSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AssignmentSubmissions and returns the data updated in the database.
     * @param {AssignmentSubmissionUpdateManyAndReturnArgs} args - Arguments to update many AssignmentSubmissions.
     * @example
     * // Update many AssignmentSubmissions
     * const assignmentSubmission = await prisma.assignmentSubmission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AssignmentSubmissions and only return the `id`
     * const assignmentSubmissionWithIdOnly = await prisma.assignmentSubmission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AssignmentSubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, AssignmentSubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentSubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AssignmentSubmission.
     * @param {AssignmentSubmissionUpsertArgs} args - Arguments to update or create a AssignmentSubmission.
     * @example
     * // Update or create a AssignmentSubmission
     * const assignmentSubmission = await prisma.assignmentSubmission.upsert({
     *   create: {
     *     // ... data to create a AssignmentSubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssignmentSubmission we want to update
     *   }
     * })
     */
    upsert<T extends AssignmentSubmissionUpsertArgs>(args: SelectSubset<T, AssignmentSubmissionUpsertArgs<ExtArgs>>): Prisma__AssignmentSubmissionClient<$Result.GetResult<Prisma.$AssignmentSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AssignmentSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentSubmissionCountArgs} args - Arguments to filter AssignmentSubmissions to count.
     * @example
     * // Count the number of AssignmentSubmissions
     * const count = await prisma.assignmentSubmission.count({
     *   where: {
     *     // ... the filter for the AssignmentSubmissions we want to count
     *   }
     * })
    **/
    count<T extends AssignmentSubmissionCountArgs>(
      args?: Subset<T, AssignmentSubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssignmentSubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AssignmentSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentSubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssignmentSubmissionAggregateArgs>(args: Subset<T, AssignmentSubmissionAggregateArgs>): Prisma.PrismaPromise<GetAssignmentSubmissionAggregateType<T>>

    /**
     * Group by AssignmentSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentSubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssignmentSubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssignmentSubmissionGroupByArgs['orderBy'] }
        : { orderBy?: AssignmentSubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssignmentSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssignmentSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AssignmentSubmission model
   */
  readonly fields: AssignmentSubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AssignmentSubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssignmentSubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assignment<T extends AssignmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssignmentDefaultArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    problems<T extends AssignmentSubmission$problemsArgs<ExtArgs> = {}>(args?: Subset<T, AssignmentSubmission$problemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AssignmentSubmission model
   */
  interface AssignmentSubmissionFieldRefs {
    readonly id: FieldRef<"AssignmentSubmission", 'Int'>
    readonly student_id: FieldRef<"AssignmentSubmission", 'Int'>
    readonly assignmentId: FieldRef<"AssignmentSubmission", 'Int'>
    readonly isCompleted: FieldRef<"AssignmentSubmission", 'Boolean'>
    readonly submittedAt: FieldRef<"AssignmentSubmission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AssignmentSubmission findUnique
   */
  export type AssignmentSubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentSubmission
     */
    select?: AssignmentSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentSubmission
     */
    omit?: AssignmentSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which AssignmentSubmission to fetch.
     */
    where: AssignmentSubmissionWhereUniqueInput
  }

  /**
   * AssignmentSubmission findUniqueOrThrow
   */
  export type AssignmentSubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentSubmission
     */
    select?: AssignmentSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentSubmission
     */
    omit?: AssignmentSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which AssignmentSubmission to fetch.
     */
    where: AssignmentSubmissionWhereUniqueInput
  }

  /**
   * AssignmentSubmission findFirst
   */
  export type AssignmentSubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentSubmission
     */
    select?: AssignmentSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentSubmission
     */
    omit?: AssignmentSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which AssignmentSubmission to fetch.
     */
    where?: AssignmentSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssignmentSubmissions to fetch.
     */
    orderBy?: AssignmentSubmissionOrderByWithRelationInput | AssignmentSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssignmentSubmissions.
     */
    cursor?: AssignmentSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssignmentSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssignmentSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssignmentSubmissions.
     */
    distinct?: AssignmentSubmissionScalarFieldEnum | AssignmentSubmissionScalarFieldEnum[]
  }

  /**
   * AssignmentSubmission findFirstOrThrow
   */
  export type AssignmentSubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentSubmission
     */
    select?: AssignmentSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentSubmission
     */
    omit?: AssignmentSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which AssignmentSubmission to fetch.
     */
    where?: AssignmentSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssignmentSubmissions to fetch.
     */
    orderBy?: AssignmentSubmissionOrderByWithRelationInput | AssignmentSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AssignmentSubmissions.
     */
    cursor?: AssignmentSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssignmentSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssignmentSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AssignmentSubmissions.
     */
    distinct?: AssignmentSubmissionScalarFieldEnum | AssignmentSubmissionScalarFieldEnum[]
  }

  /**
   * AssignmentSubmission findMany
   */
  export type AssignmentSubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentSubmission
     */
    select?: AssignmentSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentSubmission
     */
    omit?: AssignmentSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which AssignmentSubmissions to fetch.
     */
    where?: AssignmentSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AssignmentSubmissions to fetch.
     */
    orderBy?: AssignmentSubmissionOrderByWithRelationInput | AssignmentSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AssignmentSubmissions.
     */
    cursor?: AssignmentSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AssignmentSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AssignmentSubmissions.
     */
    skip?: number
    distinct?: AssignmentSubmissionScalarFieldEnum | AssignmentSubmissionScalarFieldEnum[]
  }

  /**
   * AssignmentSubmission create
   */
  export type AssignmentSubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentSubmission
     */
    select?: AssignmentSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentSubmission
     */
    omit?: AssignmentSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a AssignmentSubmission.
     */
    data: XOR<AssignmentSubmissionCreateInput, AssignmentSubmissionUncheckedCreateInput>
  }

  /**
   * AssignmentSubmission createMany
   */
  export type AssignmentSubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssignmentSubmissions.
     */
    data: AssignmentSubmissionCreateManyInput | AssignmentSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AssignmentSubmission createManyAndReturn
   */
  export type AssignmentSubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentSubmission
     */
    select?: AssignmentSubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentSubmission
     */
    omit?: AssignmentSubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many AssignmentSubmissions.
     */
    data: AssignmentSubmissionCreateManyInput | AssignmentSubmissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentSubmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AssignmentSubmission update
   */
  export type AssignmentSubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentSubmission
     */
    select?: AssignmentSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentSubmission
     */
    omit?: AssignmentSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a AssignmentSubmission.
     */
    data: XOR<AssignmentSubmissionUpdateInput, AssignmentSubmissionUncheckedUpdateInput>
    /**
     * Choose, which AssignmentSubmission to update.
     */
    where: AssignmentSubmissionWhereUniqueInput
  }

  /**
   * AssignmentSubmission updateMany
   */
  export type AssignmentSubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AssignmentSubmissions.
     */
    data: XOR<AssignmentSubmissionUpdateManyMutationInput, AssignmentSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which AssignmentSubmissions to update
     */
    where?: AssignmentSubmissionWhereInput
    /**
     * Limit how many AssignmentSubmissions to update.
     */
    limit?: number
  }

  /**
   * AssignmentSubmission updateManyAndReturn
   */
  export type AssignmentSubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentSubmission
     */
    select?: AssignmentSubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentSubmission
     */
    omit?: AssignmentSubmissionOmit<ExtArgs> | null
    /**
     * The data used to update AssignmentSubmissions.
     */
    data: XOR<AssignmentSubmissionUpdateManyMutationInput, AssignmentSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which AssignmentSubmissions to update
     */
    where?: AssignmentSubmissionWhereInput
    /**
     * Limit how many AssignmentSubmissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentSubmissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AssignmentSubmission upsert
   */
  export type AssignmentSubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentSubmission
     */
    select?: AssignmentSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentSubmission
     */
    omit?: AssignmentSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentSubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the AssignmentSubmission to update in case it exists.
     */
    where: AssignmentSubmissionWhereUniqueInput
    /**
     * In case the AssignmentSubmission found by the `where` argument doesn't exist, create a new AssignmentSubmission with this data.
     */
    create: XOR<AssignmentSubmissionCreateInput, AssignmentSubmissionUncheckedCreateInput>
    /**
     * In case the AssignmentSubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssignmentSubmissionUpdateInput, AssignmentSubmissionUncheckedUpdateInput>
  }

  /**
   * AssignmentSubmission delete
   */
  export type AssignmentSubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentSubmission
     */
    select?: AssignmentSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentSubmission
     */
    omit?: AssignmentSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentSubmissionInclude<ExtArgs> | null
    /**
     * Filter which AssignmentSubmission to delete.
     */
    where: AssignmentSubmissionWhereUniqueInput
  }

  /**
   * AssignmentSubmission deleteMany
   */
  export type AssignmentSubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AssignmentSubmissions to delete
     */
    where?: AssignmentSubmissionWhereInput
    /**
     * Limit how many AssignmentSubmissions to delete.
     */
    limit?: number
  }

  /**
   * AssignmentSubmission.problems
   */
  export type AssignmentSubmission$problemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSubmission
     */
    select?: ProblemSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSubmission
     */
    omit?: ProblemSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSubmissionInclude<ExtArgs> | null
    where?: ProblemSubmissionWhereInput
    orderBy?: ProblemSubmissionOrderByWithRelationInput | ProblemSubmissionOrderByWithRelationInput[]
    cursor?: ProblemSubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProblemSubmissionScalarFieldEnum | ProblemSubmissionScalarFieldEnum[]
  }

  /**
   * AssignmentSubmission without action
   */
  export type AssignmentSubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentSubmission
     */
    select?: AssignmentSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentSubmission
     */
    omit?: AssignmentSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentSubmissionInclude<ExtArgs> | null
  }


  /**
   * Model ProblemSubmission
   */

  export type AggregateProblemSubmission = {
    _count: ProblemSubmissionCountAggregateOutputType | null
    _avg: ProblemSubmissionAvgAggregateOutputType | null
    _sum: ProblemSubmissionSumAggregateOutputType | null
    _min: ProblemSubmissionMinAggregateOutputType | null
    _max: ProblemSubmissionMaxAggregateOutputType | null
  }

  export type ProblemSubmissionAvgAggregateOutputType = {
    id: number | null
    student_id: number | null
    assignmentId: number | null
    problemId: number | null
  }

  export type ProblemSubmissionSumAggregateOutputType = {
    id: number | null
    student_id: number | null
    assignmentId: number | null
    problemId: number | null
  }

  export type ProblemSubmissionMinAggregateOutputType = {
    id: number | null
    student_id: number | null
    assignmentId: number | null
    problemId: number | null
    isCompleted: boolean | null
    submittedAt: Date | null
  }

  export type ProblemSubmissionMaxAggregateOutputType = {
    id: number | null
    student_id: number | null
    assignmentId: number | null
    problemId: number | null
    isCompleted: boolean | null
    submittedAt: Date | null
  }

  export type ProblemSubmissionCountAggregateOutputType = {
    id: number
    student_id: number
    assignmentId: number
    problemId: number
    isCompleted: number
    submittedAt: number
    _all: number
  }


  export type ProblemSubmissionAvgAggregateInputType = {
    id?: true
    student_id?: true
    assignmentId?: true
    problemId?: true
  }

  export type ProblemSubmissionSumAggregateInputType = {
    id?: true
    student_id?: true
    assignmentId?: true
    problemId?: true
  }

  export type ProblemSubmissionMinAggregateInputType = {
    id?: true
    student_id?: true
    assignmentId?: true
    problemId?: true
    isCompleted?: true
    submittedAt?: true
  }

  export type ProblemSubmissionMaxAggregateInputType = {
    id?: true
    student_id?: true
    assignmentId?: true
    problemId?: true
    isCompleted?: true
    submittedAt?: true
  }

  export type ProblemSubmissionCountAggregateInputType = {
    id?: true
    student_id?: true
    assignmentId?: true
    problemId?: true
    isCompleted?: true
    submittedAt?: true
    _all?: true
  }

  export type ProblemSubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProblemSubmission to aggregate.
     */
    where?: ProblemSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemSubmissions to fetch.
     */
    orderBy?: ProblemSubmissionOrderByWithRelationInput | ProblemSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProblemSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProblemSubmissions
    **/
    _count?: true | ProblemSubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProblemSubmissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProblemSubmissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProblemSubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProblemSubmissionMaxAggregateInputType
  }

  export type GetProblemSubmissionAggregateType<T extends ProblemSubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateProblemSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProblemSubmission[P]>
      : GetScalarType<T[P], AggregateProblemSubmission[P]>
  }




  export type ProblemSubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProblemSubmissionWhereInput
    orderBy?: ProblemSubmissionOrderByWithAggregationInput | ProblemSubmissionOrderByWithAggregationInput[]
    by: ProblemSubmissionScalarFieldEnum[] | ProblemSubmissionScalarFieldEnum
    having?: ProblemSubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProblemSubmissionCountAggregateInputType | true
    _avg?: ProblemSubmissionAvgAggregateInputType
    _sum?: ProblemSubmissionSumAggregateInputType
    _min?: ProblemSubmissionMinAggregateInputType
    _max?: ProblemSubmissionMaxAggregateInputType
  }

  export type ProblemSubmissionGroupByOutputType = {
    id: number
    student_id: number
    assignmentId: number
    problemId: number
    isCompleted: boolean
    submittedAt: Date
    _count: ProblemSubmissionCountAggregateOutputType | null
    _avg: ProblemSubmissionAvgAggregateOutputType | null
    _sum: ProblemSubmissionSumAggregateOutputType | null
    _min: ProblemSubmissionMinAggregateOutputType | null
    _max: ProblemSubmissionMaxAggregateOutputType | null
  }

  type GetProblemSubmissionGroupByPayload<T extends ProblemSubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProblemSubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProblemSubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProblemSubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], ProblemSubmissionGroupByOutputType[P]>
        }
      >
    >


  export type ProblemSubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    assignmentId?: boolean
    problemId?: boolean
    isCompleted?: boolean
    submittedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    submission?: boolean | ProblemSubmission$submissionArgs<ExtArgs>
  }, ExtArgs["result"]["problemSubmission"]>

  export type ProblemSubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    assignmentId?: boolean
    problemId?: boolean
    isCompleted?: boolean
    submittedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    submission?: boolean | ProblemSubmission$submissionArgs<ExtArgs>
  }, ExtArgs["result"]["problemSubmission"]>

  export type ProblemSubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    student_id?: boolean
    assignmentId?: boolean
    problemId?: boolean
    isCompleted?: boolean
    submittedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    submission?: boolean | ProblemSubmission$submissionArgs<ExtArgs>
  }, ExtArgs["result"]["problemSubmission"]>

  export type ProblemSubmissionSelectScalar = {
    id?: boolean
    student_id?: boolean
    assignmentId?: boolean
    problemId?: boolean
    isCompleted?: boolean
    submittedAt?: boolean
  }

  export type ProblemSubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "student_id" | "assignmentId" | "problemId" | "isCompleted" | "submittedAt", ExtArgs["result"]["problemSubmission"]>
  export type ProblemSubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    submission?: boolean | ProblemSubmission$submissionArgs<ExtArgs>
  }
  export type ProblemSubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    submission?: boolean | ProblemSubmission$submissionArgs<ExtArgs>
  }
  export type ProblemSubmissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    assignment?: boolean | AssignmentDefaultArgs<ExtArgs>
    problem?: boolean | ProblemDefaultArgs<ExtArgs>
    submission?: boolean | ProblemSubmission$submissionArgs<ExtArgs>
  }

  export type $ProblemSubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProblemSubmission"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      assignment: Prisma.$AssignmentPayload<ExtArgs>
      problem: Prisma.$ProblemPayload<ExtArgs>
      submission: Prisma.$AssignmentSubmissionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      student_id: number
      assignmentId: number
      problemId: number
      isCompleted: boolean
      submittedAt: Date
    }, ExtArgs["result"]["problemSubmission"]>
    composites: {}
  }

  type ProblemSubmissionGetPayload<S extends boolean | null | undefined | ProblemSubmissionDefaultArgs> = $Result.GetResult<Prisma.$ProblemSubmissionPayload, S>

  type ProblemSubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProblemSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProblemSubmissionCountAggregateInputType | true
    }

  export interface ProblemSubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProblemSubmission'], meta: { name: 'ProblemSubmission' } }
    /**
     * Find zero or one ProblemSubmission that matches the filter.
     * @param {ProblemSubmissionFindUniqueArgs} args - Arguments to find a ProblemSubmission
     * @example
     * // Get one ProblemSubmission
     * const problemSubmission = await prisma.problemSubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProblemSubmissionFindUniqueArgs>(args: SelectSubset<T, ProblemSubmissionFindUniqueArgs<ExtArgs>>): Prisma__ProblemSubmissionClient<$Result.GetResult<Prisma.$ProblemSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProblemSubmission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProblemSubmissionFindUniqueOrThrowArgs} args - Arguments to find a ProblemSubmission
     * @example
     * // Get one ProblemSubmission
     * const problemSubmission = await prisma.problemSubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProblemSubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, ProblemSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProblemSubmissionClient<$Result.GetResult<Prisma.$ProblemSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProblemSubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemSubmissionFindFirstArgs} args - Arguments to find a ProblemSubmission
     * @example
     * // Get one ProblemSubmission
     * const problemSubmission = await prisma.problemSubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProblemSubmissionFindFirstArgs>(args?: SelectSubset<T, ProblemSubmissionFindFirstArgs<ExtArgs>>): Prisma__ProblemSubmissionClient<$Result.GetResult<Prisma.$ProblemSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProblemSubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemSubmissionFindFirstOrThrowArgs} args - Arguments to find a ProblemSubmission
     * @example
     * // Get one ProblemSubmission
     * const problemSubmission = await prisma.problemSubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProblemSubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, ProblemSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProblemSubmissionClient<$Result.GetResult<Prisma.$ProblemSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProblemSubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemSubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProblemSubmissions
     * const problemSubmissions = await prisma.problemSubmission.findMany()
     * 
     * // Get first 10 ProblemSubmissions
     * const problemSubmissions = await prisma.problemSubmission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const problemSubmissionWithIdOnly = await prisma.problemSubmission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProblemSubmissionFindManyArgs>(args?: SelectSubset<T, ProblemSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProblemSubmission.
     * @param {ProblemSubmissionCreateArgs} args - Arguments to create a ProblemSubmission.
     * @example
     * // Create one ProblemSubmission
     * const ProblemSubmission = await prisma.problemSubmission.create({
     *   data: {
     *     // ... data to create a ProblemSubmission
     *   }
     * })
     * 
     */
    create<T extends ProblemSubmissionCreateArgs>(args: SelectSubset<T, ProblemSubmissionCreateArgs<ExtArgs>>): Prisma__ProblemSubmissionClient<$Result.GetResult<Prisma.$ProblemSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProblemSubmissions.
     * @param {ProblemSubmissionCreateManyArgs} args - Arguments to create many ProblemSubmissions.
     * @example
     * // Create many ProblemSubmissions
     * const problemSubmission = await prisma.problemSubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProblemSubmissionCreateManyArgs>(args?: SelectSubset<T, ProblemSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProblemSubmissions and returns the data saved in the database.
     * @param {ProblemSubmissionCreateManyAndReturnArgs} args - Arguments to create many ProblemSubmissions.
     * @example
     * // Create many ProblemSubmissions
     * const problemSubmission = await prisma.problemSubmission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProblemSubmissions and only return the `id`
     * const problemSubmissionWithIdOnly = await prisma.problemSubmission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProblemSubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, ProblemSubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemSubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProblemSubmission.
     * @param {ProblemSubmissionDeleteArgs} args - Arguments to delete one ProblemSubmission.
     * @example
     * // Delete one ProblemSubmission
     * const ProblemSubmission = await prisma.problemSubmission.delete({
     *   where: {
     *     // ... filter to delete one ProblemSubmission
     *   }
     * })
     * 
     */
    delete<T extends ProblemSubmissionDeleteArgs>(args: SelectSubset<T, ProblemSubmissionDeleteArgs<ExtArgs>>): Prisma__ProblemSubmissionClient<$Result.GetResult<Prisma.$ProblemSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProblemSubmission.
     * @param {ProblemSubmissionUpdateArgs} args - Arguments to update one ProblemSubmission.
     * @example
     * // Update one ProblemSubmission
     * const problemSubmission = await prisma.problemSubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProblemSubmissionUpdateArgs>(args: SelectSubset<T, ProblemSubmissionUpdateArgs<ExtArgs>>): Prisma__ProblemSubmissionClient<$Result.GetResult<Prisma.$ProblemSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProblemSubmissions.
     * @param {ProblemSubmissionDeleteManyArgs} args - Arguments to filter ProblemSubmissions to delete.
     * @example
     * // Delete a few ProblemSubmissions
     * const { count } = await prisma.problemSubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProblemSubmissionDeleteManyArgs>(args?: SelectSubset<T, ProblemSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProblemSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemSubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProblemSubmissions
     * const problemSubmission = await prisma.problemSubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProblemSubmissionUpdateManyArgs>(args: SelectSubset<T, ProblemSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProblemSubmissions and returns the data updated in the database.
     * @param {ProblemSubmissionUpdateManyAndReturnArgs} args - Arguments to update many ProblemSubmissions.
     * @example
     * // Update many ProblemSubmissions
     * const problemSubmission = await prisma.problemSubmission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProblemSubmissions and only return the `id`
     * const problemSubmissionWithIdOnly = await prisma.problemSubmission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProblemSubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, ProblemSubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProblemSubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProblemSubmission.
     * @param {ProblemSubmissionUpsertArgs} args - Arguments to update or create a ProblemSubmission.
     * @example
     * // Update or create a ProblemSubmission
     * const problemSubmission = await prisma.problemSubmission.upsert({
     *   create: {
     *     // ... data to create a ProblemSubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProblemSubmission we want to update
     *   }
     * })
     */
    upsert<T extends ProblemSubmissionUpsertArgs>(args: SelectSubset<T, ProblemSubmissionUpsertArgs<ExtArgs>>): Prisma__ProblemSubmissionClient<$Result.GetResult<Prisma.$ProblemSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProblemSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemSubmissionCountArgs} args - Arguments to filter ProblemSubmissions to count.
     * @example
     * // Count the number of ProblemSubmissions
     * const count = await prisma.problemSubmission.count({
     *   where: {
     *     // ... the filter for the ProblemSubmissions we want to count
     *   }
     * })
    **/
    count<T extends ProblemSubmissionCountArgs>(
      args?: Subset<T, ProblemSubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProblemSubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProblemSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemSubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProblemSubmissionAggregateArgs>(args: Subset<T, ProblemSubmissionAggregateArgs>): Prisma.PrismaPromise<GetProblemSubmissionAggregateType<T>>

    /**
     * Group by ProblemSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProblemSubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProblemSubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProblemSubmissionGroupByArgs['orderBy'] }
        : { orderBy?: ProblemSubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProblemSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProblemSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProblemSubmission model
   */
  readonly fields: ProblemSubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProblemSubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProblemSubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assignment<T extends AssignmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AssignmentDefaultArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    problem<T extends ProblemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProblemDefaultArgs<ExtArgs>>): Prisma__ProblemClient<$Result.GetResult<Prisma.$ProblemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    submission<T extends ProblemSubmission$submissionArgs<ExtArgs> = {}>(args?: Subset<T, ProblemSubmission$submissionArgs<ExtArgs>>): Prisma__AssignmentSubmissionClient<$Result.GetResult<Prisma.$AssignmentSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProblemSubmission model
   */
  interface ProblemSubmissionFieldRefs {
    readonly id: FieldRef<"ProblemSubmission", 'Int'>
    readonly student_id: FieldRef<"ProblemSubmission", 'Int'>
    readonly assignmentId: FieldRef<"ProblemSubmission", 'Int'>
    readonly problemId: FieldRef<"ProblemSubmission", 'Int'>
    readonly isCompleted: FieldRef<"ProblemSubmission", 'Boolean'>
    readonly submittedAt: FieldRef<"ProblemSubmission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProblemSubmission findUnique
   */
  export type ProblemSubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSubmission
     */
    select?: ProblemSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSubmission
     */
    omit?: ProblemSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which ProblemSubmission to fetch.
     */
    where: ProblemSubmissionWhereUniqueInput
  }

  /**
   * ProblemSubmission findUniqueOrThrow
   */
  export type ProblemSubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSubmission
     */
    select?: ProblemSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSubmission
     */
    omit?: ProblemSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which ProblemSubmission to fetch.
     */
    where: ProblemSubmissionWhereUniqueInput
  }

  /**
   * ProblemSubmission findFirst
   */
  export type ProblemSubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSubmission
     */
    select?: ProblemSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSubmission
     */
    omit?: ProblemSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which ProblemSubmission to fetch.
     */
    where?: ProblemSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemSubmissions to fetch.
     */
    orderBy?: ProblemSubmissionOrderByWithRelationInput | ProblemSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProblemSubmissions.
     */
    cursor?: ProblemSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProblemSubmissions.
     */
    distinct?: ProblemSubmissionScalarFieldEnum | ProblemSubmissionScalarFieldEnum[]
  }

  /**
   * ProblemSubmission findFirstOrThrow
   */
  export type ProblemSubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSubmission
     */
    select?: ProblemSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSubmission
     */
    omit?: ProblemSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which ProblemSubmission to fetch.
     */
    where?: ProblemSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemSubmissions to fetch.
     */
    orderBy?: ProblemSubmissionOrderByWithRelationInput | ProblemSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProblemSubmissions.
     */
    cursor?: ProblemSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProblemSubmissions.
     */
    distinct?: ProblemSubmissionScalarFieldEnum | ProblemSubmissionScalarFieldEnum[]
  }

  /**
   * ProblemSubmission findMany
   */
  export type ProblemSubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSubmission
     */
    select?: ProblemSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSubmission
     */
    omit?: ProblemSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which ProblemSubmissions to fetch.
     */
    where?: ProblemSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProblemSubmissions to fetch.
     */
    orderBy?: ProblemSubmissionOrderByWithRelationInput | ProblemSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProblemSubmissions.
     */
    cursor?: ProblemSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProblemSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProblemSubmissions.
     */
    skip?: number
    distinct?: ProblemSubmissionScalarFieldEnum | ProblemSubmissionScalarFieldEnum[]
  }

  /**
   * ProblemSubmission create
   */
  export type ProblemSubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSubmission
     */
    select?: ProblemSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSubmission
     */
    omit?: ProblemSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a ProblemSubmission.
     */
    data: XOR<ProblemSubmissionCreateInput, ProblemSubmissionUncheckedCreateInput>
  }

  /**
   * ProblemSubmission createMany
   */
  export type ProblemSubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProblemSubmissions.
     */
    data: ProblemSubmissionCreateManyInput | ProblemSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProblemSubmission createManyAndReturn
   */
  export type ProblemSubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSubmission
     */
    select?: ProblemSubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSubmission
     */
    omit?: ProblemSubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many ProblemSubmissions.
     */
    data: ProblemSubmissionCreateManyInput | ProblemSubmissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSubmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProblemSubmission update
   */
  export type ProblemSubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSubmission
     */
    select?: ProblemSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSubmission
     */
    omit?: ProblemSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a ProblemSubmission.
     */
    data: XOR<ProblemSubmissionUpdateInput, ProblemSubmissionUncheckedUpdateInput>
    /**
     * Choose, which ProblemSubmission to update.
     */
    where: ProblemSubmissionWhereUniqueInput
  }

  /**
   * ProblemSubmission updateMany
   */
  export type ProblemSubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProblemSubmissions.
     */
    data: XOR<ProblemSubmissionUpdateManyMutationInput, ProblemSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which ProblemSubmissions to update
     */
    where?: ProblemSubmissionWhereInput
    /**
     * Limit how many ProblemSubmissions to update.
     */
    limit?: number
  }

  /**
   * ProblemSubmission updateManyAndReturn
   */
  export type ProblemSubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSubmission
     */
    select?: ProblemSubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSubmission
     */
    omit?: ProblemSubmissionOmit<ExtArgs> | null
    /**
     * The data used to update ProblemSubmissions.
     */
    data: XOR<ProblemSubmissionUpdateManyMutationInput, ProblemSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which ProblemSubmissions to update
     */
    where?: ProblemSubmissionWhereInput
    /**
     * Limit how many ProblemSubmissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSubmissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProblemSubmission upsert
   */
  export type ProblemSubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSubmission
     */
    select?: ProblemSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSubmission
     */
    omit?: ProblemSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the ProblemSubmission to update in case it exists.
     */
    where: ProblemSubmissionWhereUniqueInput
    /**
     * In case the ProblemSubmission found by the `where` argument doesn't exist, create a new ProblemSubmission with this data.
     */
    create: XOR<ProblemSubmissionCreateInput, ProblemSubmissionUncheckedCreateInput>
    /**
     * In case the ProblemSubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProblemSubmissionUpdateInput, ProblemSubmissionUncheckedUpdateInput>
  }

  /**
   * ProblemSubmission delete
   */
  export type ProblemSubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSubmission
     */
    select?: ProblemSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSubmission
     */
    omit?: ProblemSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSubmissionInclude<ExtArgs> | null
    /**
     * Filter which ProblemSubmission to delete.
     */
    where: ProblemSubmissionWhereUniqueInput
  }

  /**
   * ProblemSubmission deleteMany
   */
  export type ProblemSubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProblemSubmissions to delete
     */
    where?: ProblemSubmissionWhereInput
    /**
     * Limit how many ProblemSubmissions to delete.
     */
    limit?: number
  }

  /**
   * ProblemSubmission.submission
   */
  export type ProblemSubmission$submissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssignmentSubmission
     */
    select?: AssignmentSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AssignmentSubmission
     */
    omit?: AssignmentSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentSubmissionInclude<ExtArgs> | null
    where?: AssignmentSubmissionWhereInput
  }

  /**
   * ProblemSubmission without action
   */
  export type ProblemSubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProblemSubmission
     */
    select?: ProblemSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProblemSubmission
     */
    omit?: ProblemSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProblemSubmissionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StudentScalarFieldEnum: {
    roll_num: 'roll_num',
    name: 'name',
    branch: 'branch',
    password: 'password',
    role: 'role'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const TeacherScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    dept: 'dept',
    role: 'role'
  };

  export type TeacherScalarFieldEnum = (typeof TeacherScalarFieldEnum)[keyof typeof TeacherScalarFieldEnum]


  export const ClassScalarFieldEnum: {
    class_id: 'class_id',
    name: 'name',
    joinCode: 'joinCode',
    teacher_id: 'teacher_id'
  };

  export type ClassScalarFieldEnum = (typeof ClassScalarFieldEnum)[keyof typeof ClassScalarFieldEnum]


  export const EnrollmentScalarFieldEnum: {
    class_id: 'class_id',
    student_id: 'student_id'
  };

  export type EnrollmentScalarFieldEnum = (typeof EnrollmentScalarFieldEnum)[keyof typeof EnrollmentScalarFieldEnum]


  export const AssignmentScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    createdAt: 'createdAt',
    classId: 'classId',
    deadline: 'deadline'
  };

  export type AssignmentScalarFieldEnum = (typeof AssignmentScalarFieldEnum)[keyof typeof AssignmentScalarFieldEnum]


  export const ProblemScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    assignmentId: 'assignmentId',
    expectedOutput: 'expectedOutput'
  };

  export type ProblemScalarFieldEnum = (typeof ProblemScalarFieldEnum)[keyof typeof ProblemScalarFieldEnum]


  export const AssignmentSubmissionScalarFieldEnum: {
    id: 'id',
    student_id: 'student_id',
    assignmentId: 'assignmentId',
    isCompleted: 'isCompleted',
    submittedAt: 'submittedAt'
  };

  export type AssignmentSubmissionScalarFieldEnum = (typeof AssignmentSubmissionScalarFieldEnum)[keyof typeof AssignmentSubmissionScalarFieldEnum]


  export const ProblemSubmissionScalarFieldEnum: {
    id: 'id',
    student_id: 'student_id',
    assignmentId: 'assignmentId',
    problemId: 'problemId',
    isCompleted: 'isCompleted',
    submittedAt: 'submittedAt'
  };

  export type ProblemSubmissionScalarFieldEnum = (typeof ProblemSubmissionScalarFieldEnum)[keyof typeof ProblemSubmissionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    roll_num?: IntFilter<"Student"> | number
    name?: StringFilter<"Student"> | string
    branch?: StringFilter<"Student"> | string
    password?: StringFilter<"Student"> | string
    role?: EnumUserRoleFilter<"Student"> | $Enums.UserRole
    enrollments?: EnrollmentListRelationFilter
    submissions?: AssignmentSubmissionListRelationFilter
    problemSubs?: ProblemSubmissionListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    roll_num?: SortOrder
    name?: SortOrder
    branch?: SortOrder
    password?: SortOrder
    role?: SortOrder
    enrollments?: EnrollmentOrderByRelationAggregateInput
    submissions?: AssignmentSubmissionOrderByRelationAggregateInput
    problemSubs?: ProblemSubmissionOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    roll_num?: number
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    name?: StringFilter<"Student"> | string
    branch?: StringFilter<"Student"> | string
    password?: StringFilter<"Student"> | string
    role?: EnumUserRoleFilter<"Student"> | $Enums.UserRole
    enrollments?: EnrollmentListRelationFilter
    submissions?: AssignmentSubmissionListRelationFilter
    problemSubs?: ProblemSubmissionListRelationFilter
  }, "roll_num" | "roll_num">

  export type StudentOrderByWithAggregationInput = {
    roll_num?: SortOrder
    name?: SortOrder
    branch?: SortOrder
    password?: SortOrder
    role?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _avg?: StudentAvgOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
    _sum?: StudentSumOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    roll_num?: IntWithAggregatesFilter<"Student"> | number
    name?: StringWithAggregatesFilter<"Student"> | string
    branch?: StringWithAggregatesFilter<"Student"> | string
    password?: StringWithAggregatesFilter<"Student"> | string
    role?: EnumUserRoleWithAggregatesFilter<"Student"> | $Enums.UserRole
  }

  export type TeacherWhereInput = {
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    id?: IntFilter<"Teacher"> | number
    email?: StringFilter<"Teacher"> | string
    password?: StringFilter<"Teacher"> | string
    name?: StringFilter<"Teacher"> | string
    dept?: StringFilter<"Teacher"> | string
    role?: EnumUserRoleFilter<"Teacher"> | $Enums.UserRole
    classes?: ClassListRelationFilter
  }

  export type TeacherOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    dept?: SortOrder
    role?: SortOrder
    classes?: ClassOrderByRelationAggregateInput
  }

  export type TeacherWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    password?: StringFilter<"Teacher"> | string
    name?: StringFilter<"Teacher"> | string
    dept?: StringFilter<"Teacher"> | string
    role?: EnumUserRoleFilter<"Teacher"> | $Enums.UserRole
    classes?: ClassListRelationFilter
  }, "id" | "email">

  export type TeacherOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    dept?: SortOrder
    role?: SortOrder
    _count?: TeacherCountOrderByAggregateInput
    _avg?: TeacherAvgOrderByAggregateInput
    _max?: TeacherMaxOrderByAggregateInput
    _min?: TeacherMinOrderByAggregateInput
    _sum?: TeacherSumOrderByAggregateInput
  }

  export type TeacherScalarWhereWithAggregatesInput = {
    AND?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    OR?: TeacherScalarWhereWithAggregatesInput[]
    NOT?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Teacher"> | number
    email?: StringWithAggregatesFilter<"Teacher"> | string
    password?: StringWithAggregatesFilter<"Teacher"> | string
    name?: StringWithAggregatesFilter<"Teacher"> | string
    dept?: StringWithAggregatesFilter<"Teacher"> | string
    role?: EnumUserRoleWithAggregatesFilter<"Teacher"> | $Enums.UserRole
  }

  export type ClassWhereInput = {
    AND?: ClassWhereInput | ClassWhereInput[]
    OR?: ClassWhereInput[]
    NOT?: ClassWhereInput | ClassWhereInput[]
    class_id?: IntFilter<"Class"> | number
    name?: StringFilter<"Class"> | string
    joinCode?: StringFilter<"Class"> | string
    teacher_id?: IntFilter<"Class"> | number
    teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
    enrollments?: EnrollmentListRelationFilter
    assignments?: AssignmentListRelationFilter
  }

  export type ClassOrderByWithRelationInput = {
    class_id?: SortOrder
    name?: SortOrder
    joinCode?: SortOrder
    teacher_id?: SortOrder
    teacher?: TeacherOrderByWithRelationInput
    enrollments?: EnrollmentOrderByRelationAggregateInput
    assignments?: AssignmentOrderByRelationAggregateInput
  }

  export type ClassWhereUniqueInput = Prisma.AtLeast<{
    class_id?: number
    joinCode?: string
    AND?: ClassWhereInput | ClassWhereInput[]
    OR?: ClassWhereInput[]
    NOT?: ClassWhereInput | ClassWhereInput[]
    name?: StringFilter<"Class"> | string
    teacher_id?: IntFilter<"Class"> | number
    teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
    enrollments?: EnrollmentListRelationFilter
    assignments?: AssignmentListRelationFilter
  }, "class_id" | "joinCode">

  export type ClassOrderByWithAggregationInput = {
    class_id?: SortOrder
    name?: SortOrder
    joinCode?: SortOrder
    teacher_id?: SortOrder
    _count?: ClassCountOrderByAggregateInput
    _avg?: ClassAvgOrderByAggregateInput
    _max?: ClassMaxOrderByAggregateInput
    _min?: ClassMinOrderByAggregateInput
    _sum?: ClassSumOrderByAggregateInput
  }

  export type ClassScalarWhereWithAggregatesInput = {
    AND?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[]
    OR?: ClassScalarWhereWithAggregatesInput[]
    NOT?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[]
    class_id?: IntWithAggregatesFilter<"Class"> | number
    name?: StringWithAggregatesFilter<"Class"> | string
    joinCode?: StringWithAggregatesFilter<"Class"> | string
    teacher_id?: IntWithAggregatesFilter<"Class"> | number
  }

  export type EnrollmentWhereInput = {
    AND?: EnrollmentWhereInput | EnrollmentWhereInput[]
    OR?: EnrollmentWhereInput[]
    NOT?: EnrollmentWhereInput | EnrollmentWhereInput[]
    class_id?: IntFilter<"Enrollment"> | number
    student_id?: IntFilter<"Enrollment"> | number
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type EnrollmentOrderByWithRelationInput = {
    class_id?: SortOrder
    student_id?: SortOrder
    class?: ClassOrderByWithRelationInput
    student?: StudentOrderByWithRelationInput
  }

  export type EnrollmentWhereUniqueInput = Prisma.AtLeast<{
    class_id_student_id?: EnrollmentClass_idStudent_idCompoundUniqueInput
    AND?: EnrollmentWhereInput | EnrollmentWhereInput[]
    OR?: EnrollmentWhereInput[]
    NOT?: EnrollmentWhereInput | EnrollmentWhereInput[]
    class_id?: IntFilter<"Enrollment"> | number
    student_id?: IntFilter<"Enrollment"> | number
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "class_id_student_id">

  export type EnrollmentOrderByWithAggregationInput = {
    class_id?: SortOrder
    student_id?: SortOrder
    _count?: EnrollmentCountOrderByAggregateInput
    _avg?: EnrollmentAvgOrderByAggregateInput
    _max?: EnrollmentMaxOrderByAggregateInput
    _min?: EnrollmentMinOrderByAggregateInput
    _sum?: EnrollmentSumOrderByAggregateInput
  }

  export type EnrollmentScalarWhereWithAggregatesInput = {
    AND?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[]
    OR?: EnrollmentScalarWhereWithAggregatesInput[]
    NOT?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[]
    class_id?: IntWithAggregatesFilter<"Enrollment"> | number
    student_id?: IntWithAggregatesFilter<"Enrollment"> | number
  }

  export type AssignmentWhereInput = {
    AND?: AssignmentWhereInput | AssignmentWhereInput[]
    OR?: AssignmentWhereInput[]
    NOT?: AssignmentWhereInput | AssignmentWhereInput[]
    id?: IntFilter<"Assignment"> | number
    title?: StringFilter<"Assignment"> | string
    description?: StringFilter<"Assignment"> | string
    createdAt?: DateTimeFilter<"Assignment"> | Date | string
    classId?: IntFilter<"Assignment"> | number
    deadline?: DateTimeFilter<"Assignment"> | Date | string
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
    problems?: ProblemListRelationFilter
    submissions?: AssignmentSubmissionListRelationFilter
    problemSubs?: ProblemSubmissionListRelationFilter
  }

  export type AssignmentOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    classId?: SortOrder
    deadline?: SortOrder
    class?: ClassOrderByWithRelationInput
    problems?: ProblemOrderByRelationAggregateInput
    submissions?: AssignmentSubmissionOrderByRelationAggregateInput
    problemSubs?: ProblemSubmissionOrderByRelationAggregateInput
  }

  export type AssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AssignmentWhereInput | AssignmentWhereInput[]
    OR?: AssignmentWhereInput[]
    NOT?: AssignmentWhereInput | AssignmentWhereInput[]
    title?: StringFilter<"Assignment"> | string
    description?: StringFilter<"Assignment"> | string
    createdAt?: DateTimeFilter<"Assignment"> | Date | string
    classId?: IntFilter<"Assignment"> | number
    deadline?: DateTimeFilter<"Assignment"> | Date | string
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
    problems?: ProblemListRelationFilter
    submissions?: AssignmentSubmissionListRelationFilter
    problemSubs?: ProblemSubmissionListRelationFilter
  }, "id">

  export type AssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    classId?: SortOrder
    deadline?: SortOrder
    _count?: AssignmentCountOrderByAggregateInput
    _avg?: AssignmentAvgOrderByAggregateInput
    _max?: AssignmentMaxOrderByAggregateInput
    _min?: AssignmentMinOrderByAggregateInput
    _sum?: AssignmentSumOrderByAggregateInput
  }

  export type AssignmentScalarWhereWithAggregatesInput = {
    AND?: AssignmentScalarWhereWithAggregatesInput | AssignmentScalarWhereWithAggregatesInput[]
    OR?: AssignmentScalarWhereWithAggregatesInput[]
    NOT?: AssignmentScalarWhereWithAggregatesInput | AssignmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Assignment"> | number
    title?: StringWithAggregatesFilter<"Assignment"> | string
    description?: StringWithAggregatesFilter<"Assignment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Assignment"> | Date | string
    classId?: IntWithAggregatesFilter<"Assignment"> | number
    deadline?: DateTimeWithAggregatesFilter<"Assignment"> | Date | string
  }

  export type ProblemWhereInput = {
    AND?: ProblemWhereInput | ProblemWhereInput[]
    OR?: ProblemWhereInput[]
    NOT?: ProblemWhereInput | ProblemWhereInput[]
    id?: IntFilter<"Problem"> | number
    title?: StringFilter<"Problem"> | string
    content?: StringFilter<"Problem"> | string
    assignmentId?: IntFilter<"Problem"> | number
    expectedOutput?: StringFilter<"Problem"> | string
    assignment?: XOR<AssignmentScalarRelationFilter, AssignmentWhereInput>
    problemSubs?: ProblemSubmissionListRelationFilter
  }

  export type ProblemOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    assignmentId?: SortOrder
    expectedOutput?: SortOrder
    assignment?: AssignmentOrderByWithRelationInput
    problemSubs?: ProblemSubmissionOrderByRelationAggregateInput
  }

  export type ProblemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProblemWhereInput | ProblemWhereInput[]
    OR?: ProblemWhereInput[]
    NOT?: ProblemWhereInput | ProblemWhereInput[]
    title?: StringFilter<"Problem"> | string
    content?: StringFilter<"Problem"> | string
    assignmentId?: IntFilter<"Problem"> | number
    expectedOutput?: StringFilter<"Problem"> | string
    assignment?: XOR<AssignmentScalarRelationFilter, AssignmentWhereInput>
    problemSubs?: ProblemSubmissionListRelationFilter
  }, "id">

  export type ProblemOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    assignmentId?: SortOrder
    expectedOutput?: SortOrder
    _count?: ProblemCountOrderByAggregateInput
    _avg?: ProblemAvgOrderByAggregateInput
    _max?: ProblemMaxOrderByAggregateInput
    _min?: ProblemMinOrderByAggregateInput
    _sum?: ProblemSumOrderByAggregateInput
  }

  export type ProblemScalarWhereWithAggregatesInput = {
    AND?: ProblemScalarWhereWithAggregatesInput | ProblemScalarWhereWithAggregatesInput[]
    OR?: ProblemScalarWhereWithAggregatesInput[]
    NOT?: ProblemScalarWhereWithAggregatesInput | ProblemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Problem"> | number
    title?: StringWithAggregatesFilter<"Problem"> | string
    content?: StringWithAggregatesFilter<"Problem"> | string
    assignmentId?: IntWithAggregatesFilter<"Problem"> | number
    expectedOutput?: StringWithAggregatesFilter<"Problem"> | string
  }

  export type AssignmentSubmissionWhereInput = {
    AND?: AssignmentSubmissionWhereInput | AssignmentSubmissionWhereInput[]
    OR?: AssignmentSubmissionWhereInput[]
    NOT?: AssignmentSubmissionWhereInput | AssignmentSubmissionWhereInput[]
    id?: IntFilter<"AssignmentSubmission"> | number
    student_id?: IntFilter<"AssignmentSubmission"> | number
    assignmentId?: IntFilter<"AssignmentSubmission"> | number
    isCompleted?: BoolFilter<"AssignmentSubmission"> | boolean
    submittedAt?: DateTimeFilter<"AssignmentSubmission"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    assignment?: XOR<AssignmentScalarRelationFilter, AssignmentWhereInput>
    problems?: ProblemSubmissionListRelationFilter
  }

  export type AssignmentSubmissionOrderByWithRelationInput = {
    id?: SortOrder
    student_id?: SortOrder
    assignmentId?: SortOrder
    isCompleted?: SortOrder
    submittedAt?: SortOrder
    student?: StudentOrderByWithRelationInput
    assignment?: AssignmentOrderByWithRelationInput
    problems?: ProblemSubmissionOrderByRelationAggregateInput
  }

  export type AssignmentSubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    student_id_assignmentId?: AssignmentSubmissionStudent_idAssignmentIdCompoundUniqueInput
    AND?: AssignmentSubmissionWhereInput | AssignmentSubmissionWhereInput[]
    OR?: AssignmentSubmissionWhereInput[]
    NOT?: AssignmentSubmissionWhereInput | AssignmentSubmissionWhereInput[]
    student_id?: IntFilter<"AssignmentSubmission"> | number
    assignmentId?: IntFilter<"AssignmentSubmission"> | number
    isCompleted?: BoolFilter<"AssignmentSubmission"> | boolean
    submittedAt?: DateTimeFilter<"AssignmentSubmission"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    assignment?: XOR<AssignmentScalarRelationFilter, AssignmentWhereInput>
    problems?: ProblemSubmissionListRelationFilter
  }, "id" | "student_id_assignmentId">

  export type AssignmentSubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    student_id?: SortOrder
    assignmentId?: SortOrder
    isCompleted?: SortOrder
    submittedAt?: SortOrder
    _count?: AssignmentSubmissionCountOrderByAggregateInput
    _avg?: AssignmentSubmissionAvgOrderByAggregateInput
    _max?: AssignmentSubmissionMaxOrderByAggregateInput
    _min?: AssignmentSubmissionMinOrderByAggregateInput
    _sum?: AssignmentSubmissionSumOrderByAggregateInput
  }

  export type AssignmentSubmissionScalarWhereWithAggregatesInput = {
    AND?: AssignmentSubmissionScalarWhereWithAggregatesInput | AssignmentSubmissionScalarWhereWithAggregatesInput[]
    OR?: AssignmentSubmissionScalarWhereWithAggregatesInput[]
    NOT?: AssignmentSubmissionScalarWhereWithAggregatesInput | AssignmentSubmissionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AssignmentSubmission"> | number
    student_id?: IntWithAggregatesFilter<"AssignmentSubmission"> | number
    assignmentId?: IntWithAggregatesFilter<"AssignmentSubmission"> | number
    isCompleted?: BoolWithAggregatesFilter<"AssignmentSubmission"> | boolean
    submittedAt?: DateTimeWithAggregatesFilter<"AssignmentSubmission"> | Date | string
  }

  export type ProblemSubmissionWhereInput = {
    AND?: ProblemSubmissionWhereInput | ProblemSubmissionWhereInput[]
    OR?: ProblemSubmissionWhereInput[]
    NOT?: ProblemSubmissionWhereInput | ProblemSubmissionWhereInput[]
    id?: IntFilter<"ProblemSubmission"> | number
    student_id?: IntFilter<"ProblemSubmission"> | number
    assignmentId?: IntFilter<"ProblemSubmission"> | number
    problemId?: IntFilter<"ProblemSubmission"> | number
    isCompleted?: BoolFilter<"ProblemSubmission"> | boolean
    submittedAt?: DateTimeFilter<"ProblemSubmission"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    assignment?: XOR<AssignmentScalarRelationFilter, AssignmentWhereInput>
    problem?: XOR<ProblemScalarRelationFilter, ProblemWhereInput>
    submission?: XOR<AssignmentSubmissionNullableScalarRelationFilter, AssignmentSubmissionWhereInput> | null
  }

  export type ProblemSubmissionOrderByWithRelationInput = {
    id?: SortOrder
    student_id?: SortOrder
    assignmentId?: SortOrder
    problemId?: SortOrder
    isCompleted?: SortOrder
    submittedAt?: SortOrder
    student?: StudentOrderByWithRelationInput
    assignment?: AssignmentOrderByWithRelationInput
    problem?: ProblemOrderByWithRelationInput
    submission?: AssignmentSubmissionOrderByWithRelationInput
  }

  export type ProblemSubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    student_id_assignmentId_problemId?: ProblemSubmissionStudent_idAssignmentIdProblemIdCompoundUniqueInput
    AND?: ProblemSubmissionWhereInput | ProblemSubmissionWhereInput[]
    OR?: ProblemSubmissionWhereInput[]
    NOT?: ProblemSubmissionWhereInput | ProblemSubmissionWhereInput[]
    student_id?: IntFilter<"ProblemSubmission"> | number
    assignmentId?: IntFilter<"ProblemSubmission"> | number
    problemId?: IntFilter<"ProblemSubmission"> | number
    isCompleted?: BoolFilter<"ProblemSubmission"> | boolean
    submittedAt?: DateTimeFilter<"ProblemSubmission"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    assignment?: XOR<AssignmentScalarRelationFilter, AssignmentWhereInput>
    problem?: XOR<ProblemScalarRelationFilter, ProblemWhereInput>
    submission?: XOR<AssignmentSubmissionNullableScalarRelationFilter, AssignmentSubmissionWhereInput> | null
  }, "id" | "student_id_assignmentId_problemId">

  export type ProblemSubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    student_id?: SortOrder
    assignmentId?: SortOrder
    problemId?: SortOrder
    isCompleted?: SortOrder
    submittedAt?: SortOrder
    _count?: ProblemSubmissionCountOrderByAggregateInput
    _avg?: ProblemSubmissionAvgOrderByAggregateInput
    _max?: ProblemSubmissionMaxOrderByAggregateInput
    _min?: ProblemSubmissionMinOrderByAggregateInput
    _sum?: ProblemSubmissionSumOrderByAggregateInput
  }

  export type ProblemSubmissionScalarWhereWithAggregatesInput = {
    AND?: ProblemSubmissionScalarWhereWithAggregatesInput | ProblemSubmissionScalarWhereWithAggregatesInput[]
    OR?: ProblemSubmissionScalarWhereWithAggregatesInput[]
    NOT?: ProblemSubmissionScalarWhereWithAggregatesInput | ProblemSubmissionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProblemSubmission"> | number
    student_id?: IntWithAggregatesFilter<"ProblemSubmission"> | number
    assignmentId?: IntWithAggregatesFilter<"ProblemSubmission"> | number
    problemId?: IntWithAggregatesFilter<"ProblemSubmission"> | number
    isCompleted?: BoolWithAggregatesFilter<"ProblemSubmission"> | boolean
    submittedAt?: DateTimeWithAggregatesFilter<"ProblemSubmission"> | Date | string
  }

  export type StudentCreateInput = {
    roll_num: number
    name: string
    branch: string
    password: string
    role?: $Enums.UserRole
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    submissions?: AssignmentSubmissionCreateNestedManyWithoutStudentInput
    problemSubs?: ProblemSubmissionCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    roll_num: number
    name: string
    branch: string
    password: string
    role?: $Enums.UserRole
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    submissions?: AssignmentSubmissionUncheckedCreateNestedManyWithoutStudentInput
    problemSubs?: ProblemSubmissionUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    roll_num?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    submissions?: AssignmentSubmissionUpdateManyWithoutStudentNestedInput
    problemSubs?: ProblemSubmissionUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    roll_num?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    submissions?: AssignmentSubmissionUncheckedUpdateManyWithoutStudentNestedInput
    problemSubs?: ProblemSubmissionUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    roll_num: number
    name: string
    branch: string
    password: string
    role?: $Enums.UserRole
  }

  export type StudentUpdateManyMutationInput = {
    roll_num?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type StudentUncheckedUpdateManyInput = {
    roll_num?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type TeacherCreateInput = {
    email: string
    password: string
    name: string
    dept: string
    role?: $Enums.UserRole
    classes?: ClassCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    name: string
    dept: string
    role?: $Enums.UserRole
    classes?: ClassUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dept?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    classes?: ClassUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dept?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    classes?: ClassUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherCreateManyInput = {
    id?: number
    email: string
    password: string
    name: string
    dept: string
    role?: $Enums.UserRole
  }

  export type TeacherUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dept?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type TeacherUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dept?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type ClassCreateInput = {
    name: string
    joinCode: string
    teacher: TeacherCreateNestedOneWithoutClassesInput
    enrollments?: EnrollmentCreateNestedManyWithoutClassInput
    assignments?: AssignmentCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateInput = {
    class_id?: number
    name: string
    joinCode: string
    teacher_id: number
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutClassInput
    assignments?: AssignmentUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    joinCode?: StringFieldUpdateOperationsInput | string
    teacher?: TeacherUpdateOneRequiredWithoutClassesNestedInput
    enrollments?: EnrollmentUpdateManyWithoutClassNestedInput
    assignments?: AssignmentUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateInput = {
    class_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    joinCode?: StringFieldUpdateOperationsInput | string
    teacher_id?: IntFieldUpdateOperationsInput | number
    enrollments?: EnrollmentUncheckedUpdateManyWithoutClassNestedInput
    assignments?: AssignmentUncheckedUpdateManyWithoutClassNestedInput
  }

  export type ClassCreateManyInput = {
    class_id?: number
    name: string
    joinCode: string
    teacher_id: number
  }

  export type ClassUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    joinCode?: StringFieldUpdateOperationsInput | string
  }

  export type ClassUncheckedUpdateManyInput = {
    class_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    joinCode?: StringFieldUpdateOperationsInput | string
    teacher_id?: IntFieldUpdateOperationsInput | number
  }

  export type EnrollmentCreateInput = {
    class: ClassCreateNestedOneWithoutEnrollmentsInput
    student: StudentCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateInput = {
    class_id: number
    student_id: number
  }

  export type EnrollmentUpdateInput = {
    class?: ClassUpdateOneRequiredWithoutEnrollmentsNestedInput
    student?: StudentUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateInput = {
    class_id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
  }

  export type EnrollmentCreateManyInput = {
    class_id: number
    student_id: number
  }

  export type EnrollmentUpdateManyMutationInput = {

  }

  export type EnrollmentUncheckedUpdateManyInput = {
    class_id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
  }

  export type AssignmentCreateInput = {
    title: string
    description: string
    createdAt?: Date | string
    deadline: Date | string
    class: ClassCreateNestedOneWithoutAssignmentsInput
    problems?: ProblemCreateNestedManyWithoutAssignmentInput
    submissions?: AssignmentSubmissionCreateNestedManyWithoutAssignmentInput
    problemSubs?: ProblemSubmissionCreateNestedManyWithoutAssignmentInput
  }

  export type AssignmentUncheckedCreateInput = {
    id?: number
    title: string
    description: string
    createdAt?: Date | string
    classId: number
    deadline: Date | string
    problems?: ProblemUncheckedCreateNestedManyWithoutAssignmentInput
    submissions?: AssignmentSubmissionUncheckedCreateNestedManyWithoutAssignmentInput
    problemSubs?: ProblemSubmissionUncheckedCreateNestedManyWithoutAssignmentInput
  }

  export type AssignmentUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    class?: ClassUpdateOneRequiredWithoutAssignmentsNestedInput
    problems?: ProblemUpdateManyWithoutAssignmentNestedInput
    submissions?: AssignmentSubmissionUpdateManyWithoutAssignmentNestedInput
    problemSubs?: ProblemSubmissionUpdateManyWithoutAssignmentNestedInput
  }

  export type AssignmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classId?: IntFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    problems?: ProblemUncheckedUpdateManyWithoutAssignmentNestedInput
    submissions?: AssignmentSubmissionUncheckedUpdateManyWithoutAssignmentNestedInput
    problemSubs?: ProblemSubmissionUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type AssignmentCreateManyInput = {
    id?: number
    title: string
    description: string
    createdAt?: Date | string
    classId: number
    deadline: Date | string
  }

  export type AssignmentUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssignmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classId?: IntFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemCreateInput = {
    title: string
    content: string
    expectedOutput: string
    assignment: AssignmentCreateNestedOneWithoutProblemsInput
    problemSubs?: ProblemSubmissionCreateNestedManyWithoutProblemInput
  }

  export type ProblemUncheckedCreateInput = {
    id?: number
    title: string
    content: string
    assignmentId: number
    expectedOutput: string
    problemSubs?: ProblemSubmissionUncheckedCreateNestedManyWithoutProblemInput
  }

  export type ProblemUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    expectedOutput?: StringFieldUpdateOperationsInput | string
    assignment?: AssignmentUpdateOneRequiredWithoutProblemsNestedInput
    problemSubs?: ProblemSubmissionUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    assignmentId?: IntFieldUpdateOperationsInput | number
    expectedOutput?: StringFieldUpdateOperationsInput | string
    problemSubs?: ProblemSubmissionUncheckedUpdateManyWithoutProblemNestedInput
  }

  export type ProblemCreateManyInput = {
    id?: number
    title: string
    content: string
    assignmentId: number
    expectedOutput: string
  }

  export type ProblemUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    expectedOutput?: StringFieldUpdateOperationsInput | string
  }

  export type ProblemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    assignmentId?: IntFieldUpdateOperationsInput | number
    expectedOutput?: StringFieldUpdateOperationsInput | string
  }

  export type AssignmentSubmissionCreateInput = {
    isCompleted?: boolean
    submittedAt?: Date | string
    student: StudentCreateNestedOneWithoutSubmissionsInput
    assignment: AssignmentCreateNestedOneWithoutSubmissionsInput
    problems?: ProblemSubmissionCreateNestedManyWithoutSubmissionInput
  }

  export type AssignmentSubmissionUncheckedCreateInput = {
    id?: number
    student_id: number
    assignmentId: number
    isCompleted?: boolean
    submittedAt?: Date | string
    problems?: ProblemSubmissionUncheckedCreateNestedManyWithoutSubmissionInput
  }

  export type AssignmentSubmissionUpdateInput = {
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutSubmissionsNestedInput
    assignment?: AssignmentUpdateOneRequiredWithoutSubmissionsNestedInput
    problems?: ProblemSubmissionUpdateManyWithoutSubmissionNestedInput
  }

  export type AssignmentSubmissionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    assignmentId?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problems?: ProblemSubmissionUncheckedUpdateManyWithoutSubmissionNestedInput
  }

  export type AssignmentSubmissionCreateManyInput = {
    id?: number
    student_id: number
    assignmentId: number
    isCompleted?: boolean
    submittedAt?: Date | string
  }

  export type AssignmentSubmissionUpdateManyMutationInput = {
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssignmentSubmissionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    assignmentId?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSubmissionCreateInput = {
    isCompleted?: boolean
    submittedAt?: Date | string
    student: StudentCreateNestedOneWithoutProblemSubsInput
    assignment: AssignmentCreateNestedOneWithoutProblemSubsInput
    problem: ProblemCreateNestedOneWithoutProblemSubsInput
    submission?: AssignmentSubmissionCreateNestedOneWithoutProblemsInput
  }

  export type ProblemSubmissionUncheckedCreateInput = {
    id?: number
    student_id: number
    assignmentId: number
    problemId: number
    isCompleted?: boolean
    submittedAt?: Date | string
  }

  export type ProblemSubmissionUpdateInput = {
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutProblemSubsNestedInput
    assignment?: AssignmentUpdateOneRequiredWithoutProblemSubsNestedInput
    problem?: ProblemUpdateOneRequiredWithoutProblemSubsNestedInput
    submission?: AssignmentSubmissionUpdateOneWithoutProblemsNestedInput
  }

  export type ProblemSubmissionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    assignmentId?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSubmissionCreateManyInput = {
    id?: number
    student_id: number
    assignmentId: number
    problemId: number
    isCompleted?: boolean
    submittedAt?: Date | string
  }

  export type ProblemSubmissionUpdateManyMutationInput = {
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSubmissionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    assignmentId?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type EnrollmentListRelationFilter = {
    every?: EnrollmentWhereInput
    some?: EnrollmentWhereInput
    none?: EnrollmentWhereInput
  }

  export type AssignmentSubmissionListRelationFilter = {
    every?: AssignmentSubmissionWhereInput
    some?: AssignmentSubmissionWhereInput
    none?: AssignmentSubmissionWhereInput
  }

  export type ProblemSubmissionListRelationFilter = {
    every?: ProblemSubmissionWhereInput
    some?: ProblemSubmissionWhereInput
    none?: ProblemSubmissionWhereInput
  }

  export type EnrollmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AssignmentSubmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProblemSubmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    roll_num?: SortOrder
    name?: SortOrder
    branch?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type StudentAvgOrderByAggregateInput = {
    roll_num?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    roll_num?: SortOrder
    name?: SortOrder
    branch?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    roll_num?: SortOrder
    name?: SortOrder
    branch?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type StudentSumOrderByAggregateInput = {
    roll_num?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type ClassListRelationFilter = {
    every?: ClassWhereInput
    some?: ClassWhereInput
    none?: ClassWhereInput
  }

  export type ClassOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeacherCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    dept?: SortOrder
    role?: SortOrder
  }

  export type TeacherAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TeacherMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    dept?: SortOrder
    role?: SortOrder
  }

  export type TeacherMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    dept?: SortOrder
    role?: SortOrder
  }

  export type TeacherSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TeacherScalarRelationFilter = {
    is?: TeacherWhereInput
    isNot?: TeacherWhereInput
  }

  export type AssignmentListRelationFilter = {
    every?: AssignmentWhereInput
    some?: AssignmentWhereInput
    none?: AssignmentWhereInput
  }

  export type AssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClassCountOrderByAggregateInput = {
    class_id?: SortOrder
    name?: SortOrder
    joinCode?: SortOrder
    teacher_id?: SortOrder
  }

  export type ClassAvgOrderByAggregateInput = {
    class_id?: SortOrder
    teacher_id?: SortOrder
  }

  export type ClassMaxOrderByAggregateInput = {
    class_id?: SortOrder
    name?: SortOrder
    joinCode?: SortOrder
    teacher_id?: SortOrder
  }

  export type ClassMinOrderByAggregateInput = {
    class_id?: SortOrder
    name?: SortOrder
    joinCode?: SortOrder
    teacher_id?: SortOrder
  }

  export type ClassSumOrderByAggregateInput = {
    class_id?: SortOrder
    teacher_id?: SortOrder
  }

  export type ClassScalarRelationFilter = {
    is?: ClassWhereInput
    isNot?: ClassWhereInput
  }

  export type StudentScalarRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type EnrollmentClass_idStudent_idCompoundUniqueInput = {
    class_id: number
    student_id: number
  }

  export type EnrollmentCountOrderByAggregateInput = {
    class_id?: SortOrder
    student_id?: SortOrder
  }

  export type EnrollmentAvgOrderByAggregateInput = {
    class_id?: SortOrder
    student_id?: SortOrder
  }

  export type EnrollmentMaxOrderByAggregateInput = {
    class_id?: SortOrder
    student_id?: SortOrder
  }

  export type EnrollmentMinOrderByAggregateInput = {
    class_id?: SortOrder
    student_id?: SortOrder
  }

  export type EnrollmentSumOrderByAggregateInput = {
    class_id?: SortOrder
    student_id?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProblemListRelationFilter = {
    every?: ProblemWhereInput
    some?: ProblemWhereInput
    none?: ProblemWhereInput
  }

  export type ProblemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    classId?: SortOrder
    deadline?: SortOrder
  }

  export type AssignmentAvgOrderByAggregateInput = {
    id?: SortOrder
    classId?: SortOrder
  }

  export type AssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    classId?: SortOrder
    deadline?: SortOrder
  }

  export type AssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    classId?: SortOrder
    deadline?: SortOrder
  }

  export type AssignmentSumOrderByAggregateInput = {
    id?: SortOrder
    classId?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AssignmentScalarRelationFilter = {
    is?: AssignmentWhereInput
    isNot?: AssignmentWhereInput
  }

  export type ProblemCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    assignmentId?: SortOrder
    expectedOutput?: SortOrder
  }

  export type ProblemAvgOrderByAggregateInput = {
    id?: SortOrder
    assignmentId?: SortOrder
  }

  export type ProblemMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    assignmentId?: SortOrder
    expectedOutput?: SortOrder
  }

  export type ProblemMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    assignmentId?: SortOrder
    expectedOutput?: SortOrder
  }

  export type ProblemSumOrderByAggregateInput = {
    id?: SortOrder
    assignmentId?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AssignmentSubmissionStudent_idAssignmentIdCompoundUniqueInput = {
    student_id: number
    assignmentId: number
  }

  export type AssignmentSubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    assignmentId?: SortOrder
    isCompleted?: SortOrder
    submittedAt?: SortOrder
  }

  export type AssignmentSubmissionAvgOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    assignmentId?: SortOrder
  }

  export type AssignmentSubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    assignmentId?: SortOrder
    isCompleted?: SortOrder
    submittedAt?: SortOrder
  }

  export type AssignmentSubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    assignmentId?: SortOrder
    isCompleted?: SortOrder
    submittedAt?: SortOrder
  }

  export type AssignmentSubmissionSumOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    assignmentId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ProblemScalarRelationFilter = {
    is?: ProblemWhereInput
    isNot?: ProblemWhereInput
  }

  export type AssignmentSubmissionNullableScalarRelationFilter = {
    is?: AssignmentSubmissionWhereInput | null
    isNot?: AssignmentSubmissionWhereInput | null
  }

  export type ProblemSubmissionStudent_idAssignmentIdProblemIdCompoundUniqueInput = {
    student_id: number
    assignmentId: number
    problemId: number
  }

  export type ProblemSubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    assignmentId?: SortOrder
    problemId?: SortOrder
    isCompleted?: SortOrder
    submittedAt?: SortOrder
  }

  export type ProblemSubmissionAvgOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    assignmentId?: SortOrder
    problemId?: SortOrder
  }

  export type ProblemSubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    assignmentId?: SortOrder
    problemId?: SortOrder
    isCompleted?: SortOrder
    submittedAt?: SortOrder
  }

  export type ProblemSubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    assignmentId?: SortOrder
    problemId?: SortOrder
    isCompleted?: SortOrder
    submittedAt?: SortOrder
  }

  export type ProblemSubmissionSumOrderByAggregateInput = {
    id?: SortOrder
    student_id?: SortOrder
    assignmentId?: SortOrder
    problemId?: SortOrder
  }

  export type EnrollmentCreateNestedManyWithoutStudentInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type AssignmentSubmissionCreateNestedManyWithoutStudentInput = {
    create?: XOR<AssignmentSubmissionCreateWithoutStudentInput, AssignmentSubmissionUncheckedCreateWithoutStudentInput> | AssignmentSubmissionCreateWithoutStudentInput[] | AssignmentSubmissionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AssignmentSubmissionCreateOrConnectWithoutStudentInput | AssignmentSubmissionCreateOrConnectWithoutStudentInput[]
    createMany?: AssignmentSubmissionCreateManyStudentInputEnvelope
    connect?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
  }

  export type ProblemSubmissionCreateNestedManyWithoutStudentInput = {
    create?: XOR<ProblemSubmissionCreateWithoutStudentInput, ProblemSubmissionUncheckedCreateWithoutStudentInput> | ProblemSubmissionCreateWithoutStudentInput[] | ProblemSubmissionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ProblemSubmissionCreateOrConnectWithoutStudentInput | ProblemSubmissionCreateOrConnectWithoutStudentInput[]
    createMany?: ProblemSubmissionCreateManyStudentInputEnvelope
    connect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type AssignmentSubmissionUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<AssignmentSubmissionCreateWithoutStudentInput, AssignmentSubmissionUncheckedCreateWithoutStudentInput> | AssignmentSubmissionCreateWithoutStudentInput[] | AssignmentSubmissionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AssignmentSubmissionCreateOrConnectWithoutStudentInput | AssignmentSubmissionCreateOrConnectWithoutStudentInput[]
    createMany?: AssignmentSubmissionCreateManyStudentInputEnvelope
    connect?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
  }

  export type ProblemSubmissionUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<ProblemSubmissionCreateWithoutStudentInput, ProblemSubmissionUncheckedCreateWithoutStudentInput> | ProblemSubmissionCreateWithoutStudentInput[] | ProblemSubmissionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ProblemSubmissionCreateOrConnectWithoutStudentInput | ProblemSubmissionCreateOrConnectWithoutStudentInput[]
    createMany?: ProblemSubmissionCreateManyStudentInputEnvelope
    connect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type EnrollmentUpdateManyWithoutStudentNestedInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutStudentInput | EnrollmentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutStudentInput | EnrollmentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutStudentInput | EnrollmentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type AssignmentSubmissionUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AssignmentSubmissionCreateWithoutStudentInput, AssignmentSubmissionUncheckedCreateWithoutStudentInput> | AssignmentSubmissionCreateWithoutStudentInput[] | AssignmentSubmissionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AssignmentSubmissionCreateOrConnectWithoutStudentInput | AssignmentSubmissionCreateOrConnectWithoutStudentInput[]
    upsert?: AssignmentSubmissionUpsertWithWhereUniqueWithoutStudentInput | AssignmentSubmissionUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AssignmentSubmissionCreateManyStudentInputEnvelope
    set?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
    disconnect?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
    delete?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
    connect?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
    update?: AssignmentSubmissionUpdateWithWhereUniqueWithoutStudentInput | AssignmentSubmissionUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AssignmentSubmissionUpdateManyWithWhereWithoutStudentInput | AssignmentSubmissionUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AssignmentSubmissionScalarWhereInput | AssignmentSubmissionScalarWhereInput[]
  }

  export type ProblemSubmissionUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ProblemSubmissionCreateWithoutStudentInput, ProblemSubmissionUncheckedCreateWithoutStudentInput> | ProblemSubmissionCreateWithoutStudentInput[] | ProblemSubmissionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ProblemSubmissionCreateOrConnectWithoutStudentInput | ProblemSubmissionCreateOrConnectWithoutStudentInput[]
    upsert?: ProblemSubmissionUpsertWithWhereUniqueWithoutStudentInput | ProblemSubmissionUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ProblemSubmissionCreateManyStudentInputEnvelope
    set?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    disconnect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    delete?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    connect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    update?: ProblemSubmissionUpdateWithWhereUniqueWithoutStudentInput | ProblemSubmissionUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ProblemSubmissionUpdateManyWithWhereWithoutStudentInput | ProblemSubmissionUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ProblemSubmissionScalarWhereInput | ProblemSubmissionScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutStudentInput | EnrollmentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutStudentInput | EnrollmentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutStudentInput | EnrollmentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type AssignmentSubmissionUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AssignmentSubmissionCreateWithoutStudentInput, AssignmentSubmissionUncheckedCreateWithoutStudentInput> | AssignmentSubmissionCreateWithoutStudentInput[] | AssignmentSubmissionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AssignmentSubmissionCreateOrConnectWithoutStudentInput | AssignmentSubmissionCreateOrConnectWithoutStudentInput[]
    upsert?: AssignmentSubmissionUpsertWithWhereUniqueWithoutStudentInput | AssignmentSubmissionUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AssignmentSubmissionCreateManyStudentInputEnvelope
    set?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
    disconnect?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
    delete?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
    connect?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
    update?: AssignmentSubmissionUpdateWithWhereUniqueWithoutStudentInput | AssignmentSubmissionUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AssignmentSubmissionUpdateManyWithWhereWithoutStudentInput | AssignmentSubmissionUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AssignmentSubmissionScalarWhereInput | AssignmentSubmissionScalarWhereInput[]
  }

  export type ProblemSubmissionUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ProblemSubmissionCreateWithoutStudentInput, ProblemSubmissionUncheckedCreateWithoutStudentInput> | ProblemSubmissionCreateWithoutStudentInput[] | ProblemSubmissionUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ProblemSubmissionCreateOrConnectWithoutStudentInput | ProblemSubmissionCreateOrConnectWithoutStudentInput[]
    upsert?: ProblemSubmissionUpsertWithWhereUniqueWithoutStudentInput | ProblemSubmissionUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ProblemSubmissionCreateManyStudentInputEnvelope
    set?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    disconnect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    delete?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    connect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    update?: ProblemSubmissionUpdateWithWhereUniqueWithoutStudentInput | ProblemSubmissionUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ProblemSubmissionUpdateManyWithWhereWithoutStudentInput | ProblemSubmissionUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ProblemSubmissionScalarWhereInput | ProblemSubmissionScalarWhereInput[]
  }

  export type ClassCreateNestedManyWithoutTeacherInput = {
    create?: XOR<ClassCreateWithoutTeacherInput, ClassUncheckedCreateWithoutTeacherInput> | ClassCreateWithoutTeacherInput[] | ClassUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutTeacherInput | ClassCreateOrConnectWithoutTeacherInput[]
    createMany?: ClassCreateManyTeacherInputEnvelope
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
  }

  export type ClassUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<ClassCreateWithoutTeacherInput, ClassUncheckedCreateWithoutTeacherInput> | ClassCreateWithoutTeacherInput[] | ClassUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutTeacherInput | ClassCreateOrConnectWithoutTeacherInput[]
    createMany?: ClassCreateManyTeacherInputEnvelope
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
  }

  export type ClassUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<ClassCreateWithoutTeacherInput, ClassUncheckedCreateWithoutTeacherInput> | ClassCreateWithoutTeacherInput[] | ClassUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutTeacherInput | ClassCreateOrConnectWithoutTeacherInput[]
    upsert?: ClassUpsertWithWhereUniqueWithoutTeacherInput | ClassUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: ClassCreateManyTeacherInputEnvelope
    set?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    disconnect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    delete?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    update?: ClassUpdateWithWhereUniqueWithoutTeacherInput | ClassUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: ClassUpdateManyWithWhereWithoutTeacherInput | ClassUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: ClassScalarWhereInput | ClassScalarWhereInput[]
  }

  export type ClassUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<ClassCreateWithoutTeacherInput, ClassUncheckedCreateWithoutTeacherInput> | ClassCreateWithoutTeacherInput[] | ClassUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutTeacherInput | ClassCreateOrConnectWithoutTeacherInput[]
    upsert?: ClassUpsertWithWhereUniqueWithoutTeacherInput | ClassUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: ClassCreateManyTeacherInputEnvelope
    set?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    disconnect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    delete?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    update?: ClassUpdateWithWhereUniqueWithoutTeacherInput | ClassUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: ClassUpdateManyWithWhereWithoutTeacherInput | ClassUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: ClassScalarWhereInput | ClassScalarWhereInput[]
  }

  export type TeacherCreateNestedOneWithoutClassesInput = {
    create?: XOR<TeacherCreateWithoutClassesInput, TeacherUncheckedCreateWithoutClassesInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutClassesInput
    connect?: TeacherWhereUniqueInput
  }

  export type EnrollmentCreateNestedManyWithoutClassInput = {
    create?: XOR<EnrollmentCreateWithoutClassInput, EnrollmentUncheckedCreateWithoutClassInput> | EnrollmentCreateWithoutClassInput[] | EnrollmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutClassInput | EnrollmentCreateOrConnectWithoutClassInput[]
    createMany?: EnrollmentCreateManyClassInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type AssignmentCreateNestedManyWithoutClassInput = {
    create?: XOR<AssignmentCreateWithoutClassInput, AssignmentUncheckedCreateWithoutClassInput> | AssignmentCreateWithoutClassInput[] | AssignmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutClassInput | AssignmentCreateOrConnectWithoutClassInput[]
    createMany?: AssignmentCreateManyClassInputEnvelope
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutClassInput = {
    create?: XOR<EnrollmentCreateWithoutClassInput, EnrollmentUncheckedCreateWithoutClassInput> | EnrollmentCreateWithoutClassInput[] | EnrollmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutClassInput | EnrollmentCreateOrConnectWithoutClassInput[]
    createMany?: EnrollmentCreateManyClassInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type AssignmentUncheckedCreateNestedManyWithoutClassInput = {
    create?: XOR<AssignmentCreateWithoutClassInput, AssignmentUncheckedCreateWithoutClassInput> | AssignmentCreateWithoutClassInput[] | AssignmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutClassInput | AssignmentCreateOrConnectWithoutClassInput[]
    createMany?: AssignmentCreateManyClassInputEnvelope
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
  }

  export type TeacherUpdateOneRequiredWithoutClassesNestedInput = {
    create?: XOR<TeacherCreateWithoutClassesInput, TeacherUncheckedCreateWithoutClassesInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutClassesInput
    upsert?: TeacherUpsertWithoutClassesInput
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutClassesInput, TeacherUpdateWithoutClassesInput>, TeacherUncheckedUpdateWithoutClassesInput>
  }

  export type EnrollmentUpdateManyWithoutClassNestedInput = {
    create?: XOR<EnrollmentCreateWithoutClassInput, EnrollmentUncheckedCreateWithoutClassInput> | EnrollmentCreateWithoutClassInput[] | EnrollmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutClassInput | EnrollmentCreateOrConnectWithoutClassInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutClassInput | EnrollmentUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: EnrollmentCreateManyClassInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutClassInput | EnrollmentUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutClassInput | EnrollmentUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type AssignmentUpdateManyWithoutClassNestedInput = {
    create?: XOR<AssignmentCreateWithoutClassInput, AssignmentUncheckedCreateWithoutClassInput> | AssignmentCreateWithoutClassInput[] | AssignmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutClassInput | AssignmentCreateOrConnectWithoutClassInput[]
    upsert?: AssignmentUpsertWithWhereUniqueWithoutClassInput | AssignmentUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: AssignmentCreateManyClassInputEnvelope
    set?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    disconnect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    delete?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    update?: AssignmentUpdateWithWhereUniqueWithoutClassInput | AssignmentUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: AssignmentUpdateManyWithWhereWithoutClassInput | AssignmentUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutClassNestedInput = {
    create?: XOR<EnrollmentCreateWithoutClassInput, EnrollmentUncheckedCreateWithoutClassInput> | EnrollmentCreateWithoutClassInput[] | EnrollmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutClassInput | EnrollmentCreateOrConnectWithoutClassInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutClassInput | EnrollmentUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: EnrollmentCreateManyClassInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutClassInput | EnrollmentUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutClassInput | EnrollmentUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type AssignmentUncheckedUpdateManyWithoutClassNestedInput = {
    create?: XOR<AssignmentCreateWithoutClassInput, AssignmentUncheckedCreateWithoutClassInput> | AssignmentCreateWithoutClassInput[] | AssignmentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutClassInput | AssignmentCreateOrConnectWithoutClassInput[]
    upsert?: AssignmentUpsertWithWhereUniqueWithoutClassInput | AssignmentUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: AssignmentCreateManyClassInputEnvelope
    set?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    disconnect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    delete?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    update?: AssignmentUpdateWithWhereUniqueWithoutClassInput | AssignmentUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: AssignmentUpdateManyWithWhereWithoutClassInput | AssignmentUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
  }

  export type ClassCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<ClassCreateWithoutEnrollmentsInput, ClassUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutEnrollmentsInput
    connect?: ClassWhereUniqueInput
  }

  export type StudentCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<StudentCreateWithoutEnrollmentsInput, StudentUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutEnrollmentsInput
    connect?: StudentWhereUniqueInput
  }

  export type ClassUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<ClassCreateWithoutEnrollmentsInput, ClassUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutEnrollmentsInput
    upsert?: ClassUpsertWithoutEnrollmentsInput
    connect?: ClassWhereUniqueInput
    update?: XOR<XOR<ClassUpdateToOneWithWhereWithoutEnrollmentsInput, ClassUpdateWithoutEnrollmentsInput>, ClassUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type StudentUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<StudentCreateWithoutEnrollmentsInput, StudentUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutEnrollmentsInput
    upsert?: StudentUpsertWithoutEnrollmentsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutEnrollmentsInput, StudentUpdateWithoutEnrollmentsInput>, StudentUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type ClassCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<ClassCreateWithoutAssignmentsInput, ClassUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutAssignmentsInput
    connect?: ClassWhereUniqueInput
  }

  export type ProblemCreateNestedManyWithoutAssignmentInput = {
    create?: XOR<ProblemCreateWithoutAssignmentInput, ProblemUncheckedCreateWithoutAssignmentInput> | ProblemCreateWithoutAssignmentInput[] | ProblemUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: ProblemCreateOrConnectWithoutAssignmentInput | ProblemCreateOrConnectWithoutAssignmentInput[]
    createMany?: ProblemCreateManyAssignmentInputEnvelope
    connect?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
  }

  export type AssignmentSubmissionCreateNestedManyWithoutAssignmentInput = {
    create?: XOR<AssignmentSubmissionCreateWithoutAssignmentInput, AssignmentSubmissionUncheckedCreateWithoutAssignmentInput> | AssignmentSubmissionCreateWithoutAssignmentInput[] | AssignmentSubmissionUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: AssignmentSubmissionCreateOrConnectWithoutAssignmentInput | AssignmentSubmissionCreateOrConnectWithoutAssignmentInput[]
    createMany?: AssignmentSubmissionCreateManyAssignmentInputEnvelope
    connect?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
  }

  export type ProblemSubmissionCreateNestedManyWithoutAssignmentInput = {
    create?: XOR<ProblemSubmissionCreateWithoutAssignmentInput, ProblemSubmissionUncheckedCreateWithoutAssignmentInput> | ProblemSubmissionCreateWithoutAssignmentInput[] | ProblemSubmissionUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: ProblemSubmissionCreateOrConnectWithoutAssignmentInput | ProblemSubmissionCreateOrConnectWithoutAssignmentInput[]
    createMany?: ProblemSubmissionCreateManyAssignmentInputEnvelope
    connect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
  }

  export type ProblemUncheckedCreateNestedManyWithoutAssignmentInput = {
    create?: XOR<ProblemCreateWithoutAssignmentInput, ProblemUncheckedCreateWithoutAssignmentInput> | ProblemCreateWithoutAssignmentInput[] | ProblemUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: ProblemCreateOrConnectWithoutAssignmentInput | ProblemCreateOrConnectWithoutAssignmentInput[]
    createMany?: ProblemCreateManyAssignmentInputEnvelope
    connect?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
  }

  export type AssignmentSubmissionUncheckedCreateNestedManyWithoutAssignmentInput = {
    create?: XOR<AssignmentSubmissionCreateWithoutAssignmentInput, AssignmentSubmissionUncheckedCreateWithoutAssignmentInput> | AssignmentSubmissionCreateWithoutAssignmentInput[] | AssignmentSubmissionUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: AssignmentSubmissionCreateOrConnectWithoutAssignmentInput | AssignmentSubmissionCreateOrConnectWithoutAssignmentInput[]
    createMany?: AssignmentSubmissionCreateManyAssignmentInputEnvelope
    connect?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
  }

  export type ProblemSubmissionUncheckedCreateNestedManyWithoutAssignmentInput = {
    create?: XOR<ProblemSubmissionCreateWithoutAssignmentInput, ProblemSubmissionUncheckedCreateWithoutAssignmentInput> | ProblemSubmissionCreateWithoutAssignmentInput[] | ProblemSubmissionUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: ProblemSubmissionCreateOrConnectWithoutAssignmentInput | ProblemSubmissionCreateOrConnectWithoutAssignmentInput[]
    createMany?: ProblemSubmissionCreateManyAssignmentInputEnvelope
    connect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ClassUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<ClassCreateWithoutAssignmentsInput, ClassUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutAssignmentsInput
    upsert?: ClassUpsertWithoutAssignmentsInput
    connect?: ClassWhereUniqueInput
    update?: XOR<XOR<ClassUpdateToOneWithWhereWithoutAssignmentsInput, ClassUpdateWithoutAssignmentsInput>, ClassUncheckedUpdateWithoutAssignmentsInput>
  }

  export type ProblemUpdateManyWithoutAssignmentNestedInput = {
    create?: XOR<ProblemCreateWithoutAssignmentInput, ProblemUncheckedCreateWithoutAssignmentInput> | ProblemCreateWithoutAssignmentInput[] | ProblemUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: ProblemCreateOrConnectWithoutAssignmentInput | ProblemCreateOrConnectWithoutAssignmentInput[]
    upsert?: ProblemUpsertWithWhereUniqueWithoutAssignmentInput | ProblemUpsertWithWhereUniqueWithoutAssignmentInput[]
    createMany?: ProblemCreateManyAssignmentInputEnvelope
    set?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
    disconnect?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
    delete?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
    connect?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
    update?: ProblemUpdateWithWhereUniqueWithoutAssignmentInput | ProblemUpdateWithWhereUniqueWithoutAssignmentInput[]
    updateMany?: ProblemUpdateManyWithWhereWithoutAssignmentInput | ProblemUpdateManyWithWhereWithoutAssignmentInput[]
    deleteMany?: ProblemScalarWhereInput | ProblemScalarWhereInput[]
  }

  export type AssignmentSubmissionUpdateManyWithoutAssignmentNestedInput = {
    create?: XOR<AssignmentSubmissionCreateWithoutAssignmentInput, AssignmentSubmissionUncheckedCreateWithoutAssignmentInput> | AssignmentSubmissionCreateWithoutAssignmentInput[] | AssignmentSubmissionUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: AssignmentSubmissionCreateOrConnectWithoutAssignmentInput | AssignmentSubmissionCreateOrConnectWithoutAssignmentInput[]
    upsert?: AssignmentSubmissionUpsertWithWhereUniqueWithoutAssignmentInput | AssignmentSubmissionUpsertWithWhereUniqueWithoutAssignmentInput[]
    createMany?: AssignmentSubmissionCreateManyAssignmentInputEnvelope
    set?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
    disconnect?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
    delete?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
    connect?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
    update?: AssignmentSubmissionUpdateWithWhereUniqueWithoutAssignmentInput | AssignmentSubmissionUpdateWithWhereUniqueWithoutAssignmentInput[]
    updateMany?: AssignmentSubmissionUpdateManyWithWhereWithoutAssignmentInput | AssignmentSubmissionUpdateManyWithWhereWithoutAssignmentInput[]
    deleteMany?: AssignmentSubmissionScalarWhereInput | AssignmentSubmissionScalarWhereInput[]
  }

  export type ProblemSubmissionUpdateManyWithoutAssignmentNestedInput = {
    create?: XOR<ProblemSubmissionCreateWithoutAssignmentInput, ProblemSubmissionUncheckedCreateWithoutAssignmentInput> | ProblemSubmissionCreateWithoutAssignmentInput[] | ProblemSubmissionUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: ProblemSubmissionCreateOrConnectWithoutAssignmentInput | ProblemSubmissionCreateOrConnectWithoutAssignmentInput[]
    upsert?: ProblemSubmissionUpsertWithWhereUniqueWithoutAssignmentInput | ProblemSubmissionUpsertWithWhereUniqueWithoutAssignmentInput[]
    createMany?: ProblemSubmissionCreateManyAssignmentInputEnvelope
    set?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    disconnect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    delete?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    connect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    update?: ProblemSubmissionUpdateWithWhereUniqueWithoutAssignmentInput | ProblemSubmissionUpdateWithWhereUniqueWithoutAssignmentInput[]
    updateMany?: ProblemSubmissionUpdateManyWithWhereWithoutAssignmentInput | ProblemSubmissionUpdateManyWithWhereWithoutAssignmentInput[]
    deleteMany?: ProblemSubmissionScalarWhereInput | ProblemSubmissionScalarWhereInput[]
  }

  export type ProblemUncheckedUpdateManyWithoutAssignmentNestedInput = {
    create?: XOR<ProblemCreateWithoutAssignmentInput, ProblemUncheckedCreateWithoutAssignmentInput> | ProblemCreateWithoutAssignmentInput[] | ProblemUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: ProblemCreateOrConnectWithoutAssignmentInput | ProblemCreateOrConnectWithoutAssignmentInput[]
    upsert?: ProblemUpsertWithWhereUniqueWithoutAssignmentInput | ProblemUpsertWithWhereUniqueWithoutAssignmentInput[]
    createMany?: ProblemCreateManyAssignmentInputEnvelope
    set?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
    disconnect?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
    delete?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
    connect?: ProblemWhereUniqueInput | ProblemWhereUniqueInput[]
    update?: ProblemUpdateWithWhereUniqueWithoutAssignmentInput | ProblemUpdateWithWhereUniqueWithoutAssignmentInput[]
    updateMany?: ProblemUpdateManyWithWhereWithoutAssignmentInput | ProblemUpdateManyWithWhereWithoutAssignmentInput[]
    deleteMany?: ProblemScalarWhereInput | ProblemScalarWhereInput[]
  }

  export type AssignmentSubmissionUncheckedUpdateManyWithoutAssignmentNestedInput = {
    create?: XOR<AssignmentSubmissionCreateWithoutAssignmentInput, AssignmentSubmissionUncheckedCreateWithoutAssignmentInput> | AssignmentSubmissionCreateWithoutAssignmentInput[] | AssignmentSubmissionUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: AssignmentSubmissionCreateOrConnectWithoutAssignmentInput | AssignmentSubmissionCreateOrConnectWithoutAssignmentInput[]
    upsert?: AssignmentSubmissionUpsertWithWhereUniqueWithoutAssignmentInput | AssignmentSubmissionUpsertWithWhereUniqueWithoutAssignmentInput[]
    createMany?: AssignmentSubmissionCreateManyAssignmentInputEnvelope
    set?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
    disconnect?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
    delete?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
    connect?: AssignmentSubmissionWhereUniqueInput | AssignmentSubmissionWhereUniqueInput[]
    update?: AssignmentSubmissionUpdateWithWhereUniqueWithoutAssignmentInput | AssignmentSubmissionUpdateWithWhereUniqueWithoutAssignmentInput[]
    updateMany?: AssignmentSubmissionUpdateManyWithWhereWithoutAssignmentInput | AssignmentSubmissionUpdateManyWithWhereWithoutAssignmentInput[]
    deleteMany?: AssignmentSubmissionScalarWhereInput | AssignmentSubmissionScalarWhereInput[]
  }

  export type ProblemSubmissionUncheckedUpdateManyWithoutAssignmentNestedInput = {
    create?: XOR<ProblemSubmissionCreateWithoutAssignmentInput, ProblemSubmissionUncheckedCreateWithoutAssignmentInput> | ProblemSubmissionCreateWithoutAssignmentInput[] | ProblemSubmissionUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: ProblemSubmissionCreateOrConnectWithoutAssignmentInput | ProblemSubmissionCreateOrConnectWithoutAssignmentInput[]
    upsert?: ProblemSubmissionUpsertWithWhereUniqueWithoutAssignmentInput | ProblemSubmissionUpsertWithWhereUniqueWithoutAssignmentInput[]
    createMany?: ProblemSubmissionCreateManyAssignmentInputEnvelope
    set?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    disconnect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    delete?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    connect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    update?: ProblemSubmissionUpdateWithWhereUniqueWithoutAssignmentInput | ProblemSubmissionUpdateWithWhereUniqueWithoutAssignmentInput[]
    updateMany?: ProblemSubmissionUpdateManyWithWhereWithoutAssignmentInput | ProblemSubmissionUpdateManyWithWhereWithoutAssignmentInput[]
    deleteMany?: ProblemSubmissionScalarWhereInput | ProblemSubmissionScalarWhereInput[]
  }

  export type AssignmentCreateNestedOneWithoutProblemsInput = {
    create?: XOR<AssignmentCreateWithoutProblemsInput, AssignmentUncheckedCreateWithoutProblemsInput>
    connectOrCreate?: AssignmentCreateOrConnectWithoutProblemsInput
    connect?: AssignmentWhereUniqueInput
  }

  export type ProblemSubmissionCreateNestedManyWithoutProblemInput = {
    create?: XOR<ProblemSubmissionCreateWithoutProblemInput, ProblemSubmissionUncheckedCreateWithoutProblemInput> | ProblemSubmissionCreateWithoutProblemInput[] | ProblemSubmissionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemSubmissionCreateOrConnectWithoutProblemInput | ProblemSubmissionCreateOrConnectWithoutProblemInput[]
    createMany?: ProblemSubmissionCreateManyProblemInputEnvelope
    connect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
  }

  export type ProblemSubmissionUncheckedCreateNestedManyWithoutProblemInput = {
    create?: XOR<ProblemSubmissionCreateWithoutProblemInput, ProblemSubmissionUncheckedCreateWithoutProblemInput> | ProblemSubmissionCreateWithoutProblemInput[] | ProblemSubmissionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemSubmissionCreateOrConnectWithoutProblemInput | ProblemSubmissionCreateOrConnectWithoutProblemInput[]
    createMany?: ProblemSubmissionCreateManyProblemInputEnvelope
    connect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
  }

  export type AssignmentUpdateOneRequiredWithoutProblemsNestedInput = {
    create?: XOR<AssignmentCreateWithoutProblemsInput, AssignmentUncheckedCreateWithoutProblemsInput>
    connectOrCreate?: AssignmentCreateOrConnectWithoutProblemsInput
    upsert?: AssignmentUpsertWithoutProblemsInput
    connect?: AssignmentWhereUniqueInput
    update?: XOR<XOR<AssignmentUpdateToOneWithWhereWithoutProblemsInput, AssignmentUpdateWithoutProblemsInput>, AssignmentUncheckedUpdateWithoutProblemsInput>
  }

  export type ProblemSubmissionUpdateManyWithoutProblemNestedInput = {
    create?: XOR<ProblemSubmissionCreateWithoutProblemInput, ProblemSubmissionUncheckedCreateWithoutProblemInput> | ProblemSubmissionCreateWithoutProblemInput[] | ProblemSubmissionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemSubmissionCreateOrConnectWithoutProblemInput | ProblemSubmissionCreateOrConnectWithoutProblemInput[]
    upsert?: ProblemSubmissionUpsertWithWhereUniqueWithoutProblemInput | ProblemSubmissionUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: ProblemSubmissionCreateManyProblemInputEnvelope
    set?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    disconnect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    delete?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    connect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    update?: ProblemSubmissionUpdateWithWhereUniqueWithoutProblemInput | ProblemSubmissionUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: ProblemSubmissionUpdateManyWithWhereWithoutProblemInput | ProblemSubmissionUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: ProblemSubmissionScalarWhereInput | ProblemSubmissionScalarWhereInput[]
  }

  export type ProblemSubmissionUncheckedUpdateManyWithoutProblemNestedInput = {
    create?: XOR<ProblemSubmissionCreateWithoutProblemInput, ProblemSubmissionUncheckedCreateWithoutProblemInput> | ProblemSubmissionCreateWithoutProblemInput[] | ProblemSubmissionUncheckedCreateWithoutProblemInput[]
    connectOrCreate?: ProblemSubmissionCreateOrConnectWithoutProblemInput | ProblemSubmissionCreateOrConnectWithoutProblemInput[]
    upsert?: ProblemSubmissionUpsertWithWhereUniqueWithoutProblemInput | ProblemSubmissionUpsertWithWhereUniqueWithoutProblemInput[]
    createMany?: ProblemSubmissionCreateManyProblemInputEnvelope
    set?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    disconnect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    delete?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    connect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    update?: ProblemSubmissionUpdateWithWhereUniqueWithoutProblemInput | ProblemSubmissionUpdateWithWhereUniqueWithoutProblemInput[]
    updateMany?: ProblemSubmissionUpdateManyWithWhereWithoutProblemInput | ProblemSubmissionUpdateManyWithWhereWithoutProblemInput[]
    deleteMany?: ProblemSubmissionScalarWhereInput | ProblemSubmissionScalarWhereInput[]
  }

  export type StudentCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<StudentCreateWithoutSubmissionsInput, StudentUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutSubmissionsInput
    connect?: StudentWhereUniqueInput
  }

  export type AssignmentCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<AssignmentCreateWithoutSubmissionsInput, AssignmentUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: AssignmentCreateOrConnectWithoutSubmissionsInput
    connect?: AssignmentWhereUniqueInput
  }

  export type ProblemSubmissionCreateNestedManyWithoutSubmissionInput = {
    create?: XOR<ProblemSubmissionCreateWithoutSubmissionInput, ProblemSubmissionUncheckedCreateWithoutSubmissionInput> | ProblemSubmissionCreateWithoutSubmissionInput[] | ProblemSubmissionUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: ProblemSubmissionCreateOrConnectWithoutSubmissionInput | ProblemSubmissionCreateOrConnectWithoutSubmissionInput[]
    createMany?: ProblemSubmissionCreateManySubmissionInputEnvelope
    connect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
  }

  export type ProblemSubmissionUncheckedCreateNestedManyWithoutSubmissionInput = {
    create?: XOR<ProblemSubmissionCreateWithoutSubmissionInput, ProblemSubmissionUncheckedCreateWithoutSubmissionInput> | ProblemSubmissionCreateWithoutSubmissionInput[] | ProblemSubmissionUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: ProblemSubmissionCreateOrConnectWithoutSubmissionInput | ProblemSubmissionCreateOrConnectWithoutSubmissionInput[]
    createMany?: ProblemSubmissionCreateManySubmissionInputEnvelope
    connect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type StudentUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<StudentCreateWithoutSubmissionsInput, StudentUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutSubmissionsInput
    upsert?: StudentUpsertWithoutSubmissionsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutSubmissionsInput, StudentUpdateWithoutSubmissionsInput>, StudentUncheckedUpdateWithoutSubmissionsInput>
  }

  export type AssignmentUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<AssignmentCreateWithoutSubmissionsInput, AssignmentUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: AssignmentCreateOrConnectWithoutSubmissionsInput
    upsert?: AssignmentUpsertWithoutSubmissionsInput
    connect?: AssignmentWhereUniqueInput
    update?: XOR<XOR<AssignmentUpdateToOneWithWhereWithoutSubmissionsInput, AssignmentUpdateWithoutSubmissionsInput>, AssignmentUncheckedUpdateWithoutSubmissionsInput>
  }

  export type ProblemSubmissionUpdateManyWithoutSubmissionNestedInput = {
    create?: XOR<ProblemSubmissionCreateWithoutSubmissionInput, ProblemSubmissionUncheckedCreateWithoutSubmissionInput> | ProblemSubmissionCreateWithoutSubmissionInput[] | ProblemSubmissionUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: ProblemSubmissionCreateOrConnectWithoutSubmissionInput | ProblemSubmissionCreateOrConnectWithoutSubmissionInput[]
    upsert?: ProblemSubmissionUpsertWithWhereUniqueWithoutSubmissionInput | ProblemSubmissionUpsertWithWhereUniqueWithoutSubmissionInput[]
    createMany?: ProblemSubmissionCreateManySubmissionInputEnvelope
    set?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    disconnect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    delete?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    connect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    update?: ProblemSubmissionUpdateWithWhereUniqueWithoutSubmissionInput | ProblemSubmissionUpdateWithWhereUniqueWithoutSubmissionInput[]
    updateMany?: ProblemSubmissionUpdateManyWithWhereWithoutSubmissionInput | ProblemSubmissionUpdateManyWithWhereWithoutSubmissionInput[]
    deleteMany?: ProblemSubmissionScalarWhereInput | ProblemSubmissionScalarWhereInput[]
  }

  export type ProblemSubmissionUncheckedUpdateManyWithoutSubmissionNestedInput = {
    create?: XOR<ProblemSubmissionCreateWithoutSubmissionInput, ProblemSubmissionUncheckedCreateWithoutSubmissionInput> | ProblemSubmissionCreateWithoutSubmissionInput[] | ProblemSubmissionUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: ProblemSubmissionCreateOrConnectWithoutSubmissionInput | ProblemSubmissionCreateOrConnectWithoutSubmissionInput[]
    upsert?: ProblemSubmissionUpsertWithWhereUniqueWithoutSubmissionInput | ProblemSubmissionUpsertWithWhereUniqueWithoutSubmissionInput[]
    createMany?: ProblemSubmissionCreateManySubmissionInputEnvelope
    set?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    disconnect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    delete?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    connect?: ProblemSubmissionWhereUniqueInput | ProblemSubmissionWhereUniqueInput[]
    update?: ProblemSubmissionUpdateWithWhereUniqueWithoutSubmissionInput | ProblemSubmissionUpdateWithWhereUniqueWithoutSubmissionInput[]
    updateMany?: ProblemSubmissionUpdateManyWithWhereWithoutSubmissionInput | ProblemSubmissionUpdateManyWithWhereWithoutSubmissionInput[]
    deleteMany?: ProblemSubmissionScalarWhereInput | ProblemSubmissionScalarWhereInput[]
  }

  export type StudentCreateNestedOneWithoutProblemSubsInput = {
    create?: XOR<StudentCreateWithoutProblemSubsInput, StudentUncheckedCreateWithoutProblemSubsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutProblemSubsInput
    connect?: StudentWhereUniqueInput
  }

  export type AssignmentCreateNestedOneWithoutProblemSubsInput = {
    create?: XOR<AssignmentCreateWithoutProblemSubsInput, AssignmentUncheckedCreateWithoutProblemSubsInput>
    connectOrCreate?: AssignmentCreateOrConnectWithoutProblemSubsInput
    connect?: AssignmentWhereUniqueInput
  }

  export type ProblemCreateNestedOneWithoutProblemSubsInput = {
    create?: XOR<ProblemCreateWithoutProblemSubsInput, ProblemUncheckedCreateWithoutProblemSubsInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutProblemSubsInput
    connect?: ProblemWhereUniqueInput
  }

  export type AssignmentSubmissionCreateNestedOneWithoutProblemsInput = {
    create?: XOR<AssignmentSubmissionCreateWithoutProblemsInput, AssignmentSubmissionUncheckedCreateWithoutProblemsInput>
    connectOrCreate?: AssignmentSubmissionCreateOrConnectWithoutProblemsInput
    connect?: AssignmentSubmissionWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutProblemSubsNestedInput = {
    create?: XOR<StudentCreateWithoutProblemSubsInput, StudentUncheckedCreateWithoutProblemSubsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutProblemSubsInput
    upsert?: StudentUpsertWithoutProblemSubsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutProblemSubsInput, StudentUpdateWithoutProblemSubsInput>, StudentUncheckedUpdateWithoutProblemSubsInput>
  }

  export type AssignmentUpdateOneRequiredWithoutProblemSubsNestedInput = {
    create?: XOR<AssignmentCreateWithoutProblemSubsInput, AssignmentUncheckedCreateWithoutProblemSubsInput>
    connectOrCreate?: AssignmentCreateOrConnectWithoutProblemSubsInput
    upsert?: AssignmentUpsertWithoutProblemSubsInput
    connect?: AssignmentWhereUniqueInput
    update?: XOR<XOR<AssignmentUpdateToOneWithWhereWithoutProblemSubsInput, AssignmentUpdateWithoutProblemSubsInput>, AssignmentUncheckedUpdateWithoutProblemSubsInput>
  }

  export type ProblemUpdateOneRequiredWithoutProblemSubsNestedInput = {
    create?: XOR<ProblemCreateWithoutProblemSubsInput, ProblemUncheckedCreateWithoutProblemSubsInput>
    connectOrCreate?: ProblemCreateOrConnectWithoutProblemSubsInput
    upsert?: ProblemUpsertWithoutProblemSubsInput
    connect?: ProblemWhereUniqueInput
    update?: XOR<XOR<ProblemUpdateToOneWithWhereWithoutProblemSubsInput, ProblemUpdateWithoutProblemSubsInput>, ProblemUncheckedUpdateWithoutProblemSubsInput>
  }

  export type AssignmentSubmissionUpdateOneWithoutProblemsNestedInput = {
    create?: XOR<AssignmentSubmissionCreateWithoutProblemsInput, AssignmentSubmissionUncheckedCreateWithoutProblemsInput>
    connectOrCreate?: AssignmentSubmissionCreateOrConnectWithoutProblemsInput
    upsert?: AssignmentSubmissionUpsertWithoutProblemsInput
    disconnect?: AssignmentSubmissionWhereInput | boolean
    delete?: AssignmentSubmissionWhereInput | boolean
    connect?: AssignmentSubmissionWhereUniqueInput
    update?: XOR<XOR<AssignmentSubmissionUpdateToOneWithWhereWithoutProblemsInput, AssignmentSubmissionUpdateWithoutProblemsInput>, AssignmentSubmissionUncheckedUpdateWithoutProblemsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnrollmentCreateWithoutStudentInput = {
    class: ClassCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateWithoutStudentInput = {
    class_id: number
  }

  export type EnrollmentCreateOrConnectWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput>
  }

  export type EnrollmentCreateManyStudentInputEnvelope = {
    data: EnrollmentCreateManyStudentInput | EnrollmentCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type AssignmentSubmissionCreateWithoutStudentInput = {
    isCompleted?: boolean
    submittedAt?: Date | string
    assignment: AssignmentCreateNestedOneWithoutSubmissionsInput
    problems?: ProblemSubmissionCreateNestedManyWithoutSubmissionInput
  }

  export type AssignmentSubmissionUncheckedCreateWithoutStudentInput = {
    id?: number
    assignmentId: number
    isCompleted?: boolean
    submittedAt?: Date | string
    problems?: ProblemSubmissionUncheckedCreateNestedManyWithoutSubmissionInput
  }

  export type AssignmentSubmissionCreateOrConnectWithoutStudentInput = {
    where: AssignmentSubmissionWhereUniqueInput
    create: XOR<AssignmentSubmissionCreateWithoutStudentInput, AssignmentSubmissionUncheckedCreateWithoutStudentInput>
  }

  export type AssignmentSubmissionCreateManyStudentInputEnvelope = {
    data: AssignmentSubmissionCreateManyStudentInput | AssignmentSubmissionCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type ProblemSubmissionCreateWithoutStudentInput = {
    isCompleted?: boolean
    submittedAt?: Date | string
    assignment: AssignmentCreateNestedOneWithoutProblemSubsInput
    problem: ProblemCreateNestedOneWithoutProblemSubsInput
    submission?: AssignmentSubmissionCreateNestedOneWithoutProblemsInput
  }

  export type ProblemSubmissionUncheckedCreateWithoutStudentInput = {
    id?: number
    assignmentId: number
    problemId: number
    isCompleted?: boolean
    submittedAt?: Date | string
  }

  export type ProblemSubmissionCreateOrConnectWithoutStudentInput = {
    where: ProblemSubmissionWhereUniqueInput
    create: XOR<ProblemSubmissionCreateWithoutStudentInput, ProblemSubmissionUncheckedCreateWithoutStudentInput>
  }

  export type ProblemSubmissionCreateManyStudentInputEnvelope = {
    data: ProblemSubmissionCreateManyStudentInput | ProblemSubmissionCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutStudentInput, EnrollmentUncheckedUpdateWithoutStudentInput>
    create: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutStudentInput, EnrollmentUncheckedUpdateWithoutStudentInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutStudentInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutStudentInput>
  }

  export type EnrollmentScalarWhereInput = {
    AND?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
    OR?: EnrollmentScalarWhereInput[]
    NOT?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
    class_id?: IntFilter<"Enrollment"> | number
    student_id?: IntFilter<"Enrollment"> | number
  }

  export type AssignmentSubmissionUpsertWithWhereUniqueWithoutStudentInput = {
    where: AssignmentSubmissionWhereUniqueInput
    update: XOR<AssignmentSubmissionUpdateWithoutStudentInput, AssignmentSubmissionUncheckedUpdateWithoutStudentInput>
    create: XOR<AssignmentSubmissionCreateWithoutStudentInput, AssignmentSubmissionUncheckedCreateWithoutStudentInput>
  }

  export type AssignmentSubmissionUpdateWithWhereUniqueWithoutStudentInput = {
    where: AssignmentSubmissionWhereUniqueInput
    data: XOR<AssignmentSubmissionUpdateWithoutStudentInput, AssignmentSubmissionUncheckedUpdateWithoutStudentInput>
  }

  export type AssignmentSubmissionUpdateManyWithWhereWithoutStudentInput = {
    where: AssignmentSubmissionScalarWhereInput
    data: XOR<AssignmentSubmissionUpdateManyMutationInput, AssignmentSubmissionUncheckedUpdateManyWithoutStudentInput>
  }

  export type AssignmentSubmissionScalarWhereInput = {
    AND?: AssignmentSubmissionScalarWhereInput | AssignmentSubmissionScalarWhereInput[]
    OR?: AssignmentSubmissionScalarWhereInput[]
    NOT?: AssignmentSubmissionScalarWhereInput | AssignmentSubmissionScalarWhereInput[]
    id?: IntFilter<"AssignmentSubmission"> | number
    student_id?: IntFilter<"AssignmentSubmission"> | number
    assignmentId?: IntFilter<"AssignmentSubmission"> | number
    isCompleted?: BoolFilter<"AssignmentSubmission"> | boolean
    submittedAt?: DateTimeFilter<"AssignmentSubmission"> | Date | string
  }

  export type ProblemSubmissionUpsertWithWhereUniqueWithoutStudentInput = {
    where: ProblemSubmissionWhereUniqueInput
    update: XOR<ProblemSubmissionUpdateWithoutStudentInput, ProblemSubmissionUncheckedUpdateWithoutStudentInput>
    create: XOR<ProblemSubmissionCreateWithoutStudentInput, ProblemSubmissionUncheckedCreateWithoutStudentInput>
  }

  export type ProblemSubmissionUpdateWithWhereUniqueWithoutStudentInput = {
    where: ProblemSubmissionWhereUniqueInput
    data: XOR<ProblemSubmissionUpdateWithoutStudentInput, ProblemSubmissionUncheckedUpdateWithoutStudentInput>
  }

  export type ProblemSubmissionUpdateManyWithWhereWithoutStudentInput = {
    where: ProblemSubmissionScalarWhereInput
    data: XOR<ProblemSubmissionUpdateManyMutationInput, ProblemSubmissionUncheckedUpdateManyWithoutStudentInput>
  }

  export type ProblemSubmissionScalarWhereInput = {
    AND?: ProblemSubmissionScalarWhereInput | ProblemSubmissionScalarWhereInput[]
    OR?: ProblemSubmissionScalarWhereInput[]
    NOT?: ProblemSubmissionScalarWhereInput | ProblemSubmissionScalarWhereInput[]
    id?: IntFilter<"ProblemSubmission"> | number
    student_id?: IntFilter<"ProblemSubmission"> | number
    assignmentId?: IntFilter<"ProblemSubmission"> | number
    problemId?: IntFilter<"ProblemSubmission"> | number
    isCompleted?: BoolFilter<"ProblemSubmission"> | boolean
    submittedAt?: DateTimeFilter<"ProblemSubmission"> | Date | string
  }

  export type ClassCreateWithoutTeacherInput = {
    name: string
    joinCode: string
    enrollments?: EnrollmentCreateNestedManyWithoutClassInput
    assignments?: AssignmentCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutTeacherInput = {
    class_id?: number
    name: string
    joinCode: string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutClassInput
    assignments?: AssignmentUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutTeacherInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutTeacherInput, ClassUncheckedCreateWithoutTeacherInput>
  }

  export type ClassCreateManyTeacherInputEnvelope = {
    data: ClassCreateManyTeacherInput | ClassCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type ClassUpsertWithWhereUniqueWithoutTeacherInput = {
    where: ClassWhereUniqueInput
    update: XOR<ClassUpdateWithoutTeacherInput, ClassUncheckedUpdateWithoutTeacherInput>
    create: XOR<ClassCreateWithoutTeacherInput, ClassUncheckedCreateWithoutTeacherInput>
  }

  export type ClassUpdateWithWhereUniqueWithoutTeacherInput = {
    where: ClassWhereUniqueInput
    data: XOR<ClassUpdateWithoutTeacherInput, ClassUncheckedUpdateWithoutTeacherInput>
  }

  export type ClassUpdateManyWithWhereWithoutTeacherInput = {
    where: ClassScalarWhereInput
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyWithoutTeacherInput>
  }

  export type ClassScalarWhereInput = {
    AND?: ClassScalarWhereInput | ClassScalarWhereInput[]
    OR?: ClassScalarWhereInput[]
    NOT?: ClassScalarWhereInput | ClassScalarWhereInput[]
    class_id?: IntFilter<"Class"> | number
    name?: StringFilter<"Class"> | string
    joinCode?: StringFilter<"Class"> | string
    teacher_id?: IntFilter<"Class"> | number
  }

  export type TeacherCreateWithoutClassesInput = {
    email: string
    password: string
    name: string
    dept: string
    role?: $Enums.UserRole
  }

  export type TeacherUncheckedCreateWithoutClassesInput = {
    id?: number
    email: string
    password: string
    name: string
    dept: string
    role?: $Enums.UserRole
  }

  export type TeacherCreateOrConnectWithoutClassesInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutClassesInput, TeacherUncheckedCreateWithoutClassesInput>
  }

  export type EnrollmentCreateWithoutClassInput = {
    student: StudentCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateWithoutClassInput = {
    student_id: number
  }

  export type EnrollmentCreateOrConnectWithoutClassInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutClassInput, EnrollmentUncheckedCreateWithoutClassInput>
  }

  export type EnrollmentCreateManyClassInputEnvelope = {
    data: EnrollmentCreateManyClassInput | EnrollmentCreateManyClassInput[]
    skipDuplicates?: boolean
  }

  export type AssignmentCreateWithoutClassInput = {
    title: string
    description: string
    createdAt?: Date | string
    deadline: Date | string
    problems?: ProblemCreateNestedManyWithoutAssignmentInput
    submissions?: AssignmentSubmissionCreateNestedManyWithoutAssignmentInput
    problemSubs?: ProblemSubmissionCreateNestedManyWithoutAssignmentInput
  }

  export type AssignmentUncheckedCreateWithoutClassInput = {
    id?: number
    title: string
    description: string
    createdAt?: Date | string
    deadline: Date | string
    problems?: ProblemUncheckedCreateNestedManyWithoutAssignmentInput
    submissions?: AssignmentSubmissionUncheckedCreateNestedManyWithoutAssignmentInput
    problemSubs?: ProblemSubmissionUncheckedCreateNestedManyWithoutAssignmentInput
  }

  export type AssignmentCreateOrConnectWithoutClassInput = {
    where: AssignmentWhereUniqueInput
    create: XOR<AssignmentCreateWithoutClassInput, AssignmentUncheckedCreateWithoutClassInput>
  }

  export type AssignmentCreateManyClassInputEnvelope = {
    data: AssignmentCreateManyClassInput | AssignmentCreateManyClassInput[]
    skipDuplicates?: boolean
  }

  export type TeacherUpsertWithoutClassesInput = {
    update: XOR<TeacherUpdateWithoutClassesInput, TeacherUncheckedUpdateWithoutClassesInput>
    create: XOR<TeacherCreateWithoutClassesInput, TeacherUncheckedCreateWithoutClassesInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutClassesInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutClassesInput, TeacherUncheckedUpdateWithoutClassesInput>
  }

  export type TeacherUpdateWithoutClassesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dept?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type TeacherUncheckedUpdateWithoutClassesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dept?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutClassInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutClassInput, EnrollmentUncheckedUpdateWithoutClassInput>
    create: XOR<EnrollmentCreateWithoutClassInput, EnrollmentUncheckedCreateWithoutClassInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutClassInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutClassInput, EnrollmentUncheckedUpdateWithoutClassInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutClassInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutClassInput>
  }

  export type AssignmentUpsertWithWhereUniqueWithoutClassInput = {
    where: AssignmentWhereUniqueInput
    update: XOR<AssignmentUpdateWithoutClassInput, AssignmentUncheckedUpdateWithoutClassInput>
    create: XOR<AssignmentCreateWithoutClassInput, AssignmentUncheckedCreateWithoutClassInput>
  }

  export type AssignmentUpdateWithWhereUniqueWithoutClassInput = {
    where: AssignmentWhereUniqueInput
    data: XOR<AssignmentUpdateWithoutClassInput, AssignmentUncheckedUpdateWithoutClassInput>
  }

  export type AssignmentUpdateManyWithWhereWithoutClassInput = {
    where: AssignmentScalarWhereInput
    data: XOR<AssignmentUpdateManyMutationInput, AssignmentUncheckedUpdateManyWithoutClassInput>
  }

  export type AssignmentScalarWhereInput = {
    AND?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
    OR?: AssignmentScalarWhereInput[]
    NOT?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
    id?: IntFilter<"Assignment"> | number
    title?: StringFilter<"Assignment"> | string
    description?: StringFilter<"Assignment"> | string
    createdAt?: DateTimeFilter<"Assignment"> | Date | string
    classId?: IntFilter<"Assignment"> | number
    deadline?: DateTimeFilter<"Assignment"> | Date | string
  }

  export type ClassCreateWithoutEnrollmentsInput = {
    name: string
    joinCode: string
    teacher: TeacherCreateNestedOneWithoutClassesInput
    assignments?: AssignmentCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutEnrollmentsInput = {
    class_id?: number
    name: string
    joinCode: string
    teacher_id: number
    assignments?: AssignmentUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutEnrollmentsInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutEnrollmentsInput, ClassUncheckedCreateWithoutEnrollmentsInput>
  }

  export type StudentCreateWithoutEnrollmentsInput = {
    roll_num: number
    name: string
    branch: string
    password: string
    role?: $Enums.UserRole
    submissions?: AssignmentSubmissionCreateNestedManyWithoutStudentInput
    problemSubs?: ProblemSubmissionCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutEnrollmentsInput = {
    roll_num: number
    name: string
    branch: string
    password: string
    role?: $Enums.UserRole
    submissions?: AssignmentSubmissionUncheckedCreateNestedManyWithoutStudentInput
    problemSubs?: ProblemSubmissionUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutEnrollmentsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutEnrollmentsInput, StudentUncheckedCreateWithoutEnrollmentsInput>
  }

  export type ClassUpsertWithoutEnrollmentsInput = {
    update: XOR<ClassUpdateWithoutEnrollmentsInput, ClassUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<ClassCreateWithoutEnrollmentsInput, ClassUncheckedCreateWithoutEnrollmentsInput>
    where?: ClassWhereInput
  }

  export type ClassUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: ClassWhereInput
    data: XOR<ClassUpdateWithoutEnrollmentsInput, ClassUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type ClassUpdateWithoutEnrollmentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    joinCode?: StringFieldUpdateOperationsInput | string
    teacher?: TeacherUpdateOneRequiredWithoutClassesNestedInput
    assignments?: AssignmentUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutEnrollmentsInput = {
    class_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    joinCode?: StringFieldUpdateOperationsInput | string
    teacher_id?: IntFieldUpdateOperationsInput | number
    assignments?: AssignmentUncheckedUpdateManyWithoutClassNestedInput
  }

  export type StudentUpsertWithoutEnrollmentsInput = {
    update: XOR<StudentUpdateWithoutEnrollmentsInput, StudentUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<StudentCreateWithoutEnrollmentsInput, StudentUncheckedCreateWithoutEnrollmentsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutEnrollmentsInput, StudentUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type StudentUpdateWithoutEnrollmentsInput = {
    roll_num?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    submissions?: AssignmentSubmissionUpdateManyWithoutStudentNestedInput
    problemSubs?: ProblemSubmissionUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutEnrollmentsInput = {
    roll_num?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    submissions?: AssignmentSubmissionUncheckedUpdateManyWithoutStudentNestedInput
    problemSubs?: ProblemSubmissionUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type ClassCreateWithoutAssignmentsInput = {
    name: string
    joinCode: string
    teacher: TeacherCreateNestedOneWithoutClassesInput
    enrollments?: EnrollmentCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutAssignmentsInput = {
    class_id?: number
    name: string
    joinCode: string
    teacher_id: number
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutAssignmentsInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutAssignmentsInput, ClassUncheckedCreateWithoutAssignmentsInput>
  }

  export type ProblemCreateWithoutAssignmentInput = {
    title: string
    content: string
    expectedOutput: string
    problemSubs?: ProblemSubmissionCreateNestedManyWithoutProblemInput
  }

  export type ProblemUncheckedCreateWithoutAssignmentInput = {
    id?: number
    title: string
    content: string
    expectedOutput: string
    problemSubs?: ProblemSubmissionUncheckedCreateNestedManyWithoutProblemInput
  }

  export type ProblemCreateOrConnectWithoutAssignmentInput = {
    where: ProblemWhereUniqueInput
    create: XOR<ProblemCreateWithoutAssignmentInput, ProblemUncheckedCreateWithoutAssignmentInput>
  }

  export type ProblemCreateManyAssignmentInputEnvelope = {
    data: ProblemCreateManyAssignmentInput | ProblemCreateManyAssignmentInput[]
    skipDuplicates?: boolean
  }

  export type AssignmentSubmissionCreateWithoutAssignmentInput = {
    isCompleted?: boolean
    submittedAt?: Date | string
    student: StudentCreateNestedOneWithoutSubmissionsInput
    problems?: ProblemSubmissionCreateNestedManyWithoutSubmissionInput
  }

  export type AssignmentSubmissionUncheckedCreateWithoutAssignmentInput = {
    id?: number
    student_id: number
    isCompleted?: boolean
    submittedAt?: Date | string
    problems?: ProblemSubmissionUncheckedCreateNestedManyWithoutSubmissionInput
  }

  export type AssignmentSubmissionCreateOrConnectWithoutAssignmentInput = {
    where: AssignmentSubmissionWhereUniqueInput
    create: XOR<AssignmentSubmissionCreateWithoutAssignmentInput, AssignmentSubmissionUncheckedCreateWithoutAssignmentInput>
  }

  export type AssignmentSubmissionCreateManyAssignmentInputEnvelope = {
    data: AssignmentSubmissionCreateManyAssignmentInput | AssignmentSubmissionCreateManyAssignmentInput[]
    skipDuplicates?: boolean
  }

  export type ProblemSubmissionCreateWithoutAssignmentInput = {
    isCompleted?: boolean
    submittedAt?: Date | string
    student: StudentCreateNestedOneWithoutProblemSubsInput
    problem: ProblemCreateNestedOneWithoutProblemSubsInput
    submission?: AssignmentSubmissionCreateNestedOneWithoutProblemsInput
  }

  export type ProblemSubmissionUncheckedCreateWithoutAssignmentInput = {
    id?: number
    student_id: number
    problemId: number
    isCompleted?: boolean
    submittedAt?: Date | string
  }

  export type ProblemSubmissionCreateOrConnectWithoutAssignmentInput = {
    where: ProblemSubmissionWhereUniqueInput
    create: XOR<ProblemSubmissionCreateWithoutAssignmentInput, ProblemSubmissionUncheckedCreateWithoutAssignmentInput>
  }

  export type ProblemSubmissionCreateManyAssignmentInputEnvelope = {
    data: ProblemSubmissionCreateManyAssignmentInput | ProblemSubmissionCreateManyAssignmentInput[]
    skipDuplicates?: boolean
  }

  export type ClassUpsertWithoutAssignmentsInput = {
    update: XOR<ClassUpdateWithoutAssignmentsInput, ClassUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<ClassCreateWithoutAssignmentsInput, ClassUncheckedCreateWithoutAssignmentsInput>
    where?: ClassWhereInput
  }

  export type ClassUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: ClassWhereInput
    data: XOR<ClassUpdateWithoutAssignmentsInput, ClassUncheckedUpdateWithoutAssignmentsInput>
  }

  export type ClassUpdateWithoutAssignmentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    joinCode?: StringFieldUpdateOperationsInput | string
    teacher?: TeacherUpdateOneRequiredWithoutClassesNestedInput
    enrollments?: EnrollmentUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutAssignmentsInput = {
    class_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    joinCode?: StringFieldUpdateOperationsInput | string
    teacher_id?: IntFieldUpdateOperationsInput | number
    enrollments?: EnrollmentUncheckedUpdateManyWithoutClassNestedInput
  }

  export type ProblemUpsertWithWhereUniqueWithoutAssignmentInput = {
    where: ProblemWhereUniqueInput
    update: XOR<ProblemUpdateWithoutAssignmentInput, ProblemUncheckedUpdateWithoutAssignmentInput>
    create: XOR<ProblemCreateWithoutAssignmentInput, ProblemUncheckedCreateWithoutAssignmentInput>
  }

  export type ProblemUpdateWithWhereUniqueWithoutAssignmentInput = {
    where: ProblemWhereUniqueInput
    data: XOR<ProblemUpdateWithoutAssignmentInput, ProblemUncheckedUpdateWithoutAssignmentInput>
  }

  export type ProblemUpdateManyWithWhereWithoutAssignmentInput = {
    where: ProblemScalarWhereInput
    data: XOR<ProblemUpdateManyMutationInput, ProblemUncheckedUpdateManyWithoutAssignmentInput>
  }

  export type ProblemScalarWhereInput = {
    AND?: ProblemScalarWhereInput | ProblemScalarWhereInput[]
    OR?: ProblemScalarWhereInput[]
    NOT?: ProblemScalarWhereInput | ProblemScalarWhereInput[]
    id?: IntFilter<"Problem"> | number
    title?: StringFilter<"Problem"> | string
    content?: StringFilter<"Problem"> | string
    assignmentId?: IntFilter<"Problem"> | number
    expectedOutput?: StringFilter<"Problem"> | string
  }

  export type AssignmentSubmissionUpsertWithWhereUniqueWithoutAssignmentInput = {
    where: AssignmentSubmissionWhereUniqueInput
    update: XOR<AssignmentSubmissionUpdateWithoutAssignmentInput, AssignmentSubmissionUncheckedUpdateWithoutAssignmentInput>
    create: XOR<AssignmentSubmissionCreateWithoutAssignmentInput, AssignmentSubmissionUncheckedCreateWithoutAssignmentInput>
  }

  export type AssignmentSubmissionUpdateWithWhereUniqueWithoutAssignmentInput = {
    where: AssignmentSubmissionWhereUniqueInput
    data: XOR<AssignmentSubmissionUpdateWithoutAssignmentInput, AssignmentSubmissionUncheckedUpdateWithoutAssignmentInput>
  }

  export type AssignmentSubmissionUpdateManyWithWhereWithoutAssignmentInput = {
    where: AssignmentSubmissionScalarWhereInput
    data: XOR<AssignmentSubmissionUpdateManyMutationInput, AssignmentSubmissionUncheckedUpdateManyWithoutAssignmentInput>
  }

  export type ProblemSubmissionUpsertWithWhereUniqueWithoutAssignmentInput = {
    where: ProblemSubmissionWhereUniqueInput
    update: XOR<ProblemSubmissionUpdateWithoutAssignmentInput, ProblemSubmissionUncheckedUpdateWithoutAssignmentInput>
    create: XOR<ProblemSubmissionCreateWithoutAssignmentInput, ProblemSubmissionUncheckedCreateWithoutAssignmentInput>
  }

  export type ProblemSubmissionUpdateWithWhereUniqueWithoutAssignmentInput = {
    where: ProblemSubmissionWhereUniqueInput
    data: XOR<ProblemSubmissionUpdateWithoutAssignmentInput, ProblemSubmissionUncheckedUpdateWithoutAssignmentInput>
  }

  export type ProblemSubmissionUpdateManyWithWhereWithoutAssignmentInput = {
    where: ProblemSubmissionScalarWhereInput
    data: XOR<ProblemSubmissionUpdateManyMutationInput, ProblemSubmissionUncheckedUpdateManyWithoutAssignmentInput>
  }

  export type AssignmentCreateWithoutProblemsInput = {
    title: string
    description: string
    createdAt?: Date | string
    deadline: Date | string
    class: ClassCreateNestedOneWithoutAssignmentsInput
    submissions?: AssignmentSubmissionCreateNestedManyWithoutAssignmentInput
    problemSubs?: ProblemSubmissionCreateNestedManyWithoutAssignmentInput
  }

  export type AssignmentUncheckedCreateWithoutProblemsInput = {
    id?: number
    title: string
    description: string
    createdAt?: Date | string
    classId: number
    deadline: Date | string
    submissions?: AssignmentSubmissionUncheckedCreateNestedManyWithoutAssignmentInput
    problemSubs?: ProblemSubmissionUncheckedCreateNestedManyWithoutAssignmentInput
  }

  export type AssignmentCreateOrConnectWithoutProblemsInput = {
    where: AssignmentWhereUniqueInput
    create: XOR<AssignmentCreateWithoutProblemsInput, AssignmentUncheckedCreateWithoutProblemsInput>
  }

  export type ProblemSubmissionCreateWithoutProblemInput = {
    isCompleted?: boolean
    submittedAt?: Date | string
    student: StudentCreateNestedOneWithoutProblemSubsInput
    assignment: AssignmentCreateNestedOneWithoutProblemSubsInput
    submission?: AssignmentSubmissionCreateNestedOneWithoutProblemsInput
  }

  export type ProblemSubmissionUncheckedCreateWithoutProblemInput = {
    id?: number
    student_id: number
    assignmentId: number
    isCompleted?: boolean
    submittedAt?: Date | string
  }

  export type ProblemSubmissionCreateOrConnectWithoutProblemInput = {
    where: ProblemSubmissionWhereUniqueInput
    create: XOR<ProblemSubmissionCreateWithoutProblemInput, ProblemSubmissionUncheckedCreateWithoutProblemInput>
  }

  export type ProblemSubmissionCreateManyProblemInputEnvelope = {
    data: ProblemSubmissionCreateManyProblemInput | ProblemSubmissionCreateManyProblemInput[]
    skipDuplicates?: boolean
  }

  export type AssignmentUpsertWithoutProblemsInput = {
    update: XOR<AssignmentUpdateWithoutProblemsInput, AssignmentUncheckedUpdateWithoutProblemsInput>
    create: XOR<AssignmentCreateWithoutProblemsInput, AssignmentUncheckedCreateWithoutProblemsInput>
    where?: AssignmentWhereInput
  }

  export type AssignmentUpdateToOneWithWhereWithoutProblemsInput = {
    where?: AssignmentWhereInput
    data: XOR<AssignmentUpdateWithoutProblemsInput, AssignmentUncheckedUpdateWithoutProblemsInput>
  }

  export type AssignmentUpdateWithoutProblemsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    class?: ClassUpdateOneRequiredWithoutAssignmentsNestedInput
    submissions?: AssignmentSubmissionUpdateManyWithoutAssignmentNestedInput
    problemSubs?: ProblemSubmissionUpdateManyWithoutAssignmentNestedInput
  }

  export type AssignmentUncheckedUpdateWithoutProblemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classId?: IntFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: AssignmentSubmissionUncheckedUpdateManyWithoutAssignmentNestedInput
    problemSubs?: ProblemSubmissionUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type ProblemSubmissionUpsertWithWhereUniqueWithoutProblemInput = {
    where: ProblemSubmissionWhereUniqueInput
    update: XOR<ProblemSubmissionUpdateWithoutProblemInput, ProblemSubmissionUncheckedUpdateWithoutProblemInput>
    create: XOR<ProblemSubmissionCreateWithoutProblemInput, ProblemSubmissionUncheckedCreateWithoutProblemInput>
  }

  export type ProblemSubmissionUpdateWithWhereUniqueWithoutProblemInput = {
    where: ProblemSubmissionWhereUniqueInput
    data: XOR<ProblemSubmissionUpdateWithoutProblemInput, ProblemSubmissionUncheckedUpdateWithoutProblemInput>
  }

  export type ProblemSubmissionUpdateManyWithWhereWithoutProblemInput = {
    where: ProblemSubmissionScalarWhereInput
    data: XOR<ProblemSubmissionUpdateManyMutationInput, ProblemSubmissionUncheckedUpdateManyWithoutProblemInput>
  }

  export type StudentCreateWithoutSubmissionsInput = {
    roll_num: number
    name: string
    branch: string
    password: string
    role?: $Enums.UserRole
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    problemSubs?: ProblemSubmissionCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutSubmissionsInput = {
    roll_num: number
    name: string
    branch: string
    password: string
    role?: $Enums.UserRole
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    problemSubs?: ProblemSubmissionUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutSubmissionsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutSubmissionsInput, StudentUncheckedCreateWithoutSubmissionsInput>
  }

  export type AssignmentCreateWithoutSubmissionsInput = {
    title: string
    description: string
    createdAt?: Date | string
    deadline: Date | string
    class: ClassCreateNestedOneWithoutAssignmentsInput
    problems?: ProblemCreateNestedManyWithoutAssignmentInput
    problemSubs?: ProblemSubmissionCreateNestedManyWithoutAssignmentInput
  }

  export type AssignmentUncheckedCreateWithoutSubmissionsInput = {
    id?: number
    title: string
    description: string
    createdAt?: Date | string
    classId: number
    deadline: Date | string
    problems?: ProblemUncheckedCreateNestedManyWithoutAssignmentInput
    problemSubs?: ProblemSubmissionUncheckedCreateNestedManyWithoutAssignmentInput
  }

  export type AssignmentCreateOrConnectWithoutSubmissionsInput = {
    where: AssignmentWhereUniqueInput
    create: XOR<AssignmentCreateWithoutSubmissionsInput, AssignmentUncheckedCreateWithoutSubmissionsInput>
  }

  export type ProblemSubmissionCreateWithoutSubmissionInput = {
    isCompleted?: boolean
    submittedAt?: Date | string
    student: StudentCreateNestedOneWithoutProblemSubsInput
    assignment: AssignmentCreateNestedOneWithoutProblemSubsInput
    problem: ProblemCreateNestedOneWithoutProblemSubsInput
  }

  export type ProblemSubmissionUncheckedCreateWithoutSubmissionInput = {
    id?: number
    problemId: number
    isCompleted?: boolean
    submittedAt?: Date | string
  }

  export type ProblemSubmissionCreateOrConnectWithoutSubmissionInput = {
    where: ProblemSubmissionWhereUniqueInput
    create: XOR<ProblemSubmissionCreateWithoutSubmissionInput, ProblemSubmissionUncheckedCreateWithoutSubmissionInput>
  }

  export type ProblemSubmissionCreateManySubmissionInputEnvelope = {
    data: ProblemSubmissionCreateManySubmissionInput | ProblemSubmissionCreateManySubmissionInput[]
    skipDuplicates?: boolean
  }

  export type StudentUpsertWithoutSubmissionsInput = {
    update: XOR<StudentUpdateWithoutSubmissionsInput, StudentUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<StudentCreateWithoutSubmissionsInput, StudentUncheckedCreateWithoutSubmissionsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutSubmissionsInput, StudentUncheckedUpdateWithoutSubmissionsInput>
  }

  export type StudentUpdateWithoutSubmissionsInput = {
    roll_num?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    problemSubs?: ProblemSubmissionUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutSubmissionsInput = {
    roll_num?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    problemSubs?: ProblemSubmissionUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type AssignmentUpsertWithoutSubmissionsInput = {
    update: XOR<AssignmentUpdateWithoutSubmissionsInput, AssignmentUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<AssignmentCreateWithoutSubmissionsInput, AssignmentUncheckedCreateWithoutSubmissionsInput>
    where?: AssignmentWhereInput
  }

  export type AssignmentUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: AssignmentWhereInput
    data: XOR<AssignmentUpdateWithoutSubmissionsInput, AssignmentUncheckedUpdateWithoutSubmissionsInput>
  }

  export type AssignmentUpdateWithoutSubmissionsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    class?: ClassUpdateOneRequiredWithoutAssignmentsNestedInput
    problems?: ProblemUpdateManyWithoutAssignmentNestedInput
    problemSubs?: ProblemSubmissionUpdateManyWithoutAssignmentNestedInput
  }

  export type AssignmentUncheckedUpdateWithoutSubmissionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classId?: IntFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    problems?: ProblemUncheckedUpdateManyWithoutAssignmentNestedInput
    problemSubs?: ProblemSubmissionUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type ProblemSubmissionUpsertWithWhereUniqueWithoutSubmissionInput = {
    where: ProblemSubmissionWhereUniqueInput
    update: XOR<ProblemSubmissionUpdateWithoutSubmissionInput, ProblemSubmissionUncheckedUpdateWithoutSubmissionInput>
    create: XOR<ProblemSubmissionCreateWithoutSubmissionInput, ProblemSubmissionUncheckedCreateWithoutSubmissionInput>
  }

  export type ProblemSubmissionUpdateWithWhereUniqueWithoutSubmissionInput = {
    where: ProblemSubmissionWhereUniqueInput
    data: XOR<ProblemSubmissionUpdateWithoutSubmissionInput, ProblemSubmissionUncheckedUpdateWithoutSubmissionInput>
  }

  export type ProblemSubmissionUpdateManyWithWhereWithoutSubmissionInput = {
    where: ProblemSubmissionScalarWhereInput
    data: XOR<ProblemSubmissionUpdateManyMutationInput, ProblemSubmissionUncheckedUpdateManyWithoutSubmissionInput>
  }

  export type StudentCreateWithoutProblemSubsInput = {
    roll_num: number
    name: string
    branch: string
    password: string
    role?: $Enums.UserRole
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    submissions?: AssignmentSubmissionCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutProblemSubsInput = {
    roll_num: number
    name: string
    branch: string
    password: string
    role?: $Enums.UserRole
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    submissions?: AssignmentSubmissionUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutProblemSubsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutProblemSubsInput, StudentUncheckedCreateWithoutProblemSubsInput>
  }

  export type AssignmentCreateWithoutProblemSubsInput = {
    title: string
    description: string
    createdAt?: Date | string
    deadline: Date | string
    class: ClassCreateNestedOneWithoutAssignmentsInput
    problems?: ProblemCreateNestedManyWithoutAssignmentInput
    submissions?: AssignmentSubmissionCreateNestedManyWithoutAssignmentInput
  }

  export type AssignmentUncheckedCreateWithoutProblemSubsInput = {
    id?: number
    title: string
    description: string
    createdAt?: Date | string
    classId: number
    deadline: Date | string
    problems?: ProblemUncheckedCreateNestedManyWithoutAssignmentInput
    submissions?: AssignmentSubmissionUncheckedCreateNestedManyWithoutAssignmentInput
  }

  export type AssignmentCreateOrConnectWithoutProblemSubsInput = {
    where: AssignmentWhereUniqueInput
    create: XOR<AssignmentCreateWithoutProblemSubsInput, AssignmentUncheckedCreateWithoutProblemSubsInput>
  }

  export type ProblemCreateWithoutProblemSubsInput = {
    title: string
    content: string
    expectedOutput: string
    assignment: AssignmentCreateNestedOneWithoutProblemsInput
  }

  export type ProblemUncheckedCreateWithoutProblemSubsInput = {
    id?: number
    title: string
    content: string
    assignmentId: number
    expectedOutput: string
  }

  export type ProblemCreateOrConnectWithoutProblemSubsInput = {
    where: ProblemWhereUniqueInput
    create: XOR<ProblemCreateWithoutProblemSubsInput, ProblemUncheckedCreateWithoutProblemSubsInput>
  }

  export type AssignmentSubmissionCreateWithoutProblemsInput = {
    isCompleted?: boolean
    submittedAt?: Date | string
    student: StudentCreateNestedOneWithoutSubmissionsInput
    assignment: AssignmentCreateNestedOneWithoutSubmissionsInput
  }

  export type AssignmentSubmissionUncheckedCreateWithoutProblemsInput = {
    id?: number
    student_id: number
    assignmentId: number
    isCompleted?: boolean
    submittedAt?: Date | string
  }

  export type AssignmentSubmissionCreateOrConnectWithoutProblemsInput = {
    where: AssignmentSubmissionWhereUniqueInput
    create: XOR<AssignmentSubmissionCreateWithoutProblemsInput, AssignmentSubmissionUncheckedCreateWithoutProblemsInput>
  }

  export type StudentUpsertWithoutProblemSubsInput = {
    update: XOR<StudentUpdateWithoutProblemSubsInput, StudentUncheckedUpdateWithoutProblemSubsInput>
    create: XOR<StudentCreateWithoutProblemSubsInput, StudentUncheckedCreateWithoutProblemSubsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutProblemSubsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutProblemSubsInput, StudentUncheckedUpdateWithoutProblemSubsInput>
  }

  export type StudentUpdateWithoutProblemSubsInput = {
    roll_num?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    submissions?: AssignmentSubmissionUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutProblemSubsInput = {
    roll_num?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    branch?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    submissions?: AssignmentSubmissionUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type AssignmentUpsertWithoutProblemSubsInput = {
    update: XOR<AssignmentUpdateWithoutProblemSubsInput, AssignmentUncheckedUpdateWithoutProblemSubsInput>
    create: XOR<AssignmentCreateWithoutProblemSubsInput, AssignmentUncheckedCreateWithoutProblemSubsInput>
    where?: AssignmentWhereInput
  }

  export type AssignmentUpdateToOneWithWhereWithoutProblemSubsInput = {
    where?: AssignmentWhereInput
    data: XOR<AssignmentUpdateWithoutProblemSubsInput, AssignmentUncheckedUpdateWithoutProblemSubsInput>
  }

  export type AssignmentUpdateWithoutProblemSubsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    class?: ClassUpdateOneRequiredWithoutAssignmentsNestedInput
    problems?: ProblemUpdateManyWithoutAssignmentNestedInput
    submissions?: AssignmentSubmissionUpdateManyWithoutAssignmentNestedInput
  }

  export type AssignmentUncheckedUpdateWithoutProblemSubsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classId?: IntFieldUpdateOperationsInput | number
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    problems?: ProblemUncheckedUpdateManyWithoutAssignmentNestedInput
    submissions?: AssignmentSubmissionUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type ProblemUpsertWithoutProblemSubsInput = {
    update: XOR<ProblemUpdateWithoutProblemSubsInput, ProblemUncheckedUpdateWithoutProblemSubsInput>
    create: XOR<ProblemCreateWithoutProblemSubsInput, ProblemUncheckedCreateWithoutProblemSubsInput>
    where?: ProblemWhereInput
  }

  export type ProblemUpdateToOneWithWhereWithoutProblemSubsInput = {
    where?: ProblemWhereInput
    data: XOR<ProblemUpdateWithoutProblemSubsInput, ProblemUncheckedUpdateWithoutProblemSubsInput>
  }

  export type ProblemUpdateWithoutProblemSubsInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    expectedOutput?: StringFieldUpdateOperationsInput | string
    assignment?: AssignmentUpdateOneRequiredWithoutProblemsNestedInput
  }

  export type ProblemUncheckedUpdateWithoutProblemSubsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    assignmentId?: IntFieldUpdateOperationsInput | number
    expectedOutput?: StringFieldUpdateOperationsInput | string
  }

  export type AssignmentSubmissionUpsertWithoutProblemsInput = {
    update: XOR<AssignmentSubmissionUpdateWithoutProblemsInput, AssignmentSubmissionUncheckedUpdateWithoutProblemsInput>
    create: XOR<AssignmentSubmissionCreateWithoutProblemsInput, AssignmentSubmissionUncheckedCreateWithoutProblemsInput>
    where?: AssignmentSubmissionWhereInput
  }

  export type AssignmentSubmissionUpdateToOneWithWhereWithoutProblemsInput = {
    where?: AssignmentSubmissionWhereInput
    data: XOR<AssignmentSubmissionUpdateWithoutProblemsInput, AssignmentSubmissionUncheckedUpdateWithoutProblemsInput>
  }

  export type AssignmentSubmissionUpdateWithoutProblemsInput = {
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutSubmissionsNestedInput
    assignment?: AssignmentUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type AssignmentSubmissionUncheckedUpdateWithoutProblemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    assignmentId?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentCreateManyStudentInput = {
    class_id: number
  }

  export type AssignmentSubmissionCreateManyStudentInput = {
    id?: number
    assignmentId: number
    isCompleted?: boolean
    submittedAt?: Date | string
  }

  export type ProblemSubmissionCreateManyStudentInput = {
    id?: number
    assignmentId: number
    problemId: number
    isCompleted?: boolean
    submittedAt?: Date | string
  }

  export type EnrollmentUpdateWithoutStudentInput = {
    class?: ClassUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutStudentInput = {
    class_id?: IntFieldUpdateOperationsInput | number
  }

  export type EnrollmentUncheckedUpdateManyWithoutStudentInput = {
    class_id?: IntFieldUpdateOperationsInput | number
  }

  export type AssignmentSubmissionUpdateWithoutStudentInput = {
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignment?: AssignmentUpdateOneRequiredWithoutSubmissionsNestedInput
    problems?: ProblemSubmissionUpdateManyWithoutSubmissionNestedInput
  }

  export type AssignmentSubmissionUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    assignmentId?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problems?: ProblemSubmissionUncheckedUpdateManyWithoutSubmissionNestedInput
  }

  export type AssignmentSubmissionUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    assignmentId?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSubmissionUpdateWithoutStudentInput = {
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignment?: AssignmentUpdateOneRequiredWithoutProblemSubsNestedInput
    problem?: ProblemUpdateOneRequiredWithoutProblemSubsNestedInput
    submission?: AssignmentSubmissionUpdateOneWithoutProblemsNestedInput
  }

  export type ProblemSubmissionUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    assignmentId?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSubmissionUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    assignmentId?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassCreateManyTeacherInput = {
    class_id?: number
    name: string
    joinCode: string
  }

  export type ClassUpdateWithoutTeacherInput = {
    name?: StringFieldUpdateOperationsInput | string
    joinCode?: StringFieldUpdateOperationsInput | string
    enrollments?: EnrollmentUpdateManyWithoutClassNestedInput
    assignments?: AssignmentUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutTeacherInput = {
    class_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    joinCode?: StringFieldUpdateOperationsInput | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutClassNestedInput
    assignments?: AssignmentUncheckedUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateManyWithoutTeacherInput = {
    class_id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    joinCode?: StringFieldUpdateOperationsInput | string
  }

  export type EnrollmentCreateManyClassInput = {
    student_id: number
  }

  export type AssignmentCreateManyClassInput = {
    id?: number
    title: string
    description: string
    createdAt?: Date | string
    deadline: Date | string
  }

  export type EnrollmentUpdateWithoutClassInput = {
    student?: StudentUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutClassInput = {
    student_id?: IntFieldUpdateOperationsInput | number
  }

  export type EnrollmentUncheckedUpdateManyWithoutClassInput = {
    student_id?: IntFieldUpdateOperationsInput | number
  }

  export type AssignmentUpdateWithoutClassInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    problems?: ProblemUpdateManyWithoutAssignmentNestedInput
    submissions?: AssignmentSubmissionUpdateManyWithoutAssignmentNestedInput
    problemSubs?: ProblemSubmissionUpdateManyWithoutAssignmentNestedInput
  }

  export type AssignmentUncheckedUpdateWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    problems?: ProblemUncheckedUpdateManyWithoutAssignmentNestedInput
    submissions?: AssignmentSubmissionUncheckedUpdateManyWithoutAssignmentNestedInput
    problemSubs?: ProblemSubmissionUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type AssignmentUncheckedUpdateManyWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deadline?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemCreateManyAssignmentInput = {
    id?: number
    title: string
    content: string
    expectedOutput: string
  }

  export type AssignmentSubmissionCreateManyAssignmentInput = {
    id?: number
    student_id: number
    isCompleted?: boolean
    submittedAt?: Date | string
  }

  export type ProblemSubmissionCreateManyAssignmentInput = {
    id?: number
    student_id: number
    problemId: number
    isCompleted?: boolean
    submittedAt?: Date | string
  }

  export type ProblemUpdateWithoutAssignmentInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    expectedOutput?: StringFieldUpdateOperationsInput | string
    problemSubs?: ProblemSubmissionUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateWithoutAssignmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    expectedOutput?: StringFieldUpdateOperationsInput | string
    problemSubs?: ProblemSubmissionUncheckedUpdateManyWithoutProblemNestedInput
  }

  export type ProblemUncheckedUpdateManyWithoutAssignmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    expectedOutput?: StringFieldUpdateOperationsInput | string
  }

  export type AssignmentSubmissionUpdateWithoutAssignmentInput = {
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutSubmissionsNestedInput
    problems?: ProblemSubmissionUpdateManyWithoutSubmissionNestedInput
  }

  export type AssignmentSubmissionUncheckedUpdateWithoutAssignmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    problems?: ProblemSubmissionUncheckedUpdateManyWithoutSubmissionNestedInput
  }

  export type AssignmentSubmissionUncheckedUpdateManyWithoutAssignmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSubmissionUpdateWithoutAssignmentInput = {
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutProblemSubsNestedInput
    problem?: ProblemUpdateOneRequiredWithoutProblemSubsNestedInput
    submission?: AssignmentSubmissionUpdateOneWithoutProblemsNestedInput
  }

  export type ProblemSubmissionUncheckedUpdateWithoutAssignmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSubmissionUncheckedUpdateManyWithoutAssignmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSubmissionCreateManyProblemInput = {
    id?: number
    student_id: number
    assignmentId: number
    isCompleted?: boolean
    submittedAt?: Date | string
  }

  export type ProblemSubmissionUpdateWithoutProblemInput = {
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutProblemSubsNestedInput
    assignment?: AssignmentUpdateOneRequiredWithoutProblemSubsNestedInput
    submission?: AssignmentSubmissionUpdateOneWithoutProblemsNestedInput
  }

  export type ProblemSubmissionUncheckedUpdateWithoutProblemInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    assignmentId?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSubmissionUncheckedUpdateManyWithoutProblemInput = {
    id?: IntFieldUpdateOperationsInput | number
    student_id?: IntFieldUpdateOperationsInput | number
    assignmentId?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSubmissionCreateManySubmissionInput = {
    id?: number
    problemId: number
    isCompleted?: boolean
    submittedAt?: Date | string
  }

  export type ProblemSubmissionUpdateWithoutSubmissionInput = {
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutProblemSubsNestedInput
    assignment?: AssignmentUpdateOneRequiredWithoutProblemSubsNestedInput
    problem?: ProblemUpdateOneRequiredWithoutProblemSubsNestedInput
  }

  export type ProblemSubmissionUncheckedUpdateWithoutSubmissionInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProblemSubmissionUncheckedUpdateManyWithoutSubmissionInput = {
    id?: IntFieldUpdateOperationsInput | number
    problemId?: IntFieldUpdateOperationsInput | number
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}