const login = {
  post: {
    summary: "login learners",
    description: "This endpoint login learners into the system",
    tags: ["Learners"],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
                required: true,
              },
              password: {
                type: "string",
                requered: true,
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        summary: "success",
        description:
          "This response indicates that the learner was logged in successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                // $ref:"#/components/schemas/learners/example"
                status:"success",
                data:{
                  firstName: "John",
                  lastName: "Doe",
                  email: "johndoe@example.com",
                  dateOfBirth: "mm/dd/yyyy",
                  token:"string"
                }
              },
            },
          },
        },
      },
    },
  },
};

module.exports = login;
