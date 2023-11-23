export interface ApiOptions {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
  error?: unknown;
}

const Api = async (options: ApiOptions): Promise<ApiResponse> => {
  // On récupère le body (les données qu'on envoie)
  // et on le transforme en chaine de caractères (JSON.stringify)
  // parce que le body doit être une chaine de caractères pour être envoyé
  const body = options.body ? JSON.stringify(options.body) : null;

  // Si on fait une requête POST et qu'on a pas de body
  // On retourne une erreur (on ne peut pas faire de requête POST sans body)
  // Voir help.md dans l'API pour plus d'informations sur les requêtes
  if (options.method === "POST" && !body) {
    return {
      success: false,
      message: "You must provide a body for 'POST' requests",
    };
  }

  // On met tout dans un try/catch pour gérer les erreurs
  // Ça évite que si une erreur se produit, le code plante
  // et ça permet de gérer l'erreur proprement
  try {
    // On fait la requête à l'API avec la méthode et le body
    const res = await fetch(`http://localhost:3001${options.endpoint}`, {
      method: options.method,
      body: body,
    });

    // On retourne la réponse de l'API en JSON
    return await res.json();
  } catch (error) {
    // Si une erreur se produit, on l'affiche dans la console
    console.error(error);

    // On retourne un objet avec success à false et l'erreur
    // Ça permet de gérer l'erreur et l'afficher à l'utilisateur
    return {
      success: false,
      error: error,
    };
  }
};

export default Api;
