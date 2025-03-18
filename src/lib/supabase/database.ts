import { supabase } from './client';

export const createRecord = async <T extends Record<string, any>>(
  table: string,
  data: T
) => {
  return supabase.from(table).insert(data).select().single();
};

export const getRecord = async <T>(
  table: string,
  id: string,
  options?: {
    select?: string;
  }
) => {
  const query = supabase.from(table).select(options?.select || '*').eq('id', id).single();
  return query;
};

export const getRecords = async <T>(
  table: string,
  options?: {
    select?: string;
    filters?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
    offset?: number;
  }
) => {
  let query = supabase.from(table).select(options?.select || '*');

  if (options?.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
  }

  if (options?.orderBy) {
    query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending ?? true });
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  return query;
};

export const updateRecord = async <T extends Record<string, any>>(
  table: string,
  id: string,
  data: Partial<T>
) => {
  return supabase.from(table).update(data).eq('id', id).select().single();
};

export const deleteRecord = async (table: string, id: string) => {
  return supabase.from(table).delete().eq('id', id);
}; 