module.exports = {
  post: {
    summary: "Adds an image to a learners profile. Image size should be 1mb or less",
    tags: ["Learners"],
    security: [
      {
        learnerAuth: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              file: {
                type: "file",
                description: "image to use as a profile image",
                format: "binary"
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Image uploaded successfully",
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
                message: "Image uploaded successfully",
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
