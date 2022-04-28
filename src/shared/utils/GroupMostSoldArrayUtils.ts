export class GroupMostSoldArrayUtils {
  static groupArrayBy(productsGroupedByCustomerId) {
    const array = [];
    for (const key in productsGroupedByCustomerId) {
      let object;
      let quantity = 0;

      productsGroupedByCustomerId[key].forEach((e) => {
        object = {
          productId: e.productId,
          productName: e.productName,
          quantity: e.quantity + quantity,
        };
        quantity = object.quantity;
      });
      array.push(object);
    }
    return array;
  }
}
