export const getStringDiffLength = (a, b) => a.length - b.length

export const findChangePosition = (oldValue, newValue) => {
  for (let i = 0; i < oldValue.length; i++)
    if (oldValue.charAt(i) !== newValue.charAt(i)) return i
  // change happened at the end
  return null
}
