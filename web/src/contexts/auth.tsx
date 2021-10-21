import { createContext, useEffect, useState } from "react";
import { AuthenticateUserDTO } from "../components/LoginBox/dto/AuthenticateUser.dto";
import { api } from "../services/api";
import { AuthContextDTO } from "./dto/AuthContext.dto";
import { AuthProviderDTO } from "./dto/AuthProvider.dto";
import { UserDTO } from "./dto/User.dto";



// Dentro desse creteContext é o que vai ser "liberado" para toda a aplicação 
export const AuthContext = createContext({} as AuthContextDTO)

export function AuthProvider(props: AuthProviderDTO) {

  const [ user, setUser ] = useState<UserDTO | null>(null)

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=1ac2509681eee89a3fea&redirect_uri=http://localhost:3000`

  async function signIn(githubCode: string) {
    const response = await api.post<AuthenticateUserDTO>('authenticate', {
      code: githubCode
    })

    const { token, user } = response.data

    // Armazena no Storage do Navegador -> se fechar o nav, ainda vai ter o dado 
    localStorage.setItem('@auth-user:token', token)

    api.defaults.headers.common.authorization = `Bearer ${token}`

    setUser(user)

  }

  function signOut(){
    setUser(null)
    localStorage.removeItem('@auth-user:token')
  }

  useEffect(() => {

    const token = localStorage.getItem('@auth-user:token')

    if(token)
      // To Setando como padrão uma autorização com Bearer Token, e esse dado vai ser levado daqui pra frente
      api.defaults.headers.common.authorization = `Bearer ${token}`

      api.get<UserDTO>("profile").then(response => {
        setUser(response.data)
      })

  }, [])

  useEffect(() => {

    const url = window.location.href
    const hasGithubCode = url.includes('?code=')

    if (hasGithubCode)
      var [urlBase, githubCode] = url.split('?code=')
      
      // Limpar a URL
      window.history.pushState({}, '', urlBase)

      signIn(githubCode)

  }, [])

  return(
    // Tudo o que tiver dentro, todas as partes da aplicação vao ter acesso
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>

  )

}