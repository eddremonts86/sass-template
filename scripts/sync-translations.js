#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { getAllKeys } = require('./verify-translations');

const locales = ['en', 'es', 'da'];
const localeDir = path.join(__dirname, '../src/lib/i18n/locales');

/**
 * Crea una estructura de objeto anidado a partir de una clave con puntos
 * @param {string} key - Clave con puntos (ej: "pages.about.title")
 * @param {string} value - Valor a asignar
 * @returns {Object} Objeto anidado
 */
function createNestedObject(key, value) {
  const keys = key.split('.');
  const result = {};
  let current = result;

  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = {};
    current = current[keys[i]];
  }

  current[keys[keys.length - 1]] = value;
  return result;
}

/**
 * Fusiona dos objetos de forma profunda
 * @param {Object} target - Objeto destino
 * @param {Object} source - Objeto fuente
 * @returns {Object} Objeto fusionado
 */
function deepMerge(target, source) {
  const result = { ...target };

  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

/**
 * Obtiene el valor de una clave anidada en un objeto
 * @param {Object} obj - Objeto donde buscar
 * @param {string} key - Clave con puntos
 * @returns {string|undefined} Valor encontrado o undefined
 */
function getNestedValue(obj, key) {
  const keys = key.split('.');
  let current = obj;

  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return undefined;
    }
  }

  return current;
}

/**
 * Sincroniza las traducciones agregando claves faltantes
 * @param {boolean} dryRun - Si es true, solo muestra lo que haría sin modificar archivos
 * @returns {boolean} true si se realizaron cambios o no hay problemas
 */
function syncTranslations(dryRun = false) {
  console.log('🔄 Iniciando sincronización de traducciones...\n');

  if (dryRun) {
    console.log('🔍 Modo de vista previa (no se modificarán archivos)\n');
  }

  const translations = {};
  const allKeys = new Set();
  let hasErrors = false;

  // Cargar todas las traducciones
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
      console.log(`✅ Cargado ${locale}.json - ${keys.length} claves`);
    } catch (error) {
      console.error(`❌ Error al leer ${locale}.json:`, error.message);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.log('\n❌ No se puede continuar debido a errores en los archivos');
    return false;
  }

  console.log(`\n📊 Total de claves únicas: ${allKeys.size}`);

  // Encontrar claves faltantes y preparar actualizaciones
  const updates = {};
  let totalMissingKeys = 0;

  for (const locale of locales) {
    const localeKeys = new Set(getAllKeys(translations[locale]));
    const missingKeys = [...allKeys].filter(key => !localeKeys.has(key));

    if (missingKeys.length > 0) {
      console.log(
        `\n🔧 Claves faltantes en ${locale}.json (${missingKeys.length}):`
      );
      updates[locale] = { ...translations[locale] };

      for (const missingKey of missingKeys) {
        console.log(`   + ${missingKey}`);

        // Intentar encontrar el valor en otros idiomas como referencia
        let referenceValue = `[TODO: ${missingKey}]`;
        for (const otherLocale of locales) {
          if (otherLocale !== locale) {
            const value = getNestedValue(translations[otherLocale], missingKey);
            if (value && typeof value === 'string') {
              referenceValue = `[${otherLocale.toUpperCase()}: ${value}]`;
              break;
            }
          }
        }

        // Crear objeto anidado y fusionarlo
        const nestedObj = createNestedObject(missingKey, referenceValue);
        updates[locale] = deepMerge(updates[locale], nestedObj);
      }

      totalMissingKeys += missingKeys.length;
    } else {
      console.log(`✅ ${locale}.json - Sin claves faltantes`);
    }
  }

  if (totalMissingKeys === 0) {
    console.log('\n✅ ¡Todas las traducciones ya están sincronizadas!');
    return true;
  }

  console.log(`\n📝 Resumen de cambios:`);
  console.log(`   - Total de claves a agregar: ${totalMissingKeys}`);
  console.log(`   - Archivos a modificar: ${Object.keys(updates).length}`);

  if (dryRun) {
    console.log(
      '\n🔍 Vista previa completada. Ejecuta sin --dry-run para aplicar cambios.'
    );
    return true;
  }

  // Aplicar cambios
  console.log('\n💾 Aplicando cambios...');

  for (const locale of Object.keys(updates)) {
    const filePath = path.join(localeDir, `${locale}.json`);
    const backupPath = `${filePath}.backup.${Date.now()}`;

    try {
      // Crear backup
      fs.copyFileSync(filePath, backupPath);
      console.log(`📋 Backup creado: ${path.basename(backupPath)}`);

      // Escribir archivo actualizado
      const updatedContent = JSON.stringify(updates[locale], null, 2) + '\n';
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Actualizado: ${locale}.json`);
    } catch (error) {
      console.error(`❌ Error al actualizar ${locale}.json:`, error.message);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.log('\n⚠️  Se encontraron errores durante la sincronización');
    console.log(
      '💡 Los archivos de backup están disponibles para restaurar si es necesario'
    );
    return false;
  }

  console.log('\n✅ Sincronización completada exitosamente!');
  console.log(
    '💡 Revisa los archivos y actualiza las traducciones marcadas con [TODO:] o [LANG:]'
  );
  console.log(
    '🧹 Puedes eliminar los archivos .backup una vez que confirmes que todo está correcto'
  );

  return true;
}

/**
 * Limpia archivos de backup antiguos
 */
function cleanBackups() {
  console.log('🧹 Limpiando archivos de backup...');

  const files = fs.readdirSync(localeDir);
  const backupFiles = files.filter(file => file.includes('.backup.'));

  if (backupFiles.length === 0) {
    console.log('✅ No hay archivos de backup para limpiar');
    return;
  }

  for (const backupFile of backupFiles) {
    const filePath = path.join(localeDir, backupFile);
    try {
      fs.unlinkSync(filePath);
      console.log(`🗑️  Eliminado: ${backupFile}`);
    } catch (error) {
      console.error(`❌ Error al eliminar ${backupFile}:`, error.message);
    }
  }

  console.log(
    `✅ Limpieza completada - ${backupFiles.length} archivos eliminados`
  );
}

// Manejo de argumentos de línea de comandos
if (require.main === module) {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || args.includes('-d');
  const clean = args.includes('--clean') || args.includes('-c');
  const help = args.includes('--help') || args.includes('-h');

  if (help) {
    console.log(`
🔄 Script de Sincronización de Traducciones

Uso:
  node sync-translations.js [opciones]

Opciones:
  --dry-run, -d    Vista previa de cambios sin modificar archivos
  --clean, -c      Limpiar archivos de backup antiguos
  --help, -h       Mostrar esta ayuda

Ejemplos:
  node sync-translations.js           # Sincronizar traducciones
  node sync-translations.js -d        # Vista previa de cambios
  node sync-translations.js --clean   # Limpiar backups
`);
    process.exit(0);
  }

  if (clean) {
    cleanBackups();
    process.exit(0);
  }

  const success = syncTranslations(dryRun);
  process.exit(success ? 0 : 1);
}

module.exports = { syncTranslations, cleanBackups };
