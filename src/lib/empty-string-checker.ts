export const StringEmpty = (string: string) => {
    if (string.trim().length) return false;

    return true;
}