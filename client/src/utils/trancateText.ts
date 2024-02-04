export function truncateText(text:string) {
    const maxLength = 135;
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    } else {
        return text;
    }
}