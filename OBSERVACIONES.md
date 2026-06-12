# Observaciones de UX — Nova Salud Web

Documento de mejoras de experiencia de usuario detectadas durante el análisis de los 4 dashboards y las páginas del sistema.

---

## 1. Filtros por URL query params en páginas de listas

**Estado: RESUELTO**

**Implementado:**
- Hook reutilizable `useUrlFilters<T>()` en `src/shared/hooks/useUrlFilters.ts` — reemplaza `useState` en hooks de entidad, haciendo los search params la fuente de verdad de filtros.
- `useAccidents`, `useEmployees`, `useDispensations` refactorizados para usar el hook.
- Backend `FindAccidentsDto` ampliado con `severityClassification`, `formClassification`, `areaName`.
- Backend `FindEmployeesDto` ampliado con `areaName`.
- `AccidentFilter` actualizado con `filters` prop (controlled) y 2 nuevos selects: Severidad y Forma.
- Dashboards actualizados para pasar params en la URL al navegar:
  - Barras "Accidentes por área" → `/accidents?areaName=X`
  - Cards severidad (SST) → `/accidents?severityClassification=X`
  - Cards formas (SST) → `/accidents?formClassification=X`
  - Barras "Áreas con mayor incidencia" (SST) → `/accidents?areaName=X`
  - Barras "Empleados por área" → `/employees?areaName=X`
  - Barras "Dispensaciones por tipo" → `/dispensations?dispenseType=X`

**Pendiente (fuera de scope inicial):** Filtros de triage y diagnóstico en `/clinical-attention` (requiere JOINs a través de la tabla de atenciones; `/clinical-attention` además es una página de entrada, no una lista).

---

## 2. Página dedicada para lista de ciclos EMO y atenciones

**Estado: RESUELTO**

**Implementado:**
- Backend: nuevo endpoint `GET /clinical-history-emo-cycles` paginado con `FindEmoCyclesDto` (filtros por `status`, `emoType`, `employeeFullName`, `expirationDateFrom`/`To`).
- Backend: nuevo `findAll` en `ClinicalHistoryEmoCycleService` con JOIN a `clinicalHistory.employee`.
- Backend: filtros `gte`/`lte` agregados al `FilterOperator` y `applyFilters.util.ts`.
- Backend `FindAttentionsDto`: agregados `triageLevel` y `employeeFullName`. Filter config actualizado.
- Frontend: `EmoCyclesPage` en `/emo-cycles` — tabla paginada con filtros de empleado, estado, tipo y fecha de vencimiento.
- Frontend: `AttentionsPage` en `/attentions` — tabla paginada con filtros de empleado, triage y diagnóstico.
- Frontend: `useEmoCycles` y `useAttentions` hooks usando `useUrlFilters`.
- Rutas y entradas de navegación agregadas en sección ATENCIONES del sidebar.
- Dashboard Médico: panel EMO → `/emo-cycles`, cards de triage → `/attentions?triageLevel=X`, diagnósticos → `/attentions?diagnosisCode=X`.
- Dashboard Admin: panel Salud → `/emo-cycles`, cards de atenciones → `/attentions`.

---

## 3. Cards informativos sin destino lógico en el dashboard SST

**Observación:** Los siguientes cards en el Dashboard SST son puramente informativos y no tienen un destino de navegación claro con la estructura actual:
- **"Período anterior"** — muestra accidentes del mes anterior como comparación
- **"Tasa por 100 emp."** — métrica calculada, no hay lista de registros que la detallen
- **"Variación del período"** — porcentaje de cambio entre períodos

**Posibles mejoras:**
- "Período anterior" podría navegar a `/accidents` con un rango de fechas del mes anterior en la URL
- "Tasa por 100 emp." y "Variación del período" podrían abrir un modal o tooltip con el detalle del cálculo (numerador y denominador)
- Considerar un reporte exportable de métricas ejecutivas

---

## 4. Filas individuales de MetricPanel no son clickeables

**Estado: RESUELTO**

**Implementado:**
- `MetricPanelRow` extendido con `path?: string` opcional.
- Filas con `path` renderizan con `cursor-pointer hover:bg-slate-50` y navegan al hacer clic vía `useNavigate`.
- Todos los dashboards actualizados con paths en las filas relevantes.
- Obs #6 resuelta: "Empleados externos" → `/externos` en Admin y Management.

**Originalmente planteado:** Extender el tipo `MetricPanelRow` para aceptar un `path?: string` opcional. Cuando una fila tiene `path`, renderizar la fila con `cursor-pointer` y navegar al hacer clic.

```typescript
// En MetricPanel.tsx
interface MetricPanelRow {
  label: string
  value: string | number
  icon: ReactNode
  iconBg?: string
  valueClassName?: string
  path?: string  // ← nuevo campo
}
```

**Impacto:** Medio. Mejora significativamente la navegabilidad desde los paneles de alertas.

---

## 5. Tabla "Recientes" con información de contexto insuficiente

### Dashboard Médico — Últimas atenciones
La columna "Diagnóstico" solo muestra el código (ej. `J00`), no el nombre completo. Mostrar también el nombre del diagnóstico mejoraría la lectura.

### Dashboard SST — Últimos accidentes
La tabla no muestra el área del trabajador. Añadir una columna "Área" permitiría identificar rápidamente patrones sin abrir el detalle.

### Dashboard Management — Últimos requerimientos
Mostrar el número de ítems del requerimiento o la prioridad si existe.

---

## 6. Acceso directo a Empleados Externos desde el panel Personal

**Estado: RESUELTO** — Implementado junto con la observación #4. Las filas "Empleados externos" / "Externos" en los dashboards Admin, Management y SST tienen `path: '/externos'`.

---

## 7. El card "Dispensaciones en rango" del Dashboard Admin navegaba a ningún lado

**Estado: RESUELTO** — Se agregó navegación a `/dispensations`.

---

## 8. Los cards de "Descansos emitidos" no tienen sección propia

**Problema:** El card "Descansos emitidos" en el Dashboard Médico navega a `/clinical-attention` (lista de atenciones), pero los descansos médicos no tienen una vista de lista propia. El usuario debe buscar manualmente dentro de las atenciones.

**Solución propuesta:** Considerar agregar un filtro en `/clinical-attention` por "tipo: descanso médico" con soporte de URL param (`?type=MEDICAL_REST`), o crear una sección dedicada de descansos médicos.

---

## 9. Exportación / impresión de datos del dashboard

**Ausencia:** No existe forma de exportar los datos del dashboard a PDF, Excel o CSV.

**Sugerencia:** Agregar un botón "Exportar" en cada panel de gráfico que permita descargar la data en tabla (CSV) o capturar el panel como imagen (PNG). Esto es especialmente útil para reportes ejecutivos y SST.

---

## 10. Tooltips en gráficos de tendencia

**Problema:** Los gráficos de línea (`AdminActivityChart`, `ConsultationsTrendChart`, `AccidentTrendChart`, `RequirementsTrendChart`) usan `lightweight-charts` pero no se verifica si los tooltips están habilitados al hacer hover sobre los puntos de datos.

**Sugerencia:** Asegurarse de que los tooltips muestren fecha y valor exacto al pasar el cursor, y que el click en un punto de datos pueda navegar a la lista filtrada por esa fecha.

---

## 11. Dashboard de empleados (rol EMPLOYEE/EMPLOYEE_EXT) no implementado

**Observación:** En `DashboardPage.tsx`, cuando el rol del usuario es `EMPLOYEE` o `EMPLOYEE_EXT`, se muestra un placeholder. Implementar un dashboard básico para el empleado con:
- Sus propias atenciones recientes
- Estado de sus seguimientos activos
- Sus descansos médicos vigentes

---

## 12. Sin indicador de "última actualización" de datos en el dashboard

**Problema:** El usuario no sabe si los datos del dashboard están actualizados o en caché. Si una consulta tarda, el usuario puede tomar decisiones con datos desactualizados.

**Sugerencia:** Mostrar una pequeña etiqueta "Actualizado hace X min" junto al filtro de fechas, aprovechando el timestamp de la última respuesta de React Query (`dataUpdatedAt`).

---

## 13. Falta de estado "vacío" enriquecido en gráficos de barras

**Problema:** Cuando `accidentsByArea.length === 0`, se muestra solo "Sin accidentes en el rango" en texto plano. Un estado vacío con ícono y mensaje contextual mejoraría la percepción de calidad de la app.

**Sugerencia:** Crear un componente `EmptyState` reutilizable con ícono, título y subtítulo opcionales.

---

## 14. Sin feedback visual en barras horizontales al hacer hover

**Estado parcialmente resuelto:** Se agregó `cursor-pointer` a las filas de barras para indicar que son clickeables. Sin embargo, no hay cambio visual de color o elevación al hacer hover.

**Mejora adicional:** Agregar `group` a la fila y `group-hover:text-indigo-600 transition-colors` al texto del label, o `group-hover:opacity-80` a la barra de color.

---

## 15. Notificaciones en tiempo real (Alertas)

**Observación:** Las alertas (`/alerts`) solo son visibles si el usuario navega explícitamente a esa sección. No hay ningún indicador en el layout principal (ej. un badge en el icono del sidebar o una notificación push) cuando nuevas alertas aparecen.

**Sugerencia:** Consultar periódicamente el conteo de alertas no leídas (React Query con `refetchInterval`) y mostrar un badge rojo en el ítem "Alertas" del sidebar.
