const swaggerUI = require("swagger-ui-express");
const { object, string } = require("joi");
const PORT = process.env.PORT || 4000;
const learner = require("./learners");
const options = {
  customCss: ".swagger-ui { margin:0px 35px; } .topbar{display:none}",
};
const specs = {
  openapi: "3.0.0",
  info: {
    title: "Softstudy API",
    description: "The API endpoints documentation for the softstudy API",
    version: "1.0.0",
  },
  servers: [
    {
      url: `http://localhost:4000`,
      description: "Localhost (Development) server",
    },
    {
      url: "https://softstudy.herokuapp.com",
    },
  ],
  components: {
    securitySchemes: {
      learnerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat:"JWT",
        name: "Authorization",
        in: "header"
      },
    },
    schemas: {
      learners: {
        type: "object",
        properties: {
          firstName: {
            type: "string",
          },
          lastName: {
            type: "string",
          },
          email: {
            type: "string",
          },
          dateOfBirth: {
            type: "date",
          },
        },
        example:{
          firstName:"John",
          lastName:"Doe",
          email:"johndoe@example.com",
          dateOfBirth:"mm/dd/yyyy"
        }
      },
    },
    responses: {
      UnauthorizedError: {
        description: "Invalid email or password or Authentication error",
      },
    },
  },
  ...learner,
};

const swagger = (app) => {
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs, options));
};
module.exports = swagger;
