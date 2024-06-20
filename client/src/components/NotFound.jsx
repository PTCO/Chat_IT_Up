const { Link } = require('react-router-dom')

const NotFound = () => {
    return (
        <div>
            <h2>Not Found</h2>
            <p>The page you request is not available</p>
            <Link className="btn btn-dark" to={"/Chat"}>Home</Link>
        </div>
    )
}

export default NotFound;