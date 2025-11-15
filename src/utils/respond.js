export function respond(req, res, data, htmlView = null, status = 200) {
    // Si explícitamente pide JSON (header Accept incluye application/json) -> preferimos JSON
    const accept = (req.get("Accept") || "").toLowerCase();

    if (accept.includes("application/json") || req.xhr || req.query.json === "true" || req.is("application/json")) {
        return res.status(status).json(data);
    }

    // Si vienen desde Postman y Accept es "*/*" no queremos asumir HTML necesariamente.
    // Solo renderizamos HTML si se acepta HTML y se pasó la vista.
    if (htmlView && req.accepts("html")) {
        return res.status(status).render(htmlView, data);
    }

    // Fallback: devolver JSON (seguro y útil para APIs)
    return res.status(status).json(data);
}