export class Network {
  apiUrl = process.env.API_URL
  apiLocal = process.env.API_LOCAL_PATH
  header = {
    method: 'GET',
    headers: new Headers({
      'Content-type': 'application/json'
    }),
    mode: 'no-cors',
    cache: 'default'
  }

  /**
   * Check if the API is responding to the request
   *
   * @return {Promise<boolean|string>}
   * @memberof Network
   */
  async testRemoteAPI () {
    return await fetch(this.apiUrl, this.header)
      .then(res => res.ok)
      .catch(this.error)
  }

  /**
   * Fetch data by name if an argument is passed in the method
   *
   * @param {string[]} names
   * @return {Promise}
   * @memberof Network
   */
  async get (...names) {
    if (names.length > 1) return await this.fecthAll(names)
    return await this.fetchDataByName(names[0])
  }

  /**
   * Fetch all local files with names if remote API not responding,
   * else Fetch just data on API
   *
   * @param {string[]} names
   * @return {Promise<object>}
   * @memberof Network
   */
  async fecthAll (names) {
    if (!await this.testRemoteAPI()) {
      const urls = names.map(name => `${this.apiLocal}/${name}.json`)
      const responses = await Promise.all(urls.map(url => fetch(url, this.header)))
      const jsons = await Promise.all(responses.map(res => res.json()))
      return await jsons
    }
    return await fetch(this.apiUrl, this.header)
      .then(res => res.json())
      .then(async data => {
        return data
      })
      .catch(this.error)
  }

  /**
   * Check if Remote api respond and get one entry by name.
   *
   * @param {string} name
   * @return {Promise<object>}
   * @memberof Network
   */
  async fetchDataByName (name) {
    const url = await this.testRemoteAPI() ? this.apiUrl : `${this.apiLocal}/${name}.json`
    return await fetch(url, this.header)
      .then(res => res.json())
      .then(async data => {
        if (await this.testRemoteAPI()) {
          return data[name]
        }
        return data
      })
      .catch(this.error)
  }
  
  /**
   * Return error
   * @param {Error} err
   * @memberof Network
   */
  error (err) {
    throw new Error(err)
  }
}
