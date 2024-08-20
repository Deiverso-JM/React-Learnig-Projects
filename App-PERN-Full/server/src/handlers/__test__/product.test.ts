import request from "supertest";
import server from "../../server";
import db from "../../config/db";
import { response } from "express";

describe("POST /api/products/", () => {
  it("should display validation product", async () => {
    const response = await request(server).post("/api/products/").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);

    expect(response.status).not.toBe(201);
    expect(response.status).not.toBe(404);

    expect(response.body.errors).not.toHaveLength(2);
  });

  it("should display validation proice is not cero", async () => {
    const response = await request(server).post("/api/products/").send({
      name: "Otro test",
      price: 0,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toBe(201);
    expect(response.status).not.toBe(404);

    expect(response.body.errors).not.toHaveLength(2);
  });

  it("should new product", async () => {
    const response = await request(server).post("/api/products/").send({
      name: "Monitor - Test",
      price: 200,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
  });
});

describe("GET /api/products/", () => {
  it("GET A JSON WITH products", async () => {
    const resposne = await request(server).get("/api/products/");

    expect(resposne.status).toBe(200);
    expect(resposne.status).not.toBe(400);
    expect(resposne.body).toHaveProperty("data");
    expect(resposne.headers["content-type"]).toMatch(/json/);

    expect(resposne.status).not.toBe(400);
    expect(resposne.status).not.toBe(404);
  });
});

describe("GETALL /api/products/:id", () => {
  it("Should return a producto with by id", async () => {
    const productId = 1;
    const response = await request(server).get(`/api/products/${productId}`);


    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(400);
  });

  it("Should return a 404 from producto with by id", async () => {
    const productId = 2000;
    const response = await request(server).get(`/api/products/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");

    expect(response.status).not.toBe(200);
  });

  it("Should check a valid ID in the URL", async () => {
    
    const response = await request(server).get(`/api/products/check-no-valid`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0]).toHaveProperty('msg')
    expect(response.body.errors[0].msg).toBe('ID no valido')

    expect(response.status).not.toBe(200);
  });
  
});


