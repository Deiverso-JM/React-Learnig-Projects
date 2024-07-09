import { itemMenuT, orderItem } from '../types/index'


export type OrderActions =
    { type: 'add-item', payload: { item: itemMenuT } } |
    { type: 'remove-item', payload: { id: orderItem['id'] } } |
    { type: 'place-order' } |
    {
        type: 'add-tip', payload: { value: number }
    }

export type orderState = {
    order: orderItem[]
    tip: number
}

export const initialState: orderState = {
    order: [],
    tip: 0
}


export const orderReducer = (
    state: orderState = initialState,
    action: OrderActions
) => {

    if (action.type === 'add-item') {
        const itemExist = state.order.find(item => item.id === action.payload.item.id);
        let order: orderItem[] = []
        if (itemExist) {
            order = state.order.map((orderItem) =>
                orderItem.id === action.payload.item.id
                    ? { ...orderItem, quiantity: orderItem.quiantity + 1 }
                    : orderItem
            );

        } else {
            const newItem: orderItem = { ...action.payload.item, quiantity: 1 };
            order = [...state.order, newItem];
        }
        return {
            ...state,
            order
        }
    }


    if (action.type === 'remove-item') {
        const itemExist = state.order.find((orderItem) => orderItem.id === action.payload.id);
        let updateOrder: orderItem[] = [];
        if (itemExist && itemExist?.quiantity > 1) {
            updateOrder = state.order.map((orderItem) =>
                orderItem.id === action.payload.id
                    ? { ...orderItem, quiantity: orderItem.quiantity - 1 }
                    : orderItem
            );
        } else {
            updateOrder = state.order.filter((orderItem) => orderItem.id !== action.payload.id)

        }


        return {
            ...state,
            order: updateOrder
        }
    }

    if (action.type === 'place-order') {
        return {
            ...state,
            order: []
        }
    }

    if (action.type === 'add-tip') {
        const tip = action.payload.value
        return {
            ...state,
            tip
        }
    }

    return state
}