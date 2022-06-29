module.exports= {
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
            properties: {
              firstName: {
                type: "string",
                required: true,
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