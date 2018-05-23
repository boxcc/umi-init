import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];

tableListDataSource.push({
  ID: 'ef86c403-c3ce-4202-a7f4-a68dc50241e4',
  CreatedAt: '2018-02-04T18:34:07.33555-08:00',
  UpdatedAt: '2018-02-04T20:43:25.222242-08:00',
  Name: 'Oscar',
  FirstName: 'Oscar',
  LastName: 'Zhou',
  Addresses: [
    {
      ID: '744658fc-306f-48d1-83fa-f76f2a5d052f',
      CreatedAt: '0000-12-31T16:07:02-07:52',
      UpdatedAt: '2018-02-04T21:03:34.678579-08:00',
      AddressLine1: '13 Pigeownwood Lane',
      AddressLine2: 'Constellation',
      City: 'Auckland',
      Country: 'New Zealand',
      Postcode: '0613',
      UserID: 'ef86c403-c3ce-4202-a7f4-a68dc50241e4',
      DefaultAddress: true,
    },
    {
      ID: 'c244bbc4-648b-479c-bbc4-fd2e0bfecb6d',
      CreatedAt: '2018-02-04T20:52:47.918526-08:00',
      UpdatedAt: '2018-02-04T20:52:47.918526-08:00',
      AddressLine1: '53 Hobiton',
      AddressLine2: 'Dessert',
      City: 'Las Vegas',
      Country: 'USA',
      Postcode: '0483',
      UserID: 'ef86c403-c3ce-4202-a7f4-a68dc50241e4',
      DefaultAddress: false,
    },
  ],
  NickName: 'haha',
});

export function getCustomer(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = [...tableListDataSource];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.no) {
    dataSource = dataSource.filter(data => data.no.indexOf(params.no) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function postRule(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, no, description } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => no.indexOf(item.no) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        no: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        description,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getCustomer,
  postRule,
};
