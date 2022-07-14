module.exports = {
  get: {
    summary: "Get learner's profile details",
    description: "This endpoint sends a learner's profile details",
    tags: ["Learners"],
    security: [
      {
        learnerAuth: [],
      },
    ],
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
                status: "success",
                data: {
                  firstName: "John",
                  lastName: "Doe",
                  email: "johndoe@example.com",
                  dateOfBirth: "mm/dd/yyyy"
                },
              },
            },
          },
        },
      },
      401: {
        $ref: "#/components/responses/UnauthorizedError",
      },
    },
  },
};
