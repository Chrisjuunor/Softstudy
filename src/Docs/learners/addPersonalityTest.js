module.exports = {
  post: {
    summary: "Add learner personality test results",
    description:
      "This endpoint adds a learner's personality test results to his/her profile",
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
            example: {
              bestFormOfLearning: "all of the above",
              bestReadingTime: "at night",
              likeOrganizationTools: "yes",
              canManageExamsPressure: "no",
              meetLikeMindedPersons: "yes",
              likeStudyGroups: "yes",
              preparationPreference: "planning for exams ahead",
              completeTaskBeforeRelaxing: "yes",
              struggleWithDeadline: "no",
              likeStudying: "yes",
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
                status: "success",
                message: "Learner personality test successfully added",
              },
            },
          },
        },
      },
      404: {
        summary: "Bad request",
        description:
          "This response indicates that there is an error in the request body",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                status: "error",
                message: "Bad request body",
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
