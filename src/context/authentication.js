import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { createContext, useEffect, useState } from "react"
import financesApi from "../utils/api"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null)
    const [authInProgress, setAuthInProgress] = useState(true)
    const [loginErrorMessage, setLoginErrorMessage] = useState(null)
    const [isWaitingLogin, setWaitingLogin] = useState(false)

    useEffect(() => {
        loadUserFromStorage()
    }, [])

    const loadUserFromStorage = async () => {
        const data = await AsyncStorage.getItem('@financesapp_userInfo');
        if (data) {
            setUserInfo(JSON.parse(data))
        }
        setAuthInProgress(false)
    }

    const saveUserOnStorage = async (data) => {
        setUserInfo(data)

        await AsyncStorage.setItem(
            '@financesapp_userInfo',
            JSON.stringify(data)
        )
    }

    const setTemporaryError = (message) => {
        setLoginErrorMessage(message)
        setTimeout(() => setLoginErrorMessage(null), 3000)
    }

    const handleLogin = async (data) => {
        setWaitingLogin(true)
        try {
            const { email, password } = data

            if ([email, password].includes("")) throw new Error("REQ_FIELDS_MISSING")

            const response = await financesApi.post('/authenticate', { email, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            saveUserOnStorage(response.data)
            setWaitingLogin(false);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    /* receive httpcode 400: invalid user or password */
                    setTemporaryError('Usuário ou senha inválida. Tente novamente.')
                }
            } else if (error.message === 'REQ_FIELDS_MISSING') {
                setTemporaryError("Preencha todos os campos.")
            } else {
                setTemporaryError('Ops! Houve algo de errado.')
            }

            setWaitingLogin(false);
        }
    }

    const handleLogout = async () => {
        await AsyncStorage.removeItem('@financesapp_userInfo')
        setUserInfo(null)
    }

    return (
        <AuthContext.Provider value={{
            handleLogin,
            handleLogout,
            saveUserOnStorage,
            userInfo,
            authInProgress,
            loginErrorMessage,
            isWaitingLogin
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };
