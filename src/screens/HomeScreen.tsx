import { Button } from "antd"
import { Link } from "react-router-dom"
import './HomePage.css';


const HomeScreen: React.FC = () => {
    return(
        <>
             <main className="main-content  mt-0" style={{height:"80vh"}}>
    <section className="h-100">
    
    <div className="justify-content-center position-relative bg-gradient-primary h-100  px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden d-flex align-items-center" style={{backgroundImage: `url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg')`,backgroundSize: 'cover'}} >
                <span className="mask bg-gradient-primary opacity-6"></span>
                <img src="../../../public/logo.jpg" className="navbar-brand-img h-100" alt="main_logo"/>
                <h1 className="mt-5 text-white font-weight-bolder position-relative">"Powering Your Trading Success"</h1>
                <h5 className="text-white position-relative">The more effortless the writing looks, the more effort the writer actually put into the process.</h5>
                <Link to='/login'>
                <Button >
                Get Started
                        
                </Button>
                </Link>
                <p>or </p>

                <Link to='/login'>Login to your existing Account </Link>
     </div>
    </section>
    </main>
        </>
    )
}

export default HomeScreen