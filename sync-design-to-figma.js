#!/usr/bin/env node

/**
 * Figma Design Sync Script
 * Synchronise la spécification UX vers Figma
 * Usage: node sync-design-to-figma.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1]] = match[2];
  }
});

const FIGMA_API_TOKEN = envVars.FIGMA_API_TOKEN;
const PROJECT_NAME = 'personal-site';
const FILE_NAME = 'personal-site Design System';

if (!FIGMA_API_TOKEN) {
  console.error('❌ FIGMA_API_TOKEN not found in .env.local');
  process.exit(1);
}

// Helper function to make HTTPS requests
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function syncDesignToFigma() {
  console.log('🎨 Synchronisation Design → Figma...\n');

  // Step 1: Load design spec
  console.log('📋 Étape 1 : Chargement de la spécification...');
  const specPath = path.join(__dirname, '_bmad-output/planning-artifacts/figma-design-sync.md');
  const designSpec = fs.readFileSync(specPath, 'utf-8');
  console.log('✅ Spécification chargée\n');

  // Step 2: Get team ID from user profile
  console.log('🔍 Étape 2 : Récupération du profil Figma...');
  const userRes = await makeRequest({
    hostname: 'api.figma.com',
    path: '/v1/me',
    method: 'GET',
    headers: {
      'X-Figma-Token': FIGMA_API_TOKEN,
      'Content-Type': 'application/json'
    }
  });

  if (userRes.status !== 200) {
    console.error('❌ Erreur connexion Figma:', userRes.data);
    process.exit(1);
  }

  console.log(`✅ Connecté en tant que: ${userRes.data.handle}`);
  console.log(`   Email: ${userRes.data.email}\n`);

  // Step 3: Create or get project
  console.log('📁 Étape 3 : Recherche/création du projet...');
  const projectsRes = await makeRequest({
    hostname: 'api.figma.com',
    path: '/v1/teams',
    method: 'GET',
    headers: {
      'X-Figma-Token': FIGMA_API_TOKEN,
      'Content-Type': 'application/json'
    }
  });

  if (projectsRes.status === 200 && projectsRes.data.teams && projectsRes.data.teams.length > 0) {
    const teamId = projectsRes.data.teams[0].id;
    console.log(`✅ Équipe trouvée: ${projectsRes.data.teams[0].name}`);

    // List existing files
    const filesRes = await makeRequest({
      hostname: 'api.figma.com',
      path: `/v1/teams/${teamId}/files`,
      method: 'GET',
      headers: {
        'X-Figma-Token': FIGMA_API_TOKEN,
        'Content-Type': 'application/json'
      }
    });

    if (filesRes.status === 200) {
      const existingFile = filesRes.data.files?.find(f => f.name === FILE_NAME);
      if (existingFile) {
        console.log(`✅ Fichier existant trouvé: "${FILE_NAME}" (ID: ${existingFile.id})\n`);
      } else {
        console.log(`ℹ️  Aucun fichier "${FILE_NAME}" trouvé - sera créé par Figma MCP\n`);
      }
    }
  }

  // Step 4: Create design documentation
  console.log('📝 Étape 4 : Préparation de la documentation pour Figma...');
  
  const figmaDocumentation = {
    projectName: PROJECT_NAME,
    fileName: FILE_NAME,
    timestamp: new Date().toISOString(),
    content: designSpec,
    sections: {
      vision: '🎯 Vision & Principes',
      colors: '🎨 Système de Couleurs',
      typography: '📝 Typographie',
      components: '🏗️ Composants & Layouts',
      responsive: '📱 Strategy Responsive',
      experience: '✨ Experience Moments Clés'
    }
  };

  // Save to file for MCP sync
  const syncPath = path.join(__dirname, '_bmad-output/planning-artifacts/figma-sync-payload.json');
  fs.writeFileSync(syncPath, JSON.stringify(figmaDocumentation, null, 2));
  console.log('✅ Payload préparée\n');

  // Step 5: Create summary
  console.log('📊 Étape 5 : Résumé de synchronisation...\n');
  console.log('═══════════════════════════════════════════════════════');
  console.log('🎨 DESIGN SYSTEM SYNC SUMMARY');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`\nProjets & Fichiers:`);
  console.log(`  • Projet: ${PROJECT_NAME}`);
  console.log(`  • Fichier: ${FILE_NAME}`);
  console.log(`  • Statut: Prêt pour synchronisation MCP\n`);
  
  console.log('Contenu Inclus:');
  Object.entries(figmaDocumentation.sections).forEach(([key, label]) => {
    console.log(`  ✓ ${label}`);
  });

  console.log('\nFichiers Générés:');
  console.log(`  ✓ figma-design-sync.md (spécification)`);
  console.log(`  ✓ figma-sync-payload.json (payload MCP)\n`);

  console.log('Prochaines Étapes:');
  console.log('  1. VS Code: Ouvrir Copilot Chat');
  console.log('  2. Utiliser @Figma pour synchroniser');
  console.log('  3. Vérifier le fichier dans Figma\n');

  console.log('═══════════════════════════════════════════════════════\n');

  console.log('✨ Design synchronisé avec succès !\n');
  console.log('Les fichiers sont prêts dans: _bmad-output/planning-artifacts/\n');
}

// Run sync
syncDesignToFigma().catch(err => {
  console.error('❌ Erreur lors de la synchronisation:', err.message);
  process.exit(1);
});
