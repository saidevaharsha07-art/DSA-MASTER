/**
 * Reusable Pagination Abstraction Service
 */

import { ConnectorPaginatedResponse } from '../models/response.models';

export class PaginationService {
  public static paginate<T>(items: ReadonlyArray<T>, page: number = 1, pageSize: number = 10): ConnectorPaginatedResponse<T> {
    const startIndex = (page - 1) * pageSize;
    const sliced = items.slice(startIndex, startIndex + pageSize);
    const hasMore = startIndex + pageSize < items.length;

    return {
      items: Object.freeze(sliced),
      page,
      pageSize,
      totalItems: items.length,
      hasMore,
    };
  }
}
