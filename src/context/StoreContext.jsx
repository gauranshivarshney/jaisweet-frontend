import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const StoreContext = createContext(null)

const StoreContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({})
    const url = 'https://jai-sweet-backend.onrender.com'
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])

    const addToCart = async (id, weight, price, name, image) => {
        const numericPrice = typeof price === "number" ? price : parseFloat(price.replace("Rs. ", "")) || 0
        const key = `${id}-${weight}-${name}`
        setCartItems(prev => {
            const newCart = {
                ...prev,
                [key]: prev[key]
                    ? { ...prev[key], quantity: prev[key].quantity + 1 }
                    : { id, weight, price: numericPrice, name, image, quantity: 1 }
            }
            localStorage.setItem("cartItems", JSON.stringify(newCart))
            return newCart
        })
        if (token) {
            await axios.post(url + '/api/cart/add', {id}, {headers:{Authorization: `Bearer ${token}`}})
        }
    }

    const removeFromCart = async (id, weight, name) => {
        const key = `${id}-${weight}-${name}`
        setCartItems(prev => {
            if (!prev[key]) return prev;
            const newQuantity = prev[key].quantity - 1;
            const newCart = {...prev}
            if (newQuantity === 0) {
                delete newCart[key]
            }
            else{
                newCart[key] = {...prev[key], quantity: newQuantity}
            }
            localStorage.setItem("cartItems", JSON.stringify(newCart))
            return newCart
        })
        if (token) {
            await axios.post(url + '/api/cart/remove', {id}, {headers:{Authorization: `Bearer ${token}`}})
        }
    }

    const getTotalAmountCart = () => {
        return Object.values(cartItems).reduce((total, item) => {
            const itemPrice = parseFloat(item.price) || 0
            return total + itemPrice * item.quantity
        }, 0)
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list")
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, {headers:{Authorization: `Bearer ${token}`}});
            const cartData = Array.isArray(response.data.cartData) ? response.data.cartData : []
            const formattedCart = {};
            cartData.forEach((item) => {
                const key = `${item.id}-${item.weight}-${item.name}`;
                formattedCart[key] = {
                    id: item.id,
                    weight: item.weight,
                    price: parseFloat(item.price) || 0,
                    name: item.name,
                    image: item.image,
                    quantity: item.quantity
                }
            })
            setCartItems(formattedCart);
            localStorage.setItem("cartItems", JSON.stringify(formattedCart))
        }
        catch (error) {
            console.error(error);
        }
    }

    const clearCart = () => {
        setCartItems({})
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList()
            const savedCart = JSON.parse(localStorage.getItem("cartItems")) || {}
            setCartItems(savedCart)
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
            else {
                const savedCart = JSON.parse(localStorage.getItem("cartItems")) || {}
                setCartItems(savedCart)
            }
        }
        loadData()
    }, [])

    useEffect(() => {
        if(Object.keys(cartItems).length > 0){
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
        }
    }, [cartItems])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalAmountCart,
        url,
        token,
        setToken,
        clearCart
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider