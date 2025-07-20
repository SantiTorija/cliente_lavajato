import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Form, Toast, Spinner } from "react-bootstrap";
import { next } from "../redux/reserveStepSlice";
import { updateClientField, removeClient } from "../redux/clientSlice";
import { FaCheck } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import styles from "./confirmClientData.module.css";
import useUpdateClient from "../hooks/useUpdateClient";
import useFetchCarTypes from "../hooks/useFetchCarTypes";
import { emptyCart } from "../redux/cartSlice";
import { emptyOrderToEdit } from "../redux/orderToEditSlice";

const ConfirmClientDataForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { firstname, phone, modelo, marca, carType, clientId } = useSelector(
    (state) => state.client
  );

  const [editingField, setEditingField] = useState(null);
  const [localPhone, setLocalPhone] = useState(
    phone ? phone.replace(/^\+\d{1,3}/, "") : ""
  );
  const [localMarca, setLocalMarca] = useState(marca || "");
  const [localModelo, setLocalModelo] = useState(modelo || "");
  const [localCarType, setLocalCarType] = useState(carType);
  const [localCarTypeId, setLocalCarTypeId] = useState(null);
  const [countryCode, setCountryCode] = useState("+598");

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { updateClientField: updateClientAPI, loading } = useUpdateClient();
  const { carTypes, loading: loadingCarTypes } = useFetchCarTypes();
  // Sincronizar carTypeId si cambia el nombre (por ejemplo, al cargar datos)
  useEffect(() => {
    if (carTypes.length && localCarType) {
      const found = carTypes.find((ct) => ct.name === localCarType);
      if (found) setLocalCarTypeId(found.id);
    }
  }, [carTypes, localCarType]);

  // Sincronizar estado local con Redux store
  useEffect(() => {
    setLocalPhone(phone ? phone.replace(/^\+\d{1,3}/, "") : "");
    setLocalMarca(marca || "");
    setLocalModelo(modelo || "");
    setLocalCarType(carType || "");
  }, [phone, marca, modelo, carType]);

  // Handler para el select de carType
  const handleCarTypeChange = (e) => {
    const selectedId = Number(e.target.value);
    setLocalCarTypeId(selectedId);
    const found = carTypes.find((ct) => ct.id === selectedId);
    setLocalCarType(found ? found.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/calendario");
  };
  const handleBack = () => {
    dispatch(emptyCart());
    dispatch(removeClient());
    dispatch(emptyOrderToEdit());
    navigate("/");
  };
  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleConfirm = async (field, value) => {
    try {
      let updatedClient;
      if (field === "carType") {
        console.log(value.name);
        setLocalCarType(value.name);
        setLocalCarTypeId(value.id);
        updatedClient = await updateClientAPI(clientId, field, value.name, {
          carTypeId: value.id,
        });
        dispatch(updateClientField({ field: "carType", value: value.name }));
        dispatch(updateClientField({ field: "carTypeId", value: value.id }));
      } else {
        updatedClient = await updateClientAPI(clientId, field, value, {
          countryCode: field === "phone" ? countryCode : undefined,
        });
        dispatch(updateClientField({ field, value }));
        if (field === "phone") {
          setLocalPhone(value);
        } else if (field === "marca") {
          setLocalMarca(value);
        } else if (field === "modelo") {
          setLocalModelo(value);
        }
      }
      setEditingField(null);
      setToastMessage(`${getFieldDisplayName(field)} actualizado exitosamente`);
      setShowSuccessToast(true);
      console.log("Cliente actualizado exitosamente:", updatedClient);
    } catch (err) {
      console.error("Error al actualizar:", err);
      setToastMessage(
        `Error al actualizar ${getFieldDisplayName(field)}: ${err.message}`
      );
      setShowErrorToast(true);
    }
  };

  const getFieldDisplayName = (field) => {
    const fieldNames = {
      phone: "Teléfono",
      marca: "Marca",
      modelo: "Modelo",
      carType: "Tipo de auto",
    };
    return fieldNames[field] || field;
  };

  const renderPhoneField = () => {
    const isEditing = editingField === "phone";

    return (
      <Form.Group className="mt-2" controlId="formTelefono">
        <Form.Label>Teléfono</Form.Label>
        <div className={styles.phoneGroup}>
          <Form.Select
            className={styles.countrySelect}
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            required
          >
            <option value="+598">🇺🇾 +598 (UY)</option>
            <option value="+54">🇦🇷 +54 (AR)</option>
            <option value="+55">🇧🇷 +55 (BR)</option>
            <option value="+1">🇺🇸 +1 (US)</option>
          </Form.Select>
          <div className={styles.inputWithButton} style={{ flex: 1 }}>
            {isEditing ? (
              <>
                <Form.Control
                  type="tel"
                  pattern="[0-9]{7,12}"
                  placeholder="Número sin código"
                  value={localPhone}
                  onChange={(e) => setLocalPhone(e.target.value)}
                  required
                  className={`${styles.phoneInput} ${
                    isEditing
                      ? styles.editingHighlight
                      : editingField
                      ? styles.disabledField
                      : ""
                  }`}
                  autoFocus
                  disabled={editingField && !isEditing}
                />
                <button
                  type="button"
                  className={`${styles.editButton} ${styles.confirm} ${
                    isEditing
                      ? styles.editingHighlight
                      : editingField
                      ? styles.disabledField
                      : ""
                  }`}
                  onClick={() => handleConfirm("phone", localPhone)}
                  title="Confirmar"
                  disabled={loading || (editingField && !isEditing)}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.transform = "translateY(-50%) scale(1.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.transform = "translateY(-50%) scale(1)";
                    }
                  }}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <FaCheck />
                  )}
                </button>
              </>
            ) : (
              <>
                <Form.Control
                  type="tel"
                  pattern="[0-9]{7,12}"
                  placeholder="Número sin código"
                  value={localPhone}
                  readOnly
                  className={`${styles.phoneInput} ${
                    editingField ? styles.disabledField : ""
                  }`}
                  disabled={!!editingField}
                />
                <button
                  type="button"
                  className={`${styles.editButton} ${styles.edit} ${
                    editingField ? styles.disabledField : ""
                  }`}
                  onClick={() => handleEdit("phone")}
                  title="Editar"
                  disabled={loading || !!editingField}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.transform = "translateY(-50%) scale(1.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.transform = "translateY(-50%) scale(1)";
                    }
                  }}
                >
                  <MdModeEditOutline />
                </button>
              </>
            )}
          </div>
        </div>
      </Form.Group>
    );
  };

  const renderEditableField = (
    field,
    value,
    setValue,
    label,
    type = "text",
    options = null
  ) => {
    const isEditing = editingField === field;

    return (
      <Form.Group className="mt-2" controlId={`form${field}`}>
        <Form.Label>{label}</Form.Label>
        <div className={styles.inputWithButton}>
          {isEditing ? (
            <>
              {type === "select" ? (
                <Form.Select
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  autoFocus
                  className={`${styles.readOnlyField} ${
                    isEditing
                      ? styles.editingHighlight
                      : editingField
                      ? styles.disabledField
                      : ""
                  }`}
                  disabled={editingField && !isEditing}
                >
                  <option value="" disabled>
                    Selecciona un tipo de auto
                  </option>
                  {options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <Form.Control
                  type={type}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  autoFocus
                  className={`${styles.readOnlyField} ${
                    isEditing
                      ? styles.editingHighlight
                      : editingField
                      ? styles.disabledField
                      : ""
                  }`}
                  disabled={editingField && !isEditing}
                />
              )}
              <button
                type="button"
                className={`${styles.editButton} ${styles.confirm} ${
                  isEditing
                    ? styles.editingHighlight
                    : editingField
                    ? styles.disabledField
                    : ""
                }`}
                onClick={() => handleConfirm(field, value)}
                title="Confirmar"
                disabled={loading || (editingField && !isEditing)}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = "translateY(-50%) scale(1.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.transform = "translateY(-50%) scale(1)";
                  }
                }}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <FaCheck />
                )}
              </button>
            </>
          ) : (
            <>
              <Form.Control
                type={type}
                value={value}
                readOnly
                className={`${styles.readOnlyField} ${
                  editingField ? styles.disabledField : ""
                }`}
                disabled={!!editingField}
              />
              <button
                type="button"
                className={`${styles.editButton} ${styles.edit} ${
                  editingField ? styles.disabledField : ""
                }`}
                onClick={() => handleEdit(field)}
                title="Editar"
                disabled={loading || !!editingField}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = "translateY(-50%) scale(1.1)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.transform = "translateY(-50%) scale(1)";
                  }
                }}
              >
                <MdModeEditOutline />
              </button>
            </>
          )}
        </div>
      </Form.Group>
    );
  };

  return (
    <>
      {/* Toast de éxito */}
      <Toast
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        bg="success"
        delay={3000}
        autohide
        style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Éxito</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{toastMessage}</Toast.Body>
      </Toast>

      {/* Toast de error */}
      <Toast
        show={showErrorToast}
        onClose={() => setShowErrorToast(false)}
        bg="danger"
        delay={4000}
        autohide
        style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{toastMessage}</Toast.Body>
      </Toast>

      <Container className={styles.formContainer}>
        <Form className={styles.form} onSubmit={handleSubmit}>
          <h2>Bienvenido {firstname}</h2>
          <span>
            Por favor, confirme que los siguientes datos sean correctos
          </span>
          {renderPhoneField()}

          {renderEditableField("marca", localMarca, setLocalMarca, "Marca")}
          {renderEditableField("modelo", localModelo, setLocalModelo, "Modelo")}
          {/* Campo carType con select dinámico */}
          <Form.Group className="mt-2" controlId="formCarType">
            <Form.Label>Tipo de auto</Form.Label>
            <div className={styles.inputWithButton}>
              {editingField === "carType" ? (
                <>
                  <Form.Select
                    value={localCarTypeId || ""}
                    onChange={handleCarTypeChange}
                    autoFocus
                    className={`${styles.readOnlyField} ${
                      editingField === "carType"
                        ? styles.editingHighlight
                        : editingField
                        ? styles.disabledField
                        : ""
                    }`}
                    disabled={
                      loadingCarTypes ||
                      (editingField && editingField !== "carType")
                    }
                  >
                    {carTypes &&
                      carTypes.map((option) => (
                        <option
                          key={option.id}
                          value={option.id}
                          placeholder={option.name}
                        >
                          {console.log(option.name)}
                          {option.name}
                        </option>
                      ))}
                  </Form.Select>
                  <button
                    type="button"
                    className={`${styles.editButton} ${styles.confirm} ${
                      editingField === "carType"
                        ? styles.editingHighlight
                        : editingField
                        ? styles.disabledField
                        : ""
                    }`}
                    onClick={() =>
                      handleConfirm("carType", {
                        name: localCarType,
                        id: localCarTypeId,
                      })
                    }
                    title="Confirmar"
                    disabled={
                      loading || (editingField && editingField !== "carType")
                    }
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <FaCheck />
                    )}
                  </button>
                </>
              ) : localCarType ? (
                <>
                  <Form.Control
                    type="text"
                    value={carType}
                    readOnly
                    className={`${styles.readOnlyField} ${
                      editingField && editingField !== "carType"
                        ? styles.disabledField
                        : ""
                    }`}
                    disabled={editingField && editingField !== "carType"}
                  />
                  <button
                    type="button"
                    className={`${styles.editButton} ${styles.edit} ${
                      editingField && editingField !== "carType"
                        ? styles.disabledField
                        : ""
                    }`}
                    onClick={() => setEditingField("carType")}
                    title="Editar"
                    disabled={
                      loading || (editingField && editingField !== "carType")
                    }
                  >
                    <MdModeEditOutline />
                  </button>
                </>
              ) : (
                "cargando..."
              )}
            </div>
          </Form.Group>
        </Form>
      </Container>
      <div className={styles.navigationButtons}>
        <button
          onClick={handleBack}
          className={`back-button ${styles.backButton}`}
        >
          Volver
        </button>
        <button
          className={`action-button ${styles.actionButton}`}
          onClick={() => dispatch(next())}
          disabled={editingField !== null || loading}
          title={
            editingField !== null
              ? "Complete la edición antes de continuar"
              : ""
          }
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default ConfirmClientDataForm;
