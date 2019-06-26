import React, {Component} from 'react';
import BookListItem from '../book-list-item';
import {withBookstoreService} from '../hoc';
import {fetchBooks, bookAddedToCart} from '../../actions';
import {compose} from '../../utils';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import {bindActionCreators} from 'redux';
/*connect - функция, которая подключает компонент к redux store, также данная функция создает 
новый компонент и она является HOC, в которой в первые собки (первую функцию) передаем конфигурацию
(как именно надо подключать компонент, т.е. что из state передовать в компонент), а во вторых скобках сам компонент*/
import {connect} from 'react-redux';

import './book-list.css';

const BookList = ({books, onAddedToCart}) => {
	return (
		<ul className="book-list">
			{
				books.map((book, loading) => {
					return (
						<li key={book.id}>
							<BookListItem book={book} onAddedToCart={() => onAddedToCart(book.id)} />
						</li>
					);
				})
			}
		</ul>
	);
}

class BookListContainer extends Component {

	componentDidMount() {
		
		this.props.fetchBooks();
	}

	render() {
		const {books, loading, error, onAddedToCart} = this.props;
		if (loading) {
			return <Spinner />;
		}

		if (error) {
			return <ErrorIndicator />;
		}

		return <BookList books={books} onAddedToCart={onAddedToCart}/>;

		
	}
};

/*Создаем функцию mapStateToProps, которая из state редакс стора берет state.books и возвращает
объект книг (books).
В итоге, при передаче в кофнигурацию connect данной функции, подключаемый компонент будет иметь
при себе данный о книгах из redux store*/
const mapStateToProps = ({bookList: { books, loading, error}}) => {
	return {books, loading, error};
};

/*ownProps - свойства, которые mapDispatchToProps получил от других компонентов сверху*/
const mapDispatchToProps = (dispatch, {bookstoreService}) => {
  return bindActionCreators({
    fetchBooks: fetchBooks(bookstoreService),
    onAddedToCart: bookAddedToCart
  }, dispatch);
};

/*получить данные 
Для получения данных использум самописный hoc - withBookstoreService.
После получения данных - отправляем  action в store*/
export default compose(
	 withBookstoreService(),
	 connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);