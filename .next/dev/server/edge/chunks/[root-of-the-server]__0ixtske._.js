(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(["chunks/[root-of-the-server]__0ixtske._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/node_modules/@supabase/ssr/dist/index.mjs [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
;
;
async function middleware(request) {
    let response = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
        request: {
            headers: request.headers
        }
    });
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$index$2e$mjs__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createServerClient"])(("TURBOPACK compile-time value", "https://example.supabase.co"), ("TURBOPACK compile-time value", "fake-anon-key"), {
        cookies: {
            get (name) {
                return request.cookies.get(name)?.value;
            },
            set (name, value, options) {
                request.cookies.set({
                    name,
                    value,
                    ...options
                });
                response = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
                    request: {
                        headers: request.headers
                    }
                });
                response.cookies.set({
                    name,
                    value,
                    ...options
                });
            },
            remove (name, options) {
                request.cookies.set({
                    name,
                    value: '',
                    ...options
                });
                response = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
                    request: {
                        headers: request.headers
                    }
                });
                response.cookies.set({
                    name,
                    value: '',
                    ...options
                });
            }
        }
    });
    const { data: { user } } = await supabase.auth.getUser();
    const path = request.nextUrl.pathname;
    // Rotas públicas
    if (path.startsWith('/auth')) return response;
    // Rota protegida: redireciona para login se não autenticado
    if (!user) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/auth/login', request.url));
    }
    return response;
}
const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api/).*)'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__0ixtske._.js.map