export default function iterate(array, { batchSize = 100 } = {}) {
  const items = array.splice(0, Math.min(batchSize, array.length))
  return {
    next: () => iterate(array, { batchSize }),
    items,
    done: !items.length,
  }
}
