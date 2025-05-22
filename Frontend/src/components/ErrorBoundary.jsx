import React from 'react'
import styles from "./header/header.module.css"
import { Link } from 'react-router-dom';
class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
    };
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.error("Error caught in ErrorBoundary: ", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center h-screen">
                    <h1 className= "text-4xl font-bold text-red-500">Что то пошло не так.</h1>
                    <Link to='/'><h1 className= {`${styles.glow} text-4xl font-bold`}>Вернуться на главную</h1></Link>
                </div>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary