import Head from 'next/head'
import {
    withPageAuth,
    supabaseServerClient
} from '@supabase/auth-helpers-nextjs';

import { formatMetricName, formatMetricValue, formatProjectName } from '@lib/helpers'
import Layout from '@components/Layout/Layout'
import Section from '@components/Section/Section'

/**
 * Single Test
 * 
 * Route that handles the results of a single test
 * 
 * @param {*} props
 * @param {Object} props.data the stored results of a PSI test in Supabase
 * @param {Object} props.projects the object representing the given project the test falls under
 * @returns void
 */
export default function Test({ data, projects }) {
    const { test_id, test } = data;

    return (
        <Layout title={`Test: ${formatProjectName(projects.client_name)}`} testID={test_id}>
            <Head>
                <title>{`Test | ${test_id} | 10up Competitor Analysis`}</title>
            </Head>

            <Section title="Test Results" description="This section always displays the latest results from tests." icon="overview">
                {test && test.map(psi => {
                    const { loadingExperience, analysisUTCTimestamp, lighthouseResult } = psi;
                    const { metrics } = loadingExperience;
                    const { categories } = lighthouseResult;
                    const { performance } = categories;

                    console.log(psi);

                    return (
                        <div className="border-b-2 border-b-black mb-4 pb-4" key={psi.id}>
                            <h3>{psi.id}</h3>
                            <p>This test was conducted at: {analysisUTCTimestamp}</p>
                            <p>Performance score is: {performance.score * 100} / 100</p>
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left">Metric</th>
                                        <th className="text-left">Percentile</th>
                                        <th className="text-left">Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadingExperience && Object.keys(metrics).map(key => {
                                        const metric = metrics[key];
                                        const { percentile, category } = metric;
                                        const formattedValue = formatMetricValue(percentile);
                                        const miliseconds = formattedValue < 1 ? 'ms' : 's';
                                        return (
                                            <tr className="w-full" key={key}>
                                                <td className="py-2">{formatMetricName(key)[0]}</td>
                                                <td className="py-2">{formattedValue}{miliseconds}</td>
                                                <td className="py-2">{category}</td>
                                            </tr>
                                        )
                                    })}
                                    {psi?.loadingExperience && console.log(Object.keys(psi?.loadingExperience?.metrics))}
                                </tbody>
                            </table>
                        </div>
                    )
                })}
            </Section> 
        </Layout>
    );

}

export const getServerSideProps = withPageAuth({
    authRequired: true,
    async getServerSideProps(ctx) {

        const { data } = await supabaseServerClient(ctx)
            .from('tests')
            .select('*')
            .eq('test_id', ctx.query.id)
            .single();

        const { data: projects } = await supabaseServerClient(ctx)
            .from('projects')
            .select('*')
            .eq('id', data.project)
            .single();

        return { props: { data, projects } };
    }
});