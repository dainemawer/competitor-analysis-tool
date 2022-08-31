import PropTypes from 'prop-types'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import Alert from '@components/Alert/Alert';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

/**
 * Trends
 * 
 * Renders a ChartJS chart to show data over a timeline.
 * 
 * @param {*} props
 * @param {Array} props.data React children nodes
 * @param {Array} props.tests if a test page, the test ID is passed
 * @returns void
 */
export default function Trends({ data, tests }) {

    if (! tests.length > 0) {
        return <Alert label="This data will only populate once you have a number of valid tests." />
    }

    return <Line options={{ responsive: true }} data={data} />
}

Trends.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})),
    tests: PropTypes.arrayOf(PropTypes.shape({}))
}

Trends.defaultProps = {
    data: [],
    test: []
}