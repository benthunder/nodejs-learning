const StatusCode = {
    FORBIDEN: 403,
    CONFLICT: 409,
};

const ReasonStatusCode = {
    FORBIDEN: "Bad request",
    CONFLICT: "Conflict",
};

class ErrorResponse extends Error {
    constructor(messages, status) {
        super(messages);
        this.status = status;
    }

    json(res, header = {}) {
        return res.status(this.statusCode).json(this);
    }

    send(res, header = {}) {
        return res.status(this.statusCode).send(this.message);
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(
        messages = ReasonStatusCode.CONFLICT,
        status = StatusCode.CONFLICT
    ) {
        super(messages, status);
    }
}

class ForbiddenRequestError extends ErrorResponse {
    constructor(
        messages = ReasonStatusCode.FORBIDEN,
        status = StatusCode.FORBIDEN
    ) {
        super(messages, status);
    }
}

module.exports = {
    ConflictRequestError,
    ForbiddenRequestError,
};