import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { withPageAuth, supabaseClient, supabaseServerClient } from '@supabase/auth-helpers-nextjs';
import Layout from '@components/Layout/Layout';
import DangerSection from '@components/Form/DangerSection';
import Status from '@components/Status/Status'
import Input from '@components/Input/Input'

/**
 * Profile Page
 * 
 * Renders the Profile Page
 * 
 * @param {*} props
 * @param {Object} props.users get the user from Supabase
 * @param {Object} props.user get the users details from preferred log in provider
 * @param {String} props.error output an error message in case something went wrong
 * @returns void
 */
export default function Profile({
    users,
    user,
    error
}) {
    const [status, setStatus] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onSubmit",
        defaultValues: {
            name: users.name || user.user_metadata.full_name,
            email: users.email || user.email,
            slack_id: users.slack_id,
            notifications: users.notifications,
        },
    });
    
    const onSubmit = async (data) => {
        const { name, email, slack_id, notifications } = data;

        setStatus('Loading...');

        try {

            const { status } = await supabaseClient.from('users').update({
                name,
                email,
                slack_id,
                notifications,
            }).match({ id: user.id });

            if (status === 200) {
                setStatus('Profile updated!');
            }

        } catch (error) {
            setStatus('There was a problem updating your profile. Please trying again later.');
        }

    }

    const handleWipeData = async (event) => {
        event.preventDefault();

        const { data: projects } = await supabaseClient.from('projects').delete().match({ user_id: user.id });
        const { data: tests } = await supabaseClient.from('tests').delete().match({ user_id: user.id });

        if(projects.status === 200 && tests.status === 200) {
            setStatus('Projects and Tests successfully deleted!');
        }
    
    }

    if (user)
        return (
            <Layout title="Profile">
                <div className="container max-w-2xl mx-auto">
                    <form className="py-8" onSubmit={handleSubmit(onSubmit)}>

                        <Input label="Name" type="text" register={register} />

                        <Input label="Slack ID" type="text" register={register} />

                        <Input label="Email" type="text" register={register} />

                        <div className="block w-full mb-8">
                            
                            <label>
                                <input className="mr-3" type="checkbox" {...register('notifications')} />
                                <span className="text-sm italic">Recieve notifications via Slack (enables Perfy bot)</span>
                            </label>
                            
                        </div>

                        <button className="py-2 px-8 bg-teal-400 hover:bg-teal-500 focus:bg-teal-500 transition-colors text-center text-white" type="submit">Save</button>
                    </form>

                    <form onSubmit={handleWipeData}>
                        <h3 className="border-b-2 border-red-700 text-red-700 text-base font-semibold pb-2 mb-6">Danger Zone</h3>

                        <DangerSection
                            title="Wipe Project Data"
                            description="Clicking on “Wipe project data” below will delete all recorded PSI results for projects."
                            label="Wipe Data"
                            handleClick={handleWipeData}
                        />

                        <DangerSection
                            title="Delete Account"
                            description="his action will delete your account, project data, and any integrations."
                            label="Delete Account"
                        />
                        
                    </form>
                    <Status status={status} />
                </div>
            </Layout>
        );

    return <p>{error}</p>;
}


export const getServerSideProps = withPageAuth({
    authRequired: true,
    async getServerSideProps(ctx) {
        const { data: users } = await supabaseServerClient(ctx).from('users').select('*').eq('id', ctx.query.user).single();
        const { data: projects } = await supabaseServerClient(ctx).from('projects').select('*');
        return { props: { users, projects } };
    }
});