import { Outlet } from "react-router-dom"
import Header from "../shared/Header/Header"
import Footer from "../shared/Footer/Footer"

const Layout = () => {
  return (
    <div className="p-1 flex flex-col max-w-[1440px] mx-auto gap-0">
      <Header />
      <Outlet />
      <Footer />
    </div>)
}

export default Layout