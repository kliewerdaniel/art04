#!/usr/bin/env node

/**
 * Export Artist Static Sites
 * Usage: node scripts/export-artist.js --artistId <id> --output <path> [--format zip|site]
 *
 * Exports an artist profile as a static site or ZIP for portfolio sharing.
 */

const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')
const archiver = require('archiver')

const prisma = new PrismaClient()

async function exportArtist(artistId, outputPath, format = 'site') {
  const artist = await prisma.artist.findUnique({
    where: { id: artistId },
    include: { artworks: true, interactions: true }
  })

  if (!artist) {
    throw new Error('Artist not found')
  }

  // Generate simple HTML
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${artist.name}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    .artwork { border: 1px solid #ccc; padding: 10px; margin: 10px; }
  </style>
</head>
<body>
  <h1>${artist.name}</h1>
  <p>${artist.bio}</p>
  <h2>Artwork</h2>
  ${artist.artworks.map(art => `
    <div class="artwork">
      <h3>${art.title}</h3>
      <p>${art.description}</p>
      <p>Price: $${art.price}</p>
    </div>
  `).join('')}
</body>
</html>
`

  if (format === 'zip') {
    // Create ZIP
    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.pipe(fs.createWriteStream(`${outputPath}.zip`))
    archive.append(html, { name: 'index.html' })
    archive.finalize()
  } else {
    // Write static file
    fs.writeFileSync(path.join(outputPath, 'index.html'), html)
  }

  return { artistId, outputPath, format }
}

// CLI interface
const args = process.argv.slice(2)
if (args.includes('--help') || args.length === 0) {
  console.log(`
Usage: node scripts/export-artist.js [options]

Options:
  --artistId <id>     Artist ID to export
  --output <path>     Output directory or file path
  --format <site|zip> Export format (default: site)
  --help              Show this help

Examples:
  node scripts/export-artist.js --artistId abc123 --output ./static-sites/artist123
  node scripts/export-artist.js --artistId abc123 --output ./files/artist --format zip
  `)
} else {
  const artistId = args[args.indexOf('--artistId') + 1]
  const outputPath = args[args.indexOf('--output') + 1]
  const format = args[args.indexOf('--format') + 1] || 'site'

  if (!artistId || !outputPath) {
    console.error('Missing required arguments. Use --help for usage.')
    process.exit(1)
  }

  exportArtist(artistId, outputPath, format)
    .then(result => {
      console.log('Export completed:', result)
      prisma.$disconnect()
      process.exit(0)
    })
    .catch(error => {
      console.error('Export failed:', error.message)
      prisma.$disconnect()
      process.exit(1)
    })
}
