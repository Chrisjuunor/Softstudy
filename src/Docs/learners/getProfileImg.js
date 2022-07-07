module.exports = {
  get: {
    summary: "Learners profile image",
    tags: ["Learners"],
    security: [
      {
        learnerAuth: [],
      },
    ],
    responses: {
      200: {
        description: "successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                image:{
                  type:"image"
                }
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
