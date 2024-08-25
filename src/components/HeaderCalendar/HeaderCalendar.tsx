import React from 'react';
import { Header, Li, Nav, NavLinkStyle, Ol, Separator, SpanLink } from '../HeaderFeedbacks/HeaderFeedbacks.styles';

export const HeaderCalendar: React.FC = () => {
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
                <SpanLink>Календарь</SpanLink>
            </SpanLink>
        </Li>
    </Ol>
  </Nav>
        </Header>
    );
};
