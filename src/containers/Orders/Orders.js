import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount () {
        axios.get('/orders.json')
            .then(res => {  // Object
                console.log('orders: ', res.data);
                const fetchedOrder = [];
                for (let key in res.data) {
                    fetchedOrder.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                console.log('fetchedOrder: ', fetchedOrder);
                this.setState({ loading: false, orders: fetchedOrder });
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }

    render () {
        let order;
        if (this.state.loading) {
            order = <Spinner />
        } else {
            order = this.state.orders.map((order) => (
                        <Order 
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price} />
                    ));
        }
        return (
            <div>
                {order}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);