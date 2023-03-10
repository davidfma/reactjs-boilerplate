import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Grommet } from 'grommet';
import { Provider } from 'react-redux';
import GlobalStyles from './styles/GlobalStyles';
import { App } from './App';
import { store } from './redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Grommet full>
          <GlobalStyles />
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Grommet>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
