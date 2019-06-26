import updateBookList from './book-list';
import updateShopingCart from './shoping-cart';

/*Создаем reducer - ядро redux, которое принимает state и action. Возвращает измененный state,
или же просто дефолтный state*/
const reducer = (state, action) => {
	return {
		bookList: updateBookList(state, action),
		shopingCart: updateShopingCart(state, action)
	};
};

export default reducer;