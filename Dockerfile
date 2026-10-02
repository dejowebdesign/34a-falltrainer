# =============================================================================
# 34a Falltrainer – Produktions-Image
#
# Multi-Stage-Build:
#   Stage 1 baut die Angular-App (Node, nur zum Bauen nötig).
#   Stage 2 enthält nur nginx und die fertigen dist-Dateien.
#
# Der Runtime-Container enthält bewusst kein Node, keine npm-Abhängigkeiten
# und keine Quelldateien. Der Build findet ausschließlich hier bzw. in der
# CI statt – niemals auf dem Zielsystem (Umbrel/Portainer).
# =============================================================================

# --- Stage 1: Angular Production Build --------------------------------------
FROM node:22-alpine AS build

WORKDIR /app

# Abhängigkeiten zuerst kopieren, damit der Layer gecacht wird.
COPY package.json package-lock.json ./
RUN npm ci

# Restlichen Quellcode kopieren und bauen.
COPY . .
RUN npm run build

# --- Stage 2: Runtime mit nginx ---------------------------------------------
FROM nginx:1.27-alpine AS runtime

# Schlanke, SPA-taugliche nginx-Konfiguration.
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Nur die gebauten Browser-Dateien aus der Build-Stage übernehmen.
COPY --from=build /app/dist/34a-falltrainer/browser /usr/share/nginx/html

# Der offizielle nginx-Entrypoint erzeugt die Konfiguration und startet nginx.
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1
