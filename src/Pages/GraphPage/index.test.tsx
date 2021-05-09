import { findByTestAttr } from "../../../test/testUtil";
import { shallow } from "enzyme";
import GraphPage from "./";

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
