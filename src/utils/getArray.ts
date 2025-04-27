function getArray(array: [string]) {
  let result = "";
  if (array.length == 1) return array;
  else {
    array.forEach(element => {
      result = result + element + ", "
    });
    return result.slice(0, -2);
  }
}

export default getArray;