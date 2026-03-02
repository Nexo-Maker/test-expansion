/**
 * StatsCard.jsx - Example Injection Component
 * 
 * This component is injected into the Item Editor, between the 3D model viewer
 * and the assets section. It demonstrates how to:
 * 
 * 1. Access the injectionContext (item data, project info, etc.)
 * 2. Render a styled card that matches the app's design language
 * 3. React to item data changes
 * 
 * Injection components receive these props (same as modular pages):
 * - useState, useEffect, useMemo, etc.: React hooks
 * - useComponents(): Returns UI components
 * - api: NexoMaker API access
 * 
 * PLUS these injection-specific props:
 * - injectionContext: Object with data from the parent component
 * - injectionMetadata: The metadata you provided when registering
 * - slotId: The slot where this was injected
 * - expansionId: Your expansion's ID
 */

module.exports = ({ useState, useEffect, useMemo, useComponents, injectionContext, injectionMetadata, slotId, expansionId }) => {
    const { data, projectId, edgeColors } = injectionContext || {};
    
    // Calculate some example stats from the item data
    const stats = useMemo(() => {
        if (!data?.data) return null;
        
        const itemData = data.data;
        return {
            id: itemData.id || 'Unknown',
            hasModel: !!(data.pack?.model),
            hasTexture: !!(data.pack?.texture),
            assetCount: data.pack?.assets?.length || 0,
            material: itemData.material || itemData.Pack?.model || 'PAPER'
        };
    }, [data]);
    
    // Don't render if no data
    if (!stats) {
        return null;
    }
    
    // Card styling that matches the app's design
    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '12px',
        background: 'var(--col-module-background)',
        borderRadius: 'calc(var(--radius-sm) - 3px)',
        border: '1px solid var(--col-ouliner-default)',
        fontSize: '12px',
        color: 'var(--col-txt-primary)',
        marginBottom: '12px'
    };
    
    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: 500,
        color: 'var(--color-text-primary, #fff)'
    };
    
    const statRowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '4px 0',
        borderBottom: '1px solid var(--color-border, rgba(255, 255, 255, 0.05))'
    };
    
    const labelStyle = {
        color: 'var(--color-text-secondary, rgba(255, 255, 255, 0.6))'
    };
    
    const valueStyle = {
        color: 'var(--color-text-primary, #fff)',
        fontWeight: 500
    };
    
    const tagStyle = (color) => ({
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '11px',
        background: color === 'green' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
        color: color === 'green' ? '#22c55e' : '#ef4444'
    });

    return (
        <div style={cardStyle}>
            <div style={headerStyle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"/>
                    <path d="m19 9-5 5-4-4-3 3"/>
                </svg>
                <span>{injectionMetadata?.label || 'Quick Stats'}</span>
            </div>
            
            <div style={statRowStyle}>
                <span style={labelStyle}>Item ID</span>
                <span style={valueStyle}>{stats.id}</span>
            </div>
            
            <div style={statRowStyle}>
                <span style={labelStyle}>Material</span>
                <span style={valueStyle}>{stats.material}</span>
            </div>
            
            <div style={statRowStyle}>
                <span style={labelStyle}>3D Model</span>
                <span style={tagStyle(stats.hasModel ? 'green' : 'red')}>
                    {stats.hasModel ? '✓ Available' : '✗ Missing'}
                </span>
            </div>
            
            <div style={statRowStyle}>
                <span style={labelStyle}>Texture</span>
                <span style={tagStyle(stats.hasTexture ? 'green' : 'red')}>
                    {stats.hasTexture ? '✓ Available' : '✗ Missing'}
                </span>
            </div>
            
            <div style={{ ...statRowStyle, borderBottom: 'none' }}>
                <span style={labelStyle}>Total Assets</span>
                <span style={valueStyle}>{stats.assetCount}</span>
            </div>
        </div>
    );
};
