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

- [x] **Verificar dominio `monopolombiano.com` en Resend** — Completado (`2026-11-23`): dominio verificado y activo con remitente `info@monopolombiano.com`, correos automáticos de bienvenida y entrega de plantillas en `/api/subscribe` y confirmaciones automáticas en `/api/recursos` y `/api/anunciate`.
- [ ] **Activar links de pago en Colombia** (Wompi, Bold, Mercado Pago o Hotmart) para cobrar automáticamente en COP (PSE / Nequi / tarjeta) por plantillas PRO y asesorías 1-a-1 en `/recursos`.
- [ ] **Compartir links de referido / afiliado** (Global66, Lulo, Nu, Trii, Tyba, Wise, Tributi, ComparaOnline, Amazon) para integrarlos en las calculadoras y el comparador de tarjetas.
- [ ] **(Opcional) Instalar `edge-tts`** si se desea voz neuronal colombiana (`es-CO-SalomeNeural` / `es-CO-GonzaloNeural`) en lugar de la voz local de macOS (`say -v Paulina`) para los audios de los blogs.

---

## Backlog Priorizado de Próximos Experimentos

1. **Exp #9 — Actualización de tasas `profitability` y `applyUrl` en Sanity Studio**:
   - Confirmar y ajustar en Sanity Studio las tasas exactas vigentes de Nu, Lulo, Pibank, Global66, Bold, Rappi y Banco Popular, y poblar `applyUrl` en los 20 documentos `cards` o variables `NEXT_PUBLIC_AFFILIATE_*_URL`.
2. **Exp #10 — Links de pago directos en `/recursos` + Automatización de entrega**:
   - Activar links de pago de Wompi / Bold / Mercado Pago / Hotmart en `lib/recursos.ts` cuando Gerardo los comparta y correo de entrega inmediata al verificar `monopolombiano.com` en Resend.
3. **Exp #11 — CTA contextual de leads y `/recursos` dentro de artículos del blog**:
   - Inyectar un bloque compacto de captación (lead magnet + `/recursos` + calculadora relacionada) en el cuerpo/pie de artículos de `economia-hoy`, `finanzas-personales` y `tips-financieros` sin competir con AdSense.

---

## Registro de Experimentos Ejecutados

### 2026-11-23 — Experimento #7: Media Kit B2B (`/anunciate` + `/api/anunciate`) y Experimento #8: Ranking cruzado "Mejor cuenta hoy" con Retención y 4x1000
- **Hipótesis**: Lanzar una página B2B dedicada (`/anunciate`) con formatos comerciales en COP y formulario de contacto directo abre la línea de patrocinios con fintechs y neobancos en Colombia, mientras que transformar `/calculadoras/calculadora-de-rentabilidad` de un listado estático a un comparador cruzado ordenado automáticamente por ganancia neta (con retención del 7% y 4x1000 opcional) retiene más tiempo al usuario y canaliza clics hacia cada simulador y enlaces de afiliado.
- **Cambios realizados**:
  - **Media Kit B2B (`/anunciate` + `/api/anunciate`)**: creados `lib/anunciate.ts` (4 formatos comerciales en COP: patrocinio en calculadoras `$650.000/mes`, artículo SEO + newsletter `$450.000`, alianza CPA/referidos y paquete lanzamiento 360° `$1.100.000/mes`), `app/anunciate/AnunciateClient.tsx`, `app/anunciate/page.tsx` (metadata SEO, canonical, OpenGraph y JSON-LD `BreadcrumbList` + `WebPage` + `ItemList`) y endpoint `app/api/anunciate/route.ts` que valida, sanitiza URLs con `isSafeExternalUrl`, guarda el contacto sin duplicados en Sanity (`subscriber`) y envía notificación HTML vía Resend. Enlazado en `components/Footer/footer.tsx` y `app/sitemap.ts`.
  - **Comparador cruzado de rentabilidad neta (`lib/profitabilityRanking.ts` + `ProfitabilityRankingComparator`)**: implementado ranking automático de los 7 bancos desde Sanity (`nu`, `lulo`, `pibank`, `bold`, `global66`, `rappi`, `popular`) con selector rápido de capital en COP (`$1M`–`$50M` o monto libre), horizonte (`1`–`24` meses), descuento de retención en la fuente del 7% (`calculatefinalAmountLulo`) y toggle de 4x1000 (`0,4%`) sobre el retiro. Muestra insignia `#1 Mejor hoy`, link a cada calculadora y botón directo de afiliado (`getBankAffiliateConfig`) con evento GA4 `affiliate_click`.
  - **Higiene SEO en `/calculadoras/calculadora-de-rentabilidad`**: corregido `siteName` a `"Monopolombiano"`, añadido Bold en la descripción OpenGraph y agregado `alternates.canonical`.
  - **Pruebas y validación**: añadida suite `__tests__/anunciate-ranking.test.ts` (6 pruebas nuevas). Validado localmente con `npx tsc --noEmit`, `npm run lint`, `npm run test` (4 archivos, 20/20 pruebas pasando) y `npm run build`.
- **Archivos tocados**:
  - `lib/anunciate.ts`, `lib/profitabilityRanking.ts`
  - `app/api/anunciate/route.ts`, `app/anunciate/page.tsx`, `app/anunciate/AnunciateClient.tsx`
  - `components/CommonComponents/Profitability/ProfitabilityRankingComparator.tsx`
  - `app/calculadoras/calculadora-de-rentabilidad/ClientPage.tsx`, `app/calculadoras/calculadora-de-rentabilidad/page.tsx`
  - `components/Footer/footer.tsx`, `app/sitemap.ts`
  - `__tests__/anunciate-ranking.test.ts`, `MONETIZATION_LOG.md`
- **Métrica esperada**: Primeras solicitudes comerciales B2B vía `/api/anunciate` (`b2b_sponsor_inquiry` en GA4) y mayor CTR desde `/calculadoras/calculadora-de-rentabilidad` hacia calculadoras individuales y botones de apertura (`affiliate_click` / `calculator_compare_click`).
- **Próximos pasos**: Ejecutar Exp #9 en cuanto Gerardo confirme tasas `profitability` y comparta `applyUrl` / links de referido y links de pago colombianos para `/recursos`, o avanzar con Exp #11 (CTAs contextuales dentro de artículos del blog).

### 2026-11-22 — Experimento #5: Copy y ejemplos dinámicos desde Sanity en Rentabilidad y Experimento #6: Soporte de afiliados (`applyUrl` + `affiliate_click`) y embudo en Comparador de Tarjetas
- **Hipótesis**: Eliminar porcentajes y ejemplos mensuales hardcodeados desactualizados (ej. `8.25%` en Nu cuando Sanity tiene `9.30%`, `8%` en Lulo/Popular, `10%` en Bold) y calcularlos dinámicamente desde Sanity aumenta la confianza del usuario en las calculadoras, mientras que preparar `applyUrl` en `cards`, botones de referido con tracking `affiliate_click`, aviso de transparencia y `CalculatorResultCta` en el Comparador de Tarjetas convierte el tráfico de comparación financiera en clics monetizables y leads.
- **Cambios realizados**:
  - **Copy y cálculos 100% dinámicos desde Sanity (`lib/profitabilityCopy.ts`)**: creado helper centralizado (`formatEaRangeLabel`, `formatRentabilidadCardInterest`, `formatSelectedRateLabel`, `estimateMonthlyExample`, `buildBankPageCopy`) conectado al cálculo real de `calculateDailyGrowth`. Reemplazado todo copy estático con tasas viejas en `nu`, `lulo`, `pibank`, `global66`, `bold`, `rappi`, `popular` y `calculadora-de-rentabilidad`, además de corregir el texto duplicado y agregar a Bold en la intro de `calculadora-de-rentabilidad` y limpiar `11%` fijo en OpenGraph de `pibank`.
  - **Infraestructura de afiliados/referidos (`lib/affiliates.ts` + `BankAffiliateCta`)**: creada validación segura de URLs externas (`isSafeExternalUrl`, solo `http:`/`https:`), lectura opcional de variables `NEXT_PUBLIC_AFFILIATE_<BANCO>_URL` y aviso legal de transparencia (`AFFILIATE_DISCLOSURE_TEXT`). Integrado `components/CommonComponents/BankAffiliateCta.tsx` en las 7 calculadoras bancarias con eventos GA4 (`affiliate_click`, `calculator_compare_click`, `product_cta_click`).
  - **Esquema `cards` + embudo en Comparador de Tarjetas**: añadidos `applyUrl` y `ctaLabel` en `studio-nextjs-blog/schemaTypes/cards.ts`, `lib/queries.tsx` y `lib/interface.tsx`. En `app/calculadoras/comparador-de-tarjetas/ClientPage.tsx` se añadió fila `"SOLICITAR / SIGUIENTE PASO:"` (botón `affiliate_click` cuando `applyUrl` existe, o enlace a `/recursos#diagnostico-financiero-1a1` como respaldo), aviso de transparencia, `<CalculatorResultCta calculatorId="comparador-tarjetas" />` (nuevo perfil en `lib/leadMagnets.ts`), corrección de HTML inválido (`<p>` envolviendo `<ul>`) y reubicación de `<AdBanner />` debajo de los CTAs propios. También corregido `locale: "es_CO"` y `canonical` en `comparador-de-tarjetas/page.tsx`.
  - **Pruebas unitarias**: ampliada `__tests__/monetization-seo.test.ts` (14/14 pruebas pasando) cubriendo copy dinámico, ejemplos mensuales y validación anti-XSS de URLs de afiliado. Validado con `npx tsc --noEmit`, `npm run lint`, `npm run test` y `npm run build`.
- **Archivos tocados**:
  - `lib/profitabilityCopy.ts`, `lib/affiliates.ts`, `lib/leadMagnets.ts`, `lib/queries.tsx`, `lib/interface.tsx`
  - `studio-nextjs-blog/schemaTypes/cards.ts`
  - `components/CommonComponents/BankAffiliateCta.tsx`
  - `app/calculadoras/nu/ClientPage.tsx`, `app/calculadoras/lulo/ClientPage.tsx`, `app/calculadoras/pibank/ClientPage.tsx`, `app/calculadoras/pibank/page.tsx`, `app/calculadoras/global66/ClientPage.tsx`, `app/calculadoras/bold/ClientPage.tsx`, `app/calculadoras/rappi/ClientPage.tsx`, `app/calculadoras/popular/ClientPage.tsx`, `app/calculadoras/calculadora-de-rentabilidad/ClientPage.tsx`
  - `app/calculadoras/comparador-de-tarjetas/ClientPage.tsx`, `app/calculadoras/comparador-de-tarjetas/page.tsx`
  - `__tests__/monetization-seo.test.ts`, `MONETIZATION_LOG.md`
- **Métrica esperada**: Mayor retención y confianza en calculadoras bancarias, primeros clics medidos en `affiliate_click` / `calculator_compare_click` / `product_cta_click` y captación de leads desde `comparador-de-tarjetas`.
- **Próximos pasos**: Ejecutar Exp #7 (Media Kit `/anunciate`), pedir a Gerardo confirmación de tasas vigentes en Sanity `profitability` (actualmente actualizadas al `2026-07-09`: Nu 9.30%, Lulo 7.50%–9.25%, Bold 9.50%, Pibank 11.00%, Global66 11.00%, Popular 9.00%, Rappi 9.00%) y links de referido/solicitud (`applyUrl` en `cards` o `NEXT_PUBLIC_AFFILIATE_*_URL`).

### 2026-11-21 — Experimento #3: Lead Magnets en `/api/files/[slug]` + CTAs en Calculadoras y Experimento #4: JSON-LD (`Article`, `WebApplication`, `FAQPage`, `BreadcrumbList`)
- **Hipótesis**: Ofrecer un lead magnet descargable inmediato (plantilla CSV UTF-8 de presupuesto 50/30/20 + control 4x1000 y checklist de vivienda VIS/Leasing) justo debajo de los resultados de las calculadoras captura leads con alta intención sin competir con AdSense, mientras que inyectar JSON-LD válido (`Article`, `WebApplication`, `FAQPage`, `BreadcrumbList`) + canonicals en artículos y las 15 calculadoras incrementa el CTR orgánico en Google Colombia.
- **Cambios realizados**:
  - **Lead magnets reales + fallback en `/api/files/[slug]`**: creado `lib/leadMagnets.ts` con plantillas `.csv` UTF-8 BOM compatibles con Excel y Google Sheets (`guia-presupuesto-50-30-20-colombia` y `checklist-vivienda-vis-colombia`) y actualizado `app/api/files/[slug]/route.ts` para servir primero desde Sanity (`archivo`) cuando exista el documento y usar el generador local integrado como respaldo automático.
  - **CTAs contextuales en calculadoras (`CalculatorResultCta`)**: creado componente reutilizable `components/CommonComponents/CalculatorResultCta.tsx` con captura de correo conectada a `/api/subscribe` (Sanity `subscriber` + alerta Resend), descarga automática del archivo, eventos GA4 (`lead_signup`, `lead_magnet_download`, `product_cta_click`) y enlace contextual a `/recursos`. Integrado debajo de los resultados en 4x1000, crédito, ahorro, leasing y vivienda, simulador de inversión, comparador de rentabilidad y en las calculadoras bancarias (`Profitability` y `TableNu`).
  - **Datos estructurados JSON-LD + higiene canonical**: creados `lib/structuredData.ts` y `components/CommonComponents/JsonLd.tsx`. Inyectado `BreadcrumbList` + `Article` + `alternates.canonical` en `economia-hoy/[slug]`, `finanzas-personales/[slug]` y `tips-financieros/[slug]`, y `BreadcrumbList` + `WebApplication` (+ `FAQPage` en `4x1000`) en las 15 calculadoras; corregidas URLs canonical/OpenGraph erróneas en `calculadora-de-credito` y `lulo`.
  - **Pruebas unitarias**: añadida suite `__tests__/monetization-seo.test.ts` (5 pruebas nuevas) y alias `@` en `vitest.config.ts`. Validado localmente con `npm run test` (12/12 pruebas pasando), `npm run lint`, `npx tsc --noEmit` y `npm run build`.
- **Archivos tocados**:
  - `lib/leadMagnets.ts`, `lib/structuredData.ts`, `vitest.config.ts`, `__tests__/monetization-seo.test.ts`
  - `app/api/files/[slug]/route.ts`, `components/CommonComponents/CalculatorResultCta.tsx`, `components/CommonComponents/JsonLd.tsx`
  - `components/4x1000/Calculator.tsx`, `components/CommonComponents/Profitability/Profitability.tsx`, `components/nu/Table.tsx`
  - `app/calculadoras/calculadora-de-credito/ClientPage.tsx`, `app/calculadoras/calculadora-de-ahorro/ClientPage.tsx`, `app/calculadoras/simulador-de-leasing-y-vivienda/ClientPage.tsx`, `app/calculadoras/calculadora-de-rentabilidad/ClientPage.tsx`, `app/calculadoras/simulador-de-inversion/ClientPage.tsx`
  - `app/economia-hoy/[slug]/page.tsx`, `app/finanzas-personales/[slug]/page.tsx`, `app/tips-financieros/[slug]/page.tsx`
  - Las 15 páginas `app/calculadoras/*/page.tsx`, `MONETIZATION_LOG.md`
- **Métrica esperada**: Incremento en la tasa de conversión visitante → suscriptor desde calculadoras (`lead_magnet_download` y `lead_signup` en GA4), tráfico hacia `/recursos` (`product_cta_click`) y mejor elegibilidad de rich snippets en resultados de Google Colombia.
- **Próximos pasos**: Opcionalmente subir versiones `.xlsx` en Sanity `archivo` con los mismos slugs (`guia-presupuesto-50-30-20-colombia`, `checklist-vivienda-vis-colombia`) y continuar con Exp #5 (actualizar tasas `profitability` en Sanity y eliminar porcentajes hardcodeados).

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
