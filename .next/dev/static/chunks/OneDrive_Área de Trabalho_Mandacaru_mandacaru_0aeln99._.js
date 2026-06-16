(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// lib/supabase.ts — cliente Supabase para uso no browser
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/node_modules/@supabase/ssr/dist/index.mjs [app-client] (ecmascript) <locals>");
;
function createClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://example.supabase.co"), ("TURBOPACK compile-time value", "fake-anon-key"));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Registro
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const s = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a100a',
        fontFamily: "'Special Elite', serif",
        padding: '2rem 1rem'
    },
    card: {
        width: 380,
        background: '#e8d9b8',
        border: '2px solid #7a3318',
        boxShadow: '0 0 0 4px #1a100a, 0 0 0 6px #7a3318, 0 20px 60px rgba(0,0,0,.7)',
        padding: '2.5rem 2rem'
    },
    title: {
        fontFamily: 'Georgia,serif',
        fontSize: '1.8rem',
        color: '#7a3318',
        textAlign: 'center',
        marginBottom: '0.3rem',
        letterSpacing: '0.1em'
    },
    sub: {
        fontSize: '0.72rem',
        letterSpacing: '0.3em',
        color: '#b8a480',
        textAlign: 'center',
        marginBottom: '2rem',
        textTransform: 'uppercase'
    },
    label: {
        display: 'block',
        fontSize: '0.65rem',
        letterSpacing: '0.25em',
        color: '#7a3318',
        marginBottom: 4,
        textTransform: 'uppercase'
    },
    input: {
        width: '100%',
        background: 'transparent',
        border: 'none',
        borderBottom: '1px solid #b8a480',
        fontFamily: "'Special Elite',serif",
        fontSize: '0.95rem',
        color: '#2a1a0a',
        padding: '4px',
        outline: 'none',
        marginBottom: '1.2rem',
        boxSizing: 'border-box'
    },
    btn: {
        width: '100%',
        background: '#7a3318',
        color: '#e8d9b8',
        border: '2px solid #c49a3c',
        padding: '0.7rem',
        fontFamily: 'Georgia,serif',
        fontSize: '0.8rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        marginTop: '0.5rem'
    },
    link: {
        textAlign: 'center',
        marginTop: '1.2rem',
        fontSize: '0.78rem',
        color: '#7a3318'
    },
    err: {
        background: 'rgba(139,26,26,.1)',
        border: '1px solid #8b1a1a',
        color: '#8b1a1a',
        padding: '0.5rem 0.8rem',
        fontSize: '0.82rem',
        marginBottom: '1rem'
    },
    ok: {
        background: 'rgba(61,92,46,.1)',
        border: '1px solid #3d5c2e',
        color: '#3d5c2e',
        padding: '0.5rem 0.8rem',
        fontSize: '0.82rem',
        marginBottom: '1rem'
    },
    roleGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.6rem',
        marginBottom: '1.2rem'
    }
};
function Registro() {
    _s();
    const [nome, setNome] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [senha, setSenha] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('jogador');
    const [codigo, setCodigo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [erro, setErro] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [ok, setOk] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    async function registrar(e) {
        e.preventDefault();
        setLoading(true);
        setErro('');
        setOk('');
        const { data, error } = await supabase.auth.signUp({
            email,
            password: senha,
            options: {
                data: {
                    nome,
                    role
                }
            }
        });
        if (error) {
            setErro(error.message);
            setLoading(false);
            return;
        }
        if (data.session) {
            if (role === 'mestre') {
                const res = await fetch('/api/perfil/role', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        role: 'mestre'
                    })
                });
                if (!res.ok) {
                    const body = await res.json().catch(()=>null);
                    setErro(body?.error ?? 'Nao foi possivel marcar sua conta como Mestre.');
                    setLoading(false);
                    return;
                }
            }
            if (role === 'jogador' && codigo.trim()) {
                const res = await fetch('/api/mesas/entrar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        codigo
                    })
                });
                if (!res.ok) {
                    const body = await res.json().catch(()=>null);
                    setErro(body?.error ?? 'Nao foi possivel entrar nesta mesa.');
                    setLoading(false);
                    return;
                }
            }
        }
        setOk(role === 'mestre' ? 'Conta criada como Mestre! Depois do login, voce podera criar mesas.' : 'Conta criada como Jogador! Depois do login, voce podera entrar em uma mesa e criar sua ficha.');
        setLoading(false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: s.page,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                href: "https://fonts.googleapis.com/css2?family=Special+Elite&display=swap",
                rel: "stylesheet"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: s.card,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: s.title,
                        children: "MANDACARU"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: s.sub,
                        children: "Novo Sobrevivente"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    erro && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: s.err,
                        children: erro
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                        lineNumber: 98,
                        columnNumber: 18
                    }, this),
                    ok && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: s.ok,
                        children: ok
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                        lineNumber: 99,
                        columnNumber: 16
                    }, this),
                    !ok && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: registrar,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: s.label,
                                children: "Seu nome"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                style: s.input,
                                type: "text",
                                value: nome,
                                onChange: (e)=>setNome(e.target.value),
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: s.label,
                                children: "Email"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                style: s.input,
                                type: "email",
                                value: email,
                                onChange: (e)=>setEmail(e.target.value),
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: s.label,
                                children: "Senha"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                                lineNumber: 108,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                style: s.input,
                                type: "password",
                                value: senha,
                                onChange: (e)=>setSenha(e.target.value),
                                required: true,
                                minLength: 6
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: s.label,
                                children: "Eu vou ser"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: s.roleGrid,
                                children: [
                                    'jogador',
                                    'mestre'
                                ].map((opcao)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setRole(opcao),
                                        style: {
                                            ...s.btn,
                                            marginTop: 0,
                                            padding: '0.55rem',
                                            background: role === opcao ? '#7a3318' : 'transparent',
                                            color: role === opcao ? '#e8d9b8' : '#7a3318',
                                            borderColor: role === opcao ? '#c49a3c' : '#b8a480'
                                        },
                                        children: opcao === 'mestre' ? 'Mestre' : 'Jogador'
                                    }, opcao, false, {
                                        fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                                        lineNumber: 115,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this),
                            role === 'jogador' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: s.label,
                                        children: "Codigo da Mesa (opcional)"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        style: {
                                            ...s.input,
                                            textTransform: 'uppercase'
                                        },
                                        type: "text",
                                        value: codigo,
                                        onChange: (e)=>setCodigo(e.target.value),
                                        placeholder: "ex: SERTAO-42"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                                        lineNumber: 136,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                style: s.btn,
                                disabled: loading,
                                children: loading ? 'Registrando...' : 'Criar Conta'
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                                lineNumber: 142,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this),
                    ok && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/auth/login",
                        style: {
                            ...s.btn,
                            display: 'block',
                            textAlign: 'center',
                            textDecoration: 'none',
                            marginTop: '1rem'
                        },
                        children: "Ir para o Login"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: s.link,
                        children: [
                            "Ja tem conta? ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2fc1$rea__de__Trabalho$2f$Mandacaru$2f$mandacaru$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/auth/login",
                                style: {
                                    color: '#7a3318'
                                },
                                children: "Entrar"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                                lineNumber: 154,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Área de Trabalho/Mandacaru/mandacaru/app/auth/registro/page.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
_s(Registro, "zZEuroAOU6fMDq6oQtkx+zoMLa4=");
_c = Registro;
var _c;
__turbopack_context__.k.register(_c, "Registro");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=OneDrive_%C3%81rea%20de%20Trabalho_Mandacaru_mandacaru_0aeln99._.js.map