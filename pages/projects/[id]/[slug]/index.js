import PropTypes from 'prop-types'
import {
    withPageAuth,
    supabaseServerClient
} from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';

import Layout from '@components/Layout/Layout'
import Section from '@components/Section/Section'
import Overview from '@components/Overview/Overview'
import History from '@components/History/History'

import { formatMetricName, getBorderColor, getBackgroundColor, formatProjectName } from '@lib/helpers'

/**
 * Single Project
 * 
 * Route that handles an overview of data of a given project
 * 
 * @param {*} props
 * @param {Object} props.projects the given project
 * @param {Array} props.tests an array of tests for a given project
 * @returns void
 */
export default function Project({ projects, tests }) {
    const { user } = useUser();
    const { client_name } = projects;
    const projectName = formatProjectName(client_name);
    const clientTest = tests[tests.length - 1];

    let labels = [], datasets = [];

    // Collect Test Dates
    tests.map((test) => {
        const testDate = new Date(Number(test.test_id)).toLocaleDateString('en-US');
        labels.push(testDate);
    });

    // Output Chart Labels
    clientTest?.test.map((test, index) => {
        const { loadingExperience } = test;
        const { metrics } = loadingExperience;

        return Object.keys(metrics).map(metric => {
            if (index === 0) {
                datasets.push({ label: formatMetricName(metric)[1], data: [], backgroundColor: '', borderColor: '' })
            }
        })
    });

    // Output Chart Data
    tests.map(test => {
        const { loadingExperience } = test.test[0];
        const { metrics } = loadingExperience;
        return Object.keys(metrics).map((metric, index) => {
            datasets.map(dataset => {
                if (dataset.label === formatMetricName(metric)[1]) {
                    const value = metrics[metric].percentile;
                    dataset.borderColor = getBorderColor(index);
                    dataset.backgroundColor = getBackgroundColor(index);
                    dataset.data.push(value);
                }
            })
        })
    });

    const data = { labels, datasets };

    return (
        <Layout title={`${projectName} | Projects`}>
            <Section title="Overview" description="This section always displays the latest results from tests." icon="overview">
                <Overview tests={tests} />
            </Section>
            
            <Section title="Test History" description="This section keeps track of all the tests you've performed on a project." icon="bookmark">
                <History tests={tests} user={user} projects={projects} />
            </Section>
        </Layout>
    );

}

export const getServerSideProps = withPageAuth({
    authRequired: true,
    async getServerSideProps(ctx) {
        const { query } = ctx;
        const { id } = query;

        const { data: projects } = await supabaseServerClient(ctx)
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();

        const { data: tests } = await supabaseServerClient(ctx)
            .from('tests')
            .select('*')
            .eq('project', id);

        return { props: { projects, tests } };
    }
});

Project.propTypes = {
    projects: PropTypes.shape({}),
    tests: PropTypes.arrayOf(PropTypes.shape({}))
};

Project.defaultProps = {
    projects: {},
    tests: []
};