import { createStore, applyMiddleware } from "redux";
import store from "../src/store";
import { middlewares } from "../src/configureStore";
import { ReactWrapper, ShallowWrapper } from "enzyme";

/**
 * Create a testing store with imported reducers, middleware, and initial state.
 *  globals: rootReducer.
 * @param {object} initialState - Initial state for store.
 * @function storeFactory
 * @returns {Store} - Redux store.
 */
export const storeFactory = (initialState) => {
    return createStore(store, initialState, applyMiddleware(...middlewares));
};

/**
 * Return node(s) with the given data-test attribute.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (
    wrapper: ShallowWrapper | ReactWrapper,
    val: String
) => {
    return wrapper.find(`[data-test="${val}"]`);
};
