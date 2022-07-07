module.exports = {
  patch: {
    summary: "Learners can update their details",
    tags: ["Learners"],
    security: [
      {
        learnerAuth: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              firstName: {
                type: "string",
              },
              lastName: {
                type: "string",
              },
              dateOfBirth:{
                type:"date"
              }
            },
            example: {
              firstName: "John",
              lastName: "Doe",
              dateOfBirth:"mm/dd/yyyy"
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Details updated successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                },
                message: {
                  type: "string",
                },
              },
              example: {
                status: "success",
                message: "Details updated successfully",
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
