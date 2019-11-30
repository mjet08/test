import { define } from '../../../containerHelper'

module.exports = define('calculationService', () => {
  const getPaginationInfo = (currentPage, limit, totalCount) => {
    let pageInfo = {}

    if (!currentPage || parseInt(currentPage) === 1) {
      pageInfo.offset = 0
      pageInfo.page = 1
      pageInfo.nextPage = 2
    } else {
      pageInfo.offset = limit * parseInt(currentPage)
      pageInfo.nextPage = parseInt(currentPage) + 1
      pageInfo.page = parseInt(currentPage) - 1
    }

    pageInfo.totalPages = Math.ceil(totalCount / limit)
    return pageInfo
  }

  return {
    getPaginationInfo
  }
})
