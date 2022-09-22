import request from "supertest";
import { DataSource } from "typeorm";
import app from "../app";
import AppDataSource from "../data-source";
import { IClientTest, IUserTest } from "../interfaces";

let connection: DataSource;

beforeAll(async () => {
  await AppDataSource.initialize()
    .then((res) => {
      connection = res;
    })
    .catch((err) => {
      console.error("Error during DataSource initialization", err);
    });
});

afterAll(async () => {
  await connection.destroy();
});

const user1: IUserTest = {
  name: "user 1",
  password: "abC123!@#",
  email: "user@mail.com",
};

const user2: IUserTest = {
  name: "user 2",
  password: "abC123!@#",
  email: "user2@mail.com",
};

const loginUser1 = {
  email: "user@mail.com",
  password: "abC123!@#",
};

const loginUser2 = {
  email: "user2@mail.com",
  password: "abC123!@#",
};

const client1: IClientTest = {
  name: "client1",
  email: "client1@mail.com",
  phone: "(61)99999-9999",
};

const contact1: IClientTest = {
  name: "contact1",
  email: "contact1@mail.com",
  phone: "(61)99999-9999",
};

describe("Creating an user", () => {
  test("Should create an user", async () => {
    const response = await request(app).post("/register").send(user1);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).not.toHaveProperty("password");
  });

  test("Should return an error for user with missing field", async () => {
    const response = await request(app).post("/register").send({
      password: "abC123!@#",
      email: "user1@mail.com",
    });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Nome é obrigatório");
  });

  test("Should return email already exists", async () => {
    const response = await request(app).post("/register").send(user1);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("E-mail já cadastrado");
  });

  test("Should return an error for weak password", async () => {
    const response = await request(app).post("/register").send({
      name: "agent 1",
      password: "123456",
      email: "agent2@mail.com",
    });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
  });
});

describe("Testing login", () => {
  test("Should be able to login", async () => {
    const response = await request(app).post("/login").send(loginUser1);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("token");

    user1.token = response.body.token;
  });

  test("Sould return an error for a non-existing agent", async () => {
    const response = await request(app).post("/login").send({ email: "agent@mail.com", password: "123" });

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("E-mail ou senha inválidos");
  });
});

describe("Creating client", () => {
  test("Should create a client", async () => {
    const response = await request(app)
      .post("/clients")
      .send(client1)
      .set("Authorization", `Bearer ${user1.token}`);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");

    client1.id = response.body.id;
  });

  test("Should return error for equal email", async () => {
    const response = await request(app)
      .post("/clients")
      .send({ name: "client1", email: "client1@mail.com", phone: "(61)9999-9999" })
      .set("Authorization", `Bearer ${user1.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("E-mail já cadastrado");
  });

  test("Should return error for unauthenticated user", async () => {
    const response = await request(app).post("/clients").send(client1);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Token obrigatório");
  });
});

describe("Updating client", () => {
  test("Should update a client", async () => {
    const response = await request(app)
      .patch(`/clients/${client1.id}`)
      .send({ name: "Patched client" })
      .set("Authorization", `Bearer ${user1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("Patched client");
  });

  test("Should return an error for a non existing client", async () => {
    const response = await request(app)
      .patch(`/clients/${client1.id}1`)
      .send({ name: "Patched client" })
      .set("Authorization", `Bearer ${user1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
  });

  test("Should return an error when user is not owner of client", async () => {
    await request(app).post("/register").send(user2);
    const login = await request(app).post("/login").send(loginUser2);
    user2.token = login.body.token;

    const response = await request(app)
      .patch(`/clients/${client1.id}`)
      .send({ name: "Patched client" })
      .set("Authorization", `Bearer ${user2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Você não possui acesso ao cliente");
  });
});

describe("Deleting a client", () => {
  test("Should return an error when user is not owner of client", async () => {
    const response = await request(app)
      .delete(`/clients/${client1.id}`)
      .set("Authorization", `Bearer ${user2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body.error).toEqual("Você não possui acesso ao cliente");
  });

  test("Should return an error for a non existing client", async () => {
    const response = await request(app)
      .delete(`/clients/${client1.id}1`)
      .set("Authorization", `Bearer ${user1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual("Cliente não encontrado");
  });

  test("Should delete a client", async () => {
    const response = await request(app)
      .delete(`/clients/${client1.id}`)
      .set("Authorization", `Bearer ${user1.token}`);

    expect(response.status).toEqual(204);
  });
});

describe("Creating contact", () => {
  test("Should create a contact", async () => {
    delete client1.id;

    const clientResponse = await request(app)
      .post("/clients")
      .send(client1)
      .set("Authorization", `Bearer ${user1.token}`);

    client1.id = clientResponse.body.id;

    const response = await request(app)
      .post(`/clients/${client1.id}/contacts`)
      .send(contact1)
      .set("Authorization", `Bearer ${user1.token}`);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");

    contact1.id = response.body.id;
  });

  test("Should return error for equal email", async () => {
    const response = await request(app)
      .post(`/clients/${client1.id}/contacts`)
      .send({ name: "contact1", email: "contact1@mail.com", phone: "(61)9999-9999" })
      .set("Authorization", `Bearer ${user1.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("E-mail já cadastrado");
  });

  test("Should return error for unauthenticated user", async () => {
    const response = await request(app).post(`/clients/${client1.id}/contacts`).send(contact1);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Token obrigatório");
  });
});

describe("Updating contact", () => {
  test("Should update a contact", async () => {
    const response = await request(app)
      .patch(`/contacts/${contact1.id}`)
      .send({ name: "Patched contact" })
      .set("Authorization", `Bearer ${user1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("Patched contact");
  });

  test("Should return an error for a non existing contact", async () => {
    const response = await request(app)
      .patch(`/contacts/${contact1.id}1`)
      .send({ name: "Patched contact" })
      .set("Authorization", `Bearer ${user1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
  });

  test("Should return an error when user is not owner of client", async () => {
    const response = await request(app)
      .patch(`/contacts/${contact1.id}`)
      .send({ name: "Patched contact" })
      .set("Authorization", `Bearer ${user2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Você não possui acesso ao contato");
  });
});

describe("Deleting a contact", () => {
  test("Should return an error when user is not owner of contact", async () => {
    const response = await request(app)
      .delete(`/contacts/${contact1.id}`)
      .set("Authorization", `Bearer ${user2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body.error).toEqual("Você não possui acesso ao contato");
  });

  test("Should return an error for a non existing contact", async () => {
    const response = await request(app)
      .delete(`/contacts/${contact1.id}1`)
      .set("Authorization", `Bearer ${user1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual("Contato não encontrado");
  });

  test("Should delete a contact", async () => {
    const response = await request(app)
      .delete(`/contacts/${contact1.id}`)
      .set("Authorization", `Bearer ${user1.token}`);

    expect(response.status).toEqual(204);
  });
});
