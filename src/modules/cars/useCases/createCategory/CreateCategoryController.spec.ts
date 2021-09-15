import { hash } from "bcrypt";
// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { server } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("Create Category Controller", () => {
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

  it("should be able to create a new category", async () => {
    const responseToken = await request(server).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "senha@123",
    });

    const { token } = responseToken.body;

    const response = await request(server)
      .post("/categories")
      .send({
        name: "Category SuperTest",
        description: "Category SuperTest Description",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category with a existing name", async () => {
    const responseToken = await request(server).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "senha@123",
    });

    const { token } = responseToken.body;

    const response = await request(server)
      .post("/categories")
      .send({
        name: "Category SuperTest",
        description: "Category SuperTest Description",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
