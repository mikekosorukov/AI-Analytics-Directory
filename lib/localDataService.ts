// Local data service that mimics Supabase API calls
import { mockTools, mockCategories, mockTechnicalityLevels, MockTool, MockCategory, MockTechnicalityLevel } from './mockData';

// Simulate async behavior like real API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface QueryResult<T> {
  data: T[] | null;
  error: any;
  count?: number;
}

export interface QueryBuilder<T> {
  select: (columns: string, options?: { count?: string }) => QueryBuilder<T>;
  eq: (column: string, value: any) => QueryBuilder<T>;
  contains: (column: string, value: any) => QueryBuilder<T>;
  order: (column: string, options?: { ascending?: boolean }) => QueryBuilder<T>;
  range: (from: number, to: number) => Promise<QueryResult<T>>;
}

class MockQueryBuilder<T> implements QueryBuilder<T> {
  private _data: T[];
  private _columns: string = '*';
  private _count: string | undefined;
  private _filters: Array<(item: T) => boolean> = [];
  private _orderBy: { column: string; ascending: boolean } | null = null;

  constructor(data: T[]) {
    this._data = [...data];
  }

  select(columns: string, options?: { count?: string }): QueryBuilder<T> {
    this._columns = columns;
    this._count = options?.count;
    return this;
  }

  eq(column: string, value: any): QueryBuilder<T> {
    this._filters.push((item: any) => item[column] === value);
    return this;
  }

  contains(column: string, value: any): QueryBuilder<T> {
    this._filters.push((item: any) => {
      const itemValue = item[column];
      if (Array.isArray(itemValue)) {
        return Array.isArray(value) 
          ? value.some(v => itemValue.includes(v))
          : itemValue.includes(value);
      }
      return false;
    });
    return this;
  }

  order(column: string, options?: { ascending?: boolean }): QueryBuilder<T> {
    this._orderBy = {
      column,
      ascending: options?.ascending ?? true
    };
    return this;
  }

  async range(from: number, to: number): Promise<QueryResult<T>> {
    await delay(100); // Simulate network delay

    try {
      // Apply filters
      let filteredData = this._data.filter(item => 
        this._filters.every(filter => filter(item))
      );

      // Apply ordering
      if (this._orderBy) {
        filteredData.sort((a: any, b: any) => {
          const aVal = a[this._orderBy!.column];
          const bVal = b[this._orderBy!.column];
          
          if (aVal < bVal) return this._orderBy!.ascending ? -1 : 1;
          if (aVal > bVal) return this._orderBy!.ascending ? 1 : -1;
          return 0;
        });
      }

      const total = filteredData.length;
      
      // Apply pagination
      const paginatedData = filteredData.slice(from, to + 1);

      return {
        data: paginatedData,
        error: null,
        count: this._count === 'exact' ? total : undefined
      };
    } catch (error) {
      return {
        data: null,
        error: error,
        count: undefined
      };
    }
  }
}

export class MockSupabaseClient {
  from(table: string) {
    switch (table) {
      case 'tools_updated':
        return new MockQueryBuilder<MockTool>(mockTools);
      case 'categories':
        return new MockQueryBuilder<MockCategory>(mockCategories);
      case 'technicality_level':
        return new MockQueryBuilder<MockTechnicalityLevel>(mockTechnicalityLevels);
      default:
        return new MockQueryBuilder<any>([]);
    }
  }
}

// Create a singleton instance
export const mockSupabase = new MockSupabaseClient();

// Helper function to get all data without pagination (for simple queries)
export const getCategories = async (): Promise<QueryResult<MockCategory>> => {
  await delay(50);
  return {
    data: mockCategories,
    error: null
  };
};

export const getTechnicalityLevels = async (): Promise<QueryResult<MockTechnicalityLevel>> => {
  await delay(50);
  return {
    data: mockTechnicalityLevels,
    error: null
  };
};
