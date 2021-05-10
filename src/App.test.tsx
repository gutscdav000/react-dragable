import React from "react";
import { mount, shallow, ShallowWrapper } from "enzyme";
import { Provider } from "react-redux";
import { findByTestAttr, storeFactory } from "../test/testUtil";
import App from "./App";

// const setup = () => {
//     const store = storeFactory();
//     return mount(
//         <Provider store={store}>
//             <App />
//         </Provider>
//     );
// };

test("renders withoutt crashing", () => {
    const wrapper: ShallowWrapper = shallow(<App />);
    //console.log(wrapper.debug()); //<- shows what is rendering
    expect(wrapper.exists()).toBe(true);
});

test("renders without error", () => {
    const wrapper: ShallowWrapper = shallow(<App />);
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent).toHaveLength(1);
});
