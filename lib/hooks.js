import { useState, useEffect } from 'react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';

export const useProjects = () => {
    const { user } = useUser();
    const [projects, setProjects] = useState([]);

    useEffect(() => {

        async function loadData() {
            const { data } = await supabaseClient
                .from('projects')
                .select('id, client_name')
                .eq('user_id', user.id);

            if (typeof data === null) {
                return;
            }

            setProjects(data);

        }

        if (user) {
            loadData();
        }

    }, [user]);

    return { projects };
}