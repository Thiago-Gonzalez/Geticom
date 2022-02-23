import Navigationbar from '../Navbar';
import './style.css';

export default function Header(props) {
    return (
        <header>
            <Navigationbar />
            <div className='header-content'>
                <h2 className='header-heading'>{props.headerHeading}</h2>
                <p className='header-paragraph'>{props.headerParagraph}</p>
            </div>
        </header>
    );
}