module.exports = {
  post: {
    summary: "sign up learners",
    description: "This endpoint creates or add learners into the system",
    tags: ["Learners"],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            // properties: {
            //   firstName: {
            //     type: "string",
            //     required: true,
            //   },
            //   lastName: {
            //     type: "string",
            //     required: true,
            //   },
            //   email: {
            //     type: "string",
            //     required: true,
            //   },
            // },
            example: {
              firstName: "John",
              lastName: "Doe",
              email: "johndoe@example.com",
              password: "12234john",
              dateOfBirth: "mm/dd/yyyy",
            },
          },
        },
      },
    },
    responses: {
      200: {
        summary: "success",
        description:
          "This response indicates that the learner was added successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                // $ref:"#/components/schemas/learners/example"
                status: "success",
                data: {
                  firstName: "John",
                  lastName: "Doe",
                  email: "johndoe@example.com",
                  dateOfBirth: "mm/dd/yyyy",
                  token: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};
