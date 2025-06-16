echo "⏳ Aguardando o banco ficar pronto..."
until nc -z db 5432; do
  sleep 1
done

echo "📦 Rodando as migrations..."
npx prisma migrate deploy

echo "🚀 Iniciando aplicação NestJS..."
npm run start:prod
