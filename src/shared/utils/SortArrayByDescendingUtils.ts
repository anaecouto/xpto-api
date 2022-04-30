export class SortArrayByDescendingUtils {
  static sortDescending(finalList: any[], property: string) {
    return finalList.sort((a, b) => b[property] - a[property]);
  }
}
