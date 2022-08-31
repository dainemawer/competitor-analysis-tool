import { useState } from 'react';
import Head from 'next/head'
import { useUser } from '@supabase/auth-helpers-react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import Layout from '@components/Layout/Layout';
import { useForm } from "react-hook-form";

/**
 * New Project
 * 
 * Route that handles creating a new project
 * 
 * @param {*} props
 * @returns void
 */
function NewProject() {
    const { user } = useUser();
    const [status, setStatus] = useState('');
    const { register, handleSubmit } = useForm({
        mode: "onSubmit",
        defaultValues: {
            client_name: '',
            client_url: '',
            competitor_one: '',
            competitor_two: '',
            competitor_three: '',
        },
    });

    const onSubmit = async (data) => {
        const { client_name, client_url, competitor_one, competitor_two, competitor_three } = data;
        setStatus('Loading...');

        try {

            const insert = await supabaseClient.from('projects').insert({
                client_name: client_name.toLocaleLowerCase(),
                client_url,
                competitors: [
                    competitor_one,
                    competitor_two,
                    competitor_three,
                ],
                user_id: user.id
            });

            if( insert.status === 201 ) {
                setStatus('Project added successfully');
            }

        } catch (error) {
            console.log(error)
            setStatus('There was a problem adding the project. Please trying again later.');
        }
    }

    return (
        <Layout title="New Project">
            <Head>
                <title>New Project | 10up Competitor Analysis</title>
            </Head>

             <div className="container max-w-2xl mx-auto">
                <form className="bg-white p-8 shadow-lg" onSubmit={handleSubmit(onSubmit)}>
                    <p className="text-xs mb-4">Ready to get started? Begin by adding a new project.</p>
                    <div className="block w-full mb-8">
                        <label className="block text-sm font-semibold mb-2">Client Name</label>
                        <input className="border-2 block border-gray-600 w-full" type="text" {...register('client_name')} />
                    </div>
                
                    <div className="block w-full mb-8">
                        <label className="block text-sm font-semibold mb-2">Client URL</label>
                        <input className="border-2 block border-gray-600 w-full" type="text" {...register('client_url')} />
                    </div>
                    
                    <hr className="mb-6" />

                    <div className="block w-full mb-8">
                        <label className="block text-sm font-semibold mb-2">Competitor 1</label>
                        <input className="border-2 block border-gray-600 w-full" type="text" {...register('competitor_one')} />
                    </div>

                    <div className="block w-full mb-8">
                        <label className="block text-sm font-semibold mb-2">Competitor 2</label>
                        <input className="border-2 block border-gray-600 w-full" type="text" {...register('competitor_two')} />
                    </div>
                    
                    <div className="block w-full mb-8">
                        <label className="block text-sm font-semibold mb-2">Competitor 3</label>
                        <input className="border-2 block border-gray-600 w-full" type="text" {...register('competitor_three')} />
                    </div>

                    <button className="py-2 px-8 bg-rose-500 hover:bg-rose-400 focus:bg-rose-700 transition-colors text-center text-white" type="submit">Add Project</button>
                </form>
                <p>{status}</p>
            </div>
        </Layout>
    )
}

export default NewProject;