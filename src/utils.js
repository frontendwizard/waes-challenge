export const getStringDiffLength = (newValue, oldValue) => newValue.length - oldValue.length

export const findChangePosition = (newValue, oldValue) => {
  for (let i = 0; i < oldValue.length; i++)
    if (oldValue.charAt(i) !== newValue.charAt(i)) return i
  // change happened at the end
  return null
}
