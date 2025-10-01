import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout(props){
    return (
        <>
            <Navbar />
            <br />

            <div>
                {props.children}
            </div>
            <br />

            <Footer />
        </>
    )
}