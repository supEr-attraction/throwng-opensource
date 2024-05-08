import { Marker } from "../../types/mapType";

const arraysAreEqual = (arr1: Marker[], arr2: Marker[]) => {
  // console.log(arr1);
  // console.log(arr2);
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedArr1 = arr1.slice().sort((a, b) => a.itemId - b.itemId);
  const sortedArr2 = arr2.slice().sort((a, b) => a.itemId - b.itemId);

  for (let i = 0; i < arr1.length; i++) {
    if (sortedArr1[i].itemId !== sortedArr2[i].itemId) {
      return false;
    }
  }
  return true;
};

export default arraysAreEqual;
