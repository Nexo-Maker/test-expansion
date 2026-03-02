/**
 * ============================================================================
 * TEST CREATOR - Example Modular Creator for NexoMaker Expansions
 * ============================================================================
 * 
 * This file demonstrates how to create a custom creator component for NexoMaker.
 * Creators are UI components that let users create new items with custom logic.
 * 
 * KEY CONCEPTS:
 * -------------
 * 1. Module Export: Must use `module.exports = (props) => { ... }` format
 *    (NOT ES6 imports/exports - the modular system uses CommonJS)
 * 
 * 2. Props Received:
 *    - useState, useEffect, useMemo, useRef: React hooks
 *    - useWindow: For setting window title
 *    - api: NexoMaker API access
 *    - onNext: CRITICAL - callback to pass item data to parent
 *    - preloadedAssets: Assets defined in main.js registration
 * 
 * 3. onNext Callback:
 *    - Call onNext(data) with valid item data to ENABLE the Next button
 *    - Call onNext(null) to DISABLE the Next button
 *    - The data passed here becomes the item's YAML content + assets
 * 
 * 4. Asset Naming Convention:
 *    - "filename.ext" -> saves to assets/filename.ext
 *    - "folder:filename.ext" -> saves to assets/folder/filename.ext
 *    - Common prefixes: "textures:", "models:", "element:", etc.
 * 
 * ============================================================================
 */

module.exports = ({ useState, useEffect, useWindow, api, onNext, preloadedAssets }) => {
    // ========================================================================
    // WINDOW TITLE
    // ========================================================================
    // Set the creator window title (shown in the header)
    useWindow().setTitle('Create Test Item');
    
    // ========================================================================
    // STATE VARIABLES
    // ========================================================================
    // Basic item properties
    const [testName, setTestName] = useState('');
    const [testDescription, setTestDescription] = useState('A powerful turtle item');
    const [damage, setDamage] = useState(90);
    
    // Custom file upload state
    // This stores the .nxi file that user uploads
    const [nxiFile, setNxiFile] = useState(null);
    const [nxiFileName, setNxiFileName] = useState('');

    // ========================================================================
    // DEBUG LOGGING (optional - helpful during development)
    // ========================================================================
    useEffect(() => {
        console.log('[TestCreator] Component mounted');
        console.log('[TestCreator] preloadedAssets:', preloadedAssets);
    }, []);

    // ========================================================================
    // FILE INPUT HANDLER
    // ========================================================================
    // Handles when user selects a .nxi file
    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        // Validate file extension
        if (!file.name.endsWith('.nxi')) {
            alert('Please select a .nxi file');
            return;
        }
        
        // Read file as base64 for storage
        const reader = new FileReader();
        reader.onload = (event) => {
            // Store the file content as base64
            const base64Content = event.target.result.split(',')[1]; // Remove data:... prefix
            setNxiFile({
                name: file.name,
                data: base64Content,
                mimetype: 'binary' // Custom mimetype for binary files
            });
            setNxiFileName(file.name);
            console.log('[TestCreator] Loaded .nxi file:', file.name);
        };
        reader.readAsDataURL(file);
    };

    // ========================================================================
    // MAIN EFFECT: Build item data and call onNext
    // ========================================================================
    // This effect runs whenever any input changes
    // It builds the complete item data and passes it to the parent
    useEffect(() => {
        // Guard: if onNext doesn't exist, we can't communicate with parent
        if (typeof onNext !== 'function') {
            console.warn('[TestCreator] onNext is not a function');
            return;
        }

        // Validation: require item name
        if (!testName || !testName.trim()) {
            // No valid name = disable Next button
            onNext(null);
            return;
        }

        // ====================================================================
        // BUILD ITEM ID
        // ====================================================================
        // Convert display name to valid ID (lowercase, underscores)
        const itemId = testName.trim().toLowerCase().replace(/\s+/g, '_');
        
        // ====================================================================
        // BUILD ASSETS ARRAY
        // ====================================================================
        // Start with preloaded assets from main.js registration
        const allAssets = [];
        
        // Add preloaded assets with proper folder prefixes
        (preloadedAssets || []).forEach(asset => {
            const ext = asset.name.split('.').pop()?.toLowerCase();
            
            // Determine which folder to save to based on file type
            if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') {
                // Images go to assets/textures/
                allAssets.push({ ...asset, name: `textures:${asset.name}` });
            } else if (ext === 'json' || ext === 'bbmodel') {
                // Models go to assets/models/
                allAssets.push({ ...asset, name: `models:${asset.name}` });
            } else {
                // Other files go directly to assets/
                allAssets.push(asset);
            }
        });
        
        // Add the user-uploaded .nxi file if present
        // This goes to assets/element/ folder
        if (nxiFile) {
            allAssets.push({
                name: `element:${nxiFile.name}`,  // "element:" prefix = saves to assets/element/
                data: nxiFile.data,
                mimetype: nxiFile.mimetype
            });
        }
        
        // ====================================================================
        // BUILD FINAL ITEM DATA
        // ====================================================================
        // This object becomes the item's YAML file content
        const data = {
            // Required fields
            id: itemId,
            display: testName,
            
            // Item type configuration
            type: 'item',
            subtype: 'item',
            material: 'PAPER',
            parent: 'item/handheld',
            
            // Item components (Minecraft components)
            Components: {
                item_name: testDescription,
                attribute_modifiers: {
                    modifiers: [
                        {
                            attribute: "generic.attack_damage",
                            amount: damage,
                            operation: "add_value",
                            slot: "mainhand"
                        }
                    ]
                }
            },
            
            // Assets to save with the item
            // Each asset has: name (with folder prefix), data, mimetype
            assets: allAssets
        };
        
        console.log('[TestCreator] Calling onNext with:', data);
        onNext(data);
        
    }, [testName, testDescription, damage, nxiFile, onNext, preloadedAssets]);

    // ========================================================================
    // STYLES
    // ========================================================================
    const containerStyle = {
        padding: '32px',
        color: 'var(--col-txt-primary, #fff)',
        maxWidth: '500px',
        margin: '0 auto',
    };

    const headerStyle = {
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '8px',
    };

    const subheaderStyle = {
        fontSize: '14px',
        color: 'var(--col-txt-secondary, #888)',
        marginBottom: '32px',
    };

    const sectionStyle = {
        background: 'var(--col-bg-secondary, rgba(255, 255, 255, 0.05))',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px',
    };

    const labelStyle = {
        fontSize: '14px',
        color: 'var(--col-txt-primary, #fff)',
        marginBottom: '8px',
        display: 'block',
    };

    const inputStyle = {
        background: 'var(--col-bg-tertiary, #222)',
        border: '1px solid var(--col-border, #333)',
        borderRadius: '6px',
        padding: '10px 14px',
        color: '#fff',
        fontSize: '14px',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: '16px',
    };

    const textareaStyle = {
        ...inputStyle,
        minHeight: '80px',
        resize: 'vertical',
        fontFamily: 'inherit',
    };
    
    const fileInputStyle = {
        ...inputStyle,
        padding: '8px',
        cursor: 'pointer',
    };

    // ========================================================================
    // RENDER UI
    // ========================================================================
    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>🐢 Create Turtle Item</h1>
            <p style={subheaderStyle}>
                Example creator demonstrating custom file uploads and asset management.
            </p>
            
            {/* Main form section */}
            <div style={sectionStyle}>
                {/* Item ID input */}
                <label style={labelStyle}>Item ID *</label>
                <input
                    type="text"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    placeholder="my_turtle_sword"
                    style={inputStyle}
                    autoFocus
                />
                
                {/* Description input */}
                <label style={labelStyle}>Description</label>
                <textarea
                    value={testDescription}
                    onChange={(e) => setTestDescription(e.target.value)}
                    placeholder="Enter a description..."
                    style={textareaStyle}
                />

                {/* Damage input */}
                <label style={labelStyle}>Attack Damage</label>
                <input
                    type="number"
                    value={damage}
                    onChange={(e) => setDamage(Number(e.target.value))}
                    placeholder="90"
                    style={inputStyle}
                    min="0"
                />
                
                {/* Custom .nxi file upload */}
                <label style={labelStyle}>
                    Element File (.nxi) - Optional
                    <span style={{ color: 'var(--col-txt-tertiary)', fontSize: '12px', marginLeft: '8px' }}>
                        Saves to assets/element/
                    </span>
                </label>
                <input
                    type="file"
                    accept=".nxi"
                    onChange={handleFileSelect}
                    style={fileInputStyle}
                />
                {nxiFileName && (
                    <div style={{ 
                        fontSize: '12px', 
                        color: '#22c55e', 
                        marginTop: '-12px',
                        marginBottom: '16px'
                    }}>
                        ✓ Selected: {nxiFileName}
                    </div>
                )}
            </div>

            {/* Preview section */}
            <div style={{ 
                background: 'var(--col-bg-secondary, rgba(255, 255, 255, 0.05))',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '16px',
                fontSize: '12px',
                color: 'var(--col-txt-secondary, #888)'
            }}>
                <strong>Item Preview:</strong><br/>
                Type: <code style={{ color: 'var(--col-primary, #6366f1)' }}>item</code><br/>
                Parent: <code style={{ color: 'var(--col-primary, #6366f1)' }}>item/handheld</code><br/>
                Damage: <code style={{ color: '#ef4444' }}>{damage}</code><br/>
                Preloaded Assets: <code style={{ color: '#22c55e' }}>{preloadedAssets?.length || 0}</code><br/>
                {nxiFileName && (
                    <>Element File: <code style={{ color: '#22c55e' }}>{nxiFileName}</code> → assets/element/<br/></>
                )}
            </div>

            {/* Instructions */}
            <div style={{ fontSize: '12px', color: 'var(--col-txt-tertiary, #666)', textAlign: 'center' }}>
                Fill in the Item ID then click <strong>Next</strong> to select where to save the item.
            </div>
        </div>
    );
};
