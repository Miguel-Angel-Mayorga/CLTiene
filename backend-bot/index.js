import "dotenv/config";
import express from "express";
import cors from "cors";
import fetch from "node-fetch";



//importaciones recomendadas por chat para la seguirdad
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { body, validationResult } from "express-validator";




const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // frontend
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

//Aqui implementamos seguirdad al chat-bot 

// 🛡️ Helmet ayuda a proteger la app configurando cabeceras HTTP seguras
app.use(helmet());

// ⏱️ Limitador global de peticiones (rate limiter)
// Evita ataques tipo DoS (demasiadas peticiones en poco tiempo)
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,   // ⏳ Ventana de tiempo: 1 minuto
  max: 100,              // 🚦 Máximo 100 peticiones por minuto por IP
  legacyHeaders: false,  // ❌ No usar cabeceras obsoletas (X-RateLimit-*)
  standardHeaders: true  // ✅ Usar cabeceras estándar (RateLimit-*)
});
app.use(globalLimiter);

// ✅ Middleware de validación para mensajes
const validateMessage = [
  // 1. El campo "message" debe existir
  body("message")
    .exists().withMessage("message is required ")
    // 2. Debe ser tipo string
    .isString().withMessage("message must be a string")
    // 3. Elimina espacios al inicio/fin
    .trim()
    // 4. Debe tener entre 1 y 3000 caracteres
    .isLength({ min: 1, max: 3000 }).withMessage("message too long (max 3000 chars)"),

  // 🧾 Función que revisa si hubo errores en la validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
      // ❌ Si hay errores → devuelve status 400 con lista de errores
      return res.status(400).json({ errors: errors.array() });
    
    // ✅ Si todo está bien, sigue con la siguiente función/middleware
    next();
  }
];

//-----------------------------*-----------------------------*-------------------------------*--------
app.use(cors(corsOptions));
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;
const url_base = "https://api.openai.com/v1/threads";

async function openaiFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
      "OpenAI-Beta": "assistants=v2",
      ...(options.headers || {}),
    },
  });

  const data = await response.json();
  if (!response.ok) {
    console.error("Error response from OpenAI:", data);
    throw new Error(data.error?.message || "Error en la solicitud a OpenAI");
  }
  return data;
}

app.post("/api/message", validateMessage, async (req, res) => {  try {
    const { message } = req.body;
    console.log("API Key:", OPENAI_API_KEY ? "OK" : "MISSING");
    console.log("Assistant ID:", ASSISTANT_ID ? "OK" : "MISSING");
    console.log("✅ Mensaje del usuario enviado:", message);

    const thread = await openaiFetch(url_base, { method: "POST" });
    const threadId = thread.id;

    console.log("🧵 Nuevo thread:", threadId);

    await openaiFetch(`${url_base}/${threadId}/messages`, {
      method: "POST",
      body: JSON.stringify({
        role: "user",
        content: [{ type: "text", text: message }],
      }),
    });
//----------------------/-------------------------/----------------------------
    // 🟢 modificado (solo guardo el run)
    const run = await openaiFetch(`${url_base}/${threadId}/runs`, {
      method: "POST",
      body: JSON.stringify({ assistant_id: ASSISTANT_ID }),
    });
    // 2. Polling hasta que el run termine
    let runStatus = run;  // Inicializa con el objeto run original

    // Mientras el run no esté completado ni haya fallado...
    while (runStatus.status !== "completed" && runStatus.status !== "failed") {
        // Espera 1 segundo antes de verificar nuevamente
      await new Promise((r) => setTimeout(r, 1000)); // esperar 1 seg
        // Obtiene el estado actualizado del run desde la API
      runStatus = await openaiFetch(`${url_base}/${threadId}/runs/${run.id}`);
    }

    // 3. Ahora sí debería traer usage
    console.log("📊 Uso de tokens en run:", runStatus.usage);


  //--------------------/-------------------------------/------------------------
    let output;
    let attempts = 0;
    const maxAttempts = 30; // 15 segundos
    while (!output && attempts < maxAttempts) {
      const msgsJson = await openaiFetch(`${url_base}/${threadId}/messages`);
      const msgs = msgsJson.data;
      // 👀 Aquí pones el log para ver qué trae la API en cada vuelta
      console.log("Mensajes actuales:", JSON.stringify(msgs, null, 2));

      const assistantMsg = msgs.find((m) => m.role === "assistant");

      if (assistantMsg) {
        const textPart = assistantMsg.content.find((c) => c.type === "text");
        if (textPart) {
          output = textPart.text.value;
        } else {
          console.log(
            "⚠️ Assistant respondió pero sin texto, sigo esperando..."
          );
        }
      } else {
        await new Promise((r) => setTimeout(r, 1000));
        attempts++;
      }
    }
    if (!output) output = "Lo siento, no pude generar respuesta.";
    res.json({ reply: output, threadId });
  } catch (error) {
    console.error("Error handling /api/message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
