import Card from '@components/Card/Card'

/**
 * Home Content
 * 
 * Displays when a user is logged in successfully.
 * 
 * @returns void
 */
const HomeContent = () => {
    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl font-semibold mb-6">Welcome, to the 10up Competitor Analysis Tool!</h1>
            <h2 className="text-xl leading-normal mb-4">If you&apos; ve found your way here, it means that you&apos; re looking to get a better understanding of performance for your client. The 10up Competitor Analysis tool automates the process of doing manual competitor analyses, saving you time and allowing you to easily understand benchmarks against direct competitors. Below, is a list of features the tool current offers:</h2>
            
            <hr />

            <div className="grid mt-8">

                <Card title="Multiple Clients, One Secure Profile" description="The tool uses Supabase for user management and storing project and client PSI data. All data is stored in the cloud on the edge, making things pretty fast! You can have multiple projects under your profile, the data is always available and ready to use." image="/set-up.png" alt="Set Up Projects" label="New Project" permalink="/projects/new" />

                <Card title="Clients vs Competitors" description="Understanding how a client stacks up against their top 3 competitors is an important pillar of improving performance on the web. The tool provides valuable insight into the results retrieved from Google Page Speed Insights allow engineers to quickly identify areas of improvement. The tool can also suggest a healthy target of improvement, normally 20% against the most performant competitor." image="/see-how.png" alt="Compare Competitors" label="New Test" permalink="/tests/new" />

                <Card title="Gain an Understanding" description="The tool does its best to help provide insight and clarity into how to improve page experience signals. The tool specifically reports on Core Web Vitals, which not only limits the amount of data that you need to make sense of, but also helps keep cognitive load down for users and clients needing to understand how to better performance." image="/gain understanding.png" alt="Gain an Understanding" label="Understanding Results" permalink="/profile" />

                <Card title="Review Historical Performance Data" description="After you've run a number of tests, the tool will begin hositorically plotting data across a time line, from your first test date to your latest test date. Over a project lifecycle this translates perfectly to align with project milestones. If the client is a retainer based client you can run tests periodically to test performance." image="/review-perf.png" alt="Review Performance" label="Interpreting Data" permalink="/profile" />

                <Card title="Get Notifications through Slack using Perfy" description="The tool comes with a built in Slack integration using a smart little bot called Perfy. Perfy will notify you with a summary of results a link to your test in a personalised message in Slack. This means you can leave tests running and attend to other tasks and Perfy will do the rest for you. Integrating Slack is pretty simple, you just need to visit your profile page and update your Slack ID." image="/save-time.png" alt="Save time" label="Integrate Slack" permalink="/profile" />
            
            </div>
        </div>
    )
}

export default HomeContent;