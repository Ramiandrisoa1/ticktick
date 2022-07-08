
import { MiSQL } from "./miSQL.js";
import query from "../config/db-connection.js";

    const schema = {
            name:{type:"text"}
      };

      const userModel = new MiSQL(query, "user", schema);

export {  userModel };

    