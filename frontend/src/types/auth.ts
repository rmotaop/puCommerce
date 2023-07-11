export type Credentials = {
    username: string;
    password: string;
}

export type RoleEnum = "ROLE_OPERATOR" | "ROLE_GESTOR" | "ROLE_MANAGER" | "ROLE_ADMIN" | "ROLE_CLIENT";

export type AccessTokenPayload = {
    exp: number;
    user_name: string;
    authorities: RoleEnum[];
}