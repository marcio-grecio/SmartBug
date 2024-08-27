import '../app.min.css';
import { getYear } from 'date-fns';
import { useContext, useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import Alert from '../Components/Alert/Index';
import Input from '../Components/Input/Index';
import { UserContext } from "../Contexts/UserContext";
import dark from '../Assets/images/logo/logo-dark.webp';

const Login = () => {
  const currentYear = getYear(new Date());
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { handleLogin } = useContext(UserContext);
  const [passwordShown, setPasswordShown] = useState(false);
  const [alert, setAlert] = useState<null | { type: 'error' | 'success' | 'warning', title: string, message: string }>(null);

  const changeEmailValue = (event: any) => {
    validateLogin(event.target.value);
    setEmail(event.target.value);
  }

  const AlterarSenha = (event: any) => {
    setSenha(event.target.value);
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  }

  const validateLogin = (email: string) => {
    const emptyEmail = !email;
    let invalidEmail = false;

    if (email.includes('@')) {
      var re = /\S+@\S+\.\S+/
      invalidEmail = !re.test(email);
    };
    return !emptyEmail && !invalidEmail;
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await handleLogin(email, senha);
    } catch (error: any) {
      setAlert({
        type: 'warning',
        title: 'Atenção',
        message: 'Usuário ou senha inválidos.',
      });
    }
  }

  return (
    <div className="auth-page-wrapper pt-5 bg-white">
      <div className="auth-one-bg-position auth-one-bg bg-white" id="auth-particles">
        <div className="bg-overlay"></div>

        <div className="shape">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
          </svg>
        </div>
      </div>

      <div className="auth-page-content mt-35">
        <div className="container ">

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-4 col-xl-5">
              <div className="card mt-4">
                <div className="card-body p-4 rounded-md mt-17" style={{ boxShadow: '0 5px 10px rgba(30,32,37,.12)', backgroundColor: 'white' }}>
                  <div className="text-center mt-2">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <img
                      alt="Logo"
                      width={200}
                      height={40}
                      src={dark}
                      />
                      </div>
                    <p className="mt-3 fs-15 fw-medium text-slate-600" style={{fontFamily: 'nunito', fontWeight: '600'}}>Inteligência de Marketing Imobiliário.</p>

                  </div>
                  <div className="p-2 mt-10">
                    <form>
                      <div className="col-md-12 mb-4">
                        <label className="block text-sm font-medium text-slate-600 dark:text-white mb-1" style={{ fontFamily: 'nunito', fontWeight: '700' }}>Login</label>
                        <Input
                          required
                          type="email"
                          name="email"
                          value={email} 
                          onChange={(event) => changeEmailValue(event)} 
                        />
                      </div>

                      <div className="col-md-12 mb-4">
                        <label className="block text-sm font-medium text-slate-600 dark:text-white mb-1" style={{ fontFamily: 'nunito', fontWeight: '700' }}>Senha</label>
                        <div className="relative">
                          <Input
                            required
                            name="senha"
                            value={senha} 
                            type={passwordShown ? 'text' : 'password'} 
                            onChange={(event) => AlterarSenha(event)} 
                          />
                          <button
                            type="button"
                            onClick={togglePassword}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                          >
                            {passwordShown ? <EyeOff className="w-5 h-5" color='#607d8b'/> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="col-md-12 mt-4">
                        <button className="bg-slate-600 text-white w-full rounded-sm h-10" onClick={(event) => handleSubmit(event)}>
                          Entrar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container mt-7">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <p className="mb-0 text-muted text-slate-300" style={{ fontFamily: 'nunito', fontWeight: '600' }}>
                  SmartBug MKT - © Copyright {currentYear}. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {
        alert && (
          <Alert
            width='400px'
            duration={2000}
            type={alert.type}
            title={alert.title}
            position="top-right"
            showProgress={true}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )
      }
    </div>

  )
}

export default Login;
