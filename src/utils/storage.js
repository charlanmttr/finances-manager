import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        let dataToStore = value;
        
        if(typeof(value) === "object"){
            dataToStore = JSON.stringify(value)
        }

        await AsyncStorage.setItem(key, dataToStore)
    } catch (error) {
        throw error
    }
}

export const getDataFromStorage = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key)
        return JSON.parse(data) 
    } catch (error) {
        throw error
    }
}
