import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FormularioPerguntas = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { perguntas } = location.state || { perguntas: [] };

  if (!perguntas.length) {
    navigate("/");
    return null;
  }

  const [respostas, setRespostas] = useState({});
  const [erro, setErro] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);

  const handleInputChange = (index, value) => {
    setRespostas((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    const respostasArray = perguntas.map((pergunta, index) => ({
      pergunta,
      resposta: respostas[index] || "",
    }));

    if (respostasArray.some(({ resposta }) => resposta.trim() === "")) {
      setErro("Por favor, responda todas as perguntas antes de enviar.");
      return;
    }

    try {
      const usuario_id = "2";
      setUsuarioId(usuario_id);

      const response = await fetch(`http://127.0.0.1:3333/api/respostas/${usuario_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id,
          respostas: respostasArray,
        }),
      });

      if (response.ok) {
        setShowPopup(true);
      } else {
        const errorData = await response.json();
        setErro(errorData.error || "Erro ao enviar respostas.");
      }
    } catch (error) {
      console.error("Erro ao enviar respostas:", error);
      setErro("Erro interno ao tentar enviar as respostas.");
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    if (usuarioId) {
      window.location.href = `http://localhost:5173/?id=${usuarioId}`;
    } else {
      navigate("/");
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Roboto', sans-serif",
        backgroundColor: "#FFFFFF",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#E0E7FF",
          border: "none",
          borderRadius: "8px",
          padding: "10px 16px",
          cursor: "pointer",
          marginBottom: "24px",
          color: "#4C51BF",
          fontWeight: "bold",
          fontSize: "14px",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#C3DAFE")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#E0E7FF")}
      >
        ← Voltar
      </button>

      <h1
        style={{
          fontSize: "28px",
          marginBottom: "16px",
          color: "#2D3748",
          fontWeight: "700",
        }}
      >
        Formulário de Perguntas
      </h1>
      <p style={{ marginBottom: "24px", color: "#4A5568", fontSize: "16px" }}>
        Responda às perguntas abaixo:
      </p>

      {erro && (
        <p
          style={{
            color: "#E53E3E",
            fontSize: "14px",
            marginBottom: "16px",
            fontWeight: "500",
          }}
        >
          {erro}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        {perguntas.map((pergunta, index) => (
          <div
            key={index}
            style={{
              marginBottom: "24px",
              padding: "12px",
              backgroundColor: "#F7FAFC",
              borderRadius: "8px",
              border: "1px solid #E2E8F0",
            }}
          >
            <label
              style={{
                display: "block",
                fontWeight: "600",
                color: "#2D3748",
                marginBottom: "8px",
              }}
            >
              {pergunta}
            </label>
            <input
              type="text"
              placeholder="Digite sua resposta aqui..."
              value={respostas[index] || ""}
              onChange={(e) => handleInputChange(index, e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #CBD5E0",
                borderRadius: "6px",
                fontSize: "14px",
                color: "#2D3748",
              }}
            />
          </div>
        ))}
        <button
          type="submit"
          style={{
            marginTop: "16px",
            padding: "12px 20px",
            backgroundColor: "#3182CE",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2B6CB0")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3182CE")}
        >
          Enviar Respostas
        </button>
      </form>

      {/* Popup de confirmação */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "8px",
              textAlign: "center",
              width: "300px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ color: "#3182CE" }}>Obrigado!</h2>
            <p>Suas respostas foram enviadas com sucesso.</p>
            <button
              onClick={() => {
                handlePopupClose(); // Fechar o popup
                console.log("ID do usuário:", usuarioId);
                window.location.href = `http://localhost:5173/step9?id=${usuarioId}`;  // Redireciona para o step9
              }}
              style={{
                padding: "8px 16px",
                backgroundColor: "#3182CE",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "16px",
              }}
            >
              Fechar
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioPerguntas;
