import { useState } from "react";
import { addClient } from "../redux/clientSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import { Container, Row, Form, Button } from "react-bootstrap";
import styles from "./clientDataForm.module.css";
import useStoreClient from "../hooks/useStoreClient";
import { next } from "../redux/reserveStepSlice";
import Footer from "../components/Footer";

const ConfirmClientDataForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstname, lastname, phone, modelo, marca, carType } = useSelector(
    (state) => state.client
  );
  const [nuevaMarca, setNuevaMarca] = useState("");
  const [nuevoModelo, setNuevoModelo] = useState("");
  const [countryCode, setCountryCode] = useState("+598");
  const [localPhone, setLocalPhone] = useState(
    phone ? phone.replace(/^\+\d{1,3}/, "") : ""
  );
  const [newcarType, setNewCarType] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/calendario");
  };

  return (
    <>
      <Container className=" d-flex flex-column justify-content-center align-items-center pb-4">
        <Form className={`  mt-4 `} onSubmit={handleSubmit}>
          <h2>Bienvenido {firstname}</h2>

          <span>
            Por favor, confirme que los siguientes datos sean correctos
          </span>

          <Form.Group className="mt-2" controlId="formTelefono">
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
              onChange={(e) => setNuevaMarca(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-2" controlId="formMatricula">
            <Form.Label>Modelo</Form.Label>
            <Form.Control
              type="text"
              value={modelo}
              onChange={(e) => setNuevoModelo(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mt-3" controlId="formTipoAuto">
            <Form.Label>Tipo de auto</Form.Label>
            <Form.Select
              value={carType}
              onChange={(e) => setNewCarType(e.target.value)}
            >
              <option value="" disabled>
                Selecciona un tipo de auto
              </option>
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
        </Form>
      </Container>
      <div className="d-flex justify-content-center mb-2 gap-2 px-3">
        <Button className="back-button w-50">Vover</Button>
        <Button className="action-button w-50" onClick={() => dispatch(next())}>
          Siguiente
        </Button>
      </div>
    </>
  );
};

export default ConfirmClientDataForm;
