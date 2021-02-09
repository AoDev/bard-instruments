/**
 * Delay the execution of a Promise Chain
 * @param {Number} milliseconds
 */
function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export default sleep
