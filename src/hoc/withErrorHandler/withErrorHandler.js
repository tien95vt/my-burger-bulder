import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() { // Not cause side effect -> just register interceptors
            this.reqIntercepter  = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resIntercepter = axios.interceptors.response.use(res => res, err => {
                console.log('withErrHandler', err);
                this.setState({ error: err });
            });
        }

        componentWillUnmount() { // Remove old interceptor
            console.log('withErrorHandler componentWillUnmount', this.reqIntercepter, this.resIntercepter);
            axios.interceptors.request.eject(this.reqIntercepter);
            axios.interceptors.response.eject(this.resIntercepter);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal
                        modalClosed={this.errorConfirmedHandler}
                        show={this.state.error}>
                        {this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
};

export default withErrorHandler;