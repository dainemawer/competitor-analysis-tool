import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link'
import { useUser } from '@supabase/auth-helpers-react';

import {
    withPageAuth,
    supabaseClient
} from '@supabase/auth-helpers-nextjs';
import { useForm } from "react-hook-form";

import { postDataToGooglePSI } from '@services/google'
import Layout from '@components/Layout/Layout';
import { formatProjectName } from '@lib/helpers';

/**
 * New Test
 * 
 * Route that handles executing a new test for a given project
 * 
 * @param {*} props
 * @returns void
 */
function NewTest() {
    const { register, handleSubmit, setValue } = useForm();
    const { user } = useUser();
    const [competitors, setCompetitors] = useState([]);
    const [projects, setProjects] = useState([]);
    const [status, setStatus] = useState('');
    const [results, setResults] = useState([]);
    const [testID, setTestID] = useState('');

    const hasCompetitors = competitors && competitors.length > 0;

    const handleDeleteProject = () => {}

    useEffect(() => {

        async function getProjects() {

            const { data } = await supabaseClient
                .from('projects')
                .select('id, client_name, client_url, competitors');

            setProjects(data);
        }

        if (user) getProjects();

    }, [user]);

    const handleChange = async (event) => {

        const { data } = await supabaseClient
            .from('projects')
            .select('id, client_url, competitors')
            .eq('client_url', event.target.value)
            .single();

        setValue('projectID', data.id);
        setCompetitors(data.competitors)
    }

    const onSubmit = async (data) => {
        const { project, projectID } = data;
        const now = Date.now();

        if(competitors && competitors.length > 0) {
            const urls = [project,...competitors];

            setTestID(now);
            setStatus('Sending results to PSI...this can take up to 60 seconds');

            const response = await postDataToGooglePSI(urls);
            setResults(response, setStatus('Results received from PSI'));

            if (response) {
                const insert = await supabaseClient.from('tests').insert({
                    project: projectID,
                    test_id: now.toString(),
                    test: response,
                });

                if (insert.status === 201) {
                    console.log('Saved to db');
                }
            }
        } else {
            setStatus('No competitors');
        }

    }

    return (
        <Layout title="New Test">
            <Head>
                <title>New Test | 10up Competitor Analysis</title>
            </Head>
            <div className="container max-w-2xl mx-auto">
                <form className="bg-white shadow-lg p-8" onSubmit={handleSubmit(onSubmit)}>
                    <div className="block w-full mb-8">
                        <label className="block text-sm font-semibold mb-2">Select a Project</label>
                        <select className="border-2 block border-gray-600 w-full" {...register('project', {
                            onChange: (e) => handleChange(e),
                        })}>
                            <option value="">Select a Project</option>
                            {projects && projects.map((project) => {
                                return (
                                    <option key={project.id} value={project.client_url}>{formatProjectName(project.client_name)}</option>
                                )
                            })}
                        </select>
                    </div>

                    {hasCompetitors && (
                        <>
                            <h4 className="text-lg font-semibold mb-2">
                                Competitors
                            </h4>
                            <p className="text-sm mb-4">You&apos;ll be running a test against these competitors. <button className="hover:text-rose-600 focus:text-rose-600" type="button">Would you like to edit these competitors?</button></p>
                            <ul className="mb-6">
                                {hasCompetitors ? competitors.map((competitor, index) => (
                                    <li className={`py-2 flex items-center px-4 ${index % 2 === 0 ? 'bg-gray-100' : ''}`} key={competitor}>
                                        <svg className="mr-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C13.6569 21 15 16.9706 15 12C15 7.02944 13.6569 3 12 3M12 21C10.3431 21 9 16.9706 9 12C9 7.02944 10.3431 3 12 3M3 12C3 7.02944 7.02944 3 12 3" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <a className="border-b-2 border-transparent hover:border-black focus:border-black transition-all text-sm" href={competitor}>{competitor}</a>
                                    </li>
                                )) : (
                                    <li>No comepetitors found.</li>
                                )}
                            </ul>
                        </>
                    )}
                    <input type="hidden" {...register('projectID')} />
                    <div className="flex items-center justify-between">
                        <button className="py-2 px-8 bg-rose-500 hover:bg-rose-400 focus:bg-rose-400 transition-colors text-center text-white" type="submit" disabled={!competitors}>Run Test</button>
                        <button onClick={handleDeleteProject} className="text-sm text-rose-600 border-b-2 border-b-transparent hover:border-b-rose-500 focus:border-b-text-rose-500" type="button">Delete Project</button>
                    </div>
                    
                </form>
                <p>{status}</p>
                {results.length > 0 && (
                    <Link href={
                        {
                            pathname: `/tests/[id]`,
                            query: { id: testID }
                        }
                    }><a>View Test Results for test ID: {testID}</a></Link>
                )}
            </div>
        </Layout>
    )
}

export const getServerSideProps = withPageAuth({
    redirectTo: '/',
});

export default NewTest;