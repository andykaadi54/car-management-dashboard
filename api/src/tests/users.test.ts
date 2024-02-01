import request from "supertest";
import express from "express";
import { UsersService } from "../services/user-services";
import { User } from "../models/users";

const app = express();
app.use(express.json());

jest.mock("../services/user-services", () => ({
  ...jest.requireActual("../services/user-services"),
  getUserByEmail: jest.fn(),
  comparePasswords: jest.fn() as jest.Mock<Promise<boolean>, [string, string]>,
  generateToken: jest.fn(),
  getUserIdFromToken: jest.fn(),
  getUserById: jest.fn(),
  hashPassword: jest.fn(),
  createUser: jest.fn(),
}));

jest.mock("../repositories/user-repository", () => ({
  ...jest.requireActual("../repositories/user-repository"),
}));

describe("User Controllers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /login", () => {
    it("should return a token on successful login", async () => {
      const mockUser: User = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        password: "hashedPassword",
        role: "member",
        created_at: new Date(2021, 0, 1), 
        updated_at: new Date(2021, 0, 2)
      };

      jest.spyOn(UsersService, "getUserByEmail").mockImplementation(async () => mockUser);
      jest.spyOn(UsersService, "comparePasswords").mockImplementation(async () => true);
      jest.spyOn(UsersService, "generateToken").mockReturnValue("mockToken");

      const response = await request(app)
        .post("/login")
        .send({ email: "john@example.com", password: "password123" })
        .expect(200);

      expect(response.body.token).toEqual("mockToken");
    });

    it("should return 401 on invalid credentials", async () => {
      jest.spyOn(UsersService, "getUserByEmail").mockResolvedValue(undefined);
      jest.spyOn(UsersService, "comparePasswords").mockResolvedValue(false);

      await request(app)
        .post("/login")
        .send({ email: "nonexistent@example.com", password: "invalidPassword" })
        .expect(401);
    });

    it("should return 500 on internal server error", async () => {
      jest.spyOn(UsersService, "getUserByEmail").mockRejectedValue(new Error("Mocked error"));

      await request(app)
        .post("/login")
        .send({ email: "john@example.com", password: "password123" })
        .expect(500);
    });
  });

  describe("POST /registerAdmin", () => {
    it("should register a new admin", async () => {
      jest.spyOn(UsersService, "getUserIdFromToken").mockReturnValue(1);
      jest.spyOn(UsersService, "getUserById").mockImplementation(async () => ({ 
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        created_at: new Date(),
        updated_at: new Date(),
        role: "superadmin"}));

      jest.spyOn(UsersService, "getUserByEmail").mockImplementation(async () => undefined);
      jest.spyOn(UsersService, "hashPassword").mockImplementation(async () => "hashedPassword");
      jest.spyOn(UsersService, "createUser").mockImplementation(async () => ({ 
        id: 2,
        name: "Admin",
        email: "admin@example.com",
        role: "admin",
        password: "hashedPassword",
        created_at: new Date(),
        updated_at: new Date()}));


      const response = await request(app)
        .post("/registerAdmin")
        .send({ name: "Admin", email: "admin@example.com", password: "password123" })
        .expect(200);

      expect(response.body.message).toEqual("Admin berhasil dibuat");
      expect(response.body.admin).toBeDefined();
    });
  });

  describe("POST /registerMember", () => {
    it("should register a new member", async () => {
      jest.spyOn(UsersService, "hashPassword").mockImplementation(async () => "hashedPassword");
      jest.spyOn(UsersService, "createUser").mockImplementation(async () => ({ 
        id: 3,
        name: "Member",
        email: "member@example.com",
        role: "member",
        password: "hashedPassword",
        created_at: new Date(),
        updated_at: new Date()}));

      const response = await request(app)
        .post("/registerMember")
        .send({ name: "Member", email: "member@example.com", password: "password123" })
        .expect(200);

      expect(response.body.message).toEqual("Member registered successfully");
      expect(response.body.member).toBeDefined();
    });
  });

  describe("GET /getCurrentUser", () => {
    it("should get current user details", async () => {
      jest.spyOn(UsersService, "getUserIdFromToken").mockReturnValue(1);
      jest.spyOn(UsersService, "getUserById").mockImplementation(async () => ({ 
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "member",
        password: "password",
        created_at: new Date(),
        updated_at: new Date() }));


      const response = await request(app)
        .get("/getCurrentUser")
        .set("Authorization", "Bearer mockToken")
        .expect(200);

      expect(response.body.user).toBeDefined();
    });

    it("should return 401 on unauthorized access", async () => {
      jest.spyOn(UsersService, "getUserIdFromToken").mockReturnValue(null);

      await request(app)
        .get("/getCurrentUser")
        .expect(401);
    });
  });
});