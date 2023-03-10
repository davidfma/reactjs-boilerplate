import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { App } from './App';

describe('App test', () => {
  it('Should renders hello world', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Hello World'
    );
  });
});
