import { Paging, PagingRecord, PagingUrlParameters } from './types'

const toLimit = (pageSize: number) => (
  `limit ${pageSize}`
)

const toOffset = (paging: PagingRecord) => (
  `offset ${(paging.page - 1) * paging.pageSize}`
)

const toSql = (paging: PagingRecord) => [
  toLimit(paging.pageSize),
  toOffset(paging),
].join(' ').trim()

const toUrlParams = (paging: PagingRecord): PagingUrlParameters => ({
  page: paging.page?.toString(),
  pageSize: paging.pageSize?.toString(),
})

export const createPaging = (options: PagingRecord): Paging => {
  let paging: Paging

  return paging = {
    page: options.page,
    pageSize: options.pageSize,
    updatePage: newPage => paging.page = newPage,
    updatePageSize: newPageSize => paging.pageSize = newPageSize,
    toSql: () => toSql(paging),
    toUrlParams: () => toUrlParams(paging),
  }
}
