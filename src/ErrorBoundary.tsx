import { PropsWithChildren, Component } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ErrorBoundary extends Component<PropsWithChildren<any>> {
    state: { hasError: boolean };

    constructor(props: { children: JSX.Element }) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error): void {
        alert(error);
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h2>Oops! Something went wrong!</h2>;
        }
        return this.props.children;
    }
}
