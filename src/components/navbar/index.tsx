import { NavContainer, NavContainerProps } from './styles';

export default function NavBar({ children, ...props }: NavContainerProps) {
  return <NavContainer {...props}>{children}</NavContainer>;
}
