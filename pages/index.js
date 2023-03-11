// our-domain.com/
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

import Head from 'next/head';
import { Fragment } from 'react'


/*
const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A first meetup',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
        address: 'Some Address 5, 1234 some street',
        description: 'This is first meeting in Paris'
    },
    {
        id: 'm2',
        title: 'A second meetup',
        image: 'https://a.cdn-hotels.com/gdcs/production92/d1580/9a28fc70-9bea-11e8-a1b5-0242ac110053.jpg',
        address: 'Post street 505',
        description: 'Second meeting in Starbucks'
    }
];

*/

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>Bigger Next JS</title>
                <meta name='description' content='Best Next JS Meetups'/>      
            </Head>
            <MeetupList meetups={props.meetups}/>
        </Fragment>
    );
}

/*
 // This function is fetching Data for server side render (SSR)
export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;
    // fetch data from an API
    return {
        props: {
            meetups: DUMMY_MEETUPS
        }
    }
}

*/

 // This function is fetching Data for Static Pages
 export async function getStaticProps() {
     //  fetch data from an API
     const client = await MongoClient.connect('mongodb+srv://memoko95:9a95152c@cluster0.jwnso.mongodb.net/NextDatabase?retryWrites=true&w=majority');
     const db = client.db();

     const meetupsCollection = db.collection('meetups');

     const meetups = await meetupsCollection.find().toArray();

    client.close();

     return {
        props: {
             meetups: meetups.map(meetup => ({
                 id: meetup._id.toString(),
                 title: meetup.title,
                 image: meetup.image,
                 address: meetup.address,
             })),
            },
        revalidate: 1
    };
 }

export default HomePage;