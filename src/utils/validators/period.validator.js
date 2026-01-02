const validationRules = {
    week: 'WEEK',
    month: 'MONTH',
    year: 'YEAR',
}

export default function isPeriod(period) {
    const field = validationRules[period];

    return (field || field === period.toUpperCase()) ? true : false;
}