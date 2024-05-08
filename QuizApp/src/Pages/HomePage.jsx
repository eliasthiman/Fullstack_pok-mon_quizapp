import Header from "../components/Header.jsx";
import LoginForm from "../components/LoginForm.jsx";

function HomePage() {

    return (<div id="homepage">
        <Header/>
        <div className="card">
        <LoginForm />
        </div>
    </div>);
}

export default HomePage;