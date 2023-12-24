/* eslint-disable @typescript-eslint/no-var-requires */
import request from "supertest";
import express from "express";

const app = express();
app.use(express.json());

jest.mock("../services/car-services", () => ({
  ...jest.requireActual("../services/car-services"),
  getAll: jest.fn(() => Promise.resolve([])),
  getById: jest.fn(() => Promise.resolve({})),
  create: jest.fn(() => Promise.resolve({})),
  update: jest.fn(() => Promise.resolve({})),
  delete: jest.fn(() => Promise.resolve(true)),
}));

describe("CarsController", () => {
  describe("GET /cars", () => {
    it("should respond with an array of cars", async () => {
      const response = await request(app).get("/cars");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it("should handle errors when getting cars", async () => {

      jest.spyOn(require("../services/car-services"), "getAll").mockRejectedValueOnce(new Error("Mock Error"));

      const response = await request(app).get("/cars");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Gagal mengambil daftar mobil" });
    });
  });

  describe("POST /cars", () => {
    it("should create a new car and respond with the created car", async () => {
      const carData = { name: "Car1", price: 10000 };

      const response = await request(app).post("/cars").send(carData);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
    });

    it("should handle errors when creating a car", async () => {

      jest.spyOn(require("../services/car-services"), "create").mockRejectedValueOnce(new Error("Mock Error"));

      const response = await request(app).post("/cars").send({});
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Gagal menambahkan mobil ke database" });
    });
  });

  describe("GET /cars/:id", () => {
    it("should respond with a single car", async () => {
      const carId = 1;
      const response = await request(app).get(`/cars/${carId}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
    });

    it("should handle errors when getting a car by id", async () => {
      const carId = 1;
 
      jest.spyOn(require("../services/car-services"), "getById").mockRejectedValueOnce(new Error("Mock Error"));

      const response = await request(app).get(`/cars/${carId}`);
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Gagal mengambil data mobil" });
    });

    it("should respond with 404 if the car is not found", async () => {
      const carId = 999; 
      const response = await request(app).get(`/cars/${carId}`);
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Mobil tidak ditemukan" });
    });
  });

  describe("DELETE /cars/:id", () => {
    it("should delete a car and respond with success message", async () => {
      const carId = 1;
      const response = await request(app).delete(`/cars/${carId}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Mobil berhasil dihapus" });
    });

    it("should handle errors when deleting a car by id", async () => {
      const carId = 1;

      jest.spyOn(require("../services/car-services"), "delete").mockRejectedValueOnce(new Error("Mock Error"));

      const response = await request(app).delete(`/cars/${carId}`);
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Gagal menghapus mobil" });
    });

    it("should respond with 404 if the car to delete is not found", async () => {
      const carId = 999; 
      const response = await request(app).delete(`/cars/${carId}`);
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Mobil tidak ditemukan" });
    });
  });

  describe("PUT /cars/:id", () => {
    it("should update a car and respond with success message", async () => {
      const carId = 1;
      const carData = { name: "UpdatedCar", price: 15000 };
      const response = await request(app).put(`/cars/${carId}`).send(carData);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Data Mobil berhasil di modifikasi" });
    });

    it("should handle errors when updating a car by id", async () => {
      const carId = 1;

      jest.spyOn(require("../services/car-services"), "update").mockRejectedValueOnce(new Error("Mock Error"));

      const response = await request(app).put(`/cars/${carId}`).send({});
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Gagal memodifikasi data mobil" });
    });

    it("should respond with 404 if the car to update is not found", async () => {
      const carId = 999;
      const response = await request(app).put(`/cars/${carId}`).send({});
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Mobil tidak ditemukan" });
    });
  });
});