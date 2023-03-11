
function MeetUpDetail(props) {
    return (
    <section>
        <img 
        src={props.image} 
        alt={props.title}
        style={{width:'100%' }}
        />
        <h1>A First Meetup</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
    </section>
    )
}

export default MeetUpDetail;