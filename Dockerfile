FROM node:22-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY ["TPCDF Backend/package.json", "TPCDF Backend/package-lock.json", "/app/backend/"]
RUN cd /app/backend && npm ci --omit=dev && npm cache clean --force

COPY ["TPCDF Backend", "/app/backend"]
COPY ["CTF-Frontend", "/app/CTF-Frontend"]

WORKDIR /app/backend
USER node
EXPOSE 8081

HEALTHCHECK --interval=15s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:8081/ready').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
