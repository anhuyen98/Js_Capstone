export default class Cart {
  listItems = [];

   slot = 1;
    addItems(item) {
    this.listItems.push(item);
  }

  findItem(id) {
    let idx = 0;

    for (let i = 0; i < this.listItems.length; i++) {
      const item = this.listItems[i];

      if (item.id === id) {
        idx = i;
      }
    }
      return idx;
  }

}
