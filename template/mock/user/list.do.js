var Mock = require('mockjs')

module.exports = function (req, res, next) {
  var data = {
    'result': 'success',
    'messages': [],
    'fieldErrors': {},
    'errors': [],
    'data': {
      totalCount: 30,
      pageNo: req.query.pageNo,
      pageSize: req.query.pageSize,
      'listData|10': [{
        id: '@id',
        'name': '@name',
        address: '@county(true)',
        'role': '普通用户'
      }]
    }
  }
  data = JSON.stringify(Mock.mock(data))

  res.end(data)
}
