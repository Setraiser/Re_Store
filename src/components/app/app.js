import React from 'react';
import './app.css';
import {Route, Switch} from 'react-router-dom';
import ShopHeader from '../shop-header';
import HomePage from '../pages';

const App = ({bookstoreService}) => {
/*Для работы роутера импортирум в файл компоненты Route и Switch из react-router-dom.
Затем компонентом Switch оборачиваем пути (Route) внутри которых записываются атрибуты
path - путь, component - компонент, который нужно отрисовывать, если совпадает путь,
и атрибут exact, который пишется, когда необходимо полное совпадение пути*/
	return (
		<main role="main" className="container">
			<ShopHeader />
			<Switch>
				<Route 
					path="/"
					component={HomePage}
					exact />
			</Switch>
		</main>
	);
}

export default App;