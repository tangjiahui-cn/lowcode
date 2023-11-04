import ReactDOM from 'react-dom/client';
import App from './pages';
import 'antd/dist/antd.min.css';
import { registerComponents } from './components';

registerComponents();

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
