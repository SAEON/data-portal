import { ElasticCatalogue } from '../../src'

describe('Unit test', () => {
  describe('ElasticCatalogue constructor', () => {
    describe('Direct properties', () => {
      const expected = {}
      const classOwnProperties = Object.getOwnPropertyDescriptors(class _ {})
      const ownPropertyDescriptors = Object.getOwnPropertyDescriptors(ElasticCatalogue)
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
      const expected = {
        query: 'function',
      }
      const classOwnProperties = Object.getOwnPropertyDescriptors(class _ {}.prototype)
      const ownPropertyDescriptors = Object.getOwnPropertyDescriptors(ElasticCatalogue.prototype)
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
  })

  describe('ElasticCatalogue instance', () => {
    const catalog = new ElasticCatalogue({ dslAddress: 'na', index: 'na' })

    describe('Direct properties', () => {
      const ownPropertyDescriptors = Object.getOwnPropertyDescriptors(catalog)
      const expected = {
        dslAddress: 'string',
        index: 'string',
      }

      test('Has expected properties', () => {
        Object.entries(expected).forEach(([key, type]) =>
          expect(typeof ownPropertyDescriptors[key].value).toBe(type)
        )
      })

      test('Has no unexpected properties', () => {
        expect(Object.keys(expected).length).toBe(Object.keys(catalog).length)
      })
    })

    describe('Protype properties', () => {
      const catalogPrototypeDescriptors = Object.getOwnPropertyDescriptors(
        Object.getPrototypeOf(catalog)
      )
      const defaultClassProtoDescriptors = Object.getOwnPropertyDescriptors(
        Object.getPrototypeOf(new (class _ {})())
      )
      const expected = {
        query: 'function',
      }

      test('Has expected properties', () => {
        Object.entries(expected).forEach(([key, type]) =>
          expect(typeof catalogPrototypeDescriptors[key].value).toBe(type)
        )
      })

      test('Has no unexpected properties', () => {
        expect(
          Object.keys(expected).length + Object.keys(defaultClassProtoDescriptors).length
        ).toBe(Object.keys(catalogPrototypeDescriptors).length)
      })
    })
  })
})
