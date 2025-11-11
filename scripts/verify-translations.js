#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const locales = ['en', 'es', 'da'];
const localeDir = path.join(__dirname, '../apps/frontend/src/lib/i18n/locales');

/**
 * Gets all keys from a translations object recursively
 * @param {Object} obj - Translations object
 * @param {string} prefix - Prefix for nested keys
 * @returns {Array<string>} Array of keys
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
 * Verifies translation synchronization between languages
 * @returns {boolean} true if all translations are synchronized
 */
function verifyTranslations() {
  console.log('🔍 Verificando sincronización de traducciones...\n');

  const translations = {};
  const allKeys = new Set();
  let hasErrors = false;

  // Verify that all language files exist
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

  // Verify missing keys in each language
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

  // Verify extra keys (that exist in one language but not in others)
  let extraKeysFound = false;
  for (const locale of locales) {
    const localeKeys = new Set(getAllKeys(translations[locale]));
    const extraKeys = [...localeKeys].filter(key => {
      // Verify if this key exists in all other languages
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

  // Verify empty values or only whitespace
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

  // Final summary
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

// Execute verification if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const success = verifyTranslations();
  process.exit(success ? 0 : 1);
}

export { getAllKeys, verifyTranslations };
