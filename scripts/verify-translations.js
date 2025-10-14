#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'da'];
const localeDir = path.join(__dirname, '../src/lib/i18n/locales');

/**
 * Obtiene todas las claves de un objeto de traducciones de forma recursiva
 * @param {Object} obj - Objeto de traducciones
 * @param {string} prefix - Prefijo para las claves anidadas
 * @returns {Array<string>} Array de claves
 */
function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

/**
 * Verifica la sincronización de traducciones entre idiomas
 * @returns {boolean} true si todas las traducciones están sincronizadas
 */
function verifyTranslations() {
  console.log('🔍 Verificando sincronización de traducciones...\n');

  const translations = {};
  const allKeys = new Set();
  let hasErrors = false;

  // Verificar que existan todos los archivos de idioma
  for (const locale of locales) {
    const filePath = path.join(localeDir, `${locale}.json`);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Error: Archivo de traducción faltante: ${filePath}`);
      hasErrors = true;
      continue;
    }

    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      translations[locale] = JSON.parse(fileContent);
      const keys = getAllKeys(translations[locale]);
      keys.forEach(key => allKeys.add(key));
      console.log(
        `✅ Cargado ${locale}.json - ${keys.length} claves encontradas`
      );
    } catch (error) {
      console.error(`❌ Error al leer ${locale}.json:`, error.message);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.log('\n❌ Errores encontrados al cargar archivos de traducción');
    return false;
  }

  console.log(`\n📊 Total de claves únicas encontradas: ${allKeys.size}`);

  // Verificar claves faltantes en cada idioma
  let missingKeysFound = false;
  for (const locale of locales) {
    const localeKeys = new Set(getAllKeys(translations[locale]));
    const missingKeys = [...allKeys].filter(key => !localeKeys.has(key));

    if (missingKeys.length > 0) {
      console.error(
        `\n❌ Claves faltantes en ${locale}.json (${missingKeys.length}):`
      );
      missingKeys.forEach(key => {
        console.error(`   - ${key}`);
      });
      missingKeysFound = true;
    } else {
      console.log(`✅ ${locale}.json - Todas las claves presentes`);
    }
  }

  // Verificar claves extra (que existen en un idioma pero no en otros)
  let extraKeysFound = false;
  for (const locale of locales) {
    const localeKeys = new Set(getAllKeys(translations[locale]));
    const extraKeys = [...localeKeys].filter(key => {
      // Verificar si esta clave existe en todos los otros idiomas
      return !locales.every(otherLocale => {
        if (otherLocale === locale) return true;
        const otherKeys = new Set(getAllKeys(translations[otherLocale]));
        return otherKeys.has(key);
      });
    });

    if (extraKeys.length > 0) {
      console.warn(
        `\n⚠️  Claves extra en ${locale}.json (no están en todos los idiomas):`
      );
      extraKeys.forEach(key => {
        console.warn(`   - ${key}`);
      });
      extraKeysFound = true;
    }
  }

  // Verificar valores vacíos o solo espacios en blanco
  let emptyValuesFound = false;
  for (const locale of locales) {
    const emptyKeys = [];
    const checkEmptyValues = (obj, prefix = '') => {
      for (const key in obj) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          checkEmptyValues(obj[key], fullKey);
        } else if (typeof obj[key] === 'string' && obj[key].trim() === '') {
          emptyKeys.push(fullKey);
        }
      }
    };

    checkEmptyValues(translations[locale]);

    if (emptyKeys.length > 0) {
      console.warn(`\n⚠️  Valores vacíos en ${locale}.json:`);
      emptyKeys.forEach(key => {
        console.warn(`   - ${key}`);
      });
      emptyValuesFound = true;
    }
  }

  // Resumen final
  console.log('\n' + '='.repeat(50));
  if (!missingKeysFound && !extraKeysFound && !emptyValuesFound) {
    console.log(
      '✅ ¡Todas las traducciones están sincronizadas correctamente!'
    );
    console.log(`📈 Estadísticas:`);
    console.log(`   - Idiomas: ${locales.length}`);
    console.log(`   - Claves totales: ${allKeys.size}`);
    console.log(`   - Estado: Sincronizado`);
    return true;
  } else {
    console.log('❌ Se encontraron problemas de sincronización:');
    if (missingKeysFound) console.log('   - Claves faltantes detectadas');
    if (extraKeysFound) console.log('   - Claves extra detectadas');
    if (emptyValuesFound) console.log('   - Valores vacíos detectados');
    console.log(
      '\n💡 Ejecuta `npm run sync:translations` para ayuda con la sincronización'
    );
    return false;
  }
}

// Ejecutar verificación si se llama directamente
if (require.main === module) {
  const success = verifyTranslations();
  process.exit(success ? 0 : 1);
}

module.exports = { verifyTranslations, getAllKeys };
