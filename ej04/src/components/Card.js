function Card(props) {
    return (
        <div className="card">
            <img src={props.card.imageUrl} alt={props.card.name} />
            <h3>{props.card.name}</h3>
            <p>{props.card.originalText}</p>
        </div>
    )
}

export default Card