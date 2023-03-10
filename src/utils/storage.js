import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        let dataToStore = value;

        if (typeof (value) === "object") {
            dataToStore = JSON.stringify(value)
        }

        await AsyncStorage.setItem(key, dataToStore)
    } catch (error) {
        throw error
    }
}

export const getStringFromStorage = async (key) => {
    try {
        return await AsyncStorage.getItem(key)
    } catch (error) {
        throw error
    }
}

export const getObjectFromStorage = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key)
        const parsedObject = (data != null) ? JSON.parse(data) : null;

        return parsedObject
    } catch (error) {
        throw error
    }
}

export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (error) {
        throw error
    }
}