module.exports = {
  post: {
    summary: "Learners can update their password",
    tags: ["Learners"],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              currentPassword: {
                type: "string",
              },
              newPassword: {
                type: "string",
              },
              required: ["currentPassword"],
            },
            example: {
              currentPassword: "pass1254",
              newPassword: "newpass1254",
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Password changed successfully",
        content: {
          "application/json": {
            schma: {
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
                message: "Password changed successfully",
              },
            },
          },
        },
      },
    },
  },
};