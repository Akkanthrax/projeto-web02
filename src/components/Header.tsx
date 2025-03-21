import { Link } from "react-router-dom";

function Header(){
    return(
        <header className="w-full bg-blue-700 text-white p-4 fixed top-0 left-0 z-50">

            <nav className="flex justify-between">

                <h1 className="text-xl font-bold"> Projeto Web</h1>

                <ul className="flex space-x-4">

                    <li><Link className="mr-4" to="/"> Início </Link></li>

                    <li> <Link className="mr-4" to="/cadastro"> Cadastre-se </Link></li>

                  <li> <Link className="mr-4" to="/usuarios"> Usuarios </Link></li>

                </ul>

            </nav>

        </header>
    )
}

export default Header;