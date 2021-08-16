import { Database } from './Database'

export class State {
  static dbName = 'fisheye';
  static dbVersion = 1;
  static storeName = 'photographers';
  static DB = null;
  static target = new EventTarget();

  constructor(observed, updateCallback) {
    this.updateCallback = updateCallback;

    this.observed = new Set(observed);

    State.target.addEventListener('set', event => {
      if (this.updateCallback && this.observed.has(event.detail.name)) {
        this.updateCallback(event.detail.name, event.detail.value)
      }
    })
  }

  async dbConnect () {
    State.DB = State.DB || await new Database(
      State.dbName,
      State.dbVersion,
      (db, oldVersion, newVersion) => {
        switch (oldVersion) {
          case 0:
            db.createObjectStore(State.storeName)
            break;
        
          default:
            break;
        }
      }
    )

    return State.DB
  }

  async set(name, value) {
    console.log(name, value)
    this.observed.add(name)
    const db = await this.dbConnect()
    await db.set(State.storeName, name, value);

    const event = new CustomEvent('set', { detail: { name, value } })
    State.target.dispatchEvent(event)
  }

  async get(name) {
    this.observed.add(name)

    const db = await this.dbConnect()
    return await db.get(State.storeName, name);

  }
}
