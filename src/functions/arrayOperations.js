function totalAmount(array) {
    let sum = 0;

    array.forEach((element) => {
      sum = sum + element.amount;
    });

    return sum;
  }

  function totalByType(array, type) {
    // eslint-disable-next-line
    let filteredArray = array.filter((item) => {
      if (item.type === type) return item;
    });

    return totalAmount(filteredArray);
  }

  function filterArrayByThisMonth(array) {
    let currentMonth = new Date().getMonth();
    // eslint-disable-next-line
    let filteredArray = array.filter((item) => {
      if (new Date(Date.parse(item.date)).getMonth() === currentMonth)
        return item;
    });

    return filteredArray;
  }

  export {totalAmount, totalByType, filterArrayByThisMonth}