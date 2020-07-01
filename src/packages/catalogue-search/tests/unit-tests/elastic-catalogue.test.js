import { Catalogue } from '../../src/catalogue-search'

const expectedFunctionsOnPrototype = {
  getSingleRecord: 'function',
  getDataThemes: 'function',
  query: 'function',
  getQuery: 'function',
  setFilter: 'function',
  defineSource: 'function',
  addClauses: 'function',
  addMatchClauses: 'function',
}

const expectedInstanceProperties = {
  dslAddress: 'string',
  index: 'string',
  httpClient: 'function',
  _matchClauses: 'object',
  _clauses: 'object',
  _filter: 'object',
  _source: 'object',
  _pageSize: 'number',
  _currentPage: 'number',
}

describe('CONSTRUCTOR: ElasticCatalogue', () => {
  describe('Direct properties', () => {
    const expected = {}
    const classOwnProperties = Object.getOwnPropertyDescriptors(class _ {})
    const ownPropertyDescriptors = Object.getOwnPropertyDescriptors(Catalogue)
    test('Has expected properties', () => {
      Object.entries(expected).forEach(([key, type]) =>
        expect(typeof ownPropertyDescriptors[key].value).toBe(type)
      )
    })
    test('Has no unexpected properties', () => {
      expect(Object.keys(expected).length + Object.keys(classOwnProperties).length).toBe(
        Object.keys(ownPropertyDescriptors).length
      )
    })
  })

  describe('Prototoype properties', () => {
    const classOwnProperties = Object.getOwnPropertyDescriptors(class _ {}.prototype)
    const ownPropertyDescriptors = Object.getOwnPropertyDescriptors(Catalogue.prototype)
    test('Has expected properties', () => {
      Object.entries(expectedFunctionsOnPrototype).forEach(([key, type]) =>
        expect(typeof ownPropertyDescriptors[key].value).toBe(type)
      )
    })
    test('Has no unexpected properties', () => {
      expect(
        Object.keys(expectedFunctionsOnPrototype).length + Object.keys(classOwnProperties).length
      ).toBe(Object.keys(ownPropertyDescriptors).length)
    })
  })
})

describe('ElasticCatalogue instance', () => {
  const catalog = new Catalogue({ dslAddress: 'na', index: 'na' })

  describe('Direct properties', () => {
    const ownPropertyDescriptors = Object.getOwnPropertyDescriptors(catalog)
    test('Has expected properties', () => {
      Object.entries(expectedInstanceProperties).forEach(([key, type]) =>
        expect(typeof ownPropertyDescriptors[key].value).toBe(type)
      )
    })
    test('Has no unexpected properties', () => {
      expect(Object.keys(expectedInstanceProperties).length).toBe(Object.keys(catalog).length)
    })
  })

  describe('Protype properties', () => {
    const catalogPrototypeDescriptors = Object.getOwnPropertyDescriptors(
      Object.getPrototypeOf(catalog)
    )
    const defaultClassProtoDescriptors = Object.getOwnPropertyDescriptors(
      Object.getPrototypeOf(new (class _ {})())
    )
    test('Has expected properties', () => {
      Object.entries(expectedFunctionsOnPrototype).forEach(([key, type]) =>
        expect(typeof catalogPrototypeDescriptors[key].value).toBe(type)
      )
    })
    test('Has no unexpected properties', () => {
      expect(
        Object.keys(expectedFunctionsOnPrototype).length +
          Object.keys(defaultClassProtoDescriptors).length
      ).toBe(Object.keys(catalogPrototypeDescriptors).length)
    })
  })
})
