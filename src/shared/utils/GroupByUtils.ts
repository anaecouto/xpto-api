export class GroupByUtils {
  static groupBy(array: any[], att: string) {
    return array.reduce((acc, object) => {
      if (!acc[object[att]]) {
        acc[object[att]] = [];
      }

      acc[object[att]].push(object);
      return acc;
    }, {});
  }
}
