import './heading.css'

function Heading({text, setShowGuesser}) {
    return (
        <span className="heading" onClick={() => setShowGuesser(false)}>
            {text}
        </span>
    )
}


export default Heading