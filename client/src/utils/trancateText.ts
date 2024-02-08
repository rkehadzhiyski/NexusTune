export function truncateText(text:string , length:number) {
    const maxLength = length; 
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    } else {
        return text;
    }
}