import PropTypes from 'prop-types'
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useUser } from '@supabase/auth-helpers-react';
import { useProjects } from '@lib/hooks';
import Sidebar from '@components/Sidebar/Sidebar';
import Header from '@components/Header/Header';

/**
 * Layout
 * 
 * Controls overall site layout and some state for the application
 * 
 * @param {*} props
 * @param {Array} props.children React children nodes
 * @param {String} props.testID if a test page, the test ID is passed
 * @param {String} props.title the title for a given page
 * @returns void
 */
export default function Layout({ children, testID, title }) {
    const { user } = useUser();
    const { projects } = useProjects();
    const { pathname} = useRouter();

    return (
        <main className="grid bg-[#F6FAFD] grid-cols-12">
            <Head>
                <title>{title} | 10up Competitor Analysis</title>
            </Head>
            <Sidebar projects={projects} />
            <section className="lg:container w-full col-span-12 lg:col-span-8 2xl:col-span-9 mx-auto py-4 lg:py-6 px-4 lg:px-10">
                <Header title={title} testID={testID} user={user} pathname={pathname} />
                {children}
            </section>
        </main>
    )
}

Layout.propTypes = {
    children: PropTypes.node,
    testID: PropTypes.string,
    title: PropTypes.string
}

Layout.defaultProps = {
    children: [],
    testID: '',
    title: ''
}