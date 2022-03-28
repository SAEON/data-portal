import ora from 'ora'

var _spinner

const spinner = ({ text, prefixText }) =>
  ora({
    text: `\n${text || ''}`,
    prefixText: prefixText || '',
    discardStdin: true,
    indent: 0,
    interval: 100,
    frames: ['-', '+', '-'],
    spinner: 'point',
    color: 'blue',
  })

export const start = ({ text, prefixText } = {}) => {
  _spinner = spinner({ text, prefixText }).start()
}

export const stop = () => {
  _spinner.stop()
}
