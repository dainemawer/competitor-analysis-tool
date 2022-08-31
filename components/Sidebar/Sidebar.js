import { useContext } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link';
import { SiteContext } from '@context/store'
import { formatProjectName } from '@lib/helpers';
import Icon from '@components/Icon/Icon'

/**
 * Sidebar
 * 
 * Renders the global sidebar UI that appears on all pages.
 * 
 * @param {*} props
 * @param {Array} props.projects an object array of projects attributed to the user
 * @returns void
 */
export default function Sidebar({ projects }) {
    const { isOpen } = useContext(SiteContext);

    return (
        <aside id="sidebar" aria-hidden={!isOpen} className={`bg-[#123456] text-white ${isOpen ? 'translate-x-0 visible' : '-translate-x-[299px] invisible'} lg:visible lg:translate-x-0 transition-all fixed min-h-full h-screen lg:static w-[400px] lg:w-auto col-span-12 lg:col-span-4 2xl:col-span-3 p-8 z-20`}>
            <h1 className="mb-10 text-xl font-semibold">
                <Link href="/">
                    <a className="flex items-center">
                        <Icon id="logo" />
                        10up Competitor Analysis
                    </a>
                </Link>
            </h1>
            <Link href="/projects/new"><a className="bg-rose-500 hover:bg-rose-700 focus:bg-rose-700 transition-colors text-center font-semibold p-3 w-full block mb-4 text-white" href="">New Project</a></Link>
            <Link href="/tests/new"><a className="bg-rose-500 hover:bg-rose-700 focus:bg-rose-700 transition-colors text-center font-semibold p-3 w-full block text-white" href="">New Test</a></Link>
            <div className="border-t-2 border-gray-400 pt-2 mt-10">
                <h2 className="text-lg font-semibold mb-6">Projects</h2>
                <nav>
                    {projects && projects.length > 0 && (
                        <ul>
                            {projects.map(project => (
                                <li className="flex mb-2 items-center" key={project.id}>
                                    <svg className="mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.91667 4.66671H11.0833M2.91667 4.66671C2.27233 4.66671 1.75 4.14437 1.75 3.50004C1.75 2.85571 2.27233 2.33337 2.91667 2.33337H11.0833C11.7277 2.33337 12.25 2.85571 12.25 3.50004C12.25 4.14437 11.7277 4.66671 11.0833 4.66671M2.91667 4.66671L2.91667 10.5C2.91667 11.1444 3.439 11.6667 4.08333 11.6667H9.91667C10.561 11.6667 11.0833 11.1444 11.0833 10.5V4.66671M5.83333 7.00004H8.16667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <Link href={`/projects/${project.id}/${project.client_name}`}>
                                        <a className="border-b-2 border-transparent hover:border-white focus:border-white transition-all text-base">{formatProjectName(project.client_name)}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </nav>
            </div>
            <div className="border-t-2 border-gray-400 pt-2 mt-10">
                <h2 className="text-lg font-semibold mb-6">Useful Links</h2>
                <nav>
                    <ul>
                        <li className="mb-2 flex items-center">
                            <svg className="mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 3.64741V11.2307M7 3.64741C6.31873 3.1948 5.39379 2.91663 4.375 2.91663C3.35621 2.91663 2.43127 3.1948 1.75 3.64741V11.2307C2.43127 10.7781 3.35621 10.5 4.375 10.5C5.39379 10.5 6.31873 10.7781 7 11.2307M7 3.64741C7.68127 3.1948 8.60621 2.91663 9.625 2.91663C10.6438 2.91663 11.5687 3.1948 12.25 3.64741V11.2307C11.5687 10.7781 10.6438 10.5 9.625 10.5C8.60621 10.5 7.68127 10.7781 7 11.2307" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <a className="border-b-2 border-transparent hover:border-white focus:border-white transition-all text-base" href="">
                                Performance Budget Guidance
                            </a>
                        </li>
                        <li className="mb-2 flex items-center">
                            <svg className="mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 3.64741V11.2307M7 3.64741C6.31873 3.1948 5.39379 2.91663 4.375 2.91663C3.35621 2.91663 2.43127 3.1948 1.75 3.64741V11.2307C2.43127 10.7781 3.35621 10.5 4.375 10.5C5.39379 10.5 6.31873 10.7781 7 11.2307M7 3.64741C7.68127 3.1948 8.60621 2.91663 9.625 2.91663C10.6438 2.91663 11.5687 3.1948 12.25 3.64741V11.2307C11.5687 10.7781 10.6438 10.5 9.625 10.5C8.60621 10.5 7.68127 10.7781 7 11.2307" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <a className=" border-b-2 border-transparent hover:border-white focus:border-white transition-all text-base" href="">
                                Execute a Performance Budget
                            </a>
                        </li>
                        <li className="mb-2 flex items-center">
                            <svg className="mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 3.64741V11.2307M7 3.64741C6.31873 3.1948 5.39379 2.91663 4.375 2.91663C3.35621 2.91663 2.43127 3.1948 1.75 3.64741V11.2307C2.43127 10.7781 3.35621 10.5 4.375 10.5C5.39379 10.5 6.31873 10.7781 7 11.2307M7 3.64741C7.68127 3.1948 8.60621 2.91663 9.625 2.91663C10.6438 2.91663 11.5687 3.1948 12.25 3.64741V11.2307C11.5687 10.7781 10.6438 10.5 9.625 10.5C8.60621 10.5 7.68127 10.7781 7 11.2307" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <a className=" border-b-2 border-transparent hover:border-white focus:border-white transition-all text-base" href="">
                                Frontend Handbook
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="border-t-2 border-gray-400 pt-2 mt-10">
                <h2 className="text-lg font-semibold mb-6">Feedback</h2>
                <nav>
                    <ul>
                        <li className="mb-2 flex items-center">
                            <svg className="mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.41667 3.43127V11.2234C6.41667 11.7904 5.95706 12.25 5.3901 12.25C4.95627 12.25 4.56926 11.9773 4.42335 11.5687L3.17128 7.98168M10.5 7.58333C11.4665 7.58333 12.25 6.79983 12.25 5.83333C12.25 4.86683 11.4665 4.08333 10.5 4.08333M3.17128 7.98168C2.33584 7.62656 1.75 6.79836 1.75 5.83333C1.75 4.54467 2.79467 3.5 4.08333 3.5H5.15205C7.54409 3.5 9.59985 2.78011 10.5 1.75L10.5 9.91667C9.59985 8.88656 7.54409 8.16667 5.15205 8.16667L4.08332 8.16666C3.75969 8.16666 3.45145 8.10077 3.17128 7.98168Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <a className="border-b-2 border-transparent hover:border-white focus:border-white transition-all text-base" href="https://github.com/dainemawer/competitor-analysis-tool/wiki/Providing-Feedback">
                                Provide Feedback
                            </a>
                        </li>
                        <li className="mb-2 flex items-center">
                            <svg className="mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.00002 5.25V6.41667M7.00002 8.75H7.00585M2.95857 11.0833H11.0415C11.9396 11.0833 12.5009 10.1111 12.0518 9.33333L8.01038 2.33333C7.56133 1.55556 6.43871 1.55556 5.98966 2.33333L1.94821 9.33333C1.49916 10.1111 2.06047 11.0833 2.95857 11.0833Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <a className="border-b-2 border-transparent hover:border-white focus:border-white transition-all text-base" href="https://github.com/dainemawer/competitor-analysis-tool/wiki/Report-an-Issue">
                                Report an issue
                            </a>
                        </li>
                        <li className="mb-2 flex items-center">
                            <svg className="mr-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.58333 9.33333H7V7H6.41667M7 4.66667H7.00583M12.25 7C12.25 9.89949 9.89949 12.25 7 12.25C4.1005 12.25 1.75 9.89949 1.75 7C1.75 4.1005 4.1005 1.75 7 1.75C9.89949 1.75 12.25 4.1005 12.25 7Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <a className="border-b-2 border-transparent hover:border-white focus:border-white transition-all text-base" href="https://github.com/dainemawer/competitor-analysis-tool/wiki/FAQ">
                                Frequently Asked Questions
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

Sidebar.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({}))
};

Sidebar.defaultProps = {
    projects: []
}