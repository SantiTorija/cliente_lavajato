import { useState } from "react";
import { addClient } from "../redux/clientSlice";
import { next } from "../redux/reserveStepSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import { Container, Row, Form, Button } from "react-bootstrap";
import styles from "./clientDataForm.module.css";
import useStoreClient from "../hooks/useStoreClient";
import Footer from "../components/Footer";
import { emptyCart } from "../redux/cartSlice";
import { removeClient } from "../redux/clientSlice";
import { emptyOrderToEdit } from "../redux/orderToEditSlice";

const ClientDataForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useParams();
  const { storeClient } = useStoreClient();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [countryCode, setCountryCode] = useState("+598");
  const [localPhone, setLocalPhone] = useState("");
  const [carType, setCarType] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullPhone = `${countryCode}${localPhone}`;
    await storeClient(
      firstname,
      lastname,
      email,
      fullPhone,
      modelo,
      marca,
      carType
    );
    dispatch(
      addClient({
        firstname,
        lastname,
        email,
        phone: fullPhone,
        car: { modelo, marca, carType },
      })
    );
    dispatch(next());
  };

  const handleBack = () => {
    dispatch(emptyCart());
    dispatch(removeClient());
    dispatch(emptyOrderToEdit());
    navigate("/");
  };

  return (
    <>
      <Container className=" d-flex flex-column justify-content-center align-items-center">
        <Form
          className={`p-4 border mt-4 ${styles.form}`}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mt-2" controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mt-2" controlId="formApellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mt-2 mb-3" controlId="formTelefono">
            <Form.Label>Teléfono</Form.Label>
            <div className="d-flex gap-2 align-items-center">
              <Form.Select
                style={{ maxWidth: 110 }}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                required
              >
                <option value="+598">🇺🇾 +598 (UY)</option>
                <option value="+54">🇦🇷 +54 (AR)</option>
                <option value="+55">🇧🇷 +55 (BR)</option>
                <option value="+1">🇺🇸 +1 (US)</option>
              </Form.Select>
              <Form.Control
                type="tel"
                pattern="[0-9]{7,12}"
                placeholder="Número sin código"
                value={localPhone}
                onChange={(e) => setLocalPhone(e.target.value)}
                required
                style={{ maxWidth: 200 }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-2" controlId="formMatricula">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-2" controlId="formMatricula">
            <Form.Label>Modelo</Form.Label>
            <Form.Control
              type="text"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mt-2" controlId="formTipoAuto">
            <Form.Label>Tipo de auto</Form.Label>
            <Form.Select
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
            >
              <option value="">Selecciona una opción</option>
              {[
                "Auto - furgón chico",
                "Pick Up pequeñas - SUV",
                "Pick up - SUV 7 plazas",
              ].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="w-100 d-flex justify-content-center gap-2 pt-4">
            <Button
              className="back-button w-50"
              type="button"
              disabled={!carType || !firstname || !lastname}
              onClick={handleBack}
            >
              Atrás
            </Button>
            <Button
              className="action-button w-50"
              type="submit"
              disabled={!carType || !firstname || !lastname}
            >
              Siguiente
            </Button>
          </div>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default ClientDataForm;
