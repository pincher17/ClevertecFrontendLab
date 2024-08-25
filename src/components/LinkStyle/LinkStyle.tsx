import React from 'react';
import { CardInfoProps } from './LinkStyle.types';
import { Link } from './LinkStyle.styles';

export const LinkStyle: React.FC<CardInfoProps> = ({ text, children, to, color, fontSize }) => {
    return (
        <Link to={to} color={color} fontSize={fontSize}>
            {children}
            {text}
        </Link>
    );
};
