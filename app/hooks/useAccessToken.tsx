import AsyncStorage from '@react-native-async-storage/async-storage'

export default async function useAccessToken() {
    return await AsyncStorage.getItem('UserKey')
}
