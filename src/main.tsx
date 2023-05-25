
import ReactDOM from 'react-dom/client'
import store from './store'
import App from './App.tsx'

import './styles/css2.css'
import './styles/custom.css'
import './styles/glightbox.css'
import './styles/style.css'
import './styles/tiny-slider.css'
import './bootstrap.min.css';
import { Provider } from 'react-redux'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
    </Provider>,
)
