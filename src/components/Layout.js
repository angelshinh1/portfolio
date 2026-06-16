import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout(props) {
    return (
        <>
            {/* Paper texture layer — organic physical feel */}
            <div
                aria-hidden="true"
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 9997,
                    pointerEvents: "none",
                    backgroundImage: "url('/paper-texture.jpg')",
                    backgroundSize: "480px auto",
                    backgroundRepeat: "repeat",
                    opacity: 0.13,
                }}
            />
            {/* Fine SVG noise grain on top — film grain feel */}
            <div
                aria-hidden="true"
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 9998,
                    pointerEvents: "none",
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E\")",
                    backgroundSize: "200px 200px",
                    backgroundRepeat: "repeat",
                    opacity: 0.08,
                }}
            />

            <Navbar />
            <main>{props.children}</main>
            <Footer />
        </>
    );
}
