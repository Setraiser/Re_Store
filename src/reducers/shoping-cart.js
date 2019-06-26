/*Функция для добавления книги в массив, принимает текущий массив элементов, item(книга), на котором срабатывает событие и проверяет,
естьб ли данный элемент в массиве, и его индекс(idx). Если idx === -1, т.е. если элемента нет в массиве, то возвращаем новыйе массив с новым элементом. Если же
элемент всё же имеется в массиве, то его "заменяем" обновленным*/
	const updateCartItems = (cartItems, item, idx) => {

		if (item.count === 0) {
			return [
				...cartItems.slice(0, idx),
		    ...cartItems.slice(idx + 1)
			];
		}

	  if (idx === -1) {
	    return [
	      ...cartItems,
	      item
	    ];
	  } else {
		  return [
		    ...cartItems.slice(0, idx),
		    item,
		    ...cartItems.slice(idx + 1)
		  ];
		}
	};

/*Функция обновления конкретного элемента массива, которая принимает книгу, которую добавляем и элемент, который надо обновлять.
Чтобы item не выдавал undefined, задаем item по умолчанию пустой объект*/
	const updateCartItem = (book, item = {}, quantity) => {

	  const {
	    id = book.id,
	    count = 0,
	    title = book.title,
	    total = 0
	  } = item;

	  return {
	    id,
	    title,
	    count: count + quantity,
	    total: total + quantity*book.price
	  };
	};

	const updateOrderValue = (cartItems) => {
		let newValue = 0;
		for (let key in cartItems) {
			newValue += cartItems[key]['total'];
		}
		return newValue;
	};

	const updateOrder = (state, bookId, quantity) => {
		const {bookList: {books}, shopingCart: {cartItems}} = state;
    const book = books.find((book) => book.id === bookId);
    const itemIndex = cartItems.findIndex(({id}) => id === bookId);
    const item = cartItems[itemIndex];
    let newItem = updateCartItem(book, item, quantity);
    let newOrderTotal = 0;
    newOrderTotal += book.price;

    return {
      orderTotal: newOrderTotal += updateOrderValue(cartItems),
      cartItems: updateCartItems(cartItems, newItem, itemIndex)
    };
	}

	

	const updateShopingCart = (state, action) => {

		if (state === undefined) {
			return {
				cartItems: [],
				orderTotal: 0
			}
		}

		switch (action.type) {
			case 'BOOK_ADDED_TO_CART':
      	return updateOrder(state, action.payload, 1);

	    case 'BOOK_REMOVE_FROM_CART':
	    	return updateOrder(state, action.payload, -1);

	    case 'ALL_BOOKS_REMOVE_FROM_CART':
	    	const item = state.shopingCart.cartItems.find(({id}) => id === action.payload);
	    	return updateOrder(state, action.payload, -item.count);

	    default:
	    	return state.shopingCart;
		};
	}

export default updateShopingCart;