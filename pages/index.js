import Head from 'next/head';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import Layout from '@components/Layout/Layout';
import Icon from '@components/Icon/Icon';
import { useProjects } from '@lib/hooks';
import HomeContent from '@components/Home/Home';

/**
 * Home Page
 * 
 * Renders the index page which is either logged in or logged out.
 * 
 * @param {*} props
 * @returns void
 */
function Home() {
    const { user, error } = useUser();

    const loginWithGoogle = () => {
        supabaseClient.auth.signIn(
            { provider: 'google' }
        );
    }

    const loginWithSlack = () => {
        supabaseClient.auth.signIn(
            { provider: 'slack' }
        );
    }

    const loginWithGithub = () => {
        supabaseClient.auth.signIn(
            { provider: 'github' },
            { scopes: 'repo' }
        );
    }

    if (!user)
        return (
            <>
                <Head>
                    <title>Home | 10up Competitor Analysis</title>
                </Head>
                <div className="w-screen flex flex-col justify-center items-center h-screen">
                    <div className="w-full max-w-2xl">
                        <h1 className="text-4xl flex items-center font-semibold mb-16">
                            <Icon id="logo" />
                            10up Competitor Analysis Tool
                        </h1>
                        <form>

                            <div className="block w-full mb-8">
                                <label className="block text-sm font-semibold mb-2">Email</label>
                                <input type="email" className="border-2 block border-gray-600 w-full text-sm py-3 px-4" placeholder="Only a valid @get10up.com email address will be accepted." />
                            </div>
                            
                            <div className="block w-full mb-8">
                                <label className="block text-sm font-semibold mb-2">Password</label>
                                <input type="password" className="border-2 block border-gray-600 w-full text-sm py-3 px-4" placeholder="Enter your password" />
                            </div>

                            <button className="py-2 px-8 bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 transition-colors text-center text-white" type="submit">Login</button>
                        </form>
                        <p className="text-center my-10 text-sm relative after:content-[''] after:block after:w-full after:h-[1px] after:bg-gray-300 after:translate-y-1/2 after:top-1/2 after:absolute">
                            <span className="p-4 bg-white relative z-10">or login with</span>
                        </p>
                        <div className="grid gap-4 grid-cols-12">
                            <button className="col-span-4 border-2 flex items-center hover:border-gray-400 focus:border-gray-400 border-gray-200 py-3 text-sm font-medium px-4 transition-all" onClick={loginWithGoogle} type="button">
                                <Icon id="google" />
                                Continue with Google
                            </button>
                            <button className="col-span-4 flex items-center border-2 hover:border-gray-400 focus:border-gray-400 border-gray-200 py-3 text-sm font-medium px-4 transition-all" onClick={loginWithSlack} type="button">
                                <Icon id="slack" />
                                Continue with Slack
                            </button>
                            <button className="col-span-4 flex items-center hover:border-gray-400 focus:border-gray-400 border-2 border-gray-200 py-3 text-sm font-medium px-4 transition-all" onClick={loginWithGithub} type="button">
                                <Icon id="github" />
                                Continue with Github
                            </button>
                        </div>
                        {error && <p>{error.message}</p>}
                    </div>
                </div>
            </>
        );

    return (
        <Layout title="Home">
            <HomeContent />
        </Layout>
    );
};

export default Home