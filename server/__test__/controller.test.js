const {
  test,
  expect,
  describe,
  beforeAll,
  afterAll,
} = require("@jest/globals");
const request = require("supertest");
const router = require("../app");
const { Book, Member, Borrow, Pinalty } = require("../models");

beforeAll(async () => {
  try {
    let data = [
      {
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 10,
      },
      {
        code: "SHR-1",
        title: "A Study in Scarlet",
        author: "Arthur Conan Doyle",
        stock: 1,
      },
      {
        code: "TW-11",
        title: "Twilight",
        author: "Stephenie Meyer",
        stock: 1,
      },
      {
        code: "HOB-83",
        title: "The Hobbit, or There and Back Again",
        author: "J.R.R. Tolkien",
        stock: 1,
      },
      {
        code: "NRN-7",
        title: "The Lion, the Witch and the Wardrobe",
        author: "C.S. Lewis",
        stock: 1,
      },
    ];
    let member = [
      {
        code: "M001",
        name: "Angga",
      },
      {
        code: "M002",
        name: "Ferry",
      },
      {
        code: "M003",
        name: "Putri",
      },
    ];
    await Book.bulkCreate(data);
    await Member.bulkCreate(member);
  } catch (error) {
    console.log(error);
    throw error;
  }
});
afterAll(async () => {
  try {
    await Book.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await Member.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await Borrow.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await Pinalty.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

describe("Controller API", () => {
  describe("GET /books", () => {
    it("should retrieve a list of books", async () => {
      const response = await request(router).get("/books");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /members", () => {
    it("should retrieve a list of members", async () => {
      const response = await request(router).get("/members");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("POST /borrowBook", () => {
    it("should borrow a book", async () => {
      const borrowData = {
        codeMembers: "M002",
        codeBooks: "JK-45",
      };
      const response = await request(router)
        .post("/borrowBook")
        .send(borrowData);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "message",
        "user success borrow book"
      );
    });

    it("should return 400 if member has already borrowed 2 books", async () => {
      const borrowData = {
        codeMembers: "M002",
        codeBooks: "JK-45",
      };
      await request(router).post("/borrowBook").send(borrowData);
      const response = await request(router)
        .post("/borrowBook")
        .send(borrowData);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Member has already borrowed 2 books"
      );
    });
  });

  describe("POST /returnBook", () => {
    it("should return a borrowed book", async () => {
      const returnData = {
        id: 1,
        memberId: 2,
      };
      const response = await request(router)
        .post("/returnBook")
        .send(returnData);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Book returned successfully"
      );
    });
  });
});
