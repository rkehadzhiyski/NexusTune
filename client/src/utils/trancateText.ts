export function truncateText(text:string) {
    const maxLength = 130;
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    } else {
        return text;
    }
}