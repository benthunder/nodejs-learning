const StatusCode = {
    OK: 200,
    CREATED: 201,
};

const ReasonStatusCode = {
    OK: "Success",
    CREATED: "Created",
};

class SuccessResponse {
    constructor({
        message,
        statusCode = StatusCode.OK,
        reason = ReasonStatusCode.OK,
        metadata = {},
    }) {
        this.message = !message ? reason : message;
        this.statusCode = statusCode;
        this.metadata = metadata;
    }

    json(res, header = {}) {
        return res.status(this.statusCode).json(this);
    }

    send(res, header = {}) {
        return res.status(this.statusCode).send(this);
    }
}

class OK extends SuccessResponse {
    constructor({
        message,
        statusCode = StatusCode.OK,
        reason = ReasonStatusCode.OK,
        metadata = {},
    }) {
        super({
            message,
            statusCode,
            reason,
            metadata,
        });
    }
}

class CREATED extends SuccessResponse {
    constructor({
        message,
        statusCode = StatusCode.CREATED,
        reason = ReasonStatusCode.CREATED,
        metadata = {},
    }) {
        super({
            message,
            statusCode,
            reason,
            metadata,
        });
    }
}

module.exports = {
    OK,
    CREATED,
};
