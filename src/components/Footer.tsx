function Footer(){
    const AnoAtual = new Date().getFullYear()

    return(
        <footer className="w-full bg-blue-700 text-white text-center p-4 fixed bottom-0 left-0">
              <p> &copy; {AnoAtual} Minha aplicação react. 
                Todos direitos reservados </p>
            <p> Marca registrada &reg; </p>
        </footer>
    )
}

export default Footer;