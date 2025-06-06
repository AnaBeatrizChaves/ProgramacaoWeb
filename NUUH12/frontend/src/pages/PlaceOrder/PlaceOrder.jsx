import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {

    const [payment, setPayment] = useState("cod")
    const [data, setData] = useState({
        nomeCompleto: "",
        email: "",
        cpf: "",
        dataNascimento: "",
        telefone: "",
        endereco: "",
        cep: ""
    })

    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems,currency,deliveryCharge } = useContext(StoreContext);

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (e) => {
        e.preventDefault()
        let orderItems = [];
        food_list.map(((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        }))
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryCharge,
        }
        if (payment === "stripe") {
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            }
            else {
                toast.error("Algo deu errado")
            }
        }
        else{
            let response = await axios.post(url + "/api/order/placecod", orderData, { headers: { token } });
            if (response.data.success) {
                navigate("/myorders")
                toast.success(response.data.message)
                setCartItems({});
            }
            else {
                toast.error("Algo deu errado")
            }
        }

    }

    useEffect(() => {
        if (!token) {
            toast.error("Para fazer um pedido, faça o login primeiro!")
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Informações da entrega</p>
                <div className="multi-field">
                    <input type="text" name='nomeCompleto' onChange={onChangeHandler} value={data.nomeCompleto}placeholder='Nome Completo' required />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email' required />
                <input type="text" name='cpf' onChange={onChangeHandler} value={data.cpf} placeholder='CPF' required />
                <div className="multi-field">
                    <input type="date" name='dataNascimento' onChange={onChangeHandler} value={data.dataNascimento} placeholder='Data de Nascimento' required />
                    <input type="text" name='telefone' onChange={onChangeHandler} value={data.telefone} placeholder='Telefone' required />
                </div>
                <input type="text" name='endereco' onChange={onChangeHandler} value={data.endereco} placeholder='Endereço' required />
                 <div className="multi-field">
                <input type="text" name='cep' onChange={onChangeHandler} value={data.cep} placeholder='CEP' required />
                </div>
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Total do Carrinho</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Taxa de Entrega</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Total</b><b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b></div>
                    </div>
                </div>
                <div className="payment">
                   <h2>Forma de Pagamento <small>(No ato da entrega)</small></h2>
                    <div onClick={() => setPayment("pix")} className="payment-option">
                        <img src={payment === "pix" ? assets.checked : assets.un_checked} alt="" />
                        <p>PIX</p>
                    </div>
                      <div onClick={() => setPayment("dinheiro")} className="payment-option">
                        <img src={payment === "dinheiro" ? assets.checked : assets.un_checked} alt="" />
                        <p>Dinheiro</p>
                    </div>
                      <div onClick={() => setPayment("cartao")} className="payment-option">
                        <img src={payment === "cartao" ? assets.checked : assets.un_checked} alt="" />
                        <p>Cartão (Débito ou Crédito)</p>
                    </div>
                </div>
                <button className='place-order-submit' type='submit'>FAZER PEDIDO</button>
            </div>
        </form>
    )
}

export default PlaceOrder
