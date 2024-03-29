import { CartGuitar, Guitar } from "../types";

type HeaderProps = {
  cart: CartGuitar[],
  removeFromCart: (id: Guitar['id']) => void ,
  incrementarCart: (id: Guitar['id']) => void ,
  decrementarCart: (id: Guitar['id']) => void ,
  cleanCart: () => void,
  isEmpity: boolean,
  calcularTotal: number 
}



function Header({
  cart,
  removeFromCart ,
  incrementarCart,
  decrementarCart,
  cleanCart,
  isEmpity,
  calcularTotal,
} : HeaderProps) {
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="./public/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="./public/img/carrito.png"
                alt="imagen carrito"
              />
              <div id="carrito" className="bg-white p-3">
                {isEmpity ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map(
                          (Guitar: {
                            id: number;
                            image: string;
                            name: string;
                            price: number;
                            quantity: number;
                          }) => (
                            <tr key={Guitar.id}>
                              <td>
                                <img
                                  className="img-fluid"
                                  src={`./public/img/${Guitar.image}.jpg`}
                                  alt="imagen guitarra"
                                />
                              </td>
                              <td>{Guitar.name}</td>
                              <td className="fw-bold">{Guitar.price}</td>
                              <td className="flex align-items-start gap-4">
                                <button
                                  type="button"
                                  className="btn btn-dark"
                                  onClick={() => decrementarCart(Guitar.id)}
                                >
                                  -
                                </button>
                                {Guitar.quantity}
                                <button
                                  type="button"
                                  className="btn btn-dark"
                                  onClick={() => incrementarCart(Guitar.id)}
                                >
                                  +
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => removeFromCart(Guitar.id)}
                                  type="button"
                                >
                                  X
                                </button>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </>
                )}

                <p className="text-end">
                  Total pagar: <span className="fw-bold">${calcularTotal}</span>
                </p>
                <button
                  className="btn btn-dark w-100 mt-3 p-2"
                  onClick={cleanCart}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
