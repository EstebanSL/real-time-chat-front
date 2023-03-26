import { createContext, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext<any>(null);

const AuthContextProvider = ({ children }: any) => {

  const [user, setUser] = useState<any>(false)
  const { setItem, removeItem } = useLocalStorage()

  const login = (userInfo: any) => {
    console.log(userInfo)
    setUser(userInfo)
    setItem('user', userInfo.stringify())
  }

  const logout = () => {
    setUser(null)
    removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContextProvider