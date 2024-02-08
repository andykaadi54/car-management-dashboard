import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("Cars API", () => {
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

  // Tes endpoint GET /cars
  it("should get all cars", async () => {
    const response = await supertest(app).get("/cars");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  // Tes endpoint GET /cars/:id
  it("should get a car by ID", async () => {
    const carId = 9;
    const response = await supertest(app).get(`/cars/${carId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  // Tes endpoint POST /cars
  it("should create a new car", async () => {
    const carData = {
      name: "New Car",
      price: 50000,
    };

    const image = "./src/tests/almaz.jpg";

    const response = await supertest(app)
      .post("/cars")
      .set("Authorization", `Bearer ${adminToken}`)
      .field("name", carData.name)
      .field("price", carData.price)
      .attach("image", image);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  // Tes endpoint DELETE /cars/:id
  it("should delete a car by ID", async () => {
    const carId = 21;
    const response = await supertest(app)
      .delete(`/cars/${carId}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  // Tes endpoint PUT /cars/:id
  it("should update a car by ID", async () => {
    const carId = 17;
    const updatedCarData = {
      name: "Updated Car",
      price: 60000,
    };

    const response = await supertest(app)
      .put(`/cars/${carId}`)
      .send(updatedCarData)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
