export class AuthToken {
    readonly tokenType: string
    readonly expiresAt: Number
    readonly expiresIn: Number
    readonly refreshToken: string
    readonly accessToken: string

    static fromJs(data?: any): AuthToken {
        data = data || {}

        return new AuthToken(
            data.tokenType,
            data.expiresAt,
            data.expiresIn,
            data.refreshToken,
            data.accessToken,
        )
    }

    private constructor(tokenType: string,
                expiresAt: Number,
                expiresIn: Number,
                refreshToken: string,
                accessToken: string) {
        this.tokenType = tokenType
        this.expiresAt = expiresAt
        this.expiresIn = expiresIn
        this.refreshToken = refreshToken
        this.accessToken = accessToken
    }

    isValid(): boolean {
        // TODO
        return false;
    }
}
