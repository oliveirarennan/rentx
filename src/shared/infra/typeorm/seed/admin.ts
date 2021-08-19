import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection();

  const id = uuidV4();
  const password = await hash("senha@123", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license)
     VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'XXX-XXX')
    `
  );

  await connection.close();
}
(async () => {
  try {
    await create();
    console.log("User admin created");
  } catch (error) {
    console.log("Fail to create user admin. ", error.message);
  }
})();
