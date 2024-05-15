import { Marker } from "../../types/mapType";

const arraysAreEqual = (arr1: Marker[], arr2: Marker[]) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const itemMap = new Map<number, boolean>();

  for (const item of arr1) {
    itemMap.set(item.itemId, true);
  }

  for (const item of arr2) {
    if (!itemMap.has(item.itemId)) {
      return false;
    }
  }

  return true;
};

export default arraysAreEqual;
