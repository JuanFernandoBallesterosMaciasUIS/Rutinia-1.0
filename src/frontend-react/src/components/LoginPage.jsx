import { useNavigate } from 'react-router-dom';
import Login from './Login';

function LoginPage({ onLoginSuccess }) {
  return <Login onLoginSuccess={onLoginSuccess} />;
}

export default LoginPage;
