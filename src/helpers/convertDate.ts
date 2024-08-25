export function convertDateFormat(dateString: any): string {
    let datePart;

    if (typeof dateString === 'number') {
        const dateObject = new Date(dateString);
        dateObject.setDate(dateObject.getDate() + 1); // Increment day by 1
        datePart = `${dateObject.getDate().toString().padStart(2, '0')}.${(
            dateObject.getMonth() + 1
        )
            .toString()
            .padStart(2, '0')}.${dateObject.getFullYear()}`;
    } else {
        if (dateString) {
            const dateParts = dateString.split('T')[0].split('-').reverse();
            dateParts[0] = parseInt(dateParts[0]) + 1; // Increment day by 1
            datePart = dateParts.join('.');
        }
    }

    return datePart;
}
