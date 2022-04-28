export class GroupByUtils {
  static groupBy(array) {
    return array.reduce((acc, property) => {
      if (!acc[property.customerId]) {
        acc[property.customerId] = [];
      }

      acc[property.customerId].push(property);
      return acc;
    }, {});
  }
}
