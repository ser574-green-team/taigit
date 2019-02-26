import colors from '../../styles/colors';

export default {
    labels: ['Rodney', 'Berta', 'Steve', 'Remy', 'Hugo'],
    datasets: [{
        label: 'Number of Commits',
        data: [26, 14, 12, 17, 9],
        backgroundColor: [
            colors.blue.base,
            colors.blue.light,
            colors.blue.dark,
            colors.blue.base,
            colors.blue.light,
        ],
        borderWidth: 1
    }]
}