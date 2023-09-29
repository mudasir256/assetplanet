import React from 'react';
import { Link } from 'react-router-dom';

const SidebarLink = ({ link, title }) => {
    return (
        <div>
            <Link to={link}>
                {title}
            </Link>
        </div>
    );
}

export default SidebarLink;