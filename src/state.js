module.exports = async model => {
  const state = {...await model}
  delete state.cookie
  return state
}
