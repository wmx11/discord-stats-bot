const { format } = require('date-fns');

module.exports = (data, field) => {
  const dateLabels = data.map((item) =>
    format(item.date, 'yyy-MM-dd HH:mm:ss')
  );
  const dataValues = data.map((item) => item[field]);

  return { labels: dateLabels, datas: dataValues };
};
