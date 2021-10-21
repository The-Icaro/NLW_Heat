import { useContext } from "react"
import { VscGithubInverted } from "react-icons/vsc"
import styles from './styles.module.scss'
import { AuthContext } from "../../contexts/auth"

export function LoginBox() {

  // Para pegar aqueles dados, basta utilizar o useContext e o contexto criado
  const { signInUrl } = useContext(AuthContext)

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e Compartilhe sua Mensagem!</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size="24"/>
        Entrar com Github
      </a>
    </div>
  )
}