import Not_Found_Img from '../../images/404.png';
const { Link } = require('react-router-dom')

const NotFound = () => {
    return (
        <div className="colorFullBorders w-75 mx-4 p-2 rounded d-flex flex-column mx-auto">
            <img src={Not_Found_Img} alt="" className='w-50 mx-auto'/>
            <Link className="btn bg-dark border-dark text-white w-25 mx-auto m-0 mt-4  mb-2" to={"/Chat"}>Home</Link>
        </div>
    )
}

export default NotFound;