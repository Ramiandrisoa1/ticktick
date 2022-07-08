import _ from "lodash";

function removeUdefinedColumn(obj) {
  var result = {};
  Object.entries(obj).map((el) => {
    if (el[1] !== undefined) {
      result[el[0]] = el[1];
    } else {
      result[el[0]] = "";
    }
  });
  return result;
}
export async function multipleColumnSet(obj, type) {
  if (typeof obj === "object") {
    const object = removeUdefinedColumn(obj);
    const values = Object.values(object);
    const keys = Object.keys(object);

    const columnSet = keys.map((key) => `${key} = ?`).join(` ${type} `);

    return { columnSet, values };
  } else {
    return "ERROR";
  }
}

export async function iterateKeysAndValues(params) {
  try {
    const column = Object.keys(params)
      .map((el) => el)
      .join(" , ");

    const values = Object.values(params)
      .map((el) => (typeof el === "string" ? "'" + el + "'" : el))
      .join(" , ");
    return { column, values };
  } catch (error) {
    return error;
  }
}

export function buildSchema(params) {
  const key = Object.keys(params);
  const value = Object.values(params);
  var sql = "";
  for (let i = 0; i < key.length; i++) {
    if (i === key.length - 1) {
      sql += ` ${key[i]} ${value[i].type}`;
    } else {
      sql += ` ${key[i]} ${value[i].type} , `;
    }
  }
  return sql;
}
export async function createTable(tableName, schema, query) {
  try {
    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (
     ${schema}
    )ENGINE=INNODB`;
    return await query(sql);
  } catch (error) {
    return error;
  }
}
