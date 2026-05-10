import './settings.css'

function Settings({ showOptions, setShowOptions, removeSong, setRemoveSong }) {
    return (
        <div className='settings'>
            <span>Settings</span>
            <div className='settings-option'>
                <label >Show Options for songs</label>
                <input type="checkbox" id="showOptions" name="showOptions" value="showOptions" checked={showOptions} onChange={(e) => setShowOptions(e.target.checked)} />
            </div>
            <div className='settings-option'>
                <label >Remove song after guess</label>
                <input type="checkbox" id="removeSong" name="removeSong" value="removeSong" checked={removeSong} onChange={(e) => setRemoveSong(e.target.checked)} />
            </div>
        </div>
    )
}

export default Settings