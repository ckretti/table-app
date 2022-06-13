const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'table_app',
  password: 'password',
  port: 5432,
});

const getRecords = (request, response) => {
  const orderField = request.body.orderby || "ID";
  const orderDirection = request.body.orderDirection || "ASC";
  const limit = parseInt(request.body.limit) || 20;
  const offset = ((parseInt(request.body.page) || 0) - 1) * limit;
  const filterField = request.body.filterField;
  const operator = request.body.operator;
  const value = request.body.value;

  const sqlOperator = getSqlOperator(operator);
  const filter = getFilterString(filterField, sqlOperator, value);

  pool.query(`SELECT * FROM "table"
    ${filter ? filter : ''}
    ORDER BY ${orderField} ${orderDirection}
    LIMIT $1 OFFSET $2`,
      [limit, offset],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      });
};

function getSqlOperator(operator) {
  if (operator == 'equal') {
    return '=';
  }
  if (operator == 'less') {
    return '<';
  }
  if (operator == 'more') {
    return '>';
  }
  return operator;
}

function getFilterString(filterField, sqlOperator, value) {
  if (!filterField || !value || !sqlOperator) {
    return '';
  }
  if (filterField === 'name' && sqlOperator === 'like') {
    return `WHERE ${filterField} ${sqlOperator} '%${value}%'`;
  }
  if (filterField === 'name' && sqlOperator !== 'like') {
    return `WHERE ${filterField} ${sqlOperator} '${value}'`;
  }
  return `WHERE ${filterField} ${sqlOperator} ${value}`;
}

module.exports = {
  getRecords,
};
