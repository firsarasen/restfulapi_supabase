import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FoodStock RESTful API",
      version: "1.0.0",
      description:
        "RESTful API untuk manajemen stok bahan makanan menggunakan Express.js dan Supabase.",
      contact: {
        name: "FoodStock API",
        email: "admin@foodstock.com",
      },
    },

    tags: [
      {
        name: "Authentication",
        description: "Authentication API",
      },
      {
        name: "Categories",
        description: "Category Management",
      },
      {
        name: "Foods",
        description: "Food Inventory Management",
      },
    ],

    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
          },
        },

        Category: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            name: {
              type: "string",
            },
          },
        },

        Food: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            category_id: {
              type: "integer",
            },
            stock: {
              type: "integer",
            },
            unit: {
              type: "string",
            },
            expired_date: {
              type: "string",
              format: "date",
            },
            description: {
              type: "string",
            },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "./routes/*.js",
    "./controllers/*.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;