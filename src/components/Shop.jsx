import {useState, useEffect} from 'react';
import {API_KEY, API_URL} from '../config';
import {Preloader} from './Preloader';
import {GoodsList} from './GoodsList';
import {Cart} from './Cart';
import {BasketList} from './BasketList';
import { BasketItem } from './BasketItem';


function Shop () {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState (true);
    const [order, setOrder] = useState ([]);
    const [isBasketShow, setBasketShow] = useState (false);

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow)
    };



    const addToBasket = (item) => {
        const itemIndex = order.findIndex ((orderItem) => orderItem.mainId === item.mainId);
        // если Товара нет в корзине то он добавит его и присвоит ему значение quantity: 1 
        // в иконке карзины будет отображаться именно обычное quantity, а не quantity элемента
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            };
            setOrder([...order, newItem]);
        } else {
        // методом перебора он поимет есть ли в корзине уже элемент с таким индексом и если есть
        // то он будет добавлять именно ему (элементу) свойство quantity +1
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity +1,
                    };
                    
                } else {
                    return orderItem;
                }
            })
            setOrder (newOrder)
        }
    };

    useEffect ( function getGoods () {
        fetch (API_URL, {
            headers: {
                Authorization: API_KEY
            }
        })

        .then ((response) => response.json())
        .then ((data) => {
            setGoods (data.shop);
            setLoading(false);
        });
        
    }, [])

    return (
    <main className="container content">
        <Cart quantity = {order.length} handleBasketShow = {handleBasketShow} />
        {loading ? <Preloader /> : <GoodsList goods={goods} addToBasket={addToBasket}/>}
        {isBasketShow && <BasketList order = {order} handleBasketShow = {handleBasketShow} /> }
    </main>
    );
}

export {Shop};