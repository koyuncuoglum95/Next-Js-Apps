// our-domain.com/new-meetup/anything-else

import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

import { Fragment } from 'react';
import Head from 'next/head';

function MeetUpDetails(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description' content={props.meetupData.description}/>
            </Head>
            <MeetupDetail 
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
            />
        </Fragment>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://memoko95:9a95152c@cluster0.jwnso.mongodb.net/NextDatabase?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({}, { _id: 1}).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({ 
            params: { meetupId: meetup._id.toString()}
        })),
    }
}

export async function getStaticProps(context) {
    // fetch data from a single meetup
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://memoko95:9a95152c@cluster0.jwnso.mongodb.net/NextDatabase?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const selectedMeetups = await meetupsCollection.findOne({ 
        _id: ObjectId(meetupId),
    });

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetups._id.toString(),
                image: selectedMeetups.image,
                title: selectedMeetups.title,
                address: selectedMeetups.address,
                description: selectedMeetups.description,
            }
        }
    }
}

export default MeetUpDetails;
