
function BasketItem (props) {
    const {displayName, price, quantity} = props;

    return (
        <li className="collection-item">
            {displayName} x{quantity} = {price}
            <span className="secondary-content">
                <i className="material-icons basket-delete">close</i>
            </span>
        </li>
    );
}

export {BasketItem};