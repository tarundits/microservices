class CustomError extends Error {
    constructor(name: string, message: string, kind?: string) {
        super(message);
        this.name = name;
        if (kind) {
            this.kind = kind;
        }
    }

    kind?: string;
}

export default CustomError;