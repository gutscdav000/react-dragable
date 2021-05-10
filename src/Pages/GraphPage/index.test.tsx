import { findByTestAttr } from "../../../test/testUtil";
import { shallow } from "enzyme";
import GraphPage from "./";
import React from "react";

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
    return shallow(<GraphPage {...props} />);
};

test("renders without error", () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, "graph-page");
    expect(appComponent.length).toBe(1);
});

test("test opening drawer from modal", () => {
    // set initial state to modal open
    const wrapper = setup();
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation((init) => [init, setState]);

    const modal = findByTestAttr(wrapper, "worker-modal");
    const graph = findByTestAttr(wrapper, "graph-class");

    // simulate clicking create element button
    graph.props().openModal();
    modal.props().onOpenDrawer();
    expect(useStateSpy).toBeCalledTimes(2);
});
