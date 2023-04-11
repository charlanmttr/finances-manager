import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { createContext, useEffect, useState } from "react"
import financesApi from "../utils/api"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoadig] = useState(true)

    useEffect(() => {
        loadUserFromStorage()
    }, [])

    const loadUserFromStorage = async () => {
        const data = await AsyncStorage.getItem('@financesapp_userInfo');
        if (data) {
            setUserInfo(JSON.parse(data))
        }
        setLoadig(false)
    }

    const handleLogin = async (data) => {
        try {
            setLoadig(true)
            const body = {
                email: data.email,
                password: data.password
            }

            const response = await financesApi.post('/authenticate', body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            setUserInfo(response.data)

            await AsyncStorage.setItem(
                '@financesapp_userInfo',
                JSON.stringify(response.data)
            )

            setLoadig(false)
        } catch (error) {
            console.log(error)
            
            setLoadig(false)
        }
    }

    const handleLogout = async () => {        
        await AsyncStorage.removeItem('@financesapp_userInfo')
        setUserInfo(null)
    }

    return (
        <AuthContext.Provider value={{ handleLogin, handleLogout, userInfo, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };
