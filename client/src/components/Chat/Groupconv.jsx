import React from 'react'
import './Groupconv.css'
import { BsFlagFill, BsPeopleFill, BsCodeSlash, BsFillChatLeftDotsFill } from 'react-icons/bs';

const Groupconv = ({ icon, name }) => {
    return (
        <div className='group'>
            {name}
        </div>
    )
}

export default Groupconv
