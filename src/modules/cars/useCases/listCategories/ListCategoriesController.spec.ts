import { hash } from "bcrypt";
// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { server } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("List Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("senha@123", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license)
       VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'XXX-XXX')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to list all  categories", async () => {
    const responseToken = await request(server).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "senha@123",
    });

    const { refresh_token } = responseToken.body;

    await request(server)
      .post("/categories")
      .send({
        name: "Category SuperTest",
        description: "Category SuperTest Description",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    const response = await request(server).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category SuperTest");
    expect(response.body[0].description).toEqual(
      "Category SuperTest Description"
    );
  });
});
