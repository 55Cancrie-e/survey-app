import { ReactNode } from 'react';
import Navbar from './Navbar';
import { Container, Content } from './Layout.styled';
import { lightTheme, darkTheme } from '@/styles/theme';
import { ThemeProvider } from 'styled-components';

interface LayoutProps {
  children: ReactNode;
  theme: "light" | "dark";
}

export default function Layout({ children, theme }: LayoutProps): JSX.Element {
  const selectedTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <Container>
        <Navbar theme={theme} />
        <Content>{children}</Content>
      </Container>
    </ThemeProvider>
  );
}
