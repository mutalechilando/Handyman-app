export interface DataSource {
    query(sql: string): Promise<any>;
    transaction<T>(runInTransaction: (manager: any) => Promise<T>): Promise<T>;
}

export interface SqlPatch {
    level: number;
    sqlSource: string;
    isFile?: boolean;
}

type ClassConstructor<T> = new (...args: any[]) => T;

export interface JsonPatch {
    level: number;
    jsonSource: string;
    isFile?: boolean;
    table: ClassConstructor<any>;
}