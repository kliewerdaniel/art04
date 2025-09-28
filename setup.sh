#!/bin/bash

echo "🚀 Setting up Art01 - Art + Philanthropy Platform"
echo "================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

echo "📦 Installing frontend dependencies..."
cd apps/web
pnpm install

echo "🔧 Setting up database..."
pnpm prisma generate
pnpm prisma db push

echo "🌱 Seeding database with sample data..."
# Create a simple seed script if it doesn't exist
if [ ! -f "./prisma/seed.ts" ]; then
    echo "Creating seed file..."
    cat > prisma/seed.ts << 'EOF'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample artists
  const artist1 = await prisma.artist.upsert({
    where: { handle: 'alex_artist' },
    update: {},
    create: {
      name: 'Alex Rivera',
      handle: 'alex_artist',
      bio: 'Contemporary painter exploring themes of identity and community through vibrant abstract works.',
      contactPref: 'email',
    },
  })

  const artist2 = await prisma.artist.upsert({
    where: { handle: 'maya_sculptor' },
    update: {},
    create: {
      name: 'Maya Chen',
      handle: 'maya_sculptor',
      bio: 'Sculptor working with recycled materials to create thought-provoking pieces about environmental sustainability.',
      contactPref: 'email',
    },
  })

  // Create sample volunteer
  const volunteer = await prisma.user.upsert({
    where: { email: 'volunteer@example.com' },
    update: {},
    create: {
      name: 'Sarah Johnson',
      email: 'volunteer@example.com',
      role: 'volunteer',
    },
  })

  // Create sample artworks
  await prisma.artwork.upsert({
    where: { id: 'sample-artwork-1' },
    update: {},
    create: {
      artistId: artist1.id,
      title: 'Urban Dreams',
      description: 'A vibrant abstract painting capturing the energy of city life',
      price: 150.00,
      imagePath: '/uploads/urban-dreams.jpg',
    },
  })

  await prisma.artwork.upsert({
    where: { id: 'sample-artwork-2' },
    update: {},
    create: {
      artistId: artist2.id,
      title: 'Recycled Harmony',
      description: 'Sculpture made from recycled metal and plastic, promoting environmental awareness',
      price: 300.00,
      imagePath: '/uploads/recycled-harmony.jpg',
    },
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
EOF
fi

echo "🌱 Running database seed..."
pnpm tsx prisma/seed.ts

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start the development server:"
echo "   cd apps/web"
echo "   pnpm dev"
echo ""
echo "🌐 The application will be available at: http://localhost:3000"
echo ""
echo "📚 Useful commands:"
echo "   pnpm prisma studio    # View database in browser"
echo "   pnpm prisma reset    # Reset database"
echo "   pnpm build           # Build for production"
echo ""
echo "Happy coding! 🎨✨"
