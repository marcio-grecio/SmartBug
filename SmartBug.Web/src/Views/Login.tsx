import { useContext, useState } from "react"
import { UserContext } from "../Contexts/UserContext"

const Login = () => {
  const { handleLogin } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)

  const changeEmailValue = (event: any) => {
    validateLogin(event.target.value)
    setEmail(event.target.value)
  }

  const AlterarSenha = (event: any) => {
    setSenha(event.target.value)
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  const validateLogin = (email: string) => {
    const emptyEmail = !email
    let invalidEmail = false

    if (email.includes('@')) {
      var re = /\S+@\S+\.\S+/
      invalidEmail = !re.test(email)
    }

    const errorMessage = emptyEmail ? 'Campo obrigatório' : invalidEmail ? 'Email inválido' : ''

    const errorClass = emptyEmail || invalidEmail ? 'alert-validate' : ''

    return !emptyEmail && !invalidEmail
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    try {
      await handleLogin(email, senha)
    } catch (error: any) {
      console.error(error)
    }

  }

    return (
      <section className="mi-content" style={{backgroundColor: 'red', textAlign: 'center'}}>
        <div className="mi-card" style={{ height: '98vh',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="mi-card-header border-none text-center">
            <h1 className="mi-error-code" style={{ margin: '0 0 70px 0'}}>Login</h1>
            <h3 className="text-center" style={{ margin: '0 150px'}}>Oops!!! Acho que você tentou acessar algo que não existe!</h3>


            <form className="login100-form validate-form flex-sb flex-w">
              <span className="txt1 p-b-11">Login</span>
                <input className="input100" type="email" name="Login" value={email} onChange={(event) => changeEmailValue(event)} />
                <span className="focus-input100"></span>
              
              <span className="txt1 p-b-11">Senha</span>
                <span className="btn-show-pass" onClick={togglePassword}>
                  <i className="fa fa-eye"></i>
                </span>
                <input
                  className="input100"
                  type={passwordShown ? 'text' : 'password'}
                  name="Senha"
                  value={senha}
                  onChange={(event) => AlterarSenha(event)}
                />
                <span className="focus-input100"></span>

              <div className="container-login100-form-btn">
                <button className="login100-form-btn" onClick={(event) => handleSubmit(event)}>
                  Entrar
                </button>
              </div>

              <div className="col-md-12 text-center" style={{ marginTop: '15px', marginBottom: '-50px' }}></div>
            </form>
          </div>
          </div>
          
          


      </section>
    )
  }
  
  export default Login
  