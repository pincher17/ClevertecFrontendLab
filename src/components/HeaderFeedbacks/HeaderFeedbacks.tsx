import React from 'react';
import { Header, Li, Nav, NavLinkStyle, Ol, Separator, SpanLink } from './HeaderFeedbacks.styles';
import { Breadcrumb } from 'antd';

export const HeaderFeedbacks: React.FC = () => {
    return (
        <Header>
  <Nav>
    <Ol>
        <Li>
            <SpanLink>
                <NavLinkStyle to={'/main'}>Главная</NavLinkStyle>
            </SpanLink>
            <SpanLink>
                <Separator>/</Separator>
            </SpanLink>
        </Li>
        <Li>
            <SpanLink>
                <SpanLink>Отзывы пользователей</SpanLink>
            </SpanLink>
        </Li>
    </Ol>
  </Nav>
        </Header>
    );
};
