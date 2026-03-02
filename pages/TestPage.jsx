/**
 * ============================================================================
 * TEST PAGE - Example Modular Page for NexoMaker Expansions
 * ============================================================================
 * 
 * This file demonstrates how to create a custom page for the NexoMaker sidebar.
 * Modular pages are JSX components compiled at runtime via Babel.
 * 
 * MODULE FORMAT:
 * --------------
 * Must use CommonJS: `module.exports = (props) => { ... }`
 * ES6 import/export is NOT supported in modular files.
 * 
 * AVAILABLE PROPS:
 * ----------------
 * The component receives these props from the modular system:
 * 
 * - useState, useEffect, useMemo, useRef, useCallback: React hooks
 * - useWindow(): Returns { setTitle } for setting page title
 * - useGlobalState(key, defaultValue): Persistent state across sessions
 * - useComponents(): Returns all UI components (see below)
 * - api: NexoMaker API access (same as in main.js)
 * - __dirname: Absolute path to the expansion's directory (for file operations)
 * 
 * AVAILABLE COMPONENTS (via useComponents()):
 * -------------------------------------------
 * Layout / Containers:
 * - ScrollContainer: Full-page scrollable container with proper padding
 * - Section: Themed container with background, border-radius, padding
 * - SectionTitle: Styled h2 for section headers
 * - PageTitle: Styled h1 for page headers
 * - Row: Horizontal layout with space-between, optional bottom border
 * - Label: Styled text label with secondary color
 * - FlexRow: Flexible row with gap, justify, align, wrap props
 * - Grid: CSS grid container with columns, gap props
 * 
 * Buttons:
 * - PrimaryButton: Main action button (onClick, children, disabled, style)
 * - SecondaryButton: Secondary action button (onClick, children, disabled, style)
 * - IconButton: Icon-only button (onClick, icon, disabled, title)
 * - SidebarButton: Sidebar navigation button (onClick, icon, label, active)
 * - SidebarAddButton: Special add button for sidebar
 * 
 * Inputs:
 * - TextInput: Text input field (value, onChange, placeholder, label, disabled)
 * - Checkbox: Checkbox input (checked, onChange, label, disabled)
 * - Select: Dropdown select (value, onChange, options, label, disabled)
 * - NumberInput: Number input (value, onChange, min, max, step, label)
 * - Slider: Range slider (value, onChange, min, max, step, label)
 * - TextArea: Multi-line text (value, onChange, placeholder, rows)
 * 
 * Cards:
 * - Card: Basic card container (children, style)
 * - InfoCard: Info card with title (title, children, icon)
 * 
 * Icons:
 * - Icons: All Lucide React icons (Icons.Home, Icons.Settings, etc.)
 *   Usage: const { Home, Settings, Plus } = Icons;
 *   Then: <Home size={16} /> or <Settings size={20} color="red" />
 *   See: https://lucide.dev/icons for all available icons
 * 
 * Other:
 * - Model: ThreeModelViewer for 3D/2D model display
 * - Button, Link, Array, Modular: Legacy API components
 * 
 * MODEL COMPONENT:
 * ----------------
 * The Model component (ThreeModelViewer) displays 3D models with these props:
 * - modelObject: JSON model data (parsed object, not string)
 * - textureBase64: Base64 encoded texture (with or without data: prefix)
 * - type: "2D" (flat preview) or "3D" (interactive rotation)
 * - canvasSize: { x: width, y: height }
 * - showGrid: boolean (show/hide grid)
 * 
 * ============================================================================
 */

module.exports = ({ useState, useEffect, useGlobalState, useWindow, useComponents, api, __dirname }) => {
    
    // ========================================================================
    // WINDOW TITLE
    // ========================================================================
    useWindow().setTitle('Test Page');
    
    // ========================================================================
    // GET COMPONENTS
    // ========================================================================
    // useComponents() returns all UI components available to modular pages
    const { 
        Model,
        // Buttons
        PrimaryButton, SecondaryButton, IconButton,
        // Inputs  
        TextInput, Checkbox, Select, NumberInput, Slider, TextArea,
        // Cards
        Card, InfoCard,
        // Layout / Containers
        Section, SectionTitle, PageTitle, Row, Label, ScrollContainer, FlexRow, Grid,
        // Icons
        Icons
    } = useComponents();
    
    // Destructure commonly used icons
    const { FlaskConical, Pickaxe, Palette, BarChart3, Plus, RotateCcw, Box, Layers } = Icons;
    
    // ========================================================================
    // STATE
    // ========================================================================
    const [testValue, setTestValue] = useGlobalState('testValue', 'Hello World');
    const [counter, setCounter] = useGlobalState('counter', 0);
    const [activeTab, setActiveTab] = useGlobalState('activeTab', 'models');
    
    // Component demo state
    const [textInputValue, setTextInputValue] = useState('');
    const [checkboxValue, setCheckboxValue] = useState(false);
    const [selectValue, setSelectValue] = useState('option1');
    const [numberValue, setNumberValue] = useState(50);
    const [sliderValue, setSliderValue] = useState(25);
    const [textAreaValue, setTextAreaValue] = useState('');
    
    // Expansion functions demo state
    const [greetName, setGreetName] = useState('World');
    const [greetResult, setGreetResult] = useState('');
    const [calcA, setCalcA] = useState(10);
    const [calcB, setCalcB] = useState(5);
    const [calcOp, setCalcOp] = useState('add');
    const [calcResult, setCalcResult] = useState('');
    const [generatedId, setGeneratedId] = useState('');
    const [expansionInfo, setExpansionInfo] = useState(null);
    const [availableFunctions, setAvailableFunctions] = useState([]);
    
    // Fetch demo state
    const [fetchUrl, setFetchUrl] = useGlobalState('fetchUrl', 'https://jsonplaceholder.typicode.com/posts/1');
    const [fetchMethod, setFetchMethod] = useState('GET');
    const [fetchLoading, setFetchLoading] = useState(false);
    const [fetchResponse, setFetchResponse] = useState(null);
    
    // File manipulation demo state
    const [currentDir, setCurrentDir] = useGlobalState('currentDir', __dirname ? __dirname.replace(/[\\/]pages$/, '') : '');
    const [dirContents, setDirContents] = useState([]);
    const [dirLoading, setDirLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState('');
    const [newFileName, setNewFileName] = useState('');
    const [newFileContent, setNewFileContent] = useState('# New YAML File\nname: example\nversion: 1.0.0');
    const [downloadUrl, setDownloadUrl] = useGlobalState('downloadUrl', 'https://files.nexomaker.com/useruploads/PurpleStoneTheme.zip');
    const [downloadDest, setDownloadDest] = useState('downloads/PurpleStoneTheme.zip');
    const [downloadProgress, setDownloadProgress] = useState(null);
    const [fileOpResult, setFileOpResult] = useState(null);
    const [yamlData, setYamlData] = useState(null);
    
    // Event system demo state
    const [registeredEvents, setRegisteredEvents] = useState({});
    const [customEventName, setCustomEventName] = useState('test:customEvent');
    const [customEventPayload, setCustomEventPayload] = useState('{\n  "message": "Hello from modular page!",\n  "timestamp": "auto"\n}');
    const [emitResult, setEmitResult] = useState(null);
    const [lastCustomEvent, setLastCustomEvent] = useState(null);
    const [lastButtonClick, setLastButtonClick] = useState(null);
    const [eventsLoading, setEventsLoading] = useState(false);
    
    // State for loaded assets
    const [pickaxeModel, setPickaxeModel] = useState(null);
    const [pickaxeTexture, setPickaxeTexture] = useState(null);
    const [loadError, setLoadError] = useState(null);

    // ========================================================================
    // LOAD AVAILABLE EXPANSION FUNCTIONS
    // ========================================================================
    useEffect(() => {
        api.expansion.listFunctions().then(setAvailableFunctions).catch(console.error);
    }, []);
    
    // ========================================================================
    // EXPANSION FUNCTION HANDLERS
    // ========================================================================
    const handleGreet = async () => {
        try {
            const result = await api.expansion.call('greet', greetName);
            setGreetResult(result);
        } catch (err) {
            setGreetResult('Error: ' + err.message);
        }
    };
    
    const handleCalculate = async () => {
        try {
            const result = await api.expansion.call('calculate', Number(calcA), Number(calcB), calcOp);
            setCalcResult(String(result));
        } catch (err) {
            setCalcResult('Error: ' + err.message);
        }
    };
    
    const handleGenerateId = async () => {
        try {
            const result = await api.expansion.call('generateItemId', 'test');
            setGeneratedId(result);
        } catch (err) {
            setGeneratedId('Error: ' + err.message);
        }
    };
    
    const handleGetInfo = async () => {
        try {
            const result = await api.expansion.call('getExpansionInfo');
            setExpansionInfo(result);
        } catch (err) {
            setExpansionInfo({ error: err.message });
        }
    };
    
    const handleFetch = async () => {
        setFetchLoading(true);
        setFetchResponse(null);
        try {
            const result = await api.expansion.call('fetchUrl', fetchUrl, { method: fetchMethod });
            setFetchResponse(result);
        } catch (err) {
            setFetchResponse({ ok: false, error: err.message });
        }
        setFetchLoading(false);
    };
    
    // ========================================================================
    // FILE MANIPULATION HANDLERS
    // ========================================================================
    const loadDirectory = async (path) => {
        setDirLoading(true);
        try {
            const result = await api.expansion.call('listDirectory', path || currentDir);
            if (result.success) {
                setDirContents(result.files);
                if (path) setCurrentDir(path);
            } else {
                setFileOpResult({ type: 'error', message: result.error });
            }
        } catch (err) {
            setFileOpResult({ type: 'error', message: err.message });
        }
        setDirLoading(false);
    };
    
    const navigateUp = () => {
        const parent = currentDir.replace(/[\\/][^\\/]+$/, '');
        if (parent && parent !== currentDir) {
            loadDirectory(parent);
        }
    };
    
    const openItem = async (item) => {
        if (item.isDirectory) {
            loadDirectory(currentDir + '/' + item.name);
        } else {
            setSelectedFile(item);
            try {
                const result = await api.expansion.call('readFile', currentDir + '/' + item.name, 'utf8');
                if (result.success) {
                    setFileContent(result.content);
                } else {
                    setFileContent('Error: ' + result.error);
                }
            } catch (err) {
                setFileContent('Error: ' + err.message);
            }
        }
    };
    
    const createNewFile = async () => {
        if (!newFileName) {
            setFileOpResult({ type: 'error', message: 'Please enter a file name' });
            return;
        }
        try {
            const filePath = currentDir + '/' + newFileName;
            const result = await api.expansion.call('writeFile', filePath, newFileContent);
            if (result.success) {
                setFileOpResult({ type: 'success', message: `Created: ${newFileName}` });
                setNewFileName('');
                loadDirectory();
            } else {
                setFileOpResult({ type: 'error', message: result.error });
            }
        } catch (err) {
            setFileOpResult({ type: 'error', message: err.message });
        }
    };
    
    const createNewDirectory = async () => {
        if (!newFileName) {
            setFileOpResult({ type: 'error', message: 'Please enter a directory name' });
            return;
        }
        try {
            const dirPath = currentDir + '/' + newFileName;
            const result = await api.expansion.call('createDirectory', dirPath);
            if (result.success) {
                setFileOpResult({ type: 'success', message: `Created directory: ${newFileName}` });
                setNewFileName('');
                loadDirectory();
            } else {
                setFileOpResult({ type: 'error', message: result.error });
            }
        } catch (err) {
            setFileOpResult({ type: 'error', message: err.message });
        }
    };
    
    const deleteSelected = async () => {
        if (!selectedFile) return;
        try {
            const filePath = currentDir + '/' + selectedFile.name;
            const result = selectedFile.isDirectory 
                ? await api.expansion.call('deleteDirectory', filePath)
                : await api.expansion.call('deleteFile', filePath);
            
            if (result.success) {
                setFileOpResult({ type: 'success', message: `Deleted: ${selectedFile.name}` });
                setSelectedFile(null);
                setFileContent('');
                loadDirectory();
            } else {
                setFileOpResult({ type: 'error', message: result.error });
            }
        } catch (err) {
            setFileOpResult({ type: 'error', message: err.message });
        }
    };
    
    const downloadFile = async () => {
        if (!downloadUrl || !downloadDest) {
            setFileOpResult({ type: 'error', message: 'Please enter URL and destination' });
            return;
        }
        setDownloadProgress({ status: 'downloading', message: 'Starting download...' });
        try {
            const destPath = currentDir + '/' + downloadDest;
            const result = await api.expansion.call('downloadFile', downloadUrl, destPath);
            if (result.success) {
                setDownloadProgress({ status: 'complete', message: `Downloaded ${formatBytes(result.size)} to ${downloadDest}` });
                loadDirectory();
            } else {
                setDownloadProgress({ status: 'error', message: result.error });
            }
        } catch (err) {
            setDownloadProgress({ status: 'error', message: err.message });
        }
    };
    
    const readYamlFile = async () => {
        if (!selectedFile || selectedFile.isDirectory) {
            setFileOpResult({ type: 'error', message: 'Select a file first' });
            return;
        }
        try {
            const filePath = currentDir + '/' + selectedFile.name;
            const result = await api.expansion.call('readYaml', filePath);
            if (result.success) {
                setYamlData(result.data);
                setFileOpResult({ type: 'success', message: 'YAML parsed successfully' });
            } else {
                setFileOpResult({ type: 'error', message: result.error });
            }
        } catch (err) {
            setFileOpResult({ type: 'error', message: err.message });
        }
    };
    
    const saveFileContent = async () => {
        if (!selectedFile || selectedFile.isDirectory) return;
        try {
            const filePath = currentDir + '/' + selectedFile.name;
            const result = await api.expansion.call('writeFile', filePath, fileContent);
            if (result.success) {
                setFileOpResult({ type: 'success', message: 'File saved!' });
            } else {
                setFileOpResult({ type: 'error', message: result.error });
            }
        } catch (err) {
            setFileOpResult({ type: 'error', message: err.message });
        }
    };
    
    const copySelected = async () => {
        if (!selectedFile) return;
        try {
            const src = currentDir + '/' + selectedFile.name;
            const dest = currentDir + '/' + selectedFile.name.replace(/(\.[^.]+)?$/, '_copy$1');
            const result = await api.expansion.call('copyFile', src, dest);
            if (result.success) {
                setFileOpResult({ type: 'success', message: `Copied to: ${dest.split('/').pop()}` });
                loadDirectory();
            } else {
                setFileOpResult({ type: 'error', message: result.error });
            }
        } catch (err) {
            setFileOpResult({ type: 'error', message: err.message });
        }
    };
    
    // Format bytes helper
    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    
    // Load directory on tab change
    useEffect(() => {
        if (activeTab === 'files' && currentDir && dirContents.length === 0) {
            loadDirectory();
        }
    }, [activeTab]);
    
    // ========================================================================
    // EVENT SYSTEM HANDLERS
    // ========================================================================
    const loadRegisteredEvents = async () => {
        try {
            const events = await api.expansion.call('getRegisteredEvents');
            setRegisteredEvents(events || {});
        } catch (err) {
            api.console.log('Error loading events:', err.message);
        }
    };
    
    const refreshEventData = async () => {
        setEventsLoading(true);
        try {
            const [events, lastCustom, lastClick] = await Promise.all([
                api.expansion.call('getRegisteredEvents'),
                api.expansion.call('getLastCustomEvent'),
                api.expansion.call('getLastButtonClick')
            ]);
            setRegisteredEvents(events || {});
            setLastCustomEvent(lastCustom);
            setLastButtonClick(lastClick);
        } catch (err) {
            api.console.log('Error refreshing event data:', err.message);
        }
        setEventsLoading(false);
    };
    
    const emitCustomEvent = async () => {
        try {
            // Parse the payload JSON
            let payload;
            try {
                payload = JSON.parse(customEventPayload);
                // Replace 'auto' timestamp with actual timestamp
                if (payload.timestamp === 'auto') {
                    payload.timestamp = new Date().toISOString();
                }
            } catch (e) {
                setEmitResult({ success: false, error: 'Invalid JSON payload' });
                return;
            }
            
            const result = await api.expansion.call('emitEvent', customEventName, payload);
            setEmitResult(result);
            
            // Refresh to see the received event
            setTimeout(refreshEventData, 100);
        } catch (err) {
            setEmitResult({ success: false, error: err.message });
        }
    };
    
    const clearEventData = async () => {
        try {
            await api.expansion.call('clearEventData');
            setLastCustomEvent(null);
            setLastButtonClick(null);
            setEmitResult(null);
        } catch (err) {
            api.console.log('Error clearing event data:', err.message);
        }
    };
    
    // Load events when switching to events tab
    useEffect(() => {
        if (activeTab === 'events') {
            refreshEventData();
        }
    }, [activeTab]);

    // ========================================================================
    // LOAD EXPANSION ASSETS
    // ========================================================================
    // Load the pickaxe model and texture from the expansion's assets folder.
    // __dirname points to THIS FILE's directory (pages/), so we need to go up one level.
    useEffect(() => {
        const loadAssets = async () => {
            try {
                console.log('[TestPage] __dirname value:', __dirname);
                
                if (!__dirname) {
                    throw new Error('__dirname is not available - please reload the expansion');
                }
                
                // Go up one directory from /pages to get expansion root
                const expansionRoot = __dirname.replace(/[\\/]pages$/, '');
                console.log('[TestPage] expansionRoot:', expansionRoot);
                
                // Read model JSON file
                const modelPath = expansionRoot + '/assets/pickaxe.json';
                console.log('[TestPage] Loading model from:', modelPath);
                const modelContent = await api.fs.readFile(modelPath, 'utf8');
                const modelData = JSON.parse(modelContent);
                setPickaxeModel(modelData);
                
                // Read texture as base64
                const texturePath = expansionRoot + '/assets/pickaxe.png';
                console.log('[TestPage] Loading texture from:', texturePath);
                const textureData = await api.fs.readFile(texturePath, 'base64');
                setPickaxeTexture(textureData);
                
                api.console.log('Assets loaded successfully!');
            } catch (err) {
                console.error('Failed to load assets:', err);
                setLoadError(err.message);
            }
        };
        
        loadAssets();
    }, []);

    // ========================================================================
    // STYLES (only for elements not covered by components)
    // ========================================================================
    const modelBoxStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
    };
    
    const modelPreviewStyle = {
        background: 'var(--col-bg-tertiary, #1a1a1a)', 
        borderRadius: '8px', 
        overflow: 'hidden',
        border: '1px solid var(--col-border, #333)'
    };

    // ========================================================================
    // TAB BUTTON COMPONENT
    // ========================================================================
    const TabButton = ({ id, icon, label }) => {
        const isActive = activeTab === id;
        const ButtonComponent = isActive ? PrimaryButton : SecondaryButton;
        return (
            <ButtonComponent onClick={() => setActiveTab(id)}>
                {icon} {label}
            </ButtonComponent>
        );
    };

    // ========================================================================
    // RENDER
    // ========================================================================
    return (
        <ScrollContainer style={{ paddingTop: '60px'}}>
            
            {/* Tab Navigation */}
            <FlexRow gap="8px" style={{ transform: "scale(1.01)", width: "100%", marginBottom: '20px', position: 'fixed', top: "30px", background: 'var(--col-secondary, #121212)', padding: '12px 0', zIndex: 10 }}>
                <TabButton id="models" icon={<Pickaxe size={16} />} label="Models" />
                <TabButton id="components" icon={<Palette size={16} />} label="Components" />
                <TabButton id="state" icon={<BarChart3 size={16} />} label="State" />
                <TabButton id="functions" icon={<Icons.Zap size={16} />} label="Functions" />
                <TabButton id="fetch" icon={<Icons.Globe size={16} />} label="Fetch" />
                <TabButton id="files" icon={<Icons.FolderOpen size={16} />} label="Files" />
                <TabButton id="events" icon={<Icons.Radio size={16} />} label="Events" />
            </FlexRow>
            
            {/* ============================================================
                MODEL VIEWER TAB
                Demonstrates using the Model component for 2D and 3D views
            ============================================================ */}
            {activeTab === 'models' && (
            <>
            <InfoCard 
                title="Loading & Displaying 3D Models" 
                icon={<Icons.BookOpen size={18} />}
                value={<>Learn how to load JSON models and PNG textures from your expansion's assets folder using <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>api.fs.readFile()</code>, then display them with the <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>Model</code> component in both 2D (flat) and 3D (interactive) modes.</>}
            />
            
            <Section>
                <SectionTitle><Pickaxe size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Model Viewer Demo</SectionTitle>
                
                {loadError && (
                    <div style={{ color: '#ef4444', padding: '12px', background: 'rgba(239,68,68,0.1)', borderRadius: '8px', marginBottom: '16px' }}>
                        Error loading assets: {loadError}
                    </div>
                )}
                
                {!pickaxeModel || !pickaxeTexture ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                        Loading pickaxe assets...
                    </div>
                ) : (
                    <FlexRow gap="24px" justify="center">
                        {/* 2D View - Flat preview with no interaction */}
                        <div style={modelBoxStyle}>
                            <Label><Layers size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />2D View (Flat)</Label>
                            <div style={modelPreviewStyle}>
                                <Model
                                    modelObject={pickaxeModel}
                                    textureBase64={pickaxeTexture}
                                    type="2D"
                                    canvasSize={{ x: 200, y: 200 }}
                                    showGrid={false}
                                />
                            </div>
                        </div>
                        
                        {/* 3D View - Interactive rotation */}
                        <div style={modelBoxStyle}>
                            <Label><Box size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />3D View (Interactive)</Label>
                            <div style={modelPreviewStyle}>
                                <Model
                                    modelObject={pickaxeModel}
                                    textureBase64={pickaxeTexture}
                                    type="3D"
                                    canvasSize={{ x: 200, y: 200 }}
                                    showGrid={true}
                                />
                            </div>
                        </div>
                    </FlexRow>
                )}
                
                <div style={{ fontSize: '12px', color: '#666', textAlign: 'center', marginTop: '16px' }}>
                    Model and texture loaded from <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>Expansions/Test/assets/</code>
                </div>
            </Section>
            </>
            )}
            
            {/* ============================================================
                UI COMPONENTS TAB
                Demonstrates all available UI components from useComponents()
            ============================================================ */}
            {activeTab === 'components' && (
            <>
            <InfoCard 
                title="Available UI Components" 
                icon={<Icons.BookOpen size={18} />}
                value={<>Explore the pre-built UI components available via <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>useComponents()</code>. These include buttons (Primary, Secondary, Icon), inputs (Text, Number, Slider, Select, Checkbox, TextArea), layout containers (Section, Row, Grid, FlexRow), and cards (Card, InfoCard). All components are styled to match the app theme.</>}
            />
            
            <Section>
                <SectionTitle><Palette size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> UI Components Demo</SectionTitle>
                
                {/* Buttons */}
                <div style={{ marginBottom: '24px' }}>
                    <Label>Buttons</Label>
                    <FlexRow style={{ marginTop: '8px' }}>
                        <PrimaryButton onClick={() => api.console.log('Primary clicked!')}>
                            Primary Button
                        </PrimaryButton>
                        <SecondaryButton onClick={() => api.console.log('Secondary clicked!')}>
                            Secondary Button
                        </SecondaryButton>
                        <IconButton onClick={() => api.console.log('Icon clicked!')} title="Icon Button">
                            ⚙️
                        </IconButton>
                    </FlexRow>
                </div>
                
                {/* Inputs */}
                <div style={{ marginBottom: '24px' }}>
                    <Label>Inputs</Label>
                    <Grid style={{ marginTop: '8px' }}>
                        <TextInput
                            value={textInputValue}
                            onChange={(val) => setTextInputValue(val)}
                            placeholder="Enter text..."
                            label="Text Input"
                        />
                        <NumberInput
                            value={numberValue}
                            onChange={(val) => setNumberValue(val)}
                            min={0}
                            max={100}
                            label="Number Input"
                        />
                        <Select
                            value={selectValue}
                            onChange={(val) => setSelectValue(val)}
                            options={[
                                { value: 'option1', label: 'Option 1' },
                                { value: 'option2', label: 'Option 2' },
                                { value: 'option3', label: 'Option 3' }
                            ]}
                            label="Select"
                        />
                    </Grid>
                    <FlexRow gap="24px" style={{ marginTop: '16px' }}>
                        <Checkbox
                            checked={checkboxValue}
                            onChange={(val) => setCheckboxValue(val)}
                            label="Checkbox"
                        />
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <Slider
                                value={sliderValue}
                                onChange={(val) => setSliderValue(val)}
                                min={0}
                                max={100}
                                label={`Slider: ${sliderValue}`}
                            />
                        </div>
                    </FlexRow>
                    <div style={{ marginTop: '16px' }}>
                        <TextArea
                            value={textAreaValue}
                            onChange={(val) => setTextAreaValue(val)}
                            placeholder="Enter multiple lines of text..."
                            rows={3}
                        />
                    </div>
                </div>
                
                {/* Cards */}
                <div>
                    <Label>Cards</Label>
                    <Grid columns="repeat(auto-fit, minmax(250px, 1fr))" style={{ marginTop: '8px' }}>
                        <Card>
                            <div style={{ padding: '4px' }}>
                                <strong>Basic Card</strong>
                                <p style={{ margin: '8px 0 0', fontSize: '13px', color: 'var(--col-txt-secondary, #888)' }}>
                                    Cards can contain any content
                                </p>
                            </div>
                        </Card>
                        <InfoCard title="Info Card" icon="ℹ️">
                            InfoCards display titled information with an optional icon
                        </InfoCard>
                    </Grid>
                </div>
            </Section>
            </>
            )}
            
            {/* ============================================================
                STATE DEMO TAB
                Demonstrates useGlobalState for persistent values
            ============================================================ */}
            {activeTab === 'state' && (
            <>
            <InfoCard 
                title="Persistent State with useGlobalState" 
                icon={<Icons.BookOpen size={18} />}
                value={<>Use <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>useGlobalState(key, defaultValue)</code> to store values that persist across page navigation and app restarts. Unlike regular <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>useState</code>, global state is saved to disk and restored automatically.</>}
            />
            
            <Section>
                <SectionTitle><BarChart3 size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Persistent State Demo</SectionTitle>
                
                <Row>
                    <div>
                        <div style={{ fontSize: '14px' }}>Test Value</div>
                        <div style={{ fontSize: '12px', color: 'var(--col-txt-secondary, #888)', marginTop: '4px' }}>
                            Stored with useGlobalState - persists across sessions
                        </div>
                    </div>
                    <TextInput
                        value={testValue}
                        onChange={(val) => setTestValue(val)}
                        style={{ width: '200px' }}
                    />
                </Row>
                
                <Row bordered={false}>
                    <div>
                        <div style={{ fontSize: '14px' }}>Counter</div>
                        <div style={{ fontSize: '12px', color: 'var(--col-txt-secondary, #888)', marginTop: '4px' }}>
                            Click to increment - value persists
                        </div>
                    </div>
                    <FlexRow gap="12px" wrap={false}>
                        <span style={{ fontSize: '18px', fontWeight: '600' }}>{counter}</span>
                        <PrimaryButton onClick={() => setCounter(counter + 1)} icon={<Plus size={16} />}>
                            +1
                        </PrimaryButton>
                        <SecondaryButton onClick={() => setCounter(0)} icon={<RotateCcw size={14} />}>
                            Reset
                        </SecondaryButton>
                    </FlexRow>
                </Row>
            </Section>
            </>
            )}

            {/* ============================================================
                EXPANSION FUNCTIONS TAB
                Demonstrates calling functions from main.js via api.expansion
            ============================================================ */}
            {activeTab === 'functions' && (
            <>
            <InfoCard 
                title="Calling Functions from main.js" 
                icon={<Icons.BookOpen size={18} />}
                value={<>Export functions from your expansion's <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>main.js</code> and call them from modular pages using <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>api.expansion.call('functionName', ...args)</code>. Use <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>api.expansion.listFunctions()</code> to see available functions. This enables code reuse and keeps complex logic in main.js.</>}
            />
            
            <Section>
                <SectionTitle><Icons.Zap size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Expansion Functions Demo</SectionTitle>
                
                {/* Available Functions */}
                <div style={{ marginBottom: '20px' }}>
                    <Label><Icons.List size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Available Functions</Label>
                    <div style={{ marginTop: '8px', padding: '12px', background: 'var(--col-bg-tertiary, #1a1a1a)', borderRadius: '8px', fontSize: '13px', fontFamily: 'monospace' }}>
                        {availableFunctions.length > 0 ? availableFunctions.join(', ') : 'Loading...'}
                    </div>
                </div>
                
                {/* Greet Function */}
                <Row>
                    <div>
                        <div style={{ fontSize: '14px' }}>greet(name)</div>
                        <div style={{ fontSize: '12px', color: 'var(--col-txt-secondary, #888)', marginTop: '4px' }}>
                            Returns a greeting message from main.js
                        </div>
                    </div>
                    <FlexRow gap="12px" wrap={false}>
                        <TextInput
                            value={greetName}
                            onChange={setGreetName}
                            placeholder="Enter name"
                            style={{ width: '120px' }}
                        />
                        <PrimaryButton onClick={handleGreet}>Call</PrimaryButton>
                    </FlexRow>
                </Row>
                {greetResult && (
                    <div style={{ padding: '12px', background: 'var(--col-bg-tertiary, #1a1a1a)', borderRadius: '8px', marginBottom: '16px', fontSize: '13px' }}>
                        Result: <span style={{ color: 'var(--col-primary-form, #6366f1)' }}>{greetResult}</span>
                    </div>
                )}
                
                {/* Calculate Function */}
                <Row>
                    <div>
                        <div style={{ fontSize: '14px' }}>calculate(a, b, op)</div>
                        <div style={{ fontSize: '12px', color: 'var(--col-txt-secondary, #888)', marginTop: '4px' }}>
                            Performs arithmetic operations
                        </div>
                    </div>
                    <FlexRow gap="8px" wrap={false}>
                        <TextInput value={calcA} onChange={(v) => setCalcA(v)} style={{ width: '60px' }} />
                        <Select
                            value={calcOp}
                            onChange={setCalcOp}
                            options={[
                                { value: 'add', label: '+' },
                                { value: 'subtract', label: '-' },
                                { value: 'multiply', label: '×' },
                                { value: 'divide', label: '÷' }
                            ]}
                            style={{ width: '70px' }}
                        />
                        <TextInput value={calcB} onChange={(v) => setCalcB(v)} style={{ width: '60px' }} />
                        <PrimaryButton onClick={handleCalculate}>Call</PrimaryButton>
                    </FlexRow>
                </Row>
                {calcResult && (
                    <div style={{ padding: '12px', background: 'var(--col-bg-tertiary, #1a1a1a)', borderRadius: '8px', marginBottom: '16px', fontSize: '13px' }}>
                        Result: <span style={{ color: 'var(--col-primary-form, #6366f1)' }}>{calcResult}</span>
                    </div>
                )}
                
                {/* Generate ID Function */}
                <Row>
                    <div>
                        <div style={{ fontSize: '14px' }}>generateItemId(prefix)</div>
                        <div style={{ fontSize: '12px', color: 'var(--col-txt-secondary, #888)', marginTop: '4px' }}>
                            Generates a random item ID
                        </div>
                    </div>
                    <FlexRow gap="12px" wrap={false}>
                        <PrimaryButton onClick={handleGenerateId}>Generate</PrimaryButton>
                        {generatedId && <span style={{ fontFamily: 'monospace', color: 'var(--col-primary-form, #6366f1)' }}>{generatedId}</span>}
                    </FlexRow>
                </Row>
                
                {/* Get Expansion Info */}
                <Row bordered={false}>
                    <div>
                        <div style={{ fontSize: '14px' }}>getExpansionInfo()</div>
                        <div style={{ fontSize: '12px', color: 'var(--col-txt-secondary, #888)', marginTop: '4px' }}>
                            Returns metadata about this expansion
                        </div>
                    </div>
                    <PrimaryButton onClick={handleGetInfo}>Get Info</PrimaryButton>
                </Row>
                {expansionInfo && (
                    <Card style={{ marginTop: '8px' }}>
                        <pre style={{ margin: 0, fontSize: '12px', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                            {JSON.stringify(expansionInfo, null, 2)}
                        </pre>
                    </Card>
                )}
            </Section>
            </>
            )}

            {/* ============================================================
                FETCH TAB
                Demonstrates fetching data from external servers via main.js
            ============================================================ */}
            {activeTab === 'fetch' && (
            <>
            <InfoCard 
                title="Fetching Data from Servers" 
                icon={<Icons.BookOpen size={18} />}
                value={<>Modular pages run in the frontend and cannot make direct HTTP requests. Instead, use <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>api.expansion.call('fetchUrl', url, options)</code> to call a function in <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>main.js</code> that performs the fetch in the main process. This keeps your expansion secure and follows Electron best practices.</>}
            />
            
            <Section>
                <SectionTitle><Icons.Globe size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Fetch Demo</SectionTitle>
                
                <Row>
                    <div>
                        <div style={{ fontSize: '14px' }}>URL to Fetch</div>
                        <div style={{ fontSize: '12px', color: 'var(--col-txt-secondary, #888)', marginTop: '4px' }}>
                            Enter any URL - fetched via main.js, not the browser
                        </div>
                    </div>
                    <TextInput
                        value={fetchUrl}
                        onChange={setFetchUrl}
                        placeholder="https://api.example.com/data"
                        style={{ width: '300px' }}
                    />
                </Row>
                
                <Row>
                    <div>
                        <div style={{ fontSize: '14px' }}>HTTP Method</div>
                        <div style={{ fontSize: '12px', color: 'var(--col-txt-secondary, #888)', marginTop: '4px' }}>
                            Select the request method
                        </div>
                    </div>
                    <FlexRow gap="12px" wrap={false}>
                        <Select
                            value={fetchMethod}
                            onChange={setFetchMethod}
                            options={[
                                { value: 'GET', label: 'GET' },
                                { value: 'POST', label: 'POST' },
                                { value: 'PUT', label: 'PUT' },
                                { value: 'DELETE', label: 'DELETE' }
                            ]}
                            style={{ width: '120px' }}
                        />
                        <PrimaryButton onClick={handleFetch} disabled={fetchLoading || !fetchUrl}>
                            {fetchLoading ? 'Fetching...' : 'Send Request'}
                        </PrimaryButton>
                    </FlexRow>
                </Row>
                
                {fetchResponse && (
                    <>
                    <Row bordered={false}>
                        <div>
                            <div style={{ fontSize: '14px' }}>Response Status</div>
                        </div>
                        <FlexRow gap="12px" wrap={false}>
                            <span style={{ 
                                padding: '4px 12px', 
                                borderRadius: '4px',
                                fontSize: '13px',
                                fontWeight: '600',
                                background: fetchResponse.ok ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                color: fetchResponse.ok ? '#22c55e' : '#ef4444'
                            }}>
                                {fetchResponse.status} {fetchResponse.statusText}
                            </span>
                            {fetchResponse.contentType && (
                                <span style={{ fontSize: '12px', color: 'var(--col-txt-secondary, #888)' }}>
                                    {fetchResponse.contentType.split(';')[0]}
                                </span>
                            )}
                        </FlexRow>
                    </Row>
                    
                    <div style={{ marginTop: '16px' }}>
                        <Label><Icons.Code size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Response Data</Label>
                        <Card style={{ marginTop: '8px', maxHeight: '300px', overflow: 'auto' }}>
                            <pre style={{ margin: 0, fontSize: '12px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                {fetchResponse.error 
                                    ? `Error: ${fetchResponse.error}`
                                    : typeof fetchResponse.data === 'object' 
                                        ? JSON.stringify(fetchResponse.data, null, 2)
                                        : fetchResponse.data
                                }
                            </pre>
                        </Card>
                    </div>
                    </>
                )}
                
                <div style={{ marginTop: '24px', padding: '16px', background: 'var(--col-bg-tertiary, #1a1a1a)', borderRadius: '8px', fontSize: '12px' }}>
                    <Label style={{ marginBottom: '8px' }}><Icons.Info size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />How it works</Label>
                    <div style={{ color: 'var(--col-txt-secondary, #888)', lineHeight: '1.6' }}>
                        1. Modular page calls <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>api.expansion.call('fetchUrl', url)</code><br/>
                        2. Request goes through IPC to main process<br/>
                        3. <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>main.js</code> executes <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>fetchUrl()</code> with Node's fetch<br/>
                        4. Response is sent back to the modular page
                    </div>
                </div>
            </Section>
            </>
            )}

            {/* ============================================================
                FILES TAB
                Demonstrates file system operations via main.js
            ============================================================ */}
            {activeTab === 'files' && (
            <>
            <InfoCard 
                title="File System Operations" 
                icon={<Icons.BookOpen size={18} />}
                value={<>Manipulate files and directories using functions in <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>main.js</code>. This includes listing directories, creating/reading/writing/deleting files, copying, moving, downloading from URLs, and YAML parsing. All operations use Node.js fs module through <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>api.expansion.call()</code>.</>}
            />
            
            {/* Operation Result Toast */}
            {fileOpResult && (
                <div style={{
                    padding: '12px 16px',
                    marginBottom: '16px',
                    borderRadius: '8px',
                    background: fileOpResult.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    border: `1px solid ${fileOpResult.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                    color: fileOpResult.type === 'success' ? '#22c55e' : '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    {fileOpResult.type === 'success' ? <Icons.CheckCircle size={16} /> : <Icons.XCircle size={16} />}
                    {fileOpResult.message}
                    <IconButton 
                        onClick={() => setFileOpResult(null)} 
                        style={{ marginLeft: 'auto', padding: '4px' }}
                        title="Dismiss"
                    >
                        <Icons.X size={14} />
                    </IconButton>
                </div>
            )}
            
            {/* Directory Browser Section */}
            <Section>
                <SectionTitle><Icons.FolderOpen size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Directory Browser</SectionTitle>
                
                {/* Current Path */}
                <Row>
                    <div style={{ flex: 1 }}>
                        <Label><Icons.MapPin size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Current Path</Label>
                        <div style={{ 
                            marginTop: '8px', 
                            padding: '8px 12px', 
                            background: 'var(--col-bg-tertiary, #1a1a1a)', 
                            borderRadius: '6px', 
                            fontSize: '12px', 
                            fontFamily: 'monospace',
                            wordBreak: 'break-all'
                        }}>
                            {currentDir || 'Not set'}
                        </div>
                    </div>
                    <FlexRow gap="8px" wrap={false}>
                        <SecondaryButton onClick={navigateUp} disabled={!currentDir}>
                            <Icons.ArrowUp size={14} /> Up
                        </SecondaryButton>
                        <PrimaryButton onClick={() => loadDirectory()} disabled={dirLoading}>
                            {dirLoading ? <Icons.Loader2 size={14} className="animate-spin" /> : <Icons.RefreshCw size={14} />}
                            {dirLoading ? 'Loading...' : 'Refresh'}
                        </PrimaryButton>
                    </FlexRow>
                </Row>
                
                {/* Directory Contents */}
                <div style={{ marginTop: '16px' }}>
                    <Label><Icons.List size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Contents ({dirContents.length} items)</Label>
                    <div style={{ 
                        marginTop: '8px', 
                        border: '1px solid var(--col-border, #333)', 
                        borderRadius: '8px', 
                        maxHeight: '250px', 
                        overflow: 'auto' 
                    }}>
                        {dirContents.length === 0 ? (
                            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--col-txt-secondary, #888)' }}>
                                {dirLoading ? 'Loading...' : 'Click Refresh to load directory contents'}
                            </div>
                        ) : (
                            dirContents.map((item, idx) => (
                                <div 
                                    key={item.name}
                                    onClick={() => openItem(item)}
                                    style={{
                                        padding: '10px 14px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        cursor: 'pointer',
                                        background: selectedFile?.name === item.name ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                                        borderBottom: idx < dirContents.length - 1 ? '1px solid var(--col-border, #333)' : 'none',
                                        transition: 'background 0.15s'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.background = selectedFile?.name === item.name ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.03)'}
                                    onMouseOut={(e) => e.currentTarget.style.background = selectedFile?.name === item.name ? 'rgba(99, 102, 241, 0.15)' : 'transparent'}
                                >
                                    {item.isDirectory ? <Icons.Folder size={16} color="#fbbf24" /> : <Icons.File size={16} color="#6366f1" />}
                                    <span style={{ flex: 1, fontFamily: 'monospace', fontSize: '13px' }}>{item.name}</span>
                                    <span style={{ fontSize: '11px', color: 'var(--col-txt-secondary, #888)' }}>
                                        {item.isDirectory ? 'folder' : formatBytes(item.size)}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                
                {/* File Actions */}
                {selectedFile && (
                    <FlexRow gap="8px" style={{ marginTop: '12px' }}>
                        <SecondaryButton onClick={copySelected} disabled={selectedFile.isDirectory}>
                            <Icons.Copy size={14} /> Copy
                        </SecondaryButton>
                        <SecondaryButton onClick={deleteSelected}>
                            <Icons.Trash2 size={14} /> Delete
                        </SecondaryButton>
                        {!selectedFile.isDirectory && (selectedFile.name.endsWith('.yml') || selectedFile.name.endsWith('.yaml')) && (
                            <SecondaryButton onClick={readYamlFile}>
                                <Icons.FileJson size={14} /> Parse YAML
                            </SecondaryButton>
                        )}
                    </FlexRow>
                )}
            </Section>
            
            {/* File Viewer/Editor Section */}
            {selectedFile && !selectedFile.isDirectory && (
            <Section>
                <SectionTitle><Icons.FileText size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> File: {selectedFile.name}</SectionTitle>
                <TextArea
                    value={fileContent}
                    onChange={setFileContent}
                    rows={10}
                    style={{ fontFamily: 'monospace', fontSize: '12px' }}
                />
                <FlexRow gap="8px" style={{ marginTop: '12px' }}>
                    <PrimaryButton onClick={saveFileContent}>
                        <Icons.Save size={14} /> Save Changes
                    </PrimaryButton>
                </FlexRow>
                
                {/* YAML Parsed Data */}
                {yamlData && (
                    <div style={{ marginTop: '16px' }}>
                        <Label><Icons.FileJson size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Parsed YAML Data</Label>
                        <Card style={{ marginTop: '8px' }}>
                            <pre style={{ margin: 0, fontSize: '12px', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                                {JSON.stringify(yamlData, null, 2)}
                            </pre>
                        </Card>
                    </div>
                )}
            </Section>
            )}
            
            {/* Create Files Section */}
            <Section>
                <SectionTitle><Icons.FilePlus size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Create New</SectionTitle>
                
                <Row>
                    <div>
                        <div style={{ fontSize: '14px' }}>Name</div>
                        <div style={{ fontSize: '12px', color: 'var(--col-txt-secondary, #888)', marginTop: '4px' }}>
                            File or directory name (for files, include extension)
                        </div>
                    </div>
                    <TextInput
                        value={newFileName}
                        onChange={setNewFileName}
                        placeholder="example.yml or my-folder"
                        style={{ width: '200px' }}
                    />
                </Row>
                
                <div style={{ marginTop: '12px' }}>
                    <Label>Content (for files)</Label>
                    <TextArea
                        value={newFileContent}
                        onChange={setNewFileContent}
                        rows={4}
                        style={{ marginTop: '8px', fontFamily: 'monospace', fontSize: '12px' }}
                    />
                </div>
                
                <FlexRow gap="8px" style={{ marginTop: '12px' }}>
                    <PrimaryButton onClick={createNewFile} disabled={!newFileName}>
                        <Icons.FilePlus size={14} /> Create File
                    </PrimaryButton>
                    <SecondaryButton onClick={createNewDirectory} disabled={!newFileName}>
                        <Icons.FolderPlus size={14} /> Create Directory
                    </SecondaryButton>
                </FlexRow>
            </Section>
            
            {/* Download Section */}
            <Section>
                <SectionTitle><Icons.Download size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Download File from URL</SectionTitle>
                
                <Row>
                    <div>
                        <div style={{ fontSize: '14px' }}>URL</div>
                        <div style={{ fontSize: '12px', color: 'var(--col-txt-secondary, #888)', marginTop: '4px' }}>
                            HTTP/HTTPS URL to download
                        </div>
                    </div>
                    <TextInput
                        value={downloadUrl}
                        onChange={setDownloadUrl}
                        placeholder="https://example.com/file.zip"
                        style={{ width: '350px' }}
                    />
                </Row>
                
                <Row>
                    <div>
                        <div style={{ fontSize: '14px' }}>Destination</div>
                        <div style={{ fontSize: '12px', color: 'var(--col-txt-secondary, #888)', marginTop: '4px' }}>
                            Relative path from current directory
                        </div>
                    </div>
                    <TextInput
                        value={downloadDest}
                        onChange={setDownloadDest}
                        placeholder="downloads/file.zip"
                        style={{ width: '250px' }}
                    />
                </Row>
                
                <FlexRow gap="12px" style={{ marginTop: '12px' }}>
                    <PrimaryButton onClick={downloadFile} disabled={!downloadUrl || !downloadDest || downloadProgress?.status === 'downloading'}>
                        {downloadProgress?.status === 'downloading' 
                            ? <><Icons.Loader2 size={14} /> Downloading...</>
                            : <><Icons.Download size={14} /> Download</>
                        }
                    </PrimaryButton>
                </FlexRow>
                
                {downloadProgress && (
                    <div style={{
                        marginTop: '12px',
                        padding: '12px',
                        borderRadius: '8px',
                        background: downloadProgress.status === 'complete' 
                            ? 'rgba(34, 197, 94, 0.15)' 
                            : downloadProgress.status === 'error' 
                                ? 'rgba(239, 68, 68, 0.15)' 
                                : 'rgba(99, 102, 241, 0.15)',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        {downloadProgress.status === 'complete' && <Icons.CheckCircle size={16} color="#22c55e" />}
                        {downloadProgress.status === 'error' && <Icons.XCircle size={16} color="#ef4444" />}
                        {downloadProgress.status === 'downloading' && <Icons.Loader2 size={16} color="#6366f1" />}
                        {downloadProgress.message}
                    </div>
                )}
            </Section>
            
            {/* How It Works */}
            <div style={{ marginTop: '8px', padding: '16px', background: 'var(--col-bg-tertiary, #1a1a1a)', borderRadius: '8px', fontSize: '12px' }}>
                <Label style={{ marginBottom: '8px' }}><Icons.Info size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Available File Functions</Label>
                <div style={{ color: 'var(--col-txt-secondary, #888)', lineHeight: '1.8', fontFamily: 'monospace' }}>
                    <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>listDirectory(path)</code> - List files/folders<br/>
                    <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>fileInfo(path)</code> - Get file stats<br/>
                    <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>createDirectory(path)</code> - Create folder<br/>
                    <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>readFile(path, encoding)</code> - Read file<br/>
                    <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>writeFile(path, content, encoding)</code> - Write file<br/>
                    <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>copyFile(src, dest)</code> - Copy file<br/>
                    <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>moveFile(src, dest)</code> - Move/rename file<br/>
                    <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>deleteFile(path)</code> - Delete file<br/>
                    <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>deleteDirectory(path)</code> - Delete folder (recursive)<br/>
                    <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>downloadFile(url, destPath)</code> - Download from URL<br/>
                    <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>readYaml(path)</code> - Parse YAML file<br/>
                    <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>writeYaml(path, data)</code> - Write YAML file
                </div>
            </div>
            </>
            )}

            {/* ============================================================
                EVENTS TAB
                Demonstrates the app events system - listen, emit, and create custom events
            ============================================================ */}
            {activeTab === 'events' && (
            <>
            <InfoCard 
                title="App Events System" 
                icon={<Icons.BookOpen size={18} />}
                value={<>The event system enables communication between expansions and reacting to app actions. Use <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>api.nexomaker.listenEvent()</code> in <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>main.js</code> to listen to events, and <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>api.nexomaker.emitEvent()</code> to dispatch custom events. Modular pages call these through <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>api.expansion.call()</code>.</>}
            />
            
            {/* Registered Events Section */}
            <Section>
                <SectionTitle><Icons.Radio size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Registered Event Listeners</SectionTitle>
                
                <FlexRow justify="space-between" style={{ marginBottom: '12px' }}>
                    <Label><Icons.Signal size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Active Listeners</Label>
                    <SecondaryButton onClick={refreshEventData} disabled={eventsLoading}>
                        {eventsLoading ? <Icons.Loader2 size={14} /> : <Icons.RefreshCw size={14} />}
                        {eventsLoading ? 'Loading...' : 'Refresh'}
                    </SecondaryButton>
                </FlexRow>
                
                <div style={{ 
                    border: '1px solid var(--col-border, #333)', 
                    borderRadius: '8px', 
                    overflow: 'hidden' 
                }}>
                    {Object.keys(registeredEvents).length === 0 ? (
                        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--col-txt-secondary, #888)' }}>
                            No event listeners registered
                        </div>
                    ) : (
                        Object.entries(registeredEvents).map(([eventName, info], idx) => (
                            <div 
                                key={eventName}
                                style={{
                                    padding: '12px 14px',
                                    borderBottom: idx < Object.keys(registeredEvents).length - 1 ? '1px solid var(--col-border, #333)' : 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}
                            >
                                <Icons.Radio size={16} color="#6366f1" />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontFamily: 'monospace', fontSize: '13px', color: 'var(--col-primary-form, #6366f1)' }}>
                                        {eventName}
                                    </div>
                                    <div style={{ fontSize: '11px', color: 'var(--col-txt-secondary, #888)', marginTop: '2px' }}>
                                        {info.listenerCount} listener(s) from: {info.expansions?.join(', ') || 'unknown'}
                                    </div>
                                </div>
                                <span style={{ 
                                    padding: '2px 8px', 
                                    borderRadius: '4px', 
                                    background: 'rgba(99, 102, 241, 0.15)', 
                                    fontSize: '11px',
                                    color: '#6366f1'
                                }}>
                                    {info.listenerCount}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </Section>
            
            {/* Emit Events Section */}
            <Section>
                <SectionTitle><Icons.Send size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Emit Custom Event</SectionTitle>
                
                <Row>
                    <div>
                        <div style={{ fontSize: '14px' }}>Event Name</div>
                        <div style={{ fontSize: '12px', color: 'var(--col-txt-secondary, #888)', marginTop: '4px' }}>
                            Use namespacing like <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>myExpansion:eventName</code>
                        </div>
                    </div>
                    <TextInput
                        value={customEventName}
                        onChange={setCustomEventName}
                        placeholder="test:customEvent"
                        style={{ width: '250px' }}
                    />
                </Row>
                
                <div style={{ marginTop: '12px' }}>
                    <Label>Payload (JSON)</Label>
                    <TextArea
                        value={customEventPayload}
                        onChange={setCustomEventPayload}
                        rows={5}
                        style={{ marginTop: '8px', fontFamily: 'monospace', fontSize: '12px' }}
                    />
                </div>
                
                <FlexRow gap="12px" style={{ marginTop: '12px' }}>
                    <PrimaryButton onClick={emitCustomEvent} disabled={!customEventName}>
                        <Icons.Send size={14} /> Emit Event
                    </PrimaryButton>
                    <SecondaryButton onClick={clearEventData}>
                        <Icons.Trash2 size={14} /> Clear Data
                    </SecondaryButton>
                </FlexRow>
                
                {emitResult && (
                    <div style={{
                        marginTop: '12px',
                        padding: '12px',
                        borderRadius: '8px',
                        background: emitResult.success ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        fontSize: '13px'
                    }}>
                        {emitResult.success ? (
                            <FlexRow gap="8px">
                                <Icons.CheckCircle size={16} color="#22c55e" />
                                <span>Event emitted! Triggered {emitResult.listenersTriggered} listener(s)</span>
                            </FlexRow>
                        ) : (
                            <FlexRow gap="8px">
                                <Icons.XCircle size={16} color="#ef4444" />
                                <span>Error: {emitResult.error}</span>
                            </FlexRow>
                        )}
                    </div>
                )}
            </Section>
            
            {/* Received Events Section */}
            <Section>
                <SectionTitle><Icons.Inbox size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Received Events</SectionTitle>
                
                <div style={{ marginBottom: '16px' }}>
                    <Label><Icons.Sparkles size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Last Custom Event</Label>
                    <Card style={{ marginTop: '8px' }}>
                        {lastCustomEvent ? (
                            <div>
                                <div style={{ fontSize: '11px', color: 'var(--col-txt-secondary, #888)', marginBottom: '8px' }}>
                                    Received at: {lastCustomEvent.timestamp}
                                </div>
                                <pre style={{ margin: 0, fontSize: '12px', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                                    {JSON.stringify(lastCustomEvent.payload, null, 2)}
                                </pre>
                            </div>
                        ) : (
                            <div style={{ color: 'var(--col-txt-secondary, #888)', textAlign: 'center', padding: '12px' }}>
                                No custom events received yet. Try emitting one above!
                            </div>
                        )}
                    </Card>
                </div>
                
                <div>
                    <Label><Icons.MousePointer size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Last Button Click (test-* buttons)</Label>
                    <Card style={{ marginTop: '8px' }}>
                        {lastButtonClick ? (
                            <div>
                                <div style={{ fontSize: '11px', color: 'var(--col-txt-secondary, #888)', marginBottom: '8px' }}>
                                    Clicked at: {lastButtonClick.timestamp}
                                </div>
                                <div style={{ fontSize: '13px' }}>
                                    <strong>Button ID:</strong> <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>{lastButtonClick.buttonId}</code>
                                    {lastButtonClick.label && (
                                        <><br/><strong>Label:</strong> {lastButtonClick.label}</>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div style={{ color: 'var(--col-txt-secondary, #888)', textAlign: 'center', padding: '12px' }}>
                                No button clicks captured yet. The listener filters for buttons with IDs starting with "test-"
                            </div>
                        )}
                    </Card>
                </div>
            </Section>
            
            {/* How It Works */}
            <div style={{ marginTop: '8px', padding: '16px', background: 'var(--col-bg-tertiary, #1a1a1a)', borderRadius: '8px', fontSize: '12px' }}>
                <Label style={{ marginBottom: '12px' }}><Icons.Info size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />Event System Architecture</Label>
                
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '6px', color: 'var(--col-txt-primary, #fff)' }}>In main.js (Backend):</div>
                    <div style={{ color: 'var(--col-txt-secondary, #888)', lineHeight: '1.8', fontFamily: 'monospace', fontSize: '11px' }}>
                        <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>api.nexomaker.listenEvent(eventName, handler)</code> - Register listener<br/>
                        <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>api.nexomaker.emitEvent(eventName, payload)</code> - Emit event<br/>
                        <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>api.nexomaker.getRegisteredEvents()</code> - List all events
                    </div>
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '6px', color: 'var(--col-txt-primary, #fff)' }}>In Modular Pages (Frontend):</div>
                    <div style={{ color: 'var(--col-txt-secondary, #888)', lineHeight: '1.8', fontFamily: 'monospace', fontSize: '11px' }}>
                        <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>api.expansion.call('emitEvent', name, payload)</code> - Emit via main.js<br/>
                        <code style={{ color: 'var(--col-primary-form, #6366f1)' }}>api.expansion.call('getRegisteredEvents')</code> - Get events list
                    </div>
                </div>
                
               
            </div>
            </>
            )}
        </ScrollContainer>
    );
};
