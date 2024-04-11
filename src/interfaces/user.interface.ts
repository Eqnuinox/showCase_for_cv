export interface I_User {
    id: number;
    account_number?: string;
    status?: string;
    first_name?: string;
    last_name?: string;
    email: string;
    phone?: string;
    is_verified?: boolean;
    last_logged_in?: Date;
    is_blocked?: boolean;
}
