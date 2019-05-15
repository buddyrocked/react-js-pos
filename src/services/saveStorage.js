import { AsyncStorage } from 'react';

const saveStorage = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value)
              .then(
                () => AsyncStorage.getItem(key)
                .then(
                  (result)=> { alert(result) }
                )
            );
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
}

export default saveStorage;
