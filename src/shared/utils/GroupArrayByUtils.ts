export class GroupArrayByUtils {
  static groupArrayBy(productsGroupedByCustomerId) {
    const array = [];
    for (const key in productsGroupedByCustomerId) {
      let object;
      let value = 0;

      productsGroupedByCustomerId[key].forEach((e) => {
        object = {
          customerId: e.customerId,
          customerCpf: e.customerCpf,
          totalValue: e.totalValue + value,
        };
        value = object.totalValue;
      });
      array.push(object);
    }
    return array;
  }
}
