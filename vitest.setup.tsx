import '@testing-library/jest-dom';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => <a href={ href } { ...props } > { children } </a>,
}));