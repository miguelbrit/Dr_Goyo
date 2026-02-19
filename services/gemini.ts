import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `
Eres el Dr. Goyo, un asistente médico virtual inteligente. 
Tu objetivo es orientar a los usuarios sobre sus síntomas, dudas de salud y redirigirlos a especialistas adecuados si es necesario.
REGLAS IMPORTANTES:
1. Siempre aclara que eres una IA y que tu consejo no sustituye una consulta médica.
2. Sé empático, profesional y claro.
3. Si detectas síntomas que sugieren una especialidad, menciónalo.
4. Las especialidades disponibles en nuestra plataforma son: Cardiólogo, Neurólogo, Nutricionista, Hematólogo, Ginecólogo, Endocrinólogo, Pediatra, Neumonólogo y Médico General.
5. Al final de tu respuesta, si detectas una especialidad clara, usa el formato [ESPECIALIDAD:Nombre de la especialidad] para que el sistema pueda ofrecer un botón de acción.
6. Mantén las respuestas breves y estructuradas.
`;

export async function getGeminiResponse(userMessage: string, history: { role: "user" | "model", parts: { text: string }[] }[] = []) {
  if (!API_KEY || API_KEY === "PLACEHOLDER_API_KEY") {
    return "Lo siento, la API de Gemini no está configurada correctamente. Por favor, configura tu GEMINI_API_KEY.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Entendido. Soy el Dr. Goyo y estoy listo para ayudar." }] },
        ...history
      ],
    });

    const result = await chat.sendMessage(userMessage);
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Lo siento, hubo un error al procesar tu solicitud. Inténtalo de nuevo más tarde.";
  }
}
