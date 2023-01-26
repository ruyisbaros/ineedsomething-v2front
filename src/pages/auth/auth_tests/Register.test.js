import { server } from "@mocks/server";
import { render, screen } from "@root/test.utils";
import Register from "@pages/auth/Register";


describe("Register", () => {
    it("register form should have labels", () => {
        render(<Register />);
        const emailLabel = screen.getByLabelText('username');
        const usernameLabel = screen.getByLabelText('email');
        const passwordLabel = screen.getByLabelText('password');

        expect(usernameLabel).toBeInTheDocument();
        expect(emailLabel).toBeInTheDocument();
        expect(passwordLabel).toBeInTheDocument();
    })
})