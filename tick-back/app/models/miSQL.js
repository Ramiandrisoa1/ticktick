import { multipleColumnSet, iterateKeysAndValues, buildSchema } from "../utils/utils.js";
export class MiSQL {
  constructor(query, tableName, schema) {
    this.query = query;
    this.tableName = tableName;
    this.schema = schema;
    this.createTable = async () => {
      console.log("TABLE CREATED : ", this.tableName);
      const sql = `CREATE TABLE IF NOT EXISTS ${
        this.tableName
      } (id INT AUTO_INCREMENT PRIMARY KEY,
         ${buildSchema(this.schema)}
        )ENGINE=INNODB`;
      return await this.query(sql);
    };
  }

  find = async () => {
    await this.createTable();
    const sql = `SELECT * FROM ${this.tableName}`;
    return await this.query(sql);
  };

  create = async (params) => {
    await this.createTable();

    const { column, values } = await iterateKeysAndValues(params);
    const sql = `INSERT INTO ${this.tableName} (${column}) VALUES (${values})`;
    const response = await this.query(sql);
    const id = response.insertId;
    const sqlGet = `SELECT * FROM ${this.tableName} WHERE id =?`;
    const result = await this.query(sqlGet, [id]);
    return result[0];
  };

  belongsTo = async (parent_table, id_parent_table, params) => {
    await this.createTable();
    params[`id_${parent_table}`] = id_parent_table;
    const { column, values } = await iterateKeysAndValues(params);
    const sql = `INSERT INTO ${this.tableName} (${column}) VALUES (${values})`;
    const response = await this.query(sql);
    const id = response.insertId;
    const sqlGet = `SELECT * FROM ${this.tableName} WHERE id=?`;
    const result = await this.query(sqlGet, [id]);
    return result[0];
  };

  findBy = async (params, type) => {
    await this.createTable();

    try {
      const { columnSet, values } = await multipleColumnSet(params, type);
      const sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet} `;
      const result = await this.query(sql, [...values]);
      return result;
    } catch (error) {
      return error;
    }
  };

  findById = async (id) => {
    await this.createTable();

    const sql = `SELECT * FROM ${this.tableName} WHERE id =?`;
    const result = await this.query(sql, [id]);
    return result[0];
  };
  findByIdAndUpdate = async (params, id) => {
    await this.createTable();
    const { columnSet, values } = await multipleColumnSet(params, ",");
    const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id=${id}`;
    const result = await this.query(sql, [...values]);
    return result;
  };
  findByIdAndRemove = async (id) => {
    await this.createTable();
    const sql = `DELETE FROM ${this.tableName} WHERE id=${id}`;
    const result = await this.query(sql);
    return result;
  };

  findManyToMany = async (
    select_table_id,
    junction_table,
    parent_table_id,
    id,
    select_table
  ) => {
    await this.createTable();
    const sql = `SELECT ${select_table_id} FROM ${junction_table} WHERE ${parent_table_id} =${id}`;
    const result = await this.query(sql);
    const response = [];
    result.map(async (element) => {
      const querySql = `SELECT * FROM ${select_table} WHERE id = ${element.id}`;
      const res = await this.query(querySql);
      response.push(res[0]);
    });
    return response;
  };
}

const schemaCategory = {
  title: { type: "VARCHAR(250)" },
  content: { type: "VARCHAR(250)" },
  comment: { type: "VARCHAR(250)" },
};


const schemaTheme = {
  title: { type: "VARCHAR(250)" },
  user: { type: "VARCHAR(250)" },
  comment: { type: "VARCHAR(250)" },
  id_category: { type: "INT" },
};
const schemaTest = {
  dateChange: { type: "TIMESTAMP", default: "CURRENT_TIMESTAMP" },
  currentValueUSD: { type: "INT" },
  currentValueCAD: { type: "INT" },
};
// const categoryModel = new MiSQL(query, "category", schemaCategory);
// const themeModel = new MiSQL(query, "theme", schemaTheme);
// const testModel = new MiSQL(query, "test", schemaTest); 
