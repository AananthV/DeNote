export default {
    title: "User Schema",
    type: "object",
    properties: {
        username: {
            type: "string",
            format: "username", // custom format
            minLength: 6,
            maxLength: 15,
        },
        email: {
            type: "string",
            format: "email",
        },
        passwordHash: {
            type: "string",
        },
        passwordSalt: {
            type: "string",
        }
    },
    required: ["username", "email", "passwordHash", "passwordSalt"],
}