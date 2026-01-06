export const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #dcfce7, #dbeafe, #f3e8ff)',
    padding: '32px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#ca8a04',
    marginBottom: '8px'
  },
  subtitle: {
    color: '#4b5563',
    fontStyle: 'italic'
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '16px',
    marginBottom: '16px'
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap'
  },
  coinsText: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#ca8a04'
  },
  inventoryText: {
    fontSize: '18px',
    color: '#4b5563',
    cursor: 'pointer',
    padding: '8px 16px',
    background: '#fef3c7',
    borderRadius: '8px',
    border: '2px solid #fbbf24',
    transition: 'all 0.2s'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: '12px',
    textAlign: 'center'
  },
  mainGrid: {
    display: 'flex',
    gap: '24px',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  leftColumn: {
    flex: '1',
    minWidth: '460px'
  },
  rightColumn: {
    flex: '1',
    minWidth: '300px',
    maxWidth: '500px'
  },
  flowerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '12px',
    padding: '8px'
  },
  flowerCard: {
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center'
  },
  gardenGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 80px)',
    gridTemplateRows: 'repeat(5, 80px)',
    gap: '8px',
    justifyContent: 'center',
    padding: '10px',
    userSelect: 'none'
  },
  cell: {
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    background: 'white',
    fontSize: '32px',
    position: 'relative'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  button: {
    padding: '10px 24px',
    borderRadius: '8px',
    border: 'none',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '14px'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '16px'
  },
  modalContent: {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '80vh',
    overflow: 'auto',
    boxShadow: '0 20px 25px rgba(0,0,0,0.3)'
  },
  gardenTab: {
    padding: '8px 16px',
    margin: '0 4px',
    borderRadius: '8px',
    border: '2px solid',
    cursor: 'pointer',
    background: 'white',
    fontWeight: '600',
    transition: 'all 0.2s',
    minWidth: '120px',
    textAlign: 'center'
  },
  buyGardenTab: {
    padding: '8px 12px',
    margin: '0 4px',
    borderRadius: '8px',
    border: '2px solid',
    cursor: 'pointer',
    background: 'white',
    fontWeight: '600',
    transition: 'all 0.2s',
    minWidth: '100px',
    textAlign: 'center',
    fontSize: '12px'
  },
  fixedModeButtons: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    zIndex: 1000
  },
  modeButton: {
    padding: '8px 16px',
    background: '#fef3c7',
    borderRadius: '8px',
    border: '2px solid #fbbf24',
    transition: 'all 0.2s',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600'
  },
  gardenContextMenu: {
    position: 'absolute',
    background: 'white',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '12px',
    zIndex: 1001,
    minWidth: '200px'
  },
  colorOption: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '2px solid #d1d5db',
    cursor: 'pointer',
    margin: '4px'
  },
  gardenCard: {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '16px',
    marginBottom: '16px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '20px'
  },
  verticalGardenTabs: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minWidth: '120px'
  },
  horizontalGardenTabs: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    padding: '4px 0'
  },
  tabsPager: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '8px'
  },
  fixedGardenTabs: {
    position: 'fixed',
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    zIndex: 1000
  }
};
