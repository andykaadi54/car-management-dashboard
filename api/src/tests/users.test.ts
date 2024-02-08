/* eslint-disable @typescript-eslint/no-unused-vars */
import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("User Endpoints", () => {
  let adminToken: string;

  beforeAll(async () => {
    try {
      // Login as superadmin to get the token
      const response = await request.post("/users/login").send({
        email: "super_admin@gmail.com",
        password: "123456",
      });
      adminToken = response.body.token;
      console.log("Admin Token:", adminToken);
    } catch (error) {
      console.error("Error getting admin token:", error);
    }
  });

  it("should login user and return a token", async () => {
    const response = await request.post("/users/login").send({
      email: "super_admin@gmail.com",
      password: "123456",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should register admin", async () => {
    const response = await request
      .post("/users/register/admin")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "New Admin test7",
        email: "new_admin_test7@gmail.com",
        password: "newAdminPassword",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Admin berhasil dibuat");
    expect(response.body).toHaveProperty("admin");
  });

  it("should register member", async () => {
    const response = await request.post("/users/register/member").send({
      name: "New Member test7",
      email: "new_member_test7@gmail.com",
      password: "newMemberPassword",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Member registered successfully"
    );
    expect(response.body).toHaveProperty("member");
  });

  it("should get current user", async () => {
    const response = await request
      .get("/users/current-user")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
  });
});
