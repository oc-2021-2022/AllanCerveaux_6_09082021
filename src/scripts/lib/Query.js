import { objectify } from './helpers/objectify'

/**
 * @todo#1: Add more operator: $same, $count...
 * @todo#2: Need to optimise class, split parser and operator.
 */
export class Query {
  /**
   * Takes a set of data and operators to return
   * a table filtered according to the rules in place.
   *
   * @param {object[]} data An array of objects that looks like a NoSQL database
   * @param {object} operators Object contains operators rules
   * @return {object[]} Filtered array according to the different rules implemented by the operators
   * @memberof Query
   */
  run (data, operators) {
    return data.filter((data) => {
      const filter = this.operatorParser(data, operators)
      return filter
    })
  }

  /**
   * Loop through all operators and if the operators key exists,
   * execute the corresponding method and check if the answer is false and return this.
   * Otherwise run the operatorSatisfies method and check if the answer is false and return this.
   *
   * @param {object} data
   * @param {object} operators
   * @return {boolean}
   * @memberof Query
   */
  operatorParser (data, operators) {
    for (const key in operators) {
      if (this[key]) {
        const res = this[key](data, operators[key])
        if (!res) return false
      } else {
        const res = this.operatorSatisfies(data[key], operators[key], data)
        if (!res) return false
      }
    }
    return true
  }

  /**
   *
   * @param {any} value
   * @param {object[]} operator
   * @param {object[]} data
   * @return {boolean}
   * @memberof Query
   */
  operatorSatisfies (value, operator, data) {
    if (operator === value) return true
    if (operator && typeof operator === 'object') {
      for (const key in operator) {
        if (!this[key]) return false
        else if (!this[key](value, operator[key], data)) return false
      }
      return true
    } else if (operator === '' || operator === null || operator === undefined) return this.$null(value)
  }

  /**
   * Returns true if and only if its all operands are true or equivalent to true.
   *
   * @param {object} data
   * @param {object} operators
   * @return {boolean}
   * @memberof Query
   */
  $and (data, operators) {
    if (!Array.isArray(operators)) {
      operators = objectify(operators)
    }
    for (const key in operators) {
      if (!this.operatorParser(data, operators[key])) return false
    }
    return true
  }

  /**
   * Returns true if and only if all operands are false or equivalent to false.
   *
   * @param {object} data
   * @param {object} operators
   * @return {boolean}
   * @memberof Query
   */
  $not (data, operators) {
    return !this.operatorParser(data, operators)
  }

  /**
   * Returns true if and only if at least one of its operands is true.
   *
   * @param {*} data
   * @param {*} operators
   * @return {*}
   * @memberof Query
   */
  $or (data, operators) {
    if (!Array.isArray(operators)) {
      operators = objectify(operators)
    }
    for (const key in operators) {
      if (this.operatorParser(data, operators[key])) return true
    }
    return false
  }

  /**
   * Returns true if and only if at least one of its operands is false.
   *
   * @param {*} data
   * @param {*} operators
   * @return {*}
   * @memberof Query
   */
  $nor (data, operators) {
    return !this.$or(data, operators)
  }

  /**
   * Check if value is empty, null or
   * undefined and return boolean.
   *
   * @param {any[] | any} values
   * @return {boolean}
   * @memberof Query
   */
  $null (values) {
    if (values === '' || values === null || values === undefined) {
      return true
    } else if (Array.isArray(values)) {
      if (values.length === 0) return true
      for (let v = 0; v < values.length; v++) {
        if (!this.$null(values[v])) {
          return false
        }
      }
      return true
    } else return false
  }

  /**
   * Check if value exist in this ref array
   *
   * @param {any[]} value
   * @param {any[]} ref
   * @return {boolean}
   * @memberof Query
   */
  $in (value, ref) {
    if (!Array.isArray(ref)) throw new Error('$in require array opperand')
    let result = false
    for (let i = 0; i < ref.length; i++) {
      if (value.includes(ref[i])) {
        result = true
      }
    }
    return result
  }

  /**
   * Check if value includes ref
   *
   * @param {string} value
   * @param {string} ref
   * @return {boolean}
   * @memberof Query
   */
  $like (value, ref) {
    return value.includes(ref)
  }

  /**
   * Check in value is greater than ref
   *
   * @param {number} value
   * @param {number} ref
   * @return {boolean}
   * @memberof Query
   */
  $gt (value, ref) {
    return !this.$null(value) && value > ref
  }

  /**
   * Check in value is greater than or equal ref
   *
   * @param {number} value
   * @param {number} ref
   * @return {boolean}
   * @memberof Query
   */
  $gte (value, ref) {
    return !this.$null(value) && value >= ref
  }

  /**
   * Check in value is lower than ref
   *
   * @param {number} value
   * @param {number} ref
   * @return {boolean}
   * @memberof Query
   */
  $lt (value, ref) {
    return !this.$null(value) && value < ref
  }

  /**
   * Check in value is lower than or equal ref
   *
   * @param {number} value
   * @param {number} ref
   * @return {boolean}
   * @memberof Query
   */
  $lte (value, ref) {
    return !this.$null(value) && value <= ref
  }
}
