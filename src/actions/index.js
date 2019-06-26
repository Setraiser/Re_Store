/*Запрос отравлен*/
const booksRequested = () => {
	return {
		type: 'FETCH_BOOKS_REQUEST'
	};
};


/*функция которая принимает массив новых книг*/
const booksLoaded = (newBooks) => {
	return {
		type: 'FETCH_BOOKS_SUCCESS',
		payload: newBooks
	};
};



const booksError = (error) => {
	return {
		type: 'FETCH_BOOKS_FAILURE',
		payload: error
	};
};

const bookAddedToCart = (bookId) => {
	return {
		type: 'BOOK_ADDED_TO_CART',
		payload: bookId
	}
}

const bookRemoveFromCart = (bookId) => {
	return {
		type: 'BOOK_REMOVE_FROM_CART',
		payload: bookId
	}
}

const allBooksRemoveFromCart = (bookId) => {
	return {
		type: 'ALL_BOOKS_REMOVE_FROM_CART',
		payload: bookId
	}
}

/*Оборачиваем компонент в другую функцию для того, чтобы компонент не зависил
от передаваемых ему параметров. Функция принимает bookstoreService(функция, которая содержит массив данных(data))
и dispatch(функция инициализации действий в store).
Функция fetchBooks имеет данный вид сугубо для thunkMiddleware, который позволяет redux воспринимать функции как action.*/

const fetchBooks = (bookstoreService) => () => (dispatch) => {
  dispatch(booksRequested());
  bookstoreService.getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksError(err)));
};

export {
	fetchBooks,
	bookAddedToCart,
	bookRemoveFromCart,
	allBooksRemoveFromCart
}