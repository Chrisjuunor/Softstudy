const logout = {
  post: {
    summary: "logout learners from the current device/session",
    description:
      "This endpoint log out learners from the current device/session",
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
          "This response indicates that the learner was logged out successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                // $ref:"#/components/schemas/learners/example"
                status: "success",
                message: "logged out successfully",
              },
            },
          },
        },
      },
    },
  },
};

module.exports = logout;
