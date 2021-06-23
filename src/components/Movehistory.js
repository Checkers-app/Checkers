const Movehistory = (props) => {
    return (
        <div>
            {props.moves.map(e => {
                return <h1> {e} </h1>
            })}
        </div>
    )
}

export default Movehistory