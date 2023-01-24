import { store } from "@redux/store";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";
import PropTypes from "prop-types"

const Providers = ({ children }) => {
    <Provider>
        <Router store={store}>
            {children}
        </Router>
    </Provider>
}

Providers.propTypes = {
    children: PropTypes.node.isRequired
}

const customRender = (ui, options) => {
    return render(ui, { wrapper: Providers, ...options })
}

const renderWithRouter = (ui) => {
    const history = createBrowserHistory();

    return {
        history,
        ...render(ui, { wrapper: Providers })
    }
}

export * from "@testing-library/react"

export { customRender, renderWithRouter }
