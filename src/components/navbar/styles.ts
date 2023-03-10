import { Box, BoxExtendedProps } from 'grommet';
import styled from 'styled-components';

export interface NavContainerProps extends BoxExtendedProps {
  active: boolean;
}

export const NavContainer = styled(Box)<NavContainerProps>`
  display: flex;
  flex: 1;
  font-size: 1.5em;
  text-align: center;
  color: black;
  flex-basis: ${({ active }) => (active ? 200 : 80)}px;
  max-width: 200px;
`;
