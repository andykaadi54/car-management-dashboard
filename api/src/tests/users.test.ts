import request from "supertest";
import express from "express";
import { UsersController } from "../controllers/user-controllers";
import { UsersService } from "../services/user-services";
import { UsersRepository } from "../repositories/user-repository";
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
      UsersService.getUserByEmail.mockResolvedValue(undefined);
      UsersService.comparePasswords.mockResolvedValue(false);

      await request(app)
        .post("/login")
        .send({ email: "nonexistent@example.com", password: "invalidPassword" })
        .expect(401);
    });

    it("should return 500 on internal server error", async () => {
      UsersService.getUserByEmail.mockRejectedValue(new Error("Mocked error"));

      await request(app)
        .post("/login")
        .send({ email: "john@example.com", password: "password123" })
        .expect(500);
    });
  });

  describe("POST /registerAdmin", () => {
    it("should register a new admin", async () => {
      UsersService.getUserIdFromToken.mockReturnValue(1);
      UsersService.getUserById.mockResolvedValue({ id: 1, role: "superadmin" });

      UsersService.getUserByEmail.mockResolvedValue(undefined);
      UsersService.hashPassword.mockResolvedValue("hashedPassword");
      UsersService.createUser.mockResolvedValue({ id: 2, name: "Admin", email: "admin@example.com", role: "admin" });

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
      UsersService.hashPassword.mockResolvedValue("hashedPassword");
      UsersService.createUser.mockResolvedValue({ id: 3, name: "Member", email: "member@example.com", role: "member" });

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
      jest.spyOn(UsersService, "getUserById").mockImplementation(async () => ({ id: 1, name: "John Doe", email: "john@example.com", role: "member" }));


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