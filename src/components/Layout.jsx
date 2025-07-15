import Header from "./Header"
import Footer from "./Footer"
import "../styles/Layout.css"

const Layout = (props) => {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="layout-content">
        {props.children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout