export const generateRandomString = (): string => {
    const characters: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString: string = '';
    for (let i = 0; i < 8; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
}
