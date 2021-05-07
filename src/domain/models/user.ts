export type UserModel = {
    // Attributes
    id: string
    fullName: string
    email: string
    password: string
}

export type AddUserParams = Omit<UserModel, 'id'>
