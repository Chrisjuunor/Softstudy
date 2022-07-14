const logoutAll = {
  post: {
    summary: "logout learners from all devices/sessions",
    description:
      "This endpoint logs out learners from the devices/sessions they have logged in",
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

module.exports = logoutAll;
