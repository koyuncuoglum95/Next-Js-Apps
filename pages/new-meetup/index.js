// our-domain.com/new-meetup
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from 'next/router';

import { Fragment } from 'react';
import Head from 'next/head';


function NewMeetUpPage() {
    const router = useRouter();
    async function onAddMeetup(entermeetupdata) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(entermeetupdata),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        router.push('/');
    }

    return (
        <Fragment>
            <Head>
                <title>Add Next JS meetup</title>
                <meta name='description' content='Adding your own Next JS meetup'/>  
            </Head>
            <NewMeetupForm onAddMeetup={onAddMeetup}/>
        </Fragment>
    )
}

export default NewMeetUpPage;