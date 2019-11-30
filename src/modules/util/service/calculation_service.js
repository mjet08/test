import { define } from '../../../containerHelper'

module.exports = define('calculationService', () => {
  const getPaginationInfo = (currentPage, limit, totalCount) => {
    let pageInfo = {}

    if (!currentPage || parseInt(currentPage) === 1) {
      pageInfo.offset = 0
      pageInfo.page = 1
    } else {
      pageInfo.offset = limit * parseInt(currentPage)
      pageInfo.page = parseInt(currentPage) - 1
    }

    pageInfo.totalPages = Math.ceil(totalCount / limit)
    pageInfo.nextPage = pageInfo.page + 2
    return pageInfo
  }

  return {
    getPaginationInfo
  }
})
