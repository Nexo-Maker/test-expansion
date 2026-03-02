/**
 * ============================================================================
 * NEXOMAKER EXPANSION - main.js
 * ============================================================================
 * 
 * This is the entry point for a NexoMaker expansion. The app loads this file
 * when the expansion is enabled and calls the init() function.
 * 
 * STRUCTURE:
 * ----------
 * - module.exports.init: Async function called when expansion loads
 * - module.exports.metadata: Object describing the expansion (required)
 * 
 * AVAILABLE APIs:
 * ---------------
 * The global `api` object provides access to NexoMaker functionality:
 * 
 * - api.nexomaker.regRoute(key, jsxPath)
 *   Register a custom page component
 * 
 * - api.nexomaker.postSidebarIcon({ key, button, icon, route, page, status })
 *   Add a button to the sidebar
 * 
 * - api.nexomaker.registerModularCreator(id, jsxPath, metadata)
 *   Register a custom item creator
 * 
 * - api.console.log(...args)
 *   Log messages to the expansion console
 * 
 * ============================================================================
 */

module.exports.init = async function () {
    
    // ========================================================================
    // SIDEBAR ICON SETUP
    // ========================================================================
    // Icons can be:
    // 1. Data URL (SVG embedded as string) - used here
    // 2. Lucide icon name (string like 'FlaskConical')
    // 3. URL to an image file
    
    const testIcon = 'data:image/svg+xml,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
             fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 3h6"/>
            <path d="M10 9V3h4v6l5 11H5l5-11z"/>
            <circle cx="12" cy="15" r="1"/>
        </svg>
    `);

    // ========================================================================
    // REGISTER CUSTOM PAGE
    // ========================================================================
    // regRoute(key, jsxPath): Register a modular JSX page component
    // 
    // Parameters:
    // - key: Unique identifier for the route (used in navigation)
    // - jsxPath: Absolute path to the JSX file (__dirname + relative path)
    //
    // The JSX file will be compiled at runtime using Babel and rendered
    // when the user navigates to this page.
    
    api.nexomaker.regRoute('test-page', __dirname + '/pages/TestPage.jsx');
    
    // ========================================================================
    // ADD SIDEBAR BUTTON
    // ========================================================================
    // postSidebarIcon(config): Add a button to the app sidebar
    //
    // Parameters:
    // - key: Unique identifier (should match route key)
    // - button: Display text shown on hover
    // - icon: SVG data URL, Lucide icon name, or image URL
    // - route: URL path to navigate to (starts with /)
    // - page: Page key registered with regRoute
    // - status: Optional status indicator (null, 'new', 'beta', etc.)
    
    api.nexomaker.postSidebarIcon({
        key: 'test-page',
        button: 'Test Page',
        icon: testIcon,
        route: '/test-page',
        page: 'test-page',
        status: null  // No badge
    });

    // ========================================================================
    // REGISTER CUSTOM CREATOR
    // ========================================================================
    // registerModularCreator(id, jsxPath, metadata): Register an item creator
    //
    // This adds a new creator type to the "Create Item" modal. Users can
    // select this creator to make items using your custom UI.
    //
    // Parameters:
    // - id: Must start with "create_" (e.g., "create_test", "create_weapon")
    // - jsxPath: Path to the creator JSX component
    // - metadata: Configuration object (see below)
    
    api.nexomaker.registerModularCreator('create_test', __dirname + '/creators/TestCreator.jsx', {
        // ====================================================================
        // DISPLAY OPTIONS
        // ====================================================================
        label: 'Create Test',                                    // Shown in creator list
        description: 'Create a test item with custom assets',    // Shown below label
        icon: 'FlaskConical',                                    // Lucide icon name OR data URL
        category: 'expansion',                                   // Groups creators in UI
        
        // ====================================================================
        // COMPATIBILITY
        // ====================================================================
        // Which Minecraft plugins this creator supports
        // Options: 'nexo', 'itemsadder', 'oraxen'
        compatibility: ['nexo', 'itemsadder', 'oraxen'],
        
        // ====================================================================
        // ASSET PRELOADING
        // ====================================================================
        // List of files from your expansion's folder to preload.
        // These are read and converted to base64 BEFORE the creator opens,
        // eliminating loading states and making the creator feel instant.
        //
        // Paths are relative to your expansion's root folder.
        // The preloaded assets are passed to your creator as `preloadedAssets` prop.
        //
        // Format: { name: 'filename', data: 'base64...', mimetype: 'image'|'json' }
        assets: [
            'assets/turtle.json',    // Model file
            'assets/turtle.png'      // Texture file
        ],
        
        // ====================================================================
        // PREVIEW IMAGE
        // ====================================================================
        // Large preview image shown in creator selection modal.
        // Can be a data URL (like below) or path to an image file.
        preview: 'data:image/svg+xml,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                <rect width="64" height="64" rx="8" fill="#4f46e5"/>
                <path d="M24 16h16M28 28V16h8v12l10 22H18l10-22z" 
                      stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="32" cy="40" r="3" fill="white"/>
            </svg>
        `)
    });

    // ========================================================================
    // REGISTER INJECTION COMPONENTS
    // ========================================================================
    // registerInjection(slotId, jsxPath, options): Inject a modular component
    // at a specific location within the app UI.
    //
    // Parameters:
    // - slotId: Injection slot identifier (format: 'page:component:position')
    //   Examples:
    //     - 'item-editor:model-viewer:before' - Before the 3D model viewer
    //     - 'item-editor:model-viewer:after'  - After the 3D model viewer
    //     - 'item-editor:assets:before'       - Before the assets section
    //     - 'item-editor:assets:after'        - After the assets section
    //     - 'item-editor:header:before'       - Before the header module
    //     - 'item-editor:header:after'        - After the header module
    //     - 'item-editor:modules:before'      - Before the modules grid
    //     - 'item-editor:modules:after'       - After the modules grid
    //
    // - jsxPath: Absolute path to the JSX component file
    //
    // - options: Configuration object
    //   - order: Number (default: 100). Lower numbers render first when
    //            multiple injections target the same slot.
    //   - metadata: Object with additional data passed to the component
    //
    // The injected component receives these props:
    //   - injectionContext: Context data from the parent (data, projectId, etc.)
    //   - injectionMetadata: The metadata object you provided
    //   - slotId: The slot where this component was injected
    //   - expansionId: Your expansion's ID
    
    api.nexomaker.registerInjection(
        'item-editor:model-viewer:after',    // Inject between model viewer and assets
        __dirname + '/injections/StatsCard.jsx',
        {
            order: 50,                       // Render before other injections (lower = first)
            metadata: {
                label: 'Quick Stats',
                description: 'Shows item statistics below the 3D viewer'
            }
        }
    );
    
    api.console.log('Registered: Injection at item-editor:model-viewer:after');

    // ========================================================================
    // LOG STARTUP
    // ========================================================================
    // Use api.console.log instead of console.log to show messages in the
    // expansion console (visible in the Expansions page debug panel)
    
    api.console.log('Test expansion loaded successfully!');
    api.console.log('Registered: Custom page at /test-page');
    api.console.log('Registered: Creator "create_test" with 2 preloaded assets');
    
    // ========================================================================
    // EVENT SYSTEM DEMO
    // ========================================================================
    // Register listeners for app events. These demonstrate how expansions
    // can react to user interactions throughout the app.
    //
    // api.nexomaker.listenEvent(eventName, handler) - Listen to events
    // api.nexomaker.emitEvent(eventName, payload) - Emit events
    // api.nexomaker.getRegisteredEvents() - Get all registered events
    
    // Listen to a custom event (other expansions or this expansion can emit it)
    api.nexomaker.listenEvent('test:customEvent', (payload, safeApi) => {
        safeApi.console.log('[Event] Received custom event:', JSON.stringify(payload));
        // Store the event for the modular page to display
        module.exports._lastCustomEvent = { 
            timestamp: new Date().toISOString(), 
            payload 
        };
        return { received: true, message: 'Custom event processed!' };
    });
    
    // Listen to button clicks (fired by UI buttons throughout the app)
    api.nexomaker.listenEvent('button:click', (payload, safeApi) => {
        // Only log our own test buttons
        if (payload.buttonId && payload.buttonId.startsWith('test-')) {
            safeApi.console.log('[Event] Test button clicked:', payload.buttonId);
            module.exports._lastButtonClick = {
                timestamp: new Date().toISOString(),
                buttonId: payload.buttonId,
                label: payload.label
            };
        }
    });
    
    api.console.log('Registered: Event listeners for test:customEvent and button:click');
};

/**
 * ============================================================================
 * EXPANSION METADATA (Required)
 * ============================================================================
 * 
 * This object describes your expansion to NexoMaker. All fields are required.
 */
module.exports.metadata = {
    // Display name shown in the Expansions list
    name: "Test",
    
    // Semantic version (major.minor.patch)
    version: "1.0.0",
    
    // Brief description of what the expansion does
    description: "Example expansion demonstrating custom pages, creators, and file handling.",
    
    // Your name or organization
    author: "Developer",
    
    // Unique identifier (lowercase, no spaces)
    // Used internally to track the expansion
    id: "test",
    
    // NexoMaker API key for premium features (optional)
    // Get your key from: https://nexomaker.com/developers
    apiKey: "nmk_90X60TPjH1DD6y9i4M4v2it7oXmZshOm3s49Rc7DXG4"
};

/**
 * ============================================================================
 * CALLABLE FUNCTIONS
 * ============================================================================
 * 
 * Export functions that can be called from modular pages using:
 *   api.expansion.call('functionName', arg1, arg2, ...)
 * 
 * These functions cannot access the DOM or React state - they run in the
 * main process. Use them for calculations, data transformations, or
 * accessing Node.js APIs.
 */

// Simple greeting function
module.exports.greet = function(name) {
    return `Hello, ${name}! This message came from main.js`;
};

// Calculate something
module.exports.calculate = function(a, b, operation) {
    switch (operation) {
        case 'add': return a + b;
        case 'subtract': return a - b;
        case 'multiply': return a * b;
        case 'divide': return b !== 0 ? a / b : 'Cannot divide by zero';
        default: return 'Unknown operation';
    }
};

// Generate a random item ID
module.exports.generateItemId = function(prefix = 'item') {
    const random = Math.random().toString(36).substring(2, 8);
    return `${prefix}_${random}`;
};

// Return expansion info
module.exports.getExpansionInfo = function() {
    return {
        name: module.exports.metadata.name,
        version: module.exports.metadata.version,
        author: module.exports.metadata.author,
        loadedAt: new Date().toISOString()
    };
};

// ============================================================================
// EVENT SYSTEM FUNCTIONS
// ============================================================================
// These functions allow modular pages to interact with the event system.
// Events enable communication between expansions and react to app actions.

/**
 * Emit a custom event that other expansions (or this one) can listen to
 * @param {string} eventName - Event name (use namespacing like 'myExpansion:eventName')
 * @param {Object} payload - Data to pass to listeners
 * @returns {Promise<Object>} - { success, listenersTriggered, results }
 */
module.exports.emitEvent = function(eventName, payload = {}) {
    return api.nexomaker.emitEvent(eventName, payload);
};

/**
 * Get all registered events and their listeners
 * @returns {Object} - Map of event names to { listenerCount, expansions[] }
 */
module.exports.getRegisteredEvents = function() {
    return api.nexomaker.getRegisteredEvents();
};

/**
 * Get the last received custom event (for demo purposes)
 * @returns {Object|null} - { timestamp, payload } or null
 */
module.exports.getLastCustomEvent = function() {
    return module.exports._lastCustomEvent || null;
};

/**
 * Get the last button click event (for demo purposes)
 * @returns {Object|null} - { timestamp, buttonId, label } or null
 */
module.exports.getLastButtonClick = function() {
    return module.exports._lastButtonClick || null;
};

/**
 * Clear stored event data (for demo reset)
 */
module.exports.clearEventData = function() {
    module.exports._lastCustomEvent = null;
    module.exports._lastButtonClick = null;
    return { cleared: true };
};

// Internal storage for event demo
module.exports._lastCustomEvent = null;
module.exports._lastButtonClick = null;

// ============================================================================
// FILE SYSTEM OPERATIONS
// ============================================================================
// These functions provide file system access from modular pages via
// api.expansion.call(). They use Node.js fs module.

/**
 * List contents of a directory
 * @param {string} dirPath - Absolute path to directory
 * @returns {Promise<Object>} - { success, files: [{name, isDirectory, size, modified}], error }
 */
module.exports.listDirectory = function(dirPath) {
    return new Promise((resolve) => {
        try {
            const fs = require('fs');
            const path = require('path');
            
            const entries = fs.readdirSync(dirPath, { withFileTypes: true });
            const files = entries.map(entry => {
                const fullPath = path.join(dirPath, entry.name);
                try {
                    const stats = fs.statSync(fullPath);
                    return {
                        name: entry.name,
                        isDirectory: entry.isDirectory(),
                        size: stats.size,
                        modified: stats.mtime.toISOString()
                    };
                } catch {
                    return {
                        name: entry.name,
                        isDirectory: entry.isDirectory(),
                        size: 0,
                        modified: null
                    };
                }
            });
            
            resolve({ success: true, files, error: null });
        } catch (err) {
            resolve({ success: false, files: [], error: err.message });
        }
    });
};

/**
 * Get file/directory information
 * @param {string} filePath - Absolute path to file or directory
 * @returns {Promise<Object>} - { success, info: {exists, isFile, isDirectory, size, created, modified}, error }
 */
module.exports.fileInfo = function(filePath) {
    return new Promise((resolve) => {
        try {
            const fs = require('fs');
            
            if (!fs.existsSync(filePath)) {
                resolve({ success: true, info: { exists: false }, error: null });
                return;
            }
            
            const stats = fs.statSync(filePath);
            resolve({
                success: true,
                info: {
                    exists: true,
                    isFile: stats.isFile(),
                    isDirectory: stats.isDirectory(),
                    size: stats.size,
                    created: stats.birthtime.toISOString(),
                    modified: stats.mtime.toISOString()
                },
                error: null
            });
        } catch (err) {
            resolve({ success: false, info: null, error: err.message });
        }
    });
};

/**
 * Create a directory (and parent directories if needed)
 * @param {string} dirPath - Absolute path to create
 * @returns {Promise<Object>} - { success, path, error }
 */
module.exports.createDirectory = function(dirPath) {
    return new Promise((resolve) => {
        try {
            const fs = require('fs');
            fs.mkdirSync(dirPath, { recursive: true });
            resolve({ success: true, path: dirPath, error: null });
        } catch (err) {
            resolve({ success: false, path: null, error: err.message });
        }
    });
};

/**
 * Write content to a file
 * @param {string} filePath - Absolute path to file
 * @param {string} content - Content to write
 * @param {string} encoding - 'utf8' or 'base64'
 * @returns {Promise<Object>} - { success, path, error }
 */
module.exports.writeFile = function(filePath, content, encoding = 'utf8') {
    return new Promise((resolve) => {
        try {
            const fs = require('fs');
            const path = require('path');
            
            // Ensure parent directory exists
            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            
            if (encoding === 'base64') {
                const buffer = Buffer.from(content, 'base64');
                fs.writeFileSync(filePath, buffer);
            } else {
                fs.writeFileSync(filePath, content, encoding);
            }
            
            resolve({ success: true, path: filePath, error: null });
        } catch (err) {
            resolve({ success: false, path: null, error: err.message });
        }
    });
};

/**
 * Read a file as text or base64
 * @param {string} filePath - Absolute path to file
 * @param {string} encoding - 'utf8' or 'base64'
 * @returns {Promise<Object>} - { success, content, error }
 */
module.exports.readFile = function(filePath, encoding = 'utf8') {
    return new Promise((resolve) => {
        try {
            const fs = require('fs');
            
            if (encoding === 'base64') {
                const buffer = fs.readFileSync(filePath);
                resolve({ success: true, content: buffer.toString('base64'), error: null });
            } else {
                const content = fs.readFileSync(filePath, encoding);
                resolve({ success: true, content, error: null });
            }
        } catch (err) {
            resolve({ success: false, content: null, error: err.message });
        }
    });
};

/**
 * Copy a file
 * @param {string} src - Source file path
 * @param {string} dest - Destination file path
 * @returns {Promise<Object>} - { success, src, dest, error }
 */
module.exports.copyFile = function(src, dest) {
    return new Promise((resolve) => {
        try {
            const fs = require('fs');
            const path = require('path');
            
            // Ensure destination directory exists
            const dir = path.dirname(dest);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            
            fs.copyFileSync(src, dest);
            resolve({ success: true, src, dest, error: null });
        } catch (err) {
            resolve({ success: false, src, dest, error: err.message });
        }
    });
};

/**
 * Move or rename a file
 * @param {string} src - Source file path
 * @param {string} dest - Destination file path
 * @returns {Promise<Object>} - { success, src, dest, error }
 */
module.exports.moveFile = function(src, dest) {
    return new Promise((resolve) => {
        try {
            const fs = require('fs');
            const path = require('path');
            
            // Ensure destination directory exists
            const dir = path.dirname(dest);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            
            fs.renameSync(src, dest);
            resolve({ success: true, src, dest, error: null });
        } catch (err) {
            resolve({ success: false, src, dest, error: err.message });
        }
    });
};

/**
 * Delete a file
 * @param {string} filePath - Absolute path to file
 * @returns {Promise<Object>} - { success, path, error }
 */
module.exports.deleteFile = function(filePath) {
    return new Promise((resolve) => {
        try {
            const fs = require('fs');
            
            if (!fs.existsSync(filePath)) {
                resolve({ success: true, path: filePath, error: null, note: 'File did not exist' });
                return;
            }
            
            fs.unlinkSync(filePath);
            resolve({ success: true, path: filePath, error: null });
        } catch (err) {
            resolve({ success: false, path: filePath, error: err.message });
        }
    });
};

/**
 * Delete a directory (recursive)
 * @param {string} dirPath - Absolute path to directory
 * @returns {Promise<Object>} - { success, path, error }
 */
module.exports.deleteDirectory = function(dirPath) {
    return new Promise((resolve) => {
        try {
            const fs = require('fs');
            
            if (!fs.existsSync(dirPath)) {
                resolve({ success: true, path: dirPath, error: null, note: 'Directory did not exist' });
                return;
            }
            
            fs.rmSync(dirPath, { recursive: true, force: true });
            resolve({ success: true, path: dirPath, error: null });
        } catch (err) {
            resolve({ success: false, path: dirPath, error: err.message });
        }
    });
};

/**
 * Download a file from URL to a local path
 * @param {string} url - URL to download from
 * @param {string} destPath - Destination file path
 * @returns {Promise<Object>} - { success, path, size, error }
 */
module.exports.downloadFile = function(url, destPath) {
    return new Promise((resolve) => {
        try {
            const fs = require('fs');
            const path = require('path');
            const urlModule = require('url');
            
            // Ensure destination directory exists
            const dir = path.dirname(destPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            
            const parsedUrl = urlModule.parse(url);
            const isHttps = parsedUrl.protocol === 'https:';
            const http = isHttps ? require('https') : require('http');
            
            const file = fs.createWriteStream(destPath);
            
            const request = http.get(url, (response) => {
                // Handle redirects
                if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    file.close();
                    fs.unlinkSync(destPath);
                    // Recursively follow redirect
                    module.exports.downloadFile(response.headers.location, destPath).then(resolve);
                    return;
                }
                
                if (response.statusCode !== 200) {
                    file.close();
                    fs.unlinkSync(destPath);
                    resolve({ success: false, path: destPath, size: 0, error: `HTTP ${response.statusCode}: ${response.statusMessage}` });
                    return;
                }
                
                response.pipe(file);
                
                file.on('finish', () => {
                    file.close();
                    const stats = fs.statSync(destPath);
                    resolve({ success: true, path: destPath, size: stats.size, error: null });
                });
            });
            
            request.on('error', (err) => {
                file.close();
                if (fs.existsSync(destPath)) {
                    fs.unlinkSync(destPath);
                }
                resolve({ success: false, path: destPath, size: 0, error: err.message });
            });
            
            file.on('error', (err) => {
                file.close();
                if (fs.existsSync(destPath)) {
                    fs.unlinkSync(destPath);
                }
                resolve({ success: false, path: destPath, size: 0, error: err.message });
            });
        } catch (err) {
            resolve({ success: false, path: destPath, size: 0, error: err.message });
        }
    });
};

/**
 * Read and parse a YAML file
 * @param {string} filePath - Absolute path to YAML file
 * @returns {Promise<Object>} - { success, data, error }
 */
module.exports.readYaml = function(filePath) {
    return new Promise((resolve) => {
        try {
            const fs = require('fs');
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Simple YAML parser (handles basic key: value and nested objects)
            const lines = content.split('\n');
            const result = {};
            const stack = [{ obj: result, indent: -1 }];
            
            for (const line of lines) {
                // Skip empty lines and comments
                if (!line.trim() || line.trim().startsWith('#')) continue;
                
                const indent = line.search(/\S/);
                const match = line.trim().match(/^([^:]+):\s*(.*)$/);
                
                if (!match) continue;
                
                const key = match[1].trim();
                let value = match[2].trim();
                
                // Pop stack to correct level
                while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
                    stack.pop();
                }
                
                const current = stack[stack.length - 1].obj;
                
                if (value === '') {
                    // Nested object
                    current[key] = {};
                    stack.push({ obj: current[key], indent });
                } else {
                    // Parse value
                    if (value === 'true') value = true;
                    else if (value === 'false') value = false;
                    else if (value === 'null') value = null;
                    else if (/^-?\d+$/.test(value)) value = parseInt(value, 10);
                    else if (/^-?\d+\.\d+$/.test(value)) value = parseFloat(value);
                    else if ((value.startsWith('"') && value.endsWith('"')) || 
                             (value.startsWith("'") && value.endsWith("'"))) {
                        value = value.slice(1, -1);
                    }
                    current[key] = value;
                }
            }
            
            resolve({ success: true, data: result, error: null });
        } catch (err) {
            resolve({ success: false, data: null, error: err.message });
        }
    });
};

/**
 * Write data as YAML to a file
 * @param {string} filePath - Absolute path to YAML file
 * @param {Object} data - Data to write as YAML
 * @returns {Promise<Object>} - { success, path, error }
 */
module.exports.writeYaml = function(filePath, data) {
    return new Promise((resolve) => {
        try {
            const fs = require('fs');
            const path = require('path');
            
            // Ensure parent directory exists
            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            
            // Simple YAML serializer
            const toYaml = (obj, indent = 0) => {
                let yaml = '';
                const prefix = '  '.repeat(indent);
                
                for (const [key, value] of Object.entries(obj)) {
                    if (value === null || value === undefined) {
                        yaml += `${prefix}${key}: null\n`;
                    } else if (typeof value === 'object' && !Array.isArray(value)) {
                        yaml += `${prefix}${key}:\n${toYaml(value, indent + 1)}`;
                    } else if (Array.isArray(value)) {
                        yaml += `${prefix}${key}:\n`;
                        for (const item of value) {
                            if (typeof item === 'object') {
                                yaml += `${prefix}- \n${toYaml(item, indent + 2).replace(/^  /, '')}`;
                            } else {
                                yaml += `${prefix}- ${item}\n`;
                            }
                        }
                    } else if (typeof value === 'string') {
                        // Quote strings with special characters
                        if (value.includes(':') || value.includes('#') || value.includes('\n')) {
                            yaml += `${prefix}${key}: "${value.replace(/"/g, '\\"')}"\n`;
                        } else {
                            yaml += `${prefix}${key}: ${value}\n`;
                        }
                    } else {
                        yaml += `${prefix}${key}: ${value}\n`;
                    }
                }
                
                return yaml;
            };
            
            const yamlContent = toYaml(data);
            fs.writeFileSync(filePath, yamlContent, 'utf8');
            
            resolve({ success: true, path: filePath, error: null });
        } catch (err) {
            resolve({ success: false, path: null, error: err.message });
        }
    });
};

// ============================================================================
// NETWORK OPERATIONS
// ============================================================================

/**
 * Fetch data from a URL (runs in main process, not frontend)
 * Uses Node.js http/https modules since fetch may not be available
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options (method, headers, body)
 * @returns {Promise<Object>} - { status, statusText, headers, data, error }
 */
module.exports.fetchUrl = function(url, options = {}) {
    return new Promise((resolve) => {
        try {
            // Parse URL using Node's url module
            const urlModule = require('url');
            const parsedUrl = urlModule.parse(url);
            const isHttps = parsedUrl.protocol === 'https:';
            const http = isHttps ? require('https') : require('http');
            
            const requestOptions = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || (isHttps ? 443 : 80),
                path: parsedUrl.path || '/',
                method: options.method || 'GET',
                headers: options.headers || {}
            };
            
            const req = http.request(requestOptions, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    const contentType = res.headers['content-type'] || '';
                    let parsedData = data;
                    
                    // Try to parse JSON
                    if (contentType.includes('application/json')) {
                        try {
                            parsedData = JSON.parse(data);
                        } catch (e) {
                            // Keep as string if JSON parsing fails
                        }
                    }
                    
                    resolve({
                        ok: res.statusCode >= 200 && res.statusCode < 300,
                        status: res.statusCode,
                        statusText: res.statusMessage,
                        contentType,
                        data: parsedData,
                        error: null
                    });
                });
            });
            
            req.on('error', (err) => {
                resolve({
                    ok: false,
                    status: 0,
                    statusText: 'Network Error',
                    contentType: null,
                    data: null,
                    error: err.message
                });
            });
            
            // Send body for POST/PUT requests
            if (options.body) {
                req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
            }
            
            req.end();
        } catch (err) {
            resolve({
                ok: false,
                status: 0,
                statusText: 'Request Error',
                contentType: null,
                data: null,
                error: err.message
            });
        }
    });
};
