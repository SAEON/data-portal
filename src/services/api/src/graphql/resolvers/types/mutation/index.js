const _import = p => import(p).then(({ default: fn }) => fn)

export default {
  logBrowserEvents: await _import('./_log-browser-events.js'),
  submitFeedback: await _import('./_submit-feedback.js'),
  browserClient: await _import('./_browser-client.js'),
  createDatabook: await _import('./create-databook/index.js'),
}
