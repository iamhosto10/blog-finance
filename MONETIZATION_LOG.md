# Monopolombiano — Bitácora de Monetización y Experimentos

> Registro persistente para la automatización nocturna (`Monopolombiano — Monetización Nocturna`, horario estricto 3:00–6:00 AM `America/Bogota`).
> Cada ejecución debe leer este archivo primero, elegir 1–2 acciones concretas del backlog priorizado, validar `lint` + `test` + `build`, desplegar y registrar los resultados aquí.

---

## Estrategia Activa (Colombia-first)

1. **Nivel 1 (Autónomo inmediato)**: Captura de leads + plantillas Excel/Google Sheets descargables (`/api/files/[slug]`) + vitrina `/recursos` (plantillas PRO y diagnóstico financiero 1-a-1) + tracking de conversiones GA4 + higiene SEO/JSON-LD.
2. **Nivel 2 (Alto margen, requiere links/cuentas de Gerardo)**: Pasarela de pago colombiana (**Wompi**, **Bold Link de Pago**, **Mercado Pago** o **Hotmart** con PSE/Nequi) + enlaces de afiliados/referidos en las 7 calculadoras de rentabilidad y el comparador de 20 tarjetas de crédito.
3. **Nivel 3 (B2B)**: Página `/anunciate` (Media Kit) para patrocinios con fintechs, neobancos y apps tributarias en Colombia.
4. **AdSense**: Mantener solo como ingreso pasivo secundario en bloques informativos donde no compita con CTAs propios de mayor conversión.

---

## Bloqueos / Solicitudes Pendientes para Gerardo (pedir o recordar por correo)

- [ ] **Verificar dominio `monopolombiano.com` en Resend** (actualmente `onboarding@resend.dev` solo permite enviar correos al dueño de la cuenta `EMAIL_TO`; verificar el dominio permitirá enviar correos automáticos de bienvenida y entrega de plantillas directamente a los suscriptores).
- [ ] **Activar links de pago en Colombia** (Wompi, Bold, Mercado Pago o Hotmart) para cobrar automáticamente en COP (PSE / Nequi / tarjeta) por plantillas PRO y asesorías 1-a-1 en `/recursos`.
- [ ] **Compartir links de referido / afiliado** (Global66, Lulo, Nu, Trii, Tyba, Wise, Tributi, ComparaOnline, Amazon) para integrarlos en las calculadoras y el comparador de tarjetas.
- [ ] **(Opcional) Instalar `edge-tts`** si se desea voz neuronal colombiana (`es-CO-SalomeNeural` / `es-CO-GonzaloNeural`) en lugar de la voz local de macOS (`say -v Paulina`) para los audios de los blogs.

---

## Backlog Priorizado de Próximos Experimentos

1. **Exp #2 — Página `/recursos` (Tienda de Plantillas PRO + Diagnóstico Financiero 1-a-1)**:
   - Crear vitrina en `/recursos` + agregarla al menú principal y footer.
   - Ofrecer: (a) Plantilla Maestra Finanzas Personales Colombia (Excel/Sheets, \$39.000 COP), (b) Kit Comprador de Vivienda VIS/No VIS y Leasing (\$39.000 COP), (c) Diagnóstico Financiero 1-a-1 (\$110.000 COP).
   - Mientras se conectan links de pago colombianos, implementar formulario de solicitud/reserva rápida que registra intención en GA4 (`product_cta_click`, `service_inquiry`) y notifica a Gerardo vía Resend.
2. **Exp #3 — Lead Magnet Gratuito real en `/api/files/[slug]` + CTAs en Calculadoras**:
   - Generar archivo real descargable (Excel/CSV/PDF guía de presupuesto 50/30/20 + control 4x1000 Colombia), subirlo al esquema `archivo` en Sanity y mostrar CTA contextual debajo de los resultados de las calculadoras (4x1000, crédito, ahorro, leasing, rentabilidad).
3. **Exp #4 — Datos Estructurados JSON-LD (`Article`, `FAQPage`, `WebApplication`, `BreadcrumbList`)**:
   - Inyectar schema.org válido en artículos (`economia-hoy`, `finanzas-personales`, `tips-financieros`) y calculadoras para mejorar CTR orgánico en Google Colombia.
4. **Exp #5 — Actualizar tasas `profitability` en Sanity + copy de calculadoras**:
   - Sincronizar tasas actuales de Nu, Lulo, Pibank, Global66, Bold, Rappi y Banco Popular en Sanity y eliminar porcentajes hardcodeados desactualizados en textos (ej. `8.25%` en Nu).
5. **Exp #6 — Enlaces de solicitud/afiliados en Comparador de Tarjetas y Rentabilidad**:
   - Agregar campo `applyUrl` en `cards` y botones con tracking `affiliate_click` y aviso legal de transparencia.
6. **Exp #7 — Página `/anunciate` (Media Kit B2B)**:
   - Propuesta comercial para fintechs, neobancos y constructoras en Colombia con formulario de contacto comercial.

---

## Registro de Experimentos Ejecutados

### 2026-11-19 — Experimento #1: Captura de Leads en Footer + Tracking GA4 + Higiene SEO (Prueba Inicial)
- **Hipótesis**: Activar el botón muerto `SUSCRÍBETE` del footer con un formulario real de captura de leads + instrumentar eventos en GA4 + corregir metadata/sitemap rotos establece la base de medición y captación sin afectar rendimiento.
- **Cambios implementados**:
  - `lib/gtag.ts`: añadido helper `trackEvent(action, params)` para eventos personalizados de GA4.
  - `app/api/subscribe/route.ts`: endpoint `POST /api/subscribe` con validación de correo, sanitización HTML y notificación inmediata a `EMAIL_TO` vía Resend.
  - `components/Footer/NewsletterForm.tsx` y `components/Footer/footer.tsx`: formulario funcional inline en reemplazo del botón sin acción + evento GA4 `lead_signup` + actualización de copyright a `2026`.
  - `app/calculadoras/nu/ClientPage.tsx`: eliminada exportación inválida de `metadata` dentro de componente cliente (`https://tusitio.com/nu-colombia`).
  - `app/tips-financieros/page.tsx`: corregidos `url`, `siteName`, `locale` (`es_CO`) y añadido `canonical`.
  - `app/sitemap.ts`: añadida la calculadora faltante `simulador-de-inversion`.
- **Métrica objetivo**: primeros leads captados vía `POST /api/subscribe` y evento `lead_signup` visible en GA4.
- **Estado**: En producción tras validación completa (`lint`, `test`, `build`).
