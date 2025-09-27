#!/usr/bin/env node

/**
 * Import Data Script
 * Usage: node scripts/import-data.js --file <path> --type <csv|json> [--model <artist|...>]
 *
 * Imports data from CSV or JSON files into the database.
 */

const fs = require('fs')
const { PrismaClient } = require('@prisma/client')
const csv = require('csv-parser')

const prisma = new PrismaClient()

async function importData(filePath, type, model) {
  const data = []

  if (type === 'csv') {
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => data.push(row))
        .on('end', async () => {
          await processData(data, model)
          resolve({ count: data.length, model })
        })
        .on('error', reject)
    })
  } else if (type === 'json') {
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    await processData(Array.isArray(jsonData) ? jsonData : [jsonData], model)
    return { count: jsonData.length, model }
  }
}

async function processData(data, model) {
  if (model === 'artists') {
    for (const item of data) {
      await prisma.artist.create({
        data: {
          name: item.name,
          handle: item.handle || item.name.toLowerCase().replace(/\s+/g, '_'),
          bio: item.bio || '',
          contactPref: item.contactPref || 'email'
        }
      })
    }
  } else if (model === 'artworks') {
    for (const item of data) {
      await prisma.artwork.create({
        data: {
          artistId: item.artistId,
          title: item.title,
          description: item.description || '',
          price: parseFloat(item.price) || 0,
          imagePath: item.imagePath || null
        }
      })
    }
  } else if (model === 'interactions') {
    for (const item of data) {
      await prisma.interaction.create({
        data: {
          artistId: item.artistId,
          volunteerId: item.volunteerId,
          type: item.type,
          quantity: parseInt(item.quantity) || null,
          money: parseFloat(item.money) || null,
          notes: item.notes || null,
          location: item.location || null
        }
      })
    }
  } else if (model === 'assessments') {
    for (const item of data) {
      await prisma.assessment.create({
        data: {
          artistId: item.artistId,
          type: item.type,
          answers: JSON.stringify(item.answers),
          score: parseFloat(item.score)
        }
      })
    }
  } else if (model === 'allocations') {
    for (const item of data) {
      await prisma.allocation.create({
        data: {
          volunteerId: item.volunteerId,
          artistId: item.artistId,
          timeMinutes: parseFloat(item.timeMinutes) || 0,
          moneyCents: parseInt(item.moneyCents) || 0,
          purpose: item.purpose
        }
      })
    }
  }
  // Add more models as needed
}

// CLI interface
const args = process.argv.slice(2)
if (args.includes('--help') || args.length === 0) {
  console.log(`
Usage: node scripts/import-data.js [options]

Options:
  --file <path>       Input file path (CSV or JSON)
  --type <csv|json>   File type
  --model <model>     Database model to import into (e.g., artists, artworks)
  --help              Show this help

Examples:
  node scripts/import-data.js --file data/artists.csv --type csv --model artists
  node scripts/import-data.js --file data/interactions.json --type json --model interactions
  `)
} else {
  const filePath = args[args.indexOf('--file') + 1]
  const type = args[args.indexOf('--type') + 1]
  const model = args[args.indexOf('--model') + 1]

  if (!filePath || !type || !model) {
    console.error('Missing required arguments. Use --help for usage.')
    process.exit(1)
  }

  importData(filePath, type, model)
    .then(result => {
      console.log('Import completed:', result)
      prisma.$disconnect()
      process.exit(0)
    })
    .catch(error => {
      console.error('Import failed:', error.message)
      prisma.$disconnect()
      process.exit(1)
    })
}
