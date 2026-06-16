# Observaciones de UX — Nova Salud Web

Documento de mejoras de experiencia de usuario detectadas durante el análisis de los 4 dashboards y las páginas del sistema.

---

## 1. Filtros por URL query params en páginas de listas

**Estado: POR REVISAR**

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

## 2. Cards informativos sin destino lógico en el dashboard SST

**Observación:** Los siguientes cards en el Dashboard SST son puramente informativos y no tienen un destino de navegación claro con la estructura actual:
- **"Período anterior"** — muestra accidentes del mes anterior como comparación
- **"Tasa por 100 emp."** — métrica calculada, no hay lista de registros que la detallen
- **"Variación del período"** — porcentaje de cambio entre períodos

**Posibles mejoras:**
- "Período anterior" podría navegar a `/accidents` con un rango de fechas del mes anterior en la URL
- "Tasa por 100 emp." y "Variación del período" podrían abrir un modal o tooltip con el detalle del cálculo (numerador y denominador)
- Considerar un reporte exportable de métricas ejecutivas

---

## 3 Tooltips en gráficos de tendencia

**EN PROCESO: Verificar que los links funcionen**

**Problema:** Los gráficos de línea (`AdminActivityChart`, `ConsultationsTrendChart`, `AccidentTrendChart`, `RequirementsTrendChart`) usan `lightweight-charts` pero no se verifica si los tooltips están habilitados al hacer hover sobre los puntos de datos.

**Sugerencia:** Asegurarse de que los tooltips muestren fecha y valor exacto al pasar el cursor, y que el click en un punto de datos pueda navegar a la lista filtrada por esa fecha.

---

## 4. Crear un "resolver todos" para las alertas.

**Sugerencia:** Implementar un botón de resolver todas las alertas con un modal de confirmación con la observación de que es una acción peligrosa. Agregar además un resolvedBy para saber quien fue la persona que actualizó ese estado.
