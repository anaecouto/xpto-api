export class GroupMostSoldUtils {
  static groupBy(array) {
    return array.reduce((acc, property) => {
      if (!acc[property.productId]) {
        acc[property.productId] = [];
      }

      acc[property.productId].push(property);
      return acc;
    }, {});
  }
}
