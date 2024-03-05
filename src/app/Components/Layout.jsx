import NavBar from "./NavBar"



const Layout = ({children}) => {

  
  return (
    <div className="bg-gray-100">
    <NavBar/>
    {children}
    </div>
  )
}

export default Layout