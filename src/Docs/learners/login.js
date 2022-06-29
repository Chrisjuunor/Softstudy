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
                type:"string",
                requered: true
              }
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
              items: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

module.exports = login