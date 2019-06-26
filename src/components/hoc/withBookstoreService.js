import React from 'react';
import {BookstoreServiceConsumer} from '../bookstore-service-context'

/*Создаем функцию высшего порядка, которая сможет передавать нужные данные всем компонентам.
Данная функция возвращает функцию, которая принимает компонент, который нужно оборачивать*/
const withBookstoreService = () => (Wrapped) => {


/*При помощи данной функции создаем новый компонент, который принимает некие свойства (props)
и возвращает кусок JSX разметки. 
Оборачиваем предпологаемый компонент, который будем оборачивать (Wrapped) в Consumer.
Для того чтобы получить данные из Consumer-а, необходимо создать рендер функцию, которая примет
в качестве своего значения тот сервис, который будет передан через контекст.
Возвращаем оборачиваемый компонент, и передаем в этот компонент все свойства, которые получил
компонент (который оборачивает Wrapped компонент) и передать сервис, который был получен из контекста */
	return (props) => {
		return (
			<BookstoreServiceConsumer>
				{
					(bookstoreService) => {
						return (
							<Wrapped {...props} 
								bookstoreService={bookstoreService} />);
					}
				}
			</BookstoreServiceConsumer>
		)
	}

}

export default withBookstoreService;