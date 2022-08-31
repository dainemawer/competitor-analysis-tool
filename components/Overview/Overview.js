import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Alert from '@components/Alert/Alert';
import { formatMetricName, formatNumberValues, formatWebVitalValues } from '@lib/helpers'

/**
 * Overview
 * 
 * Renders the Overview section on project pages.
 * 
 * @param {*} props
 * @param {Array} props.tests an array of test data objects
 * @returns void
 */
export default function Overview({ tests }) {
    const [latestTest, setLatestTest] = useState(null)
    const [competitors, setCompetitors] = useState(null)

    useEffect(() => {
        setLatestTest(tests[tests.length - 1]);
        setCompetitors(tests[tests.length - 1].test.slice(1, 4));
    }, [tests])

    if (!tests.length > 0) {
        return <Alert label="This data will only populate once you have a number of valid tests." />
    }

    return (
        <section className="grid lg:grid-cols-3 grid-rows-2 gap-8 mb-6">
            {latestTest?.test.map((test, index) => {
                return Object.keys(test.loadingExperience.metrics).map(metric => {
                    const percentile = test.loadingExperience.metrics[metric]?.percentile;
                    const category = test.loadingExperience.metrics[metric]?.category;
                    const metricName = formatMetricName(metric)[1];
                    const webDevLink = `https://web.dev/${metricName.toLowerCase()}`;
                    const sortedCompetitors = competitors.sort((a, b) => a.loadingExperience.metrics[metric].percentile - b.loadingExperience.metrics[metric].percentile);

                    if (index === 0) {
                        const clientScore = parseFloat(formatNumberValues(metricName, percentile));
                        const competitorLowestScore = parseFloat(formatNumberValues(metricName, sortedCompetitors[0].loadingExperience.metrics[metric].percentile));
                        
                        return (
                            <div key={metric} className="shadow-lg bg-white">
                                <div className="p-6 text-center relative">
                                    {clientScore > competitorLowestScore && (
                                        <span className="absolute flex items-center left-6 top-6 rounded-full bg-red-200 text-red-700 text-xs py-1 px-3">
                                            <svg className="mr-1" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            Fail
                                        </span>
                                    )}
                                    <span className="text-xs font-medium">{category}</span>
                                    <p className="text-center text-6xl font-bold my-4">{formatWebVitalValues(metricName, percentile)}</p>
                                    <p className="text-center flex justify-center items-center">
                                        <a className="border-b-2 border-transparent hover:border-black focus:border-black transition-all font-semibold text-sm" href={webDevLink}>{metricName}</a>
                                        <svg width="16" height="16" className="relative ml-1 -top-[1px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </p>
                                    <small className="block">{formatMetricName(metric)[0]}</small>
                                </div>
                                <div>
                                    <h5 className="text-xs py-4 px-6">Competitors</h5>
                                    <table className="w-full">
                                        <tbody>
                                            {sortedCompetitors && sortedCompetitors.map((competitor, index) => {
                                                const { loadingExperience } = competitor;
                                                const { metrics } = loadingExperience;
                                                const competitorPercentile = metrics[metric]?.percentile;
                                                const firstItem = index === 0;
                                                const evenItems = index % 2 === 0 && index !== 0;

                                                const className = `${firstItem && 'bg-yellow-400'}`
                                            
                                                return (
                                                    <tr key={competitor.id} className={`text-xs ${className} ${evenItems ? 'bg-gray-50' : ''}`}>
                                                        <td className="py-4 px-6">{competitor.id}</td>
                                                        <td className="py-4 px-6">{formatWebVitalValues(metricName, competitorPercentile)}</td>
                                                        <td className="py-4 px-6">{firstItem && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 10V3L4 14h7v7l9-11h-7Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    }
                })
            })}
        </section>
    )
}

Overview.propTypes = {
    tests: PropTypes.arrayOf(PropTypes.shape({})).isRequired
}