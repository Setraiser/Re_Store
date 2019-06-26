import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import BookstoreService from './services/bookstore-service';
import {BookstoreServiceProvider} from './components/bookstore-service-context';

import store from './store';

const bookstoreService = new BookstoreService();

ReactDOM.render(
	/*Оборачиваем все компоненты в провайдер для доступа к store*/
	<Provider store={store}>
{/*Оборачиваем в компонент для обработки ошибок*/}
		<ErrorBoundry>
	{/*Оборачиваем в HOC компонент для передачи данных вложенным компонентам*/}
			<BookstoreServiceProvider value={bookstoreService}>
		{/*Предоставляем роутинг приложению*/}
				<Router>
			{/*Само приложение*/}
					<App />
				</Router>
			</BookstoreServiceProvider>
		</ErrorBoundry>
	</Provider>,
	document.getElementById('root')
);