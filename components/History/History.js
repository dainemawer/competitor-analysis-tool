import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'
import Alert from '@components/Alert/Alert';
import { formatProjectName } from '@lib/helpers'

/**
 * History
 * 
 * Displays on a Project page. Gives the user an overview of all tests completed
 * for a given project in a table format.
 * 
 * @param {*} props
 * @param {Object} props.projects the queried project
 * @param {Array} props.tests an array of tests that are stored in the database for the user
 * @param {Object} props.user the user object containing user information
 * @returns void
 */
export default function History({ projects, tests, user }) {

    if (!tests.length > 0) {
        return <Alert label="This data will only populate once you have a number of valid tests." />
    }

    return (
        <section className="pb-2 pl-2 shadow-lg pr-2 border border-gray-100 my-6">
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="text-left text-sm py-4 px-4">ID</th>
                        <th className="text-left text-sm py-4 px-4">User</th>
                        <th className="text-left text-sm py-4 px-4">Test ID</th>
                        <th className="text-left text-sm py-4 px-4">Project</th>
                        <th className="text-left text-sm py-4 px-4">Results</th>
                        <th className="text-left text-sm py-4 px-4">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.map((test, index) => {
                        return (
                            <tr className={`${index % 2 === 0 && 'bg-gray-100'}`} key={test.test_id}>
                                <td className="text-left text-sm py-4 px-4">{test.id}</td>
                                <td className="text-left text-sm py-4 px-4">
                                    <Image className="rounded-full" src={user?.user_metadata.avatar_url} width="28" height="28" alt={user?.user_metadata.full_name} />
                                </td>
                                <td className="text-left text-sm py-4 px-4">{test.test_id}</td>
                                <td className="text-left text-sm py-4 px-4">{formatProjectName(projects.client_name)}</td>
                                <td className="text-left text-sm py-4 px-4">
                                    <Link href={`/tests/${test.test_id}`}>
                                        <a className="border-b-2 border-transparent hover:border-black focus:border-black transition-all font-semibold text-sm">
                                            View Test Results
                                        </a>
                                    </Link>
                                </td>
                                <td className="text-left text-sm py-4 px-4">{new Date(Number(test.test_id)).toLocaleDateString('en-US')}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}

History.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({})),
    tests: PropTypes.arrayOf(PropTypes.shape({})),
    user: PropTypes.shape({})
}

History.defaultProps = {
    projects: [],
    test: [],
    user: {}
}