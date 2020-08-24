import fetch from 'node-fetch'

export const getCitationStyles = () =>
  fetch('https://citation.crosscite.org/styles/').then(res => res.json())

export const getCitationLocales = () =>
  fetch('https://citation.crosscite.org/locales/').then(res => res.json())
