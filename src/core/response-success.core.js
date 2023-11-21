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
        data = {},
        metadata = {},
    }) {
        this.message = !message ? reason : message;
        this.statusCode = statusCode;
        this.data = data;
        this.metadata = metadata;
    }

    json(res, header = {}) {
        return res.status(this.statusCode).json(this);
    }

    send(res, header = {}) {
        return res.status(this.statusCode).send(this.message);
    }
}

class OK extends SuccessResponse {
    constructor({
        message,
        statusCode = StatusCode.OK,
        reason = ReasonStatusCode.OK,
        data = {},
        metadata = {},
    }) {
        super({
            message,
            statusCode,
            reason,
            data,
            metadata,
        });
    }
}

class CREATED extends SuccessResponse {
    constructor({
        message,
        statusCode = StatusCode.CREATED,
        reason = ReasonStatusCode.CREATED,
        data = {},
        metadata = {},
    }) {
        super({
            message,
            statusCode,
            reason,
            data,
            metadata,
        });
    }
}

module.exports = {
    OK,
    CREATED,
};
