
export class Database {
  constructor (dbName, dbVersion, dbUpgrade) {
    return new Promise((resolve, reject) => {
      this.db = null
      if (!('indexedDB' in window)) reject(new Error('IndexedDB not supported !'))
      const dbOpen = indexedDB.open(dbName, dbVersion)
      if (dbUpgrade) {
        dbOpen.onupgradeneeded = event => {
          dbUpgrade(dbOpen.result, event.oldVersion, event.newVersion)
        }
      }
      dbOpen.onsuccess = event => {
        this.db = dbOpen.result
        resolve(this)
      }
      dbOpen.onerror = event => {
        reject(new Error(`IndexedDB error: ${event.target.errorCode}`))
      }
    })
  }

  set (storeName, name, value) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite')
      const store = transaction.objectStore(storeName)

      store.put(value, name)

      transaction.oncomplete = () => {
        resolve(true)
      }

      transaction.onerror = () => {
        reject(new Error(transaction.error))
      }
    })
  }

  get (storeName, name) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readonly')
      const store = transaction.objectStore(storeName)

      const request = store.get(name)

      request.oncomplete = (event) => resolve(request.result)
      request.onerror = event => reject(request.error)
    })
  }
}
