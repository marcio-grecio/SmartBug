import '../app.min.css';
import { getYear } from 'date-fns';
import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import dark from '../Assets/images/logo/logo-white.webp';
import Alert from '../Components/Alert/Index';
import Input from '../Components/Input/Index';

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
          <div className="row">
            <div className="col-lg-12 ">
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <a href="/Login" className="d-inline-block auth-logo">
                    <img
                      alt="Logo"
                      width={180}
                      height={37}
                      src={dark}
                      className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                    />
                  </a>
                </div>
                <p className="mt-3 fs-15 fw-medium">Inteligência de Marketing Imobiliário.</p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-4 col-xl-5">
              <div className="card mt-4">
                <div className="card-body p-4 rounded-md" style={{ boxShadow: '0 5px 10px rgba(30,32,37,.12)', backgroundColor: 'white' }}>
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Bem Vindo!</h5>
                    <p className="text-muted">Faça login para continuar.</p>
                  </div>
                  <div className="p-2 mt-4">
                    <form>
                      {/* <div className="mb-3">
                        <label className="form-label">Login</label>
                        <input className="form-control" type="email" name="Login" value={email} onChange={(event) => changeEmailValue(event)} />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Senha</label>
                        <div className="position-relative auth-pass-inputgroup mb-3">
                          <input className="form-control" type={passwordShown ? 'text' : 'password'} name="Senha" value={senha} onChange={(event) => AlterarSenha(event)} />
                        </div>
                      </div> */}
                      <div className="col-md-12 mb-4">
                        <label className="block text-sm font-medium text-black dark:text-white">Email / Login <span className="text-red-500">*</span></label>
                        <Input
                          type="email"
                          name="email"
                          // value={formData.email}
                          // onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-4 mb-4">
                        <label className="block text-sm font-medium text-black dark:text-white">"Senha <span className="text-red-500">*</span></label>
                        <Input
                          type="password"
                          name="senha"
                        // value={formData.senha}
                        // onChange={handleInputChange}
                        />
                      </div>

                      <div className="mt-4">
                        <button className="bg-black text-white w-full" onClick={(event) => handleSubmit(event)}>
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
        <div className="container mt-4">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <p className="mb-0 text-muted text-form-strokedark">
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

export default Login
