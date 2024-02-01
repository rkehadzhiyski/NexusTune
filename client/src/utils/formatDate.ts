export function formatDate(date: string) {
    const dateObject = new Date(date);

    const day = dateObject.getUTCDate();
    const month = dateObject.getUTCMonth() + 1;
    const year = dateObject.getUTCFullYear();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const monthName = monthNames[month];

    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    const newDate = `${formattedDay} ${monthName} ${year}`;
    return newDate;
}
