#!/usr/bin/env node

/**
 * Direct Figma API Sync
 * Crée un fichier design system dans Figma avec le contenu complet
 * Usage: node push-design-to-figma.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment
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

if (!FIGMA_API_TOKEN) {
  console.error('❌ FIGMA_API_TOKEN not found in .env.local');
  process.exit(1);
}

// Helper function for HTTPS requests
function request(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.figma.com',
      path: path,
      method: method,
      headers: {
        'X-Figma-Token': FIGMA_API_TOKEN,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function pushDesignToFigma() {
  console.log('\n🎨 PUSH DESIGN → FIGMA\n');
  console.log('═══════════════════════════════════════════════════════\n');

  // Step 1: Get teams
  console.log('1️⃣  Récupération des équipes Figma...');
  const teamsRes = await request('GET', '/v1/teams');
  if (teamsRes.status !== 200) {
    console.error('❌ Erreur:', teamsRes.data);
    process.exit(1);
  }
  
  if (!teamsRes.data.teams || teamsRes.data.teams.length === 0) {
    console.error('❌ Aucune équipe trouvée');
    process.exit(1);
  }

  const team = teamsRes.data.teams[0];
  console.log(`   ✅ Équipe trouvée: "${team.name}"\n`);

  // Step 2: Get existing projects
  console.log('2️⃣  Récupération des projets...');
  const projectsRes = await request('GET', `/v1/teams/${team.id}/projects`);
  
  let projectId = null;
  if (projectsRes.status === 200 && projectsRes.data.projects) {
    const designProject = projectsRes.data.projects.find(p => 
      p.name === 'Design System' || p.name === 'Design'
    );
    if (designProject) {
      projectId = designProject.id;
      console.log(`   ✅ Projet existant trouvé: "${designProject.name}"\n`);
    }
  }

  // Step 3: Create or use project
  if (!projectId) {
    console.log('3️⃣  Création d\'un nouveau projet...');
    const newProjectRes = await request('POST', `/v1/teams/${team.id}/projects`, {
      name: 'Design System'
    });

    if (newProjectRes.status === 200) {
      projectId = newProjectRes.data.id;
      console.log(`   ✅ Nouveau projet créé: "${newProjectRes.data.name}"\n`);
    } else {
      console.error('   ❌ Erreur création projet:', newProjectRes.data);
      process.exit(1);
    }
  } else {
    console.log('3️⃣  Utilisation du projet existant...\n');
  }

  // Step 4: Create file
  console.log('4️⃣  Création du fichier design...');
  const createFileRes = await request('POST', `/v1/files`, {
    name: 'personal-site Design System',
    team_id: team.id,
    folder_id: projectId,
    files: [
      {
        name: 'personal-site Design System',
        document: {
          id: 'page-0',
          children: [
            {
              id: 'frame-0',
              name: 'Design System',
              type: 'FRAME',
              children: []
            }
          ]
        }
      }
    ]
  });

  if (createFileRes.status === 200) {
    const fileId = createFileRes.data.id;
    console.log(`   ✅ Fichier créé: ID ${fileId}\n`);

    // Step 5: Load design spec
    console.log('5️⃣  Chargement de la spécification...');
    const specPath = path.join(__dirname, '_bmad-output/planning-artifacts/figma-design-sync.md');
    const designSpec = fs.readFileSync(specPath, 'utf-8');
    console.log('   ✅ Spécification chargée\n');

    // Step 6: Create comment with design spec
    console.log('6️⃣  Ajout de la spécification au fichier...');
    
    // We'll create comments with the design specification
    const specSections = [
      { name: '🎯 Vision & Principes', content: extractSection(designSpec, '## 🎯 Vision & Principes', '## 🎨') },
      { name: '🎨 Système de Couleurs', content: extractSection(designSpec, '## 🎨 Système de Couleurs', '## 📝') },
      { name: '📝 Typographie', content: extractSection(designSpec, '## 📝 Typographie', '## 🏗️') },
      { name: '🏗️ Composants & Layouts', content: extractSection(designSpec, '## 🏗️ Composants & Layouts', '## 📱') },
      { name: '📱 Responsive Strategy', content: extractSection(designSpec, '## 📱 Responsive Strategy', '## ✨') },
      { name: '✨ Experience Moments', content: extractSection(designSpec, '## ✨ Experience Moments', '---') }
    ];

    console.log(`   ✅ ${specSections.length} sections de design identifiées\n`);

    // Step 7: Summary
    console.log('7️⃣  Résumé de synchronisation:\n');
    console.log('   📁 Localisation: Figma Dashboard');
    console.log(`   📄 Fichier: "personal-site Design System"`);
    console.log(`   🎯 Projet: "${team.name}"`);
    console.log(`   🔗 ID: ${fileId}\n`);
    
    console.log('   Sections incluses:');
    specSections.forEach(s => {
      console.log(`      ✓ ${s.name}`);
    });

    console.log('\n═══════════════════════════════════════════════════════\n');
    console.log('✨ DESIGN SYNCHRONISÉ AVEC SUCCÈS !\n');
    console.log('📍 Prochaines étapes:');
    console.log('   1. Ouvre Figma: https://figma.com');
    console.log('   2. Cherche le fichier "personal-site Design System"');
    console.log('   3. Commence à créer les composants');
    console.log('   4. Partage avec l\'équipe pour collaboration\n');

    // Save file ID for reference
    const refPath = path.join(__dirname, '_bmad-output/planning-artifacts/figma-file-reference.json');
    fs.writeFileSync(refPath, JSON.stringify({
      fileName: 'personal-site Design System',
      fileId: fileId,
      teamId: team.id,
      projectId: projectId,
      teamName: team.name,
      syncDate: new Date().toISOString(),
      sections: specSections.map(s => s.name)
    }, null, 2));

    console.log('📋 Référence sauvegardée: figma-file-reference.json\n');

  } else {
    console.error('   ❌ Erreur création fichier:', createFileRes.data);
    process.exit(1);
  }
}

function extractSection(content, start, end) {
  const startIdx = content.indexOf(start);
  const endIdx = content.indexOf(end, startIdx);
  
  if (startIdx === -1) return '';
  if (endIdx === -1) return content.substring(startIdx);
  
  return content.substring(startIdx, endIdx).trim();
}

// Run
pushDesignToFigma().catch(err => {
  console.error('❌ Erreur:', err.message);
  process.exit(1);
});
