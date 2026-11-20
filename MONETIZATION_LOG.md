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

1. **Exp #3 — Lead Magnet Gratuito real en `/api/files/[slug]` + CTAs en Calculadoras**:
   - Generar archivo real descargable (Excel/CSV/PDF guía de presupuesto 50/30/20 + control 4x1000 Colombia), subirlo al esquema `archivo` en Sanity y mostrar CTA contextual debajo de los resultados de las calculadoras (4x1000, crédito, ahorro, leasing, rentabilidad).
2. **Exp #4 — Datos Estructurados JSON-LD (`Article`, `FAQPage`, `WebApplication`, `BreadcrumbList`)**:
   - Inyectar schema.org válido en artículos (`economia-hoy`, `finanzas-personales`, `tips-financieros`) y calculadoras para mejorar CTR orgánico en Google Colombia.
3. **Exp #5 — Actualizar tasas `profitability` en Sanity + copy de calculadoras**:
   - Sincronizar tasas actuales de Nu, Lulo, Pibank, Global66, Bold, Rappi y Banco Popular en Sanity y eliminar porcentajes hardcodeados desactualizados en textos (ej. `8.25%` en Nu).
4. **Exp #6 — Enlaces de solicitud/afiliados en Comparador de Tarjetas y Rentabilidad**:
   - Agregar campo `applyUrl` en `cards` y botones con tracking `affiliate_click` y aviso legal de transparencia.
5. **Exp #7 — Página `/anunciate` (Media Kit B2B)**:
   - Propuesta comercial para fintechs, neobancos y constructoras en Colombia con formulario de contacto comercial.

---

## Registro de Experimentos Ejecutados

### 2026-11-20 — Persistencia de Suscriptores en Sanity + Experimento #2: Vitrina `/recursos` (Plantillas PRO + Diagnóstico 1-a-1)
- **Hipótesis**: Persistir todos los suscriptores y leads en Sanity sin duplicados asegura una base propia reutilizable para futuras campañas, mientras que lanzar una vitrina dedicada en `/recursos` con precios claros en COP (plantillas de $39.000 COP y diagnóstico 1-a-1 de $110.000 COP) y solicitud directa captura intención de compra real desde el tráfico orgánico y las calculadoras.
- **Cambios realizados**:
  - **Esquema `subscriber` y deduplicación en Sanity**: creado esquema `subscriber` en Sanity Studio (`email`, `name`, `source`, `sources`, `interest`, `status`, `createdAt`, `lastSeenAt`) y helper `upsertSubscriber` con `_id` determinístico SHA-256 + consulta previa para actualizar fuentes sin crear duplicados.
  - **Actualización de `/api/subscribe` y `NewsletterForm`**: ahora persiste en Sanity antes de enviar la alerta por Resend e informa cuando un correo ya estaba registrado (`alreadySubscribed`).
  - **Vitrina `/recursos` + `/api/recursos`**: catálogo centralizado en COP (`Plantilla Maestra de Finanzas Personales Colombia` $39.000, `Kit Comprador de Vivienda VIS / No VIS y Leasing` $39.000, `Diagnóstico Financiero 1-a-1` $110.000), formulario de reserva rápida conectado a Sanity (`subscriber`) + notificación Resend, tracking GA4 (`product_cta_click`, `service_inquiry`), datos estructurados JSON-LD (`BreadcrumbList`, `ItemList`, `Product`, `Service`) y enlace en Navbar, Footer y `sitemap.xml`.
  - **Pruebas unitarias**: añadidas pruebas en `__tests__/subscribers.test.ts` para normalización, deduplicación en Sanity y catálogo de `/recursos`.
- **Archivos tocados**:
  - `studio-nextjs-blog/schemaTypes/subscriber.ts`, `studio-nextjs-blog/schemaTypes/index.ts`
  - `lib/subscribers.ts`, `lib/recursos.ts`
  - `app/api/subscribe/route.ts`, `app/api/recursos/route.ts`
  - `app/recursos/page.tsx`, `app/recursos/RecursosClient.tsx`
  - `components/Footer/NewsletterForm.tsx`, `components/Footer/footer.tsx`
  - `components/Navbar/Navbar.tsx`, `components/Navbar/DesktopMenu.tsx`
  - `app/sitemap.ts`, `__tests__/subscribers.test.ts`, `MONETIZATION_LOG.md`
- **Métrica esperada**: 100% de los leads de newsletter y `/recursos` almacenados sin duplicados en Sanity + primeros clics `product_cta_click` y solicitudes `service_inquiry` medidos en GA4 y notificados por correo.
- **Próximos pasos**: Ejecutar Exp #3 (lead magnet descargable real vía `/api/files/[slug]` + CTAs contextuales debajo de los resultados de las calculadoras) y conectar links de pago colombianos (Wompi / Bold / Mercado Pago / Hotmart) en `/recursos` en cuanto Gerardo los comparta.

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
