export default (username: string) => {
    const re = new RegExp('^[a-z0-9_]{6,15}$');
    return re.test(username);
}