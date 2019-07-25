export default [
  {
    key: 'shidian',
    title: '时点值',
    list: [
      { title: '余额', key: 'bal_amt', status: true },
      { title: '日新增', key: 'delta_bal', status: true },
      { title: '日支用', key: 'today_loan_amt', status: true },
      { title: '日还款', key: 'day_repay_amt', status: true },
      {
        title: '余额占比',
        key: 'bal_amt/uplevel_bal_amt',
        status: false,
        unit: '%'
      },
      {
        title: '日新增占比',
        key: 'delta_bal/uplevel_delta_bal',
        status: false
      }
    ]
  },
  {
    key: 'rijun',
    title: '日均值',
    list: [
      { title: '日均新增', key: 'rijunxinzeng', status: true },
      { title: '日均支用', key: 'rijunzhiyong', status: true },
      { title: '日均还款', key: 'rijunhuankuan', status: true },
      {
        title: '日均新增占比',
        key: 'rijunxinzeng/uplevel_rijunxinzeng',
        status: false
      }
    ]
  }
];
